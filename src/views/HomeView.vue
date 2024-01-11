<template>
  <!-- Search job -->

  <div class="container pt-5">
    <div class="row justify-content-center align-items-center" >
      <div class="col-lg-8 text-center ">
            <h1 class="heading aos-init aos-animate" data-aos="fade-up">
              Easiest way to find your jobs
            </h1>
            <div class="narrow-w form-search  d-flex align-items-stretch mb-3 aos-init aos-animate"  data-aos="fade-up" data-aos-delay="200">
              <input type="text" v-model="searchTerm" class="form-control px-4 rounded-3" style="border-radius: 15px;" placeholder="Title of Job">
              <button type="button" @click="listJob" class="btn btn-primary">Search</button>
            </div>
          </div>
    </div>
  </div>

  <!-- Jobs listing -->

  <div class="container pt-5">
    <div class="row">
      <!-- Colonne pour la liste des emplois -->
      <div class="col-lg-4 rounded" style="padding: 1px">
        <ul class="list-unstyled">
          <li v-for="job in paginatedJobs" :key="job.id">
            <div
              class="card mb-4"
              @click="showJobDetails(job)"
              :class="{
                'active-card': selectedJob && selectedJob.id === job.id,
              }"
            >
              <div
                class="card-body"
                style="overflow-y: auto; max-height: 400px"
              >
                <div class="d-flex align-items-center">
                  <img
                    class="img-fluid flex-shrink-0 rounded"
                    :src="this.asset(job.imgLogo)"
                    alt="logo"
                    style="width: 50px; height: 50px"
                  />
                  <div class="ps-3">
                    <h6 class="mb-1">{{ job.company_name }}</h6>
                    <a href="https://{{ job.website }}">{{ job.website }}</a>
                  </div>
                </div>

                <hr />
                <h5 class="card-title">{{ job.title }}</h5>
                <span class="text-truncate me-3"
                  ><i class="fa fa-map-marker-alt text-secondary me-2"></i
                  >{{ job.address }}, {{ job.city }}, {{ job.country }}</span
                >
                <span class="text-truncate me-3"
                  ><i class="far fa-clock text-secondary me-2"></i
                  >{{ job.contrat }}</span
                ><br />
                <i class="fa-solid fa-calendar"></i>
                <small>{{
                  formatRelativeDate(formattedDate(job.createdAt))
                }}</small>
                <br /><br />
                <div class="description-container">
                  <p class="description">{{ stripHTML(job.description) }}</p>
                </div>

                <small class="text-truncate"
                  ><i class="far fa-calendar-alt text-secondary me-2"></i
                  >Deadline: {{ formattedDeadline(job.deadlineAt) }}</small
                >
              </div>
            </div>
          </li>
        </ul>
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item" v-for="page in pageCount" :key="page">
              <a class="page-link" @click="changePage(page)">{{ page }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Colonne pour les détails de l'emploi sélectionné -->
      <div class="col-lg-8">
        <div
          class="card mb-4"
          v-if="selectedJob"
          style="max-height: 830px; overflow-y: auto"
        >
          <div class="card-body">
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between row">
                <div class="d-flex justify-content-start col-6">
                  <div
                    class="text-end"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h4>{{ selectedJob.title }}</h4>
                  </div>
                </div>
                <div class="d-flex justify-content-end col-6" v-if="isLoggedIn() && isCandidate() && !isTokenExpired()">
                  <div
                    class="text-start"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <router-link
                      :to="{ name: 'applyJob', params: { id: selectedJob.id } }"
                      class="btn btn-primary"
                      >Apply Now</router-link>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between row">
                <div class="d-flex justify-content-start col-6">
                  <div
                    class="text-end"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>Type of Contract</h6>
                  </div>
                </div>
                <div class="d-flex justify-content-end col-6">
                  <div
                    class="text-start"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>{{ selectedJob.contrat }}</h6>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div class="d-flex align-items-center">
              <img
                class="img-fluid flex-shrink-0 rounded"
                src=""
                alt="logo"
                style="width: 50px; height: 50px"
              />
              <div class="ps-3">
                <h6 class="mb-1">{{ selectedJob.company_name }}</h6>
              </div>
            </div>
            <hr />
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between row">
                <div class="d-flex justify-content-start col-6">
                  <div
                    class="text-end"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>Address</h6>
                  </div>
                </div>
                <div class="d-flex justify-content-end col-6">
                  <div
                    class="text-start"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>{{ selectedJob.address }}, {{ selectedJob.city }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between row">
                <div class="d-flex justify-content-start col-6">
                  <div
                    class="text-end"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>Publication Date</h6>
                  </div>
                </div>
                <div class="d-flex justify-content-end col-6">
                  <div
                    class="text-start"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>
                      {{
                        formatRelativeDate(formattedDate(selectedJob.createdAt))
                      }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h5>Job Description</h5>
            <p style="font-size: 15px;" v-html="selectedJob.description"></p>
            <hr />
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between row">
                <div class="d-flex justify-content-start col-6">
                  <div
                    class="text-end"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>Deadline</h6>
                  </div>
                </div>
                <div class="d-flex justify-content-end col-6">
                  <div
                    class="text-start"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h6>{{ formattedDeadline(selectedJob.deadlineAt) }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <h6>Company Detail</h6>
            <div class="container">
              <div class="d-flex align-items-center">
                <img
                  class="img-fluid flex-shrink-0 rounded"
                  src=""
                  alt="logo"
                  style="width: 50px; height: 50px"
                />
                <div class="ps-3">
                  <h6 class="mb-1">{{ selectedJob.company_name }}</h6>
                </div>
              </div>

              <p>{{ selectedJob.company_detail }}</p>
              <hr />
              <div class="d-grid gap-2">
                <div class="d-flex justify-content-between row">
                  <div class="d-flex justify-content-start col-6">
                    <div
                      class="text-end"
                      style="overflow-y: auto; max-height: 100px"
                    >
                      <h6>Website</h6>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end col-6">
                    <div
                      class="text-start"
                      style="overflow-y: auto; max-height: 100px"
                    >
                      <p>{{ selectedJob.website }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12" v-else>
          <div class="card text-center" style="padding: 50px">
            <p class="lead mb-4">
              Submit your CV so that recruiters can find you!
            </p>
            <div class="d-grid d-sm-flex justify-content-sm-center">
              <button type="button" class="btn btn-outline-info">
                Upload CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
import { format, parseISO } from "date-fns";
import { decode } from "jwt-js-decode";

export default {
  data() {
    return {
      jobs: [],
      active: false,
      currentPage: 1,
      itemsPerPage: 2,
      selectedJob: null,
      imgLogo: null,
          searchTerm: "",
    };
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter((job) => job.active);
    },
    paginatedJobs() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredJobs.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
    },
  },
  async created() {
    this.listJob()
    this.showJobDetails()
  },
  methods: {
    async listJob() {
      await axios
      .get("/job-offer-list")
      .then((res) => {
        this.jobs = res.data.map((job) => {
          return {
            ...job,
            active: job.status,
            imgLogo: res.data[0].logo
          };
        });
        if (this.searchTerm) {
          this.jobs = this.jobs.filter((job) =>
            job.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    },
    getUserRole() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          let decodedToken = decode(token);
          return decodedToken.payload.roles;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      return null;
    },
    isLoggedIn() {
      return localStorage.getItem("token") !== null;
    },
    isCandidate() {
      const userRoles = this.getUserRole();
      return userRoles && userRoles.includes("ROLE_CANDIDATE");
    },
    isTokenExpired() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          let decodedToken = decode(token);
          return isTokenExpired(decodedToken.payload.exp);
        } catch (error) {
          console.error("Error decoding token:", error);
          return true;
        }
      }
      return true;
    },
    asset(path) {
      return "http://localhost:8000/assets/upload/image/" + path;
    },
    async showJobDetails(job) {
      this.selectedJob = job;
    },
    changePage(page) {
      this.currentPage = page;
    },
    formattedDate(dateString) {
      const dateObject = parseISO(dateString);
      return format(dateObject, "yyyy-MM-dd");
    },
    formattedDeadline(dateString) {
      const dateObject = parseISO(dateString);
      return format(dateObject, "dd-MMM-yyyy");
    },
    stripHTML(html) {
      let doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    },
    formatRelativeDate(dateString) {
      const date = new Date(dateString);
      const currentDate = new Date();
      const timeDifference = currentDate - date;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysDifference === 0) {
        return "Today";
      } else if (daysDifference === 1) {
        return "Yesterday";
      } else {
        return `Created ${daysDifference} days ago`;
      }
    },
  },
};
</script>
<style>
.job-item {
  border: 2px solid transparent;
  border-radius: 5px;
  box-shadow: 0 0 45px rgba(12, 12, 12, 0.08);
  transition: 0.5s;
}
span > i {
  color: aqua;
}

.description {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: smaller;
}

.description-container {
  height: 145px;
  overflow: hidden;
}
.card {
  transition: box-shadow 0.3s ease;
  border: 2px solid #ccc;
}

.card:hover {
  border-color: #008080;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.active-card {
  border-color: #008080; /* Couleur de bordure pour indiquer l'activité */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
