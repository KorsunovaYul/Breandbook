// Мобильное меню — бургер
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('.nav-overlay');

function closeMenu() {
    burger.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    overlay.addEventListener('click', closeMenu);


    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Цели брендбука — переключение
const celBtns = document.querySelectorAll('.cel-btn');
const celTexts = document.querySelectorAll('.cel-text');
let current = 0;

function switchTo(index) {
    celBtns.forEach(b => b.classList.remove('active'));
    celTexts.forEach(t => t.classList.remove('active'));
    celBtns[index].classList.add('active');
    celTexts[index].classList.add('active');
    current = index;
}

// Клик по цифре
celBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        switchTo(i);
        resetTimer();
    });
});

// Автоматическое переключение каждые 10 секунд
let timer = setInterval(autoSwitch, 10000);

function autoSwitch() {
    switchTo((current + 1) % celBtns.length);
}

// Сброс таймера при ручном клике
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSwitch, 10000);
}

// Основные задачи — переключение как у целей
const zadachaBtns = document.querySelectorAll('.zadacha-btn');
const zadachaTexts = document.querySelectorAll('.zadacha-text');
let currentZadacha = 0;

function switchZadachaTo(index) {
    zadachaBtns.forEach(b => b.classList.remove('active'));
    zadachaTexts.forEach(t => t.classList.remove('active'));
    zadachaBtns[index].classList.add('active');
    zadachaTexts[index].classList.add('active');
    currentZadacha = index;
}

zadachaBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        switchZadachaTo(i);
        clearInterval(zadachaTimer);
        zadachaTimer = setInterval(autoSwitchZadacha, 10000);
    });
});

let zadachaTimer = setInterval(autoSwitchZadacha, 10000);

function autoSwitchZadacha() {
    switchZadachaTo((currentZadacha + 1) % zadachaBtns.length);
}

// Ключевые сообщения — авторотация каждые 6 секунд
const soobsheniya = document.querySelectorAll('.soobshenie');
let currentSoobshenie = 0;

function switchSoobshenie() {
    soobsheniya[currentSoobshenie].classList.remove('active');
    currentSoobshenie = (currentSoobshenie + 1) % soobsheniya.length;
    soobsheniya[currentSoobshenie].classList.add('active');
}

setInterval(switchSoobshenie, 6000);

// Конкурентные преимущества — авторотация каждые 6 секунд
const preimushchestva = document.querySelectorAll('.preim');
let currentPreim = 0;

function switchPreim() {
    preimushchestva[currentPreim].classList.remove('active');
    currentPreim = (currentPreim + 1) % preimushchestva.length;
    preimushchestva[currentPreim].classList.add('active');
}

setInterval(switchPreim, 6000);

// Целевая аудитория — переключение вкладок
const caTabs = document.querySelectorAll('.ca-tab');
const caContents = document.querySelectorAll('.ca-content');

caTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
        caTabs.forEach(t => t.classList.remove('active'));
        caContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        caContents[i].classList.add('active');
    });
});

// Логотип — интерактивные кружки-хотспоты
const hotspots = document.querySelectorAll('.hotspot');
const logoInteractive = document.querySelector('.logo-interactive');
const hotspotPopups = document.querySelectorAll('.hotspot-popup');

function resetHotspots() {
    hotspots.forEach(h => h.classList.remove('active', 'dimmed'));
    hotspotPopups.forEach(p => p.classList.remove('active'));
    if (logoInteractive) logoInteractive.removeAttribute('data-active');
}

hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = hotspot.dataset.id;
        const isActive = hotspot.classList.contains('active');

        resetHotspots();

        if (!isActive) {
            // Активируем точку — заполняем тёмно-синим
            hotspot.classList.add('active');
            // Остальные точки — прозрачные
            hotspots.forEach(h => { if (h !== hotspot) h.classList.add('dimmed'); });
            // Затухание элементов логотипа через data-active
            if (logoInteractive) logoInteractive.dataset.active = id;
            // Показываем фото
            const popup = document.querySelector(`.hotspot-popup[data-for="${id}"]`);
            if (popup && popup.children.length > 0) popup.classList.add('active');
        }
    });
});

// Клик по фону — сброс
document.addEventListener('click', resetHotspots);


// Построение логотипа — 3 независимых фильтра
const logotipImg = document.querySelector('.logotip-img');
const logotipState = { lang: 'rus', podstr: 'без', orient: 'горизонтально' };

document.querySelectorAll('.logotip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        document.querySelectorAll(`.logotip-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        logotipState[group] = btn.dataset.val;
        if (logotipImg) {
            logotipImg.src = `img/визуальная система/построение логотипа/${logotipState.lang} ${logotipState.podstr} ${logotipState.orient}.png`;
            logotipImg.classList.toggle('logotip-img--wide', logotipState.orient === 'горизонтально');
        }
    });
});

// Охранное поле — 3 независимых фильтра
const ohrannoeImg = document.querySelector('.ohrannoe-img');
const ohrannoeState = { lang: 'rus', podstr: 'без', orient: 'вертикально' };

document.querySelectorAll('.ohrannoe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        document.querySelectorAll(`.ohrannoe-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        ohrannoeState[group] = btn.dataset.val;
        if (ohrannoeImg) {
            const isWide = ohrannoeState.orient === 'горизонтально';
            ohrannoeImg.classList.toggle('ohrannoe-img--wide', isWide);
            ohrannoeImg.src = `img/визуальная система/охранное поле/${ohrannoeState.lang} ${ohrannoeState.podstr} ${ohrannoeState.orient}.png`;
        }
    });
});

// Все версии — 4 независимых фильтра + слайдер сравнения для чб
const vsversiiImg     = document.querySelector('.vsversii-img');
const vsversiiCompare = document.querySelector('.vsversii-compare');
const compareDark     = document.querySelector('.compare-dark');
const compareLight    = document.querySelector('.compare-light');
const vsversiiPlaceholder = 'img/визуальная система/Лого Верт светлый без слогана.svg';
// Реальный формат файла: {lang} {color} {orient} {podstr}.png
// orient: верт / гор   podstr: без / с   color: светлая / тёмная
// чб: {lang} чб на {черном/белом} фоне {orient} {podstr}.png
const vsversiiState = { lang: 'rus', podstr: 'без', orient: 'верт', color: 'светлая' };

function updateVsversii() {
    if (!vsversiiImg) return;
    const { lang, podstr, orient, color } = vsversiiState;
    const isWide = orient === 'гор';

    if (color === 'чб') {
        // Показываем слайдер, скрываем обычное фото
        vsversiiImg.style.display = 'none';
        vsversiiCompare.style.display = 'block';
        vsversiiCompare.classList.toggle('vsversii-img--wide', isWide);

        const base = `img/визуальная система/все версии/${lang} чб на`;
        compareDark.src  = `${base} черном фоне ${orient} ${podstr}.png`;
        compareLight.src = `${base} белом фоне ${orient} ${podstr}.png`;
    } else {
        // Обычное фото
        vsversiiImg.style.display = '';
        vsversiiCompare.style.display = 'none';
        vsversiiImg.classList.toggle('vsversii-img--wide', isWide);
        const src = `img/визуальная система/все версии/${lang} ${color} ${orient} ${podstr}.png`;
        vsversiiImg.onerror = () => { vsversiiImg.src = vsversiiPlaceholder; vsversiiImg.onerror = null; };
        vsversiiImg.src = src;
    }
}

document.querySelectorAll('.vsversii-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        document.querySelectorAll(`.vsversii-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        vsversiiState[group] = btn.dataset.val;
        updateVsversii();
    });
});

// Слайдер сравнения чб
(function () {
    const container = document.querySelector('.vsversii-compare');
    if (!container) return;
    const dark    = container.querySelector('.compare-dark');
    const divider = container.querySelector('.compare-divider');
    let dragging  = false;

    function setPos(clientX) {
        const rect = container.getBoundingClientRect();
        const pct  = Math.max(0, Math.min(100, (clientX - rect.left) / rect.width * 100));
        dark.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        divider.style.left  = pct + '%';
    }

    // Начальная позиция 50%
    function reset() {
        dark.style.clipPath = 'inset(0 50% 0 0)';
        divider.style.left  = '50%';
    }
    reset();

    // Наблюдаем когда слайдер становится видимым — сбрасываем позицию
    new MutationObserver(() => {
        if (container.style.display !== 'none') reset();
    }).observe(container, { attributes: true, attributeFilter: ['style'] });

    container.addEventListener('mousedown', (e) => { dragging = true; setPos(e.clientX); e.preventDefault(); });
    document.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
    document.addEventListener('mouseup',   () => { dragging = false; });

    container.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchmove',   (e) => { if (dragging) setPos(e.touches[0].clientX); },   { passive: true });
    document.addEventListener('touchend',    () => { dragging = false; });
})();

// Минимальные размеры — 4 независимых фильтра
const minrazmerImg = document.querySelector('.minrazmery-img');
const minrazmerPlaceholder = 'img/визуальная система/Лого Верт светлый без слогана.svg';
const minrazmerState = { lang: 'rus', podstr: 'без', orient: 'горизонтально', type: 'печать' };

function updateMinrazmery() {
    if (!minrazmerImg) return;
    const isWide = minrazmerState.orient === 'горизонтально';
    minrazmerImg.classList.toggle('minrazmery-img--wide', isWide);
    const src = `img/визуальная система/минимальные размеры/${minrazmerState.lang} ${minrazmerState.podstr} ${minrazmerState.orient} ${minrazmerState.type}.png`;
    minrazmerImg.onerror = () => { minrazmerImg.src = minrazmerPlaceholder; minrazmerImg.onerror = null; };
    minrazmerImg.src = src;
}

document.querySelectorAll('.minrazmery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        document.querySelectorAll(`.minrazmery-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        minrazmerState[group] = btn.dataset.val;
        updateMinrazmery();
    });
});

// Построение знака — переключение картинки
const postroeneBtns = document.querySelectorAll('.postroenie-btn');
const postroeneImgs = document.querySelectorAll('.postroenie-img');

postroeneBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        postroeneBtns.forEach(b => b.classList.remove('active'));
        postroeneImgs.forEach(img => img.classList.remove('active'));
        btn.classList.add('active');
        postroeneImgs[i].classList.add('active');
    });
});

// Название — переключение языка RUS / ENG
const langBtns = document.querySelectorAll('.lang-btn');
const langContents = document.querySelectorAll('.nazvanie-lang');

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        langBtns.forEach(b => b.classList.remove('active'));
        langContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('nazvanie-' + lang).classList.add('active');
    });
});

// Ошибки при использовании — бесконечный автоскролл + drag
(function () {
    const viewport = document.querySelector('.oshibki-viewport');
    const track = document.querySelector('.oshibki-track');
    if (!viewport || !track) return;

    // Дублируем карточки для бесконечного зацикливания
    Array.from(track.children).forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    const SPEED = 0.5;      // пикселей за кадр (~30px/с при 60fps) — медленно
    let position = 0;
    let isDragging = false;
    let lastX = 0;

    function halfWidth() {
        return track.scrollWidth / 2;
    }

    function tick() {
        if (!isDragging) {
            position += SPEED;
        }
        // зацикливание: когда прошли половину (оригинал), сбрасываемся
        if (position >= halfWidth()) position -= halfWidth();
        if (position < 0) position += halfWidth();

        track.style.transform = `translateX(${-position}px)`;
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Мышь — drag
    viewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastX = e.clientX;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        position -= (e.clientX - lastX);
        lastX = e.clientX;
    });

    document.addEventListener('mouseup', () => { isDragging = false; });

    // Touch — drag
    viewport.addEventListener('touchstart', (e) => {
        isDragging = true;
        lastX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        position -= (e.touches[0].clientX - lastX);
        lastX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', () => { isDragging = false; });
})();

// Типографика — кнопки Light / Regular / Bold для Inter
document.querySelectorAll('.typo-weight-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.typo-weight-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const weight = btn.dataset.weight;
        document.querySelectorAll('.typo-alphabet--inter').forEach(el => {
            el.style.fontWeight = weight;
        });
    });
});

// Типографика — слайдер размера с катящимся индикатором
(function () {
    const dots      = document.querySelectorAll('.typo-dot');
    const indicator = document.querySelector('.typo-dot-indicator');

    function moveIndicator(dot) {
        if (!indicator) return;
        // Центр точки относительно родителя (.typo-slider-dots)
        const center = dot.offsetLeft + dot.offsetWidth / 2;
        indicator.style.left = (center - indicator.offsetWidth / 2) + 'px';
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            moveIndicator(dot);
            const heading = document.querySelector('.typo-preview-heading');
            if (heading) heading.style.fontSize = dot.dataset.size;
        });
    });

    // Ставим индикатор на активную точку после первого рендера
    requestAnimationFrame(() => {
        const activeDot = document.querySelector('.typo-dot.active');
        if (activeDot) moveIndicator(activeDot);
    });
})();

// Паттерн — построение: переключатель кнопками (геометрическое / сетка)
document.querySelectorAll('.pattern-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const wrap   = btn.closest('.pattern-mode-wrap');
        const imgCol = btn.closest('.pattern-grid')?.querySelector('.pattern-img-col');
        if (!wrap || !imgCol) return;

        wrap.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        imgCol.querySelectorAll('.pattern-img').forEach(img => img.classList.remove('active'));
        const target = imgCol.querySelector('.pattern-img--' + btn.dataset.pattern);
        if (target) target.classList.add('active');
    });
});

// Паттерн — все версии: переключатель через radio-инпуты
document.querySelectorAll('.pattern-radio-wrap input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const imgCol = radio.closest('.pattern-grid')?.querySelector('.pattern-img-col');
        if (!imgCol) return;
        imgCol.querySelectorAll('.pattern-img').forEach(img => img.classList.remove('active'));
        const target = imgCol.querySelector('.pattern-img--' + radio.value);
        if (target) target.classList.add('active');
    });
});

// Графические элементы — переключатель картинок (геометрическое / углы / сетка)
document.querySelectorAll('.grafika-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const wrap = btn.closest('.grafika-mode-wrap');
        const imgCol = btn.closest('.grafika-grid')?.querySelector('.grafika-img-col');
        if (!wrap || !imgCol) return;

        // Снимаем active со всех кнопок в этой группе
        wrap.querySelectorAll('.grafika-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Скрываем все картинки, показываем нужную
        imgCol.querySelectorAll('.grafika-img').forEach(img => img.classList.remove('active'));
        const target = imgCol.querySelector('.grafika-img--' + btn.dataset.grafika);
        if (target) target.classList.add('active');
    });
});

// Цветовая система — переключатель ВЕБ / ПЕЧАТЬ
// Каждая кнопка управляет ближайшей .colors-grid внутри своего .color-block
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const block = btn.closest('.color-block');
        const grid  = block ? block.querySelector('.colors-grid') : null;
        const wrap  = btn.closest('.colors-mode-wrap');

        // Сбрасываем только кнопки в этой же группе
        if (wrap) wrap.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (grid) {
            if (btn.dataset.mode === 'print') {
                grid.classList.add('print-mode');
            } else {
                grid.classList.remove('print-mode');
            }
        }
    });
});

// Цветовая система — копирование кода по клику
document.querySelectorAll('.color-codes span').forEach(span => {
    span.addEventListener('click', () => {
        // Берём часть после ": "  (например "2376D9" или "035 118 217")
        const value = span.textContent.split(': ')[1]?.trim();
        if (!value) return;

        navigator.clipboard.writeText(value).then(() => {
            const original = span.textContent;
            span.textContent = 'Скопировано!';
            span.classList.add('copied');
            setTimeout(() => {
                span.textContent = original;
                span.classList.remove('copied');
            }, 1500);
        }).catch(() => {
            // Фолбэк для старых браузеров
            const el = document.createElement('textarea');
            el.value = value;
            el.style.position = 'fixed';
            el.style.opacity = '0';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            const original = span.textContent;
            span.textContent = 'Скопировано!';
            span.classList.add('copied');
            setTimeout(() => {
                span.textContent = original;
                span.classList.remove('copied');
            }, 1500);
        });
    });
});

