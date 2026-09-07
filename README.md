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

## Quick start

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001).

Uses published `@solspace/freeform-*` packages from npm (`^0.1.17`).

Requires a Craft site with Freeform headless enabled. Vite proxies `/freeform` and `/actions` to `CRAFT_PROXY_TARGET`.

See the [React demo README](https://github.com/solspace/freeform-headless-react-demo/blob/main/README.md) for full Craft setup steps.
