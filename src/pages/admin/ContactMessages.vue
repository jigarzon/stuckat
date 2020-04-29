<template>
  <q-page padding>
    <q-table :data="data" :columns="columns">
      <q-td slot="body-cell-text" slot-scope="props" :props="props">
        <q-input type="textarea" readonly autogrow :value="props.row.text" />
      </q-td>
      <q-td slot="body-cell-delete" slot-scope="props" :props="props">
        <q-btn size="sm" flat round icon="far fa-trash-alt" color="red"
          @click="deleteContact(props.row._id)" />
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
export default {
  mounted () {
    this.retrieve()
  },
  methods: {
    async retrieve () {
      var resp = await this.$axios.get('/api/contact')
      this.data = resp.data.contacts
    },
    deleteContact (id) {
      this.$q
        .dialog({
          title: 'Confirmar',
          message: 'Confirmas eliminar el mensaje?',
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          await this.$axios.delete('/api/contact/' + id)
          this.retrieve()
        })
    }
  },
  data () {
    return {
      data: [],
      columns: [
        {
          name: 'name',
          label: this.$t('name'),
          field: 'name',
          sortable: true,
          align: 'left'
        },
        {
          name: 'email',
          label: this.$t('email'),
          field: 'email',
          sortable: true,
          align: 'left'
        },

        {
          name: 'phone',
          label: this.$t('phone'),
          field: 'phone',
          sortable: true,
          align: 'left'
        },
        {
          name: 'text',
          label: 'Texto',
          field: 'text',
          align: 'left'
        },
        {
          name: 'delete',
          label: '',
          required: true,
          field: 'id'
        }
      ]
    }
  }
}
</script>
