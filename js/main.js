// header Mypage button
document.addEventListener('DOMContentLoaded', () => {
  const myPage = document.querySelector('.header .My_page');
  const trigger = myPage.querySelector('.my_trigger');

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    myPage.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    myPage.classList.remove('open');
  });
});

// 헤더 스크롤 -> 색변경 <서브페이지용>
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  if (!header) return;

  const FIXED_SCROLL = 100;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= FIXED_SCROLL) {
      header.classList.add('bg_dark');
    } else {
      header.classList.remove('bg_dark');
    }
  });
});

// search bar active 공통
document.addEventListener('DOMContentLoaded', () => {
  const searchInputs = document.querySelectorAll('.search_box input');

  if (!searchInputs.length) return;

  searchInputs.forEach(input => {
    const box = input.closest('.search_box');
    if (!box) return;

    const update = () => {
      if (input.value.trim() !== '') {
        box.classList.add('active');
      } else {
        box.classList.remove('active');
      }
    };

    input.addEventListener('input', update);
    input.addEventListener('change', update);
    update();
  });
});



// input active js
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input.input_active');

  const toggleActive = (input) => {
    if (input.value.trim() !== '') {
      input.classList.add('active');
    } else {
      input.classList.remove('active');
    }
  };

  inputs.forEach(input => {
    // 초기 value 체크 (페이지 로드시)
    toggleActive(input);

    // 입력 시 체크
    input.addEventListener('input', () => {
      toggleActive(input);
    });
  });
});


// like 좋아요
document.addEventListener('click', e => {
  const like = e.target.closest('.like');
  if (!like) return;

  e.preventDefault();
  e.stopPropagation();

  like.classList.toggle('active');
});


// select 
const selects = document.querySelectorAll('.custom_select');

selects.forEach(select => {
  const btn = select.querySelector('.fake_select');
  const text = btn.querySelector('.text');
  const real = select.querySelector('.real_select');
  const items = select.querySelectorAll('.options li');

  btn.addEventListener('click', e => {
    e.stopPropagation();

    const isOpen = select.classList.contains('open');

    // 전부 닫기
    selects.forEach(s => {
      s.classList.remove('open');
      s.querySelector('.fake_select')
        .setAttribute('aria-expanded', 'false');
    });

    // 닫혀있던 경우만 다시 열기
    if (!isOpen) {
      select.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      text.textContent = item.textContent;
      real.value = item.dataset.value;

      select.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
});
// 바깥 클릭 시 전체 닫기
document.addEventListener('click', () => {
  document.querySelectorAll('.custom_select.open').forEach(select => {
    select.classList.remove('open');
    select.querySelector('.fake_select')
      .setAttribute('aria-expanded', 'false');
  });
});


// 결제-쿠폰
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', () => {
    document
      .querySelectorAll('.custom_select_wrap')
      .forEach(wrap => wrap.classList.remove('open'));
  });

  document.querySelectorAll('.custom_select_wrap').forEach(wrap => {
    const trigger = wrap.querySelector('.select_trigger');
    const text = wrap.querySelector('.select_text');

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      wrap.classList.toggle('open');
    });

    wrap.querySelectorAll('.select_list li').forEach(li => {
      li.addEventListener('click', () => {
        if (text) text.textContent = li.textContent;

        // 선택안함 처리
        if (li.textContent === '선택안함' || li.textContent === '사용 가능 쿠폰 없음') {
          wrap.querySelector('.select_trigger').classList.remove('active');
        } else {
          wrap.querySelector('.select_trigger').classList.add('active');
        }
        wrap.classList.remove('open');
      });
    });
  });
});

// 결제-팜포인트
document.addEventListener('DOMContentLoaded', () => {
  const pointInput = document.querySelector('.point_input');
  if (!pointInput) return;

  const update = value => {
    pointInput.classList.toggle('active', Number(value) >= 100);
  };
  pointInput.addEventListener('input', e => {
    update(e.target.value);
  });
  pointInput.addEventListener('blur', e => {
    update(e.target.value);
  });
  update(pointInput.value);
});





// textarea 통합
document.addEventListener('input', function (e) {
  const target = e.target;

  if (target.tagName !== 'TEXTAREA') return;

  const wrap = target.closest('.textarea_wrap');
  if (!wrap) return;

  const countEl = wrap.querySelector('.count em');
  const submitBtn = wrap.querySelector('button[type="submit"]');

  const length = target.value.length;
  const min = target.getAttribute('minlength') || 0;

  if (countEl) countEl.textContent = length;
  if (submitBtn) submitBtn.disabled = length < min;
});

// 댓글 출력 더보기
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.comment_more, .btn_more');
  if (!btn) return;

  // 부모 아이템 (댓글 / 후기 공용)
  const item =
    btn.closest('.li_view');

  if (!item) return;

  item.classList.toggle('is-open');

  // 버튼 텍스트 토글
  btn.textContent = item.classList.contains('is-open')
    ? '접기'
    : '더보기';
});




// 코스/역량 뷰페이지 좋아요
document.addEventListener('click', function(e){
  const likeBtn = e.target.closest('.action_like');
  if (!likeBtn) return;

  likeBtn.classList.toggle('active');

  const icon = likeBtn.querySelector('i');
  icon.classList.toggle('fa-regular');
  icon.classList.toggle('fa-solid');
});


// FAQ 토글
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.Faq_item');

  items.forEach(item => {
    item.querySelector('.Faq_q').addEventListener('click', () => {
      const answer = item.querySelector('.Faq_a');
      const inner = item.querySelector('.Faq_a_inner');

      // 다른 FAQ 닫기
      items.forEach(el => {
        if (el !== item) {
          el.classList.remove('active');
          el.querySelector('.Faq_a').style.height = 0;
        }
      });

      // 현재 FAQ 토글
      item.classList.toggle('active');

      if (item.classList.contains('active')) {
        answer.style.height = inner.scrollHeight + 'px';
      } else {
        answer.style.height = 0;
      }
    });
  });
});