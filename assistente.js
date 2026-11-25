const readline = require("readline");
const { consultar, verdade, atomo } = require("./prolog");

// leitura do teclado, linha por linha
const rl = readline.createInterface({ input: process.stdin });
const linhas = rl[Symbol.asyncIterator]();
async function perguntar(texto) {
  process.stdout.write(texto);
  const r = await linhas.next();
  return r.done ? "0" : r.value;
}

function mostrar(titulo, itens) {
  console.log(`\n== ${titulo} ==`);
  if (itens.length === 0) console.log("  (nada encontrado)");
  itens.forEach((item) => console.log("  -", item));
}

async function minhasDisciplinas() {
  const r = consultar("cursa(D, Dia, Turno)", ["D", "Dia", "Turno"]);
  mostrar("Minhas disciplinas", r.map((x) => `${x.D} (${x.Dia}, ${x.Turno})`));
}

async function agendaDoDia() {
  const dia = atomo(await perguntar("Qual dia? (segunda, terca, quarta, quinta, sexta, sabado, domingo): "));
  const r = consultar(`o_que_faco(${dia}, T, A)`, ["T", "A"]);
  mostrar(`Agenda de ${dia}`, r.map((x) => `${x.T}: ${x.A}`));
}

async function horariosLivres() {
  const r = consultar("livre(D, T)", ["D", "T"]);
  mostrar("Horários livres", r.map((x) => `${x.D} de ${x.T}`));
}

async function estouLivre() {
  const dia = atomo(await perguntar("Dia: "));
  const turno = atomo(await perguntar("Turno (manha, tarde, noite): "));
  if (verdade(`livre(${dia}, ${turno})`)) console.log(`\nSim! ${dia} de ${turno} está livre.`);
  else console.log(`\nNão: ${dia} de ${turno} está ocupado (ou dia/turno inválido).`);
}

async function possoEnsinar() {
  const r = consultar("pode_ensinar(L)", ["L"]);
  mostrar("Linguagens que posso ensinar", r.map((x) => x.L.toUpperCase()));
}

async function meusGostos() {
  const categoria = atomo(await perguntar("Categoria (serie, comida, hobby, musica...): "));
  const r = consultar(`gosta(${categoria}, I)`, ["I"]);
  mostrar(`Gosto de (${categoria})`, r.map((x) => x.I.replace(/_/g, " ")));
}

async function diasCheios() {
  const r = consultar("dia_cheio(D)", ["D"]);
  mostrar("Dias cheios (2 turnos ou mais ocupados)", r.map((x) => x.D));
}

async function diaIgreja() {
  const r = consultar("dia_igreja(D, T)", ["D", "T"]);
  mostrar("Dias na Igreja", r.map((x) => `${x.D}: ${x.T}`));
}

// e no menu:
const OPCOES = {
  1: ["Minhas disciplinas", minhasDisciplinas],
  2: ["Agenda de um dia", agendaDoDia],
  3: ["Horários livres", horariosLivres],
  4: ["Estou livre em...?", estouLivre],
  5: ["Linguagens que posso ensinar", possoEnsinar],
  6: ["Meus gostos por categoria", meusGostos],
  7: ["Dias cheios", diasCheios],
  8: ["Dias na Igreja", diaIgreja],
};

async function menu() {
  const nome = consultar("eu(N)", ["N"])[0].N;
  for (;;) {
    console.log(`\n=== Assistente pessoal de ${nome} ===`);
    Object.entries(OPCOES).forEach(([k, [titulo]]) => console.log(`${k}. ${titulo}`));
    console.log("0. Sair");
    const op = (await perguntar("> ")).trim();
    if (op === "0") { console.log("Até mais!"); break; }
    if (!OPCOES[op]) { console.log("Opção inválida."); continue; }
    try { await OPCOES[op][1](); }
    catch (erro) { console.log("Ops:", erro.message); }
  }
  rl.close();
}

menu();