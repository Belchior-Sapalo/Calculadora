# 🧮 Calculadora Básica Didática (React + TypeScript)

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

1. **Separação de Responsabilidades (Separation of Concerns):** A lógica matemática pura fica isolada em um arquivo próprio (`calculatorLogic.ts`), independente do visual da aplicação.
2. **Imutabilidade e Gerenciamento de Estado:** Utilização clara e explicada do hook `useState` para controlar a memória da calculadora.
3. **Acessibilidade e Usabilidade:** Suporte a cliques na tela e atalhos completos no teclado físico.
4. **Tratamento de Exceções:** Proteção contra erros clássicos como divisão por zero e inserção repetida de pontos decimais.

---

## ⚡ Funcionalidades Principais

- ➕ **Adição ($a + b$):** Soma números inteiros e decimais.
- ➖ **Subtração ($a - b$):** Realiza a diferença entre dois valores.
- ✖️ **Multiplicação ($a \times b$):** Calcula o produto com alta precisão.
- ➗ **Divisão ($a \div b$):** Quociente seguro com tratamento amigável caso o usuário tente dividir por zero.
- 🔢 **Operações Auxiliares:**
  - Porcentagem (`%`)
  - Inversão de sinal positivo/negativo (`±`)
  - Apagar último dígito (`⌫ / Backspace`)
  - Limpar tudo (`AC / Escape`)
- 📜 **Histórico de Cálculos:** Exibe as contas recentes com data/hora e permite clicar para reaproveitar qualquer resultado anterior.
- ⌨️ **Suporte a Teclado Físico:** Digite diretamente do teclado numérico do seu computador.
- 🔍 **Inspetor de Memória ao Vivo:** Mostra em tempo real as variáveis do React (`valorAtual`, `valorAnterior`, `operador`) mudando a cada clique.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/):** Biblioteca para construção da interface de usuário baseada em componentes.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para prevenir erros durante o desenvolvimento.
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização moderna através de classes utilitárias.
- **[Lucide React](https://lucide.dev/):** Pacote de ícones minimalistas e acessíveis.
- **[Vite](https://vitejs.dev/):** Ferramenta de build e servidor de desenvolvimento ultra-rápido.

---

## 📁 Estrutura do Projeto

```text
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
```

---

## 🧩 Explicação dos Principais Componentes

### 1. As Funções Matemáticas Puras (`src/utils/calculatorLogic.ts`)

No arquivo `calculatorLogic.ts`, isolamos a matemática do design. Por que isso é importante?
Porque se amanhã você quiser transformar essa calculadora em um aplicativo de terminal ou de celular, você pode reutilizar exatamente o mesmo arquivo sem mexer em nada!

Exemplo da função de divisão:

```typescript
export function dividir(a: number, b: number): number {
  // Verificação de segurança essencial!
  if (b === 0) {
    throw new Error('Divisão por zero não permitida!');
  }
  return a / b;
}
```

### 2. A Memória da Calculadora (`useState` em `src/App.tsx`)

Para realizar uma conta de duas etapas como `12 + 5 = 17`, o programa precisa armazenar informações enquanto o usuário digita:

- `valorAtual`: O número que está sendo digitado ou exibido no visor no momento.
- `valorAnterior`: O primeiro número que você digitou antes de pressionar a tecla de operação.
- `operador`: Guarda qual símbolo você clicou (`+`, `-`, `*` ou `/`).
- `aguardandoSegundoNumero`: Um valor booleano (`true`/`false`) que indica se o próximo número digitado deve substituir a tela (início do segundo número).

### 3. A Estrutura de Decisão (`switch/case`)

Quando o botão de igual (`=`) é acionado, a calculadora usa o comando `switch` para saber qual função chamar:

```typescript
switch (operador) {
  case '+': return somar(primeiro, segundo);
  case '-': return subtrair(primeiro, segundo);
  case '*': return multiplicar(primeiro, segundo);
  case '/': return dividir(primeiro, segundo);
}
```

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
Tenha o [Node.js](https://nodejs.org/) instalado em seu computador (versão 18 ou superior).

### Passo a passo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/calculadora-simples-react.git
   ```

2. **Entre na pasta do projeto:**
   ```bash
   cd calculadora-simples-react
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Abra no seu navegador:**
   Acesse a URL exibida no terminal (normalmente `http://localhost:5173` ou `http://localhost:3000`).

---

## 🎯 Desafios para Praticar (Próximos Passos)

Se você é iniciante e quer treinar suas habilidades, tente adicionar estas funcionalidades sozinho(a):

1. **Cálculo de Raiz Quadrada:** Adicione um botão $\sqrt{x}$ utilizando a função nativa `Math.sqrt(num)`.
2. **Cálculo de Potência:** Adicione a operação de elevar um número ao quadrado ($x^2$).
3. **Persistência Local (LocalStorage):** Salve o histórico de cálculos para que ele não se perca quando a página for recarregada.
4. **Temas de Cores:** Crie um botão para alternar entre tema escuro (Dark) e tema claro (Light).

---

## 📄 Licença

Este projeto está sob a licença **MIT** - você pode usar, modificar e compartilhar livremente para seus estudos e portfólio!

Desenvolvido para fins de aprendizado em programação. 🚀
