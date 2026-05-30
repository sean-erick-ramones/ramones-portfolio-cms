// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import oxlint from 'eslint-plugin-oxlint'
import prettier from 'eslint-config-prettier/flat'

// Separation of concerns:
//   - oxfmt (.oxfmtrc.json) owns ALL formatting, including Vue templates.
//   - oxlint (.oxlintrc.json) owns fast JS/TS correctness linting.
//   - ESLint keeps Vue/Nuxt + type-aware rules that oxlint can't do.
// Appended LAST (order matters):
//   - buildFromOxlintConfigFile: turns off ESLint rules oxlint already covers.
//   - eslint-config-prettier: turns off formatting rules that fight the formatter
//     (e.g. vue/html-self-closing — oxfmt self-closes void elements like Prettier).
export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/unified-signatures': 'off'
  }
})
  .append(...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'))
  .append(prettier)
