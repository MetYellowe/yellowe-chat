<template>
    <div class="c-wrap">
        <div
            class="c-chat"
            ref="block"
            v-for="i in interlocutors"
            :key="i.name"
            v-show="i.show"
            @mouseover="getTarget"
        >
            Chat with {{i.name}}
            <v-tooltip
                bottom
                color="white"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="mx-2"
                        small
                        @click="minimized"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                </template>
                <span class="black--text">Roll up and show previous dialog</span>
            </v-tooltip>
            <Message
                v-for="(m, key) in i.messages"
                :key="key"
                :name="m.name"
                :text="m.text"
                :owner="m.id === user.id"
            />
        </div>
        <div class="c-form">
            <ChatForm :scrollWindow="scrollUp"/>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'
export default {
    layout: 'chat',
    middleware: ["chat"],
    components: {
        Message,
        ChatForm
    },
    data() {
        return {
            targetForScroll: ""
        }
    },
    head() {
        return {
            title: `Room ${this.user.room}`
        }
    },
    computed: mapState(["user", "interlocutors"]),
    /*watch: {
        messages() {
            setTimeout(() => {
                this.$refs.block.scrollTop = this.$refs.block.scrollHeight
            });
        }
    },*/
    methods: {
        ...mapMutations(["hideWindow"]),
        minimized() {
            this.hideWindow();
        },
        getTarget(e) {
            this.targetForScroll = e.currentTarget
        },
        scrollUp() {
            const wind = this.targetForScroll
            setTimeout(() => {
                wind.scrollTop = wind.scrollHeight
            }, 200)
        }
    }
}
</script>

<style scoped>
    .c-wrap {
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .c-chat {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 80px;
        padding: 1rem;
        overflow-y: auto;
        color: black;
    }
    .c-form {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1rem;
        height: 80px;
        background: #212121;
    }
</style>