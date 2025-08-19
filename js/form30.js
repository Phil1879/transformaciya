document.addEventListener('DOMContentLoaded', function() {
    const headerImage = document.getElementById('adaptive-header-image');
    
    function updateHeaderImage() {
        if (window.innerWidth <= 820) {
            headerImage.src = 'img\\form302.jpg';
        } else {
            headerImage.src = 'img\\form30.jpg';
        }
    }
    
    // Вызываем при загрузке
    updateHeaderImage();
    
    // Вызываем при изменении размера окна
    window.addEventListener('resize', updateHeaderImage);
});

document.addEventListener('DOMContentLoaded', function() {
  const challengeForm = document.getElementById('challengeForm');
  
  if (challengeForm) {
    const sendFormData = async (e) => {
      e.preventDefault();

      const formData = new FormData(challengeForm);
      const formDataObject = Object.fromEntries(formData.entries());

      try {
        // Отправка на вебхук
        const n8nResponse = await fetch('https://n8n.psyhodoc.xyz/webhook/06b42210-2e0f-48fe-b0a3-d57aa90e75c9', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formDataObject)
        });

        if (n8nResponse.ok) {
          // Перенаправление на страницу благодарности после успешной отправки
          window.location.href = 'thank-you.html';
          return; 
        }
        
        console.error("n8n Webhook Error:", await n8nResponse.text());
      } catch (n8nError) {
        console.error("n8n Fetch Error:", n8nError);
      }

      try {
        // Резервная отправка через EmailJS
        await emailjs.send(
          'service_g8mlnuh',
          'template_abcv3ka',
          {
            name: formDataObject.name,
            telegram: formDataObject.telegram,
            email: formDataObject.email,
            alcoholFrequency: formDataObject.alcoholFrequency,
            consultation: formDataObject.consultation
          },
          'q-Lu0XZi-EpE_dtR0'
        );
        
        // Перенаправление на страницу благодарности
        window.location.href = 'thank-you.html';
      } catch (emailJSError) {
        console.error("EmailJS Error:", emailJSError);
        alert('Помилка при відправці. Будь ласка, спробуйте пізніше або зв\'яжіться з нами іншим способом.');
      }
    };

    challengeForm.addEventListener('submit', sendFormData);
  }
});