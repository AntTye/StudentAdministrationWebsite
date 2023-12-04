// this file creates the router instance that is used by our application

// we start by importing the createRouter and createWebHistory functions, as well as the components describing each of our views
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormView from "../views/FormView.vue";
import FetchView from "../views/FetchView.vue";
import LoginView from "../views/LoginView.vue";
import SearchView from "../views/SearchView.vue";
import ClassesView from "../views/ClassesView.vue";
import ScheduleView from "../views/ScheduleView.vue";
import ProfessorInformationView from "../views/ProfessorInformationView.vue";
import ClassInformationView from "../views/ClassInformationView.vue";
import ProfileView from "../views/ProfileView.vue";
import AdminView from "../views/AdminView.vue";
import APITestingView from "../views/APITestingView.vue";
import CreateClassView from "../views/CreateClassView.vue";


const router = createRouter({
  // the history mode determines how vue router interacts with the url.
  // createWebHistory() simulates the default browser behavior of changing
  // the path of the url based on the current document.
  // import.meta.env.BASE_URL is a vite feature that you don't need to worry about
  // and can safely use. it refers to the current path to the directory being
  // served by vite, which in this project is always the same directory
  // (and therefore import.meta.env.BASE_URL is '/')
  history: createWebHistory(import.meta.env.BASE_URL),

  // each entry to this routes array has a path (what goes in the URL to access
  // this page), a name (check out components/AppHeader.vue for how this is used)
  // and, most importantly, the component that should be rendered for the view
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/form",
      name: "form",
      component: FormView,
    },
    {
      path: "/fetch",
      name: "fetch",
      component: FetchView,
    },
    {
      path: "/",
      name: "login",
      component: LoginView,
    },

    {
      path: "/search",
      name: "search",
      component: SearchView,
    },

    {
      path: "/Schedule",
      name: "Schedule",
      component: ScheduleView,
    },

    {
      path: "/ClassInformation",
      name: "ClassInformation",
      component: ClassInformationView,
    },

    {
      path: "/ProfessorInformation",
      name: "ProfessorInformation",
      component: ProfessorInformationView,
    },

    {
      path: "/Profile",
      name: "Profile",
      component: ProfileView,
    },

    {
      path: "/classes",
      name: "classes",
      component: ClassesView,
    },

    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
    {
      path: "/createclassview",
      name: "createclassview",
      component: CreateClassView,
    },
  ],
});

export default router;
