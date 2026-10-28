/**
 * @file Calculator.tsx
 * @description Componente da Calculadora com display e teclado numérico interativo.
 */

import React, { useEffect, useCallback } from 'react';
import {
  Operador,
  calcular,
  simboloVisualOperador,
  formatarNumeroVisor,
  ItemHistorico,
} from '../utils/calculatorLogic';
import { Delete, RotateCcw, Equal, Plus, Minus, X, Divide, Percent } from 'lucide-react';

interface CalculatorProps {
  valorAtual: string;
  setValorAtual: React.Dispatch<React.SetStateAction<string>>;
  valorAnterior: string | null;
  setValorAnterior: React.Dispatch<React.SetStateAction<string | null>>;
  operador: Operador;
  setOperador: React.Dispatch<React.SetStateAction<Operador>>;
  aguardandoSegundoNumero: boolean;
  setAguardandoSegundoNumero: React.Dispatch<React.SetStateAction<boolean>>;
  onNovoCalculoHistorico: (item: ItemHistorico) => void;
  expressaoDisplay: string;
  setExpressaoDisplay: React.Dispatch<React.SetStateAction<string>>;
  houveErro: boolean;
  setHouveErro: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Calculator: React.FC<CalculatorProps> = ({
  valorAtual,
  setValorAtual,
  valorAnterior,
  setValorAnterior,
  operador,
  setOperador,
  aguardandoSegundoNumero,
  setAguardandoSegundoNumero,
  onNovoCalculoHistorico,
  expressaoDisplay,
  setExpressaoDisplay,
  houveErro,
  setHouveErro,
}) => {
  // Manipulador para inserção de dígitos (0 a 9)
  const inserirDigito = useCallback(
    (digito: string) => {
      if (houveErro) {
        setHouveErro(false);
        setValorAtual(digito);
        setExpressaoDisplay('');
        setValorAnterior(null);
        setOperador(null);
        setAguardandoSegundoNumero(false);
        return;
      }

      if (aguardandoSegundoNumero) {
        setValorAtual(digito);
        setAguardandoSegundoNumero(false);
      } else {
        // Se for o primeiro número e for '0', substitui; senão concatena
        if (valorAtual === '0') {
          setValorAtual(digito);
        } else {
          // Limita tamanho para evitar overflow no visor
          if (valorAtual.length < 14) {
            setValorAtual((prev) => prev + digito);
          }
        }
      }
    },
    [
      houveErro,
      aguardandoSegundoNumero,
      valorAtual,
      setHouveErro,
      setValorAtual,
      setExpressaoDisplay,
      setValorAnterior,
      setOperador,
      setAguardandoSegundoNumero,
    ]
  );

  // Manipulador para inserção do ponto/vírgula decimal
  const inserirDecimal = useCallback(() => {
    if (houveErro) {
      setHouveErro(false);
      setValorAtual('0.');
      setExpressaoDisplay('');
      setValorAnterior(null);
      setOperador(null);
      setAguardandoSegundoNumero(false);
      return;
    }

    if (aguardandoSegundoNumero) {
      setValorAtual('0.');
      setAguardandoSegundoNumero(false);
      return;
    }

    // Regra matemática: não pode ter dois pontos no mesmo número!
    if (!valorAtual.includes('.')) {
      setValorAtual((prev) => prev + '.');
    }
  }, [
    houveErro,
    aguardandoSegundoNumero,
    valorAtual,
    setHouveErro,
    setValorAtual,
    setExpressaoDisplay,
    setValorAnterior,
    setOperador,
    setAguardandoSegundoNumero,
  ]);

  // Manipulador para seleção de operador (+, -, *, /)
  const definirOperacao = useCallback(
    (proximoOperador: Operador) => {
      if (houveErro) return;

      const numeroAtual = parseFloat(valorAtual);

      // Se já temos um número anterior e um operador em andamento, calcula o resultado parcial
      if (valorAnterior !== null && operador !== null && !aguardandoSegundoNumero) {
        const primeiro = parseFloat(valorAnterior);
        const { sucesso, resultado, erro } = calcular(primeiro, numeroAtual, operador);

        if (!sucesso || resultado === undefined) {
          setHouveErro(true);
          setValorAtual(erro || 'Erro no cálculo');
          setValorAnterior(null);
          setOperador(null);
          return;
        }

        const resFormatado = resultado.toString();
        setValorAtual(resFormatado);
        setValorAnterior(resFormatado);
        setExpressaoDisplay(`${formatarNumeroVisor(resFormatado)} ${simboloVisualOperador(proximoOperador)}`);
      } else {
        // Primeiro operador pressionado
        setValorAnterior(valorAtual);
        setExpressaoDisplay(`${formatarNumeroVisor(valorAtual)} ${simboloVisualOperador(proximoOperador)}`);
      }

      setOperador(proximoOperador);
      setAguardandoSegundoNumero(true);
    },
    [
      houveErro,
      valorAtual,
      valorAnterior,
      operador,
      aguardandoSegundoNumero,
      setHouveErro,
      setValorAtual,
      setValorAnterior,
      setOperador,
      setExpressaoDisplay,
      setAguardandoSegundoNumero,
    ]
  );

  // Executa o cálculo final ao pressionar o botão Igual (=)
  const executarIgual = useCallback(() => {
    if (houveErro || valorAnterior === null || operador === null) return;

    const primeiro = parseFloat(valorAnterior);
    const segundo = parseFloat(valorAtual);

    const { sucesso, resultado, erro } = calcular(primeiro, segundo, operador);

    if (!sucesso || resultado === undefined) {
      setHouveErro(true);
      setValorAtual(erro || 'Erro');
      setExpressaoDisplay(`${formatarNumeroVisor(valorAnterior)} ${simboloVisualOperador(operador)} ${formatarNumeroVisor(valorAtual)} =`);
      setValorAnterior(null);
      setOperador(null);
      return;
    }

    const resultadoStr = resultado.toString();
    const expressaoCompleta = `${formatarNumeroVisor(valorAnterior)} ${simboloVisualOperador(operador)} ${formatarNumeroVisor(valorAtual)}`;

    // Registra no histórico
    onNovoCalculoHistorico({
      id: Date.now().toString(),
      expressao: expressaoCompleta,
      resultado: formatarNumeroVisor(resultadoStr),
      dataHora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });

    setExpressaoDisplay(`${expressaoCompleta} =`);
    setValorAtual(resultadoStr);
    setValorAnterior(null);
    setOperador(null);
    setAguardandoSegundoNumero(true);
  }, [
    houveErro,
    valorAnterior,
    operador,
    valorAtual,
    onNovoCalculoHistorico,
    setHouveErro,
    setValorAtual,
    setExpressaoDisplay,
    setValorAnterior,
    setOperador,
    setAguardandoSegundoNumero,
  ]);

  // Limpar tudo (Reset)
  const limparTudo = useCallback(() => {
    setValorAtual('0');
    setValorAnterior(null);
    setOperador(null);
    setAguardandoSegundoNumero(false);
    setExpressaoDisplay('');
    setHouveErro(false);
  }, [
    setValorAtual,
    setValorAnterior,
    setOperador,
    setAguardandoSegundoNumero,
    setExpressaoDisplay,
    setHouveErro,
  ]);

  // Apagar último dígito (Backspace)
  const apagarUltimoDigito = useCallback(() => {
    if (houveErro || aguardandoSegundoNumero) {
      limparTudo();
      return;
    }

    if (valorAtual.length <= 1) {
      setValorAtual('0');
    } else {
      setValorAtual((prev) => prev.slice(0, -1));
    }
  }, [houveErro, aguardandoSegundoNumero, valorAtual, limparTudo, setValorAtual]);

  // Inverter sinal (Positivo / Negativo)
  const inverterSinal = useCallback(() => {
    if (houveErro || valorAtual === '0') return;

    if (valorAtual.startsWith('-')) {
      setValorAtual(valorAtual.slice(1));
    } else {
      setValorAtual('-' + valorAtual);
    }
  }, [houveErro, valorAtual, setValorAtual]);

  // Calcular porcentagem
  const calcularPorcentagem = useCallback(() => {
    if (houveErro) return;

    const num = parseFloat(valorAtual);
    if (isNaN(num)) return;

    let resultado: number;
    if (valorAnterior !== null && (operador === '+' || operador === '-')) {
      // Ex: 100 + 10% calcula 10% de 100 (= 10)
      const base = parseFloat(valorAnterior);
      resultado = (base * num) / 100;
    } else {
      // Ex: 50% = 0.5
      resultado = num / 100;
    }

    setValorAtual(resultado.toString());
  }, [houveErro, valorAtual, valorAnterior, operador, setValorAtual]);

  // Suporte a teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Previne comportamento padrão de teclas de navegação ou submit
      if (['/', '*', '-', '+', 'Enter', 'Escape', 'Backspace'].includes(e.key)) {
        e.preventDefault();
      }

      if (/^[0-9]$/.test(e.key)) {
        inserirDigito(e.key);
      } else if (e.key === '.' || e.key === ',') {
        inserirDecimal();
      } else if (e.key === '+') {
        definirOperacao('+');
      } else if (e.key === '-') {
        definirOperacao('-');
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        definirOperacao('*');
      } else if (e.key === '/') {
        definirOperacao('/');
      } else if (e.key === 'Enter' || e.key === '=') {
        executarIgual();
      } else if (e.key === 'Backspace') {
        apagarUltimoDigito();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        limparTudo();
      } else if (e.key === '%') {
        calcularPorcentagem();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    inserirDigito,
    inserirDecimal,
    definirOperacao,
    executarIgual,
    apagarUltimoDigito,
    limparTudo,
    calcularPorcentagem,
  ]);

  // Ajusta o tamanho da fonte com base na quantidade de caracteres do display
  const tamanhoTextoDisplay = () => {
    if (valorAtual.length > 12) return 'text-2xl sm:text-3xl';
    if (valorAtual.length > 8) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-md max-w-sm sm:max-w-md w-full mx-auto">
      {/* Visor da Calculadora */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 shadow-inner flex flex-col justify-between min-h-[110px]">
        {/* Expressão anterior / prévia */}
        <div className="text-right text-xs sm:text-sm font-mono text-slate-400 min-h-[1.25rem] truncate">
          {expressaoDisplay || '\u00A0'}
        </div>

        {/* Número principal */}
        <div
          className={`text-right font-mono-numbers font-bold tracking-tight transition-all duration-150 truncate ${tamanhoTextoDisplay()} ${
            houveErro ? 'text-rose-400 text-xl sm:text-2xl' : 'text-slate-100'
          }`}
          title={valorAtual}
        >
          {formatarNumeroVisor(valorAtual)}
        </div>
      </div>

      {/* Grid de Botões */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {/* Linha 1: Limpar, Apagar, Porcentagem, Divisão */}
        <button
          onClick={limparTudo}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/60 hover:bg-rose-500/20 active:scale-95 text-rose-300 hover:text-rose-200 border border-slate-600/40 hover:border-rose-500/30 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-1"
          title="Limpar visor e cálculos (Tecla: Esc)"
        >
          <RotateCcw className="w-4 h-4" />
          <span>AC</span>
        </button>

        <button
          onClick={apagarUltimoDigito}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/60 hover:bg-slate-600/70 active:scale-95 text-slate-300 hover:text-slate-100 border border-slate-600/40 font-semibold text-sm sm:text-base transition-all flex items-center justify-center"
          title="Apagar último dígito (Tecla: Backspace)"
        >
          <Delete className="w-5 h-5" />
        </button>

        <button
          onClick={calcularPorcentagem}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/60 hover:bg-slate-600/70 active:scale-95 text-slate-300 hover:text-slate-100 border border-slate-600/40 font-semibold text-sm sm:text-base transition-all flex items-center justify-center"
          title="Porcentagem (Tecla: %)"
        >
          <Percent className="w-4 h-4" />
        </button>

        <button
          onClick={() => definirOperacao('/')}
          className={`h-14 sm:h-16 rounded-xl font-bold text-lg sm:text-xl transition-all flex items-center justify-center active:scale-95 border ${
            operador === '/' && aguardandoSegundoNumero
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30'
              : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border-indigo-500/30'
          }`}
          title="Divisão básica (Tecla: /)"
        >
          <Divide className="w-5 h-5" />
        </button>

        {/* Linha 2: 7, 8, 9, Multiplicação */}
        <button
          onClick={() => inserirDigito('7')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          7
        </button>
        <button
          onClick={() => inserirDigito('8')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          8
        </button>
        <button
          onClick={() => inserirDigito('9')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          9
        </button>
        <button
          onClick={() => definirOperacao('*')}
          className={`h-14 sm:h-16 rounded-xl font-bold text-lg sm:text-xl transition-all flex items-center justify-center active:scale-95 border ${
            operador === '*' && aguardandoSegundoNumero
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30'
              : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border-indigo-500/30'
          }`}
          title="Multiplicação básica (Tecla: *)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Linha 3: 4, 5, 6, Subtração */}
        <button
          onClick={() => inserirDigito('4')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          4
        </button>
        <button
          onClick={() => inserirDigito('5')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          5
        </button>
        <button
          onClick={() => inserirDigito('6')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          6
        </button>
        <button
          onClick={() => definirOperacao('-')}
          className={`h-14 sm:h-16 rounded-xl font-bold text-lg sm:text-xl transition-all flex items-center justify-center active:scale-95 border ${
            operador === '-' && aguardandoSegundoNumero
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30'
              : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border-indigo-500/30'
          }`}
          title="Subtração básica (Tecla: -)"
        >
          <Minus className="w-5 h-5" />
        </button>

        {/* Linha 4: 1, 2, 3, Adição */}
        <button
          onClick={() => inserirDigito('1')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          1
        </button>
        <button
          onClick={() => inserirDigito('2')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          2
        </button>
        <button
          onClick={() => inserirDigito('3')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          3
        </button>
        <button
          onClick={() => definirOperacao('+')}
          className={`h-14 sm:h-16 rounded-xl font-bold text-lg sm:text-xl transition-all flex items-center justify-center active:scale-95 border ${
            operador === '+' && aguardandoSegundoNumero
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30'
              : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border-indigo-500/30'
          }`}
          title="Adição / Soma básica (Tecla: +)"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Linha 5: Trocar Sinal, 0, Ponto Decimal, Igual */}
        <button
          onClick={inverterSinal}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-300 hover:text-slate-100 border border-slate-600/30 font-semibold text-base sm:text-lg transition-all"
          title="Trocar sinal positivo / negativo (±)"
        >
          ±
        </button>
        <button
          onClick={() => inserirDigito('0')}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
        >
          0
        </button>
        <button
          onClick={inserirDecimal}
          className="h-14 sm:h-16 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 active:scale-95 text-slate-100 border border-slate-600/30 font-semibold text-lg sm:text-xl transition-all"
          title="Ponto decimal (Tecla: , ou .)"
        >
          ,
        </button>
        <button
          onClick={executarIgual}
          className="h-14 sm:h-16 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-lg sm:text-xl shadow-lg shadow-indigo-600/30 border border-indigo-400/40 transition-all flex items-center justify-center"
          title="Calcular resultado (Tecla: Enter ou =)"
        >
          <Equal className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
        <span>⌨️ Suporte a teclado ativo</span>
        <span className="font-mono">Enter = Calcular · Esc = Limpar</span>
      </div>
    </div>
  );
};
