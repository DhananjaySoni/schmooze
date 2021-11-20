<template>
  <div class="contacts container">
    <b-form @submit.prevent="onSubmit" class="w-100">
      <b-form-group id="input-group-1" label="User email:" label-for="input-1">
        <div class="inputField">
          <b-icon icon="person"></b-icon>
          <b-form-input
            id="input-1"
            v-model="userSearchText"
            required
          ></b-form-input>
          <div class="btn btn-primary searchBtn">Search</div>
        </div>
      </b-form-group>
    </b-form>

    <h4 class="mt-5">Nearby Users</h4>
    
    <div class="row" v-for="x in 5" :key="x">
      <div class="col-2 col min-w-80px">
        <div class="userIcon"></div>
      </div>
      <div class="col-8 col email">
        <p>user@schmooze.com</p>
      </div>
      <div class="col-2 col">
        <div class="btn btn-info chatBtn" @click="userChat(x)">Chat</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userSearchText: "",
    };
  },
  methods: {
    onSubmit() {
      alert("search user", this.userSearchText);
    },
    userChat(id) {
      this.$router.push(`/chat/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.contacts {
  min-height: 100vh;
  padding-top: 100px;

  form {
    .inputField {
      position: relative;
      display: flex;
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

    .searchBtn {
      border-radius: 20px;
      margin-left: 10px;
    }
  }

  .row {
    border: 1px solid rgb(231, 229, 229);
    box-shadow: 0 0 5px rgb(236, 236, 236);

    .col {
      @include d-flex;
      margin: 10px 0;
      padding: 0 !important;

      .userIcon {
        width: 40px;
        height: 40px;
        background: #000;
        border-radius: 50%;
        @include d-flex;

        &::before {
          content: "U";
          color: #fff;
        }
      }
    }

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // width: 100%;
    }

    .chatBtn{
      max-width:100%;
    }
  }
}
</style>