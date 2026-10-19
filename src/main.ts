import { createApp } from "vue";
import App from "./App.vue";
/** Tailwind utilities only — default/bootstrap CSS load per skin via useThemeCss. */
import "./tailwind.css";
import "./styles.css";

createApp(App).mount("#app");
