<template>
    <v-card
        max-width="400"
        class="mx-auto"
    >
        <v-container>
          <!--<v-row dense>
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
                  <v-card-title>{{ info ? "Or let's go to Profile" : 'Or first'   }}</v-card-title>
                  <v-btn>
                      <nuxt-link
                          to="/profile"
                          style="
                              text-decoration:none;
                              color:white
                          "
                      >
                        {{ info || img != false ? 'Your Profile' : 'Create your profile' }}
                      </nuxt-link>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>-->
          {{$auth.$storage.getUniversal('metaData')}}
        </v-container>
    </v-card>
</template>

<script>
export default {
    middleware: ['auth'],
    data({ $auth }) {
      return {
          //token: ""
          /*info: $auth.$storage.getUniversal('metaData').userMetaData.info,
          img: $auth.$storage.getUniversal('metaData').userMetaData.cloudData,
          snackbar: false,
          message: "",
          email: $auth.$storage.getUniversal('user').email*/
      }
    },
    computed: {
      /*username: function({ $auth }) {
          return $auth.$storage.getUniversal('metaData').appMetaData.username.toUpperCase()
      }*/
    },
      /*data: async function() {
        const data = await this.$http.$get(`https://dev-p69g86kq.us.auth0.com/api/v2/users?q=email:"${this.email}"&search_engine=v3`, {
            headers: {
              "authorization": `${this.token.token_type} ${this.token.access_token}`
            }
        })
        return data
      },
      metaData: () => ({
          userMetaData: this.data[0].user_metadata,
          appMetaData: this.data[0].app_metadata,
          email: this.email
      })
    },*/
    mounted() {
        const {message} = this.$route.query
        if(message && message === "leftChat") {
            this.message = "You left the Yellowe Chat."
        }
        this.snackbar = !!this.message

        /*const clientId = process.env.clientId
        const clientSecret = process.env.clientSecret
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
            'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
            'RewriteEngine': 'On',
            'RewriteCond': '%{REQUEST_METHOD} OPTIONS',
            'RewriteRule': '^(.*)$ $1 [R=200,L]'
        }
        const { data: { access_token, token_type } } = await this.$axios.$post(`/oauth/token`, {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            audience: 'https://dev-p69g86kq.us.auth0.com/api/v2/'
        }, headers)
        this.token = access_token*/
        
    }
}

</script>
