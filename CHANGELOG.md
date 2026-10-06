# @faststats/cli

## 0.1.2

### Patch Changes

- 427b6ba: Avoid repeated macOS Keychain prompts. Run `faststats login` once after updating. Credentials stay encrypted, but other apps running as your user can read the entry.

## 0.1.1

### Patch Changes

- f5c717d: Reuse the OS credential lookup throughout each CLI process to prevent repeated permission prompts.
- f5c717d: Upgrade Effect, OpenTUI, TypeScript, and the generated API client, and restore owned projects in dashboard listings.

## 0.1.0

### Minor Changes

- 9108da0: Initial Release

## 0.0.1

### Patch Changes

- Inital test release
