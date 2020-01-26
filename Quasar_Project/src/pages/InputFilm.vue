<template>
    <q-page>
       <div class="row justify-center q-pt-md">
           <div class="col-md-6 col-xs-26">
                <q-card class="my-card">
                <q-card-section>
                    <div class="text-h4 q-pb-md"><center> Input Data Film </center></div>
                    <q-form
      @submit="onSubmit"
      class="q-gutter-sm"
    >
       <q-input
        filled
        type="text"
        v-model="Judul_Film"
        label= "Masukkan Judul Film "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="Durasi"
        label= "Masukkan Durasi Waktu "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

        <q-input
        filled
        type="text"
        v-model="Sutradara"
        label= "Masukkan Nama Sutradara "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

        <q-input
        filled
        type="text"
        v-model="Rating"
        label= "Masukkan Rating Film "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

        <q-input
        filled
        type="text"
        v-model="Jadwal"
        label= "Masukkan Jadwal Film "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

        <q-input
        filled
        type="text"
        v-model="Studio"
        label= "Masukkan Studio Film "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

<q-input
        filled
        type="text"
        v-model="Harga"
        label= "Masukkan Harga Tiket Film "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

<q-input
        filled
        type="text"
        v-model="Sinopsis"
        label= "Masukkan Sinopsis Film "
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
      Judul_Film: '',
      Durasi: '',
      Sutradara: '',
      Rating: '',
      Jadwal: '',
      Studio: '',
      Harga: '',
      Sinopsis: ''
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('datafilm/insert', {
        Judul_Film: this.Judul_Film,
        Durasi: this.Durasi,
        Sutradara: this.Sutradara,
        Rating: this.Rating,
        Jadwal: this.Jadwal,
        Studio: this.Studio,
        Harga: this.Harga,
        Sinopsis: this.Sinopsis
      }).then(res => {
        if (res.data.error) {
          this.showNotif(res.data.pesan, 'negative')
        } else {
          this.$router.push('/home')
        }
        this.Judul_Film = ''
        this.Durasi = ''
        this.Sutradara = ''
        this.Rating = ''
        this.Jadwal = ''
        this.Studio = ''
        this.Harga = ''
        this.Sinopsis = ''
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
