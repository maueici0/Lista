import {
    adicionarItem,
    listarItens,
    removerItem,
    concluirItem
} from "./lista.js";


class Produto {
    constructor(id, nome, preco, status) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.status = status;
    }
}

let id = 0;

window.addEventListener("load", () => {
    inputNome.value='';
    inputPreco.value='';
    if (localStorage.getItem("produto")) {
        listarItens();
        const array = Array.from(JSON.parse(localStorage.getItem("produto")));
        id = array[array.length - 1].id + 1;
    }

});

const inputNome = document.querySelector("#campo-nome");
const inputPreco = document.querySelector("#campo-preco");
const botaoAdicionar = document.querySelector("#botao");
const tabela = document.querySelector("#tabela");

botaoAdicionar.addEventListener("click", () => {

    const produto = new Produto(id, inputNome.value, inputPreco.value, false);
    const produtoNode = adicionarItem(produto);
    tabela.appendChild(produtoNode);
    
    const checkbox = produtoNode.childNodes.item(0).childNodes.item(0);
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            produto.status = true;
            produtoNode.className = "completo";
        }
        else {
            produto.status = false;
            produtoNode.className = "incompleto";
        }
        concluirItem(produto);
    });

    const botaoRemover = produtoNode.childNodes.item(3).childNodes.item(0);
    botaoRemover.addEventListener("click", () => {
        removerItem(produto);
        tabela.removeChild(produtoNode);
    });
    
    id++;

});