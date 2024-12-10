// CABEÇARIO
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const icon = menu.querySelector('i');
const title = menu.querySelector('h1');

menu.addEventListener('click', () => {
  nav.classList.toggle('active');

  if (nav.classList.contains('active')) {
    icon.className = 'fa-solid fa-xmark';
    title.textContent = 'Fechar';
  } else {
    icon.className = 'fa-solid fa-bars';
    title.textContent = 'Navegação';
  }
});


window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 0) {
    header.classList.add("a");
  } else {
    header.classList.remove("a");
  }
});

// PROJETOS
document.querySelectorAll(".touch").forEach((touch) => {
  touch.addEventListener("click", () => {
    document.querySelectorAll(".touch").forEach((t) => t.classList.remove("a"));
    touch.classList.add("a");
  });
});

document.querySelectorAll(".touch").forEach((touch) => {
  touch.addEventListener("click", () => {
    const categoria = touch.textContent.toLowerCase();

    document.querySelectorAll(".box-projeto").forEach((projeto) => {
      if (categoria === "todos" || projeto.id === categoria) {
        projeto.style.display = "block";
      } else {
        projeto.style.display = "none";
      }
    });
  });
});
