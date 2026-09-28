import {
  calculationExtension,
  recommendedExtensions,
} from "@solspace/freeform-extensions";
import { resolveCraftBaseUrl } from "./craftUrl";

export const demoExtensions = [...recommendedExtensions, calculationExtension];

export const baseUrl = resolveCraftBaseUrl(
  import.meta.env.VITE_FREEFORM_BASE_URL,
);

export const defaultHandle =
  import.meta.env.VITE_FREEFORM_HANDLE?.trim() || "contact";

/** Forms exposed for headless on demo.solspace.com (config/freeform.php). */
export const DEMO_FORMS = [
  { handle: "contact", label: "Contact" },
  { handle: "jobApplication", label: "Job Application" },
  { handle: "multiplePage", label: "Multiple Page" },
  { handle: "newsletter", label: "Newsletter" },
  { handle: "quote", label: "Get a Quote" },
] as const;

export const DEMO_FORM_HANDLES: ReadonlySet<string> = new Set(
  DEMO_FORMS.map((form) => form.handle),
);

export const packageSource =
  import.meta.env.VITE_FREEFORM_PACKAGES === "local" ? "local" : "npm";

export const hasGraphqlToken = Boolean(
  import.meta.env.VITE_GRAPHQL_TOKEN?.trim(),
);
