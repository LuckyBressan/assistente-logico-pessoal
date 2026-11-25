// teste_ponte.js · confere se o Node conversa com o Prolog
const { consultar, verdade } = require("./prolog");

console.log("Quem sou eu:", consultar("eu(N)", ["N"]));
console.log("O que sei:", consultar("sabe(L, N)", ["L", "N"]));
console.log("Livre sexta à noite?", verdade("livre(sexta, noite)"));
