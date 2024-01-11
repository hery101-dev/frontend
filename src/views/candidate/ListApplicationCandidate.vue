<template>
  <div class="col-md-7 col-lg-8">
    <h4 class="mb-3">List of application</h4>
    <div class="list-group list-group-flush border-bottom scrollarea">
      <div
        class="list-group-item list-group-item-action py-3 lh-tight"
        aria-current="true"
        v-for="app in application"
        :key="app.id"
      >
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">{{ app.job }}</strong>
          <small>{{ app.applicationStatus }}</small>
        </div>
        <div class="col-10 mb-1 small">
          Apply on {{ this.formattedDate(app.submitedAt.date) }}
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation" class="align-items-center justify-content-center">
      <ul class="pagination text-center" style="display: flex;">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="prevPage" href="#">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" @click="gotoPage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="nextPage" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import axios from "@/axios";
import { format, parseISO } from "date-fns";


export default {
  data() {
    return {
      application: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },

  computed: {
    paginatedApplications() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.application.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.application.length / this.itemsPerPage);
    },
  },

  async mounted() {
    await this.fetchApplication();
  },

  watch: {
    currentPage() {
      this.fetchApplication();
    },
  },

  methods: {
    formattedDate(dateString) {
      const dateObject = parseISO(dateString);
      return format(dateObject, "dd-MMM-yyyy");
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    gotoPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    async fetchApplication() {
      await axios
      .get(
        "/api/candidate/application-candidate-list",
      )
      .then((res) => {
        this.application = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
    }

  },
};
</script>
