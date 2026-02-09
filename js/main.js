/* =========================================================
   jQuery 변환 (기능/효과 완전 동일)
========================================================= */
$(function (){

  /* -------------------------------
     header Mypage button
  ------------------------------- */
  const $myPage = $('.header .My_page');

  if ($myPage.length) {
    const $trigger = $myPage.find('.my_trigger');

    $trigger.on('click', function (e) {
      e.stopPropagation();
      $myPage.toggleClass('open');
    });

    $(document).on('click', function () {
      $myPage.removeClass('open');
    });
  }

  /* -------------------------------
     헤더 스크롤 → 색변경 (서브페이지)
  ------------------------------- */
  const $header = $('.header');
  const FIXED_SCROLL = 100;

  if ($header.length) {
    $(window).on('scroll', function () {
      $header.toggleClass('bg_dark', $(window).scrollTop() >= FIXED_SCROLL);
    });
  }

  /* -------------------------------
     search bar active (공통)
  ------------------------------- */
  $('.search_box input').each(function () {
    const $input = $(this);
    const $box = $input.closest('.search_box');

    if (!$box.length) return;

    const update = () => {
      $box.toggleClass('active', $.trim($input.val()) !== '');
    };

    $input.on('input change', update);
    update();
  });

  /* -------------------------------
     input active js
  ------------------------------- */
  $('input.input_active').each(function () {
    const $input = $(this);

    const toggle = () => {
      $input.toggleClass('active', $.trim($input.val()) !== '');
    };

    toggle();
    $input.on('input', toggle);
  });

  /* -------------------------------
     custom select (fake select)
  ------------------------------- */
  const $selects = $('.custom_select');

  $selects.each(function () {
    const $select = $(this);
    const $btn = $select.find('.fake_select');
    const $text = $btn.find('.text');
    const $real = $select.find('.real_select');
    const $items = $select.find('.options li');

    $btn.on('click', function (e) {
      e.stopPropagation();

      const isOpen = $select.hasClass('open');

      $selects.removeClass('open')
        .find('.fake_select')
        .attr('aria-expanded', 'false');

      if (!isOpen) {
        $select.addClass('open');
        $btn.attr('aria-expanded', 'true');
      }
    });

    $items.on('click', function () {
      const $item = $(this);
      $text.text($item.text());
      $real.val($item.data('value'));

      $select.removeClass('open');
      $btn.attr('aria-expanded', 'false');
    });
  });

  $(document).on('click', function () {
    $('.custom_select.open')
      .removeClass('open')
      .find('.fake_select')
      .attr('aria-expanded', 'false');
  });


  /* =========================================================
    footer selectDiv (누락 복구)
    - 기존 동작 100% 동일
  ========================================================= */
  $(document).on('click', '.selectDiv', function (e) {
    e.stopPropagation();

    const $this = $(this);
    const $list = $this.find('.option_list');

    if ($this.hasClass('active')) {
      $list.stop().animate({ opacity: 0 }, 200, function () {
        $list.hide();
      });
    } else {
      $list
        .show()
        .css('opacity', 0)
        .stop()
        .animate({ opacity: 1 }, 200);
    }

    $this.toggleClass('active');
  });

  $(document).on('click', '.selectDiv .option_list li', function (e) {
    e.stopPropagation();

    const $li = $(this);
    const $wrap = $li.closest('.selectDiv');

    $wrap.find('.selectTxt').text($li.text());

    $wrap.find('.option_list')
      .stop()
      .animate({ opacity: 0 }, 200, function () {
        $(this).hide();
        $wrap.removeClass('active');
      });
  });

  $(document).on('click', function () {
    $('.selectDiv.active').each(function () {
      const $wrap = $(this);
      $wrap.removeClass('active');
      $wrap.find('.option_list')
        .stop()
        .animate({ opacity: 0 }, 200, function () {
          $(this).hide();
        });
    });
  });

  /* -------------------------------
     결제 - 쿠폰
  ------------------------------- */
  $(document).on('click', function () {
    $('.custom_select_wrap').removeClass('open');
  });

  $('.custom_select_wrap').each(function () {
    const $wrap = $(this);
    const $trigger = $wrap.find('.select_trigger');
    const $text = $wrap.find('.select_text');

    $trigger.on('click', function (e) {
      e.stopPropagation();
      $wrap.toggleClass('open');
    });

    $wrap.find('.select_list li').on('click', function () {
      const value = $(this).text();

      if ($text.length) $text.text(value);

      $trigger.toggleClass(
        'active',
        !['선택안함', '사용 가능 쿠폰 없음'].includes(value)
      );

      $wrap.removeClass('open');
    });
  });

  /* -------------------------------
     결제 - 팜포인트
  ------------------------------- */
  const $pointInput = $('.point_input');

  if ($pointInput.length) {
    const update = v => {
      $pointInput.toggleClass('active', Number(v) >= 100);
    };

    $pointInput.on('input blur', function () {
      update($(this).val());
    });

    update($pointInput.val());
  }

  /* -------------------------------
     FAQ 토글
  ------------------------------- */
  const $faqItems = $('.Faq_item');

  $faqItems.each(function () {
    const $item = $(this);
    const $q = $item.find('.Faq_q');
    const $a = $item.find('.Faq_a');
    const $inner = $item.find('.Faq_a_inner');

    $q.on('click', function () {
      $faqItems.not($item).each(function () {
        $(this)
          .removeClass('active')
          .find('.Faq_a')
          .css('height', 0);
      });

      $item.toggleClass('active');

      $a.css(
        'height',
        $item.hasClass('active') ? $inner[0].scrollHeight + 'px' : 0
      );
    });
  });

  /* -------------------------------
     구독관리 페이지 유의사항
  ------------------------------- */
  const $noticeToggle = $('.notice_toggle');
  const $noticeBox = $('.notice_box');

  if ($noticeToggle.length && $noticeBox.length) {
    $noticeToggle.on('click', function (e) {
      e.stopPropagation();
      $noticeBox.toggleClass('active');
    });

    $noticeBox.on('click', function (e) {
      e.stopPropagation();
    });

    $(document).on('click', function () {
      $noticeBox.removeClass('active');
    });
  }

  /* =========================================================
     Global Click / Input (이벤트 위임)
  ========================================================= */

  // like 좋아요
  $(document).on('click', '.like', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('active');
  });

  // textarea 통합 10글자 체크 + 버튼 활성화
  $(document).on('input', 'textarea', function () {
    const $t = $(this);
    const $wrap = $t.closest('.textarea_wrap');
    if (!$wrap.length) return;

    const $count = $wrap.find('.count em');
    const $btn = $wrap.find('button[type="submit"]');
    const len = $t.val().length;
    const min = Number($t.attr('minlength')) || 0;

    if ($count.length) $count.text(len);
    if ($btn.length) $btn.prop('disabled', len < min);
  });

  // 수강후기에 댓글 더보기
  $(document).on('click', '.comment_more, .btn_more', function () {
    const $btn = $(this);
    const $item = $btn.closest('.li_view');
    if (!$item.length) return;

    $item.toggleClass('is-open');
    $btn.text($item.hasClass('is-open') ? '접기' : '더보기');
  });

  // 강좌 페이지 좋아요
  $(document).on('click', '.action_like', function () {
    const $btn = $(this);
    const $icon = $btn.find('i');

    $btn.toggleClass('active');
    $icon.toggleClass('fa-regular fa-solid');
  });

});