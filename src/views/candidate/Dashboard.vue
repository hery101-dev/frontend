<template>
  <br />
  <div class="container">
    <div class="row g-5">
      <div class="col-md-2" >
        <h2>Area Candidate</h2>
        <ul class="icon-list">
          <li>
            <router-link to="/candidate/dashboard/application">Application</router-link>
          </li>
          <li>
            <router-link to="/candidate/dashboard/profile">Profile</router-link>
          </li>
          <li>
            <router-link to="/candidate/dashboard/list-cv">List CV</router-link>
          </li>
          <hr>
          <li>
            <router-link to="/candidate/dashboard/account-setting">Account</router-link>
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-secondary">Upload your CV</span>
            </h4>
            <form class="card p-2">
              <div class="input-group">
                <input
                  type="file"
                  class="form-control"
                  placeholder="Promo code"
                />
                <button class="btn btn-primary" type="button">Upload</button>
              </div>
            </form>
            <br />
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 class="my-0">Product name</h6>
                  <small class="text-muted">Brief description</small>
                </div>
                <span class="text-muted">$12</span>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 class="my-0">Second product</h6>
                  <small class="text-muted">Brief description</small>
                </div>
                <span class="text-muted">$8</span>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 class="my-0">Third item</h6>
                  <small class="text-muted">Brief description</small>
                </div>
                <span class="text-muted">$5</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between bg-light"
              >
                <div class="text-success">
                  <h6 class="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span class="text-success">−$5</span>
              </li>
            
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <br />
</template>

<script>

export default {
  name: "candidate",
};
</script>

<style scoped></style>
