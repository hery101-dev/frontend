<template>
  <br />
  <div class="container">
    <div class="col-12">
      <div class="row gy-4">
        <div
          class="col-lg-3 col-md-6 col-sm-12 wow fadeIn"
          data-wow-delay="0.1s"
          style="
            visibility: visible;
            animation-delay: 0.1s;
            animation-name: fadeIn;
          "
        >
          <div
            class="d-flex align-items-center rounded p-4 btn btn-outline-info"
          >
            <div
              class="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
              style="width: 45px; height: 45px"
            >
              <i class="fas fa-briefcase text-dark"></i>
            </div>
            <div class="link-container">
              <router-link to="/recruiter/dashboard/add-job"
                >Add Job</router-link
              >
            </div>
          </div>
        </div>
        <div
          class="col-lg-3 col-md-6 col-sm-12 wow fadeIn"
          data-wow-delay="0.3s"
          style="
            visibility: visible;
            animation-delay: 0.3s;
            animation-name: fadeIn;
          "
        >
          <div
            class="d-flex align-items-center btn btn-outline-info rounded p-4"
          >
            <div
              class="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
              style="width: 45px; height: 45px"
            >
              <i class="fas fa-user text-dark"></i>
            </div>
            <div class="link-container">
              <router-link to="/recruiter/dashboard/profile"
                >Profile</router-link
              >
            </div>
          </div>
        </div>
        <div
          class="col-lg-3 col-md-6 col-sm-12 wow fadeIn"
          data-wow-delay="0.3s"
          style="
            visibility: visible;
            animation-delay: 0.3s;
            animation-name: fadeIn;
          "
        >
          <div class="d-flex align-items-center rounded p-4 btn btn-outline-info">
            <div class="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
              style="width: 45px; height: 45px" >
              <i class="fas fa-list-ul text-dark"></i>
            </div>
            <div class="link-container">
              <router-link to="/recruiter/dashboard/list-job"
                >List Jobs</router-link
              >
            </div>
          </div>
        </div>

        <div
          class="col-lg-3 col-md-6 col-sm-12 wow fadeIn"
          data-wow-delay="0.5s"
          style="
            visibility: visible;
            animation-delay: 0.5s;
            animation-name: fadeIn;
          "
        >
          <div
            class="d-flex align-items-center btn btn-outline-info rounded p-4"
          >
            <div
              class="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
              style="width: 45px; height: 45px"
            >
              <i class="fas fa-file-alt text-dark"></i>
            </div>
            <div class="link-container">
              <router-link to="#">Application</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
  <br />
</template>

<script>

import { accountService } from "@/_services";
export default {
  methods: {
    logout() {
      accountService.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped></style>
