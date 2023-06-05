const frm = document.querySelector("form")
const areaApostasAtual = document.querySelector("#outApostaAtual")
const areaListaCavalos = document.querySelector("#outListaCavalos")
const areaPrincipal = document.querySelector("#outPrincipal")

//por enquanto a lista de cavalos esta fixa. Masvai ser dinamica depois
const listaCavalos = ["Marujo", "Tordilho", "Belga", "Twister", "Jade", "Luck"];
const apostas = [{cavalo:0, valor:100},{cavalo:1, valor:200},{cavalo:2, valor:300}];

mostrarApostas()

function mostrarCavalos() {

    let aux = "Lista Atual dos Cavalos:\n" + "-".repeat(25) + "\n"
    
    listaCavalos.forEach((nome,i) => {
        aux += `${i+1}º Cavalo: ${nome}\n`
    });

    areaListaCavalos.innerText = aux;
}

frm.addEventListener("submit", (e) => {

    e.preventDefault()

    const cavalo = Number(frm.inNumeroCavalo.value)-1  //OBS: Subtrai 1 do valor pois no vetor a contagem começa em zero
    const valor = Number(frm.inAposta.value)

    apostas.push({cavalo, valor}) 
    mostrarApostas()

    frm.inNumeroCavalo.value = ""
    frm.inAposta.value = ""

    //Passa o numero do cavalo e recebe 2 respostas
    let [quant, soma] = totalizarUmCavalo(cavalo)

    let aux = `O cavalo ${cavalo+1} teve ${quant} apostas = Total R$ ${soma}`;
    areaApostasAtual.innerText = aux;

})

//Quando digita o nº de um cavalo e SAI DO CAMPO, totaliza as aposta desse cavalo
frm.inNumeroCavalo.addEventListener("blur", () => {
    
    if(frm.inNumeroCavalo.value == ""){ 
        areaApostasAtual.innerText = ""; 
        return;
    }


    let numero = (frm.inNumeroCavalo.value)-1
    let contador = 0
    let soma = 0

    apostas.forEach(cada => {
        if(cada.cavalo == numero){
            contador++;
            soma += cada.valor
        }
    })

    let aux = `O cavalo ${numero+1} teve ${contador} apostas = Total R$ ${soma}`;
    areaApostasAtual.innerText = aux

})

//Quando o foco VOLTA para o campo de entrada, limpa a area de resumo de aposta
frm.inNumeroCavalo.addEventListener("focus", () => {
    areaApostasAtual.innerText = ""
})

function totalizarUmCavalo(numero){
    let contador = 0
    let soma = 0

    apostas.forEach(cada => {
        if(cada.cavalo == numero){
            contador++;
            soma += cada.valor
        }
    })

    return [contador, soma]
} 

function mostrarApostas() {

    let aux = "Apostas Realizadas\n" + "-".repeat(30) + "\n"

    for(let x of apostas){
        aux += `Cavalo Nº ${x.cavalo+1} ${listaCavalos[x.cavalo]} - Valor R$: ${x.valor}\n`
    }
    areaPrincipal.innerText = aux;
}

window.addEventListener("load", () => {
    mostrarCavalos()
})

//Aqui estou na minha Branch de TESTE!!! Posso bagunçar tudo que tem uma versão salva de teset

//Colocar a função de RESUMO den