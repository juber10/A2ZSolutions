const grid = document.getElementById("grid");

const videoSources = [
  "/resources/intro-video/Intro.mp4",
  // "/hexagon/videos/v2.mp4",
  // "/hexagon/videos/v3.mp4",
  // "/hexagon/videos/v4.mp4",
  // "/hexagon/videos/v5.mp4",
  // "/hexagon/videos/v6.mp4",
  // "/hexagon/videos/v7.mp4",
  // "/hexagon/videos/v8.mp4",
  // "/hexagon/videos/v9.mp4",
  // "/hexagon/videos/v6.mp4"
];

// Settings
const numRows = 3; // Number of rows in the grid
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
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            this.classList.toggle('active');
        });
    }

 // Stats counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalNumber = stat.textContent;
            const isPlus = finalNumber.includes('+');
            const numValue = parseInt(finalNumber.replace(/\D/g, ''));
            
            let currentNumber = 0;
            const increment = numValue / 50; // Animate over 50 steps
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= numValue) {
                    clearInterval(timer);
                    stat.textContent = finalNumber;
                } else {
                    stat.textContent = Math.floor(currentNumber) + (isPlus ? '+' : '');
                }
            }, 30);
        });
    }

   // Trigger stats animation when hero stats are visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStats);
    }

