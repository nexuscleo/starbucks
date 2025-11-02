document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');

    const playMusic = () => {
        music.play()
            .then(() => {
                document.removeEventListener('click', playMusic);
                document.removeEventListener('keydown', playMusic);
                console.log("Música iniciada após a primeira interação do usuário.");
            })
            .catch(error => {
                console.error("Erro ao tentar tocar a música:", error);
            });
    };

    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);
});

const imagem = document.querySelector(".img-principal"); // Imagem principal do copo
const titulo = document.querySelector("h1");
const fundo = document.querySelector(".fundo"); // Elemento de fundo colorido
const menuItems = document.querySelectorAll(".img-menu");

function trocarImagem(endereco) {
    // Adiciona a classe 'fade-out' para iniciar a animação de saída
    imagem.classList.add('fade-out');
    titulo.classList.add('fade-out');

    // Aguarda a animação de saída terminar
    setTimeout(() => {
        imagem.src = endereco;

        // Remove a classe de saída e adiciona a de entrada para a nova imagem
        imagem.classList.remove('fade-out');
        imagem.classList.add('fade-in');
        titulo.classList.remove('fade-out');
        titulo.classList.add('fade-in');

        // IMPORTANTE: Remove a classe 'fade-in' após a animação de entrada terminar
        // para que a animação de saída possa funcionar na próxima vez.
        setTimeout(() => {
            imagem.classList.remove('fade-in');
            titulo.classList.remove('fade-in');
        }, 500); // Duração da animação de entrada
    }, 500); // Duração da animação de saída
}

function trocarFundo(corCentro, corBorda) {
    // 1. Atualiza as variáveis CSS com as novas cores.
    fundo.style.setProperty('--cor-1', corCentro);
    fundo.style.setProperty('--cor-2', corBorda);

    // 2. Reinicia a animação do gradiente
    // Remove a classe de animação para parar a animação atual
    fundo.classList.remove('animate-gradient');

    // Força o navegador a processar a remoção da classe (reflow)
    void fundo.offsetWidth;

    // Adiciona a classe de volta, fazendo a animação reiniciar do zero
    fundo.classList.add('animate-gradient');
}

// Adiciona um ouvinte de evento para cada item do menu
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const newImage = item.dataset.image;
        const newColor1 = item.dataset.color1;
        const newColor2 = item.dataset.color2;

        trocarImagem(newImage);
        trocarFundo(newColor1, newColor2);
    });
});