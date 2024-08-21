const MAX_ATIVIDADES = 6;
let contadorAtividades = 0;
let atividades = [];

function adicionarAtividade() {
  if (contadorAtividades >= MAX_ATIVIDADES) {
    alert("Você atingiu o limite máximo de 6 atividades.");
    return;
  }

  const atividadesDiv = document.getElementById("atividades");
  const novaAtividade = document.createElement("div");
  novaAtividade.classList.add("mb-3");
  novaAtividade.innerHTML = `
        <label for="atividade${contadorAtividades}" class="form-label">Nota da Atividade ${
    contadorAtividades + 1
  }:</label>
        <input type="number" step="0.1" min="0" max="10" class="form-control" id="atividade${contadorAtividades}" placeholder="Digite a nota">
    `;
  atividadesDiv.appendChild(novaAtividade);
  contadorAtividades++;
  atividades.push(
    document.getElementById(`atividade${contadorAtividades - 1}`)
  );
}

function calcularNota() {
  const notaU1 = parseFloat(document.getElementById("notaU1").value);
  const notaU2 = parseFloat(document.getElementById("notaU2").value);

  if (isNaN(notaU1) || isNaN(notaU2)) {
    alert("Por favor, preencha as notas de U1 e U2 com números válidos.");
    return;
  }

  // Calcula a soma das atividades e descarta a menor nota
  let notasAtividades = atividades.map((atividade) =>
    parseFloat(atividade.value)
  );

  if (notasAtividades.some(isNaN)) {
    alert("Por favor, preencha todas as notas com números válidos.");
    return;
  }

  const menorNota = Math.min(...notasAtividades);
  const somaAtividades =
    notasAtividades.reduce((acc, nota) => acc + nota, 0) - menorNota;

  const mediaAtividades = somaAtividades / (atividades.length - 1);

  // Calcula U3 e a nota final
  const U3 = (2 * mediaAtividades + notaU1 + notaU2) / 4;
  const notaFinal = (notaU1 + notaU2 + U3) / 3;

  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Resultado</h5>
        <p class="card-text">Sua nota final é: ${notaFinal.toFixed(
          2
        )}</span></p>
      </div>
    </div>
  `;
}
