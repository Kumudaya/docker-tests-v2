(() => {
  const form = document.getElementById('hello-form');
  const nameInput = document.getElementById('name');
  const greeting = document.getElementById('greeting');
  const clearBtn = document.getElementById('clear');

  const STORAGE_KEY = 'hello.name';

  const sanitizeName = (value) => value.replace(/\s+/g, ' ').trim();

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = sanitizeName(nameInput.value);
    if (!name) {
      nameInput.focus();
      render('');
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, name);
    render(name);
  });

  clearBtn.addEventListener('click', () => {
    window.localStorage.removeItem(STORAGE_KEY);
    nameInput.value = '';
    render('');
    nameInput.focus();
  });

  load();
})();
