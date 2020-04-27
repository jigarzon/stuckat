<template>
  <q-dialog :value="value" @input="$emit('input', $event)"
    :maximized="$q.screen.lt.sm">
    <q-card>
      <q-card-section>
        <social-login-buttons :title="$t('user.loginBySocial')"
          @socialSelected="socialSelected" />
      </q-card-section>
      <q-separator />
      <!-- <q-card-section>
        <q-form @submit="doLogin">
          <span class="row text-subtitle1" v-html="$t('user.loginWithCredentials')" />
          <q-input v-model="credentials.email" :label="$t('user.email')" :rules="[$validations.required]"
            name="username" />
          <q-input v-model="credentials.password" type="password" :label="$t('user.password')"
            :rules="[$validations.required]" lazy-rules name="password" />
          <div class="row justify-end q-gutter-sm q-pt-md">
            <q-btn color="primary" :label="$t('cancel')" v-close-popup />
            <q-btn color="primary" :label="$t('user.initSession')" type="submit"
              :loading="loading" />
          </div>
        </q-form>
      </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script>
import SocialLoginButtons from 'components/SocialLoginButtons'

export default {
  props: ['value'],
  data: function () {
    return {
      credentials: { email: '', password: '' },
      loading: false
    }
  },
  methods: {
    async socialSelected (type) {
      try {
        await this.$store.dispatch('general/socialAuth', type)
        this.loginSucces()
      } catch (e) {
        this.$q.notify({
          icon: 'fa fa-exclamation',
          color: 'negative',
          message: this.$t('user.errors.wrongSocialLogin')
        })
      }
    },
    loginSucces () {
      this.$emit('input', false)
      this.$q.notify({
        color: 'positive',
        message: this.$t('user.welcomeMessage', this.$store.state.general.user),
        position: 'top'
      })
    },
    async doLogin () {
      this.loading = true
      try {
        await this.$store.dispatch('user/login', this.credentials)
        this.loading = false
        this.loginSucces()
      } catch (e) {
        console.error(e)
        this.loading = false
        this.$q.notify({
          icon: 'fa fa-exclamation',
          color: 'negative',
          message: this.$t('user.errors.wrongCredentials')
        })
      }
    }
  },
  components: {
    SocialLoginButtons
  }
}
</script>

<style>
</style>
