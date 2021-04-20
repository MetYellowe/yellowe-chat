<template>
    <v-container class="grey lighten-5">
    <v-row
      justify="space-around"
    >
      <v-col
        v-for="i in interdata.length ? interdata : updateImgs"
        :key="i.public_id"
        :data-id="i.public_id"
        :data-url="i.url"
        cols="12"
        sm="6"
        :md="interdata.length ? interdata.length : updateImgs.length === 1 ? 12 : interdata.length ? interdata.length : updateImgs.length === 2 ? 6 : 4"
        @mouseover="getDataset"
      >
        <v-card
          @mouseover="showButton = true"
          @mouseout="showButton = false"
          @click.self="enlargeImg"
          class="pa-2"
          outlined
          tile
          :style="style.shift()"
          width="300"
          height="450"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="delImg"
                icon
                :color="showButton && i.public_id === dataset.id ? 'red' : 'rgba(255, 255, 255, 0)'"
                dark
                v-bind="attrs"
                v-on="on"
                ref="del"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="showButton && i.public_id === dataset.id ? 'red' : 'rgba(255, 255, 255, 0)'"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{ i.numberOfLikes }}
              </v-btn>
            </template>
            <span>People like</span>
          </v-tooltip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: ({$auth}) => ({
      dataset: "",
      showButton: false
    }),
    computed: {
        style() {
            const arrOfUrls = []
            this.interdata.length ? this.interdata.forEach(function(e) {
                arrOfUrls.push(`background-image:url(${e.url});background-size:cover`)
            }) : this.updateImgs.forEach(function(e) {
                arrOfUrls.push(`background-image:url(${e.url});background-size:cover`)
            })
            return arrOfUrls
        },
        interdata() {
            if(this.$store.state.interdata.userMetaData) {
                return this.$store.state.interdata.userMetaData.cloudData
            } else {
              return ''
            }
        }
    },
    props: ['imgData', 'updateImgs'],
    methods: {
      delImg(e) { 
          this.$axios.$post(`/server/delete-img`, {
                public_id: this.dataset.id
          })
          this.imgData(this.dataset.id)
      },
      getDataset(e) {
          this.dataset = {
              id: e.currentTarget.dataset.id,
              url: e.currentTarget.dataset.url
          }
      },
      enlargeImg(e) {
          window.open(this.dataset.url, '_blank')
      }
    }
}
</script>
