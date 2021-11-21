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
            <b-nav-item href="#/schedule">Schedule Message</b-nav-item>
            <b-nav-item href="#/about">About</b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#/profile" class="m-0"
                >Profile</b-dropdown-item
              >
              <b-dropdown-item href="#/login" class="m-0"
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
