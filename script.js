const backgrounds = [
  // Пример фоновых данных с категориями и серверами
  { file: "krdaccount.png", name: "Krasnodar - 15₽", arg: "krd1", category: ["accounts_blackrussia"], servers: ["KRASNODAR"] },
  { file: "br_account1.png", name: "Аккаунт 2", arg: "minecraft1", category: ["accounts_blackrussia"], servers: ["RED","YELLOW"] },
  { file: "br_account1.png", name: "Аккаунт - 3", arg: "Danivak50_1", category: ["accounts_blackrussia"], servers: ["RED","GREEN"] },
  { file: "br_account1.png", name: "Аккаунт - 4", arg: "Danivak50_2", category: ["accounts_blackrussia"], servers: ["KRASNODAR"] },
  { file: "br_account1.png", name: "Аккаунт - 5", arg: "lizka_1", price: 17000, category: ["accounts_blackrussia"], servers: ["RED","BLUE","GREEN"] },
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
let selectedServer = "all"; // сервер для фильтра

// --- Галерея ---
function renderGallery() {
  gallery.innerHTML = "";
  const searchText = searchInput.value.toLowerCase().trim();
  
  const filtered = backgrounds.filter(bg =>
    (currentCategory === "all" || bg.category.includes(currentCategory)) &&
    (selectedServer === "all" || (bg.servers && bg.servers.includes(selectedServer))) &&
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
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}" data-arg="${bg.arg}"><p>${bg.name}</p>`;
    gallery.appendChild(card);
    setTimeout(() => card.classList.add("show"), 50);

    card.querySelector("img").addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = bg.file;
      overlayImage.style.transform = "scale(1)";
      overlay.classList.remove("hidden");

      if ("price" in bg && bg.price > 0) {
        overlayInfo.innerHTML = `
          <h3>${bg.name}</h3>
          <hr>
          <p><b>💰 Цена:</b> ${bg.price.toLocaleString("ru-RU")} 🌱</p>
          <p><b>💳 Способ оплаты:</b> Семена</p>
        `;
      } else {
        overlayInfo.innerHTML = `<h3>${bg.name}</h3>`;
      }
      overlayInfo.classList.remove("hidden");
      setTimeout(() => overlayInfo.classList.add("show"), 50);
    });
  });
}

searchInput.addEventListener("input", renderGallery);

// --- Открытие кастомизации ---
openBtn.addEventListener("click", () => {
  openBtn.style.opacity = "0";
  setTimeout(() => openBtn.classList.add("hidden"), 400);

  title.style.transform = window.innerWidth < 600 ? "translateY(-80px)" : "translateY(-180px)";
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

// --- Фильтр категорий ---
filterBtn.addEventListener("click", () => filterOptions.classList.toggle("show"));

document.querySelectorAll(".filter-option").forEach(btn => {
  btn.addEventListener("click", () => {
    if(btn.id !== "serverBtn") { // обычные категории
      currentCategory = btn.dataset.category;
      renderGallery();
      filterOptions.classList.remove("show");
    }
  });
});

// --- Фильтр серверов ---
serverBtn.addEventListener("click", () => serverList.classList.toggle("show"));

document.querySelectorAll(".server-option").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedServer = btn.dataset.server;
    renderGallery();
    serverList.classList.remove("show");
    filterOptions.classList.remove("show");
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

// --- Установка фона ---
setBtn.addEventListener("click", () => {
  if (selectedArg) {
    window.location.href = `https://t.me/FernieUIBot?start=CustF${selectedArg}`;
  }
});
