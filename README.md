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
   ```

3. Install Homebrew packages:

   ```bash
   brew bundle --global
   ```

4. Restart your terminal

## Other commands

Remove all local installed except for included in Brewfile

```bash
brew bundle cleanup --file=~/.dotfiles/Brewfile
```

Dump only local installed to Brewfile

```bash
brew bundle dump --file=~/.dotfiles/Brewfile --force --describe
```
