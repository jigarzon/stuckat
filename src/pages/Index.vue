<template>
  <q-page padding class="column">
    <q-btn class="full-width bg-red text-white" type="a"
      href="https://www.facebook.com/groups/Grativiajes/permalink/1703667656438561/"
      icon="info" no-caps size="lg">ATENCIÓN: Información relativa a los
      permisos nuevos (5/5/2020)</q-btn>
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
    <h4 class="q-mb-sm">{{$t('stats.title')}}</h4>
    <h6 class="q-my-sm">{{$t('stats.subtitle')}}</h6>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="fit">
          <q-card-section>
            <div class="text-h6">{{$t('stats.map')}}</div>
            <div class="text-subtitle">{{$t('stats.mapText-' + mode)}}
              <q-btn @click="switchMode" no-caps dense class="q-ma-sm"
                :label="$t(mode === 'lines' ? 'stats.show-circles' : 'stats.show-lines')">
              </q-btn>
            </div>
          </q-card-section>
          <q-card-section>
            <cases-map :mode="mode" />
            <span class="text-caption2" v-html="$t('stats.mapNote')"></span>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="fit">
          <q-card-section>
            <div class="text-h6">{{$t('stats.chartByProvince')}}</div>
          </q-card-section>
          <q-card-section>
            <chart-by-province />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import StuckButton from 'components/StuckButton'
import CasesMap from 'components/CasesMap'
import ChartByProvince from 'components/ChartByProvince'
export default {
  name: 'PageIndex',
  mounted () {},
  components: {
    StuckButton,
    CasesMap,
    ChartByProvince
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
