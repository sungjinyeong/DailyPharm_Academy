// 메인 스와이퍼
const adVodSwiper = new Swiper('.adVodSwiper', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 15,
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
  function initSmoothScrollSwiper(opts) {
    const el = document.querySelector(opts.container);
    if (!el) return;

    new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 15,
      loop: false,

      freeMode: {
        enabled: true,
        momentum: true,
        momentumRatio: 0.9,
        momentumBounce: false,
        sticky: false,
      },

      speed: 450,
      grabCursor: true,
      touchRatio: 1,
      resistance: true,
      resistanceRatio: 0.85,

      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 0.8,
      },

      navigation: {
        nextEl: opts.next,
        prevEl: opts.prev,
      },
      pagination: opts.pagination
        ? { el: opts.pagination, type: 'fraction' }
        : undefined,

      watchOverflow: true,
      observer: true,
      observeParents: true,
    });
  }

  // 새로운 강좌
  initSmoothScrollSwiper({
    container: '.new_class_list',
    prev: '.new_prev',
    next: '.new_next',
    pagination: '.new_pagination',
  });

  // 실시간 인기 강좌 (추가)
  initSmoothScrollSwiper({
    container: '.hot_class_list',
    prev: '.hot_prev',
    next: '.hot_next',
    pagination: '.hot_pagination',
  });

  // 플러스 강좌
  initSmoothScrollSwiper({
    container: '.plus_class_list',
    prev: '.plus_prev',
    next: '.plus_next',
    pagination: '.plus_pagination',
  });
});