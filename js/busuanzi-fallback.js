// Busuanzi fallback: 若超時或無法取得資料則自動隱藏計數器
window.addEventListener('DOMContentLoaded', function () {
  var pvContainer = document.getElementById('busuanzi_container_site_pv');
  var pvValue = document.getElementById('busuanzi_value_site_pv');
  if (!pvContainer || !pvValue) return;
  // 最多等 5 秒，若沒填值就隱藏
  setTimeout(function () {
    var val = pvValue.textContent.trim();
    if (!val || val === '' || val === '0' || isNaN(Number(val))) {
      pvContainer.style.display = 'none';
    }
  }, 5000);
});
