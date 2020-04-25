<template>
  <q-form>
    {{currentCase}}
    <address-input v-model="currentCase.origin.address" :label="fieldDesc.origin"
      :hint="fieldDesc.originHint" :rules="[$validations.required]"
      @blur="completeLatLng()"
      placeholder="Ejemplo: San Martin 400, Resistencia" />
  </q-form>
</template>

<script>
import AddressInput from 'components/AddressInput'
export default {
  props: {
    type: String
  },
  components: {
    AddressInput
  },
  mounted () {
    var tempCase = this.$q.localStorage.getItem('tempCase')
    if (tempCase) {
      this.currentCase = tempCase
    }
  },
  watch: {
    currentCase: {
      handler (c) {
        // prevent form loose
        this.$q.localStorage.set('tempCase', c)
      },
      deep: true
    }
  },
  methods: {

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
      currentCase: {
        origin: {
          address: null
        },
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
