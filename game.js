const board = document.querySelector("#board");
const dice = document.querySelector("#dice");
const diceFace = document.querySelector("#diceFace");
const enterButton = document.querySelector("#enterButton");
const resetButton = document.querySelector("#resetButton");
const playersBox = document.querySelector("#players");
const currentDot = document.querySelector("#currentDot");
const currentName = document.querySelector("#currentName");
const statusText = document.querySelector("#statusText");
const notificationText = document.querySelector("#notificationText");
const resultText = document.querySelector("#resultText");
const roundHistory = document.querySelector("#roundHistory");
const rulesButton = document.querySelector("#rulesButton");
const fullscreenButton = document.querySelector("#fullscreenButton");
const boardPrintButton = document.querySelector("#boardPrintButton");
const rulesModal = document.querySelector("#rulesModal");
const rulesClose = document.querySelector("#rulesClose");
const playerSetupModal = document.querySelector("#playerSetupModal");
const setupPlayerGrid = document.querySelector("#setupPlayerGrid");
const setupFeedback = document.querySelector("#setupFeedback");
const startGameButton = document.querySelector("#startGameButton");
const phaseText = document.querySelector("#phaseText");
const resourcePlayerList = document.querySelector("#resourcePlayerList");
const resourceNote = document.querySelector("#resourceNote");
const hintText = document.querySelector("#hintText");
const adminLoginButton = document.querySelector("#adminLoginButton");
const adminStatus = document.querySelector("#adminStatus");
const adminLoginModal = document.querySelector("#adminLoginModal");
const adminUser = document.querySelector("#adminUser");
const adminPassword = document.querySelector("#adminPassword");
const adminFeedback = document.querySelector("#adminFeedback");
const adminSubmit = document.querySelector("#adminSubmit");
const adminCancel = document.querySelector("#adminCancel");
const adminCommandModal = document.querySelector("#adminCommandModal");
const adminCommandInput = document.querySelector("#adminCommandInput");
const adminCommandFeedback = document.querySelector("#adminCommandFeedback");
const adminRun = document.querySelector("#adminRun");
const adminCommandClose = document.querySelector("#adminCommandClose");
const adminColorGrid = document.querySelector("#adminColorGrid");
const adminMoveGrid = document.querySelector("#adminMoveGrid");
const adminAddProtein = document.querySelector("#adminAddProtein");
const adminAddAa = document.querySelector("#adminAddAa");
const adminAddAtp = document.querySelector("#adminAddAtp");
const adminAdvancePhase = document.querySelector("#adminAdvancePhase");
const adminRegressPhase = document.querySelector("#adminRegressPhase");
const eventModal = document.querySelector("#eventModal");
const eventTitle = document.querySelector("#eventTitle");
const eventInstruction = document.querySelector("#eventInstruction");
const eventCardGrid = document.querySelector("#eventCardGrid");
const eventReveal = document.querySelector("#eventReveal");
const eventContinue = document.querySelector("#eventContinue");
const checkpointModal = document.querySelector("#checkpointModal");
const checkpointSummary = document.querySelector("#checkpointSummary");
const checkpointMessage = document.querySelector("#checkpointMessage");
const checkpointAdvance = document.querySelector("#checkpointAdvance");
const checkpointTrade = document.querySelector("#checkpointTrade");
const checkpointMitoticTrade = document.querySelector("#checkpointMitoticTrade");
const checkpointBuyDna = document.querySelector("#checkpointBuyDna");
const checkpointWildcardAtp = document.querySelector("#checkpointWildcardAtp");
const checkpointWildcardProtein = document.querySelector("#checkpointWildcardProtein");
const checkpointWildcardMitotic = document.querySelector("#checkpointWildcardMitotic");
const checkpointContinue = document.querySelector("#checkpointContinue");
const dnaModal = document.querySelector("#dnaModal");
const dnaMessage = document.querySelector("#dnaMessage");
const dnaCardDisplay = document.querySelector("#dnaCardDisplay");
const dnaContinue = document.querySelector("#dnaContinue");

const gridSize = 14;
const outerMax = gridSize - 1;
const innerMin = 2;
const innerMax = gridSize - 3;
const bridgeY = Math.floor(gridSize / 2);

let currentPlayer = 0;
let isRolling = false;
let adminLoggedIn = false;
let adminSelectedPlayerIndex = 0;
let pendingAaPlayerIndex = null;
let pendingAaResolve = null;
let eventResolver = null;
const eventResolverStack = [];
let eventAutoCloseTimer = null;
let pendingEventAction = null;
let checkpointResolver = null;
let dnaResolver = null;
let dnaFlipTimer = null;
let dnaCloseTimer = null;
let setupSelectedPlayers = new Set([0, 1, 2, 3, 4, 5]);
const roundLog = [];
const dicePipMap = {
  1: ["center"],
  2: ["top-left", "bottom-right"],
  3: ["top-left", "center", "bottom-right"],
  4: ["top-left", "top-right", "bottom-left", "bottom-right"],
  5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
  6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"],
};
const dicePipPositions = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const packEventCardFiles = [
  "G1 - Bonus - Celula Saudavel.png",
  "G1 - Bonus - Membrana Estavel.png",
  "G1 - Bonus - Mitocondrias eficientes.png",
  "G1 - Bonus - Nutrientes Abundantes.png",
  "G1 - Bonus - Ribossomos acelerados.png",
  "G1 - Bonus - Sintese Proteica.png",
  "G1 - Neutra - Homeostase Celular.png",
  "G1 - Neutra - Metabolismo Normal.png",
  "G1 - Neutra - Metabolismo Quimico.png",
  "G1 - Onus - Dano em Organela.png",
  "G1 - Onus - Extresse Oxidativo.png",
  "G1 - Onus - Falha Metabolica.png",
  "G1 - Onus - Proteina Defeituosa.png",
  "G1 - Onus - Toxina Celular.png",
  "G2 - Bonus - Centrossomos Duplicados.png",
  "G2 - Bonus - Checkpoint Aprovado.png",
  "G2 - Bonus - Ciclinas Ativadas.png",
  "G2 - Bonus - Proteinas Mitoticas Estaveis.png",
  "G2 - Bonus - Reserva Energetica.png",
  "G2 - Bonus - Sistema Celular Eficiente.png",
  "G2 - Neutra - Celula Estavel.png",
  "G2 - Neutra - DNA Revisado.png",
  "G2 - Neutra - Preparacao Completa.png",
  "G2 - Onus - Dano Estrutural.png",
  "G2 - Onus - DNA Danificado.png",
  "G2 - Onus - Estresse Celular.png",
  "G2 - Onus - Falha de Preparacao.png",
  "G2 - Onus - Proteinas Mitoticas Insuficientes.png",
  "Mitose - Bonus - Checkpoint Mitotico Aprovado.png",
  "Mitose - Bonus - Cromossomos Alinhados.png",
  "Mitose - Bonus - Divisao Eficiente.png",
  "Mitose - Bonus - Fuso Mitotico Estavel.png",
  "Mitose - Bonus - Mitose Acelerada.png",
  "Mitose - Bonus - Separacao Cromossomica Perfeita.png",
  "Mitose - Neutra - Fase Mitotica Controlada.png",
  "Mitose - Neutra - Observacao Celular.png",
  "Mitose - Neutra - Organizacao Celular Adequada.png",
  "Mitose - Onus - Cromossomos Desalinhados.png",
  "Mitose - Onus - Divisao Instavel.png",
  "Mitose - Onus - Falha no Fuso Mitotico.png",
  "Mitose - Onus - Nao-disjuncao Cromossomica.png",
  "Mitose - Onus - Radiacao Excessiva.png",
  "S - Bonus - DNA Polimeresa Eficiente.png",
  "S - Bonus - Enzimas Ativas.png",
  "S - Bonus - Fita Estabilizada.png",
  "S - Bonus - Helicase Eficiente.png",
  "S - Bonus - Reparo Genetico Bem Sucedido.png",
  "S - Bonus - Replicacao Acelerada.png",
  "S - Neutra - DNA Integro.png",
  "S - Neutra - Fita Complementar Formada.png",
  "S - Neutra - Replicacao Estavel.png",
  "S - Onus - DNA Danificado.png",
  "S - Onus - Erro na Replicacao.png",
  "S - Onus - Instabilidade Genetica.png",
  "S - Onus - Mutacao Detectada.png",
  "S - Onus - Radiacao UV.png",
];

const eventCardBackImages = {
  G1: encodeURI("assets/cartas/costas/Costas G1.png"),
  S: encodeURI("assets/cartas/costas/Costas S.png"),
  G2: encodeURI("assets/cartas/costas/Costas G2.png"),
  M: encodeURI("assets/cartas/costas/Costas M.png"),
};

const outerPath = [
  ...range(outerMax, 0).map((x) => ({ x, y: outerMax })),
  ...range(outerMax - 1, 0).map((y) => ({ x: 0, y })),
  ...range(1, outerMax).map((x) => ({ x, y: 0 })),
  ...range(1, outerMax - 1).map((y) => ({ x: outerMax, y })),
];

const innerPath = [
  ...range(innerMin, innerMax).map((x) => ({ x, y: innerMin })),
  ...range(innerMin + 1, innerMax).map((y) => ({ x: innerMax, y })),
  ...range(innerMax - 1, innerMin).map((x) => ({ x, y: innerMax })),
  ...range(innerMax - 1, innerMin + 1).map((y) => ({ x: innerMin, y })),
];

const path = [...outerPath, ...innerPath];
const outerPathLength = outerPath.length;
const innerPathLength = innerPath.length;
const checkpointIndex = path.findIndex((coord) => coord.x === 0 && coord.y === 0);
const innerCheckpointIndex = path.findIndex((coord) => coord.x === innerMin && coord.y === innerMin);
const innerFinishIndex = path.findIndex((coord) => coord.x === innerMin + 1 && coord.y === innerMin);
const specialCells = buildSpecialCells();
const players = [
  createPlayer("Azul", "#2f80ed"),
  createPlayer("Vermelho", "#eb5757"),
  createPlayer("Verde", "#27ae60"),
  createPlayer("Amarelo", "#f2c94c"),
  createPlayer("Roxo", "#9b51e0"),
  createPlayer("Laranja", "#f2994a"),
];

function createPlayer(name, color) {
  return {
    name,
    color,
    position: -1,
    phase: "G1",
    atp: 0,
    aminoAcids: 0,
    proteins: 0,
    mitoticProteins: 0,
    wildResources: 0,
    dnaCards: 0,
    sCheckpointVisits: 0,
    mitosisStage: "prophase",
    skipTurns: 0,
    extraTurn: false,
    ignoreNextDamage: 0,
    ignoreNextAtpCost: 0,
    ignoreNextNegative: 0,
    dnaProtection: 0,
    g2CheckpointSnapshot: null,
    collectedAtpThisLap: false,
    finished: false,
    lost: false,
  };
}

function range(start, end) {
  const step = start <= end ? 1 : -1;
  const items = [];
  for (let value = start; step > 0 ? value <= end : value >= end; value += step) {
    items.push(value);
  }
  return items;
}

function buildSpecialCells() {
  const cells = new Map();
  const indexByCoord = new Map(path.map((coord, index) => [`${coord.x},${coord.y}`, index]));
  const atpCorners = [
    [outerMax, outerMax],
    [outerMax, 0],
    [0, outerMax],
  ];

  atpCorners.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined) {
      cells.set(index, { text: "ATP", className: "atp", icon: "atp" });
    }
  });

  cells.set(indexByCoord.get("0,0"), {
    text: "Checkpoint",
    note: "Inicio",
    className: "checkpoint",
    icon: "checkpoint",
  });

  const aaHouses = [
    [3, 0],
    [7, 0],
    [11, 0],
    [13, 3],
    [13, 7],
    [13, 11],
    [3, 13],
    [7, 13],
    [11, 13],
    [0, 3],
    [0, 7],
    [0, 11],
  ];

  aaHouses.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text: "AA", className: "aa", icon: "aa" });
    }
  });

  const eventHouses = [
    [5, 0],
    [5, 13],
    [9, 13],
    [13, 5],
    [13, 9],
    [0, 8],
    [0, 5],
    [8, 0],
  ];

  eventHouses.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text: "Evento", className: "event", icon: "event" });
    }
  });

  const damageHouses = [[0, 1]];

  damageHouses.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text: "Dano celular", note: "celular", className: "damage", icon: "damage" });
    }
  });

  const actionHouses = [
    [2, outerMax, "Avance 2", "Avance 2 casas", "action-cell advance-cell", "advance2", { type: "move", steps: 2 }],
    [outerMax, 4, "Avance 3", "Avance 3 casas", "action-cell advance-cell strong-action", "advance3", { type: "move", steps: 3 }],
    [10, outerMax, "Volte 2", "Volte 2 casas", "action-cell retreat-cell", "retreat2", { type: "move", steps: -2 }],
    [0, 6, "Volte 3", "Volte 3 casas", "action-cell retreat-cell strong-action", "retreat3", { type: "move", steps: -3 }],
    [outerMax - 1, 0, "Jogue novamente", "Jogue novamente", "action-cell replay-cell", "replay", { type: "again" }],
    [outerMax, 10, "Perca 1 rodada", "Perca 1 rodada", "action-cell skip-cell", "skip", { type: "skip" }],
  ];

  actionHouses.forEach(([x, y, text, label, className, icon, action]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text, className, icon, action, label, arrowDirection: getActionArrowDirection(index, action) });
    }
  });

  const innerCheckpoints = [
    [innerMin, innerMin],
  ];

  innerCheckpoints.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text: "Checkpoint", className: "checkpoint", icon: "checkpoint" });
    }
  });

  const innerFinish = [innerMin + 1, innerMin];
  const innerFinishCell = indexByCoord.get(`${innerFinish[0]},${innerFinish[1]}`);
  if (innerFinishCell !== undefined && !cells.has(innerFinishCell)) {
    cells.set(innerFinishCell, { text: "Chegada", className: "finish", icon: "finish" });
  }

  const innerAtpHouses = [
    [innerMax, innerMin],
    [innerMin, innerMax],
    [innerMax, innerMax],
  ];

  innerAtpHouses.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text: "ATP", className: "atp", icon: "atp" });
    }
  });

  const innerAaHouses = [
    [4, innerMin],
    [9, innerMin],
    [innerMax, 4],
    [innerMax, 9],
    [9, innerMax],
    [4, innerMax],
    [innerMin, 9],
    [innerMin, 4],
  ];

  innerAaHouses.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text: "AA", className: "aa", icon: "aa" });
    }
  });

  const innerEventHouses = [
    [6, innerMin],
    [innerMax, 5],
    [innerMax, 8],
    [8, innerMax],
    [5, innerMax],
    [innerMin, 6],
    [innerMin, 10],
  ];

  innerEventHouses.forEach(([x, y]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text: "Evento", className: "event", icon: "event" });
    }
  });

  const innerActionHouses = [
    [innerMax, 10, "Avance 3", "Avance 3 casas", "action-cell advance-cell strong-action", "advance3", { type: "move", steps: 3 }],
    [innerMin, 5, "Volte 3", "Volte 3 casas", "action-cell retreat-cell strong-action", "retreat3", { type: "move", steps: -3 }],
    [3, innerMax, "Jogue novamente", "Jogue novamente", "action-cell replay-cell", "replay", { type: "again" }],
    [innerMax, 3, "Perca 1 rodada", "Perca 1 rodada", "action-cell skip-cell", "skip", { type: "skip" }],
  ];

  innerActionHouses.forEach(([x, y, text, label, className, icon, action]) => {
    const index = indexByCoord.get(`${x},${y}`);
    if (index !== undefined && !cells.has(index)) {
      cells.set(index, { text, className, icon, action, label, arrowDirection: getActionArrowDirection(index, action) });
    }
  });

  return cells;
}

function cellCenter(coord) {
  const size = 100 / gridSize;
  return {
    left: `${coord.x * size + size / 2}%`,
    top: `${coord.y * size + size / 2}%`,
  };
}

function getActionArrowDirection(index, action) {
  if (action?.type !== "move") return "right";
  const sectionStart = index < outerPathLength ? 0 : outerPathLength;
  const sectionLength = index < outerPathLength ? outerPathLength : innerPathLength;
  const sectionOffset = index - sectionStart;
  const directionStep = action.steps > 0 ? 1 : -1;
  const targetOffset = (sectionOffset + directionStep + sectionLength) % sectionLength;
  const current = path[index];
  const target = path[sectionStart + targetOffset];
  const dx = target.x - current.x;
  const dy = target.y - current.y;
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? "right" : "left";
  return dy > 0 ? "down" : "up";
}

function getArrowRotation(direction) {
  if (direction === "down") return 90;
  if (direction === "left") return 180;
  if (direction === "up") return -90;
  return 0;
}

function drawBoard() {
  drawDecorativeBridge();

  path.forEach((coord, index) => {
    const cell = document.createElement("div");
    const special = specialCells.get(index);
    cell.className = `cell ${special?.className ?? ""}`;
    cell.style.left = `${coord.x * (100 / gridSize)}%`;
    cell.style.top = `${coord.y * (100 / gridSize)}%`;
    cell.style.width = `${100 / gridSize}%`;
    cell.style.height = `${100 / gridSize}%`;
    cell.dataset.index = String(index);

    if (special?.icon) {
      cell.innerHTML = getCellIcon(special.icon, special.label || special.text, special);
    } else if (special) {
      cell.innerHTML = `${special.text}${special.note ? `<small>${special.note}</small>` : ""}`;
    }

    board.appendChild(cell);
  });

  players.forEach((player, index) => {
    const pawn = document.createElement("div");
    pawn.className = "pawn";
    pawn.id = `pawn-${index}`;
    pawn.style.background = player.color;
    board.appendChild(pawn);
  });
}

function getCellIcon(icon, label, special = {}) {
  if (icon === "advance2" || icon === "advance3" || icon === "retreat2" || icon === "retreat3" || icon === "replay" || icon === "skip") {
    const config = {
      advance2: { main: "+2", text: "AVANCE", color: "#27ae60" },
      advance3: { main: "+3", text: "AVANCE", color: "#1f9d8a" },
      retreat2: { main: "-2", text: "VOLTE", color: "#eb5757" },
      retreat3: { main: "-3", text: "VOLTE", color: "#c0398f" },
      replay: { top: "JOGUE", bottom: "NOVAMENTE", color: "#2f80ed" },
      skip: { top: "PERCA", bottom: "UMA RODADA", color: "#8e5bb8" },
    }[icon];
    const arrowRotation = getArrowRotation(special.arrowDirection || "right");
    const isMoveCell = special.action?.type === "move";
    return `
      <svg class="cell-icon cell-art action-art" viewBox="0 0 96 96" role="img" aria-label="${label}">
        <circle cx="48" cy="48" r="31" fill="#ffffff" stroke="${config.color}" stroke-width="6"></circle>
        ${isMoveCell
          ? `<g transform="rotate(${arrowRotation} 48 30)">
              <path d="M23 30h40" fill="none" stroke="#26313d" stroke-width="9" stroke-linecap="round"></path>
              <path d="M52 15l17 15-17 15" fill="none" stroke="#26313d" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>`
          : icon === "replay"
            ? `<text x="48" y="18" text-anchor="middle" font-size="10" font-weight="900" fill="#26313d">${config.top}</text>
              <g fill="none" stroke="#26313d" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M65 42a19 19 0 0 0-31-12"></path>
                <path d="M35 30h16V15"></path>
                <path d="M31 54a19 19 0 0 0 31 12"></path>
                <path d="M62 66H46v15"></path>
              </g>
              <circle cx="48" cy="48" r="10" fill="${config.color}" stroke="#ffffff" stroke-width="4"></circle>
              <path d="M43 48h10M49 43v10" stroke="#ffffff" stroke-width="4" stroke-linecap="round"></path>
              <text x="48" y="88" text-anchor="middle" font-size="8" font-weight="900" fill="#26313d">${config.bottom}</text>`
            : `<text x="48" y="18" text-anchor="middle" font-size="10" font-weight="900" fill="#26313d">${config.top}</text>
              <g fill="none" stroke="#26313d" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M34 27h28"></path>
                <path d="M34 69h28"></path>
                <path d="M39 27c0 11 18 12 18 21S39 58 39 69"></path>
                <path d="M57 27c0 11-18 12-18 21s18 10 18 21"></path>
              </g>
              <circle cx="70" cy="32" r="11" fill="${config.color}" stroke="#ffffff" stroke-width="4"></circle>
              <path d="M65 27l10 10M75 27L65 37" stroke="#ffffff" stroke-width="4" stroke-linecap="round"></path>
              <text x="48" y="88" text-anchor="middle" font-size="8" font-weight="900" fill="#26313d">${config.bottom}</text>`}
        ${isMoveCell ? `<text x="48" y="66" text-anchor="middle" font-size="35" font-weight="900" fill="${config.color}" stroke="#ffffff" stroke-width="3" paint-order="stroke">${config.main}</text>
        <text x="48" y="88" text-anchor="middle" font-size="10" font-weight="900" fill="#26313d">${config.text}</text>` : ""}
      </svg>
    `;
  }

  if (icon === "finish") {
    return `
      <svg class="cell-icon cell-art" viewBox="0 0 96 96" role="img" aria-label="${label}">
        <defs>
          <pattern id="finish-checks" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#ffffff"></rect>
            <rect width="8" height="8" fill="#26313d"></rect>
            <rect x="8" y="8" width="8" height="8" fill="#26313d"></rect>
          </pattern>
        </defs>
        <rect x="12" y="12" width="72" height="72" rx="10" fill="url(#finish-checks)" stroke="#26313d" stroke-width="5"></rect>
        <path d="M24 70V24" stroke="#f2c94c" stroke-width="6" stroke-linecap="round"></path>
        <path d="M24 24h36l-8 10 8 10H24z" fill="#eb5757" stroke="#26313d" stroke-width="4" stroke-linejoin="round"></path>
        <text x="48" y="91" text-anchor="middle" font-size="10" font-weight="900" fill="#26313d">CHEGADA</text>
      </svg>
    `;
  }

  if (icon === "event") {
    return `
      <svg class="cell-icon cell-art" viewBox="0 0 96 96" role="img" aria-label="${label}">
        <rect x="24" y="15" width="48" height="66" rx="9" fill="#dce9ff" stroke="#26313d" stroke-width="5"></rect>
        <rect x="31" y="22" width="34" height="52" rx="6" fill="#ffffff" stroke="#2f80ed" stroke-width="3"></rect>
        <path d="M48 32v19" stroke="#174ea6" stroke-width="8" stroke-linecap="round"></path>
        <circle cx="48" cy="62" r="5" fill="#174ea6"></circle>
        <path d="M20 25l-8-8M76 25l8-8M18 78l-8 6M78 78l8 6" stroke="#f2c94c" stroke-width="5" stroke-linecap="round"></path>
        <text x="48" y="91" text-anchor="middle" font-size="10" font-weight="900" fill="#26313d">EVENTO</text>
      </svg>
    `;
  }

  if (icon === "checkpoint") {
    return `
      <svg class="cell-icon cell-art" viewBox="0 0 96 96" role="img" aria-label="${label}">
        <rect x="14" y="16" width="68" height="58" rx="12" fill="#ede6ff" stroke="#26313d" stroke-width="5"></rect>
        <path d="M30 47l12 12 25-29" fill="none" stroke="#27ae60" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="76" cy="76" r="10" fill="#2f80ed" stroke="#ffffff" stroke-width="4"></circle>
        <path d="M76 70v12M70 76h12" stroke="#ffffff" stroke-width="4" stroke-linecap="round"></path>
        <text x="48" y="91" text-anchor="middle" font-size="10" font-weight="900" fill="#26313d">INÍCIO</text>
      </svg>
    `;
  }

  if (icon === "damage") {
    return `
      <svg class="cell-icon cell-art" viewBox="0 0 96 96" role="img" aria-label="${label}">
        <circle cx="48" cy="48" r="28" fill="#ffd8d2" stroke="#26313d" stroke-width="5"></circle>
        <path d="M42 20l8 15-10 10 15 9-9 22" fill="none" stroke="#eb5757" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="35" cy="42" r="5" fill="#eb5757"></circle>
        <circle cx="61" cy="57" r="6" fill="#f2c94c" stroke="#ffffff" stroke-width="3"></circle>
        <path d="M25 70l-8 8M18 70l8 8" stroke="#eb5757" stroke-width="5" stroke-linecap="round"></path>
        <text x="48" y="91" text-anchor="middle" font-size="10" font-weight="900" fill="#26313d">DANO</text>
      </svg>
    `;
  }

  if (icon === "aa") {
    return `
      <svg class="cell-icon cell-art" viewBox="0 0 96 96" role="img" aria-label="${label}">
        <g fill="none" stroke="#26313d" stroke-width="5" stroke-linecap="round">
          <path d="M34 48h28"></path>
          <path d="M48 34v28"></path>
          <path d="M62 48l13-13"></path>
          <path d="M34 48L21 61"></path>
        </g>
        <circle cx="48" cy="48" r="10" fill="#27ae60" stroke="#ffffff" stroke-width="4"></circle>
        <circle cx="34" cy="48" r="9" fill="#2f80ed" stroke="#ffffff" stroke-width="4"></circle>
        <circle cx="62" cy="48" r="9" fill="#eb5757" stroke="#ffffff" stroke-width="4"></circle>
        <circle cx="48" cy="34" r="8" fill="#f2c94c" stroke="#ffffff" stroke-width="4"></circle>
        <circle cx="48" cy="62" r="8" fill="#9b7ede" stroke="#ffffff" stroke-width="4"></circle>
        <circle cx="75" cy="35" r="7" fill="#fff" stroke="#26313d" stroke-width="4"></circle>
        <circle cx="21" cy="61" r="7" fill="#fff" stroke="#26313d" stroke-width="4"></circle>
        <text x="48" y="90" text-anchor="middle" font-size="12" font-weight="900" fill="#26313d">AA</text>
      </svg>
    `;
  }

  return `
    <svg class="cell-icon cell-art" viewBox="0 0 96 96" role="img" aria-label="${label}">
      <g fill="none" stroke="#26313d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M26 52h15"></path>
        <path d="M55 52h15"></path>
        <path d="M48 37l-10 20h16l-7 22 18-30H50l8-12z" fill="#f2c94c"></path>
      </g>
      <circle cx="22" cy="52" r="11" fill="#27ae60" stroke="#ffffff" stroke-width="4"></circle>
      <circle cx="48" cy="52" r="11" fill="#2f80ed" stroke="#ffffff" stroke-width="4"></circle>
      <circle cx="74" cy="52" r="11" fill="#eb5757" stroke="#ffffff" stroke-width="4"></circle>
      <text x="22" y="57" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">P</text>
      <text x="48" y="57" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">P</text>
      <text x="74" y="57" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">P</text>
      <text x="48" y="89" text-anchor="middle" font-size="11" font-weight="900" fill="#26313d">ATP</text>
    </svg>
  `;
}

function drawDice() {
  diceFace.innerHTML = "";
  dicePipPositions.forEach((position) => {
    const pip = document.createElement("span");
    pip.className = `pip ${position}`;
    pip.dataset.pip = position;
    diceFace.appendChild(pip);
  });
  renderDice(1);
}

function renderDice(value) {
  const visiblePips = dicePipMap[value] ?? dicePipMap[1];
  diceFace.querySelectorAll(".pip").forEach((pip) => {
    pip.classList.toggle("show", visiblePips.includes(pip.dataset.pip));
  });
  dice.setAttribute("aria-label", `Rolar dado. Valor atual ${value}`);
  if (resultText) {
    resultText.textContent = `Resultado atual: ${value}`;
  }
}

function drawDecorativeBridge() {
  [{ x: 1, y: bridgeY }].forEach((coord) => {
    const cell = document.createElement("div");
    cell.className = "cell connector";
    cell.style.left = `${coord.x * (100 / gridSize)}%`;
    cell.style.top = `${coord.y * (100 / gridSize)}%`;
    cell.style.width = `${100 / gridSize}%`;
    cell.style.height = `${100 / gridSize}%`;
    board.appendChild(cell);
  });
}

function drawPlayers() {
  if (!playersBox) return;
  playersBox.innerHTML = "";
  players.forEach((player, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `player-card ${index === currentPlayer ? "is-turn" : ""} ${
      player.position < 0 ? "is-out" : ""
    } ${player.lost ? "is-lost" : ""}`;
    card.style.setProperty("--player-color", player.color);
    const place = player.finished
      ? "Concluiu a divisão"
      : player.lost
        ? "Apoptose"
      : player.position < 0
        ? "Fora da partida"
        : "Em jogo";
    card.innerHTML = `
      <strong><i class="player-dot" style="background:${player.color}"></i>${player.name}</strong>
      <span>${place}</span>
      <span>Fase ${player.phase}${player.phase === "M" ? `/${getMitosisStageLabel(player)}` : ""} | ATP ${player.atp} | Prot ${player.proteins} | Prot M ${player.mitoticProteins} | Coringa ${player.wildResources} | AA ${player.aminoAcids} | DNA ${player.dnaCards}</span>
    `;
    playersBox.appendChild(card);
  });
}

function updatePawns() {
  players.forEach((player, index) => {
    const pawn = document.querySelector(`#pawn-${index}`);
    pawn.classList.toggle("active", index === currentPlayer && !player.finished && player.position >= 0);
    pawn.classList.toggle("is-out", player.position < 0);
    pawn.classList.toggle("phase-s", player.phase === "S" && player.position >= 0);

    if (player.position < 0) {
      return;
    }

    const coord = path[Math.min(player.position, path.length - 1)];
    const center = cellCenter(coord);
    const crowdOffset = getCrowdOffset(index);
    pawn.style.left = `calc(${center.left} + ${crowdOffset.x}px)`;
    pawn.style.top = `calc(${center.top} + ${crowdOffset.y}px)`;
  });
}

function getCrowdOffset(index) {
  const offsets = [
    { x: -9, y: -7 },
    { x: 0, y: -7 },
    { x: 9, y: -7 },
    { x: -9, y: 7 },
    { x: 0, y: 7 },
    { x: 9, y: 7 },
  ];
  return offsets[index] || { x: 0, y: 0 };
}

function updateTurn(message) {
  if (!players.some((player) => player.position >= 0 && !player.finished && !player.lost)) {
    document.querySelector(".turn-card")?.style.setProperty("--turn-color", "#9aa3ad");
    currentDot.style.background = "#9aa3ad";
    currentName.textContent = "Sem peões";
    dice.disabled = true;
    enterButton.classList.add("is-hidden");
    enterButton.disabled = true;
    statusText.textContent = "Clique em um peão para colocá-lo no Checkpoint/Inicio.";
    if (notificationText) {
      notificationText.textContent = statusText.textContent;
    }
    drawPlayers();
    updatePawns();
    updateResourcePanel();
    return;
  }

  if (players[currentPlayer].position < 0 || players[currentPlayer].finished || players[currentPlayer].lost) {
    currentPlayer = findNextActivePlayer(currentPlayer);
  }

  const player = players[currentPlayer];
  document.querySelector(".turn-card")?.style.setProperty("--turn-color", player.color);
  currentDot.style.background = player.color;
  currentName.textContent = player.name;
  dice.disabled = false;
  enterButton.classList.add("is-hidden");
  enterButton.disabled = true;
  statusText.textContent = message;
  if (notificationText) {
    notificationText.textContent = message;
  }
  if (resultText) {
    resultText.textContent = message;
  }
  drawPlayers();
  updatePawns();
  updateResourcePanel();
}

function addRoundLog(player, message) {
  const logPlayer = player ?? players[currentPlayer];
  roundLog.unshift({
    playerName: logPlayer?.name ?? "Jogo",
    color: logPlayer?.color ?? "#9aa3ad",
    message,
  });

  if (roundLog.length > 4) {
    roundLog.length = 4;
  }

  renderRoundHistory();
}

function renderRoundHistory() {
  if (!roundHistory) return;

  if (roundLog.length === 0) {
    roundHistory.innerHTML = `<div class="history-empty">As últimas 4 rodadas aparecerão aqui.</div>`;
    return;
  }

  roundHistory.innerHTML = roundLog
    .map(
      (item) => `
        <div class="history-item" style="--history-color:${item.color}">
          <span class="history-player"><i class="history-dot"></i>${item.playerName}</span>
          <div>${item.message}</div>
        </div>
      `,
    )
    .join("");
}

function updateResourcePanel() {
  const activePlayers = players.filter((player) => player.position >= 0 && !player.lost && !player.finished);
  const current = players[currentPlayer];
  if (!activePlayers.length) {
    phaseText.textContent = "Nenhum jogador ativo";
    resourcePlayerList.innerHTML = `
      <div class="resource-player-empty">Escolha os peões e inicie a partida.</div>
    `;
    resourceNote.textContent = "Inicie a partida para acompanhar os recursos de cada peão.";
    return;
  }

  phaseText.textContent = current && activePlayers.includes(current)
    ? `Vez: ${current.name} - ${current.phase}${current.phase === "M" ? `/${getMitosisStageLabel(current)}` : ""}`
    : "Jogadores ativos";
  resourcePlayerList.innerHTML = activePlayers
    .map((player, index) => {
      const isCurrent = player === current;
      const phaseLabel = `${player.phase}${player.phase === "M" ? `/${getMitosisStageLabel(player)}` : ""}`;
      return `
        <div class="resource-player-row ${isCurrent ? "is-current" : ""}" style="--player-color:${player.color}">
          <div class="resource-player-head">
            <span class="resource-player-dot"></span>
            <strong>${player.name}</strong>
            <small>${phaseLabel}</small>
          </div>
          <div class="resource-player-stats">
            <span>ATP <b>${player.atp}</b></span>
            <span>Prot <b>${player.proteins}</b></span>
            <span>AA <b>${player.aminoAcids}</b></span>
            <span>PM <b>${player.mitoticProteins}</b></span>
            <span>Coringa <b>${player.wildResources}</b></span>
            <span>DNA <b>${player.dnaCards}</b></span>
          </div>
        </div>
      `;
    })
    .join("");

  const player = current && activePlayers.includes(current) ? current : activePlayers[0];
  if (player.phase === "G1") {
    resourceNote.textContent = "Para avancar de G1 para S, pague 2 ATPs e 2 proteinas no checkpoint.";
  } else if (player.phase === "S") {
    resourceNote.textContent = `Sintese: DNA ${player.dnaCards}/2. Checkpoint ${player.sCheckpointVisits}/2. Na fase S, passar por AA consome 1 aminoacido.`;
  } else if (player.phase === "G2") {
    resourceNote.textContent = `G2: precisa de 4 ATPs, 2 proteínas mitóticas e 2 cartas DNA para avançar. Ao completar a volta, ganha 1 ATP e 1 proteína.`;
  } else if (player.phase === "M") {
    resourceNote.textContent = `Mitose: ${getMitosisStageLabel(player)}. DNA ${player.dnaCards}/2, ATP ${player.atp}, proteínas mitóticas ${player.mitoticProteins}.`;
  } else {
    resourceNote.textContent = "Citocinese concluida.";
  }
}

function setMessage(message, hint = "") {
  statusText.textContent = message;
  if (notificationText) {
    notificationText.textContent = message;
  }
  if (resultText) {
    resultText.textContent = message;
  }
  if (!hint && hintText) {
    hintText.textContent = "Use Reiniciar partida para escolher novamente os peoes.";
    return;
  }
  if (hintText) {
    hintText.textContent = hint || "Clique nos peões para adicionar ou remover jogadores do tabuleiro.";
  }
}

function showWinnerMessage(player) {
  document.querySelector(".winner-toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "winner-toast";
  toast.style.setProperty("--winner-color", player.color);
  toast.innerHTML = `
    <strong>${player.name} venceu!</strong>
    <span>Ciclo celular concluido</span>
  `;
  document.body.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 450);
  }, 4200);
}

function resetPlayersToInitialState() {
  players.forEach((player) => {
    player.position = -1;
    player.phase = "G1";
    player.atp = 0;
    player.aminoAcids = 0;
    player.proteins = 0;
    player.mitoticProteins = 0;
    player.wildResources = 0;
    player.dnaCards = 0;
    player.sCheckpointVisits = 0;
    player.mitosisStage = "prophase";
    player.skipTurns = 0;
    player.extraTurn = false;
    player.ignoreNextDamage = 0;
    player.ignoreNextAtpCost = 0;
    player.ignoreNextNegative = 0;
    player.dnaProtection = 0;
    player.g2CheckpointSnapshot = null;
    player.collectedAtpThisLap = false;
    player.finished = false;
    player.lost = false;
  });
  currentPlayer = 0;
  pendingAaPlayerIndex = null;
  pendingAaResolve = null;
  eventResolver = null;
  eventResolverStack.length = 0;
  clearEventAutoCloseTimer();
  pendingEventAction = null;
  eventModal.hidden = true;
  renderDice(1);
  dice.classList.remove("aa-roll");
  isRolling = false;
  roundLog.length = 0;
  renderRoundHistory();
}

function renderSetupModal() {
  setupPlayerGrid.innerHTML = players
    .map(
      (player, index) => `
        <button class="setup-player-button ${setupSelectedPlayers.has(index) ? "is-selected" : ""}" type="button" data-setup-player="${index}" style="--player-color:${player.color}">
          <span class="setup-player-dot"></span>
          <strong>${player.name}</strong>
        </button>
      `,
    )
    .join("");
  setupFeedback.textContent = setupSelectedPlayers.size > 0
    ? `${setupSelectedPlayers.size} peao${setupSelectedPlayers.size > 1 ? "es" : ""} selecionado${setupSelectedPlayers.size > 1 ? "s" : ""}.`
    : "Selecione pelo menos 1 peao para iniciar.";
  startGameButton.disabled = setupSelectedPlayers.size === 0;
}

function openPlayerSetupModal() {
  renderSetupModal();
  playerSetupModal.hidden = false;
}

function closePlayerSetupModal() {
  playerSetupModal.hidden = true;
}

function startSelectedPlayers() {
  if (setupSelectedPlayers.size === 0) {
    setupFeedback.textContent = "Selecione pelo menos 1 peao para iniciar.";
    return;
  }

  resetPlayersToInitialState();
  setupSelectedPlayers.forEach((index) => {
    players[index].position = checkpointIndex;
  });
  currentPlayer = [...setupSelectedPlayers][0];
  closePlayerSetupModal();
  updateTurn("Partida iniciada. Role o dado para começar.");
}

function togglePlayer(index) {
  if (isRolling) return;

  const player = players[index];

  if (player.position >= 0) {
    if (pendingAaPlayerIndex === index) {
      pendingAaPlayerIndex = null;
      dice.classList.remove("aa-roll");
    }
    player.position = -1;
    player.finished = false;
    player.lost = false;
    if (index === currentPlayer) {
      currentPlayer = findNextActivePlayer(index);
    }
    updateTurn(`${player.name} saiu do tabuleiro.`);
    return;
  }

  player.position = checkpointIndex;
  player.finished = false;
  player.lost = false;
  player.phase = "G1";
  player.atp = 0;
  player.aminoAcids = 0;
  player.proteins = 0;
  player.mitoticProteins = 0;
  player.wildResources = 0;
  player.dnaCards = 0;
  player.sCheckpointVisits = 0;
  player.mitosisStage = "prophase";
  player.skipTurns = 0;
  player.extraTurn = false;
  player.ignoreNextDamage = 0;
  player.ignoreNextAtpCost = 0;
  player.ignoreNextNegative = 0;
  player.dnaProtection = 0;
  player.g2CheckpointSnapshot = null;
  player.collectedAtpThisLap = false;
  if (!players.some((item, itemIndex) => itemIndex !== index && item.position >= 0 && !item.finished)) {
    currentPlayer = index;
  }
  updateTurn(`${player.name} entrou no Checkpoint/Inicio.`);
}

function findNextActivePlayer(fromIndex) {
  for (let step = 1; step <= players.length; step += 1) {
    const index = (fromIndex + step) % players.length;
    if (players[index].position >= 0 && !players[index].finished && !players[index].lost) {
      return index;
    }
  }
  return fromIndex;
}

function placeCurrentPawn() {
  const player = players[currentPlayer];
  if (player.position >= 0 || player.finished) return;
  player.position = checkpointIndex;
  updateTurn(`${player.name} entrou no ciclo celular. Agora role o dado.`);
}

function rollDice() {
  if (isRolling) return;

  if (pendingAaPlayerIndex !== null) {
    resolvePendingAaRoll();
    return;
  }

  const player = players[currentPlayer];
  if (player.position < 0 || player.finished || player.lost) {
    nextTurn("Este peão não está ativo.");
    return;
  }

  isRolling = true;
  enterButton.disabled = true;
  dice.classList.add("rolling");

  let flashes = 0;
  const ticker = window.setInterval(() => {
    renderDice(Math.floor(Math.random() * 6) + 1);
    flashes += 1;
    if (flashes >= 9) {
      window.clearInterval(ticker);
    }
  }, 70);

  window.setTimeout(() => {
    const value = Math.floor(Math.random() * 6) + 1;
    renderDice(value);
    dice.classList.remove("rolling");
    resolveMove(value);
  }, 760);
}

async function resolveMove(value) {
  const player = players[currentPlayer];
  const playerName = player.name;

  setMessage(`${playerName} tirou ${value}.`, "O peão está andando casa por casa.");
  for (let step = 0; step < value; step += 1) {
    const nextPosition = getNextPosition(player, player.position);
    player.position = nextPosition;

    const landedOnCheckpoint = nextPosition === getCheckpointIndex(player);
    const isFinalStep = step === value - 1;
    const cell = specialCells.get(nextPosition);
    if (!isFinalStep && !landedOnCheckpoint && cell?.className === "aa") {
      if (player.phase === "S") {
        const aaLoss = loseAminoAcids(player, 1);
        setMessage(
          describeAminoAcidLoss(
            player,
            `${playerName} passou por AA na fase S e perdeu 1 aminoacido.`,
            `${playerName} passou por AA na fase S, mas nao tinha aminoacidos para perder.`,
            aaLoss,
          ),
          "Na sintese, os aminoacidos sao consumidos durante a replicacao.",
        );
        updatePawns();
        drawPlayers();
        updateResourcePanel();
        await wait(270);
        continue;
      }
      if (player.phase === "M" && player.mitosisStage !== "prophase") {
        setMessage(
          `${playerName} passou por AA na ${getMitosisStageLabel(player)}, mas nao coleta mais recursos ao passar.`,
          "Depois da Profase, AA so conta quando o peao para exatamente nessa casa.",
        );
        updatePawns();
        drawPlayers();
        updateResourcePanel();
        await wait(270);
        continue;
      }
      addAminoAcids(player, 2);
      setMessage(
        `${playerName} passou por AA e ganhou 2 aminoácidos.`,
        "Ao juntar 20 aminoácidos, 1 proteína é formada automaticamente.",
      );
    }

    updatePawns();
    drawPlayers();
    updateResourcePanel();
    await wait(270);

    if (landedOnCheckpoint) {
      break;
    }
  }

  await resolveLanding(player, value);
}

function getNextPosition(player, position) {
  if (usesInnerBoard(player)) {
    if (position < outerPathLength || position >= path.length) {
      return innerCheckpointIndex;
    }
    const innerOffset = position - outerPathLength;
    return outerPathLength + ((innerOffset + 1) % innerPathLength);
  }

  if (position < 0 || position >= outerPathLength) {
    return checkpointIndex;
  }
  return (position + 1) % outerPathLength;
}

function usesInnerBoard(player) {
  return player.phase === "G2" || player.phase === "M";
}

function getCheckpointIndex(player) {
  return usesInnerBoard(player) ? innerCheckpointIndex : checkpointIndex;
}

async function resolveLanding(player, value) {
  const special = specialCells.get(player.position);
  let message = `${player.name} andou ${value} casas.`;

  if (player.position === getCheckpointIndex(player)) {
    await resolveCheckpoint(player);
    return;
  }

  if (special?.className === "aa") {
    if (player.phase === "S") {
      const aaLoss = loseAminoAcids(player, 1);
      message = describeAminoAcidLoss(
        player,
        `${player.name} parou em AA na fase S e perdeu 1 aminoacido.`,
        `${player.name} parou em AA na fase S, mas nao tinha aminoacidos para perder.`,
        aaLoss,
      );
    } else {
    pendingAaPlayerIndex = players.indexOf(player);
    currentPlayer = pendingAaPlayerIndex;
    isRolling = false;
    dice.classList.add("aa-roll");
    dice.disabled = false;
    setMessage(
      `${player.name} parou em AA. Clique no dado azul para receber aminoácidos.`,
      "O próximo resultado do dado será a quantidade de AA recebida.",
    );
    updateResourcePanel();
    drawPlayers();
    updatePawns();
    return;
    }
  } else if (special?.className === "atp") {
    player.atp += 1;
    player.collectedAtpThisLap = true;
    message = `${player.name} parou em ATP e ganhou 1 ATP.`;
  } else if (special?.className === "event") {
    message = await resolveEvent(player);
  } else if (special?.className === "damage") {
    message = resolveDamage(player);
  } else if (special?.action) {
    message = await resolveActionCell(player, special);
  }

  isRolling = false;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  addRoundLog(player, message);

  if (player.extraTurn && !player.lost && !player.finished) {
    player.extraTurn = false;
    isRolling = false;
    updateTurn(`${message} ${player.name} joga novamente.`);
    return;
  }

  if (player.lost) {
    nextTurn(message);
    return;
  }

  nextTurn(message);
}

function addAminoAcids(player, amount) {
  player.aminoAcids += amount;
  const formedProteins = Math.floor(player.aminoAcids / 20);
  if (formedProteins > 0) {
    player.proteins += formedProteins;
    player.aminoAcids %= 20;
  }
  return formedProteins;
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[Ãã]/g, "a")
    .replace(/[ÉéÊê]/g, "e")
    .replace(/[Íí]/g, "i")
    .replace(/[ÓóÔô]/g, "o")
    .replace(/[Úú]/g, "u")
    .toLowerCase();
}

function loseAminoAcids(player, amount = 1) {
  let proteinsBroken = 0;
  while (player.aminoAcids < amount && player.proteins > 0) {
    player.proteins -= 1;
    player.aminoAcids += 20;
    proteinsBroken += 1;
  }

  const lost = Math.min(player.aminoAcids, amount);
  player.aminoAcids = Math.max(0, player.aminoAcids - amount);
  return {
    lost,
    proteinsBroken,
    shortage: amount - lost,
  };
}

function describeAminoAcidLoss(player, successMessage, emptyMessage, loss) {
  let message = loss.lost > 0 ? successMessage : emptyMessage;
  if (loss.proteinsBroken > 0) {
    const proteinLabel = loss.proteinsBroken > 1 ? "proteinas" : "proteina";
    message += ` Quebrou ${loss.proteinsBroken} ${proteinLabel} em aminoacidos e ficou com ${player.aminoAcids} AA.`;
  }
  return message;
}

function loseDna(player, amount = 1) {
  if (player.dnaProtection > 0) {
    player.dnaProtection -= 1;
    return { lost: 0, protected: true };
  }
  const lost = Math.min(player.dnaCards, amount);
  player.dnaCards = Math.max(0, player.dnaCards - amount);
  return { lost, protected: false };
}

function payAtp(player, amount) {
  if (amount <= 0) return true;
  if (player.ignoreNextAtpCost > 0) {
    player.ignoreNextAtpCost -= 1;
    return true;
  }
  if (player.atp < amount) return false;
  player.atp -= amount;
  return true;
}

async function movePlayerByCard(player, steps, chainDepth = 0) {
  const direction = steps >= 0 ? 1 : -1;
  const total = Math.abs(steps);
  const messages = [];
  for (let index = 0; index < total; index += 1) {
    player.position = direction > 0 ? getNextPosition(player, player.position) : getPreviousPosition(player, player.position);
    updatePawns();
    drawPlayers();
    updateResourcePanel();
    await wait(180);

    const landedOnCheckpoint = player.position === getCheckpointIndex(player);
    const isFinalStep = index === total - 1;
    if (!isFinalStep && !landedOnCheckpoint) {
      const passMessage = await resolveCardPassEffect(player);
      if (passMessage) messages.push(passMessage);
    }

    if (landedOnCheckpoint) {
      messages.push(await resolveCheckpointForCardMove(player));
      break;
    }
  }

  if (player.position !== getCheckpointIndex(player)) {
    const landingMessage = await resolveCardLanding(player, steps, chainDepth);
    if (landingMessage) messages.push(landingMessage);
  }

  updateResourcePanel();
  drawPlayers();
  updatePawns();
  return messages.filter(Boolean).join(" ");
}

function getPreviousPosition(player, position) {
  if (usesInnerBoard(player)) {
    if (position < outerPathLength || position >= path.length) return innerCheckpointIndex;
    const innerOffset = position - outerPathLength;
    return outerPathLength + ((innerOffset - 1 + innerPathLength) % innerPathLength);
  }
  if (position < 0 || position >= outerPathLength) return checkpointIndex;
  return (position - 1 + outerPathLength) % outerPathLength;
}

async function movePlayerToCheckpointByCard(player) {
  const messages = [];
  let guard = 0;
  while (player.position !== getCheckpointIndex(player) && guard < path.length) {
    player.position = getNextPosition(player, player.position);
    updatePawns();
    drawPlayers();
    updateResourcePanel();
    await wait(180);
    guard += 1;

    if (player.position !== getCheckpointIndex(player)) {
      const passMessage = await resolveCardPassEffect(player);
      if (passMessage) messages.push(passMessage);
    }
  }

  if (player.position === getCheckpointIndex(player)) {
    messages.push(await resolveCheckpointForCardMove(player));
  }

  return messages.filter(Boolean).join(" ");
}

async function resolveCardPassEffect(player) {
  const cell = specialCells.get(player.position);
  if (cell?.className !== "aa") return "";

  if (player.phase === "S") {
    const aaLoss = loseAminoAcids(player, 1);
    return describeAminoAcidLoss(
      player,
      `${player.name} passou por AA na fase S e perdeu 1 aminoacido.`,
      `${player.name} passou por AA na fase S, mas nao tinha aminoacidos para perder.`,
      aaLoss,
    );
  }

  if (player.phase === "M" && player.mitosisStage !== "prophase") {
    return `${player.name} passou por AA na ${getMitosisStageLabel(player)}, mas nao coleta mais recursos ao passar.`;
  }

  addAminoAcids(player, 2);
  return `${player.name} passou por AA e ganhou 2 aminoacidos.`;
}

async function resolveCardLanding(player, value, chainDepth = 0) {
  const special = specialCells.get(player.position);
  if (!special) return `${player.name} andou ${Math.abs(value)} casa${Math.abs(value) > 1 ? "s" : ""}.`;

  if (special.className === "aa") {
    if (player.phase === "S") {
      const aaLoss = loseAminoAcids(player, 1);
      return describeAminoAcidLoss(
        player,
        `${player.name} parou em AA na fase S e perdeu 1 aminoacido.`,
        `${player.name} parou em AA na fase S, mas nao tinha aminoacidos para perder.`,
        aaLoss,
      );
    }

    return requestAaRoll(player);
  }

  if (special.className === "atp") {
    player.atp += 1;
    player.collectedAtpThisLap = true;
    return `${player.name} parou em ATP e ganhou 1 ATP.`;
  }

  if (special.className === "event") {
    return `Ao parar em Evento pela carta, ${await resolveEvent(player)}`;
  }

  if (special.className === "damage") {
    return resolveDamage(player);
  }

  if (special.action) {
    return resolveActionCell(player, special, chainDepth);
  }

  return "";
}

async function resolveActionCell(player, special, chainDepth = 0) {
  const action = special.action;
  if (!action) return "";

  if (action.type === "move") {
    if (chainDepth >= 4) {
      return `${player.name} caiu em ${special.text}, mas a sequencia de movimentos foi encerrada.`;
    }
    const steps = action.steps;
    const movementMessage = await movePlayerByCard(player, steps, chainDepth + 1);
    return `${player.name} caiu em ${special.text} e ${steps > 0 ? "avancou" : "voltou"} ${Math.abs(steps)} casas. ${movementMessage}`;
  }

  if (action.type === "again") {
    player.extraTurn = true;
    return `${player.name} caiu em Jogue Novamente e tera mais uma jogada.`;
  }

  if (action.type === "skip") {
    player.skipTurns = Math.max(player.skipTurns, 1);
    return `${player.name} caiu em Perca 1 rodada e perdera a proxima jogada.`;
  }

  return "";
}

async function resolveCheckpointForCardMove(player) {
  let message = `${player.name} chegou ao checkpoint pelo efeito da carta.`;
  if (player.phase === "G1" || player.phase === "S") {
    player.proteins += 1;
    message += ` Por completar 1 volta na fase ${player.phase}, ganhou 1 proteina.`;
  } else if (player.phase === "G2" || player.phase === "M") {
    player.atp += 1;
    player.proteins += 1;
    player.collectedAtpThisLap = true;
    message += ` Por completar 1 volta na fase ${player.phase}, ganhou 1 ATP e 1 proteína.`;
  }

  if (player.phase === "G1") {
    message = await openCheckpointModalV2(player, message);
  } else if (player.phase === "S") {
    message = await openSCheckpointModal(player, message);
  } else if (player.phase === "G2") {
    message = await openG2CheckpointModalV2(player, message);
  } else if (player.phase === "M") {
    message = await openMCheckpointModal(player, message);
  }

  player.collectedAtpThisLap = false;
  saveCheckpointSnapshot(player);
  return message;
}

function moveToNextSpecial(player, className) {
  let testPosition = player.position;
  for (let step = 0; step < path.length; step += 1) {
    testPosition = getNextPosition(player, testPosition);
    if (specialCells.get(testPosition)?.className === className) {
      player.position = testPosition;
      updatePawns();
      return true;
    }
  }
  return false;
}

async function moveToNextSpecialByCard(player, className) {
  const messages = [];
  for (let step = 0; step < path.length; step += 1) {
    player.position = getNextPosition(player, player.position);
    updatePawns();
    drawPlayers();
    updateResourcePanel();
    await wait(180);

    if (specialCells.get(player.position)?.className === className) {
      const landingMessage = await resolveCardLanding(player, step + 1);
      if (landingMessage) messages.push(landingMessage);
      return { moved: true, message: messages.filter(Boolean).join(" ") };
    }

    const passMessage = await resolveCardPassEffect(player);
    if (passMessage) messages.push(passMessage);

    if (player.position === getCheckpointIndex(player)) {
      messages.push(await resolveCheckpointForCardMove(player));
      return { moved: true, message: messages.filter(Boolean).join(" ") };
    }
  }

  return { moved: false, message: "" };
}

function restoreG2CheckpointSnapshot(player) {
  const snapshot = player.g2CheckpointSnapshot;
  if (!snapshot) return;
  player.atp = snapshot.atp;
  player.aminoAcids = snapshot.aminoAcids;
  player.proteins = snapshot.proteins;
  player.mitoticProteins = snapshot.mitoticProteins;
  player.wildResources = snapshot.wildResources || 0;
  player.dnaCards = snapshot.dnaCards;
}

function saveCheckpointSnapshot(player) {
  if (player.phase !== "G2") return;
  player.g2CheckpointSnapshot = {
    atp: player.atp,
    aminoAcids: player.aminoAcids,
    proteins: player.proteins,
    mitoticProteins: player.mitoticProteins,
    wildResources: player.wildResources,
    dnaCards: player.dnaCards,
  };
}

async function rollResourceDie() {
  dice.classList.add("rolling");
  let flashes = 0;
  const ticker = window.setInterval(() => {
    renderDice(Math.floor(Math.random() * 6) + 1);
    flashes += 1;
    if (flashes >= 8) {
      window.clearInterval(ticker);
    }
  }, 70);

  await wait(760);
  const value = Math.floor(Math.random() * 6) + 1;
  renderDice(value);
  dice.classList.remove("rolling");
  return value;
}

function requestAaRoll(player) {
  pendingAaPlayerIndex = players.indexOf(player);
  currentPlayer = pendingAaPlayerIndex;
  isRolling = false;
  dice.classList.add("aa-roll");
  dice.disabled = false;
  setMessage(
    `${player.name} parou em AA. Clique no dado azul para receber aminoácidos.`,
    "O próximo resultado do dado será a quantidade de AA recebida.",
  );
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  return new Promise((resolve) => {
    pendingAaResolve = resolve;
  });
}

async function resolvePendingAaRoll() {
  const player = players[pendingAaPlayerIndex];
  if (!player) {
    pendingAaPlayerIndex = null;
    pendingAaResolve = null;
    dice.classList.remove("aa-roll");
    updateTurn("Rolagem de AA cancelada.");
    return;
  }

  isRolling = true;
  const resolveAa = pendingAaResolve;
  const aaRoll = await rollResourceDie();
  addAminoAcids(player, aaRoll);
  pendingAaPlayerIndex = null;
  pendingAaResolve = null;
  dice.classList.remove("aa-roll");
  isRolling = false;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  const message = `${player.name} rolou ${aaRoll} no dado azul e ganhou ${aaRoll} AA.`;
  if (resolveAa) {
    resolveAa(message);
    return;
  }
  addRoundLog(player, message);
  nextTurn(message);
}

async function resolveCheckpoint(player) {
  let message = `${player.name} parou obrigatoriamente no Checkpoint/Inicio.`;

  if (player.phase === "G1" || player.phase === "S") {
    player.proteins += 1;
    message += ` Por completar 1 volta na fase ${player.phase}, ganhou 1 proteina.`;
  } else if (player.phase === "G2" || player.phase === "M") {
    player.atp += 1;
    player.proteins += 1;
    player.collectedAtpThisLap = true;
    message += ` Por completar 1 volta na fase ${player.phase}, ganhou 1 ATP e 1 proteína.`;
  }

  if (player.phase === "G1") {
    message = await openCheckpointModalV2(player, message);
  } else if (player.phase === "S") {
    message = await openSCheckpointModal(player, message);
  } else if (player.phase === "G2") {
    message = await openG2CheckpointModalV2(player, message);
  } else if (player.phase === "M") {
    message = await openMCheckpointModal(player, message);
  }

  player.collectedAtpThisLap = false;
  saveCheckpointSnapshot(player);
  isRolling = false;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  addRoundLog(player, message);
  nextTurn(message);
}

function openCheckpointModal(player, introMessage) {
  return new Promise((resolve) => {
    const hasEnoughResources = player.atp >= 2 && player.proteins >= 2;
    checkpointResolver = { player, resolve, type: "G1", hasEnoughResources };
    checkpointSummary.innerHTML = `
      <div class="checkpoint-resource"><strong>ATP</strong><span>${player.atp}/2</span></div>
      <div class="checkpoint-resource"><strong>Proteínas</strong><span>${player.proteins}/2</span></div>
      <div class="checkpoint-resource"><strong>AA</strong><span>${player.aminoAcids}</span></div>
    `;
    checkpointMessage.textContent = hasEnoughResources
      ? `${introMessage} Você tem recursos suficientes. Deseja avançar para a fase S ou continuar coletando?`
      : `${introMessage} Recursos insuficientes: precisa de 2 ATPs e 2 proteínas. Você continuará em G1.`;
    checkpointAdvance.disabled = !hasEnoughResources;
    checkpointAdvance.hidden = !hasEnoughResources;
    checkpointAdvance.textContent = "Passar para a fase S";
    checkpointContinue.textContent = hasEnoughResources ? "Continuar coletando" : "Continuar em G1";
    checkpointModal.hidden = false;
  });
}

function openG2CheckpointModal(player, introMessage) {
  return new Promise((resolve) => {
    const convertedProteins = convertMitoticProteins(player);
    const hasEnoughResources = player.dnaCards >= 2 && player.atp >= 4 && player.mitoticProteins >= 2;
    const conversionMessage =
      convertedProteins > 0
        ? ` Foram formadas ${convertedProteins} proteina${convertedProteins > 1 ? "s" : ""} mitotica${convertedProteins > 1 ? "s" : ""} usando proteinas comuns.`
        : "";

    checkpointResolver = { player, resolve, type: "G2", hasEnoughResources };
    checkpointSummary.innerHTML = `
      <div class="checkpoint-resource"><strong>ATP</strong><span>${player.atp}/4</span></div>
      <div class="checkpoint-resource"><strong>Prot. mitoticas</strong><span>${player.mitoticProteins}/2</span></div>
      <div class="checkpoint-resource"><strong>DNA</strong><span>${player.dnaCards}/2</span></div>
      <div class="checkpoint-resource"><strong>Proteinas</strong><span>${player.proteins}</span></div>
    `;
    checkpointMessage.textContent = hasEnoughResources
      ? `${introMessage}${conversionMessage} Voce tem recursos suficientes. Deseja avancar para a Mitose ou continuar coletando?`
      : `${introMessage}${conversionMessage} Recursos insuficientes: precisa de 4 ATPs, 2 proteinas mitoticas e 2 cartas DNA. Voce continuara em G2.`;
    checkpointAdvance.disabled = !hasEnoughResources;
    checkpointAdvance.hidden = !hasEnoughResources;
    checkpointAdvance.textContent = "Passar para a Mitose";
    checkpointContinue.textContent = hasEnoughResources ? "Continuar coletando" : "Continuar em G2";
    checkpointModal.hidden = false;
  });
}

function openCheckpointModalV2(player, introMessage) {
  return new Promise((resolve) => {
    checkpointResolver = { player, resolve, type: "G1", introMessage };
    renderCheckpointModal();
    checkpointModal.hidden = false;
  });
}

function openSCheckpointModal(player, introMessage) {
  return new Promise((resolve) => {
    checkpointResolver = { player, resolve, type: "S", introMessage };
    renderCheckpointModal();
    checkpointModal.hidden = false;
  });
}

function openG2CheckpointModalV2(player, introMessage) {
  return new Promise((resolve) => {
    checkpointResolver = { player, resolve, type: "G2", introMessage, conversionMessage: "" };
    renderCheckpointModal();
    checkpointModal.hidden = false;
  });
}

function openTradeOnlyCheckpointModal(player, introMessage) {
  return new Promise((resolve) => {
    checkpointResolver = { player, resolve, type: "M", introMessage };
    renderCheckpointModal();
    checkpointModal.hidden = false;
  });
}

function openMCheckpointModal(player, introMessage) {
  return new Promise((resolve) => {
    checkpointResolver = { player, resolve, type: "M", introMessage };
    renderCheckpointModal();
    checkpointModal.hidden = false;
  });
}

function clearEventAutoCloseTimer() {
  if (!eventAutoCloseTimer) return;
  window.clearTimeout(eventAutoCloseTimer);
  eventAutoCloseTimer = null;
}

function renderCheckpointModal() {
  if (!checkpointResolver) return;
  const { player, type, introMessage } = checkpointResolver;
  checkpointTrade.hidden = player.proteins < 2;
  checkpointTrade.disabled = checkpointTrade.hidden;
  checkpointMitoticTrade.hidden = !(type === "G2" || type === "M") || player.proteins < 2;
  checkpointMitoticTrade.disabled = checkpointMitoticTrade.hidden;
  const canBuyDna = (type === "G2" || type === "M") && player.dnaCards < 2 && player.atp >= 2;
  checkpointBuyDna.hidden = !canBuyDna;
  checkpointBuyDna.disabled = !canBuyDna;
  const hasWildcard = player.wildResources > 0;
  checkpointWildcardAtp.hidden = !hasWildcard;
  checkpointWildcardProtein.hidden = !hasWildcard;
  checkpointWildcardMitotic.hidden = !hasWildcard || !(type === "G2" || type === "M");
  checkpointWildcardAtp.disabled = !hasWildcard;
  checkpointWildcardProtein.disabled = !hasWildcard;
  checkpointWildcardMitotic.disabled = checkpointWildcardMitotic.hidden;
  checkpointContinue.hidden = false;

  if (type === "G1") {
    const hasEnoughResources = player.atp >= 2 && player.proteins >= 2;
    checkpointResolver.hasEnoughResources = hasEnoughResources;
    checkpointSummary.innerHTML = `
      <div class="checkpoint-resource"><strong>ATP</strong><span>${player.atp}/2</span></div>
      <div class="checkpoint-resource"><strong>Proteinas</strong><span>${player.proteins}/2</span></div>
      <div class="checkpoint-resource"><strong>Coringa</strong><span>${player.wildResources}</span></div>
      <div class="checkpoint-resource"><strong>AA</strong><span>${player.aminoAcids}</span></div>
    `;
    checkpointMessage.textContent = hasEnoughResources
      ? `${introMessage}${checkpointResolver.conversionMessage || ""} Voce tem recursos suficientes. Deseja avancar para a fase S ou continuar coletando?`
      : `${introMessage}${checkpointResolver.conversionMessage || ""} Recursos insuficientes: precisa de 2 ATPs e 2 proteinas. Se quiser, pode trocar 2 proteinas por 1 ATP ou usar um coringa.`;
    checkpointAdvance.disabled = !hasEnoughResources;
    checkpointAdvance.hidden = !hasEnoughResources;
    checkpointAdvance.textContent = "Passar para a fase S";
    checkpointContinue.textContent = hasEnoughResources ? "Continuar coletando" : "Continuar em G1";
    return;
  }

  if (type === "S") {
    const firstLap = player.sCheckpointVisits === 0;
    const hasEnoughResources = firstLap ? player.atp >= 2 : player.atp >= 1 && player.proteins >= 1;
    checkpointResolver.hasEnoughResources = hasEnoughResources;
    checkpointSummary.innerHTML = firstLap
      ? `
        <div class="checkpoint-resource"><strong>ATP</strong><span>${player.atp}/2</span></div>
        <div class="checkpoint-resource"><strong>Proteinas</strong><span>${player.proteins}</span></div>
        <div class="checkpoint-resource"><strong>Coringa</strong><span>${player.wildResources}</span></div>
        <div class="checkpoint-resource"><strong>DNA</strong><span>${player.dnaCards}/2</span></div>
      `
      : `
        <div class="checkpoint-resource"><strong>ATP</strong><span>${player.atp}/1</span></div>
        <div class="checkpoint-resource"><strong>Proteinas</strong><span>${player.proteins}/1</span></div>
        <div class="checkpoint-resource"><strong>Coringa</strong><span>${player.wildResources}</span></div>
        <div class="checkpoint-resource"><strong>DNA</strong><span>${player.dnaCards}/2</span></div>
      `;
    checkpointMessage.textContent = firstLap
      ? `${introMessage}${checkpointResolver.conversionMessage || ""} Primeira volta da fase S: precisa pagar 2 ATPs para abrir a fita molde. Pode trocar 2 proteinas por 1 ATP ou usar um coringa antes de resolver.`
      : `${introMessage}${checkpointResolver.conversionMessage || ""} Segunda volta da fase S: precisa pagar 1 ATP e 1 proteina para concluir a replicacao. Pode trocar 2 proteinas por 1 ATP ou usar um coringa antes de resolver.`;
    checkpointAdvance.disabled = false;
    checkpointAdvance.hidden = false;
    checkpointAdvance.textContent = firstLap ? "Abrir fita molde" : "Concluir replicacao";
    checkpointContinue.hidden = true;
    return;
  }

  if (type === "G2") {
    const hasEnoughResources = player.dnaCards >= 2 && player.atp >= 4 && player.mitoticProteins >= 2;
    checkpointResolver.hasEnoughResources = hasEnoughResources;
    checkpointTrade.hidden = player.proteins < 2;
    checkpointTrade.disabled = player.proteins < 2;
    checkpointMitoticTrade.hidden = player.proteins < 2;
    checkpointMitoticTrade.disabled = player.proteins < 2;
    checkpointBuyDna.hidden = !(player.dnaCards < 2 && player.atp >= 2);
    checkpointBuyDna.disabled = checkpointBuyDna.hidden;
    checkpointSummary.innerHTML = `
      <div class="checkpoint-resource"><strong>ATP</strong><span>${player.atp}/4</span></div>
      <div class="checkpoint-resource"><strong>Prot. mitoticas</strong><span>${player.mitoticProteins}/2</span></div>
      <div class="checkpoint-resource"><strong>DNA</strong><span>${player.dnaCards}/2</span></div>
      <div class="checkpoint-resource"><strong>Coringa</strong><span>${player.wildResources}</span></div>
      <div class="checkpoint-resource"><strong>Proteinas</strong><span>${player.proteins}</span></div>
    `;
    checkpointMessage.textContent = hasEnoughResources
      ? `${introMessage}${checkpointResolver.conversionMessage || ""} Voce tem recursos suficientes. Deseja avancar para a Mitose ou continuar coletando?`
      : `${introMessage}${checkpointResolver.conversionMessage || ""} Recursos insuficientes: precisa de 4 ATPs, 2 proteinas mitoticas e 2 cartas DNA. Se quiser, pode trocar proteinas por ATP ou por proteina mitotica.`;
    checkpointAdvance.disabled = !hasEnoughResources;
    checkpointAdvance.hidden = !hasEnoughResources;
    checkpointAdvance.textContent = "Passar para a Mitose";
    checkpointContinue.textContent = hasEnoughResources ? "Continuar coletando" : "Continuar em G2";
    return;
  }

  if (type === "M") {
    checkpointTrade.hidden = player.proteins < 2;
    checkpointTrade.disabled = player.proteins < 2;
    checkpointMitoticTrade.hidden = player.proteins < 2;
    checkpointMitoticTrade.disabled = player.proteins < 2;
    const stage = player.mitosisStage;
    const needsPayment = stage === "prophase" || stage === "anaphase";
    const hasEnoughResources = player.dnaCards >= 2 && (!needsPayment || (player.atp >= 1 && player.mitoticProteins >= 1));
    checkpointResolver.hasEnoughResources = hasEnoughResources;
    checkpointSummary.innerHTML = `
      <div class="checkpoint-resource"><strong>Etapa</strong><span>${getMitosisStageLabel(player)}</span></div>
      <div class="checkpoint-resource"><strong>ATP</strong><span>${player.atp}</span></div>
      <div class="checkpoint-resource"><strong>Proteinas</strong><span>${player.proteins}</span></div>
      <div class="checkpoint-resource"><strong>Prot. mitoticas</strong><span>${player.mitoticProteins}</span></div>
      <div class="checkpoint-resource"><strong>DNA</strong><span>${player.dnaCards}/2</span></div>
      <div class="checkpoint-resource"><strong>Coringa</strong><span>${player.wildResources}</span></div>
    `;
    if (stage === "prophase") {
      checkpointMessage.textContent = `${introMessage}${checkpointResolver.conversionMessage || ""} Profase: resolva obrigatoriamente. Pague 1 ATP e 1 proteina mitotica para avancar; se faltar recurso ou DNA, retorna para G2.`;
      checkpointAdvance.textContent = "Concluir Profase";
    } else if (stage === "metaphase") {
      checkpointMessage.textContent = `${introMessage}${checkpointResolver.conversionMessage || ""} Metafase: resolva obrigatoriamente. Role o dado para verificar o alinhamento cromossomico. 1-2 volta ao inicio da Metafase; 3-6 avanca.`;
      checkpointAdvance.textContent = "Rolar alinhamento";
    } else if (stage === "anaphase") {
      checkpointMessage.textContent = `${introMessage}${checkpointResolver.conversionMessage || ""} Anafase/Telofase: resolva obrigatoriamente. Pague 1 ATP e 1 proteina mitotica para concluir a Mitose; se faltar recurso ou DNA, retorna para G2.`;
      checkpointAdvance.textContent = "Concluir Anafase";
    } else {
      checkpointMessage.textContent = `${introMessage}${checkpointResolver.conversionMessage || ""} Citocinese concluida.`;
      checkpointAdvance.textContent = "Vencer jogo";
    }
    checkpointAdvance.hidden = false;
    checkpointAdvance.disabled = false;
    checkpointContinue.hidden = true;
    checkpointContinue.textContent = "Continuar na Mitose";
  }
}

function convertMitoticProteins(player) {
  const missingMitoticProteins = Math.max(0, 2 - player.mitoticProteins);
  const canConvert = Math.min(Math.floor(player.proteins / 2), missingMitoticProteins);
  if (canConvert <= 0) return 0;
  player.proteins -= canConvert * 2;
  player.mitoticProteins += canConvert;
  return canConvert;
}

function closeCheckpointModal(message) {
  if (!checkpointResolver) return;
  const { resolve } = checkpointResolver;
  checkpointResolver = null;
  checkpointModal.hidden = true;
  resolve(message);
}

async function resolveSCheckpoint(player, introMessage) {
  if (player.sCheckpointVisits === 0) {
    const trade = tradeProteinsForAtp(player, 2, 0);
    if (player.atp < 2) {
      eliminatePlayerByApoptosis(player);
      return `${introMessage} Na primeira volta da fase S, faltaram 2 ATPs para abrir a fita molde. ${player.name} sofreu apoptose e perdeu o jogo.`;
    }

    player.atp -= 2;
    player.sCheckpointVisits = 1;
    const tradeMessage = trade > 0 ? ` Trocou ${trade} proteina${trade > 1 ? "s" : ""} por ATP antes do pagamento.` : "";
    return `${introMessage}${tradeMessage} ${player.name} gastou 2 ATPs para abrir a fita molde e segue para a segunda volta da fase S.`;
  }

  if (player.proteins < 1) {
    eliminatePlayerByApoptosis(player);
    return `${introMessage} Na segunda volta da fase S, faltou 1 proteina para concluir a fita complementar. ${player.name} sofreu apoptose e perdeu o jogo.`;
  }

  const trade = tradeProteinsForAtp(player, 1, 1);
  if (player.atp < 1 || player.proteins < 1) {
    eliminatePlayerByApoptosis(player);
    return `${introMessage} Na segunda volta da fase S, faltaram recursos para concluir a replicacao do DNA. ${player.name} sofreu apoptose e perdeu o jogo.`;
  }

  player.atp -= 1;
  player.proteins -= 1;
  player.sCheckpointVisits = 2;
  player.dnaCards = Math.max(player.dnaCards, 2);
  player.phase = "G2";
  player.position = innerCheckpointIndex;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  await showDnaCardModal(player, "gain");
  const tradeMessage = trade > 0 ? ` Trocou ${trade} proteina${trade > 1 ? "s" : ""} por ATP antes do pagamento.` : "";
  return `${introMessage}${tradeMessage} ${player.name} gastou 1 ATP e 1 proteina, recebeu a segunda carta DNA e entrou no tabuleiro interno para a fase G2.`;
}

async function applySCheckpointPayment(player) {
  if (player.sCheckpointVisits === 0) {
    if (player.atp < 2 && player.ignoreNextAtpCost <= 0) {
      resetPlayerAfterApoptosis(player);
      return `${player.name} não tinha ATP suficiente para abrir a dupla hélice, sofreu apoptose e retornou para G1.`;
    }

    payAtp(player, 2);
    player.sCheckpointVisits = 1;
    return `${player.name} gastou 2 ATPs para abrir a dupla hélice e segue para a segunda volta da fase S.`;
  }

  if ((player.atp < 1 && player.ignoreNextAtpCost <= 0) || player.proteins < 1) {
    resetPlayerAfterApoptosis(player);
    return `${player.name} não tinha recursos suficientes para concluir a replicação, sofreu apoptose e retornou para G1.`;
  }

  payAtp(player, 1);
  player.proteins -= 1;
  player.sCheckpointVisits = 2;
  player.dnaCards = Math.max(player.dnaCards, 2);
  player.phase = "G2";
  player.position = innerCheckpointIndex;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  await showDnaCardModal(player, "gain");
  return `${player.name} gastou 1 ATP e 1 proteína, recebeu a segunda carta DNA e entrou no tabuleiro interno para a fase G2.`;
}

function getMitosisStageLabel(player) {
  const labels = {
    prophase: "Profase",
    metaphase: "Metafase",
    anaphase: "Anafase/Telofase",
    cytokinesis: "Citocinese",
  };
  return labels[player.mitosisStage] || "Profase";
}

function returnPlayerToG2(player, reason) {
  player.phase = "G2";
  player.mitosisStage = "prophase";
  player.position = innerCheckpointIndex;
  return `${player.name} voltou para G2: ${reason}`;
}

function returnPlayerToG2StartWithoutResources(player, reason) {
  player.phase = "G2";
  player.position = innerCheckpointIndex;
  player.atp = 0;
  player.aminoAcids = 0;
  player.proteins = 0;
  player.mitoticProteins = 0;
  player.wildResources = 0;
  player.sCheckpointVisits = 2;
  player.mitosisStage = "prophase";
  player.skipTurns = 0;
  player.extraTurn = false;
  player.ignoreNextDamage = 0;
  player.ignoreNextAtpCost = 0;
  player.ignoreNextNegative = 0;
  player.collectedAtpThisLap = false;
  player.finished = false;
  player.lost = false;
  saveCheckpointSnapshot(player);
  return `${player.name} voltou para o início da G2 sem recursos: ${reason}`;
}

function advanceMitosisStage(player) {
  if (player.mitosisStage === "prophase") {
    player.mitosisStage = "metaphase";
    return `${player.name} avancou para Metafase.`;
  }
  if (player.mitosisStage === "metaphase") {
    player.mitosisStage = "anaphase";
    return `${player.name} avancou para Anafase/Telofase.`;
  }
  if (player.mitosisStage === "anaphase") {
    player.mitosisStage = "cytokinesis";
    player.position = innerFinishIndex;
    player.finished = true;
    showWinnerMessage(player);
    return `${player.name} andou para a chegada, concluiu a Citocinese e venceu o Ciclo Celular!`;
  }
  player.position = innerFinishIndex;
  player.finished = true;
  showWinnerMessage(player);
  return `${player.name} andou para a chegada, concluiu a Citocinese e venceu o Ciclo Celular!`;
}

function regressMitosisStage(player) {
  if (player.mitosisStage === "anaphase") {
    player.mitosisStage = "metaphase";
    return `${player.name} recuou para Metafase.`;
  }
  if (player.mitosisStage === "metaphase") {
    player.mitosisStage = "prophase";
    return `${player.name} recuou para Profase.`;
  }
  return `${player.name} permaneceu na Profase.`;
}

async function applyMCheckpointAction(player) {
  if (player.dnaCards < 2) {
    return returnPlayerToG2(player, "perdeu DNA durante a Mitose.");
  }

  if (player.mitosisStage === "prophase" || player.mitosisStage === "anaphase") {
    if ((player.atp < 1 && player.ignoreNextAtpCost <= 0) || player.mitoticProteins < 1) {
      return returnPlayerToG2(player, "faltaram recursos para avançar na Mitose.");
    }
    payAtp(player, 1);
    player.mitoticProteins -= 1;
    return `${player.name} pagou 1 ATP e 1 proteina mitotica. ${advanceMitosisStage(player)}`;
  }

  if (player.mitosisStage === "metaphase") {
    const value = await rollResourceDie();
    if (value <= 2) {
      player.position = innerCheckpointIndex;
      return `${player.name} rolou ${value}: cromossomos desalinhados. Volta ao inicio da Metafase.`;
    }
    return `${player.name} rolou ${value}: cromossomos alinhados. ${advanceMitosisStage(player)}`;
  }

  return advanceMitosisStage(player);
}

function tradeProteinsForAtp(player, requiredAtp, reservedProteins = 0) {
  if (player.atp >= requiredAtp) return 0;
  const neededAtp = requiredAtp - player.atp;
  const availableProteins = Math.max(0, player.proteins - reservedProteins);
  const traded = Math.min(neededAtp, availableProteins);
  player.proteins -= traded;
  player.atp += traded;
  return traded;
}

function getEventCardsForPhase(phase) {
  return getPackEventCardsForPhase(phase);
  const commonCards = [
    {
      title: "Bônus energético",
      apply(player) {
        player.atp += 1;
        player.collectedAtpThisLap = true;
        return `${player.name} revelou Bônus energético e ganhou 1 ATP.`;
      },
    },
    {
      title: "Síntese acelerada",
      apply(player) {
        addAminoAcids(player, 5);
        return `${player.name} revelou Síntese acelerada e ganhou 5 AA.`;
      },
    },
    {
      title: "Gasto metabólico",
      apply(player) {
        if (player.atp > 0) {
          player.atp -= 1;
          return `${player.name} revelou Gasto metabólico e perdeu 1 ATP.`;
        }
        if (player.phase === "G1") {
          resetPlayerAfterApoptosis(player);
          return `${player.name} revelou Gasto metabólico, não tinha ATP e sofreu apoptose: perdeu todos os recursos e voltou ao Checkpoint/Inicio.`;
        }
        return `${player.name} revelou Gasto metabólico, mas não tinha ATP para perder.`;
      },
    },
    {
      title: "Estabilidade celular",
      apply(player) {
        return `${player.name} revelou Estabilidade celular. Nada aconteceu.`;
      },
    },
    {
      title: "Ribossomos ativos",
      apply(player) {
        addAminoAcids(player, 10);
        return `${player.name} revelou Ribossomos ativos e ganhou 10 AA.`;
      },
    },
  ];

  if (phase === "S") {
    return [
      ...commonCards,
      {
        title: "Replicação exigente",
        apply(player) {
          player.atp = Math.max(0, player.atp - 1);
          return `${player.name} revelou Replicação exigente e perdeu 1 ATP.`;
        },
      },
    ];
  }

  if (phase === "G2") {
    return [
      ...commonCards,
      {
        title: "Revisão concluída",
        apply(player) {
          player.proteins += 1;
          return `${player.name} revelou Revisão concluída e ganhou 1 proteína.`;
        },
      },
    ];
  }

  if (phase === "M") {
    return [
      {
        title: "Fuso organizado",
        apply(player) {
          return `${player.name} revelou Fuso organizado. ${advanceMitosisStage(player)}`;
        },
      },
      {
        title: "Cromossomos atrasados",
        apply(player) {
          return `${player.name} revelou Cromossomos atrasados. ${regressMitosisStage(player)}`;
        },
      },
      {
        title: "Pausa do checkpoint",
        apply(player) {
          player.skipTurns = Math.max(player.skipTurns, 1);
          return `${player.name} revelou Pausa do checkpoint e perdera a proxima jogada.`;
        },
      },
      {
        title: "Estabilidade mitotica",
        apply(player) {
          return `${player.name} revelou Estabilidade mitotica. Nada aconteceu.`;
        },
      },
      {
        title: "DNA danificado",
        apply(player) {
          player.dnaCards = Math.max(0, player.dnaCards - 1);
          if (player.dnaCards < 2) {
            return returnPlayerToG2(player, "perdeu uma carta DNA durante a Mitose.");
          }
          return `${player.name} revelou DNA danificado e perdeu 1 carta DNA.`;
        },
      },
    ];
  }

  return commonCards;
}

function getPackEventCardsForPhase(phase) {
  const packPhase = phase === "M" ? "Mitose" : phase;
  return packEventCardFiles
    .map(parsePackEventCard)
    .filter((card) => card.phase === packPhase)
    .map((card) => ({
      ...card,
      apply(player) {
        return applyPackEventCard(card, player);
      },
    }));
}

function getEventCardBackImage(phase) {
  return eventCardBackImages[phase] || eventCardBackImages.G1;
}

function shuffleCards(cards) {
  const shuffled = [...cards];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

function pickCardsByKind(cards, kind, amount) {
  return shuffleCards(cards.filter((card) => card.kind === kind)).slice(0, amount);
}

function getBalancedEventChoices(cards) {
  const choices = [
    ...pickCardsByKind(cards, "Bonus", 2),
    ...pickCardsByKind(cards, "Neutra", 1),
    ...pickCardsByKind(cards, "Onus", 2),
  ];

  if (choices.length < 5) {
    const selectedNames = new Set(choices.map((card) => card.fileName));
    const fallback = shuffleCards(cards.filter((card) => !selectedNames.has(card.fileName)));
    choices.push(...fallback.slice(0, 5 - choices.length));
  }

  return shuffleCards(choices);
}

function parsePackEventCard(fileName) {
  const baseName = fileName.replace(/\.png$/i, "");
  const [phase, kind, ...titleParts] = baseName.split(" - ");
  const title = titleParts.join(" - ");
  return {
    fileName,
    phase,
    kind,
    title,
    image: encodeURI(`assets/cartas/Cartas/${fileName}`),
  };
}

async function applyPackEventCard(card, player) {
  if (card.kind === "Onus" && player.ignoreNextNegative > 0) {
    player.ignoreNextNegative -= 1;
    return `${player.name} ignorou o efeito negativo de ${card.title}.`;
  }

  const title = normalizeText(card.title);
  if (title.includes("celula saudavel") || title.includes("fita estabilizada") || title.includes("sistema celular eficiente") || title.includes("divisao eficiente")) {
    player.extraTurn = true;
    return `${player.name} revelou ${card.title} e jogara novamente.`;
  }
  if (title.includes("membrana estavel")) {
    player.ignoreNextDamage += 1;
    return `${player.name} revelou ${card.title} e ignorara o proximo dano celular.`;
  }
  if (title.includes("mitocondrias") || title.includes("replicacao acelerada") || title.includes("reserva energetica")) {
    player.atp += 1;
    player.collectedAtpThisLap = true;
    return `${player.name} revelou ${card.title} e ganhou 1 ATP.`;
  }
  if (title.includes("nutrientes abundantes")) {
    const movementMessage = await movePlayerByCard(player, 2);
    return `${player.name} revelou ${card.title} e avancou 2 casas. ${movementMessage}`;
  }
  if (title.includes("ribossomos")) {
    addAminoAcids(player, 10);
    return `${player.name} revelou ${card.title} e ganhou 10 aminoacidos.`;
  }
  if (title.includes("sintese proteica") || title.includes("proteinas mitoticas estaveis")) {
    player.proteins += 1;
    return `${player.name} revelou ${card.title} e ganhou 1 proteina.`;
  }
  if (title.includes("centrossomos")) {
    player.mitoticProteins += 1;
    return `${player.name} revelou ${card.title} e ganhou 1 proteina mitotica.`;
  }
  if (title.includes("checkpoint aprovado") || title.includes("enzimas ativas") || title.includes("cromossomos alinhados")) {
    const movementMessage = await movePlayerByCard(player, 3);
    return `${player.name} revelou ${card.title} e avancou 3 casas. ${movementMessage}`;
  }
  if (title.includes("ciclinas ativadas") || title.includes("checkpoint mitotico aprovado")) {
    player.ignoreNextNegative += 1;
    return `${player.name} revelou ${card.title} e ignorara o proximo efeito negativo.`;
  }
  if (title.includes("mitose acelerada")) {
    const movementMessage = await movePlayerByCard(player, 4);
    return `${player.name} revelou ${card.title} e avancou 4 casas. ${movementMessage}`;
  }
  if (title.includes("separacao cromossomica")) {
    const movementMessage = await movePlayerToCheckpointByCard(player);
    return `${player.name} revelou ${card.title} e foi ao checkpoint. ${movementMessage}`;
  }
  if (title.includes("fuso mitotico estavel")) {
    player.wildResources += 1;
    return `${player.name} revelou ${card.title} e ganhou 1 recurso coringa para converter quando precisar.`;
  }
  if (title.includes("dna polimeresa")) {
    const result = await moveToNextSpecialByCard(player, "atp");
    return result.moved
      ? `${player.name} revelou ${card.title} e foi ate a proxima casa ATP. ${result.message}`
      : `${player.name} revelou ${card.title}, mas nao encontrou casa ATP.`;
  }
  if (title.includes("helicase")) {
    player.ignoreNextAtpCost += 1;
    return `${player.name} revelou ${card.title} e ignorara o proximo custo de ATP.`;
  }
  if (title.includes("reparo genetico")) {
    player.dnaProtection += 1;
    return `${player.name} revelou ${card.title} e protegeu 1 DNA.`;
  }

  if (card.kind === "Neutra") {
    return `${player.name} revelou ${card.title}. Nada aconteceu.`;
  }

  if (title.includes("dano em organela")) {
    player.proteins = Math.max(0, player.proteins - 1);
    return `${player.name} revelou ${card.title} e perdeu 1 proteina.`;
  }
  if (title.includes("escassez")) {
    player.phase = "G1";
    player.position = checkpointIndex;
    updatePawns();
    return `${player.name} revelou ${card.title} e voltou ao inicio da G1.`;
  }
  if (title.includes("extresse oxidativo") || title.includes("estresse oxidativo") || title.includes("erro na replicacao") || title.includes("estresse celular")) {
    player.atp = Math.max(0, player.atp - 1);
    return `${player.name} revelou ${card.title} e perdeu 1 ATP.`;
  }
  if (title.includes("falha metabolica") || title.includes("dano estrutural")) {
    const movementMessage = await movePlayerByCard(player, -2);
    return `${player.name} revelou ${card.title} e voltou 2 casas. ${movementMessage}`;
  }
  if (title.includes("proteina defeituosa")) {
    const aaLoss = loseAminoAcids(player, 10);
    return describeAminoAcidLoss(
      player,
      `${player.name} revelou ${card.title} e perdeu 10 aminoacidos.`,
      `${player.name} revelou ${card.title}, mas nao tinha aminoacidos para perder.`,
      aaLoss,
    );
  }
  if (title.includes("toxina celular") || title.includes("mutacao detectada") || title.includes("falha de preparacao") || title.includes("falha no fuso")) {
    player.skipTurns = Math.max(player.skipTurns, 1);
    return `${player.name} revelou ${card.title} e perdera a proxima jogada.`;
  }
  if (title.includes("dna danificado") && (player.phase === "G2" || player.phase === "M")) {
    if (player.atp >= 2) {
      player.atp -= 2;
      updateResourcePanel();
      drawPlayers();
      updatePawns();
      await showDnaCardModal(player, "repair");
      return `${player.name} revelou ${card.title} e pagou 2 ATPs para reparar o DNA.`;
    }
    const result = loseDna(player, 1);
    if (result.protected) return `${player.name} revelou ${card.title}, mas o DNA foi protegido.`;
    return returnPlayerToG2StartWithoutResources(player, "não tinha 2 ATPs para reparar o DNA danificado.");
  }
  if (title.includes("dna danificado") && card.phase === "S") {
    player.atp = Math.max(0, player.atp - 1);
    return `${player.name} revelou ${card.title} e gastou 1 ATP para reparar.`;
  }
  if (title.includes("dna danificado") || title.includes("nao-disjuncao")) {
    const result = loseDna(player, 1);
    if (result.protected) return `${player.name} revelou ${card.title}, mas o DNA foi protegido.`;
    if (player.phase === "M" && player.dnaCards < 2) return returnPlayerToG2(player, "perdeu uma carta DNA durante a Mitose.");
    return `${player.name} revelou ${card.title} e perdeu 1 DNA.`;
  }
  if (title.includes("instabilidade genetica") || title.includes("radiacao excessiva")) {
    const movementMessage = await movePlayerByCard(player, -3);
    return `${player.name} revelou ${card.title} e voltou 3 casas. ${movementMessage}`;
  }
  if (title.includes("quebra da fita")) {
    const movementMessage = await movePlayerToCheckpointByCard(player);
    return `${player.name} revelou ${card.title} e foi ao checkpoint da fase S. ${movementMessage}`;
  }
  if (title.includes("radiacao uv")) {
    const value = await rollResourceDie();
    if (value <= 2) {
      const result = loseDna(player, 1);
      return result.protected
        ? `${player.name} rolou ${value} em ${card.title}, mas o DNA foi protegido.`
        : `${player.name} rolou ${value} em ${card.title} e perdeu 1 DNA.`;
    }
    return `${player.name} rolou ${value} em ${card.title}. Nada aconteceu.`;
  }
  if (title.includes("erro detectado")) {
    restoreG2CheckpointSnapshot(player);
    player.position = innerCheckpointIndex;
    updatePawns();
    return `${player.name} revelou ${card.title}, voltou ao inicio do G2 e perdeu os recursos coletados desde o checkpoint.`;
  }
  if (title.includes("proteinas mitoticas insuficientes")) {
    player.mitoticProteins = Math.max(0, player.mitoticProteins - 1);
    return `${player.name} revelou ${card.title} e perdeu 1 proteina mitotica.`;
  }
  if (title.includes("cromossomos desalinhados")) {
    if (player.phase === "M" && player.mitosisStage === "prophase") {
      return `${player.name} revelou ${card.title}, mas ainda esta na Profase. Nada aconteceu.`;
    }
    player.mitosisStage = "metaphase";
    player.position = innerCheckpointIndex;
    updatePawns();
    return `${player.name} revelou ${card.title} e retornou ao inicio da Metafase.`;
  }
  if (title.includes("divisao instavel")) {
    const value = await rollResourceDie();
    if (value <= 2) {
      player.mitosisStage = "prophase";
      player.position = innerCheckpointIndex;
      updatePawns();
      return `${player.name} rolou ${value} em ${card.title} e voltou ao inicio da Mitose.`;
    }
    return `${player.name} rolou ${value} em ${card.title}. Nada aconteceu.`;
  }
  if (title.includes("erro irreversivel")) {
    return returnPlayerToG2(player, "revelou Erro Irreversivel.");
  }
  return `${player.name} revelou ${card.title}. Nada aconteceu.`;
}

function resolveEvent(player) {
  return new Promise((resolve) => {
    const phase = player.phase || "G1";
    const cards = getEventCardsForPhase(phase);
    const displayCards = getBalancedEventChoices(cards);

    clearEventAutoCloseTimer();
    if (eventResolver) {
      eventResolverStack.push(eventResolver);
    }
    eventResolver = resolve;
    eventTitle.textContent = `Cartas de evento - ${phase}`;
    eventInstruction.textContent = `${player.name}, escolha uma carta da fase ${phase}.`;
    eventReveal.hidden = true;
    eventReveal.textContent = "";
    pendingEventAction = null;
    eventContinue.disabled = true;
    eventCardGrid.innerHTML = "";

    displayCards.forEach((card, index) => {
      const button = document.createElement("button");
      button.className = "event-card";
      button.type = "button";
      button.setAttribute("aria-label", `Carta ${index + 1} da fase ${phase}`);
      button.innerHTML = `
        <span class="event-card-inner">
          <span class="event-card-face event-card-back">
            <img class="event-card-back-image" src="${getEventCardBackImage(phase)}" alt="Verso da carta da fase ${phase}">
          </span>
          <span class="event-card-face event-card-front">
            <img class="event-card-image" src="${card.image}" alt="${card.title}">
          </span>
        </span>
      `;
      button.addEventListener("click", () => revealEventCard(button, card, player));
      eventCardGrid.appendChild(button);
    });

    eventModal.hidden = false;
  });
}

function revealEventCard(selectedCard, card, player) {
  if (eventContinue.disabled === false) return;

  eventCardGrid.querySelectorAll(".event-card").forEach((button) => {
    button.classList.add("is-disabled");
    button.disabled = true;
  });

  selectedCard.disabled = false;
  selectedCard.classList.remove("is-disabled");
  selectedCard.classList.add("is-flipped");

  pendingEventAction = { card, player };
  const cardPhase = card.phase || player.phase || "G1";
  const message = `${player.name} revelou ${card.title}. Efeito: ${getEventCardDescription(cardPhase, card.title)} Feche a carta para aplicar.`;
  eventReveal.textContent = message;
  eventReveal.hidden = false;
  eventModal.hidden = false;
  eventContinue.disabled = false;
  clearEventAutoCloseTimer();
  eventAutoCloseTimer = window.setTimeout(() => {
    if (!eventResolver || eventContinue.disabled) return;
    eventContinue.click();
  }, 7000);
  setMessage(message, "Clique em Continuar para aplicar a carta.");
}

function resolveDamage(player) {
  if (player.ignoreNextDamage > 0) {
    player.ignoreNextDamage -= 1;
    return `${player.name} ignorou o dano celular com uma carta de protecao.`;
  }

  if (player.atp >= 1 && player.proteins >= 1) {
    player.atp -= 1;
    player.proteins -= 1;
    return `${player.name} caiu em dano celular e pagou 1 ATP e 1 proteína para o reparo da p53.`;
  }

  if (player.phase === "S") {
    resetPlayerAfterApoptosis(player);
    return `${player.name} caiu em dano celular na fase S sem recursos suficientes, sofreu apoptose e retornou para G1.`;
  }

  resetPlayerAfterApoptosis(player);
  return `${player.name} sofreu apoptose por falta de recursos e reiniciou no Checkpoint/Inicio.`;
}

function resetPlayerAfterApoptosis(player) {
  player.position = checkpointIndex;
  player.phase = "G1";
  player.atp = 0;
  player.aminoAcids = 0;
  player.proteins = 0;
  player.mitoticProteins = 0;
  player.wildResources = 0;
  player.dnaCards = 0;
  player.sCheckpointVisits = 0;
  player.mitosisStage = "prophase";
  player.skipTurns = 0;
  player.extraTurn = false;
  player.ignoreNextDamage = 0;
  player.ignoreNextAtpCost = 0;
  player.ignoreNextNegative = 0;
  player.dnaProtection = 0;
  player.g2CheckpointSnapshot = null;
  player.collectedAtpThisLap = false;
  player.finished = false;
  player.lost = false;
}

function eliminatePlayerByApoptosis(player) {
  player.position = -1;
  player.atp = 0;
  player.aminoAcids = 0;
  player.proteins = 0;
  player.mitoticProteins = 0;
  player.wildResources = 0;
  player.dnaCards = 0;
  player.sCheckpointVisits = 0;
  player.mitosisStage = "prophase";
  player.skipTurns = 0;
  player.extraTurn = false;
  player.ignoreNextDamage = 0;
  player.ignoreNextAtpCost = 0;
  player.ignoreNextNegative = 0;
  player.dnaProtection = 0;
  player.g2CheckpointSnapshot = null;
  player.collectedAtpThisLap = false;
  player.finished = false;
  player.lost = true;
}

async function movePlayerByAdmin(player, steps) {
  if (!player || steps < 1 || isRolling) return;
  if (player.position < 0) {
    player.position = getCheckpointIndex(player);
  }
  const previousPlayer = currentPlayer;
  currentPlayer = players.indexOf(player);
  isRolling = true;
  setMessage(`Admin moveu ${player.name} ${steps} casa${steps > 1 ? "s" : ""}.`);

  for (let step = 0; step < steps; step += 1) {
    player.position = getNextPosition(player, player.position);
    updatePawns();
    drawPlayers();
    updateResourcePanel();
    await wait(160);
    if (player.position === getCheckpointIndex(player)) {
      break;
    }
  }

  isRolling = false;
  currentPlayer = players[currentPlayer].position >= 0 ? currentPlayer : previousPlayer;
  await resolveLanding(player, steps);
}

function parseAdminCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase().replace(/\s+/g, "");
  if (!command.startsWith("/")) {
    return { ok: false, message: "Use comandos começando com /." };
  }

  const moveMatch = command.match(/^\/(azul|vermelho|verde|amarelo|roxo|laranja)(\d+)$/);
  if (moveMatch) {
    return {
      ok: true,
      type: "move",
      color: moveMatch[1],
      amount: Number(moveMatch[2]),
    };
  }

  const phaseSkipMatch = command.match(/^\/(azul|vermelho|verde|amarelo|roxo|laranja)\+$/);
  if (phaseSkipMatch) {
    return {
      ok: true,
      type: "skip-phase",
      color: phaseSkipMatch[1],
    };
  }

  const addAaMatch = command.match(/^\/addaa(\d+)$/);
  if (addAaMatch) {
    return { ok: true, type: "add-aa", amount: Number(addAaMatch[1]) };
  }

  const addAtpMatch = command.match(/^\/addatp(\d+)$/);
  if (addAtpMatch) {
    return { ok: true, type: "add-atp", amount: Number(addAtpMatch[1]) };
  }

  const removeAaMatch = command.match(/^\/removeaa(\d+)?$/);
  if (removeAaMatch) {
    return { ok: true, type: "remove-aa", amount: Number(removeAaMatch[1] || 1) };
  }

  const removeAtpMatch = command.match(/^\/removeatp(\d+)?$/);
  if (removeAtpMatch) {
    return { ok: true, type: "remove-atp", amount: Number(removeAtpMatch[1] || 1) };
  }

  return { ok: false, message: "Comando não reconhecido." };
}

function getPlayerByColor(color) {
  return players.find((player) => player.name.toLowerCase() === color);
}

function getCurrentActivePlayer() {
  const player = players[currentPlayer];
  if (player && player.position >= 0 && !player.lost && !player.finished) {
    return player;
  }
  return players.find((item) => item.position >= 0 && !item.lost && !item.finished);
}

function skipPlayerPhaseByAdmin(player) {
  if (!player) return "Peao nao encontrado.";

  if (player.position < 0) {
    player.position = checkpointIndex;
  }
  player.finished = false;
  player.lost = false;

  if (player.phase === "G1") {
    player.phase = "S";
    player.dnaCards = Math.max(player.dnaCards, 1);
    player.sCheckpointVisits = 0;
    player.position = checkpointIndex;
    return `Admin pulou ${player.name} da fase G1 para S.`;
  }

  if (player.phase === "S") {
    player.phase = "G2";
    player.dnaCards = Math.max(player.dnaCards, 2);
    player.sCheckpointVisits = 2;
    player.position = innerCheckpointIndex;
    return `Admin pulou ${player.name} da fase S para G2 e levou o peao ao tabuleiro interno.`;
  }

  if (player.phase === "G2") {
    player.phase = "M";
    player.mitosisStage = "prophase";
    player.position = innerCheckpointIndex;
    return `Admin pulou ${player.name} da fase G2 para Mitose.`;
  }

  return `${player.name} ja esta na Mitose.`;
}

function regressPlayerPhaseByAdmin(player) {
  if (!player) return "Peao nao encontrado.";

  if (player.position < 0) {
    player.position = getCheckpointIndex(player);
  }
  player.finished = false;
  player.lost = false;

  if (player.phase === "M") {
    player.phase = "G2";
    player.mitosisStage = "prophase";
    player.position = innerCheckpointIndex;
    return `Admin voltou ${player.name} da Mitose para G2.`;
  }

  if (player.phase === "G2") {
    player.phase = "S";
    player.sCheckpointVisits = Math.min(player.sCheckpointVisits, 1);
    player.position = checkpointIndex;
    return `Admin voltou ${player.name} da fase G2 para S.`;
  }

  if (player.phase === "S") {
    player.phase = "G1";
    player.sCheckpointVisits = 0;
    player.position = checkpointIndex;
    return `Admin voltou ${player.name} da fase S para G1.`;
  }

  player.position = checkpointIndex;
  return `${player.name} ja esta na fase G1.`;
}

function getAdminSelectedPlayer() {
  return players[adminSelectedPlayerIndex] || players[0];
}

function setAdminSelectedPlayer(index) {
  adminSelectedPlayerIndex = index;
  currentPlayer = index;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  renderAdminPanel();
}

function renderAdminPanel() {
  if (!adminColorGrid || !adminMoveGrid) return;
  const selected = getAdminSelectedPlayer();
  adminColorGrid.innerHTML = players
    .map(
      (player, index) => `
        <button class="admin-color-button ${index === adminSelectedPlayerIndex ? "is-selected" : ""}" type="button" data-admin-player="${index}" style="--player-color:${player.color}">
          <span class="admin-color-dot"></span>
          <strong>${player.name}</strong>
          <small>Fase ${player.phase}${player.phase === "M" ? `/${getMitosisStageLabel(player)}` : ""}</small>
        </button>
      `,
    )
    .join("");

  adminMoveGrid.innerHTML = [1, 2, 3, 4, 5, 6]
    .map((value) => `<button class="secondary-button admin-number-button" type="button" data-admin-move="${value}">${value}</button>`)
    .join("");

  adminCommandFeedback.textContent = selected
    ? `Controlando ${selected.name}: fase ${selected.phase}, ATP ${selected.atp}, Prot ${selected.proteins}, AA ${selected.aminoAcids}.`
    : "Selecione um peao para controlar.";
}

function applyAdminResource(type) {
  const player = getAdminSelectedPlayer();
  if (!player) return;

  if (type === "protein") {
    player.proteins += 1;
    setMessage(`Admin adicionou 1 proteina para ${player.name}.`);
    addRoundLog(player, "Admin adicionou 1 proteina.");
  } else if (type === "aa") {
    addAminoAcids(player, 1);
    setMessage(`Admin adicionou 1 AA para ${player.name}.`);
    addRoundLog(player, "Admin adicionou 1 AA.");
  } else if (type === "atp") {
    player.atp += 1;
    player.collectedAtpThisLap = true;
    setMessage(`Admin adicionou 1 ATP para ${player.name}.`);
    addRoundLog(player, "Admin adicionou 1 ATP.");
  }

  updateResourcePanel();
  drawPlayers();
  updatePawns();
  renderAdminPanel();
}

function applyAdminPhaseChange(direction) {
  const player = getAdminSelectedPlayer();
  const message = direction === "forward" ? skipPlayerPhaseByAdmin(player) : regressPlayerPhaseByAdmin(player);
  setMessage(message);
  addRoundLog(player, message);
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  renderAdminPanel();
}

async function executeAdminCommand() {
  const parsed = parseAdminCommand(adminCommandInput.value);
  if (!parsed.ok) {
    adminCommandFeedback.textContent = parsed.message;
    return;
  }

  if (parsed.type === "move") {
    const player = getPlayerByColor(parsed.color);
    adminCommandModal.hidden = true;
    adminCommandInput.value = "";
    await movePlayerByAdmin(player, parsed.amount);
    adminCommandFeedback.textContent = "Comando executado.";
    return;
  }

  if (parsed.type === "skip-phase") {
    const player = getPlayerByColor(parsed.color);
    const message = skipPlayerPhaseByAdmin(player);
    setMessage(message);
    addRoundLog(player, message);
    adminCommandInput.value = "";
    adminCommandModal.hidden = true;
    adminCommandFeedback.textContent = "Comando executado.";
    updateResourcePanel();
    drawPlayers();
    updatePawns();
    return;
  }

  const player = getCurrentActivePlayer();
  if (!player) {
    adminCommandFeedback.textContent = "Nenhum peão ativo para receber o comando.";
    return;
  }

  if (parsed.type === "add-aa") {
    addAminoAcids(player, parsed.amount);
    setMessage(`Admin adicionou ${parsed.amount} AA para ${player.name}.`);
    addRoundLog(player, `Admin adicionou ${parsed.amount} AA.`);
  } else if (parsed.type === "add-atp") {
    player.atp += parsed.amount;
    player.collectedAtpThisLap = true;
    setMessage(`Admin adicionou ${parsed.amount} ATP para ${player.name}.`);
    addRoundLog(player, `Admin adicionou ${parsed.amount} ATP.`);
  } else if (parsed.type === "remove-aa") {
    player.aminoAcids = Math.max(0, player.aminoAcids - parsed.amount);
    setMessage(`Admin removeu ${parsed.amount} AA de ${player.name}.`);
    addRoundLog(player, `Admin removeu ${parsed.amount} AA.`);
  } else if (parsed.type === "remove-atp") {
    player.atp = Math.max(0, player.atp - parsed.amount);
    setMessage(`Admin removeu ${parsed.amount} ATP de ${player.name}.`);
    addRoundLog(player, `Admin removeu ${parsed.amount} ATP.`);
  }

  adminCommandInput.value = "";
  adminCommandModal.hidden = true;
  adminCommandFeedback.textContent = "Comando executado.";
  updateResourcePanel();
  drawPlayers();
}

function openAdminLogin() {
  adminUser.value = "";
  adminPassword.value = "";
  adminFeedback.textContent = "Entre para liberar comandos de teste.";
  adminLoginModal.hidden = false;
  window.setTimeout(() => adminUser.focus(), 0);
}

function closeAdminLogin() {
  adminLoginModal.hidden = true;
}

function submitAdminLogin() {
  if (adminUser.value === "admin" && adminPassword.value === "admin321") {
    adminLoggedIn = true;
    document.body.classList.add("admin-mode");
    adminStatus.textContent = "Modo admin ativo. Pressione Enter para abrir o painel.";
    adminLoginButton.textContent = "Admin ativo";
    closeAdminLogin();
    setMessage("Login admin realizado.");
    openAdminCommand();
    return;
  }
  adminFeedback.textContent = "Usuário ou senha inválidos.";
}

function openAdminCommand() {
  if (!adminLoggedIn || adminLoginModal.hidden === false || rulesModal.hidden === false) return;
  if (adminSelectedPlayerIndex < 0 || adminSelectedPlayerIndex >= players.length) {
    adminSelectedPlayerIndex = 0;
  }
  renderAdminPanel();
  adminCommandModal.hidden = false;
}

function closeAdminCommand() {
  adminCommandModal.hidden = true;
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function clearDnaCardTimers() {
  if (dnaFlipTimer) {
    window.clearTimeout(dnaFlipTimer);
    dnaFlipTimer = null;
  }
  if (dnaCloseTimer) {
    window.clearTimeout(dnaCloseTimer);
    dnaCloseTimer = null;
  }
}

function closeDnaCardModal() {
  clearDnaCardTimers();
  dnaModal.hidden = true;
  dnaCardDisplay.classList.remove("is-flipped");
  if (dnaResolver) {
    const resolve = dnaResolver;
    dnaResolver = null;
    resolve();
  }
}

function showDnaCardModal(player, mode = "gain") {
  clearDnaCardTimers();
  if (dnaResolver) {
    const resolve = dnaResolver;
    dnaResolver = null;
    resolve();
  }

  dnaMessage.textContent =
    mode === "repair"
      ? `Jogador ${player.name} teve o DNA reparado.`
      : `Jogador ${player.name} ganhou uma Carta DNA.`;
  dnaCardDisplay.classList.remove("is-flipped");
  dnaModal.hidden = false;

  dnaFlipTimer = window.setTimeout(() => {
    dnaCardDisplay.classList.add("is-flipped");
    dnaFlipTimer = null;
  }, 2000);

  dnaCloseTimer = window.setTimeout(closeDnaCardModal, 5000);
  return new Promise((resolve) => {
    dnaResolver = resolve;
  });
}

function nextTurn(message) {
  currentPlayer = findNextActivePlayer(currentPlayer);
  const skipped = [];
  for (let attempts = 0; attempts < players.length; attempts += 1) {
    const player = players[currentPlayer];
    if (!player || player.skipTurns <= 0 || player.position < 0 || player.finished || player.lost) break;
    player.skipTurns -= 1;
    skipped.push(player.name);
    currentPlayer = findNextActivePlayer(currentPlayer);
  }
  const skipMessage = skipped.length > 0 ? `${message} ${skipped.join(", ")} perdeu a jogada.` : message;
  updateTurn(skipMessage);
}

function resetGame() {
  resetPlayersToInitialState();
  updateTurn("Escolha os peoes para iniciar a partida.");
  openPlayerSetupModal();
  return;

  players.forEach((player) => {
    player.position = -1;
    player.phase = "G1";
    player.atp = 0;
    player.aminoAcids = 0;
    player.proteins = 0;
    player.mitoticProteins = 0;
    player.wildResources = 0;
    player.dnaCards = 0;
    player.sCheckpointVisits = 0;
    player.mitosisStage = "prophase";
    player.skipTurns = 0;
    player.extraTurn = false;
    player.ignoreNextDamage = 0;
    player.ignoreNextAtpCost = 0;
    player.ignoreNextNegative = 0;
    player.dnaProtection = 0;
    player.g2CheckpointSnapshot = null;
    player.collectedAtpThisLap = false;
    player.finished = false;
    player.lost = false;
  });
  currentPlayer = 0;
  pendingAaPlayerIndex = null;
  renderDice(1);
  dice.classList.remove("aa-roll");
  isRolling = false;
  roundLog.length = 0;
  renderRoundHistory();
  updateTurn("Clique em um peão para colocá-lo no Checkpoint/Inicio.");
}

drawBoard();
drawDice();
drawPlayers();
updatePawns();
renderRoundHistory();
updateTurn("Clique em um peão para colocá-lo no Checkpoint/Inicio.");
openPlayerSetupModal();

enterButton.addEventListener("click", placeCurrentPawn);
dice.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);
rulesButton.addEventListener("click", openRulesModal);
fullscreenButton.addEventListener("click", toggleFullscreen);
boardPrintButton.addEventListener("click", downloadBoardImage);
setupPlayerGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-setup-player]");
  if (!button) return;
  const index = Number(button.dataset.setupPlayer);
  if (setupSelectedPlayers.has(index)) {
    setupSelectedPlayers.delete(index);
  } else {
    setupSelectedPlayers.add(index);
  }
  renderSetupModal();
});
startGameButton.addEventListener("click", startSelectedPlayers);
rulesClose.addEventListener("click", closeRulesModal);
rulesModal.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    closeRulesModal();
  }
});
adminLoginButton.addEventListener("click", openAdminLogin);
adminSubmit.addEventListener("click", submitAdminLogin);
adminCancel.addEventListener("click", closeAdminLogin);
adminLoginModal.addEventListener("click", (event) => {
  if (event.target === adminLoginModal) {
    closeAdminLogin();
  }
});
adminPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitAdminLogin();
  }
});
adminUser.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    adminPassword.focus();
  }
});
adminRun.addEventListener("click", () => {
  executeAdminCommand();
});
adminColorGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-player]");
  if (!button) return;
  setAdminSelectedPlayer(Number(button.dataset.adminPlayer));
});
adminMoveGrid.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-admin-move]");
  if (!button || isRolling) return;
  const player = getAdminSelectedPlayer();
  adminCommandModal.hidden = true;
  await movePlayerByAdmin(player, Number(button.dataset.adminMove));
});
adminAddProtein.addEventListener("click", () => applyAdminResource("protein"));
adminAddAa.addEventListener("click", () => applyAdminResource("aa"));
adminAddAtp.addEventListener("click", () => applyAdminResource("atp"));
adminAdvancePhase.addEventListener("click", () => applyAdminPhaseChange("forward"));
adminRegressPhase.addEventListener("click", () => applyAdminPhaseChange("backward"));
adminCommandClose.addEventListener("click", closeAdminCommand);
adminCommandModal.addEventListener("click", (event) => {
  if (event.target === adminCommandModal) {
    closeAdminCommand();
  }
});
adminCommandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    executeAdminCommand();
  }
});
dnaContinue.addEventListener("click", closeDnaCardModal);
eventContinue.addEventListener("click", async () => {
  if (!eventResolver || eventContinue.disabled) return;
  clearEventAutoCloseTimer();
  const pending = pendingEventAction;
  pendingEventAction = null;
  const previewMessage = eventReveal.textContent || "Evento concluído.";
  const resolve = eventResolver;
  eventResolver = eventResolverStack.pop() || null;
  eventContinue.disabled = true;
  eventModal.hidden = true;
  let message = previewMessage;
  if (pending) {
    setMessage(
      `${pending.player.name} aplicando ${pending.card.title}.`,
      "Acompanhe o efeito da carta no tabuleiro.",
    );
    message = await pending.card.apply(pending.player);
    updateResourcePanel();
    drawPlayers();
    updatePawns();
  }
  resolve(message);
});
checkpointAdvance.addEventListener("click", async () => {
  if (!checkpointResolver) return;
  const player = checkpointResolver.player;
  if (checkpointResolver.type === "S") {
    closeCheckpointModal(await applySCheckpointPayment(player));
    return;
  }

  if (checkpointResolver.type === "M") {
    closeCheckpointModal(await applyMCheckpointAction(player));
    return;
  }

  if (checkpointResolver.type === "G2") {
    if ((player.atp < 4 && player.ignoreNextAtpCost <= 0) || player.mitoticProteins < 2 || player.dnaCards < 2) return;
    payAtp(player, 4);
    player.phase = "M";
    player.mitosisStage = "prophase";
    player.position = innerCheckpointIndex;
    closeCheckpointModal(`${player.name} pagou 4 ATPs, levou 2 proteinas mitoticas para a Mitose e avancou para a Profase.`);
    return;
  }

  if ((player.atp < 2 && player.ignoreNextAtpCost <= 0) || player.proteins < 2) return;
  payAtp(player, 2);
  player.proteins -= 2;
  player.phase = "S";
  player.dnaCards = Math.max(player.dnaCards, 1);
  player.sCheckpointVisits = 0;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  await showDnaCardModal(player, "gain");
  closeCheckpointModal(`${player.name} pagou 2 ATPs e 2 proteinas, recebeu a primeira carta DNA e avancou para a fase S.`);
});
checkpointTrade.addEventListener("click", () => {
  if (!checkpointResolver) return;
  const player = checkpointResolver.player;
  if (player.proteins < 2) return;
  player.proteins -= 2;
  player.atp += 1;
  checkpointResolver.introMessage = `${checkpointResolver.introMessage} ${player.name} trocou 2 proteinas por 1 ATP.`;
  updateResourcePanel();
  drawPlayers();
  renderCheckpointModal();
});
function useWildcardResource(type) {
  if (!checkpointResolver) return;
  const player = checkpointResolver.player;
  if (player.wildResources <= 0) return;

  player.wildResources -= 1;
  if (type === "atp") {
    player.atp += 1;
    checkpointResolver.conversionMessage = `${checkpointResolver.conversionMessage || ""} ${player.name} converteu 1 coringa em 1 ATP.`;
  } else if (type === "protein") {
    player.proteins += 1;
    checkpointResolver.conversionMessage = `${checkpointResolver.conversionMessage || ""} ${player.name} converteu 1 coringa em 1 proteína.`;
  } else if (type === "mitotic") {
    player.mitoticProteins += 1;
    checkpointResolver.conversionMessage = `${checkpointResolver.conversionMessage || ""} ${player.name} converteu 1 coringa em 1 proteína mitótica.`;
  }

  updateResourcePanel();
  drawPlayers();
  renderCheckpointModal();
}
checkpointWildcardAtp.addEventListener("click", () => useWildcardResource("atp"));
checkpointWildcardProtein.addEventListener("click", () => useWildcardResource("protein"));
checkpointWildcardMitotic.addEventListener("click", () => useWildcardResource("mitotic"));
checkpointMitoticTrade.addEventListener("click", () => {
  if (!checkpointResolver) return;
  if (!(checkpointResolver.type === "G2" || checkpointResolver.type === "M")) return;
  const player = checkpointResolver.player;
  if (player.proteins < 2) return;
  player.proteins -= 2;
  player.mitoticProteins += 1;
  checkpointResolver.conversionMessage = `${checkpointResolver.conversionMessage || ""} ${player.name} trocou 2 proteinas por 1 proteina mitotica.`;
  updateResourcePanel();
  drawPlayers();
  renderCheckpointModal();
});
checkpointBuyDna.addEventListener("click", async () => {
  if (!checkpointResolver) return;
  const player = checkpointResolver.player;
  if (!(checkpointResolver.type === "G2" || checkpointResolver.type === "M")) return;
  if (player.dnaCards >= 2 || player.atp < 2) return;
  player.atp -= 2;
  player.dnaCards += 1;
  updateResourcePanel();
  drawPlayers();
  updatePawns();
  await showDnaCardModal(player, "repair");
  checkpointResolver.introMessage = `${checkpointResolver.introMessage} ${player.name} reparou 1 DNA por 2 ATPs.`;
  renderCheckpointModal();
});
checkpointContinue.addEventListener("click", () => {
  if (!checkpointResolver) return;
  const player = checkpointResolver.player;
  const hasEnoughResources = checkpointResolver.hasEnoughResources;
  if (checkpointResolver.type === "G2") {
    closeCheckpointModal(
      hasEnoughResources
        ? `${player.name} decidiu continuar em G2 para coletar mais recursos.`
        : `${player.name} nao tem recursos suficientes e continuara em G2.`,
    );
    return;
  }

  closeCheckpointModal(
    hasEnoughResources
      ? `${player.name} decidiu continuar em G1 para coletar mais recursos.`
      : `${player.name} não tem recursos suficientes e continuará em G1.`,
  );
});
document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
  if (event.key.toLowerCase() === "f" && !isTyping) {
    event.preventDefault();
    toggleFullscreen();
    return;
  }

  if (event.key === "Enter" && adminLoggedIn && !isTyping && adminCommandModal.hidden) {
    event.preventDefault();
    openAdminCommand();
  }
});

document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("is-fullscreen", Boolean(document.fullscreenElement));
  updateFullscreenButton();
});

function openRulesModal() {
  renderRulesModal();
  rulesModal.hidden = false;
}

function closeRulesModal() {
  rulesModal.hidden = true;
}

function setPrintPageStyle(cssText) {
  document.querySelector("#dynamicPrintPageStyle")?.remove();
  const style = document.createElement("style");
  style.id = "dynamicPrintPageStyle";
  style.textContent = cssText;
  document.head.appendChild(style);
}

function clearPrintMode(mode) {
  document.body.classList.remove(`print-${mode}`);
  document.querySelector("#dynamicPrintPageStyle")?.remove();
}

function startPrintMode(mode, pageStyle) {
  if (!adminLoggedIn) return;
  setPrintPageStyle(pageStyle);
  document.body.classList.add(`print-${mode}`);
  const cleanup = () => clearPrintMode(mode);
  window.addEventListener("afterprint", cleanup, { once: true });
  window.setTimeout(() => window.print(), 80);
}

function printRules() {
  startPrintMode("rules", "@page { margin: 1cm; }");
}

async function assetToDataUrl(src) {
  const response = await fetch(src);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  });
}

async function inlineBoardImages(clone) {
  const images = [...clone.querySelectorAll("img")];
  await Promise.all(
    images.map(async (image) => {
      const source = image.getAttribute("src");
      if (!source || source.startsWith("data:")) return;
      image.setAttribute("src", await assetToDataUrl(source));
    }),
  );
}

async function downloadBoardImage() {
  if (!adminLoggedIn) return;

  const clone = board.cloneNode(true);
  clone.classList.add("export-board");
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  clone.querySelectorAll(".pawn").forEach((pawn) => pawn.remove());
  await inlineBoardImages(clone);

  const cssResponse = await fetch("styles.css");
  const css = await cssResponse.text();
  const exportCss = `
    ${css}
    .export-board {
      width: 4800px !important;
      height: 4800px !important;
      max-width: none !important;
      max-height: none !important;
      aspect-ratio: 1 / 1 !important;
      margin: 0 !important;
      box-shadow: none !important;
    }
    .export-board .pawn {
      display: none !important;
    }
  `;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="50cm" height="50cm" viewBox="0 0 5000 5000">
  <rect width="5000" height="5000" fill="#ffffff"/>
  <foreignObject x="100" y="100" width="4800" height="4800">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>${exportCss}</style>
      ${clone.outerHTML}
    </div>
  </foreignObject>
</svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "missao-divisao-celular-tabuleiro-50x50cm.svg";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setMessage("Imagem do tabuleiro baixada.", "Arquivo SVG em 50x50 cm com margem de 1 cm.");
}

function renderRulesModal() {
  const panel = rulesModal.querySelector(".modal-panel");
  panel.innerHTML = `
    <div class="rules-header">
      <h2 id="rulesTitle">Regras do jogo</h2>
      <button class="print-icon-button rules-print-button admin-only" id="rulesPrintButton" type="button" aria-label="Imprimir ou salvar regras" title="Imprimir ou salvar regras">
        <span aria-hidden="true">⎙</span>
      </button>
    </div>

    <section class="rules-section">
      <h3>Objetivo principal</h3>
      <p>Complete o ciclo celular passando pelas fases <strong>G1</strong>, <strong>S</strong>, <strong>G2</strong> e <strong>Mitose</strong> até concluir a Citocinese, completando o <strong>Ciclo Celular</strong>.</p>
      <p>Vence quem administrar melhor <strong>ATP, aminoácidos, proteínas, DNA e proteínas mitóticas</strong> para concluir a divisão celular.</p>
    </section>

    <section class="rules-section">
      <h3>Casas</h3>
      <p><strong>AA:</strong> Ganha ou perde aminoácidos dependendo da fase.</p>
      <p><strong>ATP:</strong> Ganha 1 <strong>ATP</strong>.</p>
      <p><strong>Evento:</strong> Sorteia uma carta de Bônus/Ônus da fase correspondente.</p>
      <p><strong>Jogue novamente:</strong> Joga mais uma vez.</p>
      <p><strong>Perca uma rodada:</strong> Fica uma rodada sem jogar.</p>
      <p><strong>Avance 2 casas:</strong> Anda 2 casas para frente.</p>
      <p><strong>Volte 2 casas:</strong> Volta 2 casas para trás.</p>
      <p><strong>Avance 3 casas:</strong> Anda 3 casas para frente.</p>
      <p><strong>Volte 3 casas:</strong> Volta 3 casas para trás.</p>
      <p><strong>Dano celular:</strong> Pague 1 <strong>ATP</strong> e 1 <strong>proteína</strong> para reparar. Na falta de recursos sofre apoptose e recomeça o jogo.</p>
      <p><strong>Checkpoint:</strong> Final/Início do tabuleiro. Tem ações diferentes dependendo da fase.</p>
    </section>

    <section class="rules-section">
      <h3>Regras Gerais</h3>
      <p>As fases <strong>G1</strong> e <strong>S</strong> ocorrem no tabuleiro externo e as fases <strong>G2</strong> e <strong>Mitose</strong> no interno.</p>
      <p>O peão obrigatoriamente para no <strong>Checkpoint</strong>, independentemente do número sortido no dado.</p>
      <p>Sempre ao chegar no <strong>Checkpoint</strong>, o jogador pode trocar 2 <strong>proteínas</strong> comuns por 1 <strong>ATP</strong>.</p>
      <p>Em caso de perca de <strong>ATPs</strong> precipitadamente, caso tenha recursos o jogador poderá realizar a troca de 2 <strong>proteínas</strong> comuns por 1 <strong>ATP</strong>.</p>
      <p>Durante a fase <strong>G1</strong> e <strong>S</strong>, ao completar a volta no tabuleiro, recebe 1 <strong>proteína</strong>.</p>
      <p>Durante a fase <strong>G2</strong> e <strong>Mitose</strong>, ao completar a volta no tabuleiro, recebe 1 <strong>ATP</strong> e 1 <strong>proteína</strong>.</p>
      <p>A cada 20 <strong>aminoácidos (AA)</strong> forma uma <strong>proteína</strong>.</p>
      <p>Ao parar na casa <strong>Evento</strong> o jogador sorteia uma carta da fase atual.</p>
      <p>Durante as fases <strong>G1, G2 e Mitose</strong>, ao parar na casa <strong>AA</strong> o jogador rola o dado novamente e o número que cair será a quantidade de aminoácidos (<strong>AAs</strong>) que o jogador irá receber.</p>
      <p>Durante as fases <strong>G1</strong> e <strong>G2</strong>, ao passar por uma casa <strong>AA</strong>, o jogador recebe 2 aminoácidos (<strong>AAs</strong>).</p>
      <p>Durante a Fase <strong>S</strong>, ao parar ou passar por uma casa <strong>AA</strong> o jogador perde 1 aminoácido (<strong>AA</strong>).</p>
    </section>

    <section class="rules-section">
      <h3>G1 – Crescimento Celular</h3>
      <p>A fase G1 é a primeira etapa da interfase, onde a célula cresce, produz proteínas e acumula energia para se preparar para a <strong>duplicação do DNA</strong>.</p>
      <p>O objetivo dessa fase é juntar o máximo de ATP e proteína possível para passar para a próxima fase.</p>
      <p><strong>DICA:</strong> Acumule o máximo de recursos que conseguir antes de avançar de fase para não ficar sem quando for necessário.</p>
      <p><strong>Checkpoint G1 (Análise de recursos):</strong> Se o jogador já possuir os recursos necessários, ele deve decidir se continuará coletando recursos antes de avançar de fase, ou se já irá avançar. (Na falta de recursos obrigatoriamente deve continuar coletando).</p>
      <p><strong>Falta de recursos:</strong> Caso o jogador não tenha recursos suficientes ao cair na casa <strong>“Dano celular”</strong> ou sortear uma carta <strong>“ônus”</strong>, o jogador sofre <strong>apoptose</strong> e retorna para o início perdendo todos os recursos remanescentes.</p>
      <p>(Verifique as <strong>regras gerais</strong> para funcionalidade das demais regras).</p>
    </section>

    <section class="rules-section">
      <h3>S (Síntese) – Replicação do DNA</h3>
      <p>É a etapa do ciclo celular em que ocorre a duplicação do DNA, garantindo que a célula tenha uma cópia completa do material genético para cada “célula-filha” após a divisão.</p>
      <p>Essa fase ocorre a abertura da <strong>dupla hélice</strong>, separando-a em duas fitas, onde cada fita passa a atuar como fita molde, ao final formando duas moléculas de DNA idênticas.</p>
      <p><strong>Chegada na fase:</strong> Ao chegar nessa fase o jogador recebe uma Carta <strong>DNA</strong>.</p>
      <p><strong>Duração:</strong> A fase ocorre em duas fases do tabuleiro, onde a primeira volta é a abertura da <strong>dupla hélice</strong> e a segunda volta ocorre o fechamento das fitas moldes.</p>
      <p><strong>Checkpoint S:</strong> Na primeira volta o jogador precisa pagar 2 <strong>ATPs</strong> para abrir a <strong>dupla hélice</strong>.</p>
      <p><strong>Checkpoint S:</strong> Na segunda volta o jogador precisa pagar 1 <strong>ATP</strong> e 1 <strong>proteína</strong>.</p>
      <p><strong>Falta de recursos:</strong> A falta de recursos causa <strong>apoptose</strong> e o jogador retorna para <strong>G1</strong>, perdendo todos os recursos remanescentes e volta a coletar recursos para retornar a fase <strong>S</strong>.</p>
      <p><strong>Conclusão da fase:</strong> Ao concluir a replicação da fase S, o jogador recebe uma segunda carta <strong>DNA</strong> e avança para fase <strong>G2</strong> (tabuleiro interno).</p>
      <p>(Verifique as <strong>regras gerais</strong> para funcionalidade das demais regras).</p>
    </section>

    <section class="rules-section">
      <h3>G2 – Preparação para divisão celular</h3>
      <p>É a fase de preparação final e controle de qualidade antes da <strong>mitose</strong>, onde é realizada a produção de <strong>proteínas</strong>, a célula continua gerando <strong>ATP</strong> e realizada a transformação de proteínas comuns em <strong>proteínas mitóticas</strong>.</p>
      <p><strong>DICA:</strong> fase similar a fase <strong>G1</strong>, colete o máximo de recursos que puder antes de avançar de fase.</p>
      <p><strong>Carta DNA:</strong> É necessário possuir duas cartas de <strong>DNA</strong>. No caso ter o <strong>DNA danificado</strong> (onde perderia a carta), é necessário pagar 2 <strong>ATPs</strong> para reparar o <strong>DNA</strong>, caso não possua <strong>ATP</strong> suficiente é necessário voltar ao início da <strong>G2</strong> e coletar recursos novamente.</p>
      <p>Para avançar para a <strong>Mitose</strong> são necessários 4 <strong>ATPs</strong> e 2 <strong>proteínas mitóticas</strong>.</p>
      <p><strong>Checkpoint G2:</strong> O jogador troca 2 <strong>proteínas</strong> comuns por 1 <strong>proteína mitótica</strong>.</p>
      <p><strong>Checkpoint G2:</strong> Se o jogador já possuir os recursos necessários, ele deve decidir se continuará coletando recursos antes de avançar de fase, ou se já irá avançar. (Na falta de recursos obrigatoriamente deve continuar coletando).</p>
      <p><strong>Falta de recursos:</strong> Caso o jogador não tenha recursos suficientes ao sortear uma carta <strong>“ônus”</strong>, o jogador sofre <strong>apoptose</strong> e retorna para o início da <strong>G2</strong> perdendo todos os recursos remanescentes.</p>
      <p>(Verifique as <strong>regras gerais</strong> para funcionalidade das demais regras).</p>
    </section>

    <section class="rules-section">
      <h3>Mitose – Divisão Celular</h3>
      <p>É a fase em que a célula divide seu material genético duplicado e forma duas células-filhas geneticamente idênticas. A mitose ocorre em 4 etapas: <strong>prófase, metáfase, anáfase/telófase</strong> e na <strong>citocinese</strong> conclui o ciclo da divisão celular.</p>
      <p><strong>Carta DNA:</strong> É necessário possuir duas cartas de <strong>DNA</strong>. No caso de ter o <strong>DNA danificado</strong> (onde perderia a carta), é necessário pagar 2 <strong>ATPs</strong> para reparar o <strong>DNA</strong>, caso não possua <strong>ATP</strong> suficiente é necessário voltar ao início da <strong>G2</strong> e coletar recursos novamente.</p>
      <p><strong>Duração de cada etapa:</strong> uma volta no tabuleiro</p>
      <p><strong>Prófase:</strong> Última coleta de recursos.</p>
      <p>Ao passar por uma casa <strong>AA</strong> (aminoácido), o jogador recebe 2 <strong>aminoácidos</strong>.</p>
      <p>Ao chegar no checkpoint paga 1 <strong>ATP</strong> e 1 <strong>proteína mitótica</strong> para avançar (Se não houver recursos suficientes, retorna para o <strong>G2</strong>).</p>
      <p>Prófase concluída, avança para <strong>metáfase</strong> e agora ao passar pela casa <strong>AA</strong>, não ganhará mais recursos, apenas se parar diretamente na casa <strong>AA</strong>.</p>
      <p><strong>Metáfase:</strong> Alinhamento cromossômico.</p>
      <p>Ao chegar no <strong>checkpoint</strong> rola o dado, se cair 1 ou 2 = Cromossomos desalinhados, volta ao início da <strong>metáfase</strong>, se cair 3-6 = Cromossomos alinhados, passe para próxima fase.</p>
      <p><strong>Anáfase/Telófase:</strong></p>
      <p>Ao chegar no <strong>checkpoint</strong> paga 1 <strong>ATP</strong> e 1 <strong>proteína mitótica</strong> para avançar (Se não houver recursos suficientes, retorna para o <strong>G2</strong>).</p>
      <p>(Verifique as <strong>regras gerais</strong> para funcionalidade das demais regras).</p>
    </section>

    <div class="modal-actions">
      <button class="secondary-button" id="eventLibraryButton" type="button">Ver cartas de evento</button>
      <button class="ghost-button" id="rulesClose" type="button">Fechar</button>
    </div>
  `;

  panel.querySelector("#rulesClose").addEventListener("click", closeRulesModal);
  panel.querySelector("#eventLibraryButton").addEventListener("click", openEventLibraryModal);
  panel.querySelector("#rulesPrintButton").addEventListener("click", printRules);
}

function openEventLibraryModal() {
  let modal = document.querySelector("#eventLibraryModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "eventLibraryModal";
    modal.hidden = true;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-panel event-help-panel" role="dialog" aria-modal="true" aria-labelledby="eventLibraryTitle">
      <h2 id="eventLibraryTitle">Cartas de evento</h2>
      <div class="event-library">${renderEventLibrary()}</div>
      <div class="modal-actions">
        <button class="ghost-button" id="eventLibraryClose" type="button">Voltar para regras</button>
      </div>
    </div>
  `;
  modal.hidden = false;
  modal.querySelector("#eventLibraryClose").addEventListener("click", () => {
    modal.hidden = true;
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.hidden = true;
    }
  }, { once: true });
}

function renderEventLibrary() {
  return ["G1", "S", "G2", "M"]
    .map((phase) => {
      const cards = getEventCardsForPhase(phase);
      const uniqueTitles = [...new Set(cards.map((card) => card.title))];
      return `
        <section class="rules-section event-library-phase">
          <h3>Fase ${phase}</h3>
          <div class="event-library-grid">
            ${uniqueTitles
              .map(
                (title) => `
                  <article class="event-library-card">
                    <img src="${cards.find((card) => card.title === title)?.image}" alt="${title}">
                    <strong>${title}</strong>
                    <p>${getEventCardDescription(phase, title)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function getEventCardDescription(phase, title) {
  return getPackEventCardDescription(phase, title);
}

function getPackEventCardDescription(phase, title) {
  const normalizedTitle = normalizeText(title);
  if (normalizedTitle.includes("celula saudavel") || normalizedTitle.includes("fita estabilizada") || normalizedTitle.includes("sistema celular eficiente") || normalizedTitle.includes("divisao eficiente")) return "Jogue novamente.";
  if (normalizedTitle.includes("membrana estavel")) return "Ignore o proximo dano celular.";
  if (normalizedTitle.includes("mitocondrias") || normalizedTitle.includes("replicacao acelerada") || normalizedTitle.includes("reserva energetica")) return "Ganhe 1 ATP.";
  if (normalizedTitle.includes("nutrientes abundantes")) return "Avance 2 casas.";
  if (normalizedTitle.includes("ribossomos")) return "Ganhe 10 aminoacidos.";
  if (normalizedTitle.includes("sintese proteica") || normalizedTitle.includes("proteinas mitoticas estaveis")) return "Ganhe 1 proteina comum.";
  if (normalizedTitle.includes("centrossomos")) return "Ganhe 1 proteina mitotica.";
  if (normalizedTitle.includes("checkpoint aprovado") || normalizedTitle.includes("enzimas ativas") || normalizedTitle.includes("cromossomos alinhados")) return "Avance 3 casas.";
  if (normalizedTitle.includes("ciclinas ativadas") || normalizedTitle.includes("checkpoint mitotico aprovado")) return "Ignore o proximo efeito negativo.";
  if (normalizedTitle.includes("mitose acelerada")) return "Avance 4 casas.";
  if (normalizedTitle.includes("separacao cromossomica")) return "Va direto para o checkpoint.";
  if (normalizedTitle.includes("fuso mitotico estavel")) return "Ganhe 1 recurso coringa para converter em ATP, proteína ou proteína mitótica.";
  if (normalizedTitle.includes("dna polimeresa")) return "Va ate a proxima casa ATP.";
  if (normalizedTitle.includes("helicase")) return "Ignore o proximo custo de ATP.";
  if (normalizedTitle.includes("reparo genetico")) return "Proteja 1 DNA.";
  if (normalizedTitle.includes("dano em organela")) return "Perca 1 proteina.";
  if (normalizedTitle.includes("escassez")) return "Volte ao inicio da G1.";
  if (normalizedTitle.includes("extresse oxidativo") || normalizedTitle.includes("estresse oxidativo") || normalizedTitle.includes("erro na replicacao") || normalizedTitle.includes("estresse celular")) return "Perca 1 ATP.";
  if (normalizedTitle.includes("falha metabolica") || normalizedTitle.includes("dano estrutural")) return "Volte 2 casas.";
  if (normalizedTitle.includes("proteina defeituosa")) return "Perca 10 aminoacidos.";
  if (normalizedTitle.includes("toxina celular") || normalizedTitle.includes("mutacao detectada") || normalizedTitle.includes("falha de preparacao") || normalizedTitle.includes("falha no fuso")) return "Perca a proxima jogada.";
  if (normalizedTitle.includes("dna danificado") && (phase === "G2" || phase === "M")) return "Pague 2 ATPs para reparar o DNA; se não houver ATP suficiente, volte ao início da G2 sem recursos.";
  if (normalizedTitle.includes("dna danificado") && phase === "S") return "Gaste 1 ATP para reparar.";
  if (normalizedTitle.includes("dna danificado") || normalizedTitle.includes("nao-disjuncao")) return "Perca 1 DNA.";
  if (normalizedTitle.includes("instabilidade genetica") || normalizedTitle.includes("radiacao excessiva")) return "Volte 3 casas.";
  if (normalizedTitle.includes("quebra da fita")) return "Volte ao checkpoint da fase S.";
  if (normalizedTitle.includes("radiacao uv")) return "Role o dado: 1-2 perde 1 DNA; 3-6 nada acontece.";
  if (normalizedTitle.includes("erro detectado")) return "Volte ao inicio do G2 e perca recursos coletados desde o checkpoint.";
  if (normalizedTitle.includes("proteinas mitoticas insuficientes")) return "Perca 1 proteina mitotica.";
  if (normalizedTitle.includes("cromossomos desalinhados")) return "Retorne ao inicio da Metafase. Na Profase, nada acontece.";
  if (normalizedTitle.includes("divisao instavel")) return "Role o dado: 1-2 volta ao inicio da Mitose; 3-6 nada acontece.";
  if (normalizedTitle.includes("erro irreversivel")) return "Volte ao G2.";
  return "Nada acontece.";
}

function getOldEventCardDescription(phase, title) {
  const normalizedTitle = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalizedTitle.includes("bonus") || normalizedTitle.includes("bã´nus")) return "Ganha 1 ATP.";
  if (normalizedTitle.includes("sintese") || normalizedTitle.includes("sã­ntese")) return "Ganha 5 AA.";
  if (normalizedTitle.includes("gasto")) return "Perde 1 ATP; em G1 sem ATP, sofre apoptose e reinicia.";
  if (normalizedTitle.includes("estabilidade celular")) return "Nada acontece.";
  if (normalizedTitle.includes("ribossomos")) return "Ganha 10 AA.";
  if (normalizedTitle.includes("replica") || normalizedTitle.includes("replicaã")) return "Perde 1 ATP.";
  if (normalizedTitle.includes("revis")) return "Ganha 1 proteina.";
  if (normalizedTitle.includes("fuso")) return "Avanca uma etapa da Mitose.";
  if (normalizedTitle.includes("cromossomos")) return "Recua uma etapa da Mitose.";
  if (normalizedTitle.includes("pausa")) return "Perde a proxima jogada.";
  if (normalizedTitle.includes("estabilidade mitotica")) return "Nada acontece.";
  if (normalizedTitle.includes("dna")) return "Perde 1 DNA; se ficar com menos de 2, volta para G2.";
  return `Carta de evento da fase ${phase}.`;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
    return;
  }

  document.documentElement.requestFullscreen?.();
}

function updateFullscreenButton() {
  if (!fullscreenButton) return;
  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenButton.setAttribute("aria-label", isFullscreen ? "Sair da tela cheia" : "Ativar tela cheia");
  fullscreenButton.innerHTML = `
    <span aria-hidden="true">${isFullscreen ? "↙" : "⛶"}</span>
    ${isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
  `;
}
