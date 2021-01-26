<template>
  <div class="chats">
    <div class="title">Контакты</div>
    <div class="list">
      <ChatListItem v-for="contact in contacts"
                    :contact="contact"
                    :key="contact.id"
                    @toggleCativeChat="setChat"
      />
    </div>
  </div>
</template>

<script>
import ChatListItem from '@/components/ChatListItem.vue';
import { mapActions } from 'vuex';

export default {
  components: { ChatListItem },
  props: {
    activeChat: Object,
  },
  data() {
    return {
      contactsData: null,
    };
  },
  methods: {
    ...mapActions(['loadContactsData']),

    loadContacts() {
      this.loadContactsData()
        .then((contacts) => {
          this.contactsData = contacts;
        });
    },
    setChat(id) {
      this.$emit('update:activeChat', this.contactsData.find((contact) => contact.id === id));
    },
  },
  computed: {
    contacts() {
      return this.contactsData || [];
    },
  },
  created() {
    this.loadContacts();
  },
};
</script>

<style>
.chats {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  max-width: 300px;
  background: white;
  border-right: 1px solid black;
}
.chats .title {
  padding-left: 60px;
}
.list {
  overflow: auto;
}
</style>
