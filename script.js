const backgrounds = [
  { 
    file: "chelaccount.png", 
    name: "🌆 lvl: 6 | Chelyabinsk #46 — 65₽ 💸", 
    arg: "chel1", 
    category: ["accounts_blackrussia"],
    verification: true,
    description: `
<p>🌸 <b>Игровой аккаунт BlackRussia</b></p>
<p>✨ <b>Сервер:</b> BlackRussia Chelyabinsk #46</p>
<p>💎 <b>Краткое описание товара:</b></p>
<p>🎯 <b>Уровень:</b> 6</p>
<p>💰 <b>Баланс:</b> 207.763₽</p>
<p>🪙 <b>BlackCoins:</b> 12</p>
<p>🏠 <b>Общая стоимость имущества:</b> ~210.000₽</p>
<p>🎒 <b>Аксессуары и скины:</b> «Зимний Шарф», «Маска Лик Смерти», «Мишаня Хулиган»</p>
<p>⚒️ <b>Добыча:</b> VIP Статус (6 шт.), BlackPass: 6 lvl</p>
<p>🔒 <b>Привязки:</b> Telegram (данные к аккаунту утеряны — привязка не действительна)</p>
<p>⏰ <b>Время на проверку:</b> 12 часов</p>
    `,
    servers: ["CHELYABINSK"]
  },
];

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

    if (bg.verification) {
      const badge = document.createElement("div");
      badge.className = "verified-icon";
      card.querySelector(".image-wrapper").appendChild(badge);
    }

    card.querySelector("img").addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = bg.file;
      overlayImage.style.transform = "scale(1)";
      overlay.classList.remove("hidden");

      overlayInfo.innerHTML = bg.description;
      overlayInfo.classList.remove("hidden");
      setTimeout(() => overlayInfo.classList.add("show"), 50);

      if (bg.verification) {
        const verifyBadge = document.createElement("div");
        verifyBadge.className = "verify-banner";
        verifyBadge.innerHTML = `
          <div class="verify-icon"></div>
          <span>Проверено</span>
        `;
        overlayInfo.prepend(verifyBadge);

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

        verifyBadge.addEventListener("mouseleave", () => tooltip.classList.remove("show"));

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
            popup.querySelector(".verify-close").addEventListener("click", () => popup.remove());
          }
        });
      }
    });
  });
}
