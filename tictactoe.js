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

function showModal(titulo, mensagem) {
    var modalPergunta = document.getElementById('modalAlerta');
    var tituloAlerta = document.getElementById('tituloAlerta');
    var mensagemAlerta = document.getElementById('mensagemAlerta');
    tituloAlerta.innerHTML = titulo;
    mensagemAlerta.innerHTML = mensagem;
    modalPergunta.showModal();
}

function closeModalAlerta() {
    var modal = document.getElementById('modalAlerta');
    modal.close();
}

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

    var linhasTabela = document.getElementsByTagName("tr");
    for (var i = 0; i < linhasTabela.length; i++) {
        if (i == 0) {
            continue;
        } else if ((i) % 2 == 0) {
            linhasTabela[i].className = "styleOne";
        } else {
            linhasTabela[i].className = "styleTwo";
        }
    }
}

function criarElemento(obj) {
    const existingRow = document.getElementById(obj.nome.trim());

    if (existingRow) {
        existingRow.children[1].innerText = obj.vitorias;
        existingRow.children[2].innerText = obj.empates;
        existingRow.children[3].innerText = obj.derrotas;
    } else {
        var cellTextoNome = document.createElement("td");
        cellTextoNome.id = obj.nome.trim();
        cellTextoNome.innerHTML = obj.nome.trim();
        cellTextoNome.style = 'text-align: center;';

        var cellTextoVitorias = document.createElement("td");
        cellTextoVitorias.innerHTML = obj.vitorias;
        cellTextoVitorias.style = 'text-align: center;';

        var cellTextoEmpates = document.createElement("td");
        cellTextoEmpates.innerHTML = obj.empates;
        cellTextoEmpates.style = 'text-align: center;';

        var cellTextoDerrotas = document.createElement("td");
        cellTextoDerrotas.innerHTML = obj.derrotas;
        cellTextoDerrotas.style = 'text-align: center;';

        var row = document.createElement("tr");
        row.id = obj.nome.trim();
        row.appendChild(cellTextoNome);
        row.appendChild(cellTextoVitorias);
        row.appendChild(cellTextoEmpates);
        row.appendChild(cellTextoDerrotas);

        const table = document.getElementById("tableGameWinners");
        table.appendChild(row);
    }
}

const JogoVelha = () => {
    let inforPlay = new InforPlay(0, false, false, null, []);

    const mensagens = [
        'Aperte jogar para iniciar',
        'Agora é sua vez',
        'Venceu o jogo',
        'Jogo empatado'
    ];

    const self = new Self(true, '', mensagens[0], 'Jogar', null, []);

    const checkMatching = (val1, val2, val3) => {
        if (inforPlay.jogadas[val1] === inforPlay.jogadas[val2] && inforPlay.jogadas[val2] === inforPlay.jogadas[val3]) {
            return inforPlay.jogadas[val1];
        }
    };

    const updateRanking = (playerName, result) => {
        let rankingPlayer = gameWinnersList.find(o => o.nome.trim() === playerName.trim());

        if (!rankingPlayer) {
            rankingPlayer = new RankingPlayer(playerName.trim());
            gameWinnersList.push(rankingPlayer);
        }

        if (result === 'win') {
            rankingPlayer.vitorias++;
        } else if (result === 'draw') {
            rankingPlayer.empates++;
        } else if (result === 'loss') {
            rankingPlayer.derrotas++;
        }

        localStorage.setItem('gameWinnersList', JSON.stringify(gameWinnersList));
        criaTable();
    };

    const clickedBox = (elemento) => {
        let winner = false;

        if (elemento) {
            inforPlay.total++;
            const id = elemento.getAttribute('data-id');
            if (!inforPlay.podeJogar || inforPlay.jogadas[id]) {
                return false;
            }
            elemento.innerText = self.simbolo;
            inforPlay.jogadas[id] = self.simbolo;

            winner = (checkMatching(1, 2, 3) || checkMatching(4, 5, 6) || checkMatching(7, 8, 9) ||
                checkMatching(1, 4, 7) || checkMatching(2, 5, 8) || checkMatching(3, 6, 9) ||
                checkMatching(1, 5, 9) || checkMatching(3, 5, 7));

            if (winner) {
                inforPlay.total = 0;
                inforPlay.venceu = true;
                self.simbolo = winner;
                self.texto = mensagens[2];
                inforPlay.podeJogar = false;
                const mensagem = document.getElementById('mensagem');
                mensagem.className = "efeitoVenceu";

                updateRanking(self.nomeJogadorAtual.trim(), 'win');
                updateRanking(self.jogadores.find(player => player.simbolo !== self.simbolo).nome.trim(), 'loss');
            } else {
                if (self.simbolo === 'x') {
                    self.simbolo = 'o';
                    let playCurrent = self.jogadores.find(o => o.simbolo.trim() === self.simbolo.trim());
                    self.nomeJogadorAtual = playCurrent.nome.trim();
                } else {
                    self.simbolo = 'x';
                    let playCurrent = self.jogadores.find(o => o.simbolo.trim() === self.simbolo.trim());
                    self.nomeJogadorAtual = playCurrent.nome.trim();
                }
            }
        }

        if (!inforPlay.venceu && inforPlay.total > 8) {
            const mensagem = document.getElementById('mensagem');
            self.nomeJogadorAtual = '';
            self.texto = mensagens[3];
            self.simbolo = '';
            mensagem.className = "efeitoVenceu";
            updateRanking(self.jogadores[0].nome.trim(), 'draw');
            updateRanking(self.jogadores[1].nome.trim(), 'draw');
            return false;
        }

        return true;
    };

    self.init = (elemento) => {
        inforPlay.quadro = elemento;
        elemento.addEventListener('click', (e) => {
            switch (e.target.tagName) {
                case 'SPAN':
                    if (clickedBox(e.target)) {
                        if (self.robo && self.simbolo === 'o' && inforPlay.podeJogar) {
                            const emptyTitles = Array.from(elemento.querySelectorAll('span')).filter((e) => !e.innerText);
                            elemento.style.pointerEvents = 'none';
                            setTimeout(() => {
                                const cell = emptyTitles[Math.floor(Math.random() * emptyTitles.length)];
                                clickedBox(cell);
                                elemento.style.pointerEvents = '';
                            }, 500);
                        }
                    }
                    break;
                case 'BUTTON':
                    play();
                    break;
            }
        });
    };

    const play = () => {
        let jogador1Nome = document.getElementById('jog1').value;
        let jogador2Nome = document.getElementById('jog2').value;

        if (jogador1Nome === null || jogador1Nome === undefined || jogador1Nome === '') {
            document.getElementById("jog1").focus();
            showModal('OPS!', 'Informe o nome do primeiro jogador');
            inforPlay.podeJogar = false;
            return;
        }

        if (!self.robo && (jogador2Nome === null || jogador2Nome === undefined || jogador2Nome === '')) {
            document.getElementById("jog2").focus();
            showModal('OPS!', 'Informe o nome do segundo jogador');
            inforPlay.podeJogar = false;
            return;
        }

        let jogador1 = new Player(jogador1Nome.trim(), 'x');
        let jogador2 = new Player(self.robo ? 'Máquina' : jogador2Nome.trim(), 'o');
        self.jogadores[0] = jogador1;
        self.jogadores[1] = jogador2;

        inforPlay.total = 0;
        inforPlay.podeJogar = true;
        inforPlay.venceu = false;
        self.simbolo = jogador1.simbolo;
        self.nomeJogadorAtual = jogador1.nome.trim();
        self.texto = mensagens[1];
        inforPlay.jogadas = [];
        const cells = inforPlay.quadro.querySelectorAll('span');

        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
        }
        const mensagem = document.getElementById('mensagem');
        mensagem.className = 'none';
        self.bottonLabel = 'Reiniciar';
    };
    const template = `
<div>
    <h1>Jogo da velha</h1>
    <p class="checkbox">
        Jogar contra a máquina <input type="checkbox" checked @bind="self.robo" id="checkboxRobo">
    </p>
    <div>
        <div class="gui">
            <span id="mensagem">{{self.nomeJogadorAtual}} {{self.texto}}</span>
        </div>
        <div class="quadro" @ready="self.init(this)">
            <section class="board__column">
                <span class="board__cell" data-id="1"></span>
                <span class="board__cell" data-id="2"></span>
                <span class="board__cell" data-id="3"></span>
            </section>
            <section class="board__column">
                <span class="board__cell" data-id="4"></span>
                <span class="board__cell" data-id="5"></span>
                <span class="board__cell" data-id="6"></span>
            </section>
            <section class="board__column">
                <span class="board__cell" data-id="7"></span>
                <span class="board__cell" data-id="8"></span>
                <span class="board__cell" data-id="9"></span>
            </section>
            <button class="btn" onclick="play()">{{self.bottonLabel}}</button>
        </div>
    </div>
</div>
`;


    return lemonade.element(template, self);
};