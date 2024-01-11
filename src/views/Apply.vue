<template>
  <br />
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <div class="card mb-4" style="max-height: 567px; overflow-y: auto">
          <div class="card-body">
            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between row">
                <div class="d-flex justify-content-start col-6">
                  <div
                    class="text-end"
                    style="overflow-y: auto; max-height: 100px"
                  >
                    <h4>{{ jobs.title }}</h4>
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
                    <h6>{{ jobs.contrat }}</h6>
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
                <h6 class="mb-1">{{ jobs.company_name }}</h6>
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
                    <h6>{{ jobs.address }}, {{ jobs.city }}</h6>
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
                      {{ formatRelativeDate(jobs.createdAt) }}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <p v-html="jobs.description"></p>
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
                    <h6>{{ jobs.deadlineAt }}</h6>
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
                  <h6 class="mb-1">{{ jobs.company_name }}</h6>
                </div>
              </div>

              <p>{{ jobs.company_detail }}</p>
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
                      <p>{{ jobs.website }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card mb-4">
          <form
            class="card p-2"
            @submit.prevent="submitForm"
            enctype="multipart/form-data"
          >
            <label for="resume" class="form-label">Resume File</label>
            <div class="input-group">
              <input
                type="file"
                class="form-control"
                name="resume"
                ref="resume"
                id="resume"
                placeholder="Upload CV"
              />
            </div>
            <br />
            <label for="coverLetterFile" class="form-label"
              >Cover Letter File</label
            >
            <div class="input-group">
              <input
                type="file"
                name="coverLetterFile"
                ref="coverLetterFile"
                id="coverLetterFile"
                class="form-control"
                placeholder="Upload LM"
              />
            </div>
            <br />

            <label for="existingCVs" class="form-label">Or if you would prefer the CVs of your account</label>
            <div class="input-group">
              <select
                v-if="existingCVs && existingCVs.length > 0"
                v-model="selectedCV"
                class="form-select"
                name="existingCVs"
                id="existingCVs"
              >
                <option v-for="cv in existingCVs" :key="cv.id" :value="cv.id">
                  {{ cv.resume }}
                </option>
              </select>
            </div>
            <br />
            <br />
            <div class="form-group text-center">
              <button
                class="btn btn-primary"
                style="width: 200px"
                type="submit"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
import { format, parseISO } from "date-fns";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      jobId: null,
      jobs: {},
      existingCVs: [],
      selectedCV: null,
      downloadLink: '',
    };
  },
  created() {
    this.jobId = this.$route.params.id;
    this.getJobDetails(this.jobId);
    this.getExistingCVs();
  },

  mounted() {
    this.setDownloadLink();
  },
  methods: {
    async submitForm(jobId) {
      const formData = new FormData();
      formData.append("resume", this.$refs.resume.files[0]);
      formData.append("coverLetterFile", this.$refs.coverLetterFile.files[0]);
      formData.append("id", this.jobId);
      formData.append('selectedCV', this.selectedCV);

      console.log(this.selectedCV)

      for (const entry of formData.entries()) {
          console.log(entry[0], entry[1]);
        }

      await axios
        .post(
          "/api/candidate/upload-file",
          formData,
        )
        .then((response) => {
          Swal.fire({
            title: "Success",
            text: response.data,
            icon: "success",
            confirmButtonText: "OK",
          });
          this.$router.push("/candidate/dashboard/application");
        })
        .catch((error) => {
          console.error(error.response.data);
          Swal.fire({
            title: "Error",
            text: error.response,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
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

    async getExistingCVs() {
      await axios
        .get("/api/candidate/get-cv")
        .then((response) => {
          this.existingCVs = response.data.existingCVs;
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },

    async getCVDownloadLink(cvId) {
      try {
        const response = await axios.get(
          `/api/candidate/download-cv/${cvId}`,
        );
        return (
          window.location.origin + response.data
        );
      } catch (error) {
        console.error("Error fetching CV download link:", error.response);
        return null;
      }
    },

    async setDownloadLink() {
      if (this.selectedCV) {
        this.downloadLink = await this.getCVDownloadLink(this.selectedCV);
      }
    },

    async getJobDetails() {
      await axios
        .get(
          `/api/job-offer-detail/${this.jobId}`,
        )
        .then((res) => {
          res.data.deadlineAt = format(
            parseISO(res.data.deadlineAt),
            "dd-MMM-yyyy"
          );
          res.data.createdAt = format(
            parseISO(res.data.createdAt),
            "dd-MMM-yyyy"
          );

          this.jobs = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>
<style></style>
