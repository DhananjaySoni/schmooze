<template>
  <div class="chatRoomScreen">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto chatBg">
      <h3 class="text-center mb-4">{{ chatroomDetails.roomName }}</h3>
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
    <b-modal id="modal-settings" size="md" title="Settings" hide-footer>
      <div class="settings-content text-center">
        <h3>Chat Settings</h3>
        <div
          class="btn btn-danger mb-3 mt-2 mr-2"
          @click="deleteChatroom"
          v-if="isAdmin"
        >
          Delete Chat Room
        </div>
        <div class="btn btn-danger mb-3 mt-2" @click="exitChatroom">
          Exit Chat Room
        </div>
        <p class="mb-4">
          Room Password : <span>{{ chatroomDetails.password }}</span>
        </p>
        <h3>Participants</h3>
        <div
          class="row m-0 mb-2"
          v-for="(user, userIndex) in chatroomDetails.users"
          :key="userIndex"
        >
          <div class="col-5 col-md-6 text-left pl-md-5 pr-0 pr-md-3">
            <p class="user-name">{{ user.name }}</p>
          </div>
          <div class="col-3 pr-0 pr-md-3">
            <button
              type="button"
              class="btn btn-info"
              disabled
              v-if="user.isAdmin"
            >
              Admin
            </button>
          </div>
          <div class="col-4 col-md-3" v-if="isAdmin">
            <div
              class="btn btn-outline-danger"
              @click="removeUser(user)"
              v-if="!user.isAdmin"
            >
              Remove
            </div>
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
import axios from "axios";
import CryptoJS from "crypto-js";
import firebase from "../../Firebase";
const { getDatabase, ref, set, onValue } = require("firebase/database");
// import firebase from 'firebase';
export default {
  data() {
    return {
      // ref: firebase.database().ref('ChatRoom/'),
      roomId: this.$route.params.roomId,
      chats: [],
      user: {},
      chatroomDetails: {},
      isAdmin: false,
    };
  },
  created() {
    this.user = this.$store.getters.getUser;

    axios
      .post("http://localhost:5000/api/chatroomDetails", {
        roomId: this.roomId,
      })
      .then(({ data }) => {
        console.log(data.details);

        this.chatroomDetails = data.details;
        // console.log(this.user);
        this.isAdmin = this.chatroomDetails.users[this.user.uid].isAdmin;
        console.log(this.chatroomDetails.users);
        if (this.chatroomDetails.users[this.user.uid] == null) {
          this.$router.push("/dashboard");
          // console.log('out');
        }
      })
      .catch((resp) => {
        console.log(resp);
      });
    const db = getDatabase();

    const database = ref(db, "ChatRoom/" + this.roomId + "/chats");
    onValue(database, (snapshot) => {
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
        //ENCRYPT
        var ciphertext = CryptoJS.AES.encrypt(
          chatText,
          "secret-key"
        ).toString();
        const db = getDatabase();
        let chatID = time.getTime();
        const database = ref(
          db,
          "ChatRoom/" + this.roomId + "/chats/" + chatID
        );
        set(database, {
          name: this.user.name,
          uid: this.user.uid,
          msg: ciphertext,
          time: currentTime,
        }).then(() => {
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
      if (text.trim().length > 0) {
        window.open(
          `https://www.google.com/search?q=${replaced}`,
          "_blank" // <- This is what makes it open in a new window.
        );
      }
    },
    deleteChatroom() {
      let deleteData = { roomId: this.roomId };
      axios
        .post("http://localhost:5000/api/deleteChatroom", deleteData)
        .then(({ data }) => {
          console.log(data);
          this.$router.push("/chatroom");
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    exitChatroom() {
      axios
        .post("http://localhost:5000/api/removeUser", {
          roomId: this.roomId,
          uid: this.user.uid,
        })
        .then(({ data }) => {
          console.log(data);
          this.$router.push("/chatroom");
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    removeUser(user) {
      axios
        .post("http://localhost:5000/api/removeUser", {
          roomId: this.roomId,
          uid: user.uid,
        })
        .then(({ data }) => {
          console.log(data);
          alert(`${user.name} removed`);
          location.reload();
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
  },
  // computed: {
  //   // mix the getters into computed with object spread operator
  //   ...mapGetters([
  //     'getUser',
  //     // ...
  //   ])
  // },
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