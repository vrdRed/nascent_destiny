// positions-loader.js — скрипт для загрузки и отображения раскидок гранат (без видео)
(function() {
    // Функция для получения параметров из URL
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // Функция для отображения списка раскидок
    function renderPositions(positions, mapName, grenadeType) {
        const container = document.getElementById('positions-container');
        if (!container) return;
        
        if (!positions || positions.length === 0) {
            container.innerHTML = `
                <div class="no-positions">
                    <p>😕 Нет доступных раскидок для этой гранаты</p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="positions-grid">';
        
        positions.forEach(position => {
            html += `
                <div class="position-card" data-id="${position.id}">
                    <div class="position-header">
                        <h3>${position.title}</h3>
                        <span class="position-badge">${grenadeType === 'smoke' ? '💨 Дым' : '⚡ Флешка'}</span>
                    </div>
                    <div class="position-images">
                        <div class="image-row">
                            <div class="image-item">
                                <img src="${position.images[0]}" alt="${position.title} - шаг 1" onerror="this.src='../img/placeholder.jpg'">
                                <span class="image-label">Сюда кидать</span>
                            </div>
                            <div class="image-item">
                                <img src="${position.images[1]}" alt="${position.title} - шаг 2" onerror="this.src='../img/placeholder.jpg'">
                                <span class="image-label">Здесь вставать</span>
                            </div>
                        </div>
                    </div>
                    <div class="position-tips">
                        <h4>Принцип:</h4>
                        <p>${position.tips}</p>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    // Инициализация страницы
    function initMapPage(mapName, mapKey) {
        const grenadeType = getUrlParam('grenade') || 'smoke';
        const container = document.getElementById('positions-container');
        
        if (!container) {
            console.error('Контейнер positions-container не найден');
            return;
        }
        
        // Показываем загрузку
        container.innerHTML = '<div class="loading-positions">Загрузка раскидок...</div>';
        
        // Получаем данные из глобального объекта
        if (typeof positionsData !== 'undefined' && positionsData[mapKey] && positionsData[mapKey][grenadeType]) {
            const positions = positionsData[mapKey][grenadeType];
            renderPositions(positions, mapName, grenadeType);
        } else {
            container.innerHTML = `
                <div class="error-positions">
                    <p>❌ Ошибка загрузки данных для карты ${mapName}</p>
                </div>
            `;
        }
        
        // Слушаем изменения URL (если родитель меняет параметры через postMessage)
        window.addEventListener('message', function(event) {
            if (event.data && event.data.grenade) {
                const newGrenade = event.data.grenade;
                if (positionsData[mapKey] && positionsData[mapKey][newGrenade]) {
                    renderPositions(positionsData[mapKey][newGrenade], mapName, newGrenade);
                }
            }
        });
    }
    
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
    
    // Функция для настройки обработчиков кликов на изображения
    function setupImageClickHandlers() {
        // Используем делегирование событий для всех изображений, которые будут добавлены динамически
        document.addEventListener('click', (e) => {
            // Проверяем, кликнули ли по изображению внутри .image-item
            const img = e.target.closest('.image-item img');
            if (img && img.src && !img.src.includes('placeholder')) {
                e.preventDefault();
                e.stopPropagation();
                
                // Получаем подпись изображения
                const imageItem = img.closest('.image-item');
                const label = imageItem ? imageItem.querySelector('.image-label') : null;
                const caption = label ? label.textContent : img.alt || 'Изображение';
                
                // Открываем в полноэкранном режиме
                openFullscreen(img.src, caption);
            }
        });
    }
    
    // Делаем функции доступными глобально
    window.initMapPage = initMapPage;
    window.openFullscreen = openFullscreen;
    window.closeFullscreen = closeFullscreen;
    
    // Настраиваем обработчики кликов на изображения после загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupImageClickHandlers);
    } else {
        setupImageClickHandlers();
    }
})();