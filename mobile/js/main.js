$(function () {

  /* header 드롭다운 */

  const $header = $(".m_header");

  if ($header.length) {

    const $toggle = $header.find(".menu_toggle_btn");
    const $items = $header.find(".dropdown_primary_item");
    const $panels = $header.find(".dropdown_secondary_panel");

    /* ---------------- 메뉴 토글 ---------------- */
    $toggle.on("click", function () {
      $header.removeClass("is_search"); // 검색모드 끄기
      $header.toggleClass("is_open");
    });

    /* ---------------- 카테고리 탭 ---------------- */
    $items.each(function (i) {
      $(this).find(".dropdown_primary_btn").on("click", function () {
        $items.removeClass("active");
        $panels.removeClass("active");

        $items.eq(i).addClass("active");
        $panels.eq(i).addClass("active");
      });
    });


    /* ======================================================
       검색 기능 추가
       ====================================================== */

    const $btnSearchOpen = $header.find(".m_header_search_btn");
    const $searchLayer = $header.find(".m_header_search_layer");
    const $btnSearchClose = $header.find(".m_header_search_close_btn");
    const $inputSearch = $header.find(".m_header_search_input");

    /* 검색창 열기 */
    $btnSearchOpen.on("click", function (e) {
      e.preventDefault();

      $header.removeClass("is_open");  // 메뉴 닫기
      $header.addClass("is_search");   // 검색모드 ON

      $searchLayer.attr("aria-hidden", "false");

      setTimeout(function () {
        $inputSearch.focus();
      }, 10);
    });


    /* 검색창 닫기 */
    $btnSearchClose.on("click", function () {
      $header.removeClass("is_search");
      $searchLayer.attr("aria-hidden", "true");
    });


    /* ESC 키로 닫기 */
    $(document).on("keydown", function (e) {
      if (e.key === "Escape" && $header.hasClass("is_search")) {
        $header.removeClass("is_search");
        $searchLayer.attr("aria-hidden", "true");
      }
    });

  }

  /* search_box active toggle */
  const $searchInputs = $(".search_box input[type='search'], .search_box input[type='text']");

  function updateSearchBoxActive($input) {
    const hasValue = $.trim($input.val()).length > 0;
    $input.closest(".search_box").toggleClass("active", hasValue);
  }

  $searchInputs.each(function () {
    updateSearchBoxActive($(this));
  });

  $searchInputs.on("input change keyup paste", function () {
    updateSearchBoxActive($(this));
  });

  /* 광고 배너 양옆 평균색 */

  function avgColor(ctx, x, h) {
    const data = ctx.getImageData(x, 0, 1, h).data;
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      a += data[i + 3];
    }

    r = Math.round(r / h);
    g = Math.round(g / h);
    b = Math.round(b / h);
    a = Math.round(a / h);

    return "rgba(" + r + "," + g + "," + b + "," + (a / 255).toFixed(3) + ")";
  }


  $(".wid_banner.all_view").each(function () {

    const el = this;
    const img = $(this).find("img")[0];
    if (!img) return;

    function run() {

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!w || !h) return;

      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;

      const ctx = c.getContext("2d", { willReadFrequently: true });

      try {

        ctx.drawImage(img, 0, 0, w, h);

        el.style.setProperty("--wb-left", avgColor(ctx, 0, h));
        el.style.setProperty("--wb-right", avgColor(ctx, w - 1, h));

      } catch (e) {
        console.warn("CORS error", e);
      }
    }

    if (img.complete) run();
    else $(img).one("load", run);

  });

});