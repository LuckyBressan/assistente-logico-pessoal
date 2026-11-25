# Assistente Lógico Pessoal

> Atividade da disciplina Linguagem de Programação e Paradigmas · UNIDAVI · 2026/2

**Aluno(a):** Lucas Adriano dos Santos Bressan
**Linguagem do sistema:** Node.js

## O que é

Uma base de conhecimento em Prolog (`meus_dados.pl`) com fatos e regras sobre mim e um assistente em linha de comando que consulta essa base pela ponte (`prolog.py` ou `prolog.js`).

## Como executar

Requisitos: SWI-Prolog no PATH e Python 3 **ou** Node.js.

```bash
# testar a ponte
node teste_ponte.js

# executar o assistente
node assistente.js
```

## Minha base

- Fatos: `eu/1`, `cursa/3`, `compromisso/3`, `sabe/2`, `gosta/2`
- Regras: `ocupado/2`, `livre/2`, `o_que_faco/3`, `pode_ensinar/1`, `dia_cheio/1` e a minha regra abaixo

## Minha regra (R6)

```prolog
% R6 · MINHA REGRA: qual dia e turno eu estou na igreja
% verifica em qual dias e turno eu estou na igreja
dia_igreja(Dia, Turno) :- dia(Dia), turno(Turno), compromisso(Dia, Turno, igreja).
```

**O que ela significa:**

O `dia(Dia)` armazena na variável `Dia` ou verifica se o `Dia` informado na chamada da regra existe no armazenamento. O `turno(Turno)` 2 armazena na variável `Turno` ou verifica se o `Turno` informado na chamada da regra existe no armazenamento. O `compromisso(Dia, Turno, igreja)` recebe as variáveis retornadas dos subobjetivos anteriores e verifica quais dos dias e turnos eu estou na igreja

## Saída real do assistente

```text
-- SAÍDA 1

=== Assistente pessoal de bressan ===
1. Minhas disciplinas
2. Agenda de um dia
3. Horários livres
4. Estou livre em...?
5. Linguagens que posso ensinar
6. Meus gostos por categoria
7. Dias cheios
8. Dias na Igreja
0. Sair
> 1

== Minhas disciplinas ==
  - iot (segunda, noite)
  - estrutura_dados (terca, noite)
  - lpp (quarta, noite)
  - gerenciamento_projetos (quinta, noite)
  - administracao_sistemas_informacao (sexta, noite)


-- SAÍDA 2

=== Assistente pessoal de bressan ===
1. Minhas disciplinas
2. Agenda de um dia
3. Horários livres
4. Estou livre em...?
5. Linguagens que posso ensinar
6. Meus gostos por categoria
7. Dias cheios
8. Dias na Igreja
0. Sair
> 3

== Horários livres ==
  - sabado de tarde
  - domingo de tarde
  - domingo de noite


-- SAÍDA 3

=== Assistente pessoal de bressan ===
1. Minhas disciplinas
2. Agenda de um dia
3. Horários livres
4. Estou livre em...?
5. Linguagens que posso ensinar
6. Meus gostos por categoria
7. Dias cheios
8. Dias na Igreja
0. Sair
> 8

== Dias na Igreja ==
  - sabado: noite
  - domingo: manha
```
