<template>
    <q-page>
       <div class="row justify-center q-pt-md">
           <div class="col-md-6 col-xs-26">
                <q-card class="my-card">
                <q-card-section>
                    <div class="text-h4 q-pb-md"><center> Input Data Bioskop </center></div>
                    <q-form
      @submit="onSubmit"
      class="q-gutter-sm"
    >
       <q-input
        filled
        type="text"
        v-model="Nama_Bioskop"
        label= "Masukkan Nama Bioskop "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="Alamat"
        label= "Masukkan Alamat Bioskop "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <div>
        <q-btn label="Save" type="submit" color="primary"/>
      </div>
    </q-form>
                </q-card-section>
                </q-card>
           </div>
       </div>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      Nama_Bioskop: '',
      Alamat: ''
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('databioskop/input', {
        Nama_Bioskop: this.Nama_Bioskop,
        Alamat: this.Alamat
      }).then(res => {
        if (res.data.error) {
          this.showNotif(res.data.pesan, 'negative')
        } else {
          this.$router.push('/home')
        }
        this.Nama_Bioskop = ''
        this.Alamat = ''
      })
    },
    showNotif (msg, color) {
      this.$q.notify({
        message: msg,
        color: 'color'
      })
    }
  }
}
</script>
