// Dados dos produtos
const produtos = {
    pratos: {
        pepperoni: { nome: "Pepperoni", valor: 25.90 },
        queijos: { nome: "Quatro Queijos", valor: 35.90 },
        portuguesa: { nome: "Portuguesa", valor: 39.90 }
    },
    bebidas: {
        fanta: { nome: "Fanta Laranja 2L", valor: 11.90 },
        coca: { nome: "Coca-Cola 2L", valor: 13.00 },
        guarana: { nome: "Guaraná Antártica 2L", valor: 10.90 }
    },
    sobremesas: {
        prestigio: { nome: "Prestígio", valor: 3.50 },
        kitkat: { nome: "KitKat", valor: 4.50 }
    }
};

// Estado do pedido
let pedidoAtual = {
    prato: null,
    bebida: null,
    sobremesa: null
};

// Função genérica para selecionar item
function selecionarItem(categoria, tipo) {
    if (pedidoAtual[categoria] === tipo) {
        pedidoAtual[categoria] = null;
    } else {
        pedidoAtual[categoria] = tipo;
    }
    atualizarUI();
}

// Atualiza valor total e marcações
function atualizarUI() {
    atualizarValor();
    atualizarMarcacoes();
}

// Calcula valor total
function atualizarValor() {
    let total = 0;
    
    if (pedidoAtual.prato) {
        total += produtos.pratos[pedidoAtual.prato].valor;
    }
    if (pedidoAtual.bebida) {
        total += produtos.bebidas[pedidoAtual.bebida].valor;
    }
    if (pedidoAtual.sobremesa) {
        total += produtos.sobremesas[pedidoAtual.sobremesa].valor;
    }
    
    document.getElementById("valorPedido").textContent = `R$ ${total.toFixed(2)}`;
}

// Atualiza marcações visuais
function atualizarMarcacoes() {
    // Remove marcação de todos os itens
    document.querySelectorAll(".selecionado").forEach(el => el.classList.remove("selecionado"));
    
    // Marca itens selecionados
    if (pedidoAtual.prato) {
        document.getElementById(pedidoAtual.prato)?.classList.add("selecionado");
    }
    if (pedidoAtual.bebida) {
        document.getElementById(pedidoAtual.bebida)?.classList.add("selecionado");
    }
    if (pedidoAtual.sobremesa) {
        document.getElementById(pedidoAtual.sobremesa)?.classList.add("selecionado");
    }
}

// Montadores de funções (compatibilidade com onclick)
function pepperoni() { selecionarItem("prato", "pepperoni"); }
function queijos() { selecionarItem("prato", "queijos"); }
function portuguesa() { selecionarItem("prato", "portuguesa"); }
function fanta() { selecionarItem("bebida", "fanta"); }
function coca() { selecionarItem("bebida", "coca"); }
function guarana() { selecionarItem("bebida", "guarana"); }
function prest() { selecionarItem("sobremesa", "prestigio"); }
function kitkat() { selecionarItem("sobremesa", "kitkat"); }

// Finalizar pedido
function pedido() {
    const { prato, bebida, sobremesa } = pedidoAtual;
    
    // Validação
    if (!prato && !bebida && !sobremesa) {
        alert("Selecione pelo menos um item!");
        return;
    }
    
    // Montagem da mensagem
    let mensagem = "🍕 *NOVO PEDIDO* 🍕\n\n";
    let total = 0;
    
    if (prato) {
        const valor = produtos.pratos[prato].valor;
        mensagem += `🍕 ${produtos.pratos[prato].nome} - R$ ${valor.toFixed(2)}\n`;
        total += valor;
    }
    
    if (bebida) {
        const valor = produtos.bebidas[bebida].valor;
        mensagem += `🥤 ${produtos.bebidas[bebida].nome} - R$ ${valor.toFixed(2)}\n`;
        total += valor;
    }
    
    if (sobremesa) {
        const valor = produtos.sobremesas[sobremesa].valor;
        mensagem += `🍫 ${produtos.sobremesas[sobremesa].nome} - R$ ${valor.toFixed(2)}\n`;
        total += valor;
    }
    
    mensagem += `\n💰 TOTAL: R$ ${total.toFixed(2)}`;
    
    // Enviar para WhatsApp
    const numeroWhatsApp = "5531997451906";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, "_blank");
}