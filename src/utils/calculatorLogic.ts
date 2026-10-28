/**
 * @file calculatorLogic.ts
 * @description Módulo com as 4 operações básicas da matemática e funções auxiliares.
 * Este arquivo foi planejado para ser limpo, modular e fácil de entender para iniciantes em programação.
 */

// Tipo que define os 4 operadores matemáticos suportados
export type Operador = '+' | '-' | '*' | '/' | null;

export interface ItemHistorico {
  id: string;
  expressao: string;
  resultado: string;
  dataHora: string;
}

/**
 * 1. Operação de Soma (Adição)
 * @param a Primeiro operando
 * @param b Segundo operando
 * @returns A soma de a e b
 */
export function somar(a: number, b: number): number {
  return a + b;
}

/**
 * 2. Operação de Subtração
 * @param a Primeiro operando (minuendo)
 * @param b Segundo operando (subtraendo)
 * @returns A diferença entre a e b
 */
export function subtrair(a: number, b: number): number {
  return a - b;
}

/**
 * 3. Operação de Multiplicação
 * @param a Primeiro operando
 * @param b Segundo operando
 * @returns O produto da multiplicação
 */
export function multiplicar(a: number, b: number): number {
  return a * b;
}

/**
 * 4. Operação de Divisão
 * @param a Dividendo (número a ser dividido)
 * @param b Divisor (número pelo qual dividimos)
 * @throws Error se o divisor for zero, pois divisão por zero é matematicamente indefinida.
 * @returns O quociente da divisão
 */
export function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Divisão por zero não permitida!');
  }
  return a / b;
}

/**
 * Função centralizadora que recebe os números e o operador e decide qual cálculo rodar.
 * Utiliza o comando `switch`, que é uma das estruturas de controle fundamentais na programação!
 */
export function calcular(
  primeiroNumero: number,
  segundoNumero: number,
  operador: Operador
): { sucesso: boolean; resultado?: number; erro?: string } {
  try {
    let valorFinal: number;

    switch (operador) {
      case '+':
        valorFinal = somar(primeiroNumero, segundoNumero);
        break;
      case '-':
        valorFinal = subtrair(primeiroNumero, segundoNumero);
        break;
      case '*':
        valorFinal = multiplicar(primeiroNumero, segundoNumero);
        break;
      case '/':
        valorFinal = dividir(primeiroNumero, segundoNumero);
        break;
      default:
        return { sucesso: false, erro: 'Nenhuma operação selecionada.' };
    }

    // Corrige pequenas imprecisões do padrão IEEE 754 de ponto flutuante (ex: 0.1 + 0.2 = 0.30000000000000004)
    const resultadoArredondado = Number(Math.round(Number(valorFinal + 'e+10')) + 'e-10');

    return { sucesso: true, resultado: resultadoArredondado };
  } catch (err: unknown) {
    const mensagem = err instanceof Error ? err.message : 'Erro ao calcular';
    return { sucesso: false, erro: mensagem };
  }
}

/**
 * Converte o símbolo de código (* e /) para símbolos matemáticos visuais tradicionais (× e ÷)
 */
export function simboloVisualOperador(op: Operador): string {
  switch (op) {
    case '+':
      return '+';
    case '-':
      return '−';
    case '*':
      return '×';
    case '/':
      return '÷';
    default:
      return '';
  }
}

/**
 * Formata um número para exibição no visor da calculadora.
 * Limita números excessivamente longos com notação científica amigável.
 */
export function formatarNumeroVisor(valorString: string): string {
  if (!valorString || valorString === 'Erro' || valorString.includes('Divisão')) {
    return valorString;
  }

  // Se o usuário está digitando decimais (ex: "12.") mantém para que ele possa digitar o resto
  if (valorString.endsWith('.')) {
    const parteInteira = valorString.slice(0, -1);
    return formatarMilhares(parteInteira) + ',';
  }

  if (valorString.includes('.')) {
    const [inteira, decimal] = valorString.split('.');
    return `${formatarMilhares(inteira)},${decimal}`;
  }

  return formatarMilhares(valorString);
}

function formatarMilhares(numeroStr: string): string {
  const num = Number(numeroStr);
  if (isNaN(num)) return numeroStr;
  
  // Se for maior que 12 dígitos, usa notação exponencial limpa
  if (Math.abs(num) >= 1e12 || (Math.abs(num) > 0 && Math.abs(num) < 1e-7)) {
    return num.toExponential(5);
  }

  // Adiciona separador de milhar brasileiro (ponto)
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 10 }).format(num);
}
