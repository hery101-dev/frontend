<template>
  <div class="overview">
    <div class="container">
      <div class="card o-hidden border-0" style="background-color: transparent">
        <div class="card-body" style="padding: 0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="p-5 col-lg-8 col-md-8 col-sm-12">
              <div class="p-0">
                <form
                  class="user"
                  method="post"
                  @submit.prevent="updateJob"
                  enctype="multipart/form-data"
                >
                  <div class="form-group">
                    <label for="title">Title : </label>
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="title"
                      name="title"
                      v-model="jobs.title"
                    />
                  </div>
                  <div class="form-group">
                    <label for="description">Description : </label>
                    <QuillEditor
                      style="height: 150px"
                      toolbar="#my-toolbar"
                      theme="snow"
                      v-model:content="jobs.description"
                      contentType="html"
                    >
                      <template #toolbar>
                        <div id="my-toolbar">
                          <select class="ql-size">
                            <option value="small"></option>
                            <option selected></option>
                            <option value="large"></option>
                            <option value="huge"></option>
                          </select>

                          <select class="ql-header">
                            <option :value="1"></option>
                            <option :value="2"></option>
                            <option :value="3"></option>
                            <option :value="4"></option>
                            <option :value="5"></option>
                            <option :value="6"></option>
                          </select>

                          <button class="ql-bold"></button>
                          <button class="ql-italic"></button>
                          <button class="ql-underline"></button>
                          <button class="ql-strike"></button>
                          <button class="ql-script" value="sub"></button>
                          <button class="ql-script" value="super"></button>

                          <select class="ql-align">
                            <option value="center"></option>
                            <option value="right"></option>
                            <option value="justify"></option>
                          </select>

                          <button class="ql-list" value="ordered"></button>
                          <button class="ql-list" value="bullet"></button>
                          <button class="ql-blockquote"></button>
                          <button class="ql-code-block"></button>
                          <button class="ql-link"></button>
                          <button class="ql-image"></button>
                        </div>
                      </template>
                    </QuillEditor>
                  </div>
                  <div class="form-group">
                    <label for="contrat"
                      >Contrat :
                      <p>{{ jobs.contrat }}</p></label
                    >

                    <div v-for="contrats in contrats" :key="contrats.id">
                      <input
                        type="checkbox"
                        :value="contrats.type"
                        v-model="contratEdit"
                      />
                      {{ contrats.type }}
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6">
                      <label for="contrat">Salary : </label>
                      <input
                        type="number"
                        class="form-control form-control-user"
                        id="salary"
                        name="salary"
                        v-model="jobs.salary"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="deadline">Deadline : </label>
                      <input
                        type="date"
                        class="form-control form-control-user"
                        id="deadline"
                        name="deadline"
                        v-model="jobs.deadline"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="category">Category : </label>
                    <select
                      v-model="jobs.category"
                      name="category"
                      class="form-control"
                      id="category"
                    >
                      <option value="" disabled>Select category</option>
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.category_name"
                      >
                        {{ category.category_name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6">
                      <label for="address">Address : </label>
                      <input
                        type="text"
                        class="form-control form-control-user"
                        name="address"
                        id="address"
                        v-model="jobs.address"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="city">City : </label>
                      <input
                        type="text"
                        class="form-control form-control-user"
                        name="city"
                        id="city"
                        v-model="jobs.city"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6">
                      <label for="company">Company : </label>
                      <input
                        type="text"
                        class="form-control form-control-user"
                        name="company"
                        id="company"
                        v-model="jobs.company"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="website">Website : </label>
                      <input
                        type="text"
                        class="form-control form-control-user"
                        name="website"
                        id="website"
                        v-model="jobs.website"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6">
                      <label for="company">Company Details : </label>
                      <textarea
                        type="text"
                        class="form-control form-control-user"
                        name="company_detail"
                        id="company_detail"
                        v-model="jobs.company_detail"
                      ></textarea>
                    </div>
                    <div class="col-sm-6">
                      <label for="website">Country : </label>
                      <input
                        type="text"
                        class="form-control"
                        name="country"
                        id="country"
                        v-model="jobs.country"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="form-group">
                    <div class="row">
                      <div class="col-6">
                        <label for="logo">Logo</label>
                        <input
                          type="file"
                          id="logo"
                          accept="image/*"
                          class="col-6 form-control"
                          name="logo"
                          @change="handleLogoChange"
                        />
                      </div>

                      <div class="col-6">
                        <img
                          v-if="previewImage"
                          :src="previewImage"
                          alt="Preview"
                          :width="100"
                          :height="100"
                          class="rounded mx-auto d-block"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    class="btn btn-primary btn-user btn-block"
                  >
                    Edit Job
                  </button>
                </form>
              </div>
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
import Swal from "sweetalert2";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      previewImage: null,
      categories: [],
      contrats: [],
      jobs: {},
      contratEdit: [],
      jobId: null,
    };
  },
  async created() {
    this.getCategories();
    this.jobId = this.$route.params.id;
    this.getJobDetails();
    this.fetchContrat();
  },

  methods: {
    async fetchContrat() {
      await axios
        .get("/contrat-list")
        .then((res) => {
          this.contrats = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    async getCategories() {
      await axios
        .get("/category-list")
        .then((res) => (this.categories = res.data))
        .catch((err) => {
          console.log(err.response.data);
        });
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

    async getJobDetails() {
      await axios
        .get(`/api/recruiter/job-details/${this.jobId}`)
        .then((res) => {
          res.data.deadline = format(parseISO(res.data.deadline), "yyyy-MM-dd");
          this.jobs = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    async updateJob() {
      try {
        const formData = new FormData();

        formData.append("title", this.jobs.title);
        formData.append("description", this.jobs.description);
        formData.append("salary", this.jobs.salary);
        formData.append("dealine", this.jobs.deadline);
        formData.append("category", this.jobs.category);
        formData.append("address", this.jobs.address);
        formData.append("city", this.jobs.city);
        formData.append("company", this.jobs.company);
        formData.append("website", this.jobs.website);
        formData.append("country", this.jobs.country);
        formData.append("company_detail", this.jobs.company_detail);

        if (this.logoFile) {
          formData.append("logo", this.logoFile);
        }

        formData.append("contratEdit", JSON.stringify(this.contratEdit));

        for (const entry of formData.entries()) {
          console.log(entry[0], entry[1]);
        }

        await axios.put(`/api/recruiter/edit-job/${this.jobId}`,formData.entries());
        Swal.fire({
          title: "Success",
          text: "Job updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        this.$router.push("/recruiter/dashboard/list-job");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'emploi :", error);
      }
    },
  },
};
</script>

<style></style>
