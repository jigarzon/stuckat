<template>
  <q-page padding>
    <q-table :data="data" :columns="columns" :visible-columns="visibleColumns">
      <template v-slot:top>
        <q-select v-model="visibleColumns" multiple outlined dense options-dense
          display-value="Columnas" emit-value map-options :options="columns"
          option-value="name" style="min-width: 150px" />
        <q-select class="q-mx-md" style="min-width: 200px" outlined
          v-model="filter.originProvince" dense :options="provinces" map-options
          emit-value clearable label="Provincia origen"></q-select>
        <q-select class="q-mx-md" style="min-width: 200px" outlined
          v-model="filter.destinationProvince" dense :options="provinces"
          map-options emit-value clearable label="Provincia destino"></q-select>
        <q-btn @click="retrieve" label="Buscar" no-caps icon="fas fa-search">
        </q-btn>
      </template>
      <q-td slot="body-cell-edit" slot-scope="props" :props="props">
        <q-btn size="sm" flat round icon="fas fa-pencil-alt" color="black"
          :to="'/admin/cases/' + props.row._id" />
      </q-td>
      <template v-slot:body-cell-origin="props">
        <q-td :props="props">
          <q-badge class="q-mx-sm">{{props.row.origin.province.label}}</q-badge>
          <span>{{props.row.origin.locality}}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-destination="props">
        <q-td :props="props">
          <q-badge class="q-mx-sm">{{props.row.destination.province.label}}
          </q-badge>
          <span>{{props.row.destination.locality}}</span>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  async mounted () {
    this.retrieve()
    await this.$store.dispatch('general/loadProvinces')
    this.provinces = this.$store.state.general.provinces
  },
  methods: {
    async retrieve () {
      var params = {}
      if (this.filter.originProvince) {
        params.origin_province_id = this.filter.originProvince.id
      }
      if (this.filter.destinationProvince) {
        params.destination_province_id = this.filter.destinationProvince.id
      }
      var resp = await this.$axios.get('/api/cases/all', { params })
      this.data = resp.data.cases
    }
  },
  data () {
    return {
      data: [],
      provinces: [],
      filter: {
        originProvince: null,
        destinationProvince: null
      },
      visibleColumns: ['name', 'origin', 'destination'],
      columns: [
        {
          name: 'edit',
          label: '',
          required: true,
          field: 'id'
        },
        {
          name: 'name',
          label: this.$t('name'),
          field: row => row.user.firstName + ' ' + row.user.lastName,
          sortable: true,
          align: 'left'
        },
        {
          name: 'type',
          label: this.$t('type'),
          field: row => row.type,
          sortable: true,
          align: 'left'
        },
        {
          name: 'origin',
          label: 'origen',
          align: 'left',
          field: 'origin',
          sort: (a, b, rowA, rowB) => {
            var strA = rowA.origin.province.label + rowA.origin.locality
            var strB = rowB.origin.province.label + rowB.origin.locality
            if (strA < strB) {
              return -1
            } else if (strA > strB) {
              return 1
            } else {
              return 0
            }
          },
          sortable: true
        },
        {
          name: 'origin.address',
          label: 'Dirección origen',
          field: row => row.origin.address,
          sortable: true,
          align: 'left'
        },
        {
          name: 'destination',
          label: 'Destino',
          align: 'left',
          sortable: true,
          field: 'destination',
          sort: (a, b, rowA, rowB) => {
            var strA =
              rowA.destination.province.label + rowA.destination.locality
            var strB =
              rowB.destination.province.label + rowB.destination.locality
            if (strA < strB) {
              return -1
            } else if (strA > strB) {
              return 1
            } else {
              return 0
            }
          }
        },
        {
          name: 'destination.address',
          label: 'Dirección destino',
          field: row => row.destination.address,
          sortable: true,
          align: 'left'
        },
        {
          name: 'email',
          label: this.$t('email'),
          field: row => {
            if (
              row.user &&
              row.user.contactInfo &&
              row.user.contactInfo.email
            ) {
              return row.user.contactInfo.email
            } else {
              return row.user.email
            }
          },
          sortable: true,
          align: 'left'
        },
        {
          name: 'phone',
          label: this.$t('phone'),
          field: row => {
            if (
              row.user &&
              row.user.contactInfo &&
              row.user.contactInfo.phone
            ) {
              return row.user.contactInfo.phone
            } else {
              return row.user.phone
            }
          },

          sortable: true,
          align: 'left'
        },
        {
          name: 'createdAt',
          label: this.$t('createdAt'),
          field: row => date.formatDate(row.createdAt, 'YYYY-MM-DD HH:mm'),
          sortable: true,
          align: 'left'
        },
        {
          name: 'mobility',
          label: this.$t('mobility'),
          field: row => (row.mobility ? 'Sí' : 'No'),
          sortable: true,
          align: 'left'
        }
      ]
    }
  }
}
</script>
