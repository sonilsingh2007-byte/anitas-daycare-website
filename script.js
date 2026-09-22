(() => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  document.getElementById('year')?.replaceChildren(String(new Date().getFullYear()));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-btn');
    if (!button) return;
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  if (typeof Swiper !== 'undefined') {
    new Swiper('.swiper', {
      loop: true,
      spaceBetween: 18,
      autoplay: { delay: 4200, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 1 },
        900: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const whatsappButton = document.getElementById('sendWhatsAppForm');

  const readForm = () => ({
    name: document.getElementById('name')?.value?.trim() || '',
    email: document.getElementById('email')?.value?.trim() || '',
    childAge: document.getElementById('childAge')?.value?.trim() || '',
    phone: document.getElementById('phone')?.value?.trim() || '',
    message: document.getElementById('message')?.value?.trim() || ''
  });

  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.className = `text-sm mt-3 ${type}`.trim();
  };

  whatsappButton?.addEventListener('click', () => {
    const data = readForm();
    const text = [
      "Hello, I am interested in Anita's Baby Sitting and Day Care.",
      data.name && `Parent Name: ${data.name}`,
      data.childAge && `Child Age: ${data.childAge}`,
      data.phone && `Phone: ${data.phone}`,
      data.email && `Email: ${data.email}`,
      data.message && `Message: ${data.message}`
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/919320533399?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const key = form.querySelector('input[name="access_key"]')?.value?.trim();
    if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('Online form is not configured yet. Please use WhatsApp, phone or email.', 'error');
      return;
    }

    const submit = form.querySelector('button[type="submit"]');
    const original = submit?.textContent;
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending…';
    }
    setStatus('Sending your enquiry…');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Request failed');
      form.reset();
      setStatus('Thank you. Your enquiry has been sent successfully.', 'success');
    } catch (error) {
      console.error(error);
      setStatus('Could not send the form. Please use WhatsApp, phone or email instead.', 'error');
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = original || 'Send Enquiry';
      }
    }
  });
})();
