<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#/">Schmooze</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#/">Dashboard</b-nav-item>
            <b-nav-item href="#/chatroom">Chat Room</b-nav-item>
            <b-nav-item href="#/contacts">Direct Chat</b-nav-item>
            <!-- <b-nav-item href="#/schedule">Schedule Message</b-nav-item> -->
            <b-nav-item href="#/about">About</b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#/profile" class="m-0"
                >Profile</b-dropdown-item
              >
              <b-dropdown-item
                class="m-0"
                @click="signout"
                v-if="isAuthenticated"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  methods: {
    signout() {
      axios
        .get("http://localhost:5000/api/signout")
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("removeUser");
          this.$router.push("/login");
        })
        .catch((resp) => {
          console.error(resp);
        });
    },
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "isAuthenticated",
      // ...
    ]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  box-shadow: 0 3px 10px rgb(185, 185, 185);
  ul {
    li {
      margin-right: 5vw;
      @media (max-width: 992px) {
        text-align: center;
        margin-right: 0;
      }
      a {
        font-weight: bold;
      }
    }
  }
}
</style>
