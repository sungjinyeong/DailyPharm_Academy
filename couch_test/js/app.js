(function () {
        var cubes = Array.prototype.slice.call(document.querySelectorAll(".board_row .cube"));
        var totalEl = document.querySelector(".total_count");
        var remainEl = document.querySelector(".remain_count");
        var historyList = document.querySelector(".history_list");
        var rankText = document.querySelector(".high_rank_text");
        var modal = document.querySelector(".reveal_modal");
        var closeBtn = document.querySelector(".reveal_close");
        var revealCard = document.querySelector(".reveal_card");
        var revealCover = document.querySelector(".reveal_cover");
        var revealBar = document.querySelector(".reveal_bar");
        var revealNum = document.querySelector(".reveal_num");
        var winModal = document.querySelector(".win_modal");
        var winClose = document.querySelector(".win_close");
        var winSubtitle = document.querySelector(".win_subtitle");
        var wrap = document.querySelector(".wrap");
        var appShell = document.querySelector(".app_shell");
        var resizeHandle = document.querySelector(".resize_handle");
        var currentId = null;
        var progress = 0;
        var prizeMap = {};

        cubes.forEach(function (cube, i) {
          cube.dataset.id = String(i + 1);
          if (cube.classList.contains("opened")) {
            cube.textContent = String(i + 1);
          }
        });

        Array.prototype.slice.call(document.querySelectorAll(".product_name")).forEach(function (el) {
          var text = el.textContent.trim();
          var noMatch = text.match(/(\d+)\s*번/);
          var headMatch = text.match(/^\s*(\d+)\s*\./);
          var cardNo = noMatch ? Number(noMatch[1]) : headMatch ? Number(headMatch[1]) : NaN;
          if (Number.isFinite(cardNo) && cardNo > 0) {
            prizeMap[cardNo] = text;
          }
        });

        function getOpenedCount() {
          return document.querySelectorAll(".board_row .cube.opened").length;
        }

        function updateRemain() {
          totalEl.textContent = String(cubes.length);
          remainEl.textContent = String(cubes.length - getOpenedCount());
        }

        function setProgress(v) {
          progress = Math.max(0, Math.min(1, v));
          var w = Math.max(1, revealCard.getBoundingClientRect().width);
          revealCover.style.transform = "translateX(" + (progress * w).toFixed(2) + "px)";
          revealBar.style.width = Math.round(progress * 100) + "%";
        }

        function setModalActive(el, isActive) {
          if (!el) return;
          el.classList.toggle("active", !!isActive);
          el.setAttribute("aria-hidden", isActive ? "false" : "true");
        }

        function closeModal() {
          setModalActive(modal, false);
          currentId = null;
          setProgress(0);
        }

        function showWinPopup(cardId) {
          var productTitle = prizeMap[cardId];
          if (!productTitle) return;
          winSubtitle.textContent = cardId + "번 - " + productTitle;
          setModalActive(winModal, true);
        }

        function closeWinPopup() {
          setModalActive(winModal, false);
          winSubtitle.textContent = "";
        }

        function addHistory(cardId) {
          var now = new Date();
          var hh = String(now.getHours()).padStart(2, "0");
          var mm = String(now.getMinutes()).padStart(2, "0");
          var ss = String(now.getSeconds()).padStart(2, "0");
          var li = document.createElement("li");
          li.className = "history_item";
          li.innerHTML = "<span>랜덤뽑기</span><span>" + cardId + "번</span><span>" + hh + ":" + mm + ":" + ss + "</span>";
          historyList.insertBefore(li, historyList.firstChild);
        }

        function updateRankText(cardId) {
          var arr = rankText.textContent.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
          arr = arr.filter(function (v) { return v !== String(cardId); });
          rankText.textContent = arr.length ? arr.join(", ") : "없음";
        }

        function confirmOpen(cardId) {
          var target = cubes[cardId - 1];
          if (!target || target.classList.contains("opened")) return;
          target.classList.add("opened");
          target.textContent = String(cardId);
          addHistory(cardId);
          updateRankText(cardId);
          updateRemain();
          if (prizeMap[cardId]) {
            setTimeout(function () {
              showWinPopup(cardId);
            }, 170);
          }
        }

        cubes.forEach(function (cube) {
          cube.addEventListener("click", function () {
            if (cube.classList.contains("opened")) return;
            currentId = Number(cube.dataset.id);
            revealNum.textContent = String(currentId);
            setModalActive(modal, true);
            setProgress(0);
          });
        });

        var dragging = false;
        var pointerId = null;
        var startX = 0;
        var startP = 0;
        var baseW = 1;

        revealCover.addEventListener("pointerdown", function (e) {
          if (currentId == null) return;
          if (e.pointerType === "mouse" && e.button !== 0) return;
          dragging = true;
          pointerId = e.pointerId;
          startX = e.clientX;
          startP = progress;
          baseW = Math.max(1, revealCard.getBoundingClientRect().width);
          revealCover.setPointerCapture(e.pointerId);
          e.preventDefault();
        });

        revealCover.addEventListener("pointermove", function (e) {
          if (!dragging || e.pointerId !== pointerId) return;
          setProgress(startP + (e.clientX - startX) / baseW);
        });

        function endDrag(e) {
          if (!dragging || e.pointerId !== pointerId) return;
          dragging = false;
          pointerId = null;
          if (progress >= 0.985) {
            setProgress(1);
            confirmOpen(currentId);
            setTimeout(closeModal, 160);
          } else {
            setProgress(0);
          }
        }

        revealCover.addEventListener("pointerup", endDrag);
        revealCover.addEventListener("pointercancel", endDrag);

        modal.addEventListener("click", function (e) {
          if (e.target && e.target.getAttribute("data_modal_close") === "1") closeModal();
        });
        closeBtn.addEventListener("click", closeModal);
        winModal.addEventListener("click", function (e) {
          if (e.target && e.target.getAttribute("data_modal_close") === "1") closeWinPopup();
        });
        winClose.addEventListener("click", closeWinPopup);

        var resizeTarget = appShell || wrap;
        if (resizeTarget && resizeHandle) {
          var resizing = false;
          var resizePointerId = null;
          var startClientX = 0;
          var startWidth = 0;
          var minW = 800;
          var maxW = 1200;

          function clampWidth(v) {
            return Math.max(minW, Math.min(maxW, v));
          }

          resizeHandle.addEventListener("pointerdown", function (e) {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            resizing = true;
            resizePointerId = e.pointerId;
            startClientX = e.clientX;
            startWidth = resizeTarget.getBoundingClientRect().width;
            resizeHandle.setPointerCapture(e.pointerId);
            e.preventDefault();
          });

          resizeHandle.addEventListener("pointermove", function (e) {
            if (!resizing || e.pointerId !== resizePointerId) return;
            var next = clampWidth(startWidth + (e.clientX - startClientX));
            resizeTarget.style.width = next + "px";
          });

          function stopResize(e) {
            if (!resizing || e.pointerId !== resizePointerId) return;
            resizing = false;
            resizePointerId = null;
          }

          resizeHandle.addEventListener("pointerup", stopResize);
          resizeHandle.addEventListener("pointercancel", stopResize);
        }
        updateRemain();
      })();

