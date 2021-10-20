<template>
  <div class="chatscreen">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
      <div>
        <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">Name</span>
        </nav>
      </div>
      <div class="chatContainer">
        <div class="container send">
          <p class="m-0"><span class="small">Sender</span></p>
          <p class="m-0">Hello. How are you today?</p>
          <span class="time small">11:00</span>
        </div>

        <div class="container darker recv">
          <p class="m-0"><span class="small">Receiver</span></p>
          <p class="m-0">Hey! I'm fine. Thanks for asking!</p>
          <span class="time small">11:01</span>
        </div>

        <div class="container send">
          <p class="m-0"><span class="small">Sender</span></p>
          <p class="m-0">Sweet! So, what do you wanna do today?</p>
          <span class="time small">11:02</span>
        </div>

        <div class="container darker recv">
          <p class="m-0"><span class="small">Receiver</span></p>
          <p class="m-0">
            Nah, I dunno. Play soccer.. or learn more coding perhaps?
          </p>
          <span class="time small">11:05</span>
        </div>
      </div>
    </div>
    <div>
      <div class="chat-wrapper">
        <div class="message-text col-md-9">
          <div contentEditable class="w-100 h-100 textContainer"></div>
          <b-button class="sendbtn btn-sm" variant="dark">Send</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.chatscreen {
  height: 100vh;
  padding-top: 100px;
}

.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 5px;
  margin: 7px 0;
}
.send {
  text-align: left;
}
.recv {
  text-align: right;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.container::after {
  content: "";
  clear: both;
  display: table;
}

.time {
  text-align: right;
}

.chat-wrapper {
  width: 100%;
}

.chatContainer{
  height:60vh;
  overflow-y:scroll;
}

.message-text {
  resize: none;
  box-sizing: border-box;
  height: auto;
  min-height: 41px;
  max-height: 97px;
  width: 40%;
  min-width: 300px;
  border: 1px solid #e4e7ec;
  border-radius: 20px;
  background-color: #f9fafb;
  outline: none;
  padding: 10px;
  overflow: hidden;
  margin: 20px auto;
  position: relative;
  padding-right: 50px;
}

.textContainer {
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  resize: none;
  min-height: 30px;
  max-height: 97px;
}

.textContainer:focus,
.textContainer:active {
  border: 0 !important;
  outline: none !important;
}

textarea {
  resize: none;
  box-sizing: border-box;
  height: auto;
  min-height: 41px;
  max-height: 97px;
  width: 387px;
  border: 1px solid #e4e7ec;
  border-radius: 20px;
  background-color: #f9fafb;
  outline: none;
  padding: 0 24px 0 24px;
  overflow: hidden;
}
.sendbtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
}

</style>