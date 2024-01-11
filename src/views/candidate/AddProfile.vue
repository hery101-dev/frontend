<template>
  <div class="col-md-7 col-lg-8">
    <h4 class="mb-3">Profile and location</h4>
    <form class="needs-validation" @submit.prevent="handleFormSubmit">
      <div class="row g-3">
        <div class="col-12">
          <label for="status" class="form-label"
            >Position/Professional status/Field of study *</label
          >
          <div class="input-group has-validation">
            <span class="input-group-text"
              ><i class="fas fa-briefcase"></i>
            </span>
            <input
              type="text"
              class="form-control"
              v-model="profileData.job"
              id="job"
              required
            />
          </div>
        </div>

        <div class="col-sm-6">
          <label for="firstName" class="form-label">Name *</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="profileData.name"
            required
          />
        </div>

        <div class="col-sm-6">
          <label for="lastName" class="form-label">First name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="profileData.firstName"
      
          />
        </div>
        <div class="col-sm-6">
          <label for="lastName" class="form-label">Nationality *</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="profileData.nationality"
            required
          />
        </div>
        <div class="col-sm-6">
          <label for="lastName" class="form-label">Phone number *</label>
          <input
            type="tel"
            class="form-control"
            id="lastName"
            v-model="profileData.phoneNumber"
            required
          />
        </div>

        <div class="col-12">
          <div class="form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="man"
              v-model="profileData.selectedGender"
              @change="handleGenderChange('man')"
              value="man"
              required
            />
            <label class="form-check-label" for="man">Man</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="woman"
              v-model="profileData.selectedGender"
              @change="handleGenderChange('woman')"
              value="woman"
              required
            />
            <label class="form-check-label" for="woman">Woman</label>
          </div>
        </div>

        <div class="col-12">
          <label for="address2" class="form-label">Address *</label>
          <input
            type="text"
            class="form-control"
            required
            v-model="profileData.address"
            id="address2"
          />
        </div>

        <div class="col-md-5">
          <label for="country" class="form-label">Country</label>
          <input
            type="text"
            class="form-control"
            v-model="profileData.country"
            id="zip"
          
          />
        </div>

        <div class="col-md-4">
          <label for="state" class="form-label">City *</label>
          <input
            type="text"
            class="form-control"
            id="zip"
            v-model="profileData.city"
            required
          />
        </div>

        <div class="col-md-3">
          <label for="zip" class="form-label">Zip</label>
          <input
            type="text"
            class="form-control"
            id="zip"
            v-model="profileData.zipCode"
      
          />
        </div>
      </div>
      <br />

      <div>
        <button
          v-if="!profileExists"
          class="btn btn-primary btn-md"
          type="submit"
          @click="handleFormSubmit"
        >
          Save profile
        </button>
        <button
          v-if="profileExists"
          class="btn btn-warning btn-md"
          @click="handleFormSubmit"
        >
          Update profile
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "@/axios";
import Swal from 'sweetalert2';


export default {
  name: "profile",
  data() {
    return {
      profileData: {
        job: "",
        name: "",
        firstName: "",
        nationality: "",
        phoneNumber: "",
        selectedGender: null,
        address: "",
        country: "",
        city: "",
        zipCode: "",
      },
      profileExists: false,
      userProfile: {},
    };
  },
  mounted() {
    this.fetchDataForUpdate();
  },
  methods: {
    handleFormSubmit() {
      if (this.profileExists) {
        this.updateProfile();
      } else {
        this.createProfile();
      }
    },
    fetchDataForUpdate() {
      const profile = axios
        .get("/api/candidate/profile",)
        .then(res => {
          this.userProfile = res.data;
          this.profileData = { ...this.userProfile };
          this.profileData.job = this.profileData[0].job;
          this.profileData.name = this.profileData[0].name;
          this.profileData.firstName = this.profileData[0].firstName;
          this.profileData.nationality = this.profileData[0].nationality;
          this.profileData.phoneNumber = this.profileData[0].phoneNumber;
          this.profileData.selectedGender = this.profileData[0].selectedGender;
          this.profileData.city = this.profileData[0].city;
          this.profileData.country = this.profileData[0].country;
          this.profileData.zipCode = this.profileData[0].zipCode;
          this.profileData.address = this.profileData[0].address;

          this.profileExists = true;
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    },
    async createProfile() {
      const formData = {
        ...this.profileData,
      };
      await axios
        .post(
          "/api/candidate/create/profile",
          formData,
        )
        .then((response) => {
          console.log(response.data);
   
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleGenderChange(gender) {
      // Si 'man' est sélectionné, déselectionne 'woman'
      if (gender === "man" && this.selectedGender === "woman") {
        this.selectedGender = null;
      }
      // Si 'woman' est sélectionné, déselectionne 'man'
      else if (gender === "woman" && this.selectedGender === "man") {
        this.selectedGender = null;
      }
    },
    async updateProfile() {
      try {
        // Envoyer les données de mise à jour à l'API
        const apiUrl = "/api/candidate/edit/profile";
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
  },

};
</script>

<style></style>
