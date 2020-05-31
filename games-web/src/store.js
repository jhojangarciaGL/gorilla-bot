import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { parseFulfillmentMessages } from './utils'

Vue.use(Vuex)
Vue.http = Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000/v1/api'
})
  
const store = new Vuex.Store({
    state: {
        messages: [],
        lang: 'es'
    },
    getters: {
        messages (state) {
            return state.messages
        },
        lang (state) {
            return state.lang
        }
    },
    mutations: {
        setMessage (state, message) {
            state.messages.push(message)
        },
        setLang (state, lang) {
            state.lang = lang
        }
    },

    actions: {
        async sendMessage (context, payload) {
            context.commit('setMessage', payload.message)
            try {
                const result = await Vue.http.post('/sendMessage', {
                    msg: payload.message.msg,
                    lang: context.getters.lang,
                    sessionId: 'SomeFunSessionId'
                })

                const messages  = parseFulfillmentMessages(result.data.fulfillmentMessages)

                messages.forEach(message => {
                    const msg = {
                        msg: message,
                        from: 'bot'
                    }
                    context.commit('setMessage', msg)
                })
                
            } catch (e) {
                console.log(e)
                if (e) throw new Error(e)
            }
        },

        setLang (context, payload) {
            context.commit('setLang', payload)
            let msg
            if(payload === 'es') {
                msg = {
                    msg: 'Lenguaje cambiado a español correctamente.',
                    from: 'bot'
                }
            } else {
                msg = {
                    msg: 'Switching language to english successfully',
                    from: 'bot'
                }
            }

            context.commit('setMessage', msg)
        }
    }
})

export default store