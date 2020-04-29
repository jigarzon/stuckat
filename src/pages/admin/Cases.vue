<template>
  <q-page padding>
    <q-table :data="data" :columns="columns" :visible-columns="visibleColumns">
      <template v-slot:top>
        <q-select v-model="visibleColumns" multiple outlined dense options-dense
          display-value="Columnas" emit-value map-options :options="columns"
          option-value="name" style="min-width: 150px" />
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
  mounted () {
    this.retrieve()
  },
  methods: {
    async retrieve () {
      var resp = await this.$axios.get('/api/cases/all')
      this.data = resp.data.cases
    }
  },
  data () {
    return {
      data: [],
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
          sortable: true
        },
        {
          name: 'type',
          label: this.$t('type'),
          field: row => row.type,
          sortable: true
        },
        {
          name: 'origin',
          label: 'origen',
          align: 'left',
          field: 'origin',
          sort: (a, b, rowA, rowB) => {
            var strA = rowA.origin.province + rowA.origin.locality
            var strB = rowB.origin.province + rowB.origin.locality
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
          sortable: true
        },
        {
          name: 'destination',
          label: 'Destino',
          align: 'left',
          sortable: true,
          field: 'destination',
          sort: (a, b, rowA, rowB) => {
            var strA = rowA.destination.province + rowA.destination.locality
            var strB = rowB.destination.province + rowB.destination.locality
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
          sortable: true
        },
        {
          name: 'email',
          label: this.$t('email'),
          field: row =>
            (row.user && row.user.contactInfo && row.user.contactInfo.email) ||
            row.user.email,
          sortable: true
        },
        {
          name: 'phone',
          label: this.$t('phone'),
          field: row =>
            (row.user && row.user.contactInfo && row.user.contactInfo.phone) ||
            row.user.phone,
          sortable: true
        },
        {
          name: 'createdAt',
          label: this.$t('createdAt'),
          field: row => date.formatDate(row.createdAt, 'YYYY-MM-DD HH:mm'),
          sortable: true
        },
        {
          name: 'mobility',
          label: this.$t('mobility'),
          field: row => (row.mobility ? 'Sí' : 'No'),
          sortable: true
        }
      ]
    }
  }
}
</script>
