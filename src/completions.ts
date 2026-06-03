export type Shell = "fish" | "zsh" | "bash";

const SLUG_COMMAND_PATHS: ReadonlyArray<string> = [
	"project show",
	"project network list",
	"project network add",
	"project network remove",
	"project hostnames list",
	"project hostnames set",
	"project datasource list",
	"project datasource create",
	"project datasource edit",
	"project datasource remove",
];

const fishLayer = (executable: string): string => {
	const paths = SLUG_COMMAND_PATHS.map((path) => `'${path}'`).join(" \\\n  ");
	return `
# ${executable}: dynamic project-slug completions
set -g __${executable}_slug_paths \\
  ${paths}

function __${executable}_needs_slug
    set -l tokens (commandline -opc)
    set -e tokens[1]
    set -l path
    for tok in $tokens
        string match -q -- '-*' $tok; and continue
        set -a path $tok
    end
    contains -- (string join ' ' $path) $__${executable}_slug_paths
end

complete -c ${executable} -f -n '__${executable}_needs_slug' -a '(${executable} completions slugs)'
`;
};

const bashLayer = (executable: string): string => {
	const paths = SLUG_COMMAND_PATHS.join("\n");
	return `
# ${executable}: dynamic project-slug completions
__${executable}_slug_paths='${paths}'

_${executable}_with_slugs()
{
  local cur="\${COMP_WORDS[COMP_CWORD]}"
  local i tok path=""
  for ((i = 1; i < COMP_CWORD; i++)); do
    tok="\${COMP_WORDS[i]}"
    [[ "$tok" == -* ]] && continue
    path+="\${path:+ }$tok"
  done
  if grep -qxF -- "$path" <<< "$__${executable}_slug_paths"; then
    COMPREPLY=( $(compgen -W "$(${executable} completions slugs 2>/dev/null)" -- "$cur") )
    return
  fi
  _${executable}
}

complete -F _${executable}_with_slugs ${executable}
`;
};

const zshLayer = (executable: string): string => {
	const paths = SLUG_COMMAND_PATHS.map((path) => `  '${path}'`).join("\n");
	return `
# ${executable}: dynamic project-slug completions
__${executable}_slug_paths=(
${paths}
)

_${executable}_with_slugs() {
  local -a _path
  local i tok
  for (( i = 2; i < CURRENT; i++ )); do
    tok="\${words[i]}"
    [[ "$tok" == -* ]] && continue
    _path+=("$tok")
  done
  local joined="\${(j: :)_path}"
  if (( \${__${executable}_slug_paths[(Ie)$joined]} )); then
    local -a _slugs
    _slugs=("\${(@f)$(${executable} completions slugs 2>/dev/null)}")
    compadd -- $_slugs
    return
  fi
  _${executable} "$@"
}

if [[ "\${zsh_eval_context[-1]}" == "loadautofunc" ]]; then
  _${executable}_with_slugs "$@"
else
  compdef _${executable}_with_slugs ${executable}
fi
`;
};

export const buildSlugCompletionLayer = (
	shell: Shell,
	executable: string,
): string => {
	switch (shell) {
		case "fish":
			return fishLayer(executable);
		case "bash":
			return bashLayer(executable);
		case "zsh":
			return zshLayer(executable);
	}
};
