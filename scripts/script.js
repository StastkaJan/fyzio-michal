window.addEventListener('DOMContentLoaded', () => {
    loadHorizonatalMove();
    timing();
    makeBullets();
    document.querySelector('div.slider').addEventListener('touchstart', handleTouchStart, false);
    document.querySelector('div.slider').addEventListener('touchmove', handleTouchMove, false);
    window.onscroll = asideTurnOff;
});

// horizontal scroll
function loadHorizonatalMove() {
    let sliderButtons = document.querySelectorAll('div.horizontalSlider > button');

    for (let i = 0; i < sliderButtons.length; i++) {
        sliderButtons[i].addEventListener('click', () => {
            horizontalMove(i);
        });
    }
}

let timeInterval;
function timing() {
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {
        horizontalMove(1, false);
    }, 5000);
}

function horizontalMove(direction, resetTiming) {
    let slider = document.querySelector('div.slider');
    let moved = parseFloat(slider.style.transform.match(/-?[0-9]+/g));
    let width = slider.children[0].offsetWidth;
    let totalWidth = slider.children.length * width;

    direction === 0 ? moved += width : moved -= width;

    (moved >= width) && (moved = -(totalWidth - width));
    (moved <= -totalWidth) && (moved = 0);

    move(slider, moved, resetTiming);
    activeBullet(Math.abs(moved / width));
}

function move(element, where, resetTiming) {
    element.style.transform = 'translateX(' + where + 'px)';
    resetTiming === undefined && setTimeout(() => { timing() }, 3000);
}

// bullets
function makeBullets() {
    let bullets = document.querySelector('div.bullets');
    let bulletsTotal = document.querySelector('div.slider').children.length;

    for (let i = 0; i < bulletsTotal; i++) {
        let span = document.createElement('span');

        (i === 0) && span.classList.add('active');

        bullets.appendChild(span);
    }

    bulletsClickable(bullets);
}

function bulletsClickable(bullets) {
    let slider = document.querySelector('div.slider');

    for (let i = 0; i < bullets.children.length; i++) {
        bullets.children[i].addEventListener('click', () => {
            move(slider, -i * slider.children[0].offsetWidth);
            activeBullet(i);
        });
    }
}

function activeBullet(i) {
    document.querySelector('div.bullets > span.active').classList.remove('active');
    document.querySelector('div.bullets').children[i].classList.add('active');
}

// swipe
let xDown = null;

function getTouches(evt) {
    return evt.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
};

function handleTouchMove(evt) {
    if (!xDown) {
        return;
    }

    (xDown - evt.touches[0].clientX) > 0 ? horizontalMove(1) : horizontalMove(0);
    xDown = null;
};

// aside turn off
function asideTurnOff() {
    let aside = document.querySelector('aside');
    let contact = document.getElementById('kontakt');

    if (window.scrollY > contact.offsetTop - window.innerHeight + 100) {
        aside.style.visibility = 'hidden';
    }
    else {
        aside.style.visibility = 'unset';
    }
}