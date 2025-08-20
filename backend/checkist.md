<!-- @format -->

# ✅ Checklist do Projeto de Calibração

## 1. ⚙️ Preparação Inicial

- [x] Configurar o ambiente (Node.js, MySQL).
- [x] Inicializar o projeto (`npm init -y`).
- [x] Instalar as dependências (`npm install express mysql2 sequelize dotenv`).
- [x] Configurar o arquivo `.env` para o banco de dados.

---

## 2. 🛡️ Refinamento do Módulo de Localização

### 2.1. Tratamento de Erros e Validação

- [x] **Instalação de Dependências:**
  - [x] Instalar `express-validator`.
- [x] **Camada de Erros Personalizados:**
  - [x] Criar o diretório `errors/`.
  - [x] Criar as classes de erros (`CustomError`, `ValidationError`, `ConflictError`).
- [ ] **Middlewares de Validação:**
  - [ ] Criar o diretório `middlewares/`.
  - [ ] Criar o arquivo `localizationValidation.js`.
  - [ ] Definir as regras de validação para a localização.
- [x] **Integração:**
  - [x] Ajustar o middleware de erro global (`app.js`) para tratar os novos erros.
  - [ ] Adicionar o middleware de validação nas rotas `POST` e `PUT`.

---

## 3. 📍 Módulo de Localização

### 3.1. Backend (Concluído)

- [x] Criar o modelo `Localizacao` com Sequelize.
- [x] Criar as rotas (`/api/localizacoes`) com Express para o CRUD.
- [x] Implementar o controller, service e repository.

### 3.2. Frontend

- [ ] Criar a página HTML para listagem e cadastro.
- [ ] Implementar as requisições (GET, POST, PUT, PATCH, DELETE) com Fetch API.

### 3.3. Testes

- [x] Testar as rotas da API com Insomnia ou Postman.
- [x] Testar a lógica de verificação e criação do banco de dados.

---

## 4. 👤 Módulo de Usuários

### 4.1. Backend

- [ ] Criar o modelo `Usuarios` com a associação para `Localizacoes`.
- [ ] Criar as rotas (`/api/usuarios`) para o CRUD.
- [ ] Implementar as camadas de controller, service e repository.

### 4.2. Frontend

- [ ] Criar a página HTML.
- [ ] Implementar as requisições para popular a lista de seleção de localizações.

---

## 5. 🛠️ Módulo de Equipamentos

### 5.1. Backend

- [ ] Criar o modelo `Equipamentos` com associações para `Localizacoes` e `Usuarios`.
- [ ] Criar as rotas (`/api/equipamentos`).
- [ ] Implementar as camadas de controller, service e repository.

### 5.2. Frontend

- [ ] Criar a interface de listagem e cadastro.
- [ ] Implementar as requisições para popular as listas de seleção de usuários e localizações.

---

## 6. 📝 Módulo de Calibração

### 6.1. Backend

- [ ] Criar o modelo `Calibracoes` com associação para `Equipamentos`.
- [ ] Adicionar a lógica de cálculo para a próxima calibração.
- [ ] Adicionar a lógica para o "Farol" (status).
- [ ] Implementar as rotas e as camadas de controller, service e repository.

### 6.2. Frontend

- [ ] Criar a tela para registrar uma nova calibração.
- [ ] Desenvolver a tela de histórico de calibrações.
- [ ] Implementar a lógica visual do "Farol".

---

## 7. 🧪 Testes com Jest

- [ ] **Instalação e Configuração:**
  - [ ] Instalar Jest e Supertest: `npm install --save-dev jest supertest`.
  - [ ] Configurar o `package.json` para rodar os testes.
- [ ] **Testes de Unidade (Services e Repositories):**
  - [ ] Criar testes para o módulo de Localização.
  - [ ] Criar testes para o módulo de Usuários.
  - [ ] Criar testes para o módulo de Equipamentos.
  - [ ] Criar testes para o módulo de Calibração.
- [ ] **Testes de Integração (API):**
  - [ ] Criar testes de ponta a ponta para as rotas de Localização.
  - [ ] Criar testes de ponta a ponta para as rotas de Usuários.
  - [ ] Criar testes de ponta a ponta para as rotas de Equipamentos.
  - [ ] Criar testes de ponta a ponta para as rotas de Calibração.
