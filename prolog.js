// prolog.js · ponte entre o Node e o SWI-Prolog (não precisa alterar)
const { spawnSync } = require("child_process");

const BASE = "meus_dados.pl";

/**
 * Faz uma consulta ao Prolog e devolve uma lista de objetos.
 * consultar("sabe(L, N)", ["L", "N"])
 *   -> [{ L: "python", N: "intermediario" }, { L: "sql", N: "avancado" }]
 */
function consultar(consulta, variaveis = []) {
  const molde = variaveis.length ? variaveis.map(() => "~w").join("\\t") + "~n" : "sim~n";
  const objetivo = `forall((${consulta}), format("${molde}", [${variaveis.join(", ")}]))`;
  const r = spawnSync(
    "swipl",
    ["-q", "-g", "set_stream(user_output, encoding(utf8))", "-g", objetivo, "-t", "halt", BASE],
    { encoding: "utf8" }
  );
  if (r.error) throw new Error("Não encontrei o comando swipl. O SWI-Prolog está instalado e no PATH?");
  if (r.status !== 0) throw new Error("Erro no Prolog:\n" + r.stderr.trim());
  if (r.stderr.trim()) console.warn("[aviso do Prolog]", r.stderr.trim());
  const linhas = r.stdout.split(/\r?\n/).filter((l) => l.trim());
  if (!variaveis.length) return linhas;
  return linhas.map((l) => Object.fromEntries(l.split("\t").map((v, i) => [variaveis[i], v])));
}

/** true se a consulta tem pelo menos uma solução */
const verdade = (consulta) => consultar(consulta).length > 0;

/** Valida o que o usuário digitou antes de colocar na consulta */
function atomo(texto) {
  const t = texto.trim().toLowerCase().replace(/ /g, "_");
  if (!/^[a-z][a-z0-9_]*$/.test(t)) throw new Error("Digite só letras minúsculas, números e _ (sem acento).");
  return t;
}

module.exports = { consultar, verdade, atomo };
