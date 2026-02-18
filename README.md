# ImprimeEtiquetas

O **ImprimeEtiquetas** é uma aplicação desktop desenvolvida com Electron e React para facilitar o processo de criação, personalização e impressão de etiquetas.

## 🚀 Funcionalidades

- **Configuração de Layout Flexível**: Defina o número de linhas e colunas conforme a sua necessidade.
- **Edição de Texto Rica**: Painel de ferramentas para ajustar tamanho da fonte, alinhamento (vertical e horizontal) e estilo.
- **Visualização em Tempo Real**: Veja exatamente como suas etiquetas serão impressas.
- **Modelos de Etiquetas**: Salve e carregue modelos configurados para agilizar o trabalho repetitivo.
- **Impressão Direta**: Integração com as funções de impressão do sistema.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Desktop Shell**: [Electron](https://www.electronjs.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Estado**: Hooks do React (`useState`, `useEffect`)

## 📦 Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) (recomendado versão LTS)
- npm ou yarn

### Passos
1. No diretório raiz, instale as dependências:
   ```bash
   npm install
   ```
2. Para rodar em modo desenvolvimento (Vite + Electron):
   ```bash
   npm run dev
   ```
3. Para gerar o build da aplicação:
   ```bash
   npm run electron:build
   ```

## 📄 Estrutura do Projeto

- `src/`: Contém o código fonte do frontend React.
  - `components/`: Componentes da interface (Painéis de configuração, Preview, etc).
- `electron/`: Contém os arquivos principais do processo Electron (`main.js`, `preload.js`).
- `public/`: Ativos estáticos.
