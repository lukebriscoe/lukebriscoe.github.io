(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");

  const toggleTheme = (state) => {
    if (state === "dark") {
      localStorage.setItem("theme", "light");
      body.removeAttribute("data-theme");
    } else if (state === "light") {
      localStorage.setItem("theme", "dark");
      body.setAttribute("data-theme", "dark");
    } else {
      initTheme(state);
    }
  };

  lamp.addEventListener("click", () =>
    toggleTheme(localStorage.getItem("theme"))
  );

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });
})();

// Typewriter effect for headings
const typewrite = (el, delay) => {
  const text = el.textContent.trim();
  el.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'author-name-cursor';
  cursor.textContent = '|';
  el.appendChild(cursor);

  const chars = Array.from(text);
  let i = 0;
  const type = () => {
    if (i < chars.length) {
      el.insertBefore(document.createTextNode(chars[i]), cursor);
      i++;
      const delay = chars[i - 1].codePointAt(0) > 0xFFFF ? 150 : 85;
      setTimeout(type, delay);
    } else {
      setTimeout(() => cursor.style.animation = 'author-cursor-fade 0.6s ease forwards', 1800);
    }
  };

  setTimeout(type, delay);
};

const authorName = document.querySelector('.author-name');
if (authorName) typewrite(authorName, 400);

const headerTitle = document.querySelector('.header-title');
if (headerTitle) typewrite(headerTitle, 400);
