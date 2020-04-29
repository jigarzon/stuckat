<template>
  <q-page padding>
    <edit-case v-if="caseInstance" :type="caseInstance.type || 'stuck'" :instance="caseInstance"
    :title="'Ver caso #' + $route.params.id" hide-subtitle disable-edit show-back/>
  </q-page>
</template>

<script>
import EditCase from 'components/EditCase'
export default {
  components: {
    EditCase
  },
  mounted () {
    this.retrieve(this.$route.params.id)
  },
  methods: {
    async retrieve (id) {
      var resp = await this.$axios.get('/api/cases/' + id)
      this.caseInstance = resp.data
    }
  },
  data () {
    return {
      caseInstance: null
    }
  }
}
</script>

<style>
</style>
