<template>
  <div class="message">
    <span>{{message.name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },
};
</script>

<style>
.message {
  padding: 0 15px;
  margin: 2.5px 0;
  max-width: 300px;
}
.message.message_left {
  background: rgba(255, 226, 119, .75);
  border: 1px solid rgba(255, 180, 83, .75);
  border-radius: 15px 15px 15px 0;
}
.message.message_right {
  align-self: flex-end;
  text-align: right;
  background: rgba(220, 88, 88, .75);
  border: 1px solid rgba(215, 34, 90, .75);
  border-radius: 15px 15px 0 15px;
}
</style>
