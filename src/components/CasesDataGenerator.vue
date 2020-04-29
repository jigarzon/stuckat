<template>

  <div>
    <q-btn @click="retrieve">GENERAR</q-btn>
    <span>
    {{data}}
    </span>
  </div>
</template>

<script>
// import { latLng } from 'leaflet'

export default {
  name: 'GeometryTest',
  mounted () {
  },
  data () {
    return {
      data: []
    }
  },

  methods: {
    async findLocation (location) {
      if (!location || !location.province || !location.locality) {
        return null
      }
      try {
        var url =
          this.$config.geoApiUrl +
          '/localidades?campos=id,nombre,centroide&provincia=' +
          encodeURIComponent(location.province.id) +
          '&nombre=' +
          encodeURIComponent(location.locality)
        const res = await this.$axios.get(url)

        if (res.data && res.data.localidades.length >= 1) {
          var item = res.data.localidades[0]
          return {
            lat: item.centroide.lat,
            lng: item.centroide.lon
          }
        }
      } catch (e) {
        console.error('error retrieving lat lon', e)
        return null
      }
    },
    async retrieve () {
      var resp = await this.$axios.get('/api/cases/all')
      var items = await resp.data.cases.reduce(async (arr, currentCase) => {
        var targetArray = await arr
        var origin = currentCase.origin && currentCase.origin.location
        var destination =
          currentCase.destination && currentCase.destination.location
        if (!origin) {
          origin = await this.findLocation(currentCase.origin)
        }
        if (!destination) {
          destination = await this.findLocation(currentCase.destination)
        }
        if (origin && destination) {
          // var rnd = Math.random() * 0.01
          var a, b, c, d
          a = parseFloat(origin.lng)
          b = parseFloat(origin.lat)
          c = parseFloat(destination.lng)
          d = parseFloat(destination.lat)
          if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
            return targetArray
          } else {
            // var item = {
            //   type: 'Feature',
            //   geometry: {
            //     type: 'LineString',
            //     coordinates: [
            //       [a + rnd, b + rnd],
            //       [c + rnd, d + rnd]
            //     ]
            //   }
            // }
            var item = {
              id: currentCase._id,
              o: { lat: b, lng: a },
              d: { lat: d, lng: c }
            }
            targetArray.push(item)
          }
        }
        return targetArray
      }, [])
      this.data = items
    }
  }
}
</script>
