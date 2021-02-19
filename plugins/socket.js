import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
//import store from '../store'
//const HOST = location.origin.replace(/^https/, 'wss')
export default function({ store }) {
    Vue.use(new VueSocketIO({
        debug: false,
        connection: '/',
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        options: { path: '/chat' }
    }))
}
