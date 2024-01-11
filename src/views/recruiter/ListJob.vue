<template>
  <div class="container">
    <div class="row g-4">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="col-lg-3 col-md-12 col-sm-12 wow fadeInUp"
        data-wow-delay="0.1s"
        style="
          visibility: visible;
          animation-delay: 0.1s;
          animation-name: fadeInUp;
        "
      >
        <div class="cat-item rounded p-4 h-100 d-flex flex-column">
          <div>
            <a class="">
              <h6 class="mb-3">{{ job.title }}</h6>
              <p class="mb-0">{{ stripHTML(job.description) }}</p>
              <p class="mb-0">{{ formattedDate(job.createdAt) }}</p>
            </a>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <router-link
              class="btn btn-sm btn-primary"
              :to="{ name: 'edit-job', params: { id: job.id } }"
            >
              <i class="fas fa-edit"></i>
            </router-link>
            <button
              class="btn btn-sm btn-primary"
              @click="showJobDetails(job.id)"
            >
              Show
            </button>
            <!--button
              :class="{
                btn: true,
                'btn-danger': !job.active,
                'btn-success': job.active,
              }"
              @click="status(job.id)"
              type="submit"
            >
              {{ job.active ? "active" : "inactive" }}
            </!--button -->
            <Toggle v-model="job.active"     @click="status(job.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <br />

  <div v-if="selectedJob">
    <JobDetails :job="selectedJob" />
  </div>
</template>

<script>
import axios from "@/axios";
import { format, parseISO } from "date-fns";
import JobDetails from "./JobDetails.vue";
import Toggle from '@vueform/toggle';


export default {
  components: {
    JobDetails,
    Toggle,
  },
  data() {
    return {
      jobs: [],
      logoUrl: "http://localhost:8000/assets/upload/image",
      selectedJob: null,
      active: false,
      value: true,
      contrat: null
    };
  },
 

  async created() {
   this.jobList()
  },

  methods: {
    stripHTML(html) {
      let doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    },

    async jobList() {
      await axios
      .get("/api/recruiter/job-list")
        .then((res) => {
        this.jobs = res.data.map((job) => {
          return {
            ...job,
            logoUrl: `${this.logoUrl}/${job.logo}`,
            active: job.status
          };       
        });
        this.jobList();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    },

    async status(id) {
      await axios
        .put(
          `/api/recruiter/status-job/${id}`,
          null
        )
        .then((res) => {
          const updatedJob = this.jobs.find((job) => job.id === id);
          if (updatedJob) {
            updatedJob.active = res.data.status;
            updatedJob.active = !updatedJob.active;
            //this.$forceUpdate();
          }
          this.jobList()
          this.$forceUpdate();
      
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async showJobDetails(jobId) {
      await axios
        .get(
          `/api/recruiter/job-details/${jobId}`,
        )
        .then((res) => {
          this.selectedJob = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    // Fonction pour formater la date
    formattedDate(dateString) {
      const dateObject = parseISO(dateString);
      return format(dateObject, "dd-MMM-yyyy");
    },

    handleLogoChange(event) {
      this.logoFile = event.target.files[0];
      if (this.logoFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(this.logoFile);
      }
    },
  },
};
</script>

<style scoped>
.cat-item {
  display: block;
  border: 1px solid #0dcaf0;
  transition: 0.5s;
  background-color: #fff;
}

.col-lg-3 p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

a {
  cursor: pointer;
}
</style>
<style src="@vueform/toggle/themes/default.css"></style>