<template>
  <q-form>
    <q-input></q-input>
  </q-form>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    fieldDesc () {
      return this.$t('case.' + this.type + '.fields')
    },
    isExperience () {
      return (
        this.type === 'positiveExperience' || this.type === 'negativeExperience'
      )
    }
  },
  data () {
    return {
      case: {
        origin: null,
        destination: null,
        mobility: false,
        additionalPlaces: 0,
        economicalIssues: false,
        healthIssues: false,
        observations: ''
      }
    }
  }
}
</script>
