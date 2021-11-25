<template>
  <div class="forgotPassword">
    <div class="inputContainer">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1">
        <div class="inputField">
          <b-icon icon="envelope"></b-icon>
          <b-form-input id="input-1" v-model="email" required></b-form-input>
        </div>
      </b-form-group>
      <div class="text-center">
        <div class="btn btn-primary" @click="submitMail">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitMail() {
      axios
        .post("http://localhost:5000/api/forgotPassword", {email:this.email})
        .then(({ data }) => {
          console.log(data);
          alert(data.message)
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.forgotPassword {
  min-height: calc(100vh - 56px);
  padding-top: 50px;
  background: rgb(224, 240, 250);
  display: flex;
  justify-content: center;
  align-items: center;
  .inputContainer {
    width: 90vw;
    max-width: 400px;
    min-width: 300px;
    background: #fff;
    padding: 30px 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgb(185, 184, 184);
  }
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
}
</style>