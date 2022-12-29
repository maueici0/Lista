export function listarItens() {
    let itens = [];
    criarHeader(itens);
    const lista = Array.from(JSON.parse(localStorage.getItem("produto")));
    for (let item of lista) {

        const itemNode = criarItem(item);

        const checkbox = itemNode.childNodes.item(0).childNodes.item(0);
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                item.status = true;
                itemNode.className = "completo";
            }
            else {
                item.status = false;
                itemNode.className = "incompleto";
            }
            concluirItem(item);
        });

        const botaoRemover = itemNode.childNodes.item(3).childNodes.item(0);
        botaoRemover.addEventListener("click", () => {
            removerItem(item);
            tabela.removeChild(itemNode);
        });

        itens.push(itemNode);
    }
    const tabela = document.querySelector("#tabela");
    tabela.replaceChildren(...itens);
}

export function adicionarItem(item) {
    if (localStorage.getItem("produto")) {
        const itens = Array.from(JSON.parse(localStorage.getItem("produto")));
        itens.push(item);
        localStorage.setItem("produto", JSON.stringify(itens));
    }
    else {
        localStorage.setItem("produto", JSON.stringify([item]));
    }
    return criarItem(item);
}

export function removerItem(item) {
    const itens = Array.from(JSON.parse(localStorage.getItem("produto")));
    const itensFiltrados = itens.filter((produto) => {
        if (produto.id != item.id) {
            return produto;
        }
    });
    localStorage.setItem("produto", JSON.stringify(itensFiltrados));
}

export function concluirItem(item) {

    const itens = Array.from(JSON.parse(localStorage.getItem("produto")));
    const itensFiltrados = itens.filter((produto) => {
        if (produto.id != item.id) {
            return produto;
        }
    });
    itensFiltrados.push(item);
    itensFiltrados.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        else {
            return 1;
        }
    });
    localStorage.setItem("produto", JSON.stringify(itensFiltrados));
}

function criarHeader(itens) {

    const header = document.createElement("tr");
    const status = document.createElement("th");
    const nome = document.createElement("th");
    const preco = document.createElement("th");
    const acao = document.createElement("th");

    status.setAttribute("class", "coluna-status");
    nome.setAttribute("class", "coluna-nome");
    preco.setAttribute("class", "coluna-preco");
    acao.setAttribute("class", "coluna-acao");

    status.textContent = 'Status';
    nome.textContent = 'Nome';
    preco.textContent = 'Preço';
    acao.textContent = 'Ações';

    header.appendChild(status);
    header.appendChild(nome);
    header.appendChild(preco);
    header.appendChild(acao);

    itens.push(header);

}

function criarItem(item) {

    const linha = document.createElement("tr");
    const colunaNome = document.createElement("td");
    const colunaPreco = document.createElement("td");
    const colunaStatus = document.createElement("td");
    const colunaBotao = document.createElement("td");

    colunaStatus.setAttribute("class", "coluna-status");
    colunaNome.setAttribute("class", "coluna-nome");
    colunaPreco.setAttribute("class", "coluna-preco");
    colunaBotao.setAttribute("class", "coluna-acao");

    colunaNome.textContent = item.nome;
    colunaPreco.textContent = 'R$' + item.preco;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const botaoRemover = document.createElement("button");
    botaoRemover.setAttribute("id", "remover");
    botaoRemover.textContent = 'Remover';

    if (item.status === true) {
        checkbox.checked = true;
        linha.setAttribute("class", "completo");
    }
    else {
        linha.setAttribute("class", "incompleto");
    }

    colunaBotao.appendChild(botaoRemover);
    colunaStatus.appendChild(checkbox);

    linha.appendChild(colunaStatus);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaPreco);
    linha.appendChild(colunaBotao);

    return linha;

}