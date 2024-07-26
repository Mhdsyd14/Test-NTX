import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./apolloClient";
import router from "./router"; // Import router
import "./style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router); // Daftarkan router
app.provide(DefaultApolloClient, apolloClient);

app.mount("#app");
