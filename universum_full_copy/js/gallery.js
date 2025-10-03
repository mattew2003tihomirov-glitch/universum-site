/* ========== Галерея благодарностей ========== */
const thanksSwiper = new Swiper('.thanks-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.thanks-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.thanks-next',
        prevEl: '.thanks-prev',
    },
    effect: 'slide',
    speed: 600,
});

/* При наведении мыши — останавливаем autoplay */
const thanksSection = document.querySelector('.thanks-swiper');
if (thanksSection) {
    thanksSection.addEventListener('mouseenter', () => thanksSwiper.autoplay.stop());
    thanksSection.addEventListener('mouseleave', () => thanksSwiper.autoplay.start());
}

/* ========== Галерея партнёров ========== */
const partnersCarousel = document.querySelector('.partners-carousel');
const carouselTrack = document.querySelector('.carousel-track');
let currentIndex = 0;
let intervalId;

function movePartnersCarousel() {
    const groups = document.querySelectorAll('.carousel-group');
    if (!groups.length) return;

    currentIndex = (currentIndex + 1) % groups.length;
    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
}

/* Автопрокрутка каждые 3 секунды */
function startPartnersCarousel() {
    intervalId = setInterval(movePartnersCarousel, 3000);
}
function stopPartnersCarousel() {
    clearInterval(intervalId);
}

if (partnersCarousel) {
    startPartnersCarousel();
    partnersCarousel.addEventListener('mouseenter', stopPartnersCarousel);
    partnersCarousel.addEventListener('mouseleave', startPartnersCarousel);
}

// Lightbox для благодарностей
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

document.querySelectorAll(".thanks-card img").forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});
