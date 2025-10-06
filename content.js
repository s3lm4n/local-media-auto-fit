(function() {
  function applyStylesToMedia() {
    const medias = document.querySelectorAll('img, video');
    if (!medias.length) return;

    medias.forEach(media => {
      if (media.tagName.toLowerCase() === 'video') {
        media.setAttribute('controls', '');
        media.style.maxWidth = '100vw';
        media.style.maxHeight = '100vh';
        media.style.minWidth = '100vw';
        media.style.minHeight = '100vh';
        media.style.width = '100%';
        media.style.height = '100%';
        media.style.objectFit = 'cover';
      } else {
        media.style.objectFit = 'contain';
      }

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

  document.body.style.cssText = `
    margin: 0;
    padding: 0;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    overflow: hidden;
    position: 'relative';
  `;

  applyStylesToMedia();

  const observer = new MutationObserver(() => {
    applyStylesToMedia();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('resize', () => {
    applyStylesToMedia();
  });
})();