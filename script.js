const menu = document.getElementById('menu');
const blackrussia = document.getElementById('blackrussia');
const accountsBtn = document.getElementById('accountsBtn');
const itemsBtn = document.getElementById('itemsBtn');
const notification = document.getElementById('notification');
const errorSound = document.getElementById('errorSound');
const products = document.getElementById('products');

const productList = [
    {name: 'Аккаунт 1', desc: 'Краткое описание 1', img: 'https://via.placeholder.com/60'},
    {name: 'Аккаунт 2', desc: 'Краткое описание 2', img: 'https://via.placeholder.com/60'},
    {name: 'Аккаунт 3', desc: 'Краткое описание 3', img: 'https://via.placeholder.com/60'}
];

// Открытие меню при клике на игру
blackrussia.addEventListener('click', () => {
    menu.style.display = 'block';
    menu.classList.remove('expanded');
    products.style.display = 'none';
});

// Игровые ценности → уведомление с ошибкой
itemsBtn.addEventListener('click', () => {
    notification.style.display = 'block';
    errorSound.play();
    setTimeout(() => { notification.style.display = 'none'; }, 3000);
});

// Аккаунты → увеличенное меню со списком товаров
accountsBtn.addEventListener('click', () => {
    menu.classList.add('expanded');
    products.style.display = 'block';
    products.innerHTML = '';
    productList.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.img}" alt="">
            <div>
                <strong>${p.name}</strong>
                <p>${p.desc}</p>
            </div>
            <button>Подробнее</button>
        `;
        products.appendChild(div);
    });
});
