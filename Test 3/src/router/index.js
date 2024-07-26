import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductCreate from "../views/ProductCreate.vue";
import ProductEdit from "../views/ProductEdit.vue";
import CategoryCreate from "../views/CategoryCreate.vue";
import CategoryEdit from "../views/CategoryEdit.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create-product",
    name: "ProductCreate",
    component: ProductCreate,
  },
  {
    path: "/create-category",
    name: "CreateCategory",
    component: CategoryCreate,
  },
  {
    path: "/edit-product/:id",
    name: "edit-product",
    component: ProductEdit,
    props: true,
  },
  {
    path: "/edit-category/:id",
    name: "edit-category",
    component: CategoryEdit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
