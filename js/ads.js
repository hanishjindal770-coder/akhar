/*
  Google AdSense. Ads stay switched off until both values below are filled in.
  1. After AdSense approves the site, paste your publisher ID, e.g. 'ca-pub-1234567890123456'.
  2. In AdSense, create a "Display ad" unit and paste its slot number, e.g. '1234567890'.
  Ads appear only in the .ad-slot boxes, which are never on the lesson or exam screens.
*/
const ADSENSE_CLIENT = '';
const ADSENSE_SLOT = '';

(function () {
  if (!ADSENSE_CLIENT) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
  if (!ADSENSE_SLOT) return;
  document.querySelectorAll('.ad-slot').forEach(el => {
    el.hidden = false;
    el.innerHTML = '<span class="ad-label">Advertisement</span><ins class="adsbygoogle" style="display:block" data-ad-client="' + ADSENSE_CLIENT + '" data-ad-slot="' + ADSENSE_SLOT + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });
})();
