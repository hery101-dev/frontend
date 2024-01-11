<template>
  <div class="container rounded bg-white mb-5">
    <div class="row">
      <div class="col-md-2 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            class="rounded-circle mt-5"
            width="120px"
            alt="profile"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          />
          <br />
          <br />
          <p class="text-black" style="word-wrap: break-all">
            {{ userIdentify.email }}
          </p>
        </div>
      </div>
      <div class="col-md-4 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Profile Settings</h4>
          </div>
          <form @submit.prevent="submitForm" method="post">
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels">Name</label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  v-model="profileData.name"
                />
              </div>
              <div class="col-md-6">
                <label class="labels">Firstname</label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="firstname"
                  v-model="profileData.firstName"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Mobile Number</label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="enter phone number"
                  v-model="profileData.phoneNumber"
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Gender</label
                ><select v-model="profileData.gender" class="form-select">
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                </select>
              </div>
              <div class="col-md-12">
                <label class="labels">Nationality</label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="nationality"
                  v-model="profileData.nationality"
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Zip Code</label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="Zip Code"
                  v-model="profileData.zipCode"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <label class="labels">Country</label
                ><input
                  type="text"
                  class="form-control"
                  placeholder="country"
                  v-model="profileData.country"
                />
              </div>
              <div class="col-md-6">
                <label class="labels">City</label
                ><input
                  type="text"
                  class="form-control"
                  v-model="profileData.city"
                  placeholder="city"
                />
              </div>
            </div>
            <div class="mt-5 text-center">
              <button
                :class="{
                  btn: true,
                  'btn-primary': !isEditMode,
                  'btn-info': isEditMode,
                }"
                type="submit"
              >
                {{ isEditMode ? "Update Profile" : "Save Profile" }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p-3 py-5" v-for="profile in userProfile" :key="profile.id">
          <div
            class="d-flex justify-content-between align-items-center experience"
          >
            <button
              @click="editProfile(profile)"
              class="border px-3 p-1 add-experience"
            >
              <i class="fas fa-user"></i>&nbsp;Edit profile
            </button>
          </div>
          <br />
          <button @click="resetForm" class="border px-3 p-1 add-experience">
            <i class="fas fa-sync"></i>&nbsp;Reset profile
          </button>
          <br />

          <br />
          <div class="col-md-12">
            <strong>Name</strong>
            <p>{{ profile.name }}</p>
          </div>

          <div class="col-md-12">
            <strong>Firstname</strong>
            <p>{{ profile.firstName }}</p>
          </div>

          <div class="col-md-12">
            <strong>Mobile Number</strong>
            <p>{{ profile.phoneNumber }}</p>
          </div>

          <div class="col-md-12">
            <strong>Gender</strong>
            <p>{{ profile.gender }}</p>
          </div>

          <div class="col-md-12">
            <strong>Nationality</strong>
            <p>{{ profile.nationality }}</p>
          </div>

          <div class="col-md-12">
            <strong>Zip Code</strong>
            <p>{{ profile.zipCode }}</p>
          </div>

          <div class="col-md-12">
            <strong>Country</strong>
            <p>{{ profile.country }}</p>
          </div>

          <div class="col-md-12">
            <strong>City</strong>
            <p>{{ profile.city }}</p>
          </div>

          <br />
        </div>
      </div>

      <div class="col-md-3">
        <div class="p-3 py-5">
          <div
            class="d-flex justify-content-between align-items-center experience"
          >
            <button
              @click="editUser(userAcount)"
              class="border px-3 p-1 add-experience"
            >
              <i class="fas fa-cogs"></i>&nbsp;Edit account
            </button>
          </div>
          <br />

          <div>
            <div class="col-md-12">
              <strong>UserName</strong>
              <p>{{ userIdentify.username }}</p>
            </div>
            <div class="col-md-12">
              <strong>Email</strong>
              <p>{{ userIdentify.email }}</p>
            </div>
          </div>
          <br />
          <form
            v-if="isEditUser"
            @submit.prevent="submitFormAccount"
            method="post"
          >
            <div class="col-md-12">
              <label class="labels">Username</label
              ><input
                type="text"
                class="form-control"
                placeholder="username"
                v-model="userIdentify.username"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Email</label
              ><input
                type="text"
                class="form-control"
                placeholder="email"
                v-model="userIdentify.email"
              />
            </div>
            <div class="mt-5 text-center">
              <button class="btn btn-info" type="submit">Update Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import Swal from "sweetalert2";


export default {
  data() {
    return {
      profileData: {
        name: "",
        firstName: "",
        phoneNumber: "",
        nationality: "",
        country: "",
        city: "",
        zipCode: "",
        gender: "",
      },
      userData: {
        username: "",
        email: "",
      },
      userIdentify: {},
      userProfile: {},
      isEditMode: false,
      isEditUser: false,
    };
  },
  mounted() {
    const user = axios
      .get("/api/user")
      .then((res) => (this.userIdentify = res.data))
      .catch((err) => console.log(err));

    const profile = axios
      .get("/api/profile")
      .then((res) => (this.userProfile = res.data))
      .catch((err) => console.log(err));
  },
  methods: {
    async editProfile(profile) {
      // Chargez les données du profil à éditer
      this.profileData = { ...profile };
      this.isEditMode = true; // Mettez le formulaire en mode édition
    },

    async editUser(userAccount) {
      // Chargez les données du profil à éditer
      this.userData = { ...userAccount };
      this.isEditUser = true; // Mettez le formulaire en mode édition
    },

    async submitForm() {
      if (this.isEditMode) {
        // Si c'est en mode édition, effectuez la mise à jour
        await this.updateProfile();
      } else {
        // Sinon, effectuez la création
        await this.createProfile();
      }
      // Réinitialisez le formulaire après la soumission
      this.resetForm();
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

    resetFormAccount() {
      this.userIdentify = {
        id: null,
        email: "",
        username: "",
      };
      this.isEditUser = false;
    },

    resetForm() {
      this.profileData = {
        id: null,
        name: "",
        firstName: "",
        phoneNumber: "",
        nationality: "",
        country: "",
        city: "",
        zipCode: "",
        gender: "",
      };
      this.isEditMode = false; // Remettez le formulaire en mode création
    },

    // Mettre à jour le profil
    async updateProfile() {
      try {
        // Envoyer les données de mise à jour à l'API
        const apiUrl = "/api/edit/profile";
        await axios.put(apiUrl, this.profileData);

        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("error updating profile:", error.message);
      }
    },

    async createProfile() {
      try {
        // Envoi des données à l'API
        await this.sendDataToAPI(this.profileData);

        // Réinitialiser les données du formulaire après la soumission réussieccdcdcd
        this.profileData = {
          name: "",
          firstName: "",
          phoneNumber: "",
          nationality: "",
          country: "",
          city: "",
          zipCode: "",
          gender: "",
        };
        Swal.fire({
          title: "Success",
          text: "Added profile successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("error adding profile:", error.message);
      }
    },
    async sendDataToAPI(profileData) {
      const apiUrl = "/api/create/profile";

      const response = await axios.post(apiUrl, profileData);
    },
  },
};
</script>

<style scoped>
p {
  word-break: break-word;
}
</style>
