<template>
  <div>
    <apexchart v-if="chart" type="donut" :options="chart.chartOptions"
      :series="chart.series">
    </apexchart>
  </div>
</template>

<script>
export default {
  async mounted () {
    var resp = await this.$axios.get('/api/stats/byProvince')
    if (resp && resp.data) {
      this.chart = {
        series: resp.data.data.map(x => x.count),
        chartOptions: {
          labels: resp.data.data.map(x => x._id),

          legend: {
            position: 'bottom'
          },
          dataLabels: {
            enabled: true
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  name: {
                    show: false
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  data () {
    return {
      series: [],
      chart: null,
      chartOptions: {
        labels: [],
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        }
      }
    }
  }
}
</script>
