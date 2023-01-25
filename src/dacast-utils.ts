let template = "";

export async function getIframeTemplate(): Promise<string> {
  if (!template) {
    const response = await fetch("/templates/da-cast-video-template.html");
    if (response.status >= 200 && response.status < 300) {
      template = await response.text();
    }
  }

  return template;
}

// https://iframe.dacast.com/vod/f7ec4c33-f8a8-3c3a-438f-4941ce565d4f/5a66aea5-164f-c01e-59eb-bc73eab5e519

export function isDaCast(url?: string): boolean {
  return !!url?.startsWith("https://iframe.dacast.com/vod");
}

export function getVideoIdFromUrl(url: string): string {
  const parts = url.split("https://iframe.dacast.com/vod/");

  return encodeURIComponent(parts[1]?.replace("/", "-vod-") || "");
}
