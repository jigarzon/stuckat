<template>
  <q-page class="flex flex-center">

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted () {
    console.log('checking')
    this.$axios.get('/auth/me')
  }
}
</script>
