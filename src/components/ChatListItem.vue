<template>
  <div>
    <div class="chats__item" @click="setChat(contact)">
      <img class="user-pic" :src="getPhoto" alt="Фото профиля">
      <div class="user-info">
        <div class="user-name">{{ contact.name }}</div>
        <div class="user-email">{{ contact.email }}</div>
      </div>
    </div>
    <div class="delimetr"></div>
  </div>
</template>

<script>
export default {
  props: {
    contact: Object,
  },
  data() {
    return {
      photo: null,
    };
  },
  computed: {
    getPhoto() {
      return this.photo || '';
    },
  },
  methods: {
    loadPhoto() {
      this.$store.dispatch('loadContactPhotos', this.contact.id)
        .then((photo) => { this.photo = photo.thumbnailUrl; });
    },
    setChat(contact) {
      this.$emit('toggleCativeChat', contact.id);
    },
  },
  created() {
    this.loadPhoto();
  },
};
</script>

<style>
.chats__item {
  padding: 5px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.chats__item:active {
  background: rgb(245, 245, 245); ;
}

.chats__item .user-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 5px;
}

.chats__item .user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.chats__item .user-email {
  color: rgba(0, 0, 0, 0.25);
  font-size: .75em;
}

.chats__item .user-name, .chats__item .user-email {
  max-width: 200px;
  white-space: nowrap;
}

.delimetr {
  content: '';
  margin: 0 auto;
  width: 75%;
  /* height: 1px; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
