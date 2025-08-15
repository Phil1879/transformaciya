        // Анимация при скролле
        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('appear');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
            
            // Переключение языка
            const langButtons = document.querySelectorAll('.lang-btn');
            langButtons.forEach(button => {
                button.addEventListener('click', function() {
                    langButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Плавная прокрутка
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });