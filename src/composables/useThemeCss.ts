import { watchEffect, type Ref } from "vue";
import defaultCss from "@solspace/freeform-theme-default/styles.css?inline";
import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css?inline";
import bootstrapThemeCss from "@solspace/freeform-theme-bootstrap/styles.css?inline";
import type { ThemeSkin } from "./useDemoTheme";

const ATTR = "data-freeform-demo-theme-css";

/**
 * Inject only the active theme stylesheet(s).
 * Bootstrap reboot + default theme CSS are global and fight Tailwind if always loaded.
 */
export function useThemeCss(themeSkin: Ref<ThemeSkin>) {
  watchEffect((onCleanup) => {
    const skin = themeSkin.value;
    document.querySelectorAll(`style[${ATTR}]`).forEach((el) => el.remove());

    const css =
      skin === "default"
        ? defaultCss
        : skin === "bootstrap"
          ? `${bootstrapCss}\n${bootstrapThemeCss}`
          : "";

    if (!css) {
      return;
    }

    const style = document.createElement("style");
    style.setAttribute(ATTR, skin);
    style.textContent = css;
    document.head.appendChild(style);

    onCleanup(() => {
      style.remove();
    });
  });
}
