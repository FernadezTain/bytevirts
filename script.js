const menu = document.getElementById('menu');
const blackrussia = document.getElementById('blackrussia');
const accountsBtn = document.getElementById('accountsBtn');
const itemsBtn = document.getElementById('itemsBtn');
const notification = document.getElementById('notification');
const errorSound = document.getElementById('errorSound');
const products = document.getElementById('products');

let notificationTimeout;

const productList = [
    {name: 'Аккаунт 1', desc: 'Краткое описание 1', img: 'images/account1.png'},
    {name: 'Аккаунт 2', desc: 'Краткое описание 2', img: 'images/account2.png'},
    {name: 'Аккаунт 3', desc: 'Краткое описание 3', img: 'images/account3.png'}
];

blackrussia.addEventListener('click', () => {
    menu.style.display = 'block';
    menu.classList.remove('expanded');
    products.style.display = 'none';
});

itemsBtn.addEventListener('click', () => {
    clearTimeout(notificationTimeout);
    notification.style.display = 'block';
    notification.style.opacity = '1';
    errorSound.play();
    notificationTimeout = setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => { notification.style.display = 'none'; }, 300);
    }, 3000);
});

accountsBtn.addEventListener('click', () => {
    menu.classList.add('expanded');
    products.style.display = 'block';
    products.innerHTML = '';
    productList.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div>
                <strong>${p.name}</strong>
                <p>${p.desc}</p>
            </div>
            <button>Подробнее</button>
        `;
        products.appendChild(div);
    });
});
