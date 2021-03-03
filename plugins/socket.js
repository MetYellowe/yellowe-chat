import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
//import store from '../store'
//const HOST = location.origin.replace(/^https/, 'wss')
const io = require("socket.io-client");
const socket = io("wss://yellowe-chat-project.ew.r.appspot.com", {
    transports: ['polling']
})
export default function({ store }) {
    Vue.use(new VueSocketIO({
        debug: false,
        connection: socket,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        //withCredentials: true
        //options: { path: '/' }
    }))
}
