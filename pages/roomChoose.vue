<template>
    <v-layout
        column
        justify-center
        align-center
    >
        <v-flex
            xs12
            sm8
        >
            <v-card min-width="400">
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
                <v-card-title><h1>Yellowe Chat</h1></v-card-title>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                         <v-select
                           :items="items"
                           label="Choose Room"
                           solo
                           v-model="selected"
                         ></v-select>
                        <v-text-field
                            label="Or create your own and invite friends"
                            v-model="room"
                            required
                        >
                        </v-text-field>
                        <v-btn
                            :disable="!valid"
                            color="primary"
                            @click="submit"
                        >
                            Sign in
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
export default {
    //layout: "TitleLayout",
    head: {
        title: 'Welcom to Yellowe Chat!'
    },
    data: () => ({
        valid: true,
        snackbar: false,
        message: "",
        name: "",
        /*nameRules: [
            v => !!v || "Name is required.",
            v => (v && v.length <= 16) || "Name must be less than 16 characters."
        ],*/
        room: "",
        /*roomRules: [
            v => !!v || "Select room."
        ],*/
        items: ['Science', 'Music', 'Sport', 'Relationships', 'Traveling'],
        selected: "Science"
    }),
    mounted() {
        const {message} = this.$route.query;
        if(message && message != 'leftChat') {
            this.message = `You left the ${message.slice(4)} room.`
        }
        this.snackbar = !!this.message;
    },
    methods: {
        ...mapMutations(["setUser"]),
        submit() {
            if(this.$refs.form.validate()) {
                const data = {
                    userMetaData: this.$store.state.data.userMetaData,
                    appMetaData: this.$store.state.data.appMetaData,
                    email: this.$auth.$storage.getUniversal('user').email
                }
                const interdata = JSON.stringify(data)
                const user = {
                    name: this.$store.state.data.appMetaData.username.toUpperCase(),
                    room: this.room || this.selected,
                    interdata: interdata
                };
                this.$socket.emit("userJoined", user, data => {
                    if(typeof data === 'string') {
                        console.error(data);
                    } else {
                        user.id = data.userId;
                        this.setUser(user);
                        this.$router.push("/chat");
                    }
                })
            }
        }
    },
    /*computed: {
        ...mapState(['auth'])
    }*/
}
</script>