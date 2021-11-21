<template>
  <div class="chatroom">
    <div class="container">
      <div class="roomOptionsContainer">
        <span class="active" id="createOption" @click="setActiveOption('create')">Create Room</span>
        <span id="joinOption" @click="setActiveOption('join')">Join Room</span>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto" v-if="showCreatePanel">
          <div class="card">
            <h2>Create Chat Room</h2>
            <b-form @submit.prevent="onSubmit" class="w-100">
              <b-form-group
                id="input-group-1"
                label="Room ID:"
                label-for="input-1"
              >
                <div class="inputField">
                  <b-icon icon="chat-square-text"></b-icon>
                  <b-form-input
                    id="input-1"
                    v-model="createForm.roomID"
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
                    v-model="createForm.password"
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
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto" v-if="showJoinPanel">
          <div class="card">
            <h2>Join Chat Room</h2>
            <b-form @submit.prevent="onSubmit" class="w-100">
              <b-form-group
                id="input-group-1"
                label="Room ID:"
                label-for="input-1"
              >
                <div class="inputField">
                  <b-icon icon="chat-square-text"></b-icon>
                  <b-form-input
                    id="input-1"
                    v-model="joinForm.roomID"
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
                    v-model="joinForm.password"
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
                  Join
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
      showCreatePanel:true,
      showJoinPanel:false,
      createForm:{
        roomID:"",
        password:""
      },
      joinForm:{
        roomID:"",
        password:""
      },

    };
  },
  methods: {
    setActiveOption(option) {
      let createOption = document.getElementById('createOption');
      let joinOption = document.getElementById('joinOption');
      if(option==='create'){
        joinOption.classList.remove('active');
        createOption.classList.remove('active');
        createOption.classList.add('active');
        this.showJoinPanel = false;
        this.showCreatePanel = true;
      }
      else{
        joinOption.classList.remove('active');
        createOption.classList.remove('active');
        joinOption.classList.add('active');
        this.showJoinPanel = true;
        this.showCreatePanel = false;
      }
    },
    onSubmit() {
      this.$router.push("/chat/room/1");
    },
  },
};
</script>

<style lang="scss" scoped>
.chatroom {
  min-height: calc(100vh - 56px);
  padding-top: 80px;
  background: rgb(224, 240, 250);


  .roomOptionsContainer{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:10px 0;

    >span{
      margin:10px;
      font-size:1.3rem;
      font-weight:bold;
      padding:5px 15px;
      border-radius:10px;
      cursor:pointer;
    }

    .active{
      background:rgb(121, 196, 240);
      box-shadow:2px 5px 8px rgb(202, 200, 200);
    }
  }

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