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
        if (iconMap) {
            triggerIcon.src = options[0].icon;
            triggerIcon.alt = '';
            triggerIcon.onerror = function() {
                this.style.display = 'none';
            };
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
        
        options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-select-option';
            optionEl.setAttribute('data-value', option.value);
            
            if (index === 0) {
                optionEl.classList.add('selected');
            }
            
            const optionIcon = document.createElement('img');
            optionIcon.className = 'map-icon';
            if (iconMap) {
                optionIcon.src = option.icon;
                optionIcon.alt = '';
                optionIcon.onerror = function() {
                    this.style.display = 'none';
                };
            } else {
                optionIcon.style.display = 'none';
            }
            
            const optionText = document.createElement('span');
            optionText.className = 'trigger-text';
            optionText.textContent = option.text;
            
            optionEl.appendChild(optionIcon);
            optionEl.appendChild(optionText);
            
            optionEl.addEventListener('click', () => {
                const value = optionEl.getAttribute('data-value');
                
                dropdown.querySelectorAll('.custom-select-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionEl.classList.add('selected');
                
                if (iconMap) {
                    triggerIcon.src = option.icon;
                    triggerIcon.onerror = function() {
                        this.style.display = 'none';
                    };
                    triggerIcon.style.display = '';
                }
                triggerText.textContent = option.text;
                
                dropdown.classList.remove('open');
                
                nativeSelect.value = value;
                
                if (nativeSelect === mapSelect && value !== currentMap) {
                    currentMap = value;
                    loadPage();
                } else if (nativeSelect === grenadeSelect && value !== currentGrenade) {
                    currentGrenade = value;
                    currentSmokeTab = 'regular';
                    
                    if (pageFrame && pageFrame.contentWindow) {
                        pageFrame.contentWindow.postMessage({
                            type: 'changeGrenade',
                            grenade: currentGrenade
                        }, '*');
                    }
                    
                    loadPage();
                }
            });
            
            dropdown.appendChild(optionEl);
        });
        
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
        
        return {
            wrapper: customWrapper,
            trigger: trigger,
            triggerIcon: triggerIcon,
            triggerText: triggerText,
            dropdown: dropdown
        };
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
            paginationButtons.innerHTML = '';
            paginationCounter.textContent = '0 раскидок';
            
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
        
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                currentIndex = index;
                
                document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
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
                
                if (isSmoke) {
                    if (smokeTabButtons.length === 0) {
                        createSmokeTabs();
                    } else {
                        paginationTabs.style.display = 'flex';
                    }
                    
                    smokeTabButtons.forEach(tab => {
                        if (tab.getAttribute('data-tab') === currentSmokeTab) {
                            tab.classList.add('active');
                        } else {
                            tab.classList.remove('active');
                        }
                    });
                    
                    paginationContainer.style.display = 'block';
                } else {
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
    
    loadPage();
});

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
