<template>
  <div class="row q-col-gutter-x-sm">
    <q-select class="col-12 col-sm-4" v-model="address.province" dense
      :options="provinces" map-options emit-value use-input :readonly="readonly"
      :rules="[$validations.required]" :label="$t('address.province')"
      @filter="filterProvince"></q-select>
    <q-select class="col-12 col-sm-4" v-model="address.locality" map-options
      dense emit-value :rules="[$validations.required]" use-input clearable
      :readonly="readonly" :options="localities" :label="$t('address.locality')"
      input-debounce="500" @filter="filterLocality"></q-select>
    <q-input class="col-12 col-sm-4" v-model="address.address" dense
      :readonly="readonly" :label="$t('address.address')"
      :hint="$t('address.addressHint')"
      :placeholder="$t('address.addressPlaceholder')"
      :rules="[$validations.required]" @blur="completeLatLng()" />
    <q-no-ssr>
      <q-dialog v-model="showAddressDialog" :full-width="!$q.screen.gt.sm">
        <q-card
          :style="$q.screen.gt.sm ? {maxWidth: '60vw'} : {maxWidth: '100vw'}">
          <q-card-section
            class="bg-grey-4 text-grey-6 row no-wrap items-center">
            <q-avatar size="2em" icon="fa fa-map-marked" />
            <div class="text-subtitle">Elegí la ubicación correcta</div>
          </q-card-section>
          <q-card-section style="max-height: 50vh;" class="scroll">
            <address-selector class="col" @input="setLocation($event)"
              :addresses="foundAddresses" />
          </q-card-section>
          <q-card-section>
            <q-separator />
            <q-btn color="primary" class="q-ma-sm" :label="$t('ok')"
              :disable="!address.location" v-close-popup />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-no-ssr>
  </div>
</template>

<script>
const removeAccents = require('remove-accents-diacritics')
export default {
  components: {
    AddressSelector: () => import('components/AddressSelector')
  },
  props: {
    value: Object,
    readonly: Boolean
  },
  watch: {
    value (v) {
      this.address = v
    },
    address: {
      handler (v) {
        this.$emit('input', this.address)
      },
      deep: true
    }
  },
  async mounted () {
    await this.$store.dispatch('general/loadProvinces')
    this.provinces = this.$store.state.general.provinces
  },
  methods: {
    setLocation (location) {
      this.address.location = {
        lat: location.lat,
        lng: location.lon
      }
    },
    filterProvince (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        removeAccents.remove(needle)
        this.provinces = this.$store.state.general.provinces.filter(v => {
          var lab = removeAccents.remove(v.label.toLowerCase())
          return lab.indexOf(needle) > -1
        })
      })
    },
    async filterLocality (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow
      if (val === '' || val.trim() === '' || !this.address.province) {
        this.localities = []
      } else {
        var url =
          this.$config.geoApiUrl +
          '/localidades?campos=id,nombre&provincia=' +
          encodeURIComponent(this.address.province.id) +
          '&nombre=' +
          encodeURIComponent(val)
        var resp = await this.$axios.get(url)
        update(() => {
          this.localities = resp.data.localidades.map(x => ({
            label: x.nombre,
            value: x.nombre
          }))
        })
      }
    },
    async completeLatLng () {
      if (this.address.address) {
        this.$q.loading.show({
          message: this.$t('address.searching')
        })
        try {
          var completeAdr =
            this.address.address +
            ', ' +
            this.address.locality +
            ', ' +
            this.address.province.label +
            ', Argentina'
          var url =
            this.$config.osmUrl +
            '/search?format=json&q=' +
            encodeURI(completeAdr)

          const res = await this.$axios.get(url)
          this.$q.loading.hide()
          if (res.status === 200) {
            if (res.data && res.data.length > 1) {
              this.foundAddresses = res.data.map(data => ({
                id: data.place_id,
                lat: data.lat,
                lon: data.lon,
                description: data.display_name
              }))
              this.address.location = null
              this.showAddressDialog = true
            } else if (!res.data || res.data.length === 0) {
              var url2 =
                this.$config.geoApiUrl +
                '/localidades?campos=id,nombre,centroide&provincia=' +
                encodeURIComponent(this.address.province.id) +
                '&nombre=' +
                encodeURIComponent(this.address.locality)
              var res2 = await this.$axios.get(url2)
              if (res2.data && res2.data.localidades.length >= 1) {
                var item = res2.data.localidades[0].centroide
                this.address.location = {
                  lat: item.lat,
                  lng: item.lon
                }
              }
            } else {
              this.$q.notify({
                color: 'teal-5',
                message: 'Se encontró: ' + res.data[0].display_name,
                position: 'top',
                timeout: 800
              })
              this.address.location = {
                lat: res.data[0].lat,
                lng: res.data[0].lon
              }
            }
          }
        } catch {
          this.$q.loading.hide()
        }
      }
    }
  },
  data () {
    return {
      showAddressDialog: false,
      foundAddresses: [],
      provinces: [],
      localities: [],
      address: {
        province: null,
        locality: null,
        location: null
      }
    }
  }
}
</script>
