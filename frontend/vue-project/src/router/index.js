import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Events from "../views/Events.vue";
import BookAppointment from "../views/BookAppointment.vue";
import MyAppointments from "../views/MyAppointments.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },

  // Public (demo)
  { path: "/events", name: "Events", component: Events },

  // Protected (needs auth)
  { path: "/book", name: "Book", component: BookAppointment, meta: { requiresAuth: true } },
  { path: "/my-appointments", name: "MyAppointments", component: MyAppointments, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Guard global : protège les routes avec meta.requiresAuth
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Si page protégée et pas connecté -> login
  if (to.meta.requiresAuth && !token) {
    return next({ name: "Login" });
  }

  // Si connecté et essaie d'aller sur login/register -> redirige vers "Mes RDV"
  if ((to.name === "Login" || to.name === "Register") && token) {
    return next({ name: "MyAppointments" });
  }

  next();
});

export default router;
