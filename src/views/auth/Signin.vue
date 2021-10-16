<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <div class="card">
            <h2>Login</h2>

            <b-form @submit.prevent="onSubmit" class="w-100">
              <b-form-group
                id="input-group-1"
                label="Email:"
                label-for="input-1"
              >
                <div class="inputField">
                  <b-icon icon="envelope"></b-icon>
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    required
                  ></b-form-input>
                </div>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="input-2"
              >
                <div class="inputField">
                  <b-icon icon="lock"></b-icon>

                  <b-form-input
                    id="input-2"
                    type="password"
                    v-model="form.password"
                    required
                  ></b-form-input>
                </div>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                class="loginBtn mt-4 mb-3"
              >
                Login
              </b-button>
              <div class="d-flex justify-content-between">
                <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox-group
                    v-model="form.checked"
                    id="checkboxes-4"
                    :aria-describedby="ariaDescribedby"
                    size="md"
                  >
                    <b-form-checkbox value="rememberMe"
                      >Remember Me</b-form-checkbox
                    >
                  </b-form-checkbox-group>
                </b-form-group>

                <router-link to="/forgot-password"
                  >Forgot Password ?</router-link
                >
              </div>
            </b-form>
            <p class="text-center my-4">
              Don't have an account?
              <router-link to="/signup">Sign Up</router-link>
            </p>
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
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
    padding-top: 100px;

  .row {
    min-height: 100vh;

    .card {
      width: 100%;
      box-shadow: 0px 0px 10px rgb(185, 184, 184);
      padding: 20px;
      border-radius: 20px;
      

      > h2 {
        font-weight: 800 !important;
        padding-bottom: 20px;
        text-align:center;


      }

      a {
        font-weight: bold;
      }

      form {
        label {
          font-size: 14px;
        }
        .inputField {
          position: relative;
          .b-icon {
            position: absolute;
            left: 15px;
            top: 8px;
            font-size: 20px;
          }
        }
        input {
          border-radius: 20px;
          padding-left: 45px;
        }
        .loginBtn {
          width: 100%;
          border-radius: 20px;
        }
      }

      @media (max-width: 992px) {
        width: 100%;
      }
    }
  }
}
</style>