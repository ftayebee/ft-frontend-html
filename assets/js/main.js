$(document).ready(function () {
    // Apply stored theme on page load
    const toggleBtn = $('#toggle-theme');
    const themeIcon = $('.theme-icon');

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = savedTheme;
    updateIcon(savedTheme);

    // Toggle theme
    toggleBtn.on('click', function () {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-sun-fill" viewBox="0 0 16 16">
                    <path d="M8 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 0zm0 14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zM0 8a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1A.5.5 0 0 1 0 8zm14 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zM3.354 3.354a.5.5 0 1 1 .707-.707l.707.707a.5.5 0 1 1-.707.707l-.707-.707zm9.192 9.192a.5.5 0 1 1 .707-.707l.707.707a.5.5 0 1 1-.707.707l-.707-.707zM3.354 12.646a.5.5 0 1 1 .707.707l-.707.707a.5.5 0 1 1-.707-.707l.707-.707zm9.192-9.192a.5.5 0 1 1 .707.707l-.707.707a.5.5 0 1 1-.707-.707l.707-.707zM8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
                </svg>
            `);
        } else {
            themeIcon.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-moon-fill" viewBox="0 0 16 16">
                    <path d="M6 0a6 6 0 0 0 0 12c3.3 0 6-2.7 6-6S9.3 0 6 0z"/>
                </svg>
            `);
        }
    }

    const navbar = $('#main-navbar');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    const techSwiper = new Swiper('.techSwiper', {
        slidesPerView: 5,
        spaceBetween: 40,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
        },
    });

    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML;
    }
});
