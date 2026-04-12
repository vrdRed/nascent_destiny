// main.js — управление iframe, картами, гранатами и пагинацией
document.addEventListener('DOMContentLoaded', () => {
    const mapButtons = document.querySelectorAll('[data-map]');
    const grenadeButtons = document.querySelectorAll('[data-grenade]');
    const pageFrame = document.getElementById('page-frame');
    const paginationContainer = document.getElementById('positions-pagination');
    const paginationButtons = document.getElementById('pagination-buttons');
    const paginationCounter = document.getElementById('pagination-counter');
    
    let currentMap = 'mirage';
    let currentGrenade = 'smoke';
    let currentPositionsCount = 0;
    let currentIndex = 0;
    // Добавляем массив для хранения кратких названий, полученных из iframe
    let currentShortTitles = [];
    
    // Функция для создания кнопок пагинации
    function renderPaginationButtons(count, activeIndex, titles = []) {
        if (!paginationButtons) return;
        
        if (count === 0) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'block';
        paginationCounter.textContent = `${count} ${getGrenadeWord(count)}`;
        
        let html = '';
        for (let i = 0; i < count; i++) {
            const isActive = i === activeIndex;
            // Используем shortTitle если он есть, иначе fallback на номер
            const buttonText = (titles && titles[i]) ? titles[i] : (i + 1).toString();
            html += `<button class="pagination-btn ${isActive ? 'active' : ''}" data-index="${i}">${buttonText}</button>`;
        }
        paginationButtons.innerHTML = html;
        
        // Добавляем обработчики на кнопки
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                currentIndex = index;
                
                // Обновляем активную кнопку
                document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Отправляем сообщение в iframe
                if (pageFrame && pageFrame.contentWindow) {
                    pageFrame.contentWindow.postMessage({
                        type: 'changePosition',
                        index: index
                    }, '*');
                }
            });
        });
    }
    
    function getGrenadeWord(count) {
        if (count === 1) return 'раскидка';
        if (count >= 2 && count <= 4) return 'раскидки';
        return 'раскидок';
    }
    
    // Функция для подстройки высоты iframe под содержимое
    function adjustIframeHeight() {
        if (pageFrame && pageFrame.contentWindow && pageFrame.contentDocument) {
            try {
                const contentHeight = pageFrame.contentDocument.body.scrollHeight;
                if (contentHeight > 0) {
                    pageFrame.style.height = contentHeight + 'px';
                }
            } catch (e) {
                console.warn('Не удалось получить высоту содержимого iframe', e);
            }
        }
    }
    
    // Функция загрузки страницы карты с параметром гранаты
    function loadPage() {
        let url = '';
        switch(currentMap) {
            case 'mirage': url = `pages/mirage.html?grenade=${currentGrenade}`; break;
            case 'dust2': url = `pages/dust2.html?grenade=${currentGrenade}`; break;
            case 'anubis': url = `pages/anubis.html?grenade=${currentGrenade}`; break;
            case 'ancient': url = `pages/ancient.html?grenade=${currentGrenade}`; break;
            case 'overpass': url = `pages/overpass.html?grenade=${currentGrenade}`; break;
            case 'nuke': url = `pages/nuke.html?grenade=${currentGrenade}`; break;
            case 'inferno': url = `pages/inferno.html?grenade=${currentGrenade}`; break;
            case 'train': url = `pages/train.html?grenade=${currentGrenade}`; break;
            case 'vertigo': url = `pages/vertigo.html?grenade=${currentGrenade}`; break;
            default: url = `pages/mirage.html?grenade=${currentGrenade}`;
        }
        
        currentIndex = 0;
        currentShortTitles = []; // Сбрасываем заголовки при загрузке новой страницы
        
        if (pageFrame) {
            pageFrame.style.opacity = '0.5';
            pageFrame.src = url;
            pageFrame.onload = () => {
                pageFrame.style.opacity = '1';
                // Даём немного времени на рендеринг внутри iframe
                setTimeout(adjustIframeHeight, 50);
                // Периодически проверяем высоту на случай изменений
                setTimeout(adjustIframeHeight, 300);
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
    
    // Обработчик сообщений от iframe
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'updatePagination') {
            currentPositionsCount = event.data.positionsCount;
            currentIndex = event.data.currentIndex;
            // Сохраняем полученные заголовки
            if (event.data.titles) {
                currentShortTitles = event.data.titles;
            }
            renderPaginationButtons(currentPositionsCount, currentIndex, currentShortTitles);
            
            // После обновления данных подстраиваем высоту
            setTimeout(adjustIframeHeight, 50);
        } else if (event.data && event.data.type === 'contentHeight') {
            // Получаем высоту содержимого из iframe
            if (pageFrame && event.data.height) {
                pageFrame.style.height = event.data.height + 'px';
            }
        }
    });
    
    // Обработчики для карт
    mapButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentMap = btn.getAttribute('data-map');
            updateActiveMapButtons();
            loadPage();
        });
    });
    
    // Обработчики для гранат
    grenadeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentGrenade = btn.getAttribute('data-grenade');
            updateActiveGrenadeButtons();
            
            // Отправляем сообщение в iframe о смене гранаты
            if (pageFrame && pageFrame.contentWindow) {
                pageFrame.contentWindow.postMessage({
                    type: 'changeGrenade',
                    grenade: currentGrenade
                }, '*');
            }
            
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
    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'fullscreen-content';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt || 'Полноэкранное изображение';
    img.className = 'fullscreen-image';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'fullscreen-close';
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Закрыть (ESC)';
    
    const caption = document.createElement('div');
    caption.className = 'fullscreen-caption';
    caption.textContent = imageAlt || '';
    
    modalContent.appendChild(img);
    modalContent.appendChild(caption);
    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeBtn) {
            closeFullscreen(modal);
        }
    });
    
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeFullscreen(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    return modal;
}

function closeFullscreen(modal) {
    if (!modal) return;
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = '';
    }, 300);
}
