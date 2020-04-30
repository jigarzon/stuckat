<template>

  <div class="shadow-5" style="overflow:hidden; border-radius: 20px">
    <l-map :zoom="zoom" :center="center" style="height: 500px; width: 100%">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="geoJSON" :optionsStyle="geoStyle" />
    </l-map>
  </div>
</template>

<script>
// import { latLng } from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'

export default {
  name: 'GeometryTest',
  components: {
    LMap,
    LTileLayer,

    LGeoJson
  },
  props: {
    mode: String
  },
  mounted () {
    this.retrieve()
  },
  data () {
    return {
      zoom: 4,
      data: [],
      geoStyle: {
        color: '#ff7800',
        weight: 2,
        opacity: 0.65
      },
      center: [-34.99400375757576, -65.1708984375],

      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  computed: {
    geoJSON () {
      var items
      if (this.mode === 'lines') {
        items = this.data.map(item => {
          var rnd = Math.random() * 0.01
          return {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [item.o.lng + rnd, item.o.lat + rnd],
                [item.d.lng + rnd, item.d.lat + rnd]
              ]
            }
          }
        })
      } else {
        items = this.data.reduce((items, item) => {
          var rnd = Math.random() * 0.01
          items.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [item.o.lng + rnd, item.o.lat + rnd]
            }
          })
          items.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [item.d.lng + rnd, item.d.lat + rnd]
            }
          })
          return items
        }, [])
      }
      return {
        type: 'FeatureCollection',
        features: items
      }
    }
  },
  methods: {
    async retrieve () {
      var resp = await this.$axios.get('/mapdata.json')
      this.data = resp.data
    }
  }
}
</script>
