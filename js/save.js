
나의 말:
document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------
     header Mypage button
  ------------------------------- */
  const myPage = document.querySelector('.header .My_page');
  if (myPage) {
    const trigger = myPage.querySelector('.my_trigger');

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      myPage.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      myPage.classList.remove('open');
    });
  }

  /* -------------------------------
     헤더 스크롤 → 색변경 (서브페이지)
  ------------------------------- */
  const header = document.querySelector('.header');
  if (header) {
    const FIXED_SCROLL = 100;

    window.addEventListener('scroll', () => {
      header.classList.toggle('bg_dark', window.scrollY >= FIXED_SCROLL);
    });
  }

  /* -------------------------------
     search bar active (공통)
  ------------------------------- */
  document.querySelectorAll('.search_box input').forEach(input => {
    const box = input.closest('.search_box');
    if (!box) return;

    const update = () => {
      box.classList.toggle('active', input.value.trim() !== '');
    };

    input.addEventListener('input', update);
    input.addEventListener('change', update);
    update();
  });

  /* -------------------------------
     input active js
  ------------------------------- */
  document.querySelectorAll('input.input_active').forEach(input => {
    const toggle = () => {
      input.classList.toggle('active', input.value.trim() !== '');
    };

    toggle();
    input.addEventListener('input', toggle);
  });

  /* -------------------------------
     custom select (fake select)
  ------------------------------- */
  const selects = document.querySelectorAll('.custom_select');

  selects.forEach(select => {
    const btn = select.querySelector('.fake_select');
    const text = btn.querySelector('.text');
    const real = select.querySelector('.real_select');
    const items = select.querySelectorAll('.options li');

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = select.classList.contains('open');

      selects.forEach(s => {
        s.classList.remove('open');
        s.querySelector('.fake_select').setAttribute('aria-expanded', 'false');
      });

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

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom_select.open').forEach(select => {
      select.classList.remove('open');
      select.querySelector('.fake_select')
        .setAttribute('aria-expanded', 'false');
    });
  });

  /* -------------------------------
     결제 - 쿠폰
  ------------------------------- */
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom_select_wrap')
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

        trigger.classList.toggle(
          'active',
          !['선택안함', '사용 가능 쿠폰 없음'].includes(li.textContent)
        );

        wrap.classList.remove('open');
      });
    });
  });

  /* -------------------------------
     결제 - 팜포인트
  ------------------------------- */
  const pointInput = document.querySelector('.point_input');
  if (pointInput) {
    const update = v => {
      pointInput.classList.toggle('active', Number(v) >= 100);
    };

    pointInput.addEventListener('input', e => update(e.target.value));
    pointInput.addEventListener('blur', e => update(e.target.value));
    update(pointInput.value);
  }

  /* -------------------------------
     FAQ 토글
  ------------------------------- */
  const faqItems = document.querySelectorAll('.Faq_item');

  faqItems.forEach(item => {
    item.querySelector('.Faq_q').addEventListener('click', () => {
      const answer = item.querySelector('.Faq_a');
      const inner = item.querySelector('.Faq_a_inner');

      faqItems.forEach(el => {
        if (el !== item) {
          el.classList.remove('active');
          el.querySelector('.Faq_a').style.height = 0;
        }
      });

      item.classList.toggle('active');
      answer.style.height = item.classList.contains('active')
        ? inner.scrollHeight + 'px'
        : 0;
    });
  });

  /* -------------------------------
     구독관리 페이지 유의사항
  ------------------------------- */
  const noticeToggle = document.querySelector('.notice_toggle');
  const noticeBox = document.querySelector('.notice_box');

  if (noticeToggle && noticeBox) {
    noticeToggle.addEventListener('click', e => {
      e.stopPropagation();
      noticeBox.classList.toggle('active');
    });

    noticeBox.addEventListener('click', e => e.stopPropagation());

    document.addEventListener('click', () => {
      noticeBox.classList.remove('active');
    });
  }
});

/* =========================================================
   jQuery 영역 (기존 유지)
========================================================= */
$(document).ready(function () {

  $(".selectDiv").click(function (e) {
    e.stopPropagation();
    let optionList = $(this).find(".option_list");

    if ($(this).hasClass("active")) {
      optionList.animate({ opacity: 0 }, 200, function () {
        $(this).css({ display: "none" });
      });
    } else {
      optionList.css({ display: "block", opacity: 0 })
        .animate({ opacity: 1 }, 200);
    }

    $(this).toggleClass("active");
  });

  $(".option_list li").click(function () {
    let text = $(this).text();
    let selectDiv = $(this).closest(".selectDiv");

    selectDiv.find(".selectTxt").text(text);
    selectDiv.find(".option_list").animate({ opacity: 0 }, 200, function () {
      $(this).css({ display: "none" });
      selectDiv.removeClass("active");
    });
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".selectDiv").length) {
      $(".selectDiv").removeClass("active")
        .find(".option_list")
        .animate({ opacity: 0 }, 200, function () {
          $(this).css({ display: "none" });
        });
    }
  });
});

/* =========================================================
   Global Click / Input (이벤트 위임)
========================================================= */

// like 좋아요
document.addEventListener('click', e => {
  const like = e.target.closest('.like');
  if (like) {
    e.preventDefault();
    e.stopPropagation();
    like.classList.toggle('active');
  }
});

// textarea 통합
document.addEventListener('input', e => {
  const t = e.target;
  if (t.tagName !== 'TEXTAREA') return;

  const wrap = t.closest('.textarea_wrap');
  if (!wrap) return;

  const count = wrap.querySelector('.count em');
  const btn = wrap.querySelector('button[type="submit"]');
  const len = t.value.length;
  const min = t.getAttribute('minlength') || 0;

  if (count) count.textContent = len;
  if (btn) btn.disabled = len < min;
});

// 댓글 더보기
document.addEventListener('click', e => {
  const btn = e.target.closest('.comment_more, .btn_more');
  if (!btn) return;

  const item = btn.closest('.li_view');
  if (!item) return;

  item.classList.toggle('is-open');
  btn.textContent = item.classList.contains('is-open') ? '접기' : '더보기';
});

// 코스/역량 좋아요
document.addEventListener('click', e => {
  const btn = e.target.closest('.action_like');
  if (!btn) return;

  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.classList.toggle('fa-regular');
  icon.classList.toggle('fa-solid');
});



/* =========================================================
   Swiper 강좌 스와이퍼
========================================================= */
// 메인 스와이퍼
const adVodSwiper = new Swiper('.adVodSwiper', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 45,
  loop: false, // 기본 true로 

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.ad_vod_pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.ad_vod_next',
    prevEl: '.ad_vod_prev',
  },
});

// 강좌 스와이퍼
document.addEventListener('DOMContentLoaded', () => {

  function initClassSwiper(options) {
    const container = document.querySelector(options.container);
    if (!container) return;

    const slideCount = container.querySelectorAll('.swiper-slide').length;

    if (slideCount > 5) {
      new Swiper(container, {
        slidesPerView: 5,
        spaceBetween: 15,
        loop: false,
        navigation: {
          nextEl: options.next,
          prevEl: options.prev,
        },
        pagination: {
          el: options.pagination,
          type: 'fraction',
        },
      });
    } else {
      document.querySelector(options.prev)?.style.setProperty('display', 'none');
      document.querySelector(options.next)?.style.setProperty('display', 'none');
      document.querySelector(options.pagination)?.style.setProperty('display', 'none');
    }
  }

  /* 새로운 강좌 */
  initClassSwiper({
    container: '.new_class_list',
    prev: '.new_prev',
    next: '.new_next',
    pagination: '.new_pagination',
  });

  /* 플러스 강좌 */
  initClassSwiper({
    container: '.plus_class_list',
    prev: '.plus_prev',
    next: '.plus_next',
    pagination: '.plus_pagination',
  });

});

/* =========================================================
   Modal 통합
========================================================= */
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
