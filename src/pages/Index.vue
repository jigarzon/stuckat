<template>
  <q-page padding class="column">
    <span :class="$q.screen.gt.sm ? 'text-h3' : 'text-h4'"
      class="q-py-md">{{$t('landing.text1')}}</span>
    <span class="text-subtitle1">{{$t('landing.text2')}}</span>
    <span class="text-subtitle1" v-html="$t('landing.text3')" />
    <div class="row self-center items-stretch q-mt-md" style="max-width:600px">
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.stuck')" @click="create('stuck')" />
      </div>
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.relativeStuck')"
          @click="create('relativeStuck')" />
      </div>
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.positiveExperience')"
          @click="create('positiveExperience')" />
      </div>
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.negativeExperience')"
          @click="create('negativeExperience')" />
      </div>
    </div>
    <h5 class="q-mb-sm">{{$t('case.map')}}</h5>
    <div class="text-subtitle">{{$t('case.mapText-' + mode)}}
      <q-btn @click="switchMode" no-caps dense class="q-ma-sm"
        :label="$t(mode === 'lines' ? 'case.show-circles' : 'case.show-lines')">
      </q-btn>
    </div>
    <cases-map :mode="mode" />
  </q-page>
</template>

<script>
import StuckButton from 'components/StuckButton'
import CasesMap from 'components/CasesMap'
export default {
  name: 'PageIndex',
  mounted () {},
  components: {
    StuckButton,
    CasesMap
  },
  data () {
    return {
      mode: 'lines'
    }
  },
  methods: {
    switchMode () {
      this.mode = this.mode === 'lines' ? 'circles' : 'lines'
    },
    create (type) {
      if (this.$store.state.general.accessToken) {
        this.$router.push({ path: '/my-case', query: { type } })
      } else {
        // this.$router.push({ path: '/my-case', query: { type } })
        this.$root.$emit('loginRequested')
      }
    }
  }
}
</script>
