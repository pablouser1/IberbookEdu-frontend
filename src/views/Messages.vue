<template>
    <section class="section">
        <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
        <div v-if="messages" class="container">
            <MessageCard v-for="message in messages" :key="message.id" :name="message.from" :date="message.sent" :message="message.content"></MessageCard>
        </div>
    </section>
</template>

<script>
import { getMessages } from '@/services/user.js'
import MessageCard from '@/components/Messages/MessageCard'
export default {
  name: 'Messages',
  components: { MessageCard },
  data () {
    return {
      isLoading: true,
      messages: [],
      offset: 0,
      limit: false
    }
  },
  methods: {
    getMessages: async function () {
      this.isLoading = true
      const newMessages = await getMessages(this.offset)
      if (newMessages.code === 'C') {
        for (let i = 0; i < newMessages.data.length; i++) {
          this.messages.push(newMessages.data[i])
        }
        this.offset += newMessages.length
      } else if (newMessages.code === 'NO-MORE') {
        this.limit = true
      }
    }
  },
  created () {
    this.getMessages()
    this.isLoading = false
  }
}
</script>
