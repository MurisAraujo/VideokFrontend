<template>
  <b-button @click="switchMic" :variant="ligado" id="micBtn">
    <b-icon :icon="icon" font-scale="1.25" :variant="icon_color"></b-icon>
  </b-button>
</template>

<script>
export default {
  data(){
    return{
      ligado: "light",
      icon: 'mic-fill',
      icon_color: 'black'
    }
  },
  methods: {
    switchMic: function(){
      if(this.ligado == 'light'){
        this.ligado = 'danger'
        this.icon = 'mic-mute-fill'
        this.icon_color = 'light'
      }else{
        this.ligado = 'light'
        this.icon = 'mic-fill'
        this.icon_color = 'black'
      }
    }
  },
  name: 'MicButton'
}
</script>

<style>
  #micBtn{
    width: 50px;
    height: 50px;
    padding: 13px;
    border-radius: 100%;
    z-index: 2;
  }
</style>