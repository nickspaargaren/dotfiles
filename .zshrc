# Path to your Oh My Zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Theme
ZSH_THEME="robbyrussell"

# Plugins
plugins=(git yarn docker terraform)

# Load Oh My Zsh
source $ZSH/oh-my-zsh.sh

# Node.js Setup
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"

# Enable Corepack
if command -v corepack >/dev/null 2>&1; then
    corepack enable
fi

# Lazydocker
if [[ "$(uname -m)" == "arm64" ]]; then
  alias lzd='lazydocker'
else
  alias lzd='docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock lazyteam/lazydocker'
fi
