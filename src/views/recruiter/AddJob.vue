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
                  @submit.prevent="jobPost"
                  enctype="multipart/form-data"
                >
                  <div class="form-group">
                    <label for="title">Title : </label>
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="title"
                      name="title"
                      v-model="jobData.title"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="description">Description : </label>
                    <QuillEditor
                      style="height: 150px"
                      toolbar="#my-toolbar"
                      theme="snow"
                      v-model:content="jobData.description"
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
                    <label for="contrat">Contrat :</label>
                    <div v-for="contrat in contrat" :key="contrat.id">
                      <label>
                        <input
                          type="checkbox"
                          :value="contrat.type"
                          v-model="jobData.contrats"
                        />
                        {{ contrat.type }}
                      </label>
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
                        v-model="jobData.salary"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="deadline">Deadline : </label>
                      <input
                        type="date"
                        class="form-control form-control-user"
                        id="deadline"
                        name="deadline"
                        v-model="jobData.deadline"
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="category">Category : </label>
                    <select
                      v-model="jobData.category"
                      name="category"
                      class="form-select"
                      id="category"
                      required
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
                        v-model="jobData.address"
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="city">City : </label>
                      <input
                        type="text"
                        class="form-control form-control-user"
                        name="city"
                        id="city"
                        v-model="jobData.city"
                        required
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
                        v-model="jobData.company"
                        required
                      />
                    </div>
                    <div class="col-sm-6">
                      <label for="website">Website : </label>
                      <input
                        type="text"
                        class="form-control form-control-user"
                        name="website"
                        id="website"
                        v-model="jobData.website"
                        required
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
                        v-model="jobData.company_detail"
                        required
                      ></textarea>
                    </div>
                    <div class="col-sm-6">
                      <label for="website">Country : </label>
                      <input
                        type="text"
                        class="form-control"
                        name="country"
                        id="country"
                        v-model="jobData.country"
                        required
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
                          required
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
                    Save Job
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
import Swal from "sweetalert2";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      jobData: {
        title: "",
        description: "",
        deadline: "",
        address: "",
        city: "",
        company: "",
        website: "",
        country: "",
        company_detail: "",
        salary: null,
        contrats: []
      },
      categories: [],
      contrat: [],
      logoFile: null,
      previewImage: null,
    };
  },

  created() {
    this.fetchCategory();
    this.fetchContrat();
  },

  methods: {
    async fetchCategory() {
      await axios
        .get("/category-list")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    async fetchContrat() {
      await axios
        .get("/contrat-list")
        .then((res) => {
          this.contrat = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    onQuillEditorInput(value) {
      console.log(value);
    },
    async loadJobDetails(jobId) {
      try {
        const response = await axios.get(`/api/recruiter/job-details/${jobId}`);
        this.jobDetails = response.data;
      } catch (error) {
        console.error(error.response.data);
      }
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

    async jobPost() {
      if (
        !this.jobData.title ||
        !this.jobData.description ||
        !this.jobData.contrats ||
        !this.jobData.deadline ||
        !this.jobData.city ||
        !this.jobData.company ||
        !this.jobData.website ||
        !this.jobData.country ||
        !this.jobData.company_detail ||
        !this.logoFile
      ) {
        Swal.fire({
          title: "Error",
          text: "Please fill in all required fields",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      try {
        const formData = new FormData();
        formData.append("title", this.jobData.title);
        formData.append("description", this.jobData.description);
        formData.append('contrats', JSON.stringify(this.jobData.contrats));
        formData.append("salary", this.jobData.salary);
        formData.append("deadline", this.jobData.deadline);
        formData.append("category", this.jobData.category);
        formData.append("address", this.jobData.address);
        formData.append("city", this.jobData.city);
        formData.append("company", this.jobData.company);
        formData.append("website", this.jobData.website);
        formData.append("country", this.jobData.country);
        formData.append("company_detail", this.jobData.company_detail);
        formData.append("logo", this.logoFile);

        // for (const entry of formData.entries()) {
        //   console.log(entry[0], entry[1]);
        // }

        const response = await axios.post(
          "/api/recruiter/create-jobOffer",
          formData
        );
        Swal.fire({
          title: "Success",
          text: response.data,
          icon: "success",
          confirmButtonText: "OK",
        });
        this.$router.push("/recruiter/dashboard/list-job");
      } catch (error) {
        console.error(error.response.data);
        Swal.fire({
          title: "Error",
          text: "Error sending data",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>

<style></style>
