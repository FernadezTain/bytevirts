const backgrounds = [
  { 
    file: "chelaccount.png", 
    name: "🌆 lvl: 6 | Chelyabinsk #46 — 65₽ 💸", 
    arg: "chel1", 
    category: ["accounts_blackrussia"],
    verification: true, // ✅ Проверено
    description: `
🌸 <b>Игровой аккаунт BlackRussia</b>
✨ <b>Сервер:</b> BlackRussia Chelyabinsk #46  
💎 <b>Краткое описание товара:</b>
🎯 <b>Уровень:</b> 6
💰 <b>Баланс:</b> 207.763₽  
🪙 <b>BlackCoins:</b> 12  
🏠 <b>Общая стоимость имущества:</b> ~210.000₽  
🎒 <b>Аксессуары и скины:</b> «Зимний Шарф», «Маска Лик Смерти», «Мишаня Хулиган»  
⚒️ <b>Добыча:</b> VIP Статус (6 шт.), BlackPass: 6 lvl  
🔒 <b>Привязки:</b> Telegram 
(данные к аккаунту утеряны — привязка не действительна)  
⏰ <b>Время на проверку:</b> 12 часов  
    `,
    servers: ["CHELYABINSK"]
  },
];

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const gallery = document.getElementById("gallery");
const title = document.getElementById("title");

const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const overlayInfo = document.getElementById("overlayInfo");
const setBtn = document.getElementById("setBtn");
const closeBtn = document.getElementById("closeBtn");

const filterContainer = document.getElementById("filterContainer");
const filterBtn = document.getElementById("filterBtn");
const filterOptions = document.getElementById("filterOptions");
const searchInput = document.getElementById("searchInput");

const serverBtn = document.getElementById("serverBtn");
const serverList = document.getElementById("serverList");

let selectedArg = "";
let currentCategory = "all";

// --- Галерея ---
function renderGallery() {
  gallery.innerHTML = "";
  const searchText = searchInput.value.toLowerCase().trim();

  const filtered = backgrounds.filter(bg =>
    (currentCategory === "all" || bg.category.includes(currentCategory) || (bg.servers && bg.servers.includes(currentCategory))) &&
    bg.name.toLowerCase().includes(searchText)
  );

  if (filtered.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Ничего не найдено :(";
    msg.className = "no-results";
    gallery.appendChild(msg);
    setTimeout(() => msg.classList.add("show"), 50);
    return;
  }

  filtered.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card fade";
    card.innerHTML = `
      <div class="image-wrapper">
        <img src="${bg.file}" alt="${bg.name}" data-arg="${bg.arg}">
      </div>
      <p>${bg.name}</p>
    `;

    gallery.appendChild(card);
    setTimeout(() => card.classList.add("show"), 50);

    // ✅ Добавляем галочку на карточку, если товар проверен
    if (bg.verification) {
      const badge = document.createElement("div");
      badge.className = "verified-icon";
      card.querySelector(".image-wrapper").appendChild(badge);
    }

    // --- Открытие оверлея ---
    card.querySelector("img").addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = bg.file;
      overlayImage.style.transform = "scale(1)";
      overlay.classList.remove("hidden");

      overlayInfo.innerHTML = bg.description;
      overlayInfo.classList.remove("hidden");
      setTimeout(() => overlayInfo.classList.add("show"), 50);

      // ✅ Баннер проверки, тултип и мобильный попап
      if (bg.verification) {
        const verifyBadge = document.createElement("div");
        verifyBadge.className = "verify-banner";
        verifyBadge.innerHTML = `
          <div class="verify-icon"></div>
          <span>Проверено</span>
        `;
        overlayInfo.prepend(verifyBadge);

        // --- ПК: тултип ---
        const tooltip = document.createElement("div");
        tooltip.className = "verify-tooltip";
        tooltip.textContent = "Товар проверен администрацией сайта. Все данные достоверны.";
        document.body.appendChild(tooltip);

        verifyBadge.addEventListener("mouseenter", () => {
          tooltip.classList.add("show");
          const rect = verifyBadge.getBoundingClientRect();
          tooltip.style.left = rect.left + rect.width / 2 + "px";
          tooltip.style.top = rect.top - 10 + "px";
        });

        verifyBadge.addEventListener("mouseleave", () => {
          tooltip.classList.remove("show");
        });

        // --- Мобильное всплывающее окно ---
        verifyBadge.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            const popup = document.createElement("div");
            popup.className = "verify-popup";
            popup.innerHTML = `
              <div class="verify-popup-content">
                <p>Товар проверен администрацией сайта.<br>Все данные достоверны.</p>
                <button class="verify-close">Отлично!</button>
              </div>
            `;
            document.body.appendChild(popup);

            popup.querySelector(".verify-close").addEventListener("click", () => {
              popup.remove();
            });
          }
        });
      }
    });
  });
}

searchInput.addEventListener("input", renderGallery);

// --- Открытие кастомизации ---
openBtn.addEventListener("click", () => {
  openBtn.style.opacity = "0";
  setTimeout(() => openBtn.classList.add("hidden"), 400);

  if (window.innerWidth < 600) title.style.transform = "translateY(-80px)";
  else title.style.transform = "translateY(-180px)";
  title.style.fontSize = "22px";

  renderGallery();
  gallery.classList.add("show");
  gallery.classList.remove("hidden");

  backBtn.classList.remove("hidden");
  filterContainer.classList.remove("hidden");

  if (window.innerWidth < 600) searchInput.focus();
});

backBtn.addEventListener("click", () => {
  gallery.classList.remove("show");
  setTimeout(() => {
    gallery.classList.add("hidden");
    gallery.innerHTML = "";
  }, 400);

  backBtn.classList.add("hidden");
  filterContainer.classList.add("hidden");

  title.style.transform = "translateY(0)";
  title.style.fontSize = "28px";

  openBtn.classList.remove("hidden");
  setTimeout(() => { openBtn.style.opacity = "1"; }, 100);

  window.scrollTo({ top: 0, behavior: "smooth" });
});

filterBtn.addEventListener("click", () => filterOptions.classList.toggle("show"));
document.querySelectorAll(".filter-option").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.id !== "serverBtn") {
      currentCategory = btn.dataset.category;
      filterOptions.classList.remove("show");
      renderGallery();
    }
  });
});

// --- Меню серверов ---
serverBtn.addEventListener("click", () => {
  serverList.classList.toggle("show");
});

document.querySelectorAll(".server-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const server = btn.dataset.server;
    currentCategory = server;
    renderGallery();
    filterOptions.classList.remove("show");
    serverList.classList.remove("show");
  });
});

// --- Закрытие оверлея ---
closeBtn.addEventListener("click", () => {
  overlayImage.style.transform = "scale(1)";
  overlayInfo.classList.remove("show");
  setTimeout(() => {
    overlay.classList.add("hidden");
    overlayInfo.classList.add("hidden");
    overlayInfo.innerHTML = "";
  }, 300);
});

setBtn.addEventListener("click", () => {
  if (selectedArg) {
    window.location.href = `https://t.me/ByteVirts_bot?start=product${selectedArg}`;
  }
});
