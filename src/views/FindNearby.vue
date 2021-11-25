<template>
  <div class="contacts">
    <div class="container">
      <b-form @submit.prevent="onSubmit" class="w-100">
        <b-form-group
          id="input-group-1"
          label="Recipient name or email:"
          label-for="input-1"
        >
          <div class="inputField">
            <b-icon icon="person" id="person"></b-icon>
            <b-form-input
              id="input-1"
              v-model="userSearchText"
              required
            ></b-form-input>
            <b-icon
              icon="x"
              id="clear"
              v-if="userSearchText.length != 0"
              @click="clearSearch"
            ></b-icon>
            <b-button type="submit" variant="primary" class="searchBtn">
              Search
            </b-button>
          </div>
        </b-form-group>
      </b-form>

      <h4 class="mt-5">Nearby Users</h4>

      <!-- <div class="list">
        <div class="row m-0" v-for="(user, userIndex) in user" :key="userIndex">
          <div class="col-2 col min-w-80px">
            <div class="userIcon">{{ user.name[0].toUpperCase() }}</div>
          </div>
          <div class="col-4 col email">
            <p class="m-0">{{ user.name }}</p>
          </div>
          <div class="col-4 col email">
            <p class="m-0">{{ user.email }}</p>
          </div>
          <div class="col-2 col">
            <div
              class="btn btn-info chatBtn"
              @click="userChat(user, userIndex)"
            >
              Chat
            </div>
          </div>
        </div>
      </div> -->
      <div class="list">
        <div v-if="!hasNearbyUsers">
          <p class="mt-5 text-center">No nearby users...</p>
        </div>
        <div v-else-if="searchedUsersList.length != 0">
          <div
            class="row m-0"
            v-for="(user, userIndex) in searchedUsersList"
            :key="userIndex"
          >
            <div class="col-2 col min-w-80px">
              <div class="userIcon">{{ user.name[0].toUpperCase() }}</div>
            </div>
            <div class="col-4 col email">
              <p class="m-0">{{ user.name }}</p>
            </div>
            <div class="col-4 col email">
              <p class="m-0">{{ user.email }}</p>
            </div>
            <div class="col-2 col">
              <div
                class="btn btn-info chatBtn"
                @click="userChat(user, userIndex)"
              >
                Chat
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="!emptySearch">
          <div
            class="row m-0"
            v-for="(user, userIndex) in usersList"
            :key="userIndex"
          >
            <div class="col-2 col min-w-80px">
              <div class="userIcon">{{ user.name[0].toUpperCase() }}</div>
            </div>
            <div class="col-4 col email">
              <p class="m-0">{{ user.name }}</p>
            </div>
            <div class="col-4 col email">
              <p class="m-0">{{ user.email }}</p>
            </div>
            <div class="col-2 col">
              <div
                class="btn btn-info chatBtn"
                @click="userChat(user, userIndex)"
              >
                Chat
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="mt-5 text-center">No search results...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      userSearchText: "",
      usersList: [],
      searchedUsersList: [],
      emptySearch: false,
      hasNearbyUsers: false,
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "isAuthenticated",
      "getUser",
      // ...
    ]),
  },
  created() {
    this.getLocation();
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push("/login");
    }
  },
  methods: {
    onSubmit() {
      this.emptySearch = false;

      axios
        .post("http://localhost:5000/api/search", { text: this.userSearchText })
        .then(({ data }) => {
          console.log(data);
          for (let key of Object.keys(data.message)) {
            if (data.message[key].email !== this.getUser.email) {
              this.searchedUsersList.push(data.message[key]);
            }
          }
          if (this.searchedUsersList.length === 0) {
            this.emptySearch = true;
          }
          // this.searchedUsersList = data.message;
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    userChat(user, index) {
      this.$store.dispatch("setCurrentChatUser", user);
      this.$router.push(`/chat/${this.usersList[index].uid}`);
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    showPosition(position) {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      console.log(this.longitude, this.latitude);

      axios
        .post("http://localhost:5000/api/geoquery", {
          lat: this.latitude,
          lng: this.longitude,
          uid: this.getUser.uid,
        })
        .then(({ data }) => {
          console.log(data.message);
          if (data.message.length != 0) {
            this.hasNearbyUsers = true;
          }
          data.message.forEach((user) => {
            if (user.uid != this.getUser.uid) {
              this.usersList.push(user);
            }
          });
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    clearSearch() {
      this.searchedUsersList = [];
      this.userSearchText = "";
      this.emptySearch = false;
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
  min-height: calc(100vh - 56px);
  padding-top: 80px;
  background: rgb(224, 240, 250);

  form {
    .inputField {
      position: relative;
      display: flex;
      #person {
        position: absolute;
        left: 15px;
        top: 8px;
        font-size: 20px;
      }
      #clear {
        position: absolute;
        right: 100px;
        top: 8px;
        font-size: 20px;
        cursor: pointer;
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
  .list {
    border-radius: 20px;
    overflow: auto;

    .row {
      border: 1px solid rgb(231, 229, 229);
      box-shadow: 0 0 5px rgb(236, 236, 236);
      background: rgb(255, 255, 255);
      min-width: 500px;

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
          color: #fff;
        }
      }

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .chatBtn {
        max-width: 100%;
      }
    }
  }
}
</style>