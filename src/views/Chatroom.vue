<template>
  <div class="chatroom">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <div class="card">
            <h2>Create Chat Room</h2>
            <b-form @submit.prevent="onSubmit" class="w-100">
              <b-form-group
                id="input-group-1"
                label="Room Name:"
                label-for="input-1"
              >
                <div class="inputField">
                  <b-icon icon="chat-square-text"></b-icon>
                  <b-form-input
                    id="input-1"
                    v-model="name"
                    required
                  ></b-form-input>
                </div>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Room Password:"
                label-for="input-2"
              >
                <div class="inputField">
                  <b-icon icon="lock"></b-icon>

                  <b-form-input
                    id="input-2"
                    type="password"
                    v-model="password"
                    required
                  ></b-form-input>
                </div>
              </b-form-group>
              <div class="text-center w-100">
                <b-button
                  type="submit"
                  variant="primary"
                  class="loginBtn mt-4 mb-3"
                >
                  Create
                </b-button>
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
      name: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.$router.push("/chatscreen");
    },
  },
};
</script>

<style lang="scss" scoped>
.chatroom {
  min-height: 100vh;
  padding-top: 100px;

  .card {
    width: 100%;
    box-shadow: 0px 0px 10px rgb(185, 184, 184);
    padding: 20px;
    border-radius: 20px;

    > h2 {
        font-weight: 700 !important;
        padding-bottom: 20px;
        text-align:center;
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
          width: 180px;
          border-radius: 20px;
        }
      }
  }
}
</style>