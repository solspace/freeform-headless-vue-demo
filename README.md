# Freeform Headless Vue Demo

Example **Vite + Vue 3** app that renders [Solspace Freeform](https://docs.solspace.com/craft/freeform/) forms — feature parity with the [React demo](https://github.com/solspace/freeform-headless-react-demo/blob/main/README.md).

| Feature | Supported |
| --- | --- |
| `<Freeform />` component mode | Yes |
| `useFreeform()` headless mode | Yes |
| Manifest JSON (REST + GraphQL) | Yes |
| REST / GraphQL transport toggle | Yes |
| Default / Tailwind / Bootstrap themes | Yes |
| Light / Dark / System color scheme | Yes |
| Save & Continue Later (draft URL) | Yes |
| `FREEFORM_PACKAGES=local\|npm` | Yes |

## Quick start

```bash
cp .env.example .env
pnpm install
pnpm dev          # or pnpm dev:npm — @solspace/freeform-* from npm (^0.1.17)
# pnpm dev:local  # maintainers: sibling Craft Freeform checkout via Vite aliases
```

Official packages: [`@solspace/freeform-vue`](https://www.npmjs.com/package/@solspace/freeform-vue), [`@solspace/freeform-core`](https://www.npmjs.com/package/@solspace/freeform-core), [`@solspace/freeform-extensions`](https://www.npmjs.com/package/@solspace/freeform-extensions), and the `@solspace/freeform-theme-*` starters.

Requires a Craft site with Freeform headless enabled. Vite proxies `/freeform` and `/actions` to `CRAFT_PROXY_TARGET`.

See the [React demo README](https://github.com/solspace/freeform-headless-react-demo/blob/main/README.md) for full Craft setup steps.
