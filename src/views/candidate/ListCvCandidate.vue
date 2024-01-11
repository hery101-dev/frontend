<template>
  <div class="col-md-7 col-lg-8">
    <ul>
      <li v-for="cv in cvs" :key="cv.id">
        {{ cv.resume }}
        <button
          @click="toggleActive(cv)"
          :class="{
            btn: true,
            'btn-success': cv.isActive,
            'btn-secondary': !cv.isActive,
          }"
        >
          {{ cv.isActive ? "Disable" : "Enable" }}
        </button>
        <button @click="this.getCVDownloadLink(cv.id)" class="btn btn-info">
          <i class="fa fa-download" aria-hidden="true"></i>
        </button>
        <button @click="deleteCv(cv.id)" class="btn btn-danger">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "@/axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      cvs: [],
    };
  },
  async created() {
    await this.fetchCVs();
    await this.getCVDownloadLink();
  },
  methods: {
    async fetchCVs() {
      await axios
        .get("/api/list-cv")
        .then((response) => {
          this.cvs = response.data;
          this.fetchCVs();
        })
        .catch((error) => {
          console.error("There was an error fetching the CVs", error);
        });
    },
    async toggleActive(cv) {
      // Envoyer la requête pour activer/désactiver le CV
      await axios
        .put(`/api/${cv.id}/toggleActive`)
        .then(() => {
          cv.isActive = !cv.isActive;
        })
        .catch((error) => {
          console.error("There was an error updating the CV", error);
        });
    },
    async deleteCv(cvId) {
      await axios
        .delete(`/api/${cvId}/remove-cv`)
        .then(() => {
          this.cvs = this.cvs.filter((cv) => cv.id !== cvId);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "This is linked to an application",
            icon: "error",
            confirmButtonText: "OK",
          });
          //console.error("There was an error deleting the CV", error);
        });
    },
    async getCVDownloadLink(cvId) {
      console.log(cvId);
      try {
        const response = await axios.get(`/api/candidate/download-cv/${cvId}`);
        return window.location.origin + response.data;
      } catch (error) {
        //console.error("Error fetching CV download link:", error.response);
        return null;
      }
    },
  },
};
</script>
