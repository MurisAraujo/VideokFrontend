<template>
  <b-button @click="switchCamera" :variant="ligado" id="camBtn">
    <b-icon  :icon="icon" font-scale="1.25" :variant="icon_color"></b-icon>
  </b-button>
</template>

<script>
export default {
  data(){
    return{
      ligado: "light",
      icon: 'camera-video-fill',
      icon_color: 'black'
    }
  },
  props:{
    callback:{
      type: Function
    },

    cameraopen: {
      type: Boolean
    }
  },
  methods: {
    switchCamera: function(){
      if(this.cameraopen == true){
        this.ligado = 'danger'
        this.icon = 'camera-video-off-fill'
        this.icon_color = 'light'
        if(this.callback){
          this.callback()
        }

        console.log(this.cameraopen)
      }else{
        this.ligado = 'light'
        this.icon = 'camera-video-fill'
        this.icon_color = 'black'
        if(this.callback){
          this.callback()
        }

        console.log(this.cameraopen)
      }

      
    },
  },
  name: 'CameraButton',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #camBtn{
    padding: 13px;
    border-radius: 100%;
    z-index: 2;
  }
</style>
