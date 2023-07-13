<template>
  <div id="call">
    <div class="toRecord"></div>
    <div id="callCameras" class="cameras layout-1">
      <div class="camera lanchedCamera" id="mainWebcam">

      </div>
    </div>
    <div class="actions">
        <div class="btns">
            
        </div>

        <div class="btns">
            <camera-button/>
            <mic-button/>
        </div>

        <div class="leave-btn">
            <b-button variant="danger" id="exitBtn">
                <b-icon  icon="box-arrow-right" font-scale="1.25" variant="light"></b-icon>
            </b-button>
        </div>
    </div>
  </div>
</template>

<script>
import MicButton from '@/components/MicButton.vue';
import CameraButton from '@/components/CameraButton.vue';
export default {
  components: { MicButton, CameraButton },
  name: "CallView"
    
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
}
</style>
