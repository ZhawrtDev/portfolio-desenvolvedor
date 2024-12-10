// CABEÇARIO
const menu = document.querySelector('.menu');
const idioma = document.querySelector('#idioma');
const idiomaModal = document.querySelector('.idioma-modal');
const nav = document.querySelector('.nav');
const icon = menu.querySelector('i');
const title = menu.querySelector('h1');

idioma.addEventListener('click', () => {
  idiomaModal.classList.toggle('active');
})

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

// PERGUNTAS
document.querySelectorAll('#box').forEach((box, index) => {
  const modal = document.querySelectorAll('.modal-content')[index];
  box.addEventListener('click', () => {
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'flex'; 
    }

    modal.classList.toggle('active');
  });
});



// FOOTER
const form = document.querySelector('#form-contato');
const inputEmail = form.querySelector('input[name="email"]');
const botaoEnviar = form.querySelector('.touch');
const mensagem = document.querySelector('#mensagem');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Alterações visuais
  botaoEnviar.textContent = 'Enviando...';

  fetch(form.action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(new FormData(form))
  })
    .then((response) => {
      if (response.ok) {
        mensagem.innerHTML = '<span style="color:green;">Enviado com sucesso!</span>';
        botaoEnviar.textContent = 'Enviar';
        inputEmail.value = ''; // Limpa o campo
      } else {
        mensagem.innerHTML = '<span style="color:red;">Erro ao enviar, tente novamente.</span>';
        botaoEnviar.textContent = 'Enviar';
      }
    })
    .catch(() => {
      mensagem.innerHTML = '<span style="color:red;">Erro ao enviar, tente novamente.</span>';
      botaoEnviar.textContent = 'Enviar';
    });
});
