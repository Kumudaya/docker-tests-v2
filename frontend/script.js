(() => {
  const form = document.getElementById('hello-form');
  const nameInput = document.getElementById('name');
  const greeting = document.getElementById('greeting');
  const clearBtn = document.getElementById('clear');

  const STORAGE_KEY = 'hello.name';
  const API_URL = 'http://localhost:5000/api/greet';

  const sanitizeName = (value) => value.replace(/\s+/g, ' ').trim();

  const showPopup = (message, isSuccess = true) => {
    const popup = document.createElement('div');
    popup.className = `popup ${isSuccess ? 'popup-success' : 'popup-error'}`;
    popup.innerHTML = `
      <div class="popup-icon">${isSuccess ? '🎉' : '⚠️'}</div>
      <div class="popup-message">${message}</div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => popup.classList.add('popup-show'), 10);
    
    setTimeout(() => {
      popup.classList.remove('popup-show');
      setTimeout(() => popup.remove(), 300);
    }, 3000);
  };

  const render = (name) => {
    if (!name) {
      greeting.textContent = '';
      return;
    }
    greeting.textContent = `Hello ${name}`;
  };

  const load = () => {
    const saved = window.localStorage.getItem(STORAGE_KEY) || '';
    const name = sanitizeName(saved);
    if (name) {
      nameInput.value = name;
      render(name);
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = sanitizeName(nameInput.value);
    if (!name) {
      nameInput.focus();
      render('');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (data.success) {
        window.localStorage.setItem(STORAGE_KEY, name);
        render(name);
        showPopup(data.message, true);
      } else {
        showPopup(data.message, false);
      }
    } catch (error) {
      console.error('Error:', error);
      showPopup('Unable to connect to backend. Using local greeting.', false);
      window.localStorage.setItem(STORAGE_KEY, name);
      render(name);
    }
  });

  clearBtn.addEventListener('click', () => {
    window.localStorage.removeItem(STORAGE_KEY);
    nameInput.value = '';
    render('');
    nameInput.focus();
  });

  load();
})();
