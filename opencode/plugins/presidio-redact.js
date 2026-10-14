const ANALYZER_URL = "http://localhost:5002/analyze";
const ANONYMIZER_URL = "http://localhost:5001/anonymize";

const ANALYZER_START_CMD =
  "docker run -d -p 5002:3000 ghcr.io/data-privacy-stack/presidio-analyzer:latest";
const ANONYMIZER_START_CMD =
  "docker run -d -p 5001:3000 ghcr.io/data-privacy-stack/presidio-anonymizer:latest";

async function analyze(text) {
  let res;
  try {
    res = await fetch(ANALYZER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language: "en" }),
    });
  } catch {
    throw new Error(
      `Presidio analyzer container is not running.\nStart it with:\n  ${ANALYZER_START_CMD}`,
    );
  }
  if (!res.ok) {
    throw new Error(
      `Presidio analyzer returned HTTP ${res.status}. Check that the container is healthy.`,
    );
  }
  return res.json();
}

async function anonymize(text, analyzer_results) {
  let res;
  try {
    res = await fetch(ANONYMIZER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, analyzer_results }),
    });
  } catch {
    throw new Error(
      `Presidio anonymizer container is not running.\nStart it with:\n  ${ANONYMIZER_START_CMD}`,
    );
  }
  if (!res.ok) {
    throw new Error(
      `Presidio anonymizer returned HTTP ${res.status}. Check that the container is healthy.`,
    );
  }
  const data = await res.json();
  return data.text;
}

async function redact(text) {
  const analyzer_results = await analyze(text);
  if (!analyzer_results.length) return text;
  return anonymize(text, analyzer_results);
}

export const PresidioRedactPlugin = async () => {
  return {
    "chat.message": async (_input, output) => {
      for (const part of output.parts) {
        if (part.type === "text") {
          part.text = await redact(part.text);
        }
      }
    },
  };
};
