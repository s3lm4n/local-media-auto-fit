(function() {
  function applyStylesToMedia() {
    const medias = document.querySelectorAll('img, video');
    if (!medias.length) return;

    medias.forEach(media => {
      // Reset previous styles to avoid stacking
      media.style.minWidth = '';
      media.style.minHeight = '';
      media.style.width = '';
      media.style.height = '';

      // Video için özel ayarlar
      if (media.tagName.toLowerCase() === 'video') {
        media.setAttribute('controls', ''); // Opsiyonel: Kontroller
        const aspectRatio = media.videoWidth / media.videoHeight;
        const windowAspectRatio = window.innerWidth / window.innerHeight;

        if (aspectRatio > windowAspectRatio) {
          // Video daha genişse, genişliği pencereye uydur
          media.style.width = '100vw';
          media.style.height = 'auto';
        } else {
          // Video daha uzunsa, yüksekliği pencereye uydur
          media.style.height = '100vh';
          media.style.width = 'auto';
        }

        media.style.maxWidth = '100vw';
        media.style.maxHeight = '100vh';
        media.style.objectFit = 'contain';
      } else {
        // Görseller için (img, GIF)
        const aspectRatio = media.naturalWidth / media.naturalHeight;
        const windowAspectRatio = window.innerWidth / window.innerHeight;

        if (aspectRatio > windowAspectRatio) {
          // Görsel daha genişse, genişliği pencereye uydur
          media.style.width = '100vw';
          media.style.height = 'auto';
        } else {
          // Görsel daha uzunsa, yüksekliği pencereye uydur
          media.style.height = '100vh';
          media.style.width = 'auto';
        }

        media.style.maxWidth = '100vw';
        media.style.maxHeight = '100vh';
        media.style.objectFit = 'contain';
      }

      // Ortak stiller
      Object.assign(media.style, {
        objectPosition: 'center',
        display: 'block',
        margin: '0 auto',
        backgroundColor: 'black',
        boxSizing: 'border-box',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        right: 'auto',
        bottom: 'auto'
      });
    });
  }

  // Body stilleri
  document.body.style.cssText = `
    margin: 0;
    padding: 0;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
  `;

  // İlk yüklemede stilleri uygula
  applyStylesToMedia();

  // Dinamik yüklemeler için gözlemci
  const observer = new MutationObserver(() => {
    applyStylesToMedia();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Pencere yeniden boyutlandığında stilleri yenile
  window.addEventListener('resize', () => {
    applyStylesToMedia();
  });

  // Video oynatma başladığında tekrar kontrol et
  document.addEventListener('loadedmetadata', (e) => {
    if (e.target.tagName.toLowerCase() === 'video') {
      applyStylesToMedia();
    }
  }, true);

  // Görsel yüklenirken boyutları kontrol et
  document.addEventListener('load', (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      applyStylesToMedia();
    }
  }, true);
})();