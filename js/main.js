// main.js — управление iframe, картами, гранатами и пагинацией
document.addEventListener('DOMContentLoaded', () => {
    const mapButtons = document.querySelectorAll('[data-map]');
    const grenadeButtons = document.querySelectorAll('[data-grenade]');
    const pageFrame = document.getElementById('page-frame');
    const paginationContainer = document.getElementById('positions-pagination');
    const paginationButtons = document.getElementById('pagination-buttons');
    const paginationCounter = document.getElementById('pagination-counter');
    const paginationTabs = document.getElementById('pagination-tabs');
    
    let currentMap = 'mirage';
    let currentGrenade = 'smoke';
    let currentPositionsCount = 0;
    let currentIndex = 0;
    let currentShortTitles = [];
    let isSmoke = false;
    let currentSmokeTab = 'regular';
    let smokeTabButtons = [];
    
    function createSmokeTabs() {
        if (!paginationTabs) return;
        
        paginationTabs.style.display = 'flex';
        paginationTabs.innerHTML = `
            <button class="pagination-tab active" data-tab="regular">Обычные</button>
            <button class="pagination-tab" data-tab="instant">Instant (Инста)</button>
        `;
        
        smokeTabButtons = document.querySelectorAll('.pagination-tab');
        smokeTabButtons.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.getAttribute('data-tab');
                
                // Обновляем активную вкладку
                smokeTabButtons.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                currentSmokeTab = tabType;
                
                // Сбрасываем индекс
                currentIndex = 0;
                
                // Отправляем сообщение в iframe о смене вкладки
                if (pageFrame && pageFrame.contentWindow) {
                    pageFrame.contentWindow.postMessage({
                        type: 'changeSmokeTab',
                        tab: tabType
                    }, '*');
                }
            });
        });
    }
    
    function removeSmokeTabs() {
        if (paginationTabs) {
            paginationTabs.style.display = 'none';
            paginationTabs.innerHTML = '';
            smokeTabButtons = [];
        }
    }
    
    function renderPaginationButtons(count, activeIndex, titles = []) {
        if (!paginationButtons) return;
        
        if (count === 0) {
            // Не скрываем всю панель, только кнопки
            paginationButtons.innerHTML = '';
            paginationCounter.textContent = '0 раскидок';
            
            // Вкладки оставляем видимыми если это смоки
            if (!isSmoke) {
                paginationContainer.style.display = 'none';
            }
            return;
        }
        
        paginationContainer.style.display = 'block';
        paginationCounter.textContent = `${count} ${getGrenadeWord(count)}`;
        
        let html = '';
        for (let i = 0; i < count; i++) {
            const isActive = i === activeIndex;
            const buttonText = (titles && titles[i]) ? titles[i] : (i + 1).toString();
            html += `<button class="pagination-btn ${isActive ? 'active' : ''}" data-index="${i}">${buttonText}</button>`;
        }
        paginationButtons.innerHTML = html;
        
        // Добавляем обработчики кликов
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                currentIndex = index;
                
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
            case 'cache': url = `pages/cache.html?grenade=${currentGrenade}`; break;
            default: url = `pages/mirage.html?grenade=${currentGrenade}`;
        }
        
        currentIndex = 0;
        currentShortTitles = [];
        currentSmokeTab = 'regular';
        
        // Убираем вкладки при загрузке новой страницы
        removeSmokeTabs();
        
        if (pageFrame) {
            pageFrame.style.opacity = '0.5';
            pageFrame.src = url;
            pageFrame.onload = () => {
                pageFrame.style.opacity = '1';
                setTimeout(adjustIframeHeight, 50);
                setTimeout(adjustIframeHeight, 300);
            };
        }
    }
    
    function updateActiveMapButtons() {
        mapButtons.forEach(btn => {
            if (btn.getAttribute('data-map') === currentMap) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
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
        if (!event.data || !event.data.type) return;
        
        switch(event.data.type) {
            case 'updatePagination':
                currentPositionsCount = event.data.positionsCount;
                currentIndex = event.data.currentIndex;
                isSmoke = event.data.isSmoke || false;
                
                if (event.data.titles) {
                    currentShortTitles = event.data.titles;
                }
                
                // Управление видимостью вкладок
                if (isSmoke) {
                    // Показываем вкладки только для смоков
                    if (smokeTabButtons.length === 0) {
                        createSmokeTabs();
                    } else {
                        paginationTabs.style.display = 'flex';
                    }
                    
                    // Обновляем активную вкладку
                    smokeTabButtons.forEach(tab => {
                        if (tab.getAttribute('data-tab') === currentSmokeTab) {
                            tab.classList.add('active');
                        } else {
                            tab.classList.remove('active');
                        }
                    });
                    
                    // Всегда показываем панель для смоков, даже если нет раскидок
                    paginationContainer.style.display = 'block';
                } else {
                    // Скрываем вкладки для других типов гранат
                    removeSmokeTabs();
                }
                
                renderPaginationButtons(currentPositionsCount, currentIndex, currentShortTitles);
                setTimeout(adjustIframeHeight, 50);
                break;
                
            case 'contentHeight':
                if (pageFrame && event.data.height) {
                    pageFrame.style.height = event.data.height + 'px';
                }
                break;
        }
    });
    
    // Обработчики кликов по кнопкам карт
    mapButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newMap = btn.getAttribute('data-map');
            if (newMap !== currentMap) {
                currentMap = newMap;
                updateActiveMapButtons();
                loadPage();
            }
        });
    });
    
    // Обработчики кликов по кнопкам гранат
    grenadeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newGrenade = btn.getAttribute('data-grenade');
            if (newGrenade !== currentGrenade) {
                currentGrenade = newGrenade;
                updateActiveGrenadeButtons();
                
                // Сбрасываем вкладку смоков
                currentSmokeTab = 'regular';
                
                // Отправляем сообщение в iframe о смене гранаты
                if (pageFrame && pageFrame.contentWindow) {
                    pageFrame.contentWindow.postMessage({
                        type: 'changeGrenade',
                        grenade: currentGrenade
                    }, '*');
                }
                
                loadPage();
            }
        });
    });
    
    // Инициализация
    updateActiveMapButtons();
    updateActiveGrenadeButtons();
    loadPage();
});

// Функции для полноэкранного просмотра изображений
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
