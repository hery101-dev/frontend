import axios from 'axios';

const baseURL = 'http://localhost:8000'; // URL de base de votre API

// Créez une instance d'axios avec la configuration par défaut
const instance = axios.create({
  baseURL: baseURL,
  // Vous pouvez mettre d'autres configurations par défaut ici
});

// Si vous avez un service d'authentification, utilisez-le pour récupérer votre token.
// Sinon, vous pouvez le stocker dans localStorage après que l'utilisateur se connecte,
// ou dans une variable d'environnement pour les tokens d'API statiques.
const token = localStorage.getItem('token'); // Ou votre service d'authentification

if (token) {
  // Applique le token à chaque requête si connecté
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default instance;