(function() {
  // Medya elementlerine stilleri uygulama fonksiyonu
  function applyStylesToMedia() {
    const medias = document.querySelectorAll('img, video');
    if (!medias.length) return;

    medias.forEach(media => {
      // Video için özel ayarlar
      if (media.tagName.toLowerCase() === 'video') {
        media.setAttribute('controls', ''); // Opsiyonel: Kontroller, istemiyorsan kaldır
        media.style.maxWidth = '100vw';
        media.style.maxHeight = '100vh';
        media.style.minWidth = '100vw'; // Büyütmeyi zorla
        media.style.minHeight = '100vh'; // Büyütmeyi zorla
        media.style.width = '100%';
        media.style.height = '100%';
        media.style.objectFit = 'cover'; // Ekranı doldur, kırpma olabilir
      } else {
        // Görseller için (img, GIF)
        media.style.objectFit = 'contain'; // Orantıyı koru
      }

      // Ortak stiller
      Object.assign(media.style, {
        width: '100vw',
        height: '100vh',
        objectPosition: 'center',
        display: 'block',
        margin: '0 auto',
        backgroundColor: 'black',
        boxSizing: 'border-box',
        position: 'absolute',
        top: '0',
        left: '0'
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
})();