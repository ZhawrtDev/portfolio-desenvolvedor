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
document.querySelectorAll(".touch-tch").forEach((touch) => {
  touch.addEventListener("click", () => {
    document.querySelectorAll(".touch-tch").forEach((t) => t.classList.remove("a"));
    touch.classList.add("a");
  });
});

document.querySelectorAll(".touch-tch").forEach((touch) => {
  touch.addEventListener("click", () => {
    const categoria = touch.textContent.toLowerCase();

    document.querySelectorAll(".box-projeto-tch").forEach((projeto) => {
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
        inputEmail.value = '';
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



async function traduzirTexto(texto, lang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(texto)}`;
  try {
      const res = await fetch(url);
      const data = await res.json();
      return data[0][0][0];
  } catch (err) {
      console.error("Erro ao traduzir:", err);
      return texto;
  }
}

async function traduzirPagina(lang) {
  const elementos = document.querySelectorAll("h1, h2, h3, h4, h5, span, p");
  
  for (let el of elementos) {
      const textoOriginal = el.textContent.trim();
      const textoTraduzido = await traduzirTexto(textoOriginal, lang);
      el.textContent = textoTraduzido;
  }
}

document.querySelectorAll(".touch-idioma").forEach(btn => {
  btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      traduzirPagina(lang);
  });
});