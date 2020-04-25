<template>
  <div class="row">
    <div class="col-5">
      <q-list separator>
        <q-item clickable v-ripple v-for="address in addresses"
          :active="selectedAddress == address.id"
          @click="selectedAddress= address.id" :key="address.id">
          <q-item-section>
            {{address.description}}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-7" style="flex: 1">
      <l-map ref="myMap" :zoom=13 :bounds="bounds">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="[address.lat, address.lon]"
          @click="selectedAddress= address.id"
          :icon="address.id == selectedAddress?iconHigh:iconDefault"
          v-for="address in addresses" :key="address.id">
          <l-popup>
            <div>
              {{address.description}}
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
export default {
  // addresses:
  // {"id", "lat", "lon", "description"}
  watch: {
    selectedAddress () {
      this.$emit(
        'input',
        this.addresses.find(a => a.id === this.selectedAddress)
      )
    }
  },
  props: ['addresses'],
  created () {
    if (this.$leaflet) {
      this.bounds = this.$leaflet.latLngBounds(
        this.addresses.map(ad => this.$leaflet.latLng(ad.lat, ad.lon))
      )
    }
  },
  data: function () {
    return {
      selectedAddress: null,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      bounds: null,
      iconHigh: L.icon({
        iconUrl: 'statics/marker-icon.png',
        iconSize: [20, 32],
        iconAnchor: [16, 37]
      }),
      iconDefault: new this.$leaflet.Icon.Default()
    }
  },
  methods: {}
}
</script>

<style>
</style>
