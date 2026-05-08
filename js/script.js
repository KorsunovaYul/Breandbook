// ── Fade-хелперы для переключения картинок ──
const FADE_MS = 220;

function fadeSrc(img, newSrc, afterSet) {
    img.style.transition = `opacity ${FADE_MS}ms ease`;
    img.style.opacity = '0';
    setTimeout(() => {
        if (afterSet) afterSet();
        img.src = newSrc;
        requestAnimationFrame(() => { img.style.opacity = '1'; });
    }, FADE_MS);
}

function fadeActive(oldEl, newEl) {
    if (!newEl || oldEl === newEl) return;
    function showNext() {
        newEl.style.opacity = '0';
        newEl.classList.add('active');
        requestAnimationFrame(() => requestAnimationFrame(() => {
            newEl.style.transition = `opacity ${FADE_MS}ms ease`;
            newEl.style.opacity = '1';
            setTimeout(() => { newEl.style.transition = ''; newEl.style.opacity = ''; }, FADE_MS + 50);
        }));
    }
    if (oldEl) {
        oldEl.style.transition = `opacity ${FADE_MS}ms ease`;
        oldEl.style.opacity = '0';
        setTimeout(() => {
            oldEl.classList.remove('active');
            oldEl.style.transition = '';
            oldEl.style.opacity = '';
            showNext();
        }, FADE_MS);
    } else {
        showNext();
    }
}

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
const zadachaBtns  = document.querySelectorAll('.zadacha-btn');
const zadachaTexts = document.querySelectorAll('.zadacha-text');

// Фиксируем высоту обёртки по самому длинному тексту
(function () {
    const wrap = document.querySelector('.zadacha-text-wrap');
    if (!wrap) return;
    // Временно показываем все элементы невидимо для замера
    zadachaTexts.forEach(t => {
        t.style.display    = 'block';
        t.style.visibility = 'hidden';
        t.style.position   = 'absolute';
    });
    let maxH = 0;
    zadachaTexts.forEach(t => { maxH = Math.max(maxH, t.offsetHeight); });
    // Восстанавливаем
    zadachaTexts.forEach(t => {
        t.style.display    = '';
        t.style.visibility = '';
        t.style.position   = '';
    });
    wrap.style.minHeight = maxH + 'px';
})();
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
            const newSrc = `img/визуальная система/построение логотипа/${logotipState.lang} ${logotipState.podstr} ${logotipState.orient}.png`;
            fadeSrc(logotipImg, newSrc, () => {
                logotipImg.classList.toggle('logotip-img--wide', logotipState.orient === 'горизонтально');
            });
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
            const newSrc = `img/визуальная система/охранное поле/${ohrannoeState.lang} ${ohrannoeState.podstr} ${ohrannoeState.orient}.png`;
            fadeSrc(ohrannoeImg, newSrc, () => {
                ohrannoeImg.classList.toggle('ohrannoe-img--wide', isWide);
            });
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
        vsversiiImg.style.display = 'none';
        vsversiiCompare.style.display = 'block';
        vsversiiCompare.classList.toggle('vsversii-img--wide', isWide);
        const base = `img/визуальная система/все версии/${lang} чб на`;
        fadeSrc(compareDark,  `${base} черном фоне ${orient} ${podstr}.png`);
        fadeSrc(compareLight, `${base} белом фоне ${orient} ${podstr}.png`);
    } else {
        vsversiiImg.style.display = '';
        vsversiiCompare.style.display = 'none';
        const src = `img/визуальная система/все версии/${lang} ${color} ${orient} ${podstr}.png`;
        fadeSrc(vsversiiImg, src, () => {
            vsversiiImg.classList.toggle('vsversii-img--wide', isWide);
            vsversiiImg.onerror = () => { vsversiiImg.src = vsversiiPlaceholder; vsversiiImg.onerror = null; };
        });
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
    const src = `img/визуальная система/минимальные размеры/${minrazmerState.lang} ${minrazmerState.podstr} ${minrazmerState.orient} ${minrazmerState.type}.png`;
    fadeSrc(minrazmerImg, src, () => {
        minrazmerImg.classList.toggle('minrazmery-img--wide', isWide);
        minrazmerImg.onerror = () => { minrazmerImg.src = minrazmerPlaceholder; minrazmerImg.onerror = null; };
    });
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
        btn.classList.add('active');
        const oldEl = Array.from(postroeneImgs).find(el => el.classList.contains('active'));
        fadeActive(oldEl, postroeneImgs[i]);
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

        const oldEl = imgCol.querySelector('.pattern-img.active');
        const newEl = imgCol.querySelector('.pattern-img--' + btn.dataset.pattern);
        fadeActive(oldEl, newEl);
    });
});

// Анимация — переключение горизонтальная/вертикальная
document.querySelectorAll('.animaciya-radio-wrap input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelectorAll('.animaciya-video').forEach(v => {
            v.classList.remove('active');
            v.pause();
        });
        const target = document.querySelector('.animaciya-video--' + radio.value);
        if (target) {
            target.classList.add('active');
            target.play();
        }
    });
});

// Вопросы — слайдер 10 мини-иллюстраций
(function () {
    const base = 'img/визуальная система/Игра/';
    const slides = [
        { src: base + 'Аленький цветочек.png',                          caption: 'Аленький цветочек' },
        { src: base + 'буханка.png',                                     caption: 'Буханка' },
        { src: base + 'герб ульяновска.png',                             caption: 'Герб Ульяновска' },
        { src: base + 'И.А. Гончаров.png',                               caption: 'И.А. Гончаров' },
        { src: base + 'Крепость.png',                                    caption: 'Крепость' },
        { src: base + 'ленин.png',                                       caption: 'Ленин' },
        { src: base + 'самолёт.png',                                     caption: 'Самолёт' },
        { src: base + 'симбирцит.png',                                   caption: 'Симбирцит' },
        { src: base + 'титанозавр.png',                                   caption: 'Volgatitan simbirskiensis — титанозавр' },
        { src: base + 'Frame 2147238678.png',                            caption: 'Президентский мост' },
    ];

    const img     = document.querySelector('.voprosy-img');
    const caption = document.querySelector('.voprosy-caption');
    const counter = document.querySelector('.voprosy-counter');
    const btnPrev = document.querySelector('.voprosy-prev');
    const btnNext = document.querySelector('.voprosy-next');

    if (!img || !btnPrev || !btnNext) return;

    let current = 0;

    function show(idx) {
        current = (idx + slides.length) % slides.length;
        img.alt = slides[current].caption;
        caption.textContent = slides[current].caption;
        counter.textContent = (current + 1) + ' / ' + slides.length;
        fadeSrc(img, slides[current].src);
    }

    btnPrev.addEventListener('click', () => show(current - 1));
    btnNext.addEventListener('click', () => show(current + 1));

    show(0);
})();

// Маршруты — переключатель иллюстраций через radio-инпуты
document.querySelectorAll('.marshr-radio-wrap input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const igraImgs = document.querySelector('#igra-hero-imgs');
        if (igraImgs && igraImgs.querySelector('.marshr-img--' + radio.value)) {
            const oldEl = igraImgs.querySelector('.marshr-img.active');
            const newEl = igraImgs.querySelector('.marshr-img--' + radio.value);
            fadeActive(oldEl, newEl);
            return;
        }
        const imgCol = radio.closest('.marshr-grid')?.querySelector('.marshr-img-col');
        if (!imgCol) return;
        const oldEl = imgCol.querySelector('.marshr-img.active');
        const newEl = imgCol.querySelector('.marshr-img--' + radio.value);
        fadeActive(oldEl, newEl);
    });
});

// Паттерн — все версии: переключатель через radio-инпуты
document.querySelectorAll('.pattern-radio-wrap input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const imgCol = radio.closest('.pattern-grid')?.querySelector('.pattern-img-col');
        if (!imgCol) return;
        const oldEl = imgCol.querySelector('.pattern-img.active');
        const newEl = imgCol.querySelector('.pattern-img--' + radio.value);
        fadeActive(oldEl, newEl);
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

        const oldEl = imgCol.querySelector('.grafika-img.active');
        const newEl = imgCol.querySelector('.grafika-img--' + btn.dataset.grafika);
        fadeActive(oldEl, newEl);
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

// ── StyleGuide: активный таб по клику ──
(function () {
    const tabs = document.querySelectorAll('.sg-tabs .grafika-tab');
    if (!tabs.length) return;

    // первый таб активен при загрузке
    tabs[0].classList.add('active');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
})();

// ── StyleGuide: Типографическая иерархия — переключатель ──
(function () {
    // null = строка скрыта на этом устройстве
    const typoSpecs = {
        desktop: {
            h1:   { label: 'Заголовок 1',         size: '96 px', lh: 'Auto'  },
            h2:   { label: 'Заголовок 2',         size: '64 px', lh: '59 px' },
            h3:   { label: 'Заголовок 3',         size: '48 px', lh: '50 px' },
            txt1: { label: 'Текст 1',             size: '24 px', lh: 'Auto'  },
            hl1:  { label: 'Выделение в тексте 1', size: '24 px', lh: 'Auto'  },
            txt2: { label: 'Текст 2',             size: '20 px', lh: 'Auto'  },
            hl2:  { label: 'Выделение в тексте 2', size: '20 px', lh: 'Auto'  },
            hl3:  { label: 'Выделение в тексте 3', size: '20 px', lh: 'Auto'  },
        },
        lptop: {
            h1:   { label: 'Заголовок 1',         size: '64 px', lh: 'Auto'  },
            h2:   { label: 'Заголовок 2',         size: '48 px', lh: '40 px' },
            h3:   { label: 'Заголовок 3',         size: '32 px', lh: '30 px' },
            txt1: { label: 'Текст 1',             size: '20 px', lh: 'Auto'  },
            hl1:  { label: 'Выделение в тексте 1', size: '20 px', lh: 'Auto'  },
            txt2: { label: 'Текст 2',             size: '16 px', lh: 'Auto'  },
            hl2:  { label: 'Выделение в тексте 2', size: '16 px', lh: 'Auto'  },
            hl3:  { label: 'Выделение в тексте 3', size: '16 px', lh: 'Auto'  },
        },
        mobile: {
            h1:   { label: 'Заголовок 1',         size: '48 px', lh: '48 px' },
            h2:   { label: 'Заголовок 2',         size: '36 px', lh: '40 px' },
            h3:   { label: 'Заголовок 3',         size: '24 px', lh: '24 px' },
            txt1: { label: 'Текст',               size: '16 px', lh: 'Auto'  },
            hl1:  { label: 'Выделение в тексте 1', size: '18 px', lh: 'Auto'  },
            txt2: null,
            hl2:  { label: 'Выделение в тексте 2', size: '15 px', lh: 'Auto'  },
            hl3:  { label: 'Выделение в тексте 3', size: '16 px', lh: 'Auto'  },
        },
    };

    function applyTypoDevice(device) {
        const specs = typoSpecs[device];
        if (!specs) return;
        document.querySelectorAll('.sg-typo-row[data-key]').forEach(row => {
            const key  = row.dataset.key;
            const spec = specs[key];
            if (!spec) { row.style.display = 'none'; return; }
            row.style.display = '';
            const sampleEl = row.querySelector('.sg-typo-sample');
            const sizeEl   = row.querySelector('.sg-typo-spec--size');
            const lhEl     = row.querySelector('.sg-typo-spec--lh');
            if (sampleEl) {
                sampleEl.textContent = spec.label;
                // на мобилке образцы всегда в мобильном размере — только подпись меняется
                if (window.innerWidth > 768) {
                    sampleEl.style.fontSize = spec.size.replace(' px', 'px');
                }
            }
            if (sizeEl) sizeEl.textContent = spec.size;
            if (lhEl)   lhEl.textContent   = spec.lh;
        });
    }

    // iPad в сетке — отдельное устройство, в типографике совпадает с Laptop
    function applyTypoForDevice(device) {
        applyTypoDevice(device === 'ipad' ? 'lptop' : device);
    }

    // применить сразу при загрузке
    applyTypoDevice('desktop');

    // слушаем единый глобальный тогл в шапке
    document.querySelectorAll('#sg-global-device input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => applyTypoForDevice(radio.value));
    });
})();

// ── StyleGuide: переключатель устройств ──
(function () {
    // margin = (total − cols×col_width − (cols−1)×gap) / 2
    const deviceSpecs = {
        desktop: { total: 1920, margin: 160, gap: 20, cols: 12 }, // (1920−12×115−11×20)/2
        lptop:   { total: 1366, margin: 93,  gap: 20, cols: 12 }, // (1366−12×80−11×20)/2
        ipad:    { total: 834,  margin: 53,  gap: 16, cols: 6  }, // (834−6×108−5×16)/2
        mobile:  { total: 375,  margin: 16,  gap: 16, cols: 4  }, // (375−4×74−3×16)/2 ≈16
    };

    const viz       = document.querySelector('.sg-grid-viz');
    const colsEl    = document.querySelector('.sg-grid-cols');
    const lblMargin = document.querySelector('.sg-anno--margin .sg-anno-label');
    const lblGap    = document.querySelector('.sg-anno--gap    .sg-anno-label');
    const lblTotal  = document.querySelector('.sg-anno--total  .sg-anno-label');

    if (!viz || !colsEl) return;

    function applySpec(spec) {
        const widthPct = (spec.total / 1920 * 100).toFixed(3) + '%';

        // ширина одной колонки в px, затем позиция зазора как % от total
        const colWidth  = (spec.total - 2 * spec.margin - (spec.cols - 1) * spec.gap) / spec.cols;
        const gapLeftPct = ((spec.margin + colWidth) / spec.total * 100).toFixed(4) + '%';

        viz.style.setProperty('--sg-total',        spec.total);
        viz.style.setProperty('--sg-margin-px',    spec.margin);
        viz.style.setProperty('--sg-gap-px',       spec.gap);
        viz.style.setProperty('--sg-num-cols',     spec.cols);
        viz.style.setProperty('--sg-width-pct',    widthPct);
        viz.style.setProperty('--sg-gap-left-pct', gapLeftPct);

        colsEl.style.gridTemplateColumns = `repeat(${spec.cols}, 1fr)`;
        if (lblMargin) lblMargin.textContent = `${spec.margin} px`;
        if (lblGap)    lblGap.textContent    = `${spec.gap} px`;
        if (lblTotal)  lblTotal.textContent  = `${spec.total} px`;
    }

    // слушаем единый глобальный тогл в шапке
    document.querySelectorAll('#sg-global-device input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const spec = deviceSpecs[radio.value];
            if (spec) applySpec(spec);
        });
    });
})();

// ── StyleGuide: data-sg-device на knopki-блоке и блоке карточек ──
(function () {
    const knopki   = document.getElementById('sg-knopki');
    const twoCol   = document.querySelector('.sg-two-col-block');

    const spec = document.getElementById('sg-spec');

    function setDevice(val) {
        if (knopki) knopki.setAttribute('data-sg-device', val);
        if (twoCol)  twoCol.setAttribute('data-sg-device', val);
        if (spec) {
            spec.setAttribute('data-sg-device', val);

            // Высота gap-зон пропорционально значению
            spec.querySelectorAll('.sg-mock-gap[data-h-desktop]').forEach(gap => {
                let h;
                if (val === 'mobile')                     h = gap.dataset.hMobile;
                else if (val === 'lptop' || val === 'ipad') h = gap.dataset.hLptop || gap.dataset.hDesktop;
                else                                      h = gap.dataset.hDesktop;
                gap.style.height = h + 'px';
            });

            // Обновляем текст значений в сайдбаре
            spec.querySelectorAll('.sg-spec-label-px[data-desktop]').forEach(px => {
                let v;
                if (val === 'mobile')                     v = px.dataset.mobile;
                else if (val === 'lptop' || val === 'ipad') v = px.dataset.lptop || px.dataset.desktop;
                else                                      v = px.dataset.desktop;
                px.textContent = (v || px.dataset.desktop) + ' px';
            });

            // Сбрасываем активный лейбл при смене устройства
            spec.querySelectorAll('.sg-spec-label').forEach(l => l.classList.remove('active'));
            spec.querySelectorAll('.sg-mock-gap').forEach(g => g.classList.remove('active'));
        }
    }
    setDevice('desktop');
    document.querySelectorAll('#sg-global-device input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => setDevice(radio.value));
    });
})();

// ── StyleGuide: Иконки — переключение с сеткой / без сетки ──
(function () {
    const radios = document.querySelectorAll('input[name="sg-icons-grid"]');
    const strips = document.querySelectorAll('.sg-icon-strip');
    if (!radios.length || !strips.length) return;

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const val = radio.value;
            strips.forEach(img => fadeSrc(img, img.dataset[val]));
        });
    });
})();

// ── StyleGuide: Кнопки — тогл «выбрано» для Московский мост ──
(function () {
    const quizBtn = document.querySelector('.sgk-quiz-btn');
    if (!quizBtn) return;
    quizBtn.addEventListener('click', () => {
        quizBtn.classList.toggle('sgk-quiz-btn--selected');
    });
})();

// ── StyleGuide: Кнопки — дропдаун фильтра ──
(function () {
    const sortBtn  = document.querySelector('.sgk-sort-btn');
    const dropdown = document.querySelector('.sgk-sort-dropdown');
    if (!sortBtn || !dropdown) return;

    sortBtn.addEventListener('click', () => {
        const expanded = sortBtn.getAttribute('aria-expanded') === 'true';
        sortBtn.setAttribute('aria-expanded', String(!expanded));
        if (expanded) {
            dropdown.setAttribute('hidden', '');
        } else {
            dropdown.removeAttribute('hidden');
        }
    });

    dropdown.querySelectorAll('.sgk-sort-option').forEach(opt => {
        opt.addEventListener('click', () => {
            dropdown.querySelectorAll('.sgk-sort-option').forEach(o => o.classList.remove('sgk-sort-option--active'));
            opt.classList.add('sgk-sort-option--active');
            sortBtn.querySelector('span').textContent = opt.textContent;
            sortBtn.setAttribute('aria-expanded', 'false');
            dropdown.setAttribute('hidden', '');
        });
    });

    // Закрыть при клике вне блока
    document.addEventListener('click', e => {
        if (!sortBtn.closest('.sgk-sort-wrap').contains(e.target)) {
            sortBtn.setAttribute('aria-expanded', 'false');
            dropdown.setAttribute('hidden', '');
        }
    });
})();

// ── Спецификация: клик по лейблу → подсветка отступов в мокапе ──
(function () {
    const labels = document.querySelectorAll('.sg-spec-label');
    if (!labels.length) return;

    labels.forEach(label => {
        label.addEventListener('click', () => {
            const gapId  = label.dataset.gap;
            const isActive = label.classList.contains('active');

            // Сбрасываем всё
            labels.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.sg-mock-gap').forEach(g => g.classList.remove('active'));

            if (!isActive) {
                label.classList.add('active');
                document.querySelectorAll(`.sg-mock-gap[data-gap-id="${gapId}"]`)
                    .forEach(g => g.classList.add('active'));
            }
        });
    });
})();
