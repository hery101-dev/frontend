<!-- RegistrationForm.vue -->
<template>
  <!-- Main Content -->
  <div class="container-fluid">
    <div class="row main-content bg-success text-center">
      <div class="col-md-4 text-center company__info">
        <span class="company__logo"
          ><h2><span class="fa fa-android"></span></h2
        ></span>
      </div>
      <div class="col-md-8 col-xs-12 col-sm-12 login_form">
        <div class="container-fluid">
          <div class="row">
            <h2>Registration</h2>
          </div>
          <div class="row">
            <form class="form-group" @submit.prevent="register" method="post">
              <div class="row">
                <select v-model="user.userType" class="form__input">
                  <option value="recruiter">Recruiter</option>
                  <option value="candidate">Candidate</option>
                </select>
              </div>
              <div class="row">
                <input
                  type="text"
                  name="username"
                  v-model="user.username"
                  class="form-control"
                  placeholder="username"
                />
              </div>
              <div class="row">
                <input
                  type="email"
                  name="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="name@example.com"
                />
              </div>
              <div class="row">
                <input
                  type="password"
                  name="password"
                  v-model="user.password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div class="row">
                <input
                  type="password"
                  name="confirm_password"
                  v-model="user.confirm_password"
                  class="form-control"
                  placeholder="Confirm your password"
                />
              </div>
              <div class="row">
                <button type="submit" value="Submit" class="btn">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div class="row">
            <p>
              Already have an account ?
              <router-link to="/login">Log in!</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        userType: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        // Vérification de la correspondance des mots de passe
        if (this.user.password !== this.user.confirm_password) {
          throw new Error("Password do not match");
        }

        console.log(this.user);

        // Envoi des données à l'API
        await this.sendDataToAPI(this.user);

        // Réinitialiser les données du formulaire après la soumission réussie
        this.user = {
          username: "",
          email: "",
          password: "",
          userType: "",
        };
        Swal.fire({
          title: "Success",
          text: "Registration successful, please check your e-mail!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error during registration:", error.message);
        Swal.fire({
          title: "Error",
          text: "Username and email is already exist",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async sendDataToAPI(user) {
      const apiUrl = "http://localhost:8000/register";

      const response = await axios.post(apiUrl, user);
      //console.log("Réponse de l'API :", response.data.token);
    },
  },
};
</script>

<style></style>
