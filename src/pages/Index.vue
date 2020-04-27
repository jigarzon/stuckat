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
  </q-page>
</template>

<script>
import StuckButton from 'components/StuckButton'
export default {
  name: 'PageIndex',
  mounted () {},
  components: {
    StuckButton
  },
  methods: {
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
