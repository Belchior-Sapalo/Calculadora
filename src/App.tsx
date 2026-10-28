/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Operador,
  ItemHistorico,
} from './utils/calculatorLogic';
import { Calculator } from './components/Calculator';
import { LiveStateInspector } from './components/LiveStateInspector';
import { HistoryPanel } from './components/HistoryPanel';
import { CodeExplainer } from './components/CodeExplainer';
import { ReadmeViewer } from './components/ReadmeViewer';
import {
  Calculator as CalcIcon,
  Code2,
  FileCode,
  Github,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const CONTEUDO_README_RAW = `# 🧮 Calculadora Básica Didática (React + TypeScript)

Uma calculadora simples, moderna e intuitiva que executa as quatro operações fundamentais da matemática (Adição, Subtração, Multiplicação e Divisão). Desenvolvida especialmente com foco em código limpo, didático e bem estruturado para quem está iniciando no desenvolvimento web e na programação.

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Explicação dos Principais Componentes](#-explicação-dos-principais-componentes)
- [Como Rodar o Projeto Localmente](#-como-rodar-o-projeto-localmente)
- [Desafios para Praticar](#-desafios-para-praticar-próximos-passos)
- [Licença](#-licença)

---

## 🌟 Visão Geral

Este projeto foi construído para demonstrar como criar uma aplicação interativa do zero utilizando **React** e **TypeScript**, aplicando boas práticas como:

1. **Separação de Responsabilidades (Separation of Concerns):** A lógica matemática pura fica isolada em um arquivo próprio (\`calculatorLogic.ts\`), independente do visual da aplicação.
2. **Imutabilidade e Gerenciamento de Estado:** Utilização clara e explicada do hook \`useState\` para controlar a memória da calculadora.
3. **Acessibilidade e Usabilidade:** Suporte a cliques na tela e atalhos completos no teclado físico.
4. **Tratamento de Exceções:** Proteção contra erros clássicos como divisão por zero e inserção repetida de pontos decimais.

---

## ⚡ Funcionalidades Principais

- ➕ **Adição ($a + b$):** Soma números inteiros e decimais.
- ➖ **Subtração ($a - b$):** Realiza a diferença entre dois valores.
- ✖️ **Multiplicação ($a \\times b$):** Calcula o produto com alta precisão.
- ➗ **Divisão ($a \\div b$):** Quociente seguro com tratamento amigável caso o usuário tente dividir por zero.
- 🔢 **Operações Auxiliares:**
  - Porcentagem (\`%\`)
  - Inversão de sinal positivo/negativo (\`±\`)
  - Apagar último dígito (\`⌫ / Backspace\`)
  - Limpar tudo (\`AC / Escape\`)
- 📜 **Histórico de Cálculos:** Exibe as contas recentes com data/hora e permite clicar para reaproveitar qualquer resultado anterior.
- ⌨️ **Suporte a Teclado Físico:** Digite diretamente do teclado numérico do seu computador.
- 🔍 **Inspetor de Memória ao Vivo:** Mostra em tempo real as variáveis do React (\`valorAtual\`, \`valorAnterior\`, \`operador\`) mudando a cada clique.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/):** Biblioteca para construção da interface de usuário baseada em componentes.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para prevenir erros durante o desenvolvimento.
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização moderna através de classes utilitárias.
- **[Lucide React](https://lucide.dev/):** Pacote de ícones minimalistas e acessíveis.
- **[Vite](https://vitejs.dev/):** Ferramenta de build e servidor de desenvolvimento ultra-rápido.

---

## 📁 Estrutura do Projeto

\`\`\`text
├── index.html                   # Ponto de entrada HTML da aplicação
├── package.json                 # Dependências e scripts do Node.js
├── tsconfig.json                # Configurações do compilador TypeScript
├── vite.config.ts               # Configuração do Vite e Tailwind
├── README.md                    # Documentação oficial do projeto
└── src/
    ├── main.tsx                 # Inicialização do React no elemento raiz (#root)
    ├── App.tsx                  # Componente principal que orquestra os estados
    ├── index.css                # Estilos globais e fontes personalizadas
    ├── components/
    │   ├── Calculator.tsx       # Teclado numérico, display e atalhos de teclado
    │   ├── HistoryPanel.tsx     # Painel com as contas salvas recentemente
    │   ├── LiveStateInspector.tsx # Painel didático mostrando os estados em tempo real
    │   ├── CodeExplainer.tsx    # Guia interativo explicando os conceitos do código
    │   └── ReadmeViewer.tsx     # Visualizador interativo deste README na tela
    └── utils/
        └── calculatorLogic.ts   # Funções matemáticas puras (soma, subtração, etc.)
\`\`\`

---

## 🧩 Explicação dos Principais Componentes

### 1. As Funções Matemáticas Puras (\`src/utils/calculatorLogic.ts\`)

No arquivo \`calculatorLogic.ts\`, isolamos a matemática do design. Por que isso é importante?
Porque se amanhã você quiser transformar essa calculadora em um aplicativo de terminal ou de celular, você pode reutilizar exatamente o mesmo arquivo sem mexer em nada!

Exemplo da função de divisão:

\`\`\`typescript
export function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Divisão por zero não permitida!');
  }
  return a / b;
}
\`\`\`

### 2. A Memória da Calculadora (\`useState\` em \`src/App.tsx\`)

Para realizar uma conta de duas etapas como \`12 + 5 = 17\`, o programa armazena:
- \`valorAtual\`: O número que está sendo digitado ou exibido no visor no momento.
- \`valorAnterior\`: O primeiro número que você digitou antes de pressionar a tecla de operação.
- \`operador\`: Guarda qual símbolo você clicou (\`+\`, \`-\`, \`*\` ou \`/\`).
- \`aguardandoSegundoNumero\`: Booleano (\`true\`/\`false\`) que indica se o próximo número deve substituir a tela.

### 3. A Estrutura de Decisão (\`switch/case\`)

Quando o botão de igual (\`=\`) é acionado, a calculadora usa o comando \`switch\` para saber qual função chamar:

\`\`\`typescript
switch (operador) {
  case '+': return somar(primeiro, segundo);
  case '-': return subtrair(primeiro, segundo);
  case '*': return multiplicar(primeiro, segundo);
  case '/': return dividir(primeiro, segundo);
}
\`\`\`

---

## 🚀 Como Rodar o Projeto Localmente

1. **Clone o repositório:** \`git clone https://github.com/SEU_USUARIO/calculadora-simples-react.git\`
2. **Entre na pasta:** \`cd calculadora-simples-react\`
3. **Instale as dependências:** \`npm install\`
4. **Inicie o servidor de desenvolvimento:** \`npm run dev\`
5. **Abra no seu navegador:** \`http://localhost:5173\` ou \`http://localhost:3000\`

---

## 🎯 Desafios para Praticar

1. **Cálculo de Raiz Quadrada:** Adicione um botão de raiz quadrada usando \`Math.sqrt(num)\`.
2. **Cálculo de Potência:** Adicione a operação de elevar um número ao quadrado ($x^2$).
3. **Persistência Local (LocalStorage):** Salve o histórico no navegador.
4. **Alternar Temas:** Implemente modo claro e modo escuro.

---

## 📄 Licença

Este projeto está sob a licença **MIT** - você pode usar, modificar e compartilhar livremente para seus estudos e portfólio!`;

export default function App() {
  // Estados principais da Calculadora
  const [valorAtual, setValorAtual] = useState<string>('0');
  const [valorAnterior, setValorAnterior] = useState<string | null>(null);
  const [operador, setOperador] = useState<Operador>(null);
  const [aguardandoSegundoNumero, setAguardandoSegundoNumero] = useState<boolean>(false);
  const [expressaoDisplay, setExpressaoDisplay] = useState<string>('');
  const [houveErro, setHouveErro] = useState<boolean>(false);

  // Histórico de cálculos
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);

  // Aba ativa de visualização principal
  const [secaoAtiva, setSecaoAtiva] = useState<'calculadora' | 'explicacao' | 'readme'>('calculadora');

  const adicionarAoHistorico = (item: ItemHistorico) => {
    setHistorico((prev) => [item, ...prev.slice(0, 19)]); // guarda os 20 últimos
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  const selecionarItemHistorico = (resultado: string) => {
    setValorAtual(resultado.replace(/\./g, '').replace(',', '.'));
    setAguardandoSegundoNumero(false);
    setHouveErro(false);
    setSecaoAtiva('calculadora');
  };

  const resetarCalculadora = () => {
    setValorAtual('0');
    setValorAnterior(null);
    setOperador(null);
    setAguardandoSegundoNumero(false);
    setExpressaoDisplay('');
    setHouveErro(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* 
        Top Bar Contract:
        [Brand title, one line] — [4–5 nav links, single-line] — [1 primary action]
      */}
      <header className="flex items-center justify-between gap-8 px-6 lg:px-12 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setSecaoAtiva('calculadora');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30">
            <CalcIcon className="w-4 h-4" />
          </div>
          <span>Calculadora Didática</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setSecaoAtiva('calculadora')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              secaoAtiva === 'calculadora'
                ? 'text-indigo-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalcIcon className="w-4 h-4" />
            <span>Calculadora</span>
          </button>

          <button
            onClick={() => setSecaoAtiva('explicacao')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              secaoAtiva === 'explicacao'
                ? 'text-indigo-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Como Funciona o Código</span>
          </button>

          <button
            onClick={() => setSecaoAtiva('readme')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              secaoAtiva === 'readme'
                ? 'text-indigo-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>README do GitHub</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={resetarCalculadora}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20 whitespace-nowrap shrink-0"
            title="Reiniciar a calculadora"
          >
            Novo Cálculo
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Seletor Mobile de Abas */}
        <div className="sm:hidden flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setSecaoAtiva('calculadora')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
              secaoAtiva === 'calculadora'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400'
            }`}
          >
            <CalcIcon className="w-3.5 h-3.5" />
            <span>Calculadora</span>
          </button>
          <button
            onClick={() => setSecaoAtiva('explicacao')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
              secaoAtiva === 'explicacao'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Explicação</span>
          </button>
          <button
            onClick={() => setSecaoAtiva('readme')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
              secaoAtiva === 'readme'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>README</span>
          </button>
        </div>

        {/* Seção 1: Calculadora + Inspetor de Estados + Histórico */}
        {secaoAtiva === 'calculadora' && (
          <div className="space-y-8">
            {/* Banner de Boas-Vindas Didático */}
            <div className="bg-gradient-to-r from-slate-800/90 via-slate-800/70 to-slate-800/90 border border-slate-700/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Projeto Aberto para Iniciantes</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Calculadora das 4 Operações Básicas
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Realize somas, subtrações, multiplicações e divisões com precisão.
                  Enquanto você clica nos botões, observe o painel ao lado para ver
                  como a memória do código (<code className="text-indigo-300 font-mono">React useState</code>) reage instantaneamente!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setSecaoAtiva('explicacao')}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 transition-colors flex items-center gap-1.5 border border-slate-600"
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Ver Explicação do Código</span>
                </button>
                <button
                  onClick={() => setSecaoAtiva('readme')}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 transition-colors flex items-center gap-1.5 border border-slate-600"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>README do GitHub</span>
                </button>
              </div>
            </div>

            {/* Grid Principal: Calculadora à Esquerda e Painéis Didáticos à Direita */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Coluna da Calculadora (5 colunas em desktop) */}
              <div className="lg:col-span-5 flex justify-center">
                <Calculator
                  valorAtual={valorAtual}
                  setValorAtual={setValorAtual}
                  valorAnterior={valorAnterior}
                  setValorAnterior={setValorAnterior}
                  operador={operador}
                  setOperador={setOperador}
                  aguardandoSegundoNumero={aguardandoSegundoNumero}
                  setAguardandoSegundoNumero={setAguardandoSegundoNumero}
                  onNovoCalculoHistorico={adicionarAoHistorico}
                  expressaoDisplay={expressaoDisplay}
                  setExpressaoDisplay={setExpressaoDisplay}
                  houveErro={houveErro}
                  setHouveErro={setHouveErro}
                />
              </div>

              {/* Coluna de Apoio: Inspetor de Memória + Histórico (7 colunas em desktop) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Inspetor de Estado em Tempo Real */}
                <LiveStateInspector
                  valorAtual={valorAtual}
                  valorAnterior={valorAnterior}
                  operador={operador}
                  aguardandoSegundoNumero={aguardandoSegundoNumero}
                  ultimoCalculo={expressaoDisplay}
                  houveErro={houveErro}
                />

                {/* Histórico de Cálculos */}
                <HistoryPanel
                  historico={historico}
                  onLimparHistorico={limparHistorico}
                  onSelecionarItem={selecionarItemHistorico}
                />
              </div>
            </div>
          </div>
        )}

        {/* Seção 2: Explicação Didática dos Componentes */}
        {secaoAtiva === 'explicacao' && (
          <div className="space-y-6">
            <CodeExplainer />
          </div>
        )}

        {/* Seção 3: Visualizador do README para o GitHub */}
        {secaoAtiva === 'readme' && (
          <div className="space-y-6">
            <ReadmeViewer readmeContent={CONTEUDO_README_RAW} />
          </div>
        )}
      </main>

      {/* Rodapé Limpo e Didático */}
      <footer className="border-t border-slate-800 bg-slate-950/70 py-6 px-6 lg:px-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Calculadora Básica Didática · Desenvolvida para iniciantes em programação com React e TypeScript.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setSecaoAtiva('explicacao')}
              className="hover:text-indigo-400 transition-colors"
            >
              Guia dos Componentes
            </button>
            <span>·</span>
            <button
              onClick={() => setSecaoAtiva('readme')}
              className="hover:text-indigo-400 transition-colors"
            >
              README GitHub
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
