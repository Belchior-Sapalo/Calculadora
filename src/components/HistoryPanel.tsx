/**
 * @file HistoryPanel.tsx
 * @description Painel de histórico de cálculos recentes.
 */

import React from 'react';
import { ItemHistorico } from '../utils/calculatorLogic';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

interface HistoryPanelProps {
  historico: ItemHistorico[];
  onLimparHistorico: () => void;
  onSelecionarItem: (resultado: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  historico,
  onLimparHistorico,
  onSelecionarItem,
}) => {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/60 shrink-0">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-100">Histórico de Cálculos</h2>
          <span className="text-xs text-slate-400 font-mono">({historico.length})</span>
        </div>

        {historico.length > 0 && (
          <button
            onClick={onLimparHistorico}
            title="Limpar histórico"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[380px]">
        {historico.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center p-4 rounded-xl border border-dashed border-slate-700/60 bg-slate-900/30">
            <History className="w-8 h-8 text-slate-600 mb-2 stroke-[1.5]" />
            <p className="text-sm text-slate-300 font-medium">Nenhum cálculo ainda</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              Faça contas na calculadora e o histórico aparecerá aqui automaticamente.
            </p>
          </div>
        ) : (
          historico.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelecionarItem(item.resultado)}
              title="Clique para carregar o resultado no visor"
              className="w-full text-left p-3 rounded-xl bg-slate-900/60 hover:bg-slate-700/50 border border-slate-700/40 hover:border-indigo-500/40 transition-all group flex items-center justify-between"
            >
              <div className="min-w-0 pr-2">
                <div className="text-xs font-mono text-slate-400 truncate">
                  {item.expressao}
                </div>
                <div className="text-base font-mono font-bold text-slate-100 group-hover:text-indigo-300 transition-colors truncate">
                  = {item.resultado}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-indigo-400 transition-colors">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">Usar</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 shrink-0">
        💡 Dica: Clique em qualquer cálculo anterior para reaproveitar o resultado no visor.
      </div>
    </div>
  );
};
