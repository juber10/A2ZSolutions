const grid = document.getElementById("grid");

const videoSources = [
  "/hexagon/videos/v1.mp4",
  "/hexagon/videos/v2.mp4",
  "/hexagon/videos/v3.mp4",
  "/hexagon/videos/v4.mp4",
  "/hexagon/videos/v5.mp4",
  "/hexagon/videos/v6.mp4",
  "/hexagon/videos/v7.mp4",
  "/hexagon/videos/v8.mp4",
  "/hexagon/videos/v9.mp4",
  "/hexagon/videos/v10.mp4"
];

// Settings
const numRows = 4;
const hexesPerRow = 5;
let videoIndex = 0;

for (let r = 0; r < numRows; r++) {
  const row = document.createElement("div");
  row.classList.add("row");
  if (r % 2 !== 0) row.classList.add("offset");

  for (let c = 0; c < hexesPerRow; c++) {
    const hex = document.createElement("div");
    hex.classList.add("hex");

    const video = document.createElement("video");
    video.src = videoSources[videoIndex % videoSources.length];
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    hex.appendChild(video);
    row.appendChild(hex);

    videoIndex++;
  }

  grid.appendChild(row);
}
