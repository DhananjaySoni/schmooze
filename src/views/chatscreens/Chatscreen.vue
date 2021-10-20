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
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      let chatWindow = document.getElementById("chat-window");
      let xH = chatWindow.scrollHeight;
      chatWindow.scrollTo(0, xH);
    },
    sendChat() {
      let chatWindow = document.getElementById("chat-window");
      let chatText = document.getElementById("chat");
      let time = new Date();
      let currentTime = time.getHours() + ":" + time.getMinutes();
      if (chatText.innerHTML.length > 0) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="chatContainer send">
          <p class="m-0"><span class="small">Sender</span></p>
          <p class="m-0">${chatText.innerHTML}</p>
          <span class="time small">${currentTime}</span>
        </div>`;
        chatWindow.appendChild(newDiv);

        this.scrollToBottom();
        this.clearChat();
      }
    },
    clearChat() {
      document.getElementById("chat").innerHTML = "";
    },
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