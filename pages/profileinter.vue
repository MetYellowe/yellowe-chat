<template>
    <v-carousel
        :cycle="cycle"
        hide-delimiter-background
        show-arrows-on-hover
        :show-arrows="showArrows"
    >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            class="mt-8"
        >
            <v-sheet
                :color="colors[i]"
                height="100%"
                class="spacing-playground pb-16"
            >
                <v-row
                    class="fill-height overflow-y-auto overflow-x-hidden"
                    align="center"
                    justify="center"
                    style="height:400px"
                >
                    <v-card
                        light
                        align="center"
                        justify="center"
                        justify-content="space-around"
                    >   
                        <v-card-text
                            class="black--text"
                            v-if="info && i === 0"
                            @mouseover="stopCycle"
                            @mouseout="activeCycle"
                        >
                            {{ info }}
                        </v-card-text>
                        <v-card-actions
                            v-if="cloudData.length && i === 1"
                            @mouseover="stopCycle"
                            @mouseout="activeCycle"
                        >
                            <ImgInter :idata="idata"/>
                        </v-card-actions>
                        <v-card-text
                            class="black--text"
                            v-if="!info && i == 0 || !cloudData.length && i == 1"
                        >
                            {{ slide }}
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  import ImgInter from '../components/ImgInter'
  export default {
    layout: 'profile-layout',
    middleware: ["chat"],
    components: {
        ImgInter
    },
    data () {
      return {
        colors: [
          'indigo',
          'green'
        ],
        slides: [
          'User nothing write',
          "User don't attach image"
        ],
        cycle: true,
        showArrows: true
      }
    },
    computed: {
        idata() {
            return this.$store.state.interdata
        },
        info() {
            return this.$store.state.interdata.userMetaData.info
        },
        cloudData() {
            return this.$store.state.interdata.userMetaData.cloudData
        }
    },
    methods: {
        stopCycle() {
            this.cycle = false
            this.showArrows = false
        },
        activeCycle() {
            this.cycle = true
            this.showArrows = true
        }
    }
  }
</script>
