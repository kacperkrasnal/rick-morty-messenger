<template>
  <div class="flex-container-start">
    <div class="title">
      Message history
    </div>

    <Message
      v-for="message in messageList"
      :key="message.id"
      :title="message.title"
      :body="message.body"
      :character-image="message.characterImage"
      :character-name="message.characterName"
      :date="message.date"
      :time="message.time"
      @click="openMessage"
    />
  </div>
</template>

<script>
import Message from "@/components/Message";

export default {
  name: "HistoryView",
  data() {
    return {
      messageList: []
    }
  },

  components: {Message},
  mounted() {
    this.messageList = JSON.parse(localStorage.getItem('messageList' || '[]'))
  },
  methods: {
    openMessage(event) {
      if (event.target.classList.contains('active')) {
        event.target.classList.remove('active')
      } else {
       event.target.classList.add('active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>