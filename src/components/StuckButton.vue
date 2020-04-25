<template>
  <q-btn no-caps :color="caseInfo.color" @click="$emit('click')" push
    style="min-height:100px" class="full-width full-height">
    <div class="row no-wrap items-center text-left">
      <q-icon :name="caseInfo.icon" size="lg" />
      <div class="column q-pl-sm">
        <span class="text-h5">{{caseInfo.title}}</span>
        <span class="text-subtitle1">{{caseInfo.caption}}</span>
      </div>
    </div>
  </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    caseInfo: Object
  }
}
</script>
