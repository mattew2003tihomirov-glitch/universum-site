// Инициализация Swiper-слайдера
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// ===== Галерея благодарностей =====
document.addEventListener('DOMContentLoaded', function () {
    // Инициализация отдельного Swiper для блока благодарностей
    if (typeof Swiper !== 'undefined') {
        const thanksSwiper = new Swiper('.thanks-swiper', {
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            speed: 700,
            // плавные переключения и автоплей
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: '.thanks-next',
                prevEl: '.thanks-prev'
            },
            pagination: {
                el: '.thanks-pagination',
                clickable: true
            },
            // повышаем отзывчивость на разных ширинах
            breakpoints: {
                0: { speed: 650 },
                768: { speed: 700 },
                1200: { speed: 750 }
            }
        });

        // Дополнительно: пауза при фокусе/ховере контейнера (на случай тач-девайсов)
        const $wrap = document.querySelector('.thanks-swiper');
        if ($wrap) {
            $wrap.addEventListener('mouseenter', () => thanksSwiper.autoplay?.stop());
            $wrap.addEventListener('mouseleave', () => thanksSwiper.autoplay?.start());
            $wrap.addEventListener('focusin', () => thanksSwiper.autoplay?.stop());
            $wrap.addEventListener('focusout', () => thanksSwiper.autoplay?.start());

            // Клавиатура: стрелки ←/→
            $wrap.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); thanksSwiper.slidePrev(); }
                if (e.key === 'ArrowRight') { e.preventDefault(); thanksSwiper.slideNext(); }
            });
        }
    }
});



