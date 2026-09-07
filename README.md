# Freeform Headless Vue Demo

Example **Vite + Vue 3** app that renders [Solspace Freeform](https://docs.solspace.com/craft/freeform/) forms — feature parity with the [React demo](../freeform-headless-react-demo/README.md).

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
pnpm dev:local   # while @solspace/freeform-vue is local-only
# pnpm dev:npm   # after the Vue package is published
```

Requires a Craft site with Freeform headless enabled. Vite proxies `/freeform` and `/actions` to `CRAFT_PROXY_TARGET`.

See the [React demo README](../freeform-headless-react-demo/README.md) for full Craft setup steps.
# freeform-headless-vue-demo
