<template>
    <v-card class="overflow-hidden">
        <v-app-bar
            absolute
            color="#43a047"
            dark
            shrink-on-scroll
            prominent
            src="https://res.cloudinary.com/dckio9wiu/image/upload/v1614879227/users-chat-app/sunset-815270_1920_o1qtxe.jpg"
            fade-img-on-scroll
            scroll-threshold="500"
            style="padding-top:10px"
        >
            <template v-slot:img="{ props }">
                <v-img
                  v-bind="props"
                  gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>    

            <v-app-bar-nav-icon @click="drawer = !drawer"/>  

            <v-toolbar-title class="mb-5">Welcome in Yellowe Chat</v-toolbar-title>    

            <v-spacer></v-spacer>
            <v-btn v-show="!$auth.loggedIn" @click="login">Log in</v-btn>
            
            <v-btn v-show="$auth.loggedIn" @click="logout">Log out</v-btn>    

            <v-btn v-show="$auth.loggedIn">
                <nuxt-link
                    to="/roomChoose"
                    style="color:white"
                    class="text-decore"
                >
                    In Chat
                </nuxt-link>
            </v-btn>    

            <!--<v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>-->
        </v-app-bar>
        <v-navigation-drawer
            app
            v-model="drawer"
            mobile-breakpoint="550"
            
        >
            <v-list
                dense
                nav
            >
                <v-list-item>
                    <v-tooltip
                        bottom
                        color="white"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                class="ml-11"
                                color="yellow"
                            >
                                <v-list-item-content class="d-flex flex-row">
                                    <a
                                        style="color:black"
                                        href="https://advanturedice.herokuapp.com"
                                        class="text-decore"
                                    >Dice Game</a>
                                </v-list-item-content>
                            </v-btn>
                        </template>
                        <span style="color:black">Nice Game</span>
                    </v-tooltip>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container style="height: 110px;"></v-container>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        drawer: false,
        clipped: false
    }),
    methods: {
        login() {
            this.$auth.loginWith('auth0')
        },
        logout() {
              this.$auth.logout()
        }
    }
}
</script>

<style scoped>
    .text-decore {
        text-decoration:none
    }
</style>
