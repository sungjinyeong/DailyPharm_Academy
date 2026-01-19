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