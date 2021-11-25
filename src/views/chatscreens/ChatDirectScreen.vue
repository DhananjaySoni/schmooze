<template>
  <div class="chatRoomScreen">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto chatBg">
      <h3 class="text-center mb-4">User Name</h3>
      <b-icon
        icon="gear"
        id="settings"
        font-scale="1.5"
        v-b-modal.modal-settings
      ></b-icon>
      <div class="chatContainerRoot" id="chat-window">
        <p v-if="!chats.length" class="text-center mt-5">No chats...</p>
        <div v-for="(chat, chatIndex) in chats" :key="chatIndex">
          <div class="chatContainer send" v-if="chat.uid === user.uid">
            <p class="m-0">
              <span class="small">{{ chat.name }}</span>
            </p>
            <p class="m-0">{{ chat.msg }}</p>
            <span class="time small">{{ chat.time }}</span>
          </div>

          <div class="chatContainer darker recv" v-else>
            <p class="m-0">
              <span class="small">{{ chat.name }}</span>
            </p>
            <p class="m-0">{{ chat.msg }}</p>
            <span class="time small">{{ chat.time }}</span>
          </div>
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
    <b-modal id="modal-settings" size="lg" title="Settings" hide-footer>
      <div class="settings-content">
        <h3 class="mb-4 text-center">User Information</h3>
        <div class="row m-0">
          <div class="col-6 text-right pr-5"><p>Name:</p></div>
          <div class="col-6">
            <p>{{ currentChatUser.name }}</p>
          </div>
          <div class="col-6 text-right pr-5"><p>Email:</p></div>
          <div class="col-6">
            <p>{{ currentChatUser.email }}</p>
          </div>
          <div class="col-6 text-right pr-5"><p>Phone:</p></div>
          <div class="col-6">
            <p>{{ currentChatUser.phone }}</p>
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
import CryptoJS from "crypto-js";
import "../../Firebase";
const { getDatabase, ref, set, onValue } = require("firebase/database");

export default {
  data() {
    return {
      currentChatUser: {},
      chats: [],
      user: {},
    };
  },
  created() {
    this.user = this.$store.getters.getUser;
    this.currentChatUser = this.$store.getters.currentChatUser;
    console.log(this.currentChatUser);
    const db = getDatabase();

    const database = ref(db, "chats/" + this.user.uid);
    onValue(database, (snapshot) => {
      console.log("0");

      this.chats = [];
      snapshot.forEach((doc) => {
        let item = {};
        item = doc.val();
        //DECRYPT
        var bytes = CryptoJS.AES.decrypt(item.msg, "secret-key");
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(originalText);
        item.msg = originalText;
        this.chats.push(item);
      });
      console.log("chats", this.chats);
      this.scrollToBottom();
    });
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
      // let chatWindow = document.getElementById("chat-window");
      let chatText = document.getElementById("chat").innerHTML;
      let time = new Date();
      let hrs = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
      let mins =
        time.getMinutes() < 10
          ? (mins = "0" + time.getMinutes())
          : (mins = time.getMinutes());
      let currentTime = hrs + ":" + mins;
      console.log(currentTime);
      if (chatText.length > 0) {
        console.log("1");
        //ENCRYPT
        var ciphertext = CryptoJS.AES.encrypt(
          chatText,
          "secret-key"
        ).toString();
        const db = getDatabase();
        let chatID = time.getTime();
        const database2 = ref(db, "chats/" + this.currentChatUser.uid +"/"+ chatID);
        set(database2, {
          name: this.user.name,
          uid: this.user.uid,
          msg: ciphertext,
          time: currentTime,
        }).then(() => {
          console.log("2");

          const database3 = ref(db, "chats/" + this.user.uid +"/"+ chatID);
          set(database3, {
            name: this.user.name,
            uid: this.user.uid,
            msg: ciphertext,
            time: currentTime,
          }).then(() => {
            console.log("3");

            this.scrollToBottom();
          });
          this.scrollToBottom();
        });
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

      if (text.length > 0) {
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
  padding: 20px 50px 20px 20px;
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

.settings-content p {
  font-size: 1.2rem;
  font-weight: 600;
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