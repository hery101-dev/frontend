<template>
  <nav
    class="navbar navbar-expand-lg bg-white navbar-light shadow"
    style="padding: 8px"
  >
    <router-link
      to="/"
      class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
    >
      <span class="m-0 logo-text">Job Search</span>
    </router-link>
    <button
      type="button"
      class="navbar-toggler me-4"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav p-4 p-lg-0">
        <li :class="{ 'nav-item': true, active: currentPage === 'home' }">
          <router-link to="/" class="nav-link" @click="setCurrentPage('home')"
            >Home</router-link>
        </li>
        <li :class="{ 'nav-item': true, active: currentPage === 'resume' }">
          <router-link
            to="/submit-resume"
            class="nav-link"
            @click="setCurrentPage('resume')"
            >Submit a resume</router-link>
        </li>
        <li :class="{ 'nav-item': true, active: currentPage === 'contact' }">
          <router-link
            to="/contact"
            class="nav-link"
            @click="setCurrentPage('contact')"
            >Contact</router-link>
        </li>
      </div>
      <div class="navbar-nav ms-auto p-4 p-lg-0">
        <div class="btn">
          <li>
            <router-link
              v-if="!isLoggedIn() || isTokenExpired()"
              to="/login"
              class="nav-link btn btn-outline-info"
              >Log in</router-link
            >
            <router-link
              v-if="isLoggedIn() && isRecruiter() && !isTokenExpired()"
              to="/recruiter/dashboard/list-job"
              class="nav-link btn btn-outline-info"
              >My Account</router-link
            >
            <router-link
              v-if="isLoggedIn() && isCandidate() && !isTokenExpired()"
              to="/candidate/dashboard/application"
              class="nav-link btn btn-outline-info"
              >My Account</router-link
            >
          </li>
        </div>
        <div class="btn">
          <li>
            <router-link
              v-if="isNotLoggedIn() || isTokenExpired()"
              to="/register"
              class="nav-link btn btn-outline-info"
              >Sign up</router-link
            >
            <button
              v-if="!isNotLoggedIn() && !isTokenExpired()"
              @click="logout"
              class="nav-link btn btn-outline-danger"
            >
              Logout
            </button>
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { accountService } from "@/_services";
import { decode } from "jwt-js-decode";
import { isTokenExpired } from "@/auth/auth-guard";
export default {
  data() {
    return {
      currentPage: "home",
    };
  },
  methods: {
    setCurrentPage(page) {
      // Mettez à jour la page active lorsqu'un lien est cliqué
      this.currentPage = page;
    },
    isLoggedIn() {
      return localStorage.getItem("token") !== null;
    },
    isNotLoggedIn() {
      return !this.isLoggedIn();
    },
    logout() {
      accountService.logout();
      this.$router.push("/login");
    },

    getUserRole() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          let decodedToken = decode(token);
          return decodedToken.payload.roles;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      return null;
    },
    isTokenExpired() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          let decodedToken = decode(token);
          return isTokenExpired(decodedToken.payload.exp);
        } catch (error) {
          console.error("Error decoding token:", error);
          return true;
        }
      }
      return true;
    },

    isRecruiter() {
      const userRoles = this.getUserRole();
      return userRoles && userRoles.includes("ROLE_RECRUITER");
    },

    isCandidate() {
      const userRoles = this.getUserRole();
      return userRoles && userRoles.includes("ROLE_CANDIDATE");
    },
  },
  watch: {
    $route(to) {
      // Mettez à jour la page active en fonction de la nouvelle route
      this.currentPage = to.name || "home";
    },
  },
};
</script>

<style>
.nav-link.active,
.nav-link:hover {
  color: #008080;
  font-size: large;
  border-radius: 10px;
  text-align: center;
}
.nav-link {
  font-size: large;
  position: relative;
}
.nav-link:after {
  content: ""; /* Ajout de contenu à l'élément pseudo-élément :after */
  position: absolute; /* Position absolue par rapport à l'élément parent */
  left: 0; /* Positionnement à partir du côté gauche de l'élément parent */
  bottom: -4px; /* Distance de la bordure par rapport au bas de l'élément parent */
  width: 100%; /* Largeur de la bordure */
  height: 2px; /* Hauteur de la bordure */
  background-color: transparent; /* Couleur de la bordure par défaut (transparente) */
  transition: background-color 0.3s; /* Ajout d'une transition pour l'effet de survol */
}
/*
.nav-link:hover:after {
  background-color: #008080; /*Couleur de la bordure au survol 
}*/

.logo-text {
  font-family: "YourFont", sans-serif; /* Remplacez 'YourFont' par le nom de votre police si vous en avez une spécifique */
  font-size: 24px;
  font-weight: bold;
  color: #008080; /* Couleur du texte */
  text-shadow: 4px 2px 4px rgba(58, 53, 53, 0.2); /* Ombre du texte */
}
a {
  color: rgba(0, 0, 0, 0.55);
  text-decoration: none;
}
a:hover {
  color: rgb(36, 44, 51);
}
</style>
