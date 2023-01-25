<template>
  <div class="stream-container">
    <iframe
      ref="vimeoStream"
      :srcdoc="srcdoc"
      class="frame-style"
      title="Video Player"
      allow="autoplay;encrypted-media"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { AREA_ASPECT_RATIO_2D } from "@/constants";
import { getIframeTemplate, getVideoIdFromUrl } from "@/dacast-utils";
import { defineProps, PropType } from "@vue/runtime-core";

export default {
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
    loop: {
      type: Boolean,
    },
    sound: {
      type: Boolean,
    },
  },
  data() {
    return {
      template: "",
    };
  },
  computed: {
    aspectRatio(): number {
      return AREA_ASPECT_RATIO_2D;
    },
    srcdoc(): string {
      return this.template
        .replaceAll("{CONTENT_ID}", getVideoIdFromUrl(this.videoUrl))
        .replace("{IS_MUTED}", this.sound ? "false" : "true")
        .replace("{IS_LOOP}", this.loop ? "true" : "false");
    },
    iframeRef(): HTMLIFrameElement | undefined {
      return this.$refs.vimeoStream as HTMLIFrameElement;
    },
  },
  async mounted(): Promise<void> {
    this.template = await getIframeTemplate();
    window.addEventListener("message", (event) => {
      if (this.iframeRef?.contentWindow !== event.source) {
        return;
      }
      if (event.data === "dacast-ready") {
        this.$emit("state", "ready");
      }
      if (event.data === "dacast-complete") {
        this.$emit("state", "ended");
      }
    });
  },
};
</script>

<style scoped>
.frame-style {
  border: 0;
  max-height: 99.9%;
  max-width: 100%;
  height: 99.9%;
  width: 100%;
  z-index: 0;
}
.stream-container {
  position: absolute;
  display: block;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
