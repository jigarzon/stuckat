<template>
  <q-form class="row">
    <span class="col-12 text-h2 text-primary">{{fieldDesc.title}}</span>
    <span class="col-12 text-h6 q-py-md text-secondary"
      v-html="$t('case.createText')">
    </span>
    <q-separator />
    <div class="col-12 col-md-6 q-pa-sm">
      <q-card class="full-size">
        <q-card-section>
          <div class="text-h6">{{fieldDesc.fields.origin}}</div>
          <div class="text-subtitle1">{{fieldDesc.fields.originHint}}</div>
        </q-card-section>
        <q-card-section>
          <address-input v-model="currentCase.origin"
            placeholder="Ejemplo: San Martin 400, Resistencia" />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-6 q-pa-sm">
      <q-card class="full-size">
        <q-card-section>
          <div class="text-h6">{{fieldDesc.fields.destination}}</div>
          <div class="text-subtitle1">{{fieldDesc.fields.destinationHint}}</div>
        </q-card-section>
        <q-card-section>
          <address-input v-model="currentCase.destination" />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 q-pa-sm">
      <q-card class="full-size">
        <q-card-section>
          <div class="text-h6">{{$t('case.additionalInfo')}}</div>
        </q-card-section>
        <q-card-section class="column">
          <div class="row">
            <q-toggle :label="fieldDesc.fields.mobility" left-label
              v-model="currentCase.mobility" />
            <q-input type="number" style="min-width: 300px"
              :label="fieldDesc.fields.additionalPlaces"
              v-if="fieldDesc.fields.additionalPlaces"
              v-model="currentCase.additionalPlaces" />
          </div>
          <q-input class="col-12" :label="fieldDesc.fields.route"
            :hint="fieldDesc.fields.routeHint" v-if="fieldDesc.fields.controls"
            v-model="currentCase.route" />
          <q-input :label="fieldDesc.fields.controls"
            :hint="fieldDesc.fields.controlsHint"
            v-if="fieldDesc.fields.controls" v-model="currentCase.controls" />
          <div class="row q-py-sm">
            <q-toggle :label="fieldDesc.fields.economicalIssues" left-label
              v-model="currentCase.economicalIssues" />
            <q-toggle :label="fieldDesc.fields.healthIssues" left-label
              v-model="currentCase.healthIssues" />
          </div>
          <q-input type="textarea" :label="fieldDesc.fields.observations" filled
            v-model="currentCase.observations"
            :rules="[ val => val.length <= maxObsLength || $t('vmsg.maxLength', [maxObsLength])]" />
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-pa-sm justify-end full-width">
      <q-btn type="submit" flat no-caps :label="$t('cancel')">
      </q-btn>
      <q-btn type="submit" color="positive" no-caps push
        :label="$t('case.send')">
      </q-btn>
    </div>
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
  methods: {},
  computed: {
    fieldDesc () {
      return this.$t('case.' + this.type)
    },
    isExperience () {
      return (
        this.type === 'positiveExperience' || this.type === 'negativeExperience'
      )
    }
  },
  data () {
    return {
      maxObsLength: 500,
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
