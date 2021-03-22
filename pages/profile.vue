<template>
    <v-carousel
        :cycle="cycle"
        height="1000"
        hide-delimiter-background
        show-arrows-on-hover
        :show-arrows="showArrows"
        interval="30000"
    >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            class="mt-8"
        >
            <Profile
                v-if="showProfile && i === 0"
                :refresh="refText"
                :editingText="delInfo ? '' : infoForRedact ? infoForRedact : info"
            />
            <!--<Portfolio
                v-if="showPortfolio && i === 1"
                :getUrl="refUrl"
            />-->
            <Portfolio
                v-if="showPortfolio && i === 1"
                :hidForm="imgReady"
            />
            <v-sheet
                :color="colors[i]"
                height="100%"
                class="spacing-playground pb-16"
            >
                <v-row
                    class="fill-height overflow-y-auto overflow-x-hidden"
                    align="center"
                    justify="center"
                    
                >
                    <v-card
                        light
                        align="center"
                        justify="center"
                        justify-content="space-around"
                    >   
                        <v-card-text
                            class="black--text"
                            v-if="info && i === 0 && !showProfile"
                            @mouseover="stopCycle"
                            @mouseout="activeCycle"
                            
                        >
                            {{ info }}
                        </v-card-text>
                        <v-card-actions
                            v-if="imgUrls.length && i === 1"
                            @mouseover="stopCycle"
                            @mouseout="activeCycle"
                        >
                            <Img
                                :imgData="delImgData"
                                :updateImgs="imgUrls"    
                            />
                        </v-card-actions>
                        <v-btn
                            class="black--text"
                            v-if="!info && !showProfile && i == 0 || !imgUrls.length && i == 1"
                            @click="changeSlide"
                            :data-visibleslide="slide"
                        >
                            {{ slide }}
                        </v-btn>
                        <v-btn
                            class="black--text mb-4"
                            v-if="info && i === 0 && !showProfile"
                            @click="addNewInfo"
                        >
                            <v-icon>mdi-lead-pencil</v-icon>
                        </v-btn>
                        <v-btn
                            class="black--text mb-4"
                            @click="addNewImgs"
                            v-if="imgUrls.length && i === 1"
                        >
                            <v-icon>mdi-paperclip</v-icon>
                        </v-btn>
                        <v-btn
                            class="red--text mb-4"
                            @click="deleteInfo"
                            v-if="info.length && i === 0"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                            class="red--text mb-4"
                            @click="deleteAllImg"
                            v-if="imgUrls.length && i === 1"
                        >
                            Delete All
                        </v-btn>
                    </v-card>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  import Profile from '../components/Profile'
  import Portfolio from '../components/Portfolio'
  import Img from '../components/Img'
  export default {
    //layout: 'profile-layout',
    components: {
        Profile,
        Portfolio,
        Img
    },
    data ({ $auth }) {
      return {
        colors: [
          'indigo',
          'green'
        ],
        slides: [
          'Write about yourself so that other users can see what a cool person you are!',
          'Add your photos to personalize your page'
        ],
        showProfile: false,
        showPortfolio: false,
        cycle: true,
        showArrows: true,
        //info: this.$store.state.data.userMetaData.info,
        infoForRedact: "",
        delInfo: "",
        //imgUrls: this.$store.state.data.userMetaData.cloudData,
        email: $auth.$storage.getUniversal('user').email
      }
    },
    computed: {
        info() {
            return this.$store.state.data.userMetaData.info
        },
        imgUrls() {
            return this.$store.state.data.userMetaData.cloudData
        }
    },
    methods: {
        changeSlide(e) {
            const visibleSlide = e.currentTarget.dataset.visibleslide
            this.cycle = false
            //this.showArrows = false
            if(visibleSlide === this.slides[0]) {
                this.showProfile = true
            } else if(visibleSlide === this.slides[1]) {
                this.showPortfolio = true
            }
        },
        addNewInfo() {
            this.showProfile = true
            this.cycle = false
            this.delInfo = false
        },
        addNewImgs() {
            this.showPortfolio = true
            this.cycle = false
        },
        async deleteInfo() {
            const data = await this.$axios.$post(`/server/user-info`, {
                text: "",
                urls: this.imgUrls,
                email: this.email
            })
            //this.info = ""
            this.delInfo = true
            this.$store.dispatch('setData', data)
            //document.location.reload()
        },
        async delImgData(id) {
            const arrOfEditableData = []
            this.imgUrls.forEach(function(e) {
                if(e.public_id !== id) {
                    arrOfEditableData.push(e)
                }
            })
            const data = await this.$axios.$post(`/server/user-info`, {
                text: this.info,
                cloudData: arrOfEditableData,
                email: this.email,
            })
            //this.imgUrls = data.cloudData
            this.$store.dispatch('setData', data)
            //document.location.reload()
        },
        async deleteAllImg() {
            const arrOfPublicId = []
            this.imgUrls.forEach(function(e) {
                arrOfPublicId.push(e.public_id)
            })
            this.$axios.$post(`/server/delete-img`, {
              public_id: arrOfPublicId
            })
            const data = await this.$axios.$post(`/server/user-info`, {
                text: this.info,
                cloudData: [],
                email: this.email,
            })
            //this.imgUrls = data.cloudData
            this.$store.dispatch('setData', data)
            //document.location.reload()
        },
        async refText(text) {
            //document.location.reload()
            const data = await this.$axios.$post(`/server/user-info`, {
                text: text,
                urls: this.imgUrls,
                email: this.email
            })
            //this.info = data.info
            this.infoForRedact = data.info
            this.showProfile = false
            this.$store.dispatch('setData', data)
        },
        /*async refUrl(urls) {
            //document.location.reload()
            const joinImgs = this.imgUrls.concat(urls.objOfCloudData)
            const numberOfLikes = this.imgUrls.numberOfLikes
            const userWhichLiked = this.imgUrls.userWhichLiked
            joinImgs.forEach(function(e) {
                e.numberOfLikes = numberOfLikes || 0
                e.userWhichLiked = userWhichLiked || [{userName: "X", imgId: "1"}]
            })
            const data = await this.$axios.$post(`/server/user-info`, {
                text: this.info,
                cloudData: joinImgs,
                email: this.email
            })
            this.imgUrls = data.cloudData
            this.showPortfolio = false
            
        },*/
        imgReady(ready) {
            this.showPortfolio = ready.imagesDownloaded
            //this.imgUrls = ready.data.cloudData
        },
        stopCycle() {
            this.cycle = false
        },
        activeCycle() {
            this.cycle = true
        }
    }
  }
</script>
