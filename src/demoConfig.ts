import {
  calculationExtension,
  recommendedExtensions,
} from "@solspace/freeform-extensions";

export const demoExtensions = [...recommendedExtensions, calculationExtension];

export const baseUrl =
  typeof window !== "undefined" ? window.location.origin : "";

export const defaultHandle =
  import.meta.env.VITE_FREEFORM_HANDLE?.trim() || "contact";

export const packageSource =
  import.meta.env.VITE_FREEFORM_PACKAGES === "local" ? "local" : "npm";

export const hasGraphqlToken = Boolean(
  import.meta.env.VITE_GRAPHQL_TOKEN?.trim(),
);
