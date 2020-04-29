<template>
  <q-field :label="$t('phone')" stack-label dense :disable="disable"
   :error="!valid && !!value" :error-message="$t('vmsg.phone')" :value="value">
    <template v-slot:control>
      <vue-tel-input :value="value" @input="$emit('input', $event)" class="phone-input"
        :inputOptions="{showDialCode:true}" placeholder="Ingrese caracteristica telefono sin el 15. Ej: +54 11 54545454"
        @validate="phoneValidate">
      </vue-tel-input>
    </template>
  </q-field>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    disable: Boolean
  },
  methods: {
    phoneValidate (res) {
      this.valid = res.valid
    }
  },
  data () {
    return {
      valid: true
    }
  }
}
</script>

<style lang="stylus">
.phone-input:focus-within {
  box-shadow: none !important;
}

.phone-input {
  width: 100%;
  border: 0px !important;

  .dropdown {
    order: 2;

    ul {
      right: 0px !important;
      bottom: 30px !important;
      top: auto;
      left: auto;
    }
  }
}
</style>
