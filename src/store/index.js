import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        mic: {
            mic_devices: [],
            mic_status: false,
            mic_actived: {}
        },
        cam: {
            cam_devices: [],
            cam_status: false,
            cam_actived: {}
        }
    },

    mutations:{
        setCam(state, payload){
            state.cam.cam_actived = payload
        },

        setCamDevices(state, payload){
            state.cam.cam_devices = []
            state.cam.cam_devices.push(payload)
        },

        setCamStatus(state){
            state.cam.cam_status = !state.cam.cam_status
        },

        setMic(state, payload){
            state.mic.mic_actived = payload
        },

        setMicDevices(state, payload){
            state.mic.mic_devices = []
            state.mic.mic_devices.push(payload)
        },

        setMicStatus(state){
            state.mic.mic_status = !state.mic.mic_status
        },

    },
    getters: {
        getCamActivated(state){
            return state.cam.cam_actived
        },

        getCamDevices(state){
            return state.cam.cam_devices
        },

        getCamStatus(state){
            return state.cam.cam_status
        },

        getMicActivated(state){
            return state.mic.mic_actived
        },

        getMicDevices(state){
            return state.mic.mic_devices
        },

        getMicStatus(state){
            return state.mic.mic_status
        }
    }
})

export default store;