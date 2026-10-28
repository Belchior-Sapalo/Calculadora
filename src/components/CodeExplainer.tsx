/**
 * @file CodeExplainer.tsx
 * @description Guia didático completo explicando a arquitetura e os componentes para iniciantes na programação.
 */

import React, { useState } from 'react';
import {
  Code,
  Layers,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  Cpu,
} from 'lucide-react';

export const CodeExplainer: React.FC = () => {
  const [copiado, setCopiado] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<'operacoes' | 'estados' | 'eventos' | 'arquitetura'>('operacoes');

  const copiarCodigo = (codigo: string, id: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const codigoOperacoes = `// 1. As 4 Operações Básicas da Matemática (Simples e Puras)

export function somar(a: number, b: number): number {
  return a + b;
}

export function subtrair(a: number, b: number): number {
  return a - b;
}

export function multiplicar(a: number, b: number): number {
  return a * b;
}

export function dividir(a: number, b: number): number {
  // Regra fundamental: Não é possível dividir por zero!
  if (b === 0) {
    throw new Error('Divisão por zero não permitida!');
  }
  return a / b;
}`;

  const codigoEstados = `// 2. Os Estados (useState): A Memória da Calculadora

// O que está na tela no momento
const [valorAtual, setValorAtual] = useState<string>('0');

// O primeiro número digitado antes da operação
const [valorAnterior, setValorAnterior] = useState<string | null>(null);

// O operador selecionado: '+', '-', '*' ou '/'
const [operador, setOperador] = useState<Operador>(null);

// Avisa se o próximo clique deve substituir o visor (início do 2º número)
const [aguardandoSegundoNumero, setAguardandoSegundoNumero] = useState(false);`;

  const codigoCalcular = `// 3. A Função Central: O "Cérebro" que Decide a Conta

export function calcular(
  primeiroNumero: number,
  segundoNumero: number,
  operador: Operador
) {
  switch (operador) {
    case '+':
      return somar(primeiroNumero, segundoNumero);
    case '-':
      return subtrair(primeiroNumero, segundoNumero);
    case '*':
      return multiplicar(primeiroNumero, segundoNumero);
    case '/':
      return dividir(primeiroNumero, segundoNumero);
  }
}`;

  const codigoTeclado = `// 4. Capturando Teclas Físicas do Usuário (Keyboard Events)

useEffect(() => {
  const tratarTecla = (e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') inserirDigito(e.key);
    if (e.key === '+') definirOperacao('+');
    if (e.key === '-') definirOperacao('-');
    if (e.key === '*') definirOperacao('*');
    if (e.key === '/') definirOperacao('/');
    if (e.key === 'Enter' || e.key === '=') executarIgual();
    if (e.key === 'Backspace') apagarUltimoDigito();
    if (e.key === 'Escape') limparTudo();
  };

  window.addEventListener('keydown', tratarTecla);
  return () => window.removeEventListener('keydown', tratarTecla);
}, []);`;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Guia Didático para Iniciantes</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Como este código foi construído e organizado
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Aprenda os conceitos de funções puras, separação de responsabilidades,
            gerenciamento de estado com React Hooks e boas práticas de programação.
          </p>
        </div>

        {/* Abas de Navegação Didática */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-700/60 shrink-0">
          <button
            onClick={() => setAbaAtiva('operacoes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              abaAtiva === 'operacoes'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. As 4 Operações
          </button>
          <button
            onClick={() => setAbaAtiva('estados')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              abaAtiva === 'estados'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Memória (useState)
          </button>
          <button
            onClick={() => setAbaAtiva('eventos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              abaAtiva === 'eventos'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Teclado & Cliques
          </button>
          <button
            onClick={() => setAbaAtiva('arquitetura')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              abaAtiva === 'arquitetura'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Arquitetura Limpa
          </button>
        </div>
      </div>

      {/* Conteúdo da Aba 1: As 4 Operações */}
      {abaAtiva === 'operacoes' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Funções Puras da Matemática
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Em programação, uma <strong>função pura</strong> é aquela que recebe valores de entrada
                e sempre devolve o mesmo resultado sem mexer em nada fora dela.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-indigo-400 font-bold">•</span>
                  <span><strong>Soma (+):</strong> Recebe dois números e usa o operador nativo <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">a + b</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-indigo-400 font-bold">•</span>
                  <span><strong>Subtração (-):</strong> Diminui o segundo número do primeiro com <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">a - b</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-indigo-400 font-bold">•</span>
                  <span><strong>Multiplicação (×):</strong> Multiplica os operandos com <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">a * b</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-indigo-400 font-bold">•</span>
                  <span><strong>Divisão (÷):</strong> Divide <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">a / b</code>, mas antes verifica se <code className="text-rose-400 font-mono">b === 0</code> para evitar erros matemáticos!</span>
                </li>
              </ul>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-100">Por que tratar a divisão por zero?</strong>
                  <p className="mt-0.5">
                    Dividir qualquer número por zero é indefinido na matemática. Se não tratarmos isso no código, o computador retornaria <code className="font-mono font-bold">Infinity</code> ou travaria a aplicação.
                  </p>
                </div>
              </div>
            </div>

            {/* Bloco de Código com Botão Copiar */}
            <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-500">
                <span>src/utils/calculatorLogic.ts</span>
                <button
                  onClick={() => copiarCodigo(codigoOperacoes, 'operacoes')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  title="Copiar código"
                >
                  {copiado === 'operacoes' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-slate-300 leading-relaxed font-mono">
                {codigoOperacoes}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 2: Estados (useState) */}
      {abaAtiva === 'estados' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Como a Memória da Calculadora Funciona
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Toda calculadora precisa se &quot;lembrar&quot; de 3 coisas fundamentais quando você faz uma conta:
              </p>
              <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside">
                <li className="leading-relaxed">
                  <strong>O primeiro número:</strong> Quando você digita <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">50</code> e clica em <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">+</code>, esse valor vai para <code className="font-mono text-indigo-300">valorAnterior</code>.
                </li>
                <li className="leading-relaxed">
                  <strong>O operador escolhido:</strong> A calculadora salva que você escolheu somar (<code className="font-mono text-amber-300">&apos;+&apos;</code>).
                </li>
                <li className="leading-relaxed">
                  <strong>O segundo número:</strong> Você digita <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">10</code> no visor (<code className="font-mono text-indigo-300">valorAtual</code>).
                </li>
                <li className="leading-relaxed">
                  <strong>O cálculo final:</strong> Ao clicar em <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">=</code>, a função junta os dois valores com a operação guardada e exibe <code className="font-mono text-emerald-300">60</code>!
                </li>
              </ol>

              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200/90 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-100">Por que salvar números como string primeiro?</strong>
                  <p className="mt-0.5">
                    Se salvássemos como número puro, ao digitar &quot;5&quot; e depois &quot;2&quot;, seria difícil concatenar ou tratar a vírgula/ponto (&quot;5.&quot;). Como string, basta concatenar (&quot;5&quot; + &quot;2&quot; = &quot;52&quot;) e converter com <code className="font-mono">parseFloat()</code> na hora de calcular.
                  </p>
                </div>
              </div>
            </div>

            {/* Bloco de Código de Estados */}
            <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-500">
                <span>src/App.tsx (Gerenciamento de Estado)</span>
                <button
                  onClick={() => copiarCodigo(codigoEstados, 'estados')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {copiado === 'estados' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-slate-300 leading-relaxed font-mono">
                {codigoEstados}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 3: Teclado & Eventos */}
      {abaAtiva === 'eventos' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                Como os Cliques e Teclas Chegam ao Código
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Para tornar a calculadora acessível e agradável, nós conectamos tanto o clique do mouse na tela quanto as teclas do seu teclado físico:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">1.</span>
                  <span><strong>Eventos de Clique (`onClick`):</strong> Cada botão visual tem uma função atrelada que executa imediatamente ao ser pressionado.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">2.</span>
                  <span><strong>Listener Global (`window.addEventListener(&apos;keydown&apos;)`):</strong> O React escuta quando você aperta os números no numpad ou o Enter do teclado.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">3.</span>
                  <span><strong>Limpeza (`cleanup function`):</strong> Quando o componente é desmontado, o ouvinte é removido para não consumir memória desnecessária do navegador.</span>
                </li>
              </ul>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs text-slate-300">
                <strong className="text-slate-100">Dica de Produtividade:</strong>
                <p className="mt-1 text-slate-400">
                  Experimente usar o teclado numérico do seu computador nesta calculadora agora mesmo! As teclas <code className="text-indigo-300">+</code>, <code className="text-indigo-300">-</code>, <code className="text-indigo-300">*</code>, <code className="text-indigo-300">/</code>, <code className="text-indigo-300">Enter</code> e <code className="text-indigo-300">Esc</code> funcionam perfeitamente.
                </p>
              </div>
            </div>

            {/* Bloco de Código de Teclado */}
            <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-500">
                <span>src/components/Calculator.tsx (Listener de Teclado)</span>
                <button
                  onClick={() => copiarCodigo(codigoTeclado, 'teclado')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {copiado === 'teclado' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-slate-300 leading-relaxed font-mono">
                {codigoTeclado}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 4: Arquitetura Limpa */}
      {abaAtiva === 'arquitetura' && (
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Por que Separamos o Código em Vários Arquivos?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Quando estamos começando a programar, é comum querer colocar todo o código em um arquivo só.
              Porém, desenvolvedores profissionais usam o princípio de <strong>Separação de Responsabilidades (SoC - Separation of Concerns)</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                  1. Regras de Negócio
                </span>
                <h4 className="font-semibold text-slate-200 text-sm mb-1.5">
                  calculatorLogic.ts
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Contém apenas matemática pura. Não depende de React nem de botões visuais. Se você quiser usar a mesma lógica em um aplicativo de celular ou no terminal, basta importar este arquivo!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                  2. Componente Visual
                </span>
                <h4 className="font-semibold text-slate-200 text-sm mb-1.5">
                  Calculator.tsx
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focado no design, nos botões, nas animações e na experiência do usuário. Ele recebe os eventos e chama as funções matemáticas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                  3. Orquestrador
                </span>
                <h4 className="font-semibold text-slate-200 text-sm mb-1.5">
                  App.tsx
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O maestro da aplicação. Ele conecta a calculadora, o histórico, o inspetor de memória e o guia didático em uma página harmoniosa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
