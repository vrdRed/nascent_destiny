document.addEventListener('DOMContentLoaded', () => {
    const mapSelect = document.getElementById('map-select');
    const grenadeSelect = document.getElementById('grenade-select');
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
    
    let lastLoadedUrl = '';
    let frameReady = false;
    
    const mapDisplayNames = {
        mirage: 'Mirage', dust2: 'Dust II', anubis: 'Anubis', ancient: 'Ancient',
        overpass: 'Overpass', nuke: 'Nuke', inferno: 'Inferno',
        train: 'Train', vertigo: 'Vertigo', cache: 'Cache'
    };
    
    function createCustomSelect(wrapperId, nativeSelect, iconMap) {
        const selectWrapper = document.getElementById(wrapperId);
        if (!selectWrapper) return;
        
        const options = [];
        const optionElements = nativeSelect.querySelectorAll('option');
        optionElements.forEach(option => {
            options.push({
                value: option.value,
                text: option.textContent,
                icon: iconMap ? (option.getAttribute('data-icon') || '') : ''
            });
        });
        
        const customWrapper = document.createElement('div');
        customWrapper.className = 'custom-select-wrapper';
        customWrapper.id = `custom-${wrapperId}`;
        
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.id = `custom-${wrapperId}-trigger`;
        
        const triggerIcon = document.createElement('img');
        triggerIcon.className = 'map-icon';
        triggerIcon.loading = 'lazy';
        triggerIcon.decoding = 'async';
        if (iconMap) {
            triggerIcon.src = options[0].icon;
            triggerIcon.alt = '';
            triggerIcon.onerror = function() { this.style.display = 'none'; };
        } else {
            triggerIcon.style.display = 'none';
        }
        
        const triggerText = document.createElement('span');
        triggerText.className = 'trigger-text';
        triggerText.textContent = options[0].text;
        
        trigger.appendChild(triggerIcon);
        trigger.appendChild(triggerText);
        
        const dropdown = document.createElement('div');
        dropdown.className = 'custom-select-dropdown';
        dropdown.id = `custom-${wrapperId}-dropdown`;
        
        const fragment = document.createDocumentFragment();
        
        options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-select-option';
            optionEl.setAttribute('data-value', option.value);
            
            if (index === 0) optionEl.classList.add('selected');
            
            const optionIcon = document.createElement('img');
            optionIcon.className = 'map-icon';
            optionIcon.loading = 'lazy';
            optionIcon.decoding = 'async';
            if (iconMap) {
                optionIcon.src = option.icon;
                optionIcon.alt = '';
                optionIcon.onerror = function() { this.style.display = 'none'; };
            } else {
                optionIcon.style.display = 'none';
            }
            
            const optionText = document.createElement('span');
            optionText.className = 'trigger-text';
            optionText.textContent = option.text;
            
            optionEl.appendChild(optionIcon);
            optionEl.appendChild(optionText);
            
            if (nativeSelect === mapSelect) {
                optionEl.addEventListener('mouseenter', () => {
                    const mapKey = optionEl.getAttribute('data-value');
                    const grenadeKey = currentGrenade;
                    
                    if (typeof positionsData === 'undefined') return;
                    const mapData = positionsData[mapKey];
                    if (!mapData || !mapData[grenadeKey]) return;
                    
                    const arr = mapData[grenadeKey];
                    if (arr.length === 0) return;
                    
                    let pos = arr[0];
                    if (grenadeKey === 'smoke') {
                        const regular = arr.find(p => (p.smokeType || 'regular') === 'regular');
                        if (regular) pos = regular;
                    }
                    
                    if (pos && pos.images && pos.images[0]) {
                        const img = new Image();
                        img.decoding = 'async';
                        img.src = pos.images[0];
                    }
                });
            }
            
            optionEl.addEventListener('click', () => {
                const value = optionEl.getAttribute('data-value');
                
                dropdown.querySelectorAll('.custom-select-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionEl.classList.add('selected');
                
                if (iconMap) {
                    triggerIcon.src = option.icon;
                    triggerIcon.style.display = '';
                }
                triggerText.textContent = option.text;
                
                dropdown.classList.remove('open');
                nativeSelect.value = value;
                
                if (nativeSelect === mapSelect && value !== currentMap) {
                    currentMap = value;
                    frameReady = false;
                    loadPage(true);
                } else if (nativeSelect === grenadeSelect && value !== currentGrenade) {
                    currentGrenade = value;
                    currentSmokeTab = 'regular';
                    
                    if (pageFrame && pageFrame.contentWindow && frameReady) {
                        pageFrame.contentWindow.postMessage({
                            type: 'changeGrenade',
                            grenade: currentGrenade
                        }, '*');
                    } else {
                        frameReady = false;
                        loadPage(true);
                    }
                }
            });
            
            fragment.appendChild(optionEl);
        });
        
        dropdown.appendChild(fragment);
        
        customWrapper.appendChild(trigger);
        customWrapper.appendChild(dropdown);
        
        nativeSelect.classList.add('hidden-native-select');
        selectWrapper.appendChild(customWrapper);
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-select-dropdown.open').forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
        
        document.addEventListener('click', (e) => {
            if (!customWrapper.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
        
        return { wrapper: customWrapper, trigger, triggerIcon, triggerText, dropdown };
    }
    
    const mapCustomSelect = createCustomSelect('map-select-wrapper', mapSelect, true);
    const grenadeCustomSelect = createCustomSelect('grenade-select-wrapper', grenadeSelect, false);
    
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
                smokeTabButtons.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentSmokeTab = tabType;
                currentIndex = 0;
                
                if (pageFrame && pageFrame.contentWindow && frameReady) {
                    pageFrame.contentWindow.postMessage({
                        type: 'preloadTab',
                        tab: tabType
                    }, '*');
                    
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
            paginationButtons.innerHTML = '';
            paginationCounter.textContent = '0 раскидок';
            if (!isSmoke) paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'block';
        paginationCounter.textContent = `${count} ${getGrenadeWord(count)}`;
        
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const isActive = i === activeIndex;
            const buttonText = (titles && titles[i]) ? titles[i] : (i + 1).toString();
            const btn = document.createElement('button');
            btn.className = `pagination-btn${isActive ? ' active' : ''}`;
            btn.setAttribute('data-index', i);
            btn.textContent = buttonText;
            fragment.appendChild(btn);
        }
        paginationButtons.innerHTML = '';
        paginationButtons.appendChild(fragment);
        
        paginationButtons.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                currentIndex = index;
                paginationButtons.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (pageFrame && pageFrame.contentWindow && frameReady) {
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
    
    function buildPageUrl(map, grenade) {
        return `pages/${map}.html?grenade=${grenade}`;
    }
    
    function sendMapDataToFrame() {
        if (!pageFrame || !pageFrame.contentWindow) return;
        
        const mapData = (typeof positionsData !== 'undefined' && positionsData[currentMap])
            ? positionsData[currentMap]
            : {};
        
        pageFrame.contentWindow.postMessage({
            type: 'setPositionsData',
            mapKey: currentMap,
            mapName: mapDisplayNames[currentMap] || currentMap,
            data: mapData,
            grenade: currentGrenade
        }, '*');
    }
    
    function loadPage(forceReload = false) {
        const url = buildPageUrl(currentMap, currentGrenade);
        
        if (!forceReload && url === lastLoadedUrl) return;
        lastLoadedUrl = url;
        
        currentIndex = 0;
        currentShortTitles = [];
        currentSmokeTab = 'regular';
        frameReady = false;
        
        removeSmokeTabs();
        
        if (pageFrame) {
            pageFrame.style.opacity = '0.5';
            pageFrame.src = url;
            pageFrame.onload = () => {
                pageFrame.style.opacity = '1';
            };
        }
    }
    
    window.addEventListener('message', (event) => {
        if (!event.data || !event.data.type) return;
        
        switch(event.data.type) {
            case 'frameReady':
                frameReady = true;
                sendMapDataToFrame();
                break;
                
            case 'updatePagination':
                currentPositionsCount = event.data.positionsCount;
                currentIndex = event.data.currentIndex;
                isSmoke = event.data.isSmoke || false;
                
                if (event.data.titles) currentShortTitles = event.data.titles;
                
                if (isSmoke) {
                    if (smokeTabButtons.length === 0) {
                        createSmokeTabs();
                    } else {
                        paginationTabs.style.display = 'flex';
                    }
                    
                    smokeTabButtons.forEach(tab => {
                        tab.classList.toggle('active', tab.getAttribute('data-tab') === currentSmokeTab);
                    });
                    
                    paginationContainer.style.display = 'block';
                } else {
                    removeSmokeTabs();
                }
                
                renderPaginationButtons(currentPositionsCount, currentIndex, currentShortTitles);
                break;
                
            case 'contentHeight':
                if (pageFrame && event.data.height) {
                    pageFrame.style.height = event.data.height + 'px';
                }
                break;
        }
    });
    
    loadPage();
});
