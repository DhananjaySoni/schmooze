<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 mx-auto">
          <router-link to="/chatroom">
            <div class="card">
              <b-icon icon="chat-square-text"></b-icon>
              <h2>Create/Join chat room</h2>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-sm-6 col-md-4 mx-auto">
          <router-link to="/contacts">
            <div class="card">
              <b-icon icon="chat-dots"></b-icon>

              <h2>Direct chat</h2>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-sm-6 col-md-4 mx-auto">
          <router-link to="/find-nearby">
            <div class="card">
              <b-icon icon="broadcast-pin"></b-icon>

              <h2>Find nearby users</h2>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-sm-6 col-md-4 mx-auto">
          <router-link to="/schedule">
            <div class="card">
              <b-icon icon="clock"></b-icon>

              <h2>Schedule a message</h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Dashboard",
  components: {},
};
</script>


<style lang="scss" scoped>

.dashboard {
  min-height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(224, 240, 250);

  a{
    color:#000;
  }

  .container {
    .row {
      .card {
        box-shadow: 0 0 15px rgb(179, 178, 178);
        border-radius: 20px;
        padding: 20px;
        height: 20vh;
        min-height: 200px;
        max-height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        >.b-icon{
          font-size:30px;
          margin-bottom:20px;
          filter:drop-shadow(0 0 5px rgb(187, 184, 184));
        }

        > h2 {
          text-align: center;
          font-weight:700 !important;
        }
      }
    }
  }
}
</style>