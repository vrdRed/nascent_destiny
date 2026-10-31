(function() {
    let currentPositions = [];
    let currentIndex = 0;
    let currentGrenadeType = 'smoke';
    let currentMapKey = '';
    let currentMapName = '';
    let currentSmokeType = 'regular';
    let allSmokePositions = [];
    
    // Throttle для sendContentHeight
    let heightSendScheduled = false;
    let lastSentHeight = 0;
    
    function getUrlParam(param) {
        return new URLSearchParams(window.location.search).get(param);
    }
    
    function getGrenadeTypeName(grenadeType) {
        const typeNames = {
            'smoke': '💨 Smoke',
            'flash': '⚡ Flashbang',
            'molotov': '🔥 Molotov',
            'he': '💥 HE'
        };
        return typeNames[grenadeType] || grenadeType;
    }
    
    function updateGrenadeIndicator(grenadeType) {
        const indicator = document.getElementById('grenade-indicator');
        if (indicator) indicator.textContent = getGrenadeTypeName(grenadeType);
    }
    
    function getIconName(mapKey) {
        const iconMap = {
            'mirage': 'mirage_icon.png',
            'dust2': 'dust_icon.png',
            'anubis': 'anubis_icon.png',
            'ancient': 'ancient_icon.png',
            'overpass': 'overpass_icon.png',
            'nuke': 'nuke_icon.png',
            'inferno': 'inferno_icon.png',
            'train': 'train_icon.png',
            'vertigo': 'vertigo_icon.png',
            'cache': 'cache_icon.png'
        };
        return iconMap[mapKey] || `${mapKey}_icon.png`;
    }
    
    function loadMapIcon(mapKey) {
        const mapIcon = document.querySelector('.map-title-icon');
        if (mapIcon) {
            mapIcon.src = `../img/icon/${getIconName(mapKey)}`;
        }
    }
    
    function filterSmokesByType(positions, smokeType) {
        if (!positions || positions.length === 0) return [];
        const hasSmokeType = positions.some(pos => pos.smokeType !== undefined);
        if (!hasSmokeType) {
            return smokeType === 'regular' ? positions : [];
        }
        return positions.filter(pos => (pos.smokeType || 'regular') === smokeType);
    }
    
    function updateParentPagination() {
        if (window.parent && window.parent !== window) {
            const titles = currentPositions.map(p => p.shortTitle || p.title.substring(0, 15) + '...');
            
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
    
    // Throttled отправка высоты
    function sendContentHeight() {
        if (heightSendScheduled) return;
        heightSendScheduled = true;
        
        requestAnimationFrame(() => {
            heightSendScheduled = false;
            if (window.parent && window.parent !== window) {
                const height = document.body.scrollHeight;
                if (Math.abs(height - lastSentHeight) > 2) {
                    lastSentHeight = height;
                    window.parent.postMessage({
                        type: 'contentHeight',
                        height: height
                    }, '*');
                }
            }
        });
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
        const labels = imageCount === 3 
            ? ['Прицел', 'Позиция', 'Результат']
            : ['Прицел', 'Позиция'];
        
        let imagesHtml = '';
        for (let i = 0; i < imageCount; i++) {
            // Первое изображение (прицел) — eager + high priority, остальные lazy
            const isFirst = i === 0;
            const loading = isFirst ? 'eager' : 'lazy';
            const fetchpriority = isFirst ? 'high' : 'low';
            
            imagesHtml += `
                <div class="image-item">
                    <img src="${position.images[i]}" 
                         alt="${position.title} - шаг ${i + 1}" 
                         loading="${loading}"
                         decoding="async"
                         fetchpriority="${fetchpriority}"
                         onerror="this.src='../img/placeholder.jpg'">
                    <span class="image-label">${labels[i]}</span>
                </div>
            `;
        }
        
        const gridClass = imageCount === 3 ? 'image-row image-row--three' : 'image-row';
        
        let smokeTypeBadge = '';
        if (position.smokeType === 'instant') {
            smokeTypeBadge = '<span class="position-badge instant-badge">⚡ Instant</span>';
        }
        
        container.innerHTML = `
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
                        ${imagesHtml}
                    </div>
                </div>
                <div class="position-tips">
                    <h4>Принцип:</h4>
                    <p>${position.tips}</p>
                </div>
            </div>
        `;
        
        sendContentHeight();
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
        
        updateGrenadeIndicator(grenadeType);
        loadMapIcon(mapKey);
        
        const container = document.getElementById('positions-container');
        if (!container) return;
        
        if (grenadeType === 'smoke') {
            allSmokePositions = positions || [];
            currentPositions = filterSmokesByType(allSmokePositions, currentSmokeType);
        } else {
            allSmokePositions = [];
            currentPositions = positions || [];
        }
        
        updateParentPagination();
        
        if (currentPositions.length === 0) {
            let message = '😕 Нет доступных раскидок для этой гранаты';
            if (grenadeType === 'smoke' && currentSmokeType === 'instant') {
                message = '😕 Нет Instant смоков для этой карты';
            }
            container.innerHTML = `<div class="no-positions"><p>${message}</p></div>`;
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
        
        updateGrenadeIndicator(grenadeType);
        loadMapIcon(mapKey);
        
        container.innerHTML = '<div class="loading-positions">Загрузка раскидок...</div>';
        sendContentHeight();
        
        if (typeof positionsData !== 'undefined' && positionsData[mapKey] && positionsData[mapKey][grenadeType]) {
            loadPositions(positionsData[mapKey][grenadeType], mapName, grenadeType, mapKey);
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
                    updateGrenadeIndicator(newGrenade);
                    
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
                        container.innerHTML = `<div class="no-positions"><p>😕 Нет доступных раскидок для этой гранаты</p></div>`;
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
                            container.innerHTML = `
                                <div class="no-positions">
                                    <p>😕 Нет ${currentSmokeType === 'instant' ? 'Instant' : 'обычных'} смоков для этой карты</p>
                                </div>
                            `;
                        }
                        updateParentPagination();
                        sendContentHeight();
                    }
                    break;
            }
        });
        
        // Обсервер только на контейнере, а не на body
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => {
                sendContentHeight();
            });
            const positionsContainer = document.getElementById('positions-container');
            if (positionsContainer) {
                resizeObserver.observe(positionsContainer);
            }
        }
    }
    
    // Убираем дублирование fullscreen — используем версию из main.js,
    // но оставляем fallback для прямого открытия страницы карты
    function openFullscreen(imageSrc, imageAlt) {
        const modal = document.createElement('div');
        modal.className = 'fullscreen-modal';
        
        modal.innerHTML = `
            <button class="fullscreen-close" title="Закрыть (ESC)">✕</button>
            <div class="fullscreen-content">
                <img src="${imageSrc}" alt="${imageAlt || 'Изображение'}" class="fullscreen-image" decoding="async">
                <div class="fullscreen-caption">${imageAlt || ''}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        const closeBtn = modal.querySelector('.fullscreen-close');
        
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
        
        requestAnimationFrame(() => modal.classList.add('active'));
        return modal;
    }
    
    function closeFullscreen(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) modal.parentNode.removeChild(modal);
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
