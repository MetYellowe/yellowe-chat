<template>
    <v-card
        max-width="400"
        class="mx-auto"
    >
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-card
                color="#385F73"
                dark
              >
                <v-snackbar
                    v-model="snackbar"
                    :timeout="6000"
                    top
                >
                    {{message}}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                            dark
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                        >
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
                <v-card-title class="headline">
                  {{username}}
                </v-card-title>

                <v-card-subtitle v-show="!$auth.loggedIn">Hello, let's go to Log in!</v-card-subtitle>
                <v-card-subtitle v-show="$auth.loggedIn">
                    You are on the right track. Now, click button
                    <v-btn>
                          <nuxt-link
                              to="/roomChoose"
                              style="
                                  text-decoration:none;
                                  color:white
                              "
                          >
                              In Chat
                          </nuxt-link>
                    </v-btn>
                    and go to fun!
                </v-card-subtitle>
                
                <v-card-actions v-show="$auth.loggedIn">
                  <v-card-title>{{ info || img != false ? "Or let's go to Profile" : 'Or first'   }}</v-card-title>
                  <!--<v-btn
                        @click="openProfile"
                        style="text-decoration:none;color:white"
                    >
                        {{ info || img != false ? 'Your Profile' : 'Create your profile' }}
                  </v-btn>-->
                  <nuxt-link to="/profile">{{ info || img != false ? 'Your Profile' : 'Create your profile' }}</nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    middleware: ['auth'],
    data({ $auth }) {
      return {
          //token: ""
          //info: this.$store.state.data.userMetaData.info,
          //img: this.$store.state.data.userMetaData.cloudData,
          snackbar: false,
          message: "",
          email: $auth.$storage.getUniversal('user').email
      }
    },
    methods: {
        openProfile() {
            window.open('http://localhost:3000/profile', '_blank')
        }
    },
    computed: {
        username: function({ $auth }) {
            return this.$store.state.data.appMetaData.username.toUpperCase()
        },
        info() {
            return this.$store.state.data.userMetaData.info
        },
        img() {
            return this.$store.state.data.userMetaData.cloudData
        }
    },
    mounted() {
        const {message} = this.$route.query
        if(message && message === "leftChat") {
            this.message = "You left the Yellowe Chat."
        }
        this.snackbar = !!this.message
    }           
}

</script>