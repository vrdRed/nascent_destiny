// positions-loader.js — скрипт для загрузки и отображения раскидок гранат с пагинацией
(function() {
    let currentPositions = [];
    let currentIndex = 0;
    let currentGrenadeType = 'smoke';
    let currentMapKey = '';
    let currentMapName = '';
    
    // Функция для получения параметров из URL
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // Функция для получения названия типа гранаты
    function getGrenadeTypeName(grenadeType) {
        const typeNames = {
            'smoke': '💨 Дым',
            'flash': '⚡ Флешка',
            'molotov': '🔥 Молотов'
        };
        return typeNames[grenadeType] || grenadeType;
    }
    
    // Функция для обновления пагинации в родительском окне
    function updateParentPagination() {
        if (window.parent && window.parent !== window) {
            // Собираем массив кратких названий
            const titles = currentPositions.map(p => p.shortTitle || p.title.substring(0, 15) + '...');
            
            window.parent.postMessage({
                type: 'updatePagination',
                positionsCount: currentPositions.length,
                currentIndex: currentIndex,
                mapKey: currentMapKey,
                grenadeType: currentGrenadeType,
                titles: titles // <-- ОТПРАВЛЯЕМ МАССИВ НАЗВАНИЙ
            }, '*');
        }
    }
    
    // Функция для отправки высоты содержимого родительскому окну
    function sendContentHeight() {
        if (window.parent && window.parent !== window) {
            const height = document.body.scrollHeight;
            window.parent.postMessage({
                type: 'contentHeight',
                height: height
            }, '*');
        }
    }
    
    // Функция для отображения одной раскидки по индексу
    function renderSinglePosition(position) {
        const container = document.getElementById('positions-container');
        if (!container) return;
        
        if (!position) {
            container.innerHTML = `
                <div class="no-positions">
                    <p>😕 Нет доступных раскидок для этой гранаты</p>
                </div>
            `;
            sendContentHeight();
            return;
        }
        
        // Определяем количество изображений
        const imageCount = position.images.length;
        
        // Функция для генерации HTML изображений
        const generateImagesHtml = () => {
            let imagesHtml = '';
            
            // Стандартные подписи для 2 или 3 картинок
            const labels = imageCount === 3 
                ? ['Прицел', 'Позиция', 'Результат']
                : ['Прицел', 'Позиция'];
                
            for (let i = 0; i < imageCount; i++) {
                imagesHtml += `
                    <div class="image-item">
                        <img src="${position.images[i]}" alt="${position.title} - шаг ${i + 1}" onerror="this.src='../img/placeholder.jpg'">
                        <span class="image-label">${labels[i]}</span>
                    </div>
                `;
            }
            return imagesHtml;
        };
        
        // Определяем класс для сетки: если 3 картинки, добавляем модификатор
        const gridClass = imageCount === 3 ? 'image-row image-row--three' : 'image-row';
        
        let html = `
            <div class="position-card" data-id="${position.id}">
                <div class="position-header">
                    <h3>${position.title}</h3>
                    <div class="position-nav">
                        <span class="position-badge">${getGrenadeTypeName(currentGrenadeType)}</span>
                    </div>
                </div>
                <div class="position-images">
                    <div class="${gridClass}">
                        ${generateImagesHtml()}
                    </div>
                </div>
                <div class="position-tips">
                    <h4>Принцип:</h4>
                    <p>${position.tips}</p>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Отправляем высоту после рендеринга
        setTimeout(sendContentHeight, 50);
    }
    
    // Функция для переключения на конкретную раскидку
    function showPosition(index) {
        if (currentPositions.length === 0) return;
        
        if (index < 0) index = 0;
        if (index >= currentPositions.length) index = currentPositions.length - 1;
        
        currentIndex = index;
        renderSinglePosition(currentPositions[currentIndex]);
        updateParentPagination();
    }
    
    // Функция для загрузки всех раскидок
    function loadPositions(positions, mapName, grenadeType, mapKey) {
        currentPositions = positions || [];
        currentGrenadeType = grenadeType;
        currentMapName = mapName;
        currentMapKey = mapKey;
        currentIndex = 0;
        
        const container = document.getElementById('positions-container');
        if (!container) return;
        
        if (currentPositions.length === 0) {
            container.innerHTML = `
                <div class="no-positions">
                    <p>😕 Нет доступных раскидок для этой гранаты</p>
                </div>
            `;
            updateParentPagination();
            sendContentHeight();
            return;
        }
        
        renderSinglePosition(currentPositions[0]);
        updateParentPagination();
    }
    
    // Инициализация страницы
    function initMapPage(mapName, mapKey) {
        const grenadeType = getUrlParam('grenade') || 'smoke';
        const container = document.getElementById('positions-container');
        
        if (!container) {
            console.error('Контейнер positions-container не найден');
            return;
        }
        
        currentMapKey = mapKey;
        currentMapName = mapName;
        currentGrenadeType = grenadeType;
        
        // Показываем загрузку
        container.innerHTML = '<div class="loading-positions">Загрузка раскидок...</div>';
        sendContentHeight();
        
        // Получаем данные из глобального объекта
        if (typeof positionsData !== 'undefined' && positionsData[mapKey] && positionsData[mapKey][grenadeType]) {
            const positions = positionsData[mapKey][grenadeType];
            loadPositions(positions, mapName, grenadeType, mapKey);
        } else {
            container.innerHTML = `
                <div class="error-positions">
                    <p>❌ Ошибка загрузки данных для карты ${mapName}</p>
                </div>
            `;
            currentPositions = [];
            updateParentPagination();
            sendContentHeight();
        }
        
        // Слушаем сообщения от родительского окна
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'changePosition') {
                showPosition(event.data.index);
            } else if (event.data && event.data.type === 'changeGrenade') {
                const newGrenade = event.data.grenade;
                currentGrenadeType = newGrenade;
                
                if (positionsData[currentMapKey] && positionsData[currentMapKey][newGrenade]) {
                    loadPositions(positionsData[currentMapKey][newGrenade], currentMapName, newGrenade, currentMapKey);
                }
            }
        });
        
        // Отправляем начальную высоту после полной загрузки
        window.addEventListener('load', function() {
            sendContentHeight();
        });
        
        // Наблюдаем за изменениями размера
        const observer = new ResizeObserver(() => {
            sendContentHeight();
        });
        observer.observe(document.body);
    }
    
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
    
    function setupImageClickHandlers() {
        document.addEventListener('click', (e) => {
            const img = e.target.closest('.image-item img');
            if (img && img.src && !img.src.includes('placeholder')) {
                e.preventDefault();
                e.stopPropagation();
                
                const imageItem = img.closest('.image-item');
                const label = imageItem ? imageItem.querySelector('.image-label') : null;
                const caption = label ? label.textContent : img.alt || 'Изображение';
                
                openFullscreen(img.src, caption);
            }
        });
    }
    
    window.initMapPage = initMapPage;
    window.openFullscreen = openFullscreen;
    window.closeFullscreen = closeFullscreen;
    window.showPosition = showPosition;
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupImageClickHandlers);
    } else {
        setupImageClickHandlers();
    }
})();
