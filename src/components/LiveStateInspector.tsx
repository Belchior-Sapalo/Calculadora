/**
 * @file LiveStateInspector.tsx
 * @description Inspetor visual que mostra ao iniciante os estados internos do React em tempo real.
 */

import React from 'react';
import { Operador, simboloVisualOperador } from '../utils/calculatorLogic';
import { Code2, Cpu, Eye, Info } from 'lucide-react';

interface LiveStateInspectorProps {
  valorAtual: string;
  valorAnterior: string | null;
  operador: Operador;
  aguardandoSegundoNumero: boolean;
  ultimoCalculo: string | null;
  houveErro: boolean;
}

export const LiveStateInspector: React.FC<LiveStateInspectorProps> = ({
  valorAtual,
  valorAnterior,
  operador,
  aguardandoSegundoNumero,
  ultimoCalculo,
  houveErro,
}) => {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Inspetor de Memória (React State)
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ao Vivo
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Veja as variáveis internas do código mudando enquanto você clica
            </p>
          </div>
        </div>
        <Eye className="w-4 h-4 text-slate-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Estado 1: valorAtual */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-indigo-300 font-medium">valorAtual (string)</span>
            <span className="text-[11px] text-slate-400">Visor Atual</span>
          </div>
          <div className="font-mono text-base font-bold text-slate-100 truncate">
            &quot;{valorAtual}&quot;
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-tight">
            O que está sendo digitado ou exibido no momento.
          </p>
        </div>

        {/* Estado 2: valorAnterior */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-indigo-300 font-medium">valorAnterior (string | null)</span>
            <span className="text-[11px] text-slate-400">Memória</span>
          </div>
          <div className="font-mono text-base font-bold text-slate-100 truncate">
            {valorAnterior !== null ? `"${valorAnterior}"` : <span className="text-slate-400">null</span>}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-tight">
            O primeiro número que aguarda o segundo para o cálculo.
          </p>
        </div>

        {/* Estado 3: operador */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-indigo-300 font-medium">operador (Operador)</span>
            <span className="text-[11px] text-slate-400">Operação</span>
          </div>
          <div className="font-mono text-base font-bold text-amber-400 truncate">
            {operador ? (
              <span>
                &apos;{operador}&apos; ({simboloVisualOperador(operador)})
              </span>
            ) : (
              <span className="text-slate-400">null (nenhum)</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-tight">
            Define se a ação será soma, subtração, multiplicação ou divisão.
          </p>
        </div>

        {/* Estado 4: aguardandoSegundoNumero */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-indigo-300 font-medium">aguardandoSegundoNumero</span>
            <span className="text-[11px] text-slate-400">Controle</span>
          </div>
          <div className="font-mono text-base font-bold truncate">
            <span className={aguardandoSegundoNumero ? 'text-amber-400' : 'text-slate-400'}>
              {aguardandoSegundoNumero ? 'true (aguarda)' : 'false'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-tight">
            Se for true, o próximo dígito limpa o visor para começar o segundo valor.
          </p>
        </div>
      </div>

      {/* Caixa didática de explicação rápida */}
      <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-3.5 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-200/90 leading-relaxed">
          <strong className="text-indigo-100 font-semibold">Como funciona a lógica de uma calculadora:</strong>
          <span className="block mt-0.5">
            Ao clicar em <code className="bg-indigo-900/50 px-1 py-0.5 rounded text-amber-300 font-mono">+</code>,
            guardamos o número atual em <code className="text-indigo-300 font-mono">valorAnterior</code>,
            salvamos o operador e ativamos <code className="text-indigo-300 font-mono">aguardandoSegundoNumero</code>.
            Ao teclar <code className="bg-indigo-900/50 px-1 py-0.5 rounded text-emerald-300 font-mono">=</code>,
            chamamos a função matemática passando os dois números!
          </span>
        </div>
      </div>
    </div>
  );
};
