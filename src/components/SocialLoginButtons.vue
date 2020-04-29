<template>
  <div class="column">
    <span class="row q-py-sm text-subtitle1" v-html="title" />
    <div class="row no-wrap justify-around">
      <q-btn icon="fab fa-facebook-f" size="xl" unelevated round
        text-color="white" @click="select('facebook')" class="facebook-btn" />
      <!-- <q-btn icon="fab fa-instagram" size="xl" unelevated round class="ig-btn"
      @click="select('instagram')"
        text-color="white" /> -->
      <q-btn icon="fab fa-google" size="xl" unelevated round class="google-btn"
        @click="select('google')" text-color="white" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    select (provider) {
      this.$emit('socialSelected', provider)
    }
  }
}
</script>
<style lang="stylus" scoped>
.ig-btn {
  background: #d6249f;
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
}

.facebook-btn {
  background: #3b5998;
}

.google-btn {
  background: #dd4b39;
}
</style>
