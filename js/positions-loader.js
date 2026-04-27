// positions-loader.js — скрипт для загрузки и отображения раскидок гранат с пагинацией
(function() {
    let currentPositions = [];
    let currentIndex = 0;
    let currentGrenadeType = 'smoke';
    let currentMapKey = '';
    let currentMapName = '';
    let currentSmokeType = 'regular'; // По умолчанию показываем обычные смоки
    let allSmokePositions = []; // Храним все смоки для фильтрации
    
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    function getGrenadeTypeName(grenadeType) {
        const typeNames = {
            'smoke': '💨 Дым',
            'flash': '⚡ Флешка',
            'molotov': '🔥 Молотов',
            'he': '💥 HE (Осколочная)'
        };
        return typeNames[grenadeType] || grenadeType;
    }
    
    function filterSmokesByType(positions, smokeType) {
        if (!positions || positions.length === 0) return [];
        
        // Проверяем, есть ли у позиций поле smokeType
        const hasSmokeType = positions.some(pos => pos.smokeType !== undefined);
        
        if (!hasSmokeType) {
            // Если нет поля smokeType, все смоки считаются обычными
            return smokeType === 'regular' ? positions : [];
        }
        
        // Фильтруем по типу
        return positions.filter(pos => {
            const type = pos.smokeType || 'regular';
            return type === smokeType;
        });
    }
    
    function updateParentPagination() {
        if (window.parent && window.parent !== window) {
            const titles = currentPositions.map(p => p.shortTitle || p.title.substring(0, 15) + '...');
            
            // Определяем доступные типы смоков
            let smokeTypes = [];
            if (currentGrenadeType === 'smoke' && allSmokePositions.length > 0) {
                const types = new Set();
                allSmokePositions.forEach(pos => {
                    types.add(pos.smokeType || 'regular');
                });
                smokeTypes = Array.from(types);
            }
            
            window.parent.postMessage({
                type: 'updatePagination',
                positionsCount: currentPositions.length,
                currentIndex: currentIndex,
                mapKey: currentMapKey,
                grenadeType: currentGrenadeType,
                titles: titles,
                isSmoke: currentGrenadeType === 'smoke',
                smokeTypes: smokeTypes
            }, '*');
        }
    }
    
    function sendContentHeight() {
        if (window.parent && window.parent !== window) {
            const height = document.body.scrollHeight;
            window.parent.postMessage({
                type: 'contentHeight',
                height: height
            }, '*');
        }
    }
    
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
        
        const imageCount = position.images.length;
        
        const generateImagesHtml = () => {
            let imagesHtml = '';
            
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
        
        const gridClass = imageCount === 3 ? 'image-row image-row--three' : 'image-row';
        
        // Добавляем бейдж типа смока если есть smokeType
        let smokeTypeBadge = '';
        if (position.smokeType === 'instant') {
            smokeTypeBadge = '<span class="position-badge instant-badge">⚡ Instant</span>';
        }
        
        let html = `
            <div class="position-card" data-id="${position.id}">
                <div class="position-header">
                    <h3>${position.title}</h3>
                    <div class="position-nav">
                        ${smokeTypeBadge}
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
        
        setTimeout(sendContentHeight, 50);
    }
    
    function showPosition(index) {
        if (currentPositions.length === 0) return;
        
        if (index < 0) index = 0;
        if (index >= currentPositions.length) index = currentPositions.length - 1;
        
        currentIndex = index;
        renderSinglePosition(currentPositions[currentIndex]);
        updateParentPagination();
    }
    
    function loadPositions(positions, mapName, grenadeType, mapKey) {
        currentGrenadeType = grenadeType;
        currentMapName = mapName;
        currentMapKey = mapKey;
        currentIndex = 0;
        
        const container = document.getElementById('positions-container');
        if (!container) return;
        
        if (grenadeType === 'smoke') {
            // Сохраняем все смоки
            allSmokePositions = positions || [];
            // Фильтруем по типу
            currentPositions = filterSmokesByType(allSmokePositions, currentSmokeType);
        } else {
            allSmokePositions = [];
            currentPositions = positions || [];
        }
        
        // Всегда отправляем обновление пагинации, даже если нет позиций
        updateParentPagination();
        
        if (currentPositions.length === 0) {
            let message = '😕 Нет доступных раскидок для этой гранаты';
            if (grenadeType === 'smoke' && currentSmokeType === 'instant') {
                message = '😕 Нет Instant смоков для этой карты';
            }
            container.innerHTML = `
                <div class="no-positions">
                    <p>${message}</p>
                </div>
            `;
            sendContentHeight();
            return;
        }
        
        renderSinglePosition(currentPositions[0]);
    }
    
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
        currentSmokeType = 'regular';
        
        container.innerHTML = '<div class="loading-positions">Загрузка раскидок...</div>';
        sendContentHeight();
        
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
            allSmokePositions = [];
            updateParentPagination();
            sendContentHeight();
        }
        
        // Обработчик сообщений от родительского окна
        window.addEventListener('message', function(event) {
            if (!event.data || !event.data.type) return;
            
            switch(event.data.type) {
                case 'changePosition':
                    showPosition(event.data.index);
                    break;
                    
                case 'changeGrenade':
                    const newGrenade = event.data.grenade;
                    currentGrenadeType = newGrenade;
                    currentSmokeType = 'regular';
                    
                    if (positionsData[currentMapKey] && positionsData[currentMapKey][newGrenade]) {
                        loadPositions(
                            positionsData[currentMapKey][newGrenade], 
                            currentMapName, 
                            newGrenade, 
                            currentMapKey
                        );
                    } else {
                        currentPositions = [];
                        allSmokePositions = [];
                        document.getElementById('positions-container').innerHTML = `
                            <div class="no-positions">
                                <p>😕 Нет доступных раскидок для этой гранаты</p>
                            </div>
                        `;
                        updateParentPagination();
                        sendContentHeight();
                    }
                    break;
                    
                case 'changeSmokeTab':
                    currentSmokeType = event.data.tab;
                    if (currentGrenadeType === 'smoke' && allSmokePositions.length > 0) {
                        currentPositions = filterSmokesByType(allSmokePositions, currentSmokeType);
                        currentIndex = 0;
                        
                        if (currentPositions.length > 0) {
                            renderSinglePosition(currentPositions[0]);
                        } else {
                            document.getElementById('positions-container').innerHTML = `
                                <div class="no-positions">
                                    <p>😕 Нет ${currentSmokeType === 'instant' ? 'Instant' : 'обычных'} смоков для этой карты</p>
                                </div>
                            `;
                        }
                        // Обновляем пагинацию даже если нет позиций
                        updateParentPagination();
                        sendContentHeight();
                    }
                    break;
            }
        });
        
        // Отправляем начальную высоту после загрузки
        window.addEventListener('load', function() {
            sendContentHeight();
        });
        
        // Наблюдаем за изменением размеров
        const observer = new ResizeObserver(() => {
            sendContentHeight();
        });
        observer.observe(document.body);
    }
    
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
    
    // Экспортируем функции в глобальную область видимости
    window.initMapPage = initMapPage;
    window.openFullscreen = openFullscreen;
    window.closeFullscreen = closeFullscreen;
    window.showPosition = showPosition;
    
    // Инициализация обработчиков кликов по изображениям
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupImageClickHandlers);
    } else {
        setupImageClickHandlers();
    }
})();
