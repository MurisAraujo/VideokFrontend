<template>
  <div>
    <HeaderComponent />
    <div class="home" id="home">
      <div class="videoContainer">
        <div class="videoAndDevices">
          <div class="containerCamera">
            <div class="camera" id="camera">
              <div v-show="isCameraOpen && isLoading" class="camera-loading">
                <p>Carregando Câmera</p>
              </div>
              <video v-if="isCameraOpen" ref="camera" autoplay></video>
              <div v-if="!isCameraOpen" class="cameraOff">
                <b-icon icon="camera-video-off-fill" font-scale="4"></b-icon>
                <span>Câmera desligada</span>
              </div>
              <camera-button
                :cameraopen="isCameraOpen"
                :callback="toggleCamera"
              />
              <mic-button />
            </div>
          </div>
          
          <div class="devices">
            <device-select :devices="this.camera" titulo="Câmeras" />
            <device-select :devices="this.audios" titulo="Microfones"/>
          </div>
        </div>
        <div class="actions">
          <div v-if="mku === false" class="errorMessage">
            MKU não está existe
          </div>
          <div v-if="mku === true" class="connectMessage">
            <h3>Olá <b>Murilo Amurim</b>,</h3>
            <h4>Pronto para participar?</h4>
            <div class="buttons">
              <b-button pill variant="primary"> Participar agora </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CameraButton from "@/components/CameraButton.vue";
import HeaderComponent from "../components/Header.vue";
import MicButton from "@/components/MicButton.vue";
import DeviceSelect from "@/components/DeviceSelect.vue";

export default {
  name: "InicioView",
  components: {
    HeaderComponent,
    CameraButton,
    MicButton,
    DeviceSelect,
  },
  data() {
    return {
      mku: true,
      isCameraOpen: false,
      isLoading: false,
      camera: [],
      audios: []
    };
  },
  methods: {
    toggleCamera() {
      console.log("teste");
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      console.log(navigator.mediaDevices
        .getUserMedia(constraints))

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
          console.log(stream, constraints, navigator.mediaDevices);
        })
        .catch((error) => {
          this.isLoading = false;
          alert(
            "May the browser didn't support or there is some errors.",
            error
          );
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    listDevices(){
        navigator.mediaDevices.enumerateDevices 
        && navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
            if (device.kind === 'audioinput') {
                this.audios.push(device);
            }

            if (device.kind === 'videoinput') {
                this.camera.push(device);
            }
            });
        })
        .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
        }).finally(() => {
            console.log(this.audios);
            console.log(this.camera);
        })
    }
  },
  mounted() {
    this.listDevices()
  }
};
</script>

<style scoped lang="scss">
#home {
  margin: 0px auto;
  max-width: 80vw;
  height: 87vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  padding: 20px 0px 40px;

  @media screen and (max-width: 1100px) {
    height: fit-content;
  }

  .videoContainer {
    justify-content: space-between;
    align-items: center;
    display: flex;
    width: 100%;

    @media screen and (max-width: 1100px) {
      flex-direction: column;
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 333px;
    color: blue;
    margin-bottom: 90px;
    margin-left: 40px;
    max-width: 400px;

    @media screen and (max-width: 1100px) {
      margin-bottom: 0px;
      margin-top: 20px;
    }

    @media screen and (max-width: 750px) {
      margin-left: 0px;
    }

    h3,
    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: "Google Sans", Roboto, Arial, sans-serif;
      font-size: 1.75rem;
      font-weight: 400;
      letter-spacing: 0;
      line-height: 2.25rem;
      cursor: default;
      overflow: hidden;
      padding: 0 1.5rem;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;

      @media screen and (max-width: 750px) {
        font-size: 1.55rem;
      }
    }

    h4 {
      font-size: 1.5rem;
      padding-bottom: 20px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        width: 100px;
        height: 10px;
        background-color: yellow;
        bottom: 7px;
        left: 0px;
        z-index: 10;
      }
    }

    .errorMessage {
      font-size: 20px;
      font-weight: 600;
      position: relative;
      z-index: 20;
      max-width: 400px;
      text-align: right;

      &::before {
        position: absolute;
        content: "";
        width: 200px;
        height: 25px;
        background-color: yellow;
        bottom: -30px;
        right: -50px;
        z-index: 0;
      }
    }

    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 100%;

      button {
        width: 100%;
      }
    }

    .waiting {
      margin: 20px 0px;
    }

    .link {
      color: #fff;
      text-decoration: none;
    }
  }

  .camera-button {
    margin-bottom: 2rem;
  }
  .videoAndDevices {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > div {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;

      &:nth-child(2) {
        margin-top: 10px;
      }

      .MuiFormControl-root {
        flex: 1;
        max-width: 300px;

        @media screen and (max-width: 750px) {
          display: none;
        }
      }

      @media screen and (max-width: 490px) {
        flex-direction: column;
        justify-content: center;
      }
    }

    .devices {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}

.containerCamera {
  position: relative;

  #camera {
    width: 50vw;
    height: 60vh;
    min-width: 448px;
    min-height: 252px;

    min-width: 448px;
    min-height: 252px;

    background-color: blue;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    padding: 15px;
    align-items: flex-end;
    gap: 15px;
    position: relative;
    margin-bottom: 10px;
    z-index: 10;
    transition: all 0.3s;

    @media screen and (max-width: 1100px) {
      width: 70vw;
    }

    @media screen and (max-width: 750px) {
      min-width: 100vw;
      border-radius: 0px;
      height: 56vh;
    }

    .showOnlyMobile {
      display: none;

      @media screen and (max-width: 750px) {
        display: block;
      }
    }

    .webcam {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0px;
      border-radius: 8px;
      transform: scaleX(-1);
    }

    .cameraOff {
      color: #fff;
      align-self: center;
      position: absolute;
      display: flex;
      align-items: center;
      flex-direction: column;

      .icon {
        font-size: 40px;
      }

      span {
        font-size: 1.5rem;
        line-height: 2rem;
        text-overflow: ellipsis;
      }
    }

    .loadingCamera {
      position: absolute;
      min-width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transform: translate(0px, -50%);
      top: 50%;

      p {
        margin: 20px;
        font-size: 18px;
        color: #fff;
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: yellow;
    left: -10px;
    top: -10px;
    border-radius: 8px;
    z-index: 5;
  }

  &::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: rosybrown;
    right: 50px;
    bottom: 4px;
    border-radius: 8px;
    z-index: 5;
  }
}
  .camera-loading {
    overflow: hidden;
    position: absolute;
    width: 100%;
    margin: 3rem 0 0 -1.2rem;
    top: 25%;
    left: 40%;
    p{
        color: #fff;
        font-size: 24px;
    }
  }

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0px;
    border-radius: 8px;
    transform: scaleX(-1);
  }

  @keyframes preload {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
</style>
