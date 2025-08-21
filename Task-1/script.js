(function(){
  const body = document.body;
  const guideButton = document.getElementById('button');
  const openBtn = document.getElementById('openBtn');
  const overlay = document.getElementById('overlay');
  const STORAGE_KEY = 'sidebar-collapsed';

  function setCollapsed(value){
    if(value) body.classList.add('collapsed'); 
    else body.classList.remove('collapsed');
    guideButton.setAttribute('aria-pressed', value ? 'true' : 'false');
    localStorage.setItem(STORAGE_KEY, value ? '1':'0');
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved === '1') setCollapsed(true);
  } catch(e) {}

  // Hamburger button
  openBtn.addEventListener('click', function(){
    if(window.innerWidth <= 768){
      body.classList.add('sidebar-open');
      overlay.classList.add('visible');
    } else {
      setCollapsed(false);
    }
  });

  // Overlay click closes sidebar on mobile
  overlay.addEventListener('click', closeOverlay);
  function closeOverlay(){
    body.classList.remove('sidebar-open');
    overlay.classList.remove('visible');
  }

  // Handle resizing between desktop and mobile
  window.addEventListener('resize', function(){
    if(window.innerWidth <= 768){
      // Always clear collapsed state on mobile
      body.classList.remove('collapsed');
      localStorage.setItem(STORAGE_KEY, '0');
    } else {
      closeOverlay();
    }
  });

  // Escape key closes overlay
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeOverlay();
  });

  // Nav link active state
  document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
    if(window.innerWidth <= 768) closeOverlay();
  }));

  // Main collapse/expand button
  if (guideButton) {
    guideButton.addEventListener('click', function(){
      if(window.innerWidth <= 768){
        // Mobile toggle
        if(body.classList.contains('sidebar-open')) {
          body.classList.remove('sidebar-open');
          overlay.classList.remove('visible');
        } else {
          body.classList.add('sidebar-open');
          overlay.classList.add('visible');
        }
      } else {
        // Desktop toggle
        const isCollapsed = body.classList.toggle('collapsed');
        guideButton.setAttribute('aria-pressed', isCollapsed ? 'true' : 'false');
        localStorage.setItem(STORAGE_KEY, isCollapsed ? '1' : '0');
      }
    });
  }
})();
