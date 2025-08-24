document.addEventListener('DOMContentLoaded', function() {
    // Инициализация календаря для даты
    flatpickr("#date", {
        minDate: "today",
        locale: "uk",
        dateFormat: "d.m.Y",
        altInput: true,
        altFormat: "j F Y",
    });
    
    // Инициализация выбора времени
    flatpickr("#time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minuteIncrement: 30,
        locale: "uk",
        defaultHour: new Date().getHours(),
        defaultMinute: new Date().getMinutes(),
    });
    });
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

  function updateModalImage(index) {
    if (index >= 0 && index < certificates.length) {
      currentIndex = index;
      modalImg.src = certificates[currentIndex].src;
      modalImg.style.maxHeight = '90vh';
      modalImg.style.maxWidth = '95vw';
    }
  }

  certificates.forEach((cert, index) => {
    cert.addEventListener('click', function() {
      currentIndex = index;
      updateModalImage(currentIndex);
      modal.show();
    });
  });

  document.getElementById('prevCert').addEventListener('click', function(e) {
    e.stopPropagation();
    updateModalImage(currentIndex - 1);
  });

  document.getElementById('nextCert').addEventListener('click', function(e) {
    e.stopPropagation();
    updateModalImage(currentIndex + 1);
  });

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

// Скрол к форме
document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.querySelector('section:first-of-type');
  const callBtn = document.getElementById('floatingCallBtn');
  const heroSection = document.getElementById('hero');
  const formSection = document.getElementById('callFormSection');
  
  callBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    heroSection.classList.add('form-focus');
    
    formSection.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    setTimeout(function() {
      heroSection.classList.remove('form-focus');
    }, 700);
  });
});

// Проверка номеров
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector("#phone");
    const hiddenInput = document.querySelector("#full_phone");
    
    // Инициализация плагина
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ua",
        preferredCountries: ["ua", "pl", "de"],
        separateDialCode: true, // Код страны отдельно
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.9/js/utils.js",
        autoPlaceholder: "off", // Отключаем авто-плейсхолдер
        nationalMode: true // Начинаем в национальном формате
    });

    // Очищаем поле при инициализации
    phoneInput.value = '';

    // Блокировка нечислового ввода
    phoneInput.addEventListener('keydown', function(e) {
        // Разрешаем: цифры, управляющие клавиши
        if ((e.keyCode >= 48 && e.keyCode <= 57) || // Цифры
            (e.keyCode >= 96 && e.keyCode <= 105) || // Numpad
            e.keyCode === 8 || // Backspace
            e.keyCode === 9 || // Tab
            e.keyCode === 37 || // Стрелка влево
            e.keyCode === 39) { // Стрелка вправо
            return;
        }
        e.preventDefault();
    });

    // Ограничение длины ввода
    phoneInput.addEventListener('input', function() {
        // Оставляем только цифры
        this.value = this.value.replace(/\D/g, '');
        
        // Ограничиваем длину (15 цифр)
        if (this.value.length > 15) {
            this.value = this.value.substring(0, 15);
        }
    });

    // Валидация перед отправкой
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        phoneInput.classList.remove('is-invalid');
        
        // Получаем полный номер с кодом страны
        const fullNumber = '+' + iti.getSelectedCountryData().dialCode + phoneInput.value;
        
        // Проверяем валидность
        if (!phoneInput.value || !iti.isValidNumber(fullNumber)) {
            e.preventDefault();
            phoneInput.classList.add('is-invalid');
            phoneInput.focus();
            return;
        }
        
        // Сохраняем полный номер в скрытое поле
        hiddenInput.value = fullNumber;
    });
});
// Форма EmailJS и вебхук
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const sendFormData = async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const formDataObject = Object.fromEntries(formData.entries());

      try {
        const n8nResponse = await fetch('https://n8n.psyhodoc.xyz/webhook/89aee7fe-b532-405b-a76e-d7c563e8d0ef', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formDataObject)
        });

        if (n8nResponse.ok) {
          alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в течение дня.');
          contactForm.reset();
          return; 
        }
        
        console.error("n8n Webhook Error:", await n8nResponse.text());
      } catch (n8nError) {
        console.error("n8n Fetch Error:", n8nError);
      }

      try {
        await emailjs.send(
          'service_g8mlnuh',
          'template_z6p1pyq',
          {
            name: formDataObject.name,
            phone: formDataObject.full_phone || formDataObject.phone,
            date:formDataObject.date,
            time:formDataObject.time,
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
