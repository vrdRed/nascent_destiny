// main.js — управление iframe, картами и гранатами
document.addEventListener('DOMContentLoaded', () => {
    const mapButtons = document.querySelectorAll('[data-map]');
    const grenadeButtons = document.querySelectorAll('[data-grenade]');
    const pageFrame = document.getElementById('page-frame');
    
    let currentMap = 'mirage';
    let currentGrenade = 'smoke';
    
    // Функция загрузки страницы карты с параметром гранаты
    function loadPage() {
        let url = '';
        switch(currentMap) {
            case 'mirage':
                url = `pages/mirage.html?grenade=${currentGrenade}`;
                break;
            case 'dust2':
                url = `pages/dust2.html?grenade=${currentGrenade}`;
                break;
            case 'anubis':
                url = `pages/anubis.html?grenade=${currentGrenade}`;
                break;
            case 'ancient':
                url = `pages/ancient.html?grenade=${currentGrenade}`;
                break;
            case 'overpass':
                url = `pages/overpass.html?grenade=${currentGrenade}`;
                break;
            case 'nuke':
                url = `pages/nuke.html?grenade=${currentGrenade}`;
                break;
            case 'inferno':
                url = `pages/inferno.html?grenade=${currentGrenade}`;
                break;
            case 'train':
                url = `pages/train.html?grenade=${currentGrenade}`;
                break;
            case 'vertigo':
                url = `pages/vertigo.html?grenade=${currentGrenade}`;
                break;
            default:
                url = `pages/mirage.html?grenade=${currentGrenade}`;
        }
        
        // Добавляем эффект плавной замены
        if (pageFrame) {
            pageFrame.style.opacity = '0.5';
            pageFrame.src = url;
            pageFrame.onload = () => {
                pageFrame.style.opacity = '1';
            };
        }
    }
    
    // Обновление активных кнопок карт
    function updateActiveMapButtons() {
        mapButtons.forEach(btn => {
            if (btn.getAttribute('data-map') === currentMap) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Обновление активных кнопок гранат
    function updateActiveGrenadeButtons() {
        grenadeButtons.forEach(btn => {
            if (btn.getAttribute('data-grenade') === currentGrenade) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Обработчики для карт
    mapButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentMap = btn.getAttribute('data-map');
            updateActiveMapButtons();
            loadPage();
        });
    });
    
    // Обработчики для гранат
    grenadeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentGrenade = btn.getAttribute('data-grenade');
            updateActiveGrenadeButtons();
            loadPage();
        });
    });
    
    // Устанавливаем начальные активные кнопки
    updateActiveMapButtons();
    updateActiveGrenadeButtons();
    
    // Загружаем начальную страницу
    loadPage();
});

// Функция для открытия изображения на весь экран
function openFullscreen(imageSrc, imageAlt) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    
    // Создаем контейнер для изображения
    const modalContent = document.createElement('div');
    modalContent.className = 'fullscreen-content';
    
    // Создаем изображение
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt || 'Полноэкранное изображение';
    img.className = 'fullscreen-image';
    
    // Создаем кнопку закрытия
    const closeBtn = document.createElement('button');
    closeBtn.className = 'fullscreen-close';
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Закрыть (ESC)';
    
    // Создаем подпись
    const caption = document.createElement('div');
    caption.className = 'fullscreen-caption';
    caption.textContent = imageAlt || '';
    
    // Добавляем элементы в модальное окно
    modalContent.appendChild(img);
    modalContent.appendChild(caption);
    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    
    // Добавляем модальное окно на страницу
    document.body.appendChild(modal);
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
    
    // Закрытие по клику на фон или кнопку закрытия
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeBtn) {
            closeFullscreen(modal);
        }
    });
    
    // Закрытие по клавише ESC
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeFullscreen(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // Плавное появление
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Возвращаем функцию закрытия
    return modal;
}

// Функция закрытия полноэкранного режима
function closeFullscreen(modal) {
    if (!modal) return;
    
    modal.classList.remove('active');
    
    // Удаляем модальное окно после анимации
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = '';
    }, 300);
}