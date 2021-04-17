<template>
    <v-container class="grey lighten-5">
    <v-row
      justify="space-around"
    >
      <v-col
        v-for="i in interdata.userMetaData.cloudData"
        :key="i.public_id"
        :data-id="i.public_id"
        :data-url="i.url"
        cols="12"
        sm="6"
        :md="interdata.userMetaData.cloudData.length === 1 ? 12 : interdata.userMetaData.cloudData.length === 2 ? 6 : 4"
        @mouseover="getDataset"
      >
        <v-card
          @mouseover="showButton = true"
          @mouseout="showButton = false"
          @click="enlargeImg"
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
                @click="likeImg"
                icon
                :color="showButton && i.public_id === dataset.id ? 'red' : 'rgba(255, 255, 255, 0)'"
                dark
                v-bind="attrs"
                v-on="on"
                @mouseover="onButton"
                @mouseout="offButton"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </template>
            <span>I like</span>
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
import { mapMutations, mapState } from 'vuex'
export default {
    data: () => ({
      dataset: "",
      showButton: false,
      buttonTarget: false,
      check: false
    }),
    props: ["interdata"],
    computed: {
        ...mapState(["user"]),
        style() {
            const arrOfUrls = []
            this.idata.userMetaData.cloudData.forEach(function(e) {
                arrOfUrls.push(`background-image:url(${e.url});background-size:cover`)
            })
            return arrOfUrls
        }
    },
    methods: {
      ...mapMutations(['setNumberOfLikes']),
      likeImg() {
          const imgWhichLikedId = this.dataset.id
          const userWhichLikedName = this.user.name
          const ch = this.check
          function check(ch, isLikeYet) {
              this.interdata.userMetaData.cloudData.forEach(function(e) {
                  if(e.public_id === imgWhichLikedId) {
                      e.userWhichLiked.forEach(function(e) {
                          if(userWhichLikedName === e.userName) {
                              ch = false
                          } else {
                              ch = true
                          }
                      })
                  }
              })
              return ch
          }
          this.check = check(ch)
          const number = {
              imgWhichLikedId: imgWhichLikedId,
              userWhichLikedName: userWhichLikedName
          }
          if(this.check) {
              this.setNumberOfLikes(number)
              this.$socket.emit('likeImg', {
                  room: this.user.room,
                  imgWhichLikedId: this.dataset.id,
                  name: this.user.name,
                  intername: this.interdata.appMetaData.username
              })
          }
          const email = this.interdata.email
          const info = this.interdata.userMetaData.info
          const cloudData = this.interdata.userMetaData.cloudData
          this.$axios.$post(`/server/user-info`, {
              text: info,
              cloudData: cloudData,
              email: email
          })
      },
      getDataset(e) {
        this.dataset = {
            id: e.currentTarget.dataset.id,
            url: e.currentTarget.dataset.url
        }
      },
      enlargeImg(e) {
          if(!this.buttonTarget) {
              window.open(this.dataset.url, '_blank')
          }
      },
      onButton() {
          this.buttonTarget = true
      },
      offButton() {
          this.buttonTarget = false
      }
    }
}
</script>
