const blackrussia = document.getElementById('blackrussia');
const menu = document.getElementById('menu');
const accountsBtn = document.getElementById('accountsBtn');
const itemsBtn = document.getElementById('itemsBtn');
const products = document.getElementById('products');
const notification = document.getElementById('notification');
const errorSound = document.getElementById('errorSound');

let notificationTimeout;

const productList = [
    {name: 'Аккаунт 1', desc: 'Редкий аккаунт с бонусами', img: 'images/account1.png'},
    {name: 'Аккаунт 2', desc: 'Уровень 50, скин пак', img: 'images/account2.png'},
    {name: 'Аккаунт 3', desc: 'Готов к PvP', img: 'images/account3.png'}
];

blackrussia.addEventListener('click', () => {
    menu.classList.remove('hidden');
    products.classList.add('hidden');
});

itemsBtn.addEventListener('click', () => {
    clearTimeout(notificationTimeout);
    notification.classList.add('show');
    errorSound.play();
    notificationTimeout = setTimeout(() => notification.classList.remove('show'), 3000);
});

accountsBtn.addEventListener('click', () => {
    products.innerHTML = '';
    products.classList.remove('hidden');

    productList.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <strong>${p.name}</strong>
                <p>${p.desc}</p>
            </div>
            <button>Подробнее</button>
        `;
        products.appendChild(div);
    });
});
