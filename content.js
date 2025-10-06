(function() {
  // Tüm img ve video elementlerini seç
  const media = document.querySelector('img, video');
  if (!media) return;

  // Video için ek kontroller
  if (media.tagName.toLowerCase() === 'video') {
    media.setAttribute('controls', ''); // Opsiyonel: Kontrolleri ekle, istersen kaldır
    media.style.maxWidth = '100vw'; // Maksimum genişlik
    media.style.maxHeight = '100vh'; // Maksimum yükseklik
  }

  // Ortak medya stilleri
  Object.assign(media.style, {
    width: '100vw',
    height: '100vh',
    objectFit: 'contain', // Görsel/videoyu orantılı sığdır
    objectPosition: 'center', // Ortalanmış pozisyon
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'black',
    boxSizing: 'border-box' // Kenar boşluklarını hesaba kat
  });

  // Body için stil ayarları
  document.body.style.cssText = `
    margin: 0;
    padding: 0;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    overflow: hidden;
  `;

  // Pencere yeniden boyutlandırıldığında yeniden ayarla
  window.addEventListener('resize', () => {
    media.style.width = '100vw';
    media.style.height = '100vh';
  });
})();