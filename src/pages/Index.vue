<template>
  <q-page padding class="column">
    <span :class="$q.screen.gt.sm ? 'text-h3' : 'text-h4'"
      class="q-py-md">{{$t('landing.text1')}}</span>
    <span class="text-subtitle1">{{$t('landing.text2')}}</span>
    <span class="text-subtitle1" v-html="$t('landing.text3')" />
    <div class="row self-center items-stretch q-mt-md" style="max-width:600px">
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.case1')" />
      </div>
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.case2')" />
      </div>
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.case3')" />
      </div>
      <div class="q-pa-sm col-12 col-sm-6">
        <stuck-button :caseInfo="$t('case.case4')" />
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
  }
}
</script>
