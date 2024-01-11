<!-- SplitScreen.vue -->
<template>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Colonne pour la connexion -->
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <LoginForm />
        </div>
  
        <!-- Colonne pour l'inscription -->
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <RegistrationForm />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Login from '../components/Login.vue';
  import Registration from '../components/Registration.vue';
  
  export default {
    components: {
      Login,
      Registration,
    },
  };
  </script>
  