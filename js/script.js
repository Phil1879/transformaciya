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
// Инициализация кликов по сертификатам
document.addEventListener('DOMContentLoaded', function() {
  const certificates = Array.from(document.querySelectorAll('.certificate-img'));
  let currentIndex = 0;
  const modalImg = document.getElementById('modalCertificateImg');
  const modal = new bootstrap.Modal(document.getElementById('certificateModal'));

  // Функция обновления изображения
  function updateModalImage(index) {
    if (index >= 0 && index < certificates.length) {
      currentIndex = index;
      modalImg.src = certificates[currentIndex].src;
      modalImg.style.maxHeight = '90vh';
      modalImg.style.maxWidth = '95vw';
    }
  }

  // Обработчики кликов по сертификатам
  certificates.forEach((cert, index) => {
    cert.addEventListener('click', function() {
      currentIndex = index;
      updateModalImage(currentIndex);
      modal.show();
    });
  });

  // Кнопка "Назад"
  document.getElementById('prevCert').addEventListener('click', function(e) {
    e.stopPropagation();
    updateModalImage(currentIndex - 1);
  });

  // Кнопка "Вперед"
  document.getElementById('nextCert').addEventListener('click', function(e) {
    e.stopPropagation();
    updateModalImage(currentIndex + 1);
  });

  // Обработчики клавиатуры
  document.addEventListener('keydown', function(e) {
    if (modal._element.classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        updateModalImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateModalImage(currentIndex + 1);
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.querySelector('section:first-of-type');
  const callBtn = document.getElementById('floatingCallBtn');
  const heroSection = document.getElementById('hero');
  const formSection = document.getElementById('callFormSection');
  
  // Обработчик клика по кнопке
  callBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Добавляем класс для затемнения
    heroSection.classList.add('form-focus');
    
    // Прокручиваем к форме с плавным скроллом
    formSection.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Через 5 секунд убираем затемнение
    setTimeout(function() {
      heroSection.classList.remove('form-focus');
    }, 700);
  });
});

// Форма EmailJS
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const sendFormData = async (e) => {
      e.preventDefault();

      // 1. Подготовка данных формы
      const formData = new FormData(contactForm);
      const formDataObject = Object.fromEntries(formData.entries());

      // 2. Сначала пробуем отправить на вебхук n8n
      try {
        const n8nResponse = await fetch('https://n8n.psyhodoc.xyz/webhook/89aee7fe-b532-405b-a76e-d7c563e8d0ef', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formDataObject)
        });

        if (n8nResponse.ok) {
          // Успешная отправка на вебхук
          alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в течение дня.');
          contactForm.reset();
          return; // Прекращаем выполнение
        }
        
        // Если ответ не OK, переходим к EmailJS
        console.error("n8n Webhook Error:", await n8nResponse.text());
      } catch (n8nError) {
        console.error("n8n Fetch Error:", n8nError);
      }

      // 3. Если вебхук не сработал - пробуем EmailJS
      try {
        await emailjs.send(
          'service_g8mlnuh',
          'template_z6p1pyq',
          {
            name: formDataObject.name,
            phone: formDataObject.phone
          },
          'q-Lu0XZi-EpE_dtR0'
        );
        
        alert('Ваша заявка отправлена через резервный канал! Мы свяжемся с вами в течение дня.');
        contactForm.reset();
      } catch (emailJSError) {
        console.error("EmailJS Error:", emailJSError);
        alert('Ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.');
      }
    };

    contactForm.addEventListener('submit', sendFormData);
  }
});