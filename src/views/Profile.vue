<template>
  <div class="schedule">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <div class="card">
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Your Name:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Your Phone:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  type="tel"
                  v-model="form.phone"
                  required
                ></b-form-input>
              </b-form-group>

              <div class="d-flex justify-content-center align-items-center">
                <b-button type="submit" variant="primary" class="mr-5">
                  Save
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
export default {
  data() {
    return {
      form: {
        email: "qwerty@gmil.com",
        name: "qwerty",
        phone: "1234567890",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.phone = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule {
  min-height: calc(100vh - 56px);
  padding-top: 15vh;
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