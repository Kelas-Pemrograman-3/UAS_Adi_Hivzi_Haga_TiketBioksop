<template>
  <q-page padding>
   <q-card>
      <q-table
      title="Data Film"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Judul_Film" :props="props">{{ props.row.Judul_Film }}</q-td>
            <q-td key="Durasi" :props="props">{{ props.row.Durasi }}</q-td>
            <q-td key="Sutradara" :props="props">{{ props.row.Sutradara }}</q-td>
            <q-td key="Rating" :props="props">{{ props.row.Rating }}</q-td>
            <q-td key="Jadwal" :props="props">{{ props.row.Jadwal }}</q-td>
            <q-td key="Studio" :props="props">{{ props.row.Studio }}</q-td>
            <q-td key="Harga" :props="props">{{ props.row.Harga }}</q-td>
            <q-td key="Sinopsis" :props="props">{{ props.row.Sinopsis }}</q-td>
            <q-td key="Option" :props="props">
              <q-card-actions align="around" class="row q-col-gutter-md no-wrap">
                <div class="col q-gutter-md">
                  <q-btn round @click="opendialog(props.row)" color="secondary" icon="edit"></q-btn>
                   <q-btn round @click="confirm(props.row._id)" color="negative" icon="delete"></q-btn>
                </div>
              </q-card-actions>
            </q-td>
          </q-tr>
        </template>

    </q-table>
   </q-card>
   <q-dialog v-model="openedit" v-if="openedit">
      <q-card style="width: 700px; max-width:80vw;">
        <q-card-section>
          <div class="text-h6">Edit Data</div>
        </q-card-section>

        <q-separator/>

          <q-card-selection style="max-height: 50vh" class="scroll">
          <q-input label ="Judul_Film" v-model ="activedata.Judul_Film"></q-input>
          <q-input label ="Durasi" v-model ="activedata.Durasi"></q-input>
          <q-input label ="Sutradara" v-model ="activedata.Sutradara"></q-input>
          <q-input label ="Rating" v-model ="activedata.Rating"></q-input>
          <q-input label ="Jadwal" v-model ="activedata.Jadwal"></q-input>
          <q-input label ="Studio" v-model ="activedata.Studio"></q-input>
          <q-input label ="Harga" v-model ="activedata.Harga"></q-input>
          <q-input label ="Sinopsis" v-model ="activedata.Sinopsis"></q-input>
          </q-card-selection>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Edit" color="primary" @click="edit()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        { name: 'Judul_Film', align: 'center', label: 'Judul_Film', field: 'Judul_Film', sortable: true },
        { name: 'Durasi', label: 'Durasi', field: 'Durasi', sortable: true },
        { name: 'Sutradara', label: 'Sutradara', field: 'Sutradara', sortable: true },
        { name: 'Rating', label: 'Rating', field: 'Rating', sortable: true },
        { name: 'Jadwal', label: 'Jadwal', field: 'Jadwal', sortable: true },
        { name: 'Studio', label: 'Studio', field: 'Studio', sortable: true },
        { name: 'Harga', label: 'Harga', field: 'Harga', sortable: true },
        { name: 'Sinopsis', label: 'Sinopsis', field: 'Sinopsis', sortable: true },
        { name: 'Option', label: 'Option', field: 'Option' }
      ],
      data: [],
      original: [],
      openedit: false,
      activedata: null
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    getData () {
      this.$axios.get('datafilm/getAll')
        .then(res => {
          this.original = res.data.data
        })
    },
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter

      this.loading = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

        // calculate starting row of data
        let startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        let returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      }, 1500)
    },
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      let data = []

      if (!filter) {
        data = this.original.slice(startRow, startRow + count)
      } else {
        let found = 0
        for (let index = startRow, items = 0; index < this.original.length && items < count; ++index) {
          let row = this.original[index]
          // match filter?
          if (!row['name'].includes(filter)) {
            // get a different row, until one is found
            continue
          }
          ++found
          if (found >= startRow) {
            data.push(row)
            ++items
          }
        }
      }

      // handle sortBy
      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b
          if (sortBy === 'desc') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return data
    },
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat['name'].includes(filter)) {
          ++count
        }
      })
      return count
    },
    opendialog (data) {
      this.openedit = true
      this.activedata = data
    },
    edit () {
      this.$axios.put('datafilm/edit/' + this.activedata._id, this.activedata)
        .then(res => {
          if (res.data.error) {
            this.showNotif(res.data.pesan, 'negative')
          } else {
            this.showNotif(res.data.pesan, 'positive')
            this.openedit = false
            this.getData()
          }
        })
    },
    showNotif (msg, color) {
      this.$q.notify({
        message: msg,
        color: color
      })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Apakah anda yakin',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete('datafilm/delete/' + id)
          .then(res => {
            if (res.data.error) {
              this.showNotif(res.data.pesan, 'negative')
            } else {
              this.showNotif(res.data.pesan, 'positive')
              this.getData()
            }
          })
      })
    }
  }
}
</script>
