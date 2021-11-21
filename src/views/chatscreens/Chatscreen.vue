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
  min-height: calc(100vh - 56px);
  padding-top: 40px;
  padding-bottom: 20px;
  overflow: hidden;
  background: rgb(224, 240, 250);
}
</style>