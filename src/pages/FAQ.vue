<template>
  <q-page padding>
    <h2 class="q-my-md">{{$t('faq.title')}}</h2>
    <div v-for="(it,i) in $t('faq.list')" :key="i">
      <h6  class="q-my-xs q-mt-md">{{it.title}}</h6>
      <p v-html="it.text"></p>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
