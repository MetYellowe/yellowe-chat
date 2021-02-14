import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
//import store from '../store'

export default function({ store }) {
    Vue.use(new VueSocketIO({
        debug: false,
        connection: `https://yellowe-chat.herokuapp.com:3000/`,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        }
    }))
}
