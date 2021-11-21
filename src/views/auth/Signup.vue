<template>
  <div class="signup">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <div class="card">
            <h2>Signup</h2>
            <b-form
              @submit.prevent="onSubmit"
              class="w-100 needs-validation"
              novalidate
            >
              <b-form-group
                id="input-group-1"
                label="Name:"
                label-for="input-1"
              >
                <div class="inputField">
                  <b-icon icon="person"></b-icon>
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.name"
                    aria-describedby="input-1-live-feedback"
                    :state="validateState('name')"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-2-live-feedback"
                    >Name is required</b-form-invalid-feedback
                  >
                </div>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Email:"
                label-for="input-2"
              >
                <div class="inputField">
                  <b-icon icon="envelope"></b-icon>
                  <b-form-input
                    id="input-2"
                    type="email"
                    v-model="form.email"
                    aria-describedby="input-2-live-feedback"
                    :state="validateState('email')"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-2-live-feedback"
                    >Please check your email</b-form-invalid-feedback
                  >
                </div>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Mobile:"
                label-for="input-3"
              >
                <div class="inputField">
                  <b-icon icon="phone"></b-icon>
                  <b-form-input
                    id="input-3"
                    type="tel"
                    v-model="form.phone"
                    aria-describedby="input-3-live-feedback"
                    :state="validateState('phone')"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-3-live-feedback"
                    >Mobile should be 10 characters
                    long</b-form-invalid-feedback
                  >
                </div>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Password:"
                label-for="input-4"
              >
                <div class="inputField">
                  <b-icon icon="lock"></b-icon>
                  <b-form-input
                    id="input-4"
                    type="password"
                    v-model="form.password"
                    aria-describedby="input-4-live-feedback"
                    :state="validateState('password')"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-4-live-feedback"
                    >Password should be minimum 8 characters
                    long</b-form-invalid-feedback
                  >
                </div>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                class="loginBtn mt-4 mb-3"
              >
                Register
              </b-button>
            </b-form>
            <p class="text-center my-4">
              Already have an account?
              <router-link to="/login">Sign In</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        email: null,
        phone: null,
        password: null,
        name: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      axios
        .post("http://localhost:5000/api/signup", this.form)
        .then(({ data }) => {
          console.log(data);
          this.$router.push("/login");
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  min-height: calc(100vh - 56px);
  padding-top: 50px;
  background: rgb(224, 240, 250);

  .row {
    height: 100%;
    .card {
      width: 100%;
      box-shadow: 0px 0px 10px rgb(185, 184, 184);
      padding: 20px;
      border-radius: 20px;

      > h2 {
        font-weight: 800 !important;
        padding-bottom: 20px;
        text-align: center;
      }

      > span {
        font-size: 1.4rem;
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
    }
  }
}
</style>