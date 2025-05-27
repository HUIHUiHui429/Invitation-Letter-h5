window.addEventListener("load", function () {
  const flipbook = $('#flipbook');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 设置容器尺寸
  flipbook.css({
    width: screenWidth,
    height: screenHeight
  });

  // 初始化翻页
  flipbook.turn({
    width: screenWidth,
    height: screenHeight,
    autoCenter: true,
    display: 'single'
  });

  // ✅ 翻页按钮逻辑：最后一页后跳回第一页
  $('#nextHint').on('click', function () {
    const totalPages = flipbook.turn('pages');
    const currentPage = flipbook.turn('page');
    if (currentPage === totalPages) {
      flipbook.turn('page', 1); // ✅ 回到第一页
    } else {
      flipbook.turn('next');
    }
  });

  // 🎵 音乐控制逻辑保持不变
  const music = document.getElementById('bg-music');
  const musicIcon = document.getElementById('music-icon');
  let isPlaying = false;

  const enableMusic = () => {
    music.play().then(() => {
      isPlaying = true;
      musicIcon.src = 'images/music-on.png';
    }).catch(() => {});
    document.removeEventListener('click', enableMusic);
    document.removeEventListener('touchstart', enableMusic);
  };

  document.addEventListener('click', enableMusic);
  document.addEventListener('touchstart', enableMusic);

  document.getElementById('music-toggle').addEventListener('click', function (e) {
    e.stopPropagation();
    if (isPlaying) {
      music.pause();
      musicIcon.src = 'images/music-off.png';
    } else {
      music.play();
      musicIcon.src = 'images/music-on.png';
    }
    isPlaying = !isPlaying;
  });
});
