// HELPERS

//Essa função auxilia na seleção de UM elemento da DOM(equivalente a document.querySelector())
function qs(selector, root = document) {
    //root permite limitar a busca dentro de um elemento específico
    return root.querySelector(selector);
};

//Função auxiliar que permite a seleção de vários elementos 
//querySelectorAll = retornar a lista 
//Array.from = transforma em lista
function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
};

//---------MENU HAMBURGUER----------------

//Selecionando o botão do menu (abre/fecha)
const menuBtn = qs("#menuBtn");

//Selecinando o conteiner do menu
const menu = qs("#menu");

//Selecionando todos os links de dentro do menu
const navLinks = qsa(".nav__link");

//Função responsável pela abertura e fechamento do menu
function setMenuOpen(isOpen) {
    //Adiciona e remove a classe "is-open"
    menu.classList.toggle("is-open", isOpen);

    //Indica o menu expandido
    menuBtn.setAttribute("aria-expanded", String(isOpen));

    //Atualiza o texto acessível do botão
    menuBtn.setAttribute("aria-label".isOpen ? "Fechar menu" : "Abrir menu");
};

//Adicionando o evento de click no botão
menuBtn.addEventListener("click", () => {
    //verifica se o menu já está aberto
    const isOpen = menu.classList.contains("is-open");
    //Altera o estado do menu
    setMenuOpen(!isOpen);
});

//Fecha o menu quando o usuário clica em um link
navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
});

//---------MOSTRAR E OCULTAR DETALHES -----------

//controla a visibilidade
const toggleinfoBtn = qs("#toggleInfoBtn");

//Area de detalhes que será exibida e ocultada
const infoBox = qs("#infoBox");

function setInfoOpen(isOpen) {
    //hidden = true (esconder)
    //hidden - false (mostrar)
    infoBox.hidden = !isOpen;
    //altera o atributo de acessibilidade
    toggleinfoBtn.setAttribute("aria-expanded", String(isOpen));

    //atualiza o texto do botão
    toggleinfoBtn.textContent = isOpen ?
        "ocultar detalhes" : "Mostrar detalhes";
};
//Evento de clique no botão
toggleinfoBtn.addEventListener("click", () => {
    //Se estava oculto, passa a estar visivel
    setInfoOpen(infoBox.hidden);
});

//------------TROCA DE TEXTO------------

const changeTextBtn = qs("#changeTextBtn");
const changeTextTarget = qs("#changeTextTarget");

let change = false;

changeTextBtn.addEventListener("click", () => {
    //inverte o valor da própria variável
    change = !change;

    //se for verdadeiro, a primeira opção é chamada
    // se for falso, a segunda opção é chamada
    changeTextTarget.textContent = change ?
        "Texto alterado via JavaScript" : "Texto otiginal do card.";

});

//------------AREA EM DESTAQUE COM CLIQUE-----------

//Botão que ativa o destaque
const highlightBtn = qs("#highlightBtn");

//Elemento que receberá o destaque
const highlightBox = qs("#highlightBox");

//Evento de clique
highlightBtn.addEventListener("click", () => {
    //Altera a classe CSS
    const isHighlighted = highlightBox.classList.toggle("is-highlighted");
    //Atualiza o atributo de acessebilidade
    highlightBtn.setAttribute("aria-pressed", String(isHighlighted));
});
const  backToTopBtn = qs("#backToTopBtn");

backToTopBtn.addEventListener("click", () =>{
    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
});