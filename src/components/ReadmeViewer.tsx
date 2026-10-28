/**
 * @file ReadmeViewer.tsx
 * @description Visualizador interativo do README.md do projeto com opção de copiar para o GitHub.
 */

import React, { useState } from 'react';
import { FileText, Copy, Check, Download, ExternalLink } from 'lucide-react';

interface ReadmeViewerProps {
  readmeContent: string;
}

export const ReadmeViewer: React.FC<ReadmeViewerProps> = ({ readmeContent }) => {
  const [copiado, setCopiado] = useState(false);

  const copiarMarkdown = () => {
    navigator.clipboard.writeText(readmeContent);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const baixarArquivo = () => {
    const blob = new Blob([readmeContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Barra Superior */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/60 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <FileText className="w-4 h-4" />
            <span>Documentação Oficial para o GitHub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            README.md Pronto para o seu Repositório
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Este arquivo já está salvo na raiz do projeto (<code className="text-indigo-300 font-mono">/README.md</code>).
            Você pode copiar o texto em formato Markdown ou baixar o arquivo para colocar no seu perfil do GitHub!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={copiarMarkdown}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20"
          >
            {copiado ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={baixarArquivo}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-100 font-medium text-xs sm:text-sm rounded-xl transition-all border border-slate-600"
            title="Baixar arquivo README.md"
          >
            <Download className="w-4 h-4" />
            <span>Baixar .md</span>
          </button>
        </div>
      </div>

      {/* Caixa do Markdown Formatado */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 overflow-x-auto text-slate-300">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap selection:bg-indigo-600 selection:text-white">
          {readmeContent}
        </pre>
      </div>

      <div className="mt-5 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-3">
        <span>
          💡 <strong>Dica de GitHub:</strong> Ao criar um repositório no GitHub, cole este conteúdo no arquivo <code className="text-slate-200 font-mono">README.md</code> para que sua página de apresentação fique profissional.
        </span>
        <a
          href="https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap"
        >
          <span>Guia de Sintaxe Markdown</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
