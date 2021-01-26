<template>
  <div v-if="!getMessages.length" class="choice-chat-message">Выберите чат</div>
  <div v-else class="chat-window">
    <div class="about-contact title" @click="$emit('toggleTab')">
      <span class="navigate__arrow"></span>
      <img :src="contact.photo" alt="" class="about-contact__photo">
      <span class="about-contact__name">{{ contact.name }}</span>
    </div>
    <div class="chat-window__messages">
      <MessageComponent v-for="message in getMessages.slice().reverse()"
                        :class="messageDistribution(message.email)"
                        :message="message"
                        :key="message.id"
      />
    </div>
    <CreateMessage @send="sendMessage"/>
  </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage.vue';
import MessageComponent from '@/components/MessageComponent.vue';
import { CURRENT_USER_EMAIL } from '@/config';

export default {
  components: { CreateMessage, MessageComponent },
  props: {
    contact: Object,
  },
  data() {
    return {
      messages: null,
      current_user_email: CURRENT_USER_EMAIL,
    };
  },
  computed: {
    getMessages() {
      return this.messages || [];
    },
  },
  methods: {
    loadMessages(chatId) {
      this.$store.dispatch('loadMessages', chatId)
        .then((data) => { this.messages = data; });
    },
    messageDistribution(email) {
      return this.current_user_email !== email
        ? 'message_left'
        : 'message_right';
    },
    createMessage(newMessage) {
      return {
        postId: 1,
        name: newMessage.text,
        email: CURRENT_USER_EMAIL,
        body: '',
      };
    },
    sendMessage(message) {
      const newMessage = this.createMessage(message);
      this.messages.push(newMessage);
      this.$store.dispatch('sendMessage', newMessage)
        .catch(() => {
          console.log('Тут должен быть код для выделения сообений, которые не смогли отправиться');
        });
    },
  },
  watch: {
    contact(newValue, oldValue) {
      if (newValue.id !== oldValue.id) {
        this.loadMessages(newValue.id);
      }
    },
  },
};
</script>

<style>
.about-contact__photo {
  height: 100%;
  border-radius: 50%;
  margin-right: 20px;
}
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.chat-window__messages {
  display: flex;
  flex-direction: column-reverse;
  padding: 10px;
  margin-top: auto;
  overflow: auto;
}
.choice-chat-message {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px ;
}

@media screen and (max-width: 600px) {
  ._600px {
    display: none !important;
  }
  .about-contact {
    cursor: pointer;
  }
  .navigate__arrow {
    height: 20px;
    width: 20px;
    border-left: 5px solid purple;
    border-top: 5px solid teal;
    transform: rotate(-45deg) scale(1);
  }
  .choice-chat-message {
    justify-content: flex-end;
    padding-right: 15px;
  }
}
</style>
