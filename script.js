let indexToRemove = 0
let var_subtotal = 0
let var_desconto = 0
let var_total = 0

let historico = []
let produtosCadastrados = [
    {
        nome: 'Maçã',
        valor: 4,
        imagem: "maca.png",
    },
    {
        nome: 'Hambúrguer',
        valor: 12,
        imagem: "hamburguer.png",
    },
    {
        nome: 'Tigela',
        valor: 45,
        imagem: "tigela.png",
    },
    {
        nome: 'Bolo',
        valor: 10,
        imagem: "bolo.png",
    },
    {
        nome: 'Queijo',
        valor: 3,
        imagem: "queijo.png",
    },
    {
        nome: 'carne',
        valor: 35,
        imagem: "carne.png",
    },
    {
        nome: 'batata',
        valor: 2,
        imagem: "batata.png",
    },
    {
        nome: 'tomate',
        valor: 6,
        imagem: "tomate.png",
    },
    {
        nome: 'pizza',
        valor: 36,
        imagem: "pizza.png",
    },
]

let produtosComprados = [

]

$(document).ready(() => {
    qualquer()
    $("#pago").keyup(atualizaResumo);
    $("#pago").on('change', atualizaResumo);
    $("#desconto").on('change', atualizaResumo);
    $("#desconto").keyup(atualizaResumo);
})

function modificarQuantidade(indice) {
    let quantidade = $(`#quantidade_${indice}`).val()
    console.log('quantidade = ' + quantidade)

    produtosComprados[indice].qtde = parseInt(quantidade)

    tabelaCompras()
    atualizaResumo()
}
function tabelaCompras() {
    $("#corpo")[0].innerHTML = ""
    for (i = 0; i < produtosComprados.length; i++) {
        let valor = produtosComprados[i].valor
        $("#corpo")[0].innerHTML +=
            `<tr class="corpoTab produto${i}">
                <th scope="row">
                    <img src="${produtosComprados[i].imagem}" height="30">
                </th>
                <td>
                    <input type="number" id="quantidade_${i}" value="${produtosComprados[i].qtde}" onchange="modificarQuantidade(${i})" min="1">
                </td>
                <td>
                    <label for="">${produtosComprados[i].nome}</label>
                </td>
                <td align="right">
                    <div class="valorProduto me-5">
                        R$ ${valor.toFixed(2)}
                            <button type="button" class="btn btn-outline-danger border-0 ms-2"
                                data-bs-toggle="modal" data-bs-target="#exampleModalCenter" onclick="armazenaRemove(${i})">X</button>
                    </div>   
                </td>
            </tr> 
            `
    }
    // subtotal()
}
function armazenaRemove(manipular) {
    indexToRemove = manipular
}
//manipular está guardando item do 'i' de qualquer()
function addProduto(manipular) {

    console.log(manipular);
    console.log(produtosCadastrados.nome)
    let produtoselecionado = {
        nome: produtosCadastrados[manipular].nome,
        qtde: 1,
        imagem: produtosCadastrados[manipular].imagem,
        valor: produtosCadastrados[manipular].valor
    }
    produtosComprados.push(produtoselecionado)
    tabelaCompras()
    atualizaResumo()

}
function qualquer() {

    for (i = 0; i < produtosCadastrados.length; i++) {
        let valor = produtosCadastrados[i].valor
        console.log(produtosCadastrados[i]);
        //$("#adicionar")[0].innerHTML += produtosCadastrados[i].nome;
        $("#adicionar")[0].innerHTML += `
        <div class="col text-center">
            <div class="card">
                <div class="card-body">
                    <img src="${produtosCadastrados[i].imagem}" height="50">
                    <p class="imagem" style="padding-top: 10px;">${produtosCadastrados[i].nome}</p>
                    <p id="valor">
                    R$ ${valor.toFixed(2)}</p>
                </div>
                <a id= "botaoNovo" class="btn btn-success" onclick="addProduto(${i})">+</a>
            </div>
        </div>
        `
    }
}
//manipular2 esta guardando 'i' de tabelaCompras()
function removeProduto() {
    $('#exampleModalCenter').modal('hide')
    produtosComprados.splice(indexToRemove, 1);
    tabelaCompras()
    atualizaResumo()
}

function cancelar() {
    produtosComprados = ''
    tabelaCompras()
    reset()
    
}


function atualizaResumo() {
    var_subtotal = 0;
    var_desconto = $("#desconto").val()
    let troco = 0

    console.log('var_subtotal = ', var_subtotal)
    console.log('var_desconto = ', var_desconto)

    for (i = 0; i < produtosComprados.length; i++) {
        var_subtotal += produtosComprados[i].valor * produtosComprados[i].qtde
    }

    if (var_desconto > 0) {
        var_total = var_subtotal - var_desconto
    } else {
        var_total = var_subtotal
    }

    $("#subtotal").val(`R$ ${var_subtotal.toFixed(2)}`)
    $("#total").val(`R$ ${var_total.toFixed(2)}`)


    let pago = parseFloat($("#pago").val())
    if (pago > 0) {
        troco = pago - var_total
    } else {
        troco = 0
    }
    $("#troco").val(`R$ ${troco.toFixed(2)}`)
}

function finalizar() {
    historico.push(...produtosComprados)
    imprimeHistorico()
    reset()
}

function imprimeHistorico() {
    for (i = 0; i < historico.length; i++) {
        $("#historico")[0].innerHTML += `<tr class="corpoTab produto${i}">
        <th scope="row">
            <img src="${historico[i].imagem}" height="30">
        </th>
        <td>
            <input type="number" id="quantidade_${i}" value="${historico[i].qtde}" onchange="modificarQuantidade(${i})" min="1">
        </td>
        <td>
            <label for="">${historico[i].nome}</label>
        </td>
        <td align="right">
            <div class="valorProduto me-5">
                R$ ${historico[i].valor.toFixed(2)}
            </div>   
        </td>
    </tr> 
    `
    }
}
function reset(){
    produtosComprados=''
    
    tabelaCompras()
    $("#subtotal").val(`R$ 0.00`)
    $("#desconto").val(`R$ 0.00`)
    $("#total").val(`R$ 0.00`)
    $("#troco").val(`R$ 0.00`) 
    $("#pago").val(`R$ 0.00`)

}






