// Função para atualizar o estado do campo de jogador 2 e label com base no estado do checkbox
function atualizarCampoJogador2() {
    const jogador2Nome = document.getElementById('jog2');
    const labelJogador2 = document.getElementById('labelJogador2');
    const checkboxRobo = document.getElementById('checkboxRobo');

    if (checkboxRobo.checked) {
        jogador2Nome.disabled = true; // Desabilita o input quando jogando contra a máquina
        jogador2Nome.value = 'Máquina'; // Altera o valor do input para "Máquina"
        labelJogador2.textContent = 'Jogador 2:'; // Altera o texto da label para "Jogador 2 (Máquina):"
    } else {
        jogador2Nome.disabled = false; // Habilita o input quando jogando com outro jogador
        jogador2Nome.value = ''; // Limpa o valor do input
        labelJogador2.textContent = 'Jogador 2:'; // Restaura o texto original da label
    }
}

// Função para zerar o Local Storage
function zerarLocalStorage() {
    localStorage.clear();
    criaTable();
}
function zerarLocalStorage() {
    localStorage.clear();
    window.location.reload(true);
}

// Função para criar a tabela de rankings
function criaTable() {
    const tableGameWinners = document.getElementById('tableGameWinners').getElementsByTagName('tbody')[0];
    tableGameWinners.innerHTML = '';

    // Recupera os dados do Local Storage
    const rankingData = JSON.parse(localStorage.getItem('ranking')) || {};

    for (const [player, stats] of Object.entries(rankingData)) {
        const row = tableGameWinners.insertRow();
        row.insertCell(0).innerText = player;
        row.insertCell(1).innerText = stats.wins || 0;
        row.insertCell(2).innerText = stats.draws || 0;
        row.insertCell(3).innerText = stats.losses || 0;
    }
}

// Função para atualizar o ranking
function atualizarRanking(winner, isDraw = false) {
    const rankingData = JSON.parse(localStorage.getItem('ranking')) || {};

    if (isDraw) {
        for (const player of Object.keys(rankingData)) {
            if (!rankingData[player].draws) {
                rankingData[player].draws = 0;
            }
            rankingData[player].draws += 1;
        }
    } else {
        if (!rankingData[winner]) {
            rankingData[winner] = { wins: 0, draws: 0, losses: 0 };
        }
        rankingData[winner].wins += 1;

        const loser = winner === document.getElementById('jog1').value ? document.getElementById('jog2').value : document.getElementById('jog1').value;
        if (!rankingData[loser]) {
            rankingData[loser] = { wins: 0, draws: 0, losses: 0 };
        }
        rankingData[loser].losses += 1;
    }

    localStorage.setItem('ranking', JSON.stringify(rankingData));
    criaTable();
}

// Executa a função inicialmente para configurar o estado correto do campo de jogador 2 ao carregar a página
    document.addEventListener('DOMContentLoaded', function () {
        atualizarCampoJogador2(); // Verifica o estado inicial do checkbox
        criaTable(); // Cria a tabela de rankings ao carregar a página
        const checkboxRobo = document.getElementById('checkboxRobo');
        
        // Adiciona um evento de mudança ao checkbox para atualizar dinamicamente o estado do campo de jogador 2
        checkboxRobo.addEventListener('change', atualizarCampoJogador2);

        // Evento para o botão de zerar Local Storage
        const btnZerarLocalStorage = document.getElementById('btnZerarLocalStorage');
        btnZerarLocalStorage.addEventListener('click', zerarLocalStorage);
    });
    const localStorage = window.localStorage;
    let gameWinnersList = localStorage.getItem('gameWinnersList') ? JSON.parse(localStorage.getItem('gameWinnersList')) : [];
    localStorage.setItem('gameWinnersList', JSON.stringify(gameWinnersList));

    class Player {
    constructor(nome, simbolo) {
        this.nome = nome;
        this.simbolo = simbolo;
    }
    }

    class Self {
    constructor(robo, simbolo, texto, bottonLabel, nomeJogadorAtual, jogadores) {
        this.robo = robo;
        this.simbolo = simbolo;
        this.texto = texto;
        this.bottonLabel = bottonLabel;
        this.nomeJogadorAtual = nomeJogadorAtual;
        this.jogadores = jogadores;
    }
    }

    class InforPlay {
    constructor(total, venceu, podeJogar, quadro, jogadas) {
        this.total = total;
        this.venceu = venceu;
        this.podeJogar = podeJogar;
        this.quadro = quadro;
        this.jogadas = jogadas;
    }
    }

    class RankingPlayer {
    constructor(nome) {
        this.nome = nome;
        this.vitorias = 0;
        this.empates = 0;
        this.derrotas = 0;
    }
    }

    window.onload = function () {
    criaTable();
    };
    function criaTable() {
    const parent = document.getElementById("tableGameWinners");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    var row = document.createElement("tr");
    row.style = 'background-color: #0F2028;';

    var thNome = document.createElement("th");
    thNome.innerHTML = 'Nome';
    thNome.style = 'width: 200px; text-align: center; color: #FFFFFF;';
    row.append(thNome);

    var thVitorias = document.createElement("th");
    thVitorias.innerHTML = 'Vitórias';
    thVitorias.style = 'width: 100px; text-align: center; color: #FFFFFF;';
    row.append(thVitorias);

    var thEmpates = document.createElement("th");
    thEmpates.innerHTML = 'Empates';
    thEmpates.style = 'width: 100px; text-align: center; color: #FFFFFF;';
    row.append(thEmpates);

    var thDerrotas = document.createElement("th");
    thDerrotas.innerHTML = 'Derrotas';
    thDerrotas.style = 'width: 100px; text-align: center; color: #FFFFFF;';
    row.append(thDerrotas);

    const tableNotaSemestre = document.getElementById("tableGameWinners");
    tableNotaSemestre.insertBefore(row, tableNotaSemestre.childNodes[0]);

    const notasLocalStorage = JSON.parse(localStorage.getItem('gameWinnersList'));

    notasLocalStorage.forEach(item => {
        criarElemento(item);
    });
    }