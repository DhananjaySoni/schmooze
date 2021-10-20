<template>
  <div class="chatRoomScreen">
    <h3 class="text-center mt-3">Room Name</h3>
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto chatBg">
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
        <div class="message-text col-md-9" contentEditable id="chat">
          <!-- <div contentEditable class="w-100 h-100 textContainer"></div> -->
        </div>
        <b-button class="sendbtn btn-sm" variant="dark" @click="sendChat"
          ><i class="far fa-paper-plane fa-2x"></i
        ></b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.chatBg {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
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
}

.chatContainerRoot {
  height: 60vh;
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
  height: 45px;
  width: 100%;
  min-width: 270px;
  border: 1px solid #e4e7ec;
  border-radius: 20px;
  background-color: #f9fafb;
  outline: none;
  padding: 10px;
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
</style>