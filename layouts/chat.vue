<template>
    <v-app app style="background:rgba(255,255,0,0.7)">
        <v-navigation-drawer
            app
            v-model="drawer"
            mobile-breakpoint="550"
        >
            <v-list-item>
                <v-list-item-content>
                    <v-btn>
                        <v-list-item-title
                            class="title"
                            @click="checkInterlocutor"    
                        >Common Room</v-list-item-title>
                    </v-btn>
                    <v-list-item-subtitle>
                        Choice interlocutor
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list
                dense
                nav
                v-for="u in users"
                :key="u.id"
                @click.prevent
            >
                <v-list-item
                    @mouseover="getDataset"
                    :data-interdata="u.interdata"
                    :data-id="u.id"
                >
                    <v-list-item-icon>
                        <v-tooltip
                            bottom
                            color="green"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    icon
                                    class="mt-n1"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="openPortfolio"
                                >
                                    <v-icon :color="u.id === user.id ? 'primary' : 'grey'">mdi-account</v-icon>
                                </v-btn>
                            </template>
                            <span>Portfolio</span>
                        </v-tooltip>
                    </v-list-item-icon>
                    <v-tooltip
                        bottom
                        color="yellow"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                :color="u.attention"
                                v-bind="attrs"
                                v-on="on"    
                            >
                                <v-list-item-content class="d-flex flex-row">
                                    <v-list-item-title @click="checkInterlocutor">{{u.name}}</v-list-item-title>
                                </v-list-item-content>
                            </v-btn>
                        </template>
                        <span style="color:red">Write me</span>
                    </v-tooltip>
                </v-list-item>
                
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            app
            dense
            height="50px"
        >
            <v-app-bar-nav-icon
                class="mr-16"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-tooltip
                bottom
                color="red"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="mr-16"
                        @click="exit"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </template>
                <span>Exit</span>
            </v-tooltip>
            <v-toolbar-title>Chat room</v-toolbar-title> <span class="room-name-design">{{user.room}}</span>
        </v-app-bar>
        <v-main>
            <div style="height:100%">
                <nuxt/>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
export default {
    data: () => ({
        drawer: true,
        dataset: {},
        userPortfolioId: "",
        openportfolio: true
    }),
    computed: {
        ...mapState(["user", "users", "attention"])
    },
    methods: {
        ...mapMutations(["clearData", "setInterlocutor", "setInterData"]),
        exit() {
            this.$socket.emit("userLeft", this.user.id, () => {
                this.clearData();
                this.$router.push(`/roomChoose?message=left${this.user.room}`);
            });
        },
        checkInterlocutor(e) {
            const interlocutorName = e.target.innerHTML;
            if(interlocutorName != this.user.name) {
                this.setInterlocutor({
                    name: interlocutorName,
                    show: true,
                    messages: []
                });
            }
        },
        async openPortfolio() {
            const clientId = "y4W7sXKqe6pOd6wxgRlbm2syLcZ9Zes4"
            const clientSecret = "4Umk4WQj6eM16hMLhrhNB5fav9RplvKwUWePYFDMjWJgUpOaQRAWjAOyb2nTU-N8"
            const email = this.dataset.email
            try{
                const data = await this.$http.$post(`api/oauth/token`, {
                  grant_type: 'client_credentials',
                  client_id: clientId,
                  client_secret: clientSecret,
                  audience: 'https://dev-p69g86kq.us.auth0.com/api/v2/'
                })
                
                const metaData = await this.$http.$get(`https://dev-p69g86kq.us.auth0.com/api/v2/users?q=email:"${email}"&search_engine=v3`, {
                  headers: {
                    "authorization": `${data.token_type} ${data.access_token}`
                  }
                })
                const interData = {
                    userMetaData: metaData[0].user_metadata,
                    appMetaData: metaData[0].app_metadata,
                    email: email
                }
                if(this.userPortfolioId != this.user.id) {
                    this.setInterData(interData)
                    //this.$router.push('/profileinter')
                    window.open('http://localhost:3000/profileinter', '_blank')
                } else {
                    this.setInterData(interData)
                    //this.$router.push('/profile')
                    window.open('http://localhost:3000/profile', '_blank')
                }
            } catch(err) {
                console.log(err)
            }
        },
        getDataset(e) {
            this.dataset = JSON.parse(e.currentTarget.dataset.interdata)
            this.userPortfolioId = e.currentTarget.dataset.id
        }
    },
    /*async fetch() {
        const clientId = process.env.clientId
        const clientSecret = process.env.clientSecret
        const email = 'joblack@i.ua'
        try{
            const data = await this.$http.$post(`api/oauth/token`, {
              grant_type: 'client_credentials',
              client_id: clientId,
              client_secret: clientSecret,
              audience: 'https://dev-p69g86kq.us.auth0.com/api/v2/'
            })
            
            const metaData = await this.$http.$get(`https://dev-p69g86kq.us.auth0.com/api/v2/users?q=email:"${email}"&search_engine=v3`, {
              headers: {
                "authorization": `${data.token_type} ${data.access_token}`
              }
            })
            console.log(metaData)
        } catch(err) {
            console.log(err)
        }
        if(this.userPortfolioId != this.user.id) {
            
            //this.setInterData(data)
            //this.$router.push('/profileinter')
        } else {
            //this.setInterData(data)
            //this.$router.push('/profile')
        }
    }*/
    //fetchOnServer: false
}
</script>

<style scoped>
    .room-name-design {
        font: 30px sans-serif;
        color: red;
        font-weight: lighter;
        margin-left: 20px;
    }
</style>