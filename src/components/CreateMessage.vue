<template>
  <form class="create-message" @submit.prevent="send">
    <button class="create-message__button button-attach">
    </button>
    <input class="create-message__input"
          type="text"
          placeholder="Сообщение"
          v-model="message.text"
    >
    <button class="create-message__button button-send" type="submit">
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: {
        text: '',
      },
    };
  },
  methods: {
    send() {
      this.message.text = this.message.text.trim();
      if (!this.message.text) {
        return;
      }

      this.$emit('send', this.message);
      this.message.text = '';
    },
  },
};
</script>

<style>
.create-message {
  display: flex;
  height: 50px;
  min-height: 50px;
  padding: 5px;
  border-top: 1px solid black;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 3px 10px teal;
}
.create-message__button {
  cursor: pointer;
  border: none;
  background: none;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.button-attach {
  background-image: url('../icons/attachToMessage.png');
  width: 30px;
}
.button-send {
  background-image: url('../icons/sendMessage.png');
  width: 70px;
}
.create-message__input {
  flex-grow: 1;
  border: 1px solid black;
  border-radius: 2em;
  margin: 0 5px;
  outline: none;
  padding: 0 1em;
  font-size: 1em;
}
</style>
