# 📚 Sistema de Gerenciamento de Biblioteca

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/github/license/antonyreis/lib-management-system)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.17.0-green)

Sistema completo para gerenciamento de bibliotecas, composto por uma API backend desenvolvida com conceitos de Programação Orientada a Objetos e uma interface frontend moderna em React.

## 🏗️ Arquitetura do Projeto

```
lib-management-system/
├── backend/           # API e lógica de negócio (POO)
├── frontend/          # Interface de usuário (React)
├── docs/             # Documentação
├── scripts/          # Scripts de automação
└── README.md
```

## ✨ Funcionalidades

### 📖 Gerenciamento de Livros
- ✅ CRUD completo de livros
- ✅ Controle de disponibilidade
- ✅ Busca e filtros avançados
- ✅ Categorização por gênero/autor

### 👥 Gestão de Usuários
- ✅ Cadastro de membros
- ✅ Perfis de usuário personalizáveis
- ✅ Sistema de autenticação

### 📋 Sistema de Empréstimos
- ✅ Controle de empréstimos e devoluções
- ✅ Histórico de transações
- ✅ Notificações de vencimento
- ✅ Multas por atraso

### 📊 Dashboard e Relatórios
- ✅ Dashboard administrativo
- ✅ Relatórios de uso da biblioteca
- ✅ Estatísticas em tempo real
- ✅ Visualizações gráficas

## 🛠️ Tecnologias Utilizadas

### Backend
- **Linguagem:** Java
- **Paradigma:** Programação Orientada a Objetos
- **Banco de Dados:** H2 Database
- **Framework:** Spring Boot

### Frontend
- **React.js** v18.2.0
- **JavaScript ES6+**
- **CSS3** / **Styled Components**
- **Responsive Design**

### DevOps & Ferramentas
- **Git** para versionamento
- **Docker** para containerização (opcional)
- **ESLint** para qualidade de código

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** v18.17.0 ou superior
- **npm** v9.0.0 ou superior
- **Git** v2.30 ou superior

## 🚀 Como Executar

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/antonyreis/lib-management-system.git
cd lib-management-system
```

### 2️⃣ Configuração do Backend
```bash
cd backend
# Instale as dependências
npm install
# ou
pip install -r requirements.txt

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute o servidor backend
npm run dev
# ou
python main.py
```

### 3️⃣ Configuração do Frontend
```bash
cd frontend
npm install
npm start
```

### 4️⃣ Execução Completa (Opcional)
```bash
# Na raiz do projeto
npm run dev  # Executa backend e frontend simultaneamente
```

## 🌐 Acesso à Aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000 (ou porta configurada)
- **Documentação da API:** http://localhost:8000/docs

## 📁 Estrutura de Pastas

### Backend
```
backend/
├── src/
│   ├── models/        # Classes e modelos (POO)
│   ├── controllers/   # Controladores
│   ├── services/      # Lógica de negócio
│   ├── routes/        # Rotas da API
│   ├── database/      # Configurações do banco
│   └── utils/         # Utilitários
├── tests/            # Testes unitários
└── docs/             # Documentação da API
```

### Frontend
```
frontend/
├── src/
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── hooks/         # Custom hooks
│   ├── services/      # Chamadas para API
│   ├── utils/         # Funções utilitárias
│   └── styles/        # Estilos globais
├── public/           # Arquivos estáticos
└── build/            # Build de produção
```

## 🧪 Testes

```bash
# Testes do backend
cd backend
npm test

# Testes do frontend
cd frontend
npm test
```

## 📖 Documentação da API

A documentação completa da API está disponível em `/docs` quando o backend estiver rodando, ou acesse a [documentação online](link).

### Principais endpoints:

- `GET /api/books` - Lista todos os livros
- `POST /api/books` - Criar novo livro
- `GET /api/users` - Lista usuários
- `POST /api/loans` - Criar empréstimo
- `PUT /api/loans/:id/return` - Devolver livro

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### 📝 Padrões de Commit

Utilize o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes

## 📊 Status do Projeto

- [x] Estrutura inicial do projeto
- [x] Backend com API REST
- [x] Frontend React responsivo
- [x] Sistema de autenticação
- [x] CRUD de livros e usuários
- [x] Sistema de empréstimos
- [ ] Sistema de multas
- [ ] Notificações por email
- [ ] Deploy em produção
- [ ] Testes automatizados


## 🔗 Links Úteis

- [Repositório do Projeto](https://github.com/antonyreis/lib-management-system)
- [Issues](https://github.com/antonyreis/lib-management-system/issues)
- [Pull Requests](https://github.com/antonyreis/lib-management-system/pulls)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**