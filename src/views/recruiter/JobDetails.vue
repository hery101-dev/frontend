<template>
  <div
    class="container-xxl py-5 wow fadeInUp"
    data-wow-delay="0.1s"
    style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp"
  >
    <div class="container">
      <div class="row gy-5 gx-4">
        <div class="col-lg-8">
          <div class="d-flex align-items-center mb-5">
            <img
              class="flex-shrink-0 img-fluid border rounded"
              src="#"
              alt="logo"
              style="width: 80px; height: 80px"
            />
            <div class="text-start ps-4">
              <h3 class="mb-3">{{ job.title }}</h3>
              <span class="text-truncate me-3"
                ><i class="fa fa-map-marker-alt text-primary me-2"></i>
                {{ job.address }}/{{ job.city }}/{{ job.country }}</span
              >
              <span class="text-truncate me-3"
                ><i class="far fa-clock text-primary me-2"></i
                >{{ job.contrat }}</span
              >
              <span class="text-truncate me-0"
                ><i class="far fa-money-bill-alt text-primary me-2"></i
              ></span>
            </div>
          </div>

          <div class="mb-5">
            <h4 class="mb-3">Job description</h4>
            <div style="overflow: visible"> <p v-html="job.description"></p></div>
          </div>
        </div>

        <div class="col-lg-4">
          <div
            class="bg-light rounded p-5 mb-4 wow slideInUp"
            data-wow-delay="0.1s"
            style="
              visibility: visible;
              animation-delay: 0.1s;
              animation-name: slideInUp;
            "
          >
            <h4 class="mb-4">Job Summery</h4>
            <p>
              <i class="fa fa-angle-right text-primary me-2"></i>Published On:
              {{ formattedDate(job.createdAt) }}
            </p>

            <p>
              <i class="fa fa-angle-right text-primary me-2"></i>Contrat:
              {{ job.contrat }}
            </p>
            <p>
              <i class="fa fa-angle-right text-primary me-2"></i>Salary:
              {{ job.salary }}
            </p>
            <p>
              <i class="fa fa-angle-right text-primary me-2"></i>Position based
              in or city:
              {{ job.city }}
            </p>
            <p class="m-0">
              <i class="fa fa-angle-right text-primary me-2"></i>Deadline:
              {{ formattedDate(job.deadline) }}
            </p>
          </div>
          <div
            class="bg-light rounded p-5 wow slideInUp"
            data-wow-delay="0.1s"
            style="
              visibility: visible;
              animation-delay: 0.1s;
              animation-name: slideInUp;
            "
          >
            <h4 class="mb-4">Company Detail</h4>
            <p>
              {{ job.company_name }},
              <a
                href="job.website "
                target="_blank"
                rel="noopener noreferrer"
                >{{ job.website }}</a
              >
            </p>
            <p class="m-0">{{ job.company_detail ? job.detail : null }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";


export default {
  props: {
    job: {
      type: Object,
      required: true,

    },
  },
  methods: {
    stripHTML(html) {
      let doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    },
    formattedDate(dateString) {
      const dateObject = parseISO(dateString);
      return format(dateObject, "dd-MMM-yyyy");
    },
  },
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
