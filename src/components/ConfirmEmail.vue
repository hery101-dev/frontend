<template>
  <div>
    <p>Email verification in progress...</p>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  async mounted() {
    const token = this.$route.params.token;
    const id = this.$route.params.id;
    //const tokenLifeTime = this.$route.params.tokenLifeTime;

    if (token || id) {
      await this.confirmEmail(token, id);
    } else {
      // Afficher une alerte d'erreur
      Swal.fire({
            title: "Error",
            text: "User invalid",
            icon: "error",
            confirmButtonText: "OK",
          });
    }
  },
  methods: {
    async confirmEmail(token, id) {
      try {
        const response = await axios.post('http://localhost:8000/verify-account', {token, id});

        if (response.data.isEmailVerified) {
          // L'e-mail est confirmé, permettre à l'utilisateur de se connecter
          this.$router.push("/login");
        } else {
          
          // Gérer les erreurs de confirmation d'e-mail
          console.error(
            "Erreur lors de la confirmation d'e-mail:",
            response.data.message
          );
          // Afficher une alerte d'erreur
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la confirmation d'e-mail:", error);
        //this.$router.push("/confirmation-error");
      }
    },
  },
};
</script>
