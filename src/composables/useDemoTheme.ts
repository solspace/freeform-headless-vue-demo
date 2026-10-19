import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type PropType,
  type Ref,
} from "vue";
import {
  createTheme,
  defaultTheme,
  type FreeformVueTheme,
} from "@solspace/freeform-vue";

type BootstrapFormProps = {
  form: unknown;
  class?: string;
  onSubmit: (event: Event) => void;
};
import {
  darkClassNames as twDark,
  darkClassNamesByType as twDarkByType,
  lightClassNames as twLight,
  lightClassNamesByType as twLightByType,
} from "#freeform-theme-tailwind-classnames";
import {
  darkClassNames as bsDark,
  darkClassNamesByType as bsDarkByType,
  lightClassNames as bsLight,
  lightClassNamesByType as bsLightByType,
} from "#freeform-theme-bootstrap-classnames";

export type ColorScheme = "light" | "dark" | "system";
export type ThemeSkin = "default" | "tailwind" | "bootstrap";

/**
 * Mirrors React `@solspace/freeform-theme-bootstrap` Form wrappers — Bootstrap
 * dark mode needs `data-bs-theme="dark"` on the form (classNames alone look grey).
 */
function bootstrapForm(colorMode: "light" | "dark") {
  return defineComponent({
    name: colorMode === "dark" ? "BootstrapDarkForm" : "BootstrapLightForm",
    props: {
      form: {
        type: Object as PropType<BootstrapFormProps["form"]>,
        required: true,
      },
      class: { type: String, default: undefined },
      onSubmit: {
        type: Function as PropType<BootstrapFormProps["onSubmit"]>,
        required: true,
      },
    },
    setup(props, { slots }) {
      return () =>
        h(
          "form",
          {
            class: props.class,
            onSubmit: props.onSubmit,
            novalidate: true,
            "data-bs-theme": colorMode,
            "data-freeform-bootstrap": colorMode === "dark" ? "dark" : true,
          },
          slots.default?.(),
        );
    },
  });
}

const BootstrapLightForm = bootstrapForm("light");
const BootstrapDarkForm = bootstrapForm("dark");

/**
 * Theme npm packages currently peer on `@solspace/freeform-react` and their
 * main entry imports React. Vue only needs the class maps — we import
 * `dist/classNames.js` via Vite aliases and assemble themes with createTheme().
 */
function skinTheme(
  name: string,
  classNames: FreeformVueTheme["classNames"],
  classNamesByType: FreeformVueTheme["classNamesByType"],
  colorScheme: "light" | "dark",
  components?: FreeformVueTheme["renderers"],
): FreeformVueTheme {
  return createTheme({
    name,
    classNameStrategy: "replace",
    classNames,
    classNamesByType,
    defaults: { colorScheme },
    renderers: components,
  });
}

const defaultThemesByScheme: Record<ColorScheme, FreeformVueTheme> = {
  light: createTheme({ defaults: { colorScheme: "light" } }),
  dark: createTheme({ defaults: { colorScheme: "dark" } }),
  system: defaultTheme,
};

const tailwindLight = skinTheme(
  "tailwind",
  twLight,
  twLightByType(),
  "light",
);
const tailwindDark = skinTheme(
  "tailwind-dark",
  twDark,
  twDarkByType(),
  "dark",
);
const bootstrapLight = skinTheme(
  "bootstrap",
  bsLight,
  bsLightByType(),
  "light",
  { components: { Form: BootstrapLightForm } },
);
const bootstrapDark = skinTheme(
  "bootstrap-dark",
  bsDark,
  bsDarkByType(),
  "dark",
  { components: { Form: BootstrapDarkForm } },
);

export function useDemoTheme(
  colorScheme: Ref<ColorScheme>,
  themeSkin: Ref<ThemeSkin>,
) {
  const prefersDark = ref(false);
  let mediaCleanup: (() => void) | undefined;

  onMounted(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      prefersDark.value = media.matches;
    };
    sync();
    media.addEventListener("change", sync);
    mediaCleanup = () => media.removeEventListener("change", sync);
  });

  onUnmounted(() => {
    mediaCleanup?.();
  });

  watch(
    colorScheme,
    (scheme) => {
      if (scheme === "system") {
        delete document.documentElement.dataset.theme;
      } else {
        document.documentElement.dataset.theme = scheme;
      }
    },
    { immediate: true },
  );

  const theme = computed((): FreeformVueTheme => {
    const useDark =
      colorScheme.value === "dark" ||
      (colorScheme.value === "system" && prefersDark.value);

    if (themeSkin.value === "tailwind") {
      return useDark ? tailwindDark : tailwindLight;
    }

    if (themeSkin.value === "bootstrap") {
      return useDark ? bootstrapDark : bootstrapLight;
    }

    return defaultThemesByScheme[colorScheme.value];
  });

  const bootstrapPreviewDark = computed(
    () =>
      themeSkin.value === "bootstrap" &&
      (colorScheme.value === "dark" ||
        (colorScheme.value === "system" && prefersDark.value)),
  );

  return { theme, bootstrapPreviewDark };
}
