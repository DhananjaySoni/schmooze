<template>
  <div class="chatscreen">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.chatscreen {
  height: 100vh;
  padding-top: 7vh;
  overflow: hidden;
  background: rgb(224, 240, 250);
}
</style>