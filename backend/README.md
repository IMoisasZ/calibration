# ⚙️ Sistema de Calibração

## 📝 Visão Geral
O **Sistema de Calibração** é uma API RESTful desenvolvida em **Node.js**, projetada para o gerenciamento completo das calibrações de equipamentos industriais. O sistema inclui controle de usuários, equipamentos, proprietários, localizações, periodicidades e registros de calibração.

Além disso, o backend conta com uma **documentação automatizada completa**, criada utilizando **JSDoc**, permitindo navegação clara pelo código, facilitando manutenção e contribuindo com boas práticas de desenvolvimento.

---

## 📁 Sumário
1. Visão Geral  
2. Tecnologias Utilizadas  
3. Documentação da API (JSDoc)  
4. Instalação e Configuração  
5. Uso do Sistema  
6. Endpoints da API  
7. Exemplos da API (com Imagens)

---

## ⚙️ Tecnologias Utilizadas

| Categoria | Tecnologia | Documentação |
| :--- | :--- | :--- |
| **Backend** | Node.js | https://nodejs.org/ |
| **Framework Web** | Express | https://expressjs.com/ |
| **ORM** | Sequelize | https://sequelize.org/ |
| **Banco de Dados** | MySQL2 | https://www.npmjs.com/package/mysql2 |
| **Segurança** | Bcrypt | https://www.npmjs.com/package/bcrypt |
| **Autenticação** | JWT | https://jwt.io/ |
| **Upload de Arquivos** | Multer | https://github.com/expressjs/multer |
| **Documentação** | JSDoc | https://jsdoc.app/ |
| **Internacionalização** | i18n | https://www.npmjs.com/package/i18n |
| **Variáveis de Ambiente** | Dotenv | https://github.com/motdotla/dotenv |
| **Logs** | Winston | https://github.com/winstonjs/winston |

---

## 📚 Documentação da API (JSDoc)
Este backend possui documentação completa gerada automaticamente com **JSDoc**, garantindo:

- Documentação atualizada e acessível
- Padronização nas anotações do código
- Melhor onboarding para novos desenvolvedores
- Estrutura clara de controllers, serviços, modelos e rotas

### ▶️ Gerando a documentação
Execute:
```
npm run docs
```
A documentação será criada dentro da pasta **/docs**.

---

## 🚀 Instalação e Configuração

### 1. Pré-requisitos
- Node.js
- Servidor MySQL

### 2. Instalação
```
git clone <URL_DO_REPOSITORIO>
cd <nome-do-projeto>
npm install
```

### 3. Configuração do Ambiente
Crie `.env.development` ou `.env.production` contendo:
```
PORT=3001
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
```

### 4. Inicialização do Servidor
**Desenvolvimento:**
```
npm run start:dev
```
**Produção:**
```
npm start
```

---

## 💻 Uso do Sistema
Após iniciar o servidor:
```
http://localhost:<PORTA>
```
O sistema requer inicialmente o cadastro de:
- Localizações
- Proprietários
- Tipos de equipamento
- Unidades de medida
- Usuários

---

## 🗺️ Endpoints da API

| Recurso | Endpoint | Métodos |
| :--- | :--- | :--- |
| **Autenticação** | `/api/login` | POST |
| **Usuários** | `/api/user` | POST, PUT/:id, GET, PATCH/:id |
| **Calibrações** | `/api/calibration` | POST, GET, GET/:id, DELETE/:id, PATCH/:id |
| **Resultados** | `/api/calibration/result` | POST, PUT/:id, GET/:id, DELETE/:id, PATCH/:id |
| **Análises** | `/api/calibration/analysis` | POST |
| **Configurações** | `/api/calibration/config` | POST, GET, GET/:id |
| **Periodicidade** | `/api/calibration/periodicity` | POST, PUT/:id, GET, GET/:id, PATCH/:id |
| **Equipamentos** | `/api/equipment` | POST, PUT/:id, GET, GET/:id, PATCH/:id |
| **Tipos de Equipamento** | `/api/equipment/type` | POST, PUT/:id, GET, GET/:id, PATCH/:id |
| **Localizações** | `/api/localization` | POST, PUT/:id, GET, GET/:id, PATCH/:id |
| **Proprietários** | `/api/owner` | POST, PUT/:id, GET, GET/:id, PATCH/:id |

---

# 📸 Exemplos da API (Screenshots)

## 📍 Criar Localização — POST /api/localization
```json
{
  "description": "modelação",
  "active": true
}
```
![POST Localization](sandbox:/mnt/data/27fedaad-4314-4004-854a-8dee6bc0b791.png)

---

## ✏️ Atualizar Localização — PUT /api/localization/:id
```json
{
  "description": "injecao de plasticos",
  "active": true
}
```
![PUT Localization](sandbox:/mnt/data/c03fec17-bd2e-4024-8c88-56f5ce498ed4.png)

---

## 📄 Listar Localizações — GET /api/localization?status=true
![GET Localization](sandbox:/mnt/data/d3f30e48-af3f-4b98-a359-4ec3ae2bec43.png)

---

## 🧍 Criar Proprietário — POST /api/owner
```json
{
  "owner": "injetaq",
  "localization_id": 3
}
```
![POST Owner](sandbox:/mnt/data/5a3bab48-4200-44a6-a23f-9d76dcdf90a8.png)

---

## 📋 Listar Proprietários — GET /api/owner?status=true
![GET Owner](sandbox:/mnt/data/324b209d-e726-487c-8868-52aa13a8e537.png)

---

Se desejar, posso adicionar:
- Badges do GitHub
- Exemplos de respostas completas
- Documentação dos modelos
- Diagrama ER do banco de dados
- Fluxo de calibração em detalhes

---

## 📄 Acesso à Documentação (JSDoc)
Se a documentação já tiver sido gerada, você pode acessá-la diretamente pelo arquivo **index.html** dentro da pasta `docs`.

👉 **Link para a documentação:** `./docs/index.html`

Basta abrir esse arquivo no navegador para visualizar toda a documentação da API, incluindo controllers, services e módulos do sistema de calibração.

