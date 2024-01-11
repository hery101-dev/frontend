import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Contact from "@/views/Contact.vue";
import Dashboard from "@/views/recruiter/Dashboard.vue";

import Login from "@/components/Login.vue";
import Register from "@/components/Registration.vue";
import ConfirmEmail from "@/components/ConfirmEmail.vue";
import DashboardCandidate from "@/views/candidate/Dashboard.vue";
import SubmitResume from "@/views/candidate/SubmitResume.vue";
import ApplyNow from "@/views/Apply.vue";
import ListCvCandidate from "@/views/candidate/ListCvCandidate.vue";
import { authGuard } from "@/auth/auth-guard";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/submit-resume",
    name: "resume",
    component: SubmitResume,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/check-email-verification/:token/:id",
    name: "check_email",
    component: ConfirmEmail,
  },
  {
    path: "/apply/job/:id",
    name: "applyJob",
    component: ApplyNow,
    meta: { requiredRole: "ROLE_CANDIDATE" },
  },
  {
    path: "/candidate/dashboard/application",
    name: "candidate",
    component: DashboardCandidate,
    meta: { requiredRole: "ROLE_CANDIDATE" },
    children: [
      {
        path: "/candidate/dashboard/application",
        component: () =>
          import("../views/candidate/ListApplicationCandidate.vue"),
      },
      {
        path: "/candidate/dashboard/profile",
        component: () => import("../views/candidate/AddProfile.vue"),
      },
      {
        path: "/candidate/dashboard/account-setting",
        component: () => import("../views/candidate/AccountCandidate.vue"),
      },
      {
        path: "/candidate/dashboard/list-cv",
        component: ListCvCandidate
      }
    ],
  },
  {
    path: "/recruiter/dashboard/list-job",
    name: "recruiter",
    component: Dashboard,
    meta: { requiredRole: "ROLE_RECRUITER" },
    children: [
      {
        path: "/recruiter/dashboard/add-job",
        component: () => import("../views/recruiter/AddJob.vue"),
      },
      {
        path: "/recruiter/dashboard/job-details/:id",
        name: "edit-job",
        component: () => import("../views/recruiter/EditJob.vue"),
      },
      {
        path: "/recruiter/dashboard/list-job",
        component: () => import("../views/recruiter/ListJob.vue"),
      },
      {
        path: "/recruiter/dashboard/profile",
        component: () => import("../views/recruiter/Profile.vue"),
      },
      {
        path: "/recruiter/dashboard/settings",
        component: () => import("../views/recruiter/Settings.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Définir le rôle requis en fonction de la route
  const requiredRole = to.meta.requiredRole;

  // Vérifier si l'utilisateur a le rôle requis en utilisant authGuard
  if (requiredRole && !authGuard(requiredRole)) {
    // L'utilisateur n'a pas le rôle requis, rediriger vers la page de connexion
    next("/");
  } else {
    // L'utilisateur a le rôle requis ou la route ne nécessite pas de rôle spécifique
    next();
  }
});

export default router;
