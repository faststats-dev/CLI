# @faststats/cli

> [!WARNING]
> This CLI is **very experimental**. Commands, flags, and behavior may change or break without notice.

The official FastStats CLI, built with Effect and OpenTUI.

## Install

```bash
npm i -g @faststats/cli
```

This installs the `faststats` command globally.

## Login

Authenticate with browser-based device authorization:

```bash
faststats login
```

Follow the printed URL to authorize the device. Once logged in you can check or clear your session:

```bash
faststats status   # show authentication status
faststats logout   # remove the stored access token
```

## Commands

### Dashboard

```bash
faststats dashboard            # browse project dashboards in an interactive TUI
```

### Projects

```bash
faststats project list                 # list your projects
faststats project create                # create a project (interactive)
faststats project show <slug>            # show project details
```

### Data sources

```bash
faststats project datasource list <slug>
faststats project datasource create <slug>        # interactive
faststats project datasource edit <slug> [datasource]
faststats project datasource remove <slug> [datasource]
```

Run any command with `--help` to see its flags and arguments.

## Shell completions

Completions support `bash`, `zsh`, and `fish`, including dynamic project-slug completion.

```bash
faststats --completions bash   # print a completion script for the given shell
```

Add the output to your shell config, then reload your shell.
