<template>
  <div class="chatRoomScreen">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto chatBg">
      <h3 class="text-center mb-4">Room Name</h3>
      <b-icon
        icon="gear"
        id="settings"
        font-scale="1.5"
        v-b-modal.modal-settings
      ></b-icon>
      <div class="chatContainerRoot" id="chat-window">
        <div class="chatContainer send">
          <p class="m-0"><span class="small">Sender</span></p>
          <p class="m-0">Hello. How are you today?</p>
          <span class="time small">11:00</span>
        </div>

        <div class="chatContainer darker recv">
          <p class="m-0"><span class="small">Receiver</span></p>
          <p class="m-0">Hey! I'm fine. Thanks for asking!</p>
          <span class="time small">11:01</span>
        </div>

        <div class="chatContainer send">
          <p class="m-0"><span class="small">Sender</span></p>
          <p class="m-0">Sweet! So, what do you wanna do today?</p>
          <span class="time small">11:02</span>
        </div>

        <div class="chatContainer darker recv">
          <p class="m-0"><span class="small">Receiver</span></p>
          <p class="m-0">
            Nah, I dunno. Play soccer.. or learn more coding perhaps?
          </p>
          <span class="time small">11:05</span>
        </div>
        <div class="chatContainer send">
          <p class="m-0"><span class="small">Sender</span></p>
          <p class="m-0">Sweet! So, what do you wanna do today?</p>
          <span class="time small">11:02</span>
        </div>

        <div class="chatContainer darker recv">
          <p class="m-0"><span class="small">Receiver</span></p>
          <p class="m-0">
            Nah, I dunno. Play soccer.. or learn more coding perhaps?
          </p>
          <span class="time small">11:05</span>
        </div>
        <div class="chatContainer send">
          <p class="m-0"><span class="small">Sender</span></p>
          <p class="m-0">Sweet! So, what do you wanna do today?</p>
          <span class="time small">11:02</span>
        </div>

        <div class="chatContainer darker recv">
          <p class="m-0"><span class="small">Receiver</span></p>
          <p class="m-0">
            Nah, I dunno. Play soccer.. or learn more coding perhaps?
          </p>
          <span class="time small">11:05</span>
        </div>
      </div>
      <div class="chat-wrapper">
        <div class="message-text col-md-9" contentEditable id="chat"></div>
        <b-icon
          icon="google"
          id="google"
          font-scale="1.5"
          @click="searchText"
        ></b-icon>
        <b-button class="sendbtn btn-sm" variant="dark" @click="sendChat"
          ><i class="far fa-paper-plane fa-2x"></i
        ></b-button>
      </div>
    </div>

    <!-- settings modal::begin -->
    <b-modal id="modal-settings" size="md" title="Settings" hide-footer>
      <div class="settings-content text-center">
        <h3>Chat Settings</h3>
        <div class="btn btn-danger mb-5 mt-2 mr-2">Delete Chat Room</div>
        <div class="btn btn-danger mb-5 mt-2">Exit Chat Room</div>
        <h3>Participents</h3>
        <div class="row m-0 mb-2" v-for="x in 10" :key="x">
          <div class="col-5 col-md-6 text-left pl-md-5 pr-0 pr-md-3">
            <p class="user-name">User{{ x }}</p>
          </div>
          <div class="col-3 pr-0 pr-md-3">
            <button type="button" class="btn btn-info" disabled v-if="x == 4">
              Admin
            </button>
          </div>
          <div class="col-4 col-md-3">
            <div class="btn btn-outline-danger">Remove</div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center align-items-center mt-5">
        <b-button variant="primary" @click="$bvModal.hide('modal-settings')"
          >Close</b-button
        >
      </div>
    </b-modal>
    <!-- settings modal::end -->
  </div>
</template>

<script>
export default {
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
        newDiv.innerHTML = `<div style="border: 2px solid #dedede;
          background-color: #f1f1f1;
          border-radius: 5px;
          padding: 5px;
          margin: 7px 0;
          text-align: right;">
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
    searchText() {
      let chatText = document.getElementById("chat");
      let text = chatText.innerHTML;
      let replaced = text.split(" ").join("+");
      if (text.trim().length > 0) {
        window.open(
          `https://www.google.com/search?q=${replaced}`,
          "_blank" // <- This is what makes it open in a new window.
        );
      }
    },
  },
};
</script>

<style scoped>
.chatBg {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
}

#settings {
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
}

.chatContainer {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 5px;
  margin: 7px 0;
}
.send {
  text-align: right;
}
.recv {
  text-align: left;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.chatContainer::after {
  content: "";
  clear: both;
  display: table;
}

.time {
  text-align: right;
}

.chat-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.chatContainerRoot {
  height: 55vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.chatContainerRoot::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.chatContainerRoot {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.message-text {
  resize: none;
  box-sizing: border-box;
  min-height: 45px;
  max-height: 135px;
  width: 100%;
  min-width: 270px;
  border: 1px solid #e4e7ec;
  border-radius: 20px;
  background-color: #f9fafb;
  outline: none;
  padding: 20px;
  overflow: hidden;
  margin: 20px 10px;
  position: relative;
}

.textContainer {
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  height: auto;
  min-height: 30px;
  max-height: 97px;
}

.textContainer:focus,
.textContainer:active {
  border: 0 !important;
  outline: none !important;
}
.sendbtn {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  padding: 5px;
}

.sendbtn i {
  color: #fff;
}

.settings-content {
  max-height: 60vh !important;
  overflow: auto;
}

.user-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#google {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 19%;
  cursor: pointer;
}

#google:hover {
  filter: drop-shadow(0 0 5px rgb(202, 202, 202));
}

@media (max-width: 768px) {
  #google {
    right: 15%;
  }
}
</style>