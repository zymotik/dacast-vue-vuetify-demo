<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <da-cast-video-stream
        v-if="isDaCast"
        :key="videoUrl"
        :video-url="videoUrl"
        :loop="loop"
        :sound="sound"
        @state="changeState"
      ></da-cast-video-stream>
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">dacast demo</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto"
          ><v-btn
            @click="
              setVideoUrl(
                'https://iframe.dacast.com/vod/f7ec4c33-f8a8-3c3a-438f-4941ce565d4f/5a66aea5-164f-c01e-59eb-bc73eab5e519'
              )
            "
            >Update url</v-btn
          ></v-col
        >
        <v-col cols="auto"
          ><v-btn @click="setVideoUrl()">Clear url</v-btn></v-col
        >
        <v-col cols="auto">Current state: {{ state }}</v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import DaCastVideoStream from "@/components/DaCastVideoStream.vue";
import { ref } from "@vue/reactivity";

const isDaCast = ref(false);
const loop = ref(true);
const sound = ref(true);
const videoUrl = ref("");
const state = ref("unknown");

function changeState(currentState: string) {
  state.value = currentState;
}

function setVideoUrl(url?: string) {
  if (url !== undefined && url.indexOf("dacast") > 0) {
    videoUrl.value = url;
    isDaCast.value = true;
  } else {
    isDaCast.value = false;
  }
}
</script>
