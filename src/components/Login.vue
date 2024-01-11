<template>
  <!-- Main Content -->
  <br><br>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="login-wrap p-4 p-md-5">
          <div class="icon d-flex align-items-center justify-content-center">
            <i class="fa-regular fa-user"></i>
          </div>
          <h3 class="text-center mb-4">Sign In</h3>
          <form action="#" class="login-form" @submit.prevent="login">
            <div class="form-group">
              <input
                type="email"
                v-model="user.email"
                class="form-control rounded-left"
                placeholder="name@example.com"
                required=""
              />
              <div v-if="formSubmitted && !required(user.email)">
                <span class="text-danger">Email is required.</span>
              </div>
              <div v-else-if="formSubmitted && !email(user.email)">
                <span class="text-danger">Invalid email format.</span>
              </div>
            </div>
            <div class="form-group d-flex">
              <input
                type="password"
                v-model="user.password"
                class="form-control rounded-left"
                placeholder="Password"
                required=""
              />
              <div v-if="formSubmitted && !required(user.password)">
                <span class="text-danger">Password is required.</span>
              </div>
              <div v-else-if="formSubmitted && !password(user.password)">
                <span class="text-danger">Invalid password.</span>
              </div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="form-control btn btn-primary rounded submit px-3"
              >
                Login
              </button>
            </div>
            <div class="form-group d-md-flex">
              
              <div class=" text-center">
                <a href="#">Forgot Password</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountService } from "@/_services";
import Swal from "sweetalert2";
import { decode } from "jwt-js-decode";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      formSubmitted: false,
      validation: {
        email: [
          { rule: "required", message: "Email is required." },
          { rule: "email", message: "Invalid email format." },
        ],
        password: [
          { rule: "required", message: "Password is required." },
          {
            rule: "minlength:4",
            message: "Password must be at least 4 characters.",
          },
        ],
      },
    };
  },
  methods: {
    validateForm() {
      for (const field in this.validation) {
        for (const rule of this.validation[field]) {
          const parts = rule.rule.split(":");
          const ruleName = parts.shift();
          const isValid = this[ruleName](this.user[field], ...parts);
          if (!isValid) {
            Swal.fire({
              title: "Error",
              text: rule.message,
              icon: "error",
              confirmButtonText: "OK",
            });
            return false;
          }
        }
      }
      return true;
    },

    required(value) {
      return value.trim() !== "";
    },
    email(value) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(value);
    },
    minlength(value, length) {
      return value.length >= parseInt(length, 10);
    },

    login() {
      this.formSubmitted = true;
      if (!this.validateForm()) {
        return;
      }
      accountService
        .login(this.user)
        .then((res) => {
          accountService.saveToken(res.data.token);
          const token = localStorage.getItem("token");

          if (token) {
            let decodedToken = decode(token);
            if (decodedToken && decodedToken.payload.roles) {
              if (decodedToken.payload.roles.includes("ROLE_RECRUITER")) {
                this.$router.push("/recruiter/dashboard/list-job");
              } else if (
                decodedToken.payload.roles.includes("ROLE_CANDIDATE")
              ) {
                this.$router.push("/candidate/dashboard/application");
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Please register",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            }
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text:
              "Invalid Credentials" ||
              "Your account is not verified, please check your e-mail",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
  },
};
</script>

<style></style>
