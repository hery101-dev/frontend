// auth-guard.js
import router from "@/router";
import { decode } from "jwt-js-decode";

export function authGuard(requiredRole) {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return false;
  }

  if (token) {
    try {
      // Décoder le jeton JWT pour obtenir les informations
      let decodedToken = decode(token);

      // Vérifier si le type d'utilisateur est présent dans les informations du jeton
      if (
        decodedToken &&
        decodedToken.payload.roles &&
        decodedToken.payload.roles.includes(requiredRole)
      ) {
        if (isTokenExpired(decodedToken.payload.exp)) {
          router.push("/login");
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  router.push("/login");
  return false;
}

export function isTokenExpired(expirationTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp > expirationTimestamp;
}
