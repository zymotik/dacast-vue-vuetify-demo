<template>
  <v-container class="fill-height">
    <da-cast-video-stream
      v-if="isDaCast"
      :key="videoUrl"
      :video-url="videoUrl"
      :loop="loop"
      :sound="sound"
      :clear-cookies="clearCookies"
      @state="changeState"
    ></da-cast-video-stream>
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">dacast demo</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          <v-text-field
            label="Video url"
            hide-details="auto"
            v-model="textInput"
          ></v-text-field
        ></v-col>
        <v-col cols="auto"
          ><v-btn @click="setVideoUrl()">Start video</v-btn></v-col
        >
        <v-col cols="auto"
          ><v-btn @click="clearVideoUrl()">Remove video</v-btn></v-col
        >
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-switch
            v-model="clearCookies"
            label="Clear cookies"
            color="indigo"
            hide-details
          ></v-switch
        ></v-col>
        <v-col cols="auto">
          <v-switch
            v-model="loop"
            label="Loop"
            color="indigo"
            hide-details
          ></v-switch
        ></v-col>
        <v-col cols="auto">
          <v-switch
            v-model="sound"
            label="Sound"
            color="indigo"
            hide-details
          ></v-switch
        ></v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-alert type="info"> Current state: {{ state }} </v-alert>
        </v-col>
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
const clearCookies = ref(true);
const textInput = ref(
  "https://iframe.dacast.com/vod/f7ec4c33-f8a8-3c3a-438f-4941ce565d4f/5a66aea5-164f-c01e-59eb-bc73eab5e519"
);
const videoUrl = ref("");
const state = ref("removed");

function changeState(currentState: string) {
  state.value = currentState;
}

function setVideoUrl() {
  if (textInput.value.indexOf("dacast") > 0) {
    videoUrl.value = textInput.value;
    isDaCast.value = true;
  } else {
    clearVideoUrl();
  }
}

function clearVideoUrl() {
  videoUrl.value = "";
  isDaCast.value = false;
  state.value = "removed";
}
</script>
