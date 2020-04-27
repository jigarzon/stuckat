<template>
  <q-page padding>
    <h2>{{$t('contact.title')}}</h2>
    <span v-html="$t('contact.text')"></span>
    <q-form style="max-width:500px" @submit="submit">
      <q-input class="q-pa-sm" :label="$t('name')" v-model="contactForm.name"
        :rules="[$validations.required]" />
      <phone-input class="q-pa-sm" v-model="contactForm.phone" />
      <q-input class="q-pa-sm" :label="$t('email')" v-model="contactForm.email"
        :rules="[$validations.email, $validations.required]" />
      <q-input class="q-pa-sm" type="textarea" autogrow :label="$t('message')"
        v-model="contactForm.text"
        :rules="[$validations.required, $validations.maxLength(300)]" />
      <div>
        <q-btn type="submit" color="positive">{{$t('send')}}</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import PhoneInput from 'components/PhoneInput'

export default {
  components: {
    PhoneInput
  },
  methods: {
    async submit () {
      try {
        await this.$axios.post('/api/contact', this.contactForm)
        this.$q.notify({
          color: 'positive',
          message: this.$t('contact.thanks')
        })
        this.$router.back()
      } catch (e) {
        var msg = e && e.response && e.response.statusText
        this.$q.notify({
          color: 'negative',
          message: 'Error guardando el caso: ' + e + ' ' + msg
        })
      }
    }
  },
  data () {
    return {
      contactForm: {
        email: '',
        name: '',
        phone: '',
        text: ''
      }
    }
  }
}
</script>
