<template>
  <b-button @click="switchCamera" :variant="camStatus ? 'light' : 'danger'" id="camBtn">
    <b-icon :icon="camStatus ? 'camera-video-fill' : 'camera-video-off-fill'" font-scale="1.25" :variant="camStatus ? 'black' : 'light'"></b-icon>
  </b-button>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    callback: {
      type: Function,
    },

    cameraopen: {
      type: Boolean,
    },
  },
  methods: {
    ...mapMutations(["setCamStatus"]),
    switchCamera: function () {
      if (this.callback) {
        this.callback();
      }
    },
  },
  computed: {
    ...mapState({
      camStatus: (state) => state.cam.cam_status,
    }),
  },
  name: "CameraButton",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#camBtn {
  width: 50px;
  height: 50px;
  padding: 13px;
  border-radius: 100%;
  z-index: 2;
}
</style>
