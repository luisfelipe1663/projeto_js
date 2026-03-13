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

//--------MODAL-------------

// Botões e Elementos do Modal
const openModalBtn = qs("#openModalBtn");
const modalOverlay = qs("#modalOverlay");
const modal = qs("#modal");
const closeModalBtn = qs("#closeModalBtn");
const confirmBtn = qs("#confirmBtn");
const cancelBtn = qs("#cancelBtn");

//Guardar o elemento que estava em foco
let lastFocusedElement = null;

// Função para encontrar elementos focáveis
function getFocusableElements(conteiner) {
    const selectors = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textare:not([disabled])",
        "[tabindex]:not([tabindex'-1'])"
    ];
    return qsa(selectors.join(","), conteiner).filter((el) => !el.hidden);
};

// Função de abrir o Modal
function openModal() {

    // Salvar o elemento que tinha foco antes de abrir o modal
    //Estamos guardando na variavel o Elemento que esta focado na momento
    lastFocusedElement = document.activeElement;

    //Mostrar o Overlay (fundo escuro atras do modal)
    //hidden = false (torna o elemento visivel)
    modalOverlay.hidden = false;

    //Move o foco do teclado para o modal
    //Isso garante que o foco esteja dentro do modal para navegação com o tab
    modal.focus();

    //Adiciona um listener global para o evento "Keydown"
    //Este listener vai "prender" o foco dentro do modal
    //Quando usuario aperta o tab, o foco não sai do modal
    document.addEventListener("keydown", trapFocushandler);
};

function closeModal() {
    //Esconde o Overlay (fundo escuro)
    //hidden = true (torna o elemento invisivel)
    modalOverlay.hidden = true;

    //Remove o evento global do "keydown"
    //Para que o focus trapping para de funcionar quando o modal fechar
    document.removeEventListener("keydown", trapFocushandler);

    //Retorna o foco para o elemento que ja estava focado antes de abrir o modal
    //verificando se existe ainda tem o método focus()
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {

        lastFocusedElement.focus();
    };
};

// Função serve para prender o foco dentro do modal (focus trap)
//impede que o usuario navegue fora do modal ocm o tap
//O parametro 'e' é um objeto dentro do evento keydown
function trapFocushandler(e) {

    //Se precionar o ESC, fecha o modal imediatamente 
    if (e.key === 'Escape') {
        closeModal();
        return;
    };

    // So nos interessa a tecla tap (Para navegação)
    //ignora as outras teclas
    if (e.key !== "Tab") return;

    //Obter a lista de elementos focaveis dentro do modal
    const focusables = getFocusableElements(modal);

    //Se não houver elementos focaveis, ele não faz nada
    if (focusables.length === 0) return;

    //Identifica o primeiro e ultimo elemento focaveis 
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    //Se estiver no primeiro elemento e precionar o Shift+Tab (navegação reserva)
    //Move o foco para o ultimo elemento 
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefautlt(); // impede comportamento padrão
        last.focus(); // move para o ultimo elemento
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefautlt(); // impede comportamento padrão
        first.focus(); // mover o focus para o primeiro elemento 
    };
    //caso o contrario, permite navegação normal entre os elementos focaveis
};

//Eventos do Modal 

//Tem um evento de clicar no botão para abrir o modal
openModalBtn.addEventListener("click", openModal);

//Evento de clicar no botão para fechar o modal
closeModalBtn.addEventListener("click", closeModal);

//Evento de quando clicar no X (fechar) dentro do modal, ele fecha o modal
cancelBtn.addEventListener("click", closeModal);

//Evento de clique no botão confirma dentro do modal
//Mostra o alerta de confirmação e depois fecha o modal
confirmBtn.addEventListener("click", () => {
    alert("Confirmando  ! (exemplo de ação de Modal)");
    closeModal();
});

//Evento de clique no Overlay (fundo escuro atras do modal)
//Permitir fechar o modal clicando fora dele
modalOverlay.addEventListener("click", (e) => {
    //Verifica se o clique foi extamente no Overlay e não outros elementos
    //e.target é o elemento clicado 
    //Se for igual modalOverley, ele fecha o modal
    if (e.target === modalOverlay) closeModal();
});


//--------TAB (ABAS)-------------

//Selecionar o container das taps usando o atributo data-tabs 
// Permite identificar sem depender de classes especificas
//ex: <div class ="tabs" data-tabs>... </div>
const tabsRoot = qs("[data-tabs]");

//Só execurta se o container existir (evitar erros se removeram do html)
if (tabsRoot) {

    //Seleciona todos os botões de tab (pelo role="tab" para acessibilidade)
    const tabs = qsa("[role='tabs']", tabsRoot);

    //Selecionar todos os paineis de conteudo (role="tabpanel")
    const panels = qsa("[role='tabpanel']", tabsRoot)

    //Função principal : ativa uma aba especifica e desativa as outras
    //Parâmetro 'tabActivate': elemento button da aba a ser ativada
    function activeateTab(tabToActivate) {
        tabs.forEach((tab) => {
            // verifica se este botão é o que queremos ativar
            const isActive = tab === tabToActivate;

            //muda a classe css para destacar visualmente a aba ativa
            tab.classList.toggle("is-active", isActive);

            //Atributo ARIA para acessibilidade: indica qual aba está selecionada
            //aria-selected="true" na aba ativa, "false" nas outras
            tab.setAttribute("aria-selected", String(isActive));
        });

        panels.forEach((panel) => {
            //Cada aba aponta para o seu painel via atributo aria-controls
            //ex: aria-controls="panel-2" significa que controla o elemento como id="panel-2"
            const idDopainel = tabToActivate.getAttribute("aria-controls");

            //Mostrar apenas o painel cujo o ID corresponde ao aria-controls da aba ativa
            //hidden-true esconde, hidden - false mostra
            panel.hidden = panel.id !== idDopainel;
        });

    };
    //Adiciona o evento de clique em cada aba
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activeateTab(tab);
        });
    });

    tabsRoot.addEventListener("keydown", (e) =>{
        if(!["ArrowLeft","ArrowRight"].includes(e.key)) return
        //encontrando o index da aba ativa
        const activeIndex = tabs.findIndex((t)=> t.getAttribute("aria-selected")=== "true");

        const direction = e.key ==="ArrowRight" ? 1 : -1
    });
};
''
//--------CARROSSEL-------------

//--------REQUISIÇÃO + REDENRIZAÇÃO-------------

//--------VOLTAR AO TOPO-------------

const backToTopBtn = qs("#backToTopBtn");

// Ao clicar, faz a escrolagem da pagina até o topo 
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0, // posição do topo
        behavior: "smooth" // efeito de rolagem suave
    });
});