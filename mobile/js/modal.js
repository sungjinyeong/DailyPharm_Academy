document.addEventListener('click', (e) => {
  // 닫기 버튼 (X, 확인)
  if (e.target.closest('.modal_close') || e.target.closest('.modal_confirm')) {
    const modal = e.target.closest('.modal_overlay');
    if (modal) modal.classList.remove('active');
    return;
  }
});

// 열기 (통합)
window.openModal = (selector) => {
  const modal = document.querySelector(selector);
  if (modal) modal.classList.add('active');
};
