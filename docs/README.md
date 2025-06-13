# Documentação do Projeto Academia

## Índice

1. [Visão Geral](#visão-geral)
2. [Requisitos do Sistema](#requisitos-do-sistema)
3. [Configuração do Backend (Spring Boot)](#configuração-do-backend-spring-boot)
4. [Configuração do Frontend (React)](#configuração-do-frontend-react)
5. [Executando o Projeto Completo](#executando-o-projeto-completo)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [API Endpoints](#api-endpoints)
8. [Solução de Problemas](#solução-de-problemas)

## Visão Geral

Este projeto consiste em uma aplicação completa para gerenciamento de academia, com um backend desenvolvido em Spring Boot e um frontend em React. A aplicação permite gerenciar informações sobre academias, artigos de fitness, patrocinadores e treinamentos, além de contar com um sistema de autenticação JWT.

### Componentes Principais

- **Backend**: API RESTful desenvolvida com Spring Boot, sem uso do Lombok
- **Frontend**: Aplicação React com componentes modernos
- **Banco de Dados**: H2 (em memória) para facilitar os testes
- **Autenticação**: Sistema JWT para segurança

## Requisitos do Sistema

Para executar este projeto, você precisará ter instalado:

- JDK 11 ou superior
- Maven 3.6 ou superior
- Node.js 14 ou superior
- npm 6 ou superior
- IntelliJ IDEA Ultimate (recomendado para melhor experiência)

## Configuração do Backend (Spring Boot)

### Importando o Projeto no IntelliJ IDEA

1. Abra o IntelliJ IDEA Ultimate
2. Selecione `File > Open`
3. Navegue até a pasta `backend` do projeto e selecione o arquivo `pom.xml`
4. Selecione "Open as Project"
5. Aguarde o IntelliJ importar as dependências Maven

### Configuração do Banco de Dados

O projeto utiliza o banco de dados H2 em memória, que é configurado automaticamente. As configurações estão no arquivo `application.properties`:

```properties
# Configuração do banco de dados H2
spring.datasource.url=jdbc:h2:mem:academiadb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# Configuração do console H2 (para acessar o banco via navegador)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Configuração JPA
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Configuração para inicialização do banco de dados
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true
```

O banco de dados será criado automaticamente na inicialização da aplicação e populado com os dados do arquivo `data.sql`.

### Executando o Backend

1. No IntelliJ IDEA, localize a classe `AcademiaApiApplication.java`
2. Clique com o botão direito na classe e selecione `Run 'AcademiaApiApplication'`
3. O servidor será iniciado na porta 8080
4. Você pode acessar o console H2 em `http://localhost:8080/h2-console` (use as credenciais configuradas no `application.properties`)

## Configuração do Frontend (React)

### Importando o Projeto no IntelliJ IDEA

1. No IntelliJ IDEA, selecione `File > Open`
2. Navegue até a pasta `frontend` do projeto e selecione-a
3. Selecione "Open as Project" ou "Open in New Window" se já estiver com o backend aberto

### Instalando Dependências

1. Abra um terminal no IntelliJ (View > Tool Windows > Terminal)
2. Navegue até a pasta do frontend (se necessário)
3. Execute o comando:
   ```
   npm install
   ```
4. Aguarde a instalação de todas as dependências

### Configurando a Conexão com o Backend

O frontend está configurado para se conectar ao backend na porta 8080. Se você precisar alterar essa configuração, edite o arquivo `.env` na raiz do projeto frontend:

```
REACT_APP_API_URL=http://localhost:8080/api
```

### Executando o Frontend

1. No terminal do IntelliJ, na pasta do frontend, execute:
   ```
   npm start
   ```
2. O servidor de desenvolvimento será iniciado na porta 3000
3. O navegador será aberto automaticamente com a aplicação

## Executando o Projeto Completo

Para executar o projeto completo, siga estas etapas na ordem:

1. Inicie o backend (Spring Boot):
   - Execute a classe `AcademiaApiApplication.java` no IntelliJ
   - Verifique se o servidor está rodando na porta 8080

2. Inicie o frontend (React):
   - Abra um terminal na pasta do frontend
   - Execute `npm start`
   - Verifique se a aplicação está rodando na porta 3000

3. Acesse a aplicação:
   - Abra o navegador e acesse `http://localhost:3000`
   - Você verá a página inicial da aplicação

## Estrutura do Projeto

### Backend (Spring Boot)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── helpgym/
│   │   │           └── academiaapi/
│   │   │               ├── config/           # Configurações (CORS, Web)
│   │   │               ├── controller/       # Controladores REST
│   │   │               ├── dto/              # Objetos de Transferência de Dados
│   │   │               ├── model/            # Entidades JPA
│   │   │               ├── repository/       # Repositórios JPA
│   │   │               ├── security/         # Configuração de segurança JWT
│   │   │               ├── service/          # Serviços de negócio
│   │   │               └── AcademiaApiApplication.java  # Classe principal
│   │   └── resources/
│   │       ├── application.properties        # Configurações da aplicação
│   │       └── data.sql                      # Dados iniciais
│   └── test/                                 # Testes unitários
└── pom.xml                                   # Configuração Maven
```

### Frontend (React)

```
frontend/
├── public/                  # Arquivos públicos
├── src/
│   ├── components/          # Componentes React
│   ├── pages/               # Páginas da aplicação
│   ├── services/            # Serviços para comunicação com a API
│   ├── utils/               # Utilitários
│   ├── App.js               # Componente principal
│   └── index.js             # Ponto de entrada
├── package.json             # Dependências e scripts
└── .env                     # Variáveis de ambiente
```

## API Endpoints

### Autenticação

- **POST /api/auth/register**: Registrar um novo usuário
  ```json
  {
    "nome": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "senha": "senha123"
  }
  ```

- **POST /api/auth/login**: Autenticar usuário
  ```json
  {
    "email": "usuario@exemplo.com",
    "senha": "senha123"
  }
  ```

### Artigos

- **GET /api/artigos**: Listar todos os artigos
- **GET /api/artigos/{id}**: Obter artigo por ID
- **POST /api/artigos**: Criar novo artigo (requer autenticação)
- **PUT /api/artigos/{id}**: Atualizar artigo (requer autenticação)
- **DELETE /api/artigos/{id}**: Excluir artigo (requer autenticação)

### Academias

- **GET /api/academia**: Listar todas as academias
- **GET /api/academia/{id}**: Obter academia por ID
- **POST /api/academia**: Criar nova academia (requer autenticação)
- **PUT /api/academia/{id}**: Atualizar academia (requer autenticação)
- **DELETE /api/academia/{id}**: Excluir academia (requer autenticação)

### Patrocinadores

- **GET /api/patrocinadores**: Listar todos os patrocinadores
- **GET /api/patrocinadores/{id}**: Obter patrocinador por ID
- **POST /api/patrocinadores**: Criar novo patrocinador (requer autenticação)
- **PUT /api/patrocinadores/{id}**: Atualizar patrocinador (requer autenticação)
- **DELETE /api/patrocinadores/{id}**: Excluir patrocinador (requer autenticação)

### Treinamentos

- **GET /api/treinamentos**: Listar todos os treinamentos
- **GET /api/treinamentos/{id}**: Obter treinamento por ID
- **POST /api/treinamentos**: Criar novo treinamento (requer autenticação)
- **PUT /api/treinamentos/{id}**: Atualizar treinamento (requer autenticação)
- **DELETE /api/treinamentos/{id}**: Excluir treinamento (requer autenticação)

## Solução de Problemas

### Problemas com o Backend

1. **Erro ao iniciar o servidor Spring Boot**
   - Verifique se a porta 8080 não está sendo usada por outro processo
   - Verifique se o JDK está configurado corretamente no IntelliJ
   - Verifique se todas as dependências Maven foram baixadas corretamente

2. **Erro de conexão com o banco de dados**
   - Verifique as configurações no arquivo `application.properties`
   - Verifique se o console H2 está acessível em `http://localhost:8080/h2-console`

### Problemas com o Frontend

1. **Erro ao iniciar o servidor React**
   - Verifique se a porta 3000 não está sendo usada por outro processo
   - Verifique se o Node.js e npm estão instalados corretamente
   - Tente executar `npm install` novamente para garantir que todas as dependências estejam instaladas

2. **Erro de conexão com o backend**
   - Verifique se o backend está rodando na porta 8080
   - Verifique se o arquivo `.env` está configurado corretamente
   - Verifique se o CORS está configurado corretamente no backend
