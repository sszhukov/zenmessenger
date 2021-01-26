<template>
  <div id="app" v-bind:style="{ height: `${calculatewindowHeight}px` }">
    <div class="windows">
      <ChatList class="chats" :class="{tabSlide: !chatTab}"  :active-chat.sync="activeChat"/>
      <ChatWindow class="chat-window"
                  :activ-chat="activeChat"
                  :contact="contact"
                  @toggleTab="toggleTab"
      />
    </div>
  </div>
</template>

<script>
import ChatList from '@/components/ChatList.vue';
import ChatWindow from '@/components/ChatWindow.vue';

export default {
  components: { ChatList, ChatWindow },
  data() {
    return {
      activeChat: null,
      contactPhoto: '',
      chatTab: true,
      windowHeight: window.innerHeight,
    };
  },
  computed: {
    contact() {
      return {
        ...this.activeChat,
        photo: this.contactPhoto,
      } || {};
    },
    calculatewindowHeight() {
      return this.windowHeight;
    },
  },
  methods: {
    toggleTab() {
      this.chatTab = !this.chatTab;
    },
    loadPhoto() {
      this.$store.dispatch('loadContactPhotos', this.activeChat.id)
        .then((photo) => {
          this.contactPhoto = photo.url;
        });
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },

  },
  watch: {
    activeChat: {
      handler(val) {
        this.loadPhoto(val.id);
        this.toggleTab();
      },
      deep: true,
    },
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
};

</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  overflow: hidden;
}
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 5px 5px 30px;
  overflow: hidden;
}
.windows {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
.chats {
  flex: 1;
  transition: all 0.5s ease-out;
}
.chat-window {
  flex: 2;
}
.title {
  display: flex;
  align-items: center;
  height: 60px;
  min-height: 60px;
  padding: 5px 10px;
  border-bottom: 4px double black;
  font-size: 1.5em;
  background: white;
}

@media screen and (max-width: 600px)  {
  .windows {
    position: relative;
  }
  .chats {
    position: absolute;
    height: 100%;
    box-shadow: 0 0 10px teal;
    width: 600px;
    z-index: 1;
  }
  .tabSlide {
    position: absolute;
    transform: translateX(-600px);
  }
}
</style>
