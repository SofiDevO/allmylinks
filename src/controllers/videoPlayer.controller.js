import { fetchYouTubeVideos } from "@services/youtubeService";
const channelId = "UC36_js-krsAHAEAWpEDhHtw"; // Youtube Channel ID

const videoExtractors = [
  {
    condition: (video) => video.link.includes("v="),
    extract: (video) => video.link.split("v=")[1].split("&")[0],
  },
  {
    condition: (video) => video.link.includes("shorts/"),
    extract: (video) => video.link.split("shorts/")[1].split("?")[0],
  },
  {
    condition: (video) => video.guid && video.guid.includes("yt:video:"),
    extract: (video) => video.guid.split("yt:video:")[1],
  },
];

const extractVideoId = (video) => {
  const extractor = videoExtractors.find((item) => item.condition(video));
  return extractor ? extractor.extract(video) : "";
};

const initializeModal = (iframe, videoData) => {
  const videoNumber = iframe.getAttribute("data-vnum");
  const video = videoData[videoNumber];

  if (!video) return;

  const videoId = extractVideoId(video);
  const embeddUrl = `https://youtube.com/embed/${videoId}?controls=1`;

  iframe.setAttribute("src", embeddUrl);
};
export const loadVideo = async (iframe) => {
  try {
    const videoData = await fetchYouTubeVideos(channelId);
    initializeModal(iframe, videoData);
    const loader = document.querySelector(".heart__loader");
    if (loader) loader.style.display = "none";
  } catch (error) {
    console.error("Error loading video:", error);
  }
};

const initVideos = () => {
  const iframes = document.getElementsByClassName("latestVideoEmbed");
  if (iframes.length > 0) {
    loadVideo(iframes[0]);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVideos);
} else {
  initVideos();
}
