<template>
    <b-form-select class="device-input"  v-model="selected" >
        <b-form-select-option v-for="device in this.devices" :key="device.deviceId" :value="device.deviceId">{{device.label}}</b-form-select-option>
    </b-form-select>
</template>

<script>
export default {
    data(){
        return{
            selected: null,
        }
    },
    props:{
        devices: {
            type: Array
        },

        titulo: {
            type: String
        }
    },
    name: 'DeviceSelect'
}
</script>

<style lang="scss" scoped>
    .device-input{
        width: 30%;
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