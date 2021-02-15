import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
//import store from '../store'
//const HOST = location.origin.replace(/^http/, 'ws')
export default function({ store }) {
    Vue.use(new VueSocketIO({
        debug: false,
        connection: '',
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        //options: { path: '/socket.io/?EIO=3&transport=polling&t=NUc5lyA/?EIO=3&transport=polling&t=NUcAxkZ' }
    }))
}
