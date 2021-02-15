import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
//import store from '../store'
//const HOST = location.origin.replace(/^http/, 'ws')
export default function({ store, process }) {
    Vue.use(new VueSocketIO({
        debug: false,
        connection: 'https://yellowe-chat.herokuapp.com:3001',
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        //options: { path: '/server/index' }
    }))
}
