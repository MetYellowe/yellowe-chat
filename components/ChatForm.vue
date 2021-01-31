<template>
    <v-col cols="12">
        <v-text-field
            label="Type your message"
            outlined
            v-model="text"
            @keydown.enter="send"
        ></v-text-field>
    </v-col>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data: () => ({
        text: ""
    }),
    props: ["scrollWindow"],
    computed: mapState(["interlocutors"]),
    methods: {
        send() {
            this.scrollWindow()
            if(this.interlocutors[0].name === 'Common Room') {
                this.$socket.emit('createMessage', {
                    text: this.text,
                    id: this.$store.state.user.id,
                    interlocutor: false
                },
                data => {
                    if(typeof data === 'string') {
                        console.error(data);
                    } else {
                        this.text = "";
                    }
                })
            } else {
                this.$socket.emit('createMessage', {
                    text: this.text,
                    id: this.$store.state.user.id,
                    interlocutor: this.interlocutors[0]
                },
                data => {
                    if(typeof data === 'string') {
                        console.error(data);
                    } else {
                        this.text = "";
                    }
                })
            }
        }
    }
}
</script>