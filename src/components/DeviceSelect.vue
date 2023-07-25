<template>
    <b-form-select class="device-input"  v-model="device" >
        <b-form-select-option disabled :value="null">{{ this.titulo }}</b-form-select-option>
        <b-form-select-option v-for="device in this.devices" :key="device.deviceId" :value="device">{{device.label}}</b-form-select-option>
    </b-form-select>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    props:{
        devices: {
            type: Array
        },
        
        titulo: {
            type: String
        },
        
        tipo: {
            type: String
        },

        callback: {
            type: Function
        },

        size: {
            type: Number
        }
    },

    methods: {
    ...mapMutations([
      'setCam',
      'setMic'
    ]),

  },
    
    computed:{
        device:{
            get(){
                if(this.tipo == 'cam'){
                    return this.camActivated
                }else{
                    return this.micActivated
                }
            },
            set(device){
                if(device.deviceId == undefined){
                    return alert('Dispositivo Invalido')
                }else{
                    if(this.tipo == 'cam'){
                        this.setCam(device);
                        if(this.callback) {
                            this.callback(device.deviceId)
                        }
                    }else{
                        this.setMic(device);
                    }
                }
            }
        },
        ...mapState({
            camActivated: state => state.cam.cam_actived,
            micActivated: state => state.mic.mic_actived,
        })
    },
    
    name: 'DeviceSelect'
}
</script>

<style lang="scss" scoped>
    .device-input{
        width: 100%;
        max-width: 288px;
        background-color: transparent;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px 5px;
        border-radius: 5px;
        font-size: 1rem;
        margin-top: 10px;

        @media screen and (max-width: 1100px) {
            width: 45%;
        }

        @media screen and (max-width: 490px) {
            width: 80%;
        }
    }
</style>