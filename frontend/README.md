# 🖥️ Sistema de Calibração - Frontend

## 📝 Visão Geral

O **Sistema de Calibração (Frontend)** é uma aplicação de interface de usuário de alta performance desenvolvida em **React 19** para interagir com a API RESTful de gerenciamento e rastreabilidade metrológica de equipamentos industriais. A aplicação oferece uma interface moderna, responsiva e altamente intuitiva — construída seguindo as melhores práticas de engenharia de software e componentização — para o controle completo de usuários, ativos industriais, proprietários, localizações hierárquicas, periodicidades normativas e registros detalhados de calibração.

---

## 📁 Sumário

1. [Visão Geral](#-visão-geral)
2. [Arquitetura e Tecnologias](#️-tecnologias-utilizadas)
3. [Arquitetura de Pastas e Organização do Código](#-arquitetura-de-pastas)
4. [Instalação, Configuração e Execução](#-instalação-e-configuração)
5. [Scripts Disponíveis](#-scripts-disponíveis)
6. [Mapeamento de Rotas da Aplicação](#️-rotas-da-aplicação-calibrationroutes)
7. [Módulos e Funcionalidades da Interface](#-funcionalidades-principais)
8. [Camada de Serviços e Comunicação HTTP](#-camada-de-serviços-e-comunicação-http)
9. [Gerenciamento de Estado e Contextos](#-gerenciamento-de-estado-e-contextos)
10. [Testes e Garantia de Qualidade](#-testes-e-garantia-de-qualidade)
11. [Autor](#-autor)

---

## ⚙️ Tecnologias Utilizadas

O ecossistema do projeto foi selecionado para garantir robustez, escalabilidade, tipagem e facilidade de manutenção a longo prazo:

| Categoria            | Tecnologia            | Versão  | Documentação Oficial                                                                 | Propósito no Projeto                                                                       |
| :------------------- | :-------------------- | :------ | :----------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **Biblioteca UI**    | React                 | 19.x    | [react.dev](https://react.dev/)                                                      | Construção de componentes reativos e interface de usuário baseada em árvore de elementos.  |
| **Roteamento**       | React Router DOM      | 6.x+    | [reactrouter.com](https://reactrouter.com/)                                          | Navegação dinâmica baseada em histórico de navegador e proteção de rotas privadas.         |
| **Requisições HTTP** | Axios                 | 1.x+    | [axios-http.com](https://axios-http.com/)                                            | Cliente HTTP baseado em Promises para comunicação assíncrona com interceptadores de token. |
| **Notificações**     | React Hot Toast       | Recente | [react-hot-toast.com](https://react-hot-toast.com/)                                  | Feedback visual leve e customizável para mensagens de sucesso, erro e alertas.             |
| **Ícones**           | React Icons           | Recente | [react-icons.github.io](https://react-icons.github.io/)                              | Conjunto abrangente de ícones vetoriais (FontAwesome, Material Design, etc.).              |
| **Utilitários**      | Lodash.debounce       | Recente | [lodash.com](https://lodash.com/)                                                    | Otimização de desempenho em campos de busca com atraso de execução (debounce).             |
| **Testes**           | React Testing Library | Recente | [testing-library.com](https://testing-library.com/docs/react-testing-library/intro/) | Testes de componentes focados no comportamento do usuário final.                           |

---

## 📂 Arquitetura de Pastas

A estrutura do diretório `src/` segue o padrão de separação de responsabilidades (SoC), facilitando a navegação, testes unitários e escalabilidade do código-fonte:

```text
src/
├── api/                  # Configuração de instâncias do Axios, interceptors e baseURL
├── assets/               # Recursos estáticos (imagens, logotipos, fontes e ícones locais)
├── components/           # Componentes atômicos e reutilizáveis de UI (botões, modais, tabelas, forms)
├── context/              # Context API do React para estado global (Autenticação, Preferências de Tema)
├── data/                 # Arquivos de dados estáticos, mockups ou dicionários auxiliares
├── hooks/                # Custom Hooks encapsulando lógicas reutilizáveis (useAuth, useDebounce, useFetch)
├── pages/                # Páginas principais da aplicação mapeadas diretamente para as rotas
├── routes/               # Configurador de rotas, layouts protegidos e controle de acesso
├── services/             # Camada de serviços de negócio desacoplada para consumo dos endpoints REST
├── utils/                # Funções utilitárias puras (formatadores de data, moeda, máscaras de input)
├── validator/            # Esquemas e regras de validação de formulários (integrados ou customizados)
├── App.js                # Componente raiz da árvore de renderização
├── index.css             # Estilos globais da aplicação (Tailwind ou CSS Modules / Variáveis CSS)
└── index.js              # Ponto de entrada do ReactDOM que injeta a aplicação na árvore DOM
```

---

## 🚀 Instalação e Configuração

### 1. Pré-requisitos

Certifique-se de possuir as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- **Node.js** (versão 18.x ou superior recomendada)
- **npm** (gerenciador de pacotes padrão do Node.js) ou **Yarn** / **pnpm**
- Backend do Sistema de Calibração rodando localmente (ou acessível via rede interna/VPN).

### 2. Clonagem do Repositório

Abra o seu terminal, clone o repositório e navegue até a pasta do frontend:

```bash
git clone <URL_DO_REPOSITORIO>
cd <nome-do-projeto>/frontend
```

### 3. Instalação de Dependências

Instale todos os pacotes necessários definidos no `package.json`:

```bash
npm install
# ou caso utilize Yarn:
yarn install
```

### 4. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `frontend` (você pode se basear no `.env.example` se disponível) especificando o endereço do servidor backend:

```env
REACT_APP_API_URL=http://localhost:3001/api
PORT=3000
```

### 5. Inicialização do Servidor de Desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento com hot-reload ativo:

```bash
npm start
# ou
yarn start
```

O aplicativo compilará os arquivos e abrirá automaticamente no navegador padrão na porta `http://localhost:3000`.

---

## 📜 Scripts Disponíveis

No arquivo `package.json`, estão configurados os seguintes comandos para automação de tarefas:

| Comando         | Descrição Detalhada                                                                                                                                                                               |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm start`     | Inicia o servidor de desenvolvimento local com Webpack Dev Server e Hot Module Replacement (HMR).                                                                                                 |
| `npm run build` | Compila, otimiza e empacota a aplicação em arquivos estáticos minificados na pasta `/build` para implantação em produção.                                                                         |
| `npm test`      | Executa a suíte de testes automatizados utilizando o Jest em modo interativo de relatórios.                                                                                                       |
| `npm run eject` | **Atenção:** Transfere todas as configurações ocultas do `react-scripts` diretamente para o seu projeto. É um comando irreversível indicado apenas para configurações avançadas de Webpack/Babel. |

---

## 🗺️ Rotas da Aplicação (`CalibrationRoutes`)

O sistema gerencia o mapeamento dinâmico de telas utilizando o **React Router DOM**, dividindo-se entre rotas públicas e protegidas por autenticação:

| Rota (Path)                        | Componente Associado            | Descrição Funcional                                                                | Nível de Acesso |
| :--------------------------------- | :------------------------------ | :--------------------------------------------------------------------------------- | :-------------- |
| `/`                                | `Home`                          | Página inicial do painel de controle e indicadores gerais (Dashboard).             | Protegida       |
| `/login`                           | `Login`                         | Tela de autenticação de usuários com credenciais corporativas.                     | Pública         |
| `/user_menu`                       | `UserMenu`                      | Menu central de navegação para o subdomínio de usuários.                           | Protegida       |
| `/user_list`                       | `UserList`                      | Tabela interativa com listagem completa, paginação e filtros de usuários.          | Protegida       |
| `/user`                            | `User`                          | Formulário de cadastro, edição de dados e permissões de usuários.                  | Protegida       |
| `/localization`                    | `Localization`                  | Gerenciamento hierárquico de localizações industriais (Fábricas, Setores, Linhas). | Protegida       |
| `/equipment_menu`                  | `EquipmentMenu`                 | Menu principal de gerenciamento de ativos e maquinário.                            | Protegida       |
| `/equipment_type`                  | `EquipmentType`                 | Configuração e cadastro de tipologias de equipamentos.                             | Protegida       |
| `/equipment`                       | `Equipment`                     | Cadastro avançado, listagem e rastreio de ativos industriais.                      | Protegida       |
| `/unity`                           | `Unity`                         | Gerenciamento de unidades de medida metrológica (mm, kg, °C, bar, etc.).           | Protegida       |
| `/owner`                           | `Owner`                         | Gestão de proprietários ou departamentos responsáveis pelos ativos.                | Protegida       |
| `/calibration_periodicity`         | `CalibrationPeriodicity`        | Definição de prazos normativos e periodicidades de calibração.                     | Protegida       |
| `/calibration_menu`                | `CalibrationMenu`               | Central de controle para operações metrológicas e calibrações.                     | Protegida       |
| `/calibration`                     | `Calibration`                   | Gestão e lançamento de registros individuais de calibração.                        | Protegida       |
| `/calibration_analysis_list`       | `CalibrationAnalysisList`       | Listagem e acompanhamento das análises críticas de calibração.                     | Protegida       |
| `/calibration_analysis_definition` | `CalibrationAnalysisDefinition` | Definição de critérios de aceitação e laudos analíticos.                           | Protegida       |
| `/calibration_final_list`          | `CalibrationFinalList`          | Listagem consolidada de calibrações finalizadas e homologadas.                     | Protegida       |
| `/calibration_geral`               | `CalibrationGeral`              | Visão macro e relatórios gerenciais dos processos metrológicos.                    | Protegida       |
| `/calibration_config`              | `CalibrationConfig`             | Parâmetros e configurações gerais do motor de calibração.                          | Protegida       |

---

## 💻 Funcionalidades Principais

A interface gráfica comunica-se de forma assíncrona com os endpoints da API REST, entregando um conjunto completo de ferramentas operacionais:

- **🔐 Autenticação e Segurança (JWT):** Sistema de login seguro com persistência de token de sessão via interceptadores do Axios, garantindo redirecionamento automático em caso de expiração de token (`401 Unauthorized`).
- **🏭 Gestão Completa de Equipamentos:** Cadastro e rastreamento de ativos industriais, associando números de série, tags de identificação, fabricantes, tipos e status operacionais em tempo real.
- **📍 Mapeamento Geográfico e Setorial (Localizações):** Organização estrutural da planta industrial permitindo localizar ativos com precisão por planta, pavimentos, salas ou linhas de produção.
- **📏 Controle Metrológico Avançado:**
  - Gestão de periodicidades de calibração baseada em tempo ou ciclos de uso.
  - Lançamento de dados de calibração com verificação de conformidade e tolerâncias.
  - Fluxo completo desde o registro inicial até a aprovação final e emissão de laudos.
- **👥 Controle de Usuários e Proprietários:** Atribuição de permissões granulares, gestão de perfis corporativos e vínculo de departamentos responsáveis.
- **⚡ Feedback em Tempo Real:** Experiência de usuário fluida utilizando o `react-hot-toast` para disparar notificações visuais elegantes em operações bem-sucedidas ou falhas de validação.
- **🔍 Busca Otimizada com Debounce:** Campos de pesquisa integrados com `lodash.debounce` para evitar requisições excessivas ao servidor durante a digitação do usuário.

---

## 🔌 Camada de Serviços e Comunicação HTTP

A comunicação com o backend é estruturada na pasta `src/services/`. Cada entidade do sistema possui um módulo dedicado (ex: `userService.js`, `equipmentService.js`, `calibrationService.js`) que encapsula os verbos HTTP (`GET`, `POST`, `PUT`, `DELETE`), mantendo os componentes de UI limpos e livres de lógica de rede direta.

Exemplo conceitual de estrutura de um serviço:

```javascript
import api from '../api/axiosConfig'

export const EquipmentService = {
	getAll: async (params) => {
		const response = await api.get('/equipments', { params })
		return response.data
	},
	getById: async (id) => {
		const response = await api.get(`/equipments/${id}`)
		return response.data
	},
	create: async (data) => {
		const response = await api.post('/equipments', data)
		return response.data
	},
	update: async (id, data) => {
		const response = await api.put(`/equipments/${id}`, data)
		return response.data
	},
	delete: async (id) => {
		const response = await api.delete(`/equipments/${id}`)
		return response.data
	},
}
```

---

## 🧠 Gerenciamento de Estado e Contextos

O estado global da aplicação é administrado principalmente pela **Context API** do React, localizada em `src/context/`. O principal contexto implementado é o **AuthContext**, responsável por:

- Armazenar e fornecer o usuário autenticado atual.
- Gerenciar o token de acesso no armazenamento local (`localStorage`).
- Disponibilizar métodos globais de `login` e `logout` para toda a árvore de componentes.

---

## 🧪 Testes e Garantia de Qualidade

Para garantir a estabilidade da interface e prevenir regressões durante novas implementações, o projeto utiliza a **React Testing Library** combinada com **Jest**:

- **Testes Unitários:** Validação de funções utilitárias e formatadores isolados na pasta `src/utils/`.
- **Testes de Componentes:** Simulação de interações de usuário (cliques, preenchimento de formulários, submissões) e verificação de renderização correta de elementos visuais.

Para executar a suíte de testes em ambiente de desenvolvimento:

```bash
npm test -- --watchAll=false
```

---

## 👨‍💻 Autor

Projeto desenvolvido e mantido por **Moisés Santos**.

- **GitHub:** [https://github.com/IMoisasZ](https://github.com/IMoisasZ)
- **Repositório:** Sistema de Calibração (Frontend)
