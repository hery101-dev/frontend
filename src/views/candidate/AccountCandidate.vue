<template>
  <div class="col-md-7 col-lg-8">
    <h4 class="mb-3">Account setting</h4>
    <form class="needs-validation"  @submit.prevent="submitFormAccount">
      <div class="row g-3">
        <div class="col-sm-6">
          <label for="firstName" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="userIdentify.username"
            required=""
          />
        </div>

        <div class="col-sm-6">
          <label for="lastName" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="userIdentify.email"
            required=""
          />
        </div>
      </div>
      <br />

      <button class="btn btn-primary btn-md" type="submit">Update account</button>
    </form>

  </div>
</template>

<script>
import axios from '@/axios';
import Swal from 'sweetalert2';


export default {
  name: "account",
  data() {
    return {
      userIdentify: {},
    }
  },
  mounted() {
    this.getUserAccount()
  },
  methods: {
    async getUserAccount() {
      const user = axios
      .get("/api/user")
      .then((res) => (this.userIdentify = res.data))
      .catch((err) => console.log(err));
    },
    async submitFormAccount() {
      try {
        // Envoyer les données de mise à jour du compte à l'API
        const apiUrl = `/api/user/edit`;
        const response = await axios.put(apiUrl, this.userIdentify);
        // Extraire le nouveau token de la réponse JSON
        const newToken = response.data.token;

        // Stocker le nouveau token localement si nécessaire
        localStorage.setItem("token", newToken);
        Swal.fire({
          title: "Success",
          text: "Account updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error updating account:", error.message);
      }
    },
  }
};
</script>

<style></style>
