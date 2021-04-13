export const state = () => ({
    user: {},
    interlocutors: [
        {
            name: 'Common Room',
            show: true,
            messages: []
        }
    ],
    users: [],
    data: {},
    joinImgs: [],
    interdata: {},
    messages: []
})

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setInterlocutor(state, interlocutor) {
        let requiredInterlocutor = state.interlocutors.find(elem => elem.name === interlocutor.name)
        
        if(requiredInterlocutor) {
            state.interlocutors = state.interlocutors.filter(elem => elem.name != interlocutor.name)
            state.interlocutors.unshift(requiredInterlocutor)
            state.interlocutors[0].show = true
        } else {
            state.interlocutors.unshift(interlocutor)
        }
        if(state.interlocutors[1]) {
            state.interlocutors[1].show = false
        }
        state.users.forEach(user => {
            user.attention = ""
        })
        state.messages.forEach(mes => {
            if(mes.room === interlocutor.name) {
                state.interlocutors[0].messages.push(mes)
                state.messages = []
            }
        })
    },
    hideWindow(state) {
        state.interlocutors[0].show = false
        const lastHiddenInterlocutor = state.interlocutors.splice(0,1)
        state.interlocutors.push(lastHiddenInterlocutor[0])
        state.interlocutors[0].show = true
    },
    clearData(state) {
        state.user = {}
        state.messages = []
        state.users = []
        state.interlocutors = [
            {
                name: 'Common Room',
                show: true,
                messages: []
            }
        ]
    },
    SOCKET_newMessage(state, message) {
        if(message && state.user.name !== message.name && message.room !== 'Common Room') {
            state.users.forEach(user => {
                if(message.name === user.name) {
                    if(state.interlocutors[0].name != message.room) {
                        user.attention = "#ff0000"
                    }
                }
            })
        }
        if(message.name === 'Admin' && state.interlocutors[0].name === 'Common Room' || state.interlocutors[0].name === message.room) {
            state.interlocutors[0].messages.push(message)
        } else if(message.name != 'Admin' && state.interlocutors[0].name === message.room) {
            state.interlocutors[0].messages.push(message)
        } else {
            state.messages.push(message)
        }
    },
    SOCKET_updateUsers(state, users) {
        state.users = users
    },
    setInterData(state, data) {
        state.interdata = data
    },
    setNumberOfLikes(state, data) {
        state.interdata.userMetaData.cloudData.forEach(function(e) {
            if(e.public_id === data.imgWhichLikedId) {
                e.userWhichLiked.push({ userName: data.userWhichLikedName, imgId: data.imgWhichLikedId })
            }
        })
    },
    setDataToState(state, data) {
        if(!data.length) {
            if(data.cloudData) {
                state.data.userMetaData = data
            } else {
                state.data = data
            }
        } else {
            const imgUrls = state.data.userMetaData.cloudData
            const joinImgs = data.concat(imgUrls)
            joinImgs.forEach(function(e) {
                if(!e.userWhichLiked) {
                    Object.assign(e, {userWhichLiked: [], numberOfLikes: 0})
                }
            })
            state.joinImgs = joinImgs
        }
    },
    SOCKET_increaseCountOfLikes(state, data) {
        state.interdata.userMetaData.cloudData.forEach(function(e) {
            if(e.public_id === data.id && !e.userWhichLiked.includes(data.name)) {
                e.numberOfLikes += 1
            }
        })
    }
}
export const actions = {
    setData({ commit }, data) {
        commit('setDataToState', data)
    }
}
