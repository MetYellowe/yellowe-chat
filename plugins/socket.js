import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
//import store from '../store'

export default function({ store }) {
    Vue.use(new VueSocketIO({
        debug: false,
        connection: process.env.BASE_URL,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        }
    }))
}
