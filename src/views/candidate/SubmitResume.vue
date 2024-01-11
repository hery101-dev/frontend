<template>
    <div class="container">
      <h1>This is an submit page</h1>
    </div>
  </template>
  
  <script>
 import { authGuard } from "@/auth/auth-guard.js";

export default {
  beforeRouteEnter(to, from, next) {
    if (!authGuard("ROLE_CANDIDATE")) {
      next("/login");
    } else {
      next();
    }
  },
};
  </script>

  <style>
 
  </style>
  