<template>
  <div class="schedule">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <div class="card">
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group id="input-group-1" label="To:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="form.to"
                  placeholder="Recipient's email or name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Date:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.date"
                  type="date"
                  placeholder="Enter Date"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Time:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.time"
                  type="time"
                  placeholder="Enter time"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Message:"
                label-for="input-4"
              >
                <b-form-textarea
                  id="input-4"
                  v-model="form.text"
                  placeholder="Your message"
                  rows="3"
                  max-rows="6"
                  style="overflow: auto"
                ></b-form-textarea>
              </b-form-group>

              <div class="d-flex justify-content-center align-items-center">
                <b-button type="submit" variant="primary" class="mr-5">
                  Submit
                </b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        to: "",
        date: "",
        time: "",
        text: "",
      },
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "isAuthenticated",
      // ...
    ]),
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push("/login");
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.to = "";
      this.form.date = "";
      this.form.time = "";
      this.form.text = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule {
  min-height: calc(100vh - 56px);
  padding-top: 50px;
  overflow: hidden;
  background: rgb(224, 240, 250);

  .card {
    width: 100%;
    box-shadow: 0px 0px 10px rgb(185, 184, 184);
    padding: 20px;
    border-radius: 20px;
  }
}
</style>