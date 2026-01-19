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




// 강의 뷰 탭 js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.vod_tabs .tab');
  const panels = document.querySelectorAll('.tab_panel');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // tab active 초기화
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // 현재 tab 활성화
      tab.classList.add('active');
      panels[index].classList.add('active');
    });
  });
});


// 쿠폰 모달 
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.coupon_input');
  const btn = document.querySelector('.btn_coupon_submit');
  if (!input || !btn) return;

  const update = () => {
    const hasValue = input.value.trim().length > 5;

    input.classList.toggle('active', hasValue);
    btn.disabled = !hasValue;
    btn.classList.toggle('active', hasValue);
  };

  input.addEventListener('input', update);
  update();
});
