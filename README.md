# Dotfiles

## Prerequisites

- [Homebrew](https://brew.sh/)
- [Oh My Zsh](https://ohmyz.sh/)

## Installation

1. Clone this repository:

   ```bash
   git clone git@github.com:nickspaargaren/dotfiles.git ~/.dotfiles
   cd ~/.dotfiles
   ```

2. Link configuration files:

   ```bash
   ln -sf ~/.dotfiles/.zshrc ~/.zshrc
   ln -sf ~/.dotfiles/Brewfile ~/.Brewfile
   ln -sf ~/.dotfiles/.gitconfig ~/.gitconfig
   ln -sf ~/.dotfiles/opencode ~/.config/opencode
   ```

3. Install Homebrew packages:

   **macOS:**

   ```bash
   brew bundle --global
   ```

   **Linux:**

   ```bash
   brew bundle --global --no-cask
   ```

   > **Note:** Casks are macOS-only GUI applications and will not install on Linux. The `--no-cask` flag skips these installations.

4. Restart your terminal

## Brewfile.work

The `Brewfile.work` is a separate Homebrew bundle file for work-specific applications and tools.

To install work-specific packages:

```bash
brew bundle --file=~/.dotfiles/Brewfile.work
```

## Other commands

Remove all local installed except for included in Brewfile

```bash
brew bundle cleanup --file=~/.dotfiles/Brewfile
```

Dump only local installed to Brewfile

```bash
brew bundle dump --file=~/.dotfiles/Brewfile --force --describe
```
