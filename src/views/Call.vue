<template>
  <div id="call">
    <div class="toRecord" v-if="call"></div>
    <div id="callCameras" class="cameras">
      <div class="camera lanchedCamera" id="cameraOperador">
      </div>
      
      <div id="cameraCliente">
        <div class="cameraContainer" v-if="this.camStatus">
          <video ref="camera" autoplay></video>
          <div class="cameraControls">

          </div>
        </div>
        <div class="videoBack" v-else>
          <b-icon icon="camera-video-off-fill" font-scale="4"></b-icon>
          <span>Câmera desligada</span>
        </div>
      </div>
      <transition name="slide-fade">
        <div v-if="configModal" class="configModal">
          <h5>Dispositivos</h5>
          <device-select :devices="this.camDevices" :callback="openCamera" tipo="cam" titulo="Câmeras" />
          <device-select :devices="this.micDevices" tipo="mic" titulo="Microfones"/>
        </div>
      </transition>
    </div>
    <div class="actions">
        <div class="btns">
            <p>Powered by Intergrall</p>
        </div>

        <div class="btns">
            <camera-button :callback="toggleCamera"/>
            <mic-button/>
        </div>

        <div class="leave-btn">
            <b-button @click="configModal = !configModal" class="callBtn">
              <b-icon icon="gear-fill"  font-scale="1"></b-icon>
            </b-button>

            <b-button class="callBtn">
              <b-icon icon="people-fill"  font-scale="1"></b-icon>
            </b-button>

            <b-button variant="danger" id="exitBtn">
                <b-icon  icon="box-arrow-right" font-scale="1" variant="light"></b-icon>
            </b-button>
        </div>
    </div>
  </div>
</template>

<script>
import MicButton from '@/components/MicButton.vue';
import CameraButton from '@/components/CameraButton.vue';
import DeviceSelect from "@/components/DeviceSelect.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "CallView",
  components: { MicButton, CameraButton, DeviceSelect },
  data(){
    return{
      call: false,
      configModal: false
    }
  },

  methods: {
    ...mapMutations([
      'setCam',
      'setCamDevices',
      'setCamStatus',
      'setMic',
      'setMicDevices',
      'setMicStatus'
    ]),

    toggleCamera() {
      console.log('entrei aqui')
      if (this.camStatus) {
        this.stopCameraStream();
        this.setCamStatus();
      } else {
        this.openCamera(this.camActivated);
        this.setCamStatus();
      }
    },

    openCamera(cameraId){
      this.isLoading = true;
      const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
          'deviceId': cameraId
        }
      }
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.isLoading = false;
        // console.log(stream)
        this.$refs.camera.srcObject = stream;

      }).catch((error) => {
        this.isLoading = false;
        console.log(error, "Não foi possivel iniciar a câmera.")
      })
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },
  },
  computed:{
    ...mapState({
      camStatus: state => state.cam.cam_status,
      camActivated: state => state.cam.cam_actived,
      camDevices: state => state.cam.cam_devices,
      micStatus: state => state.mic.mic_status,
      micActivated: state => state.mic.mic_actived,
      micDevices: state => state.mic.mic_devices
    })
  },
  mounted() {
    this.openCamera(this.camActivated);
  },
};
</script>

<style lang="scss" scoped>
#call {
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: #1d2735;
  position: relative;

  .actions {
    position: fixed;
    bottom: 0px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    // background-color: #001023;
    // background-color: #1d2735;
    background-color: transparent;
    z-index: 20;
    padding: 10px 50px;
    
    .btns {
      display: flex;
      gap: 20px;
    }

    .timer {
      color: #fff;
      display: flex;
      gap: 2px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 130%;
        height: 1px;
        background-color: #fff;
        bottom: -5px;
        left: 50%;
        transform: translate( -50%, 50%);
      }
    }

    // .actions-mobile {
    //   display: none;

    //   .css-1dhq0oq-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab {
    //     background-color: #f8f8f8 !important;
    //     color: #1d2735;
    //   }

    // }

    #exitBtn{
        padding: 13px;
        border-radius: 100%;
    }

    @media screen and (max-width: 450px) {
      .actions-mobile {
        display: flex;
      }
  
      .actions-desktop {
        display: none;
      }
    }
  }

  #callCameras{
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    padding: 0 2%;
    position: relative;
    #cameraOperador{
      background-color: #ccc;
      width: 100%;
      margin-top: 2%;
      border-radius: 2px;
    }

    #cameraCliente{
      position: absolute;
      bottom: 10px;
      right: 5%;
      video{
        object-fit: cover;
        border-radius: 10px;
        width: 295px;
        height: 165px;
      }
      .videoBack{
        border-radius: 10px;
        width: 295px;
        height: 165px;
        background-color: blue;
        color: #fff;
        align-self: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .icon {
          font-size: 40px;
        }

        span {
          font-size: 1.5rem;
          line-height: 2rem;
          text-overflow: ellipsis;
        }
      }
    }

    .configModal{
      margin-top: 2%;
      width: 35vh;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 10px;
      margin-left: 15px;
      padding: 20px;
    }
  }

  .toRecord {
    position: fixed;
    top: 40px;
    left: 30px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: rgba(255, 82, 82, 1);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
    animation: pulse-red 2s infinite;
    z-index: 5;
  }

  @keyframes pulse-red {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }

  .callBtn {
    width: 50px;
    height: 50px;
    padding: 13px;
    border-radius: 200%;
    z-index: 2;
    margin-right: 10px;
  }
}
</style>
