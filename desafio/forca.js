let vidaTotal = 6;
let estado = "aguardando chute";
let chutes = [];
let arrayPalavra = [];

class Forca {
  //construtor para a seleção da palavra
  constructor(palavraSecreta) {
    this.palavra = palavraSecreta.split("");
    this.preencheArray(); //preenche o array
  }

  //função que percorre o arrayPalavra e preenche com "_"
  //e se a letra digitada tiver na palavra preenche o array na
  //posição correspondente
  preencheArray(letra) {
    for (let i; arrayPalavra.length < this.palavra.length; i++) {
      arrayPalavra.push("_");
    }

    let posicao = [];
    let idx = this.palavra.indexOf(letra);
    while (idx != -1) {
      posicao.push(idx);
      idx = this.palavra.indexOf(letra, idx + 1);
      arrayPalavra.splice(posicao, 1, letra);
      posicao.shift();
    }

    return arrayPalavra;
  }

  //fução que chuta uma letra
  chutar(letra) {
    if (letra.length >= 2) {
      //se for digitado mais de uma letra não é contado
      return 0;
    } else if (chutes.findIndex((element) => element === letra) === -1) {
      chutes.push(letra);
      this.vidasRestantes(vidaTotal); //se o chute for válido perde uma vida

      this.preencheArray(letra);

      if (arrayPalavra.join() === this.palavra.join()) {//se a palavra for completada retorna "ganhou"
        return (estado = "ganhou");
      }
    }
  }

  buscarEstado() {
    if (vidaTotal === 0) {//se a vida for 0 retorna "perdeu"
      return (estado = "perdeu");
    }
    return estado;
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  vidasRestantes(vida) {//subtrai a vida
    if (vida === vidaTotal) {
      vidaTotal--;
    }
    return vidaTotal;
  }

  buscarDadosDoJogo() {
    return {
      vidas: vidaTotal, // Quantidade de vidas restantes
      palavra: arrayPalavra, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      letrasChutadas: chutes, // Deve conter todas as letras chutadas
    };
  }
}

module.exports = Forca;
