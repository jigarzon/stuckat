import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import { Icon, latLng, latLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import VueTelInput from 'vue-tel-input'
import VueApexCharts from 'vue-apexcharts'

export default ({ Vue }) => {
  Vue.use(VueTelInput)
  Vue.use(VueApexCharts)

  Vue.component('apexchart', VueApexCharts)
  Vue.component('l-map', LMap)
  Vue.component('l-tile-layer', LTileLayer)
  Vue.component('l-marker', LMarker)
  Vue.component('l-popup', LPopup)
  delete Icon.Default.prototype._getIconUrl
  Vue.prototype.$leaflet = {
    latLng,
    latLngBounds,
    Icon
  }

  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })
}
