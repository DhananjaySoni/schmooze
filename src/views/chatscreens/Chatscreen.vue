<template>
  <div class="chatscreen">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "isAuthenticated",
      // ...
    ]),
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.chatscreen {
  min-height: calc(100vh - 56px);
  padding-top: 40px;
  padding-bottom: 20px;
  overflow: hidden;
  background: rgb(224, 240, 250);
}
</style>