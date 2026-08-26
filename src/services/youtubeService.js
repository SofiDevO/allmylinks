import { YT_API_KEY } from "astro:env/client";

export const fetchYouTubeVideos = async (channelId) => {
  const API_key = YT_API_KEY; //in order to get your free public API_key, you will need to create an acc. in https://rss2json.com/
  const channelURL = encodeURIComponent(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
  );
  const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}&api_key=${API_key}`;

  console.log(reqURL);
  try {
    const response = await fetch(reqURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.items && result.items.length > 0) {
      return result.items;
    } else {
      throw new Error("No videos found in the feed.");
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};
