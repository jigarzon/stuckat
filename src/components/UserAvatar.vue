<template>
  <q-avatar color="teal">
    <img v-if="!showInitials" @error="displayInitials"
      :src="user.avatar" class="avatar"   />
    <span class="text-white" v-else>{{initials}}</span>
  </q-avatar>
</template>

<script>
export default {
  created () {
    this.showInitials = !this.user.avatar
  },
  computed: {
    initials: function () {
      var str = ''
      if (this.user.firstName) {
        str += this.user.firstName[0].toUpperCase()
      }
      if (this.user.lastName) {
        str += this.user.lastName[0].toUpperCase()
      }
      return str
    }
  },
  data () {
    return {
      showInitials: false
    }
  },
  methods: {
    displayInitials () {
      this.showInitials = true
    }
  },
  props: { user: Object }
}
</script>

<style>
</style>
