const blackrussia = document.getElementById('blackrussia');
const menu = document.getElementById('menu');
const accountsBtn = document.getElementById('accountsBtn');
const filterContainer = document.getElementById('filterContainer');
const filterBtn = document.getElementById('filterBtn');
const serverMenu = document.getElementById('serverMenu');
const serverBtn = document.getElementById('serverBtn');
const serverList = document.getElementById('serverList');
const products = document.getElementById('products');

// Список серверов
const servers = [
  "Сервер №1 | RED", "Сервер №2 | GREEN", "Сервер №3 | BLUE", "Сервер №4 | YELLOW",
  "Сервер №5 | ORANGE", "Сервер №6 | PURPLE", "Сервер №7 | LIME", "Сервер №8 | PINK",
  "Сервер №9 | CHERRY", "Сервер №10 | BLACK" // ... дальше можно добавить все 89 серверов
];

// Пример товаров для всех серверов
const allProducts = Array.from({length: 20}, (_, i) => ({
    name: `Товар ${i+1}`,
    img: `images/product${i+1}.png`
}));

blackrussia.addEventListener('click', () => {
    menu.classList.remove('hidden');
    products.classList.add('hidden');
    filterContainer.classList.add('hidden');
});

accountsBtn.addEventListener('click', () => {
    filterContainer.classList.remove('hidden');
    displayProducts(allProducts);
});

filterBtn.addEventListener('click', () => {
    serverMenu.classList.toggle('hidden');
    serverList.classList.add('hidden');
});

serverBtn.addEventListener('click', () => {
    serverList.classList.toggle('hidden');
    if (serverList.innerHTML === '') {
        servers.forEach(server => {
            const btn = document.createElement('button');
            btn.textContent = server;
            btn.addEventListener('click', () => {
                serverList.classList.add('hidden');
                serverMenu.classList.add('hidden');
                // Фильтруем товары по серверу (для примера просто показываем все)
                displayProducts(allProducts, server);
            });
            serverList.appendChild(btn);
        });
    }
});

function displayProducts(productsArray, server) {
    products.innerHTML = '';
    products.classList.remove('hidden');
    productsArray.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <strong>${p.name}</strong>
        `;
        products.appendChild(div);
    });
}
