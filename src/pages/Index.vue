<template>
  <q-page class="flex flex-center">
    <q-btn v-if="!$store.state.general.user"
      @click="$store.dispatch('general/socialAuth', 'facebook')">Login</q-btn>
    <span v-else>
      {{$store.state.general.user}}</span>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted () {
    console.log('checking')
    // this.$axios.get('/auth/me')
  }
}
</script>
