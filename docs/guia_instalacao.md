# Guia de Instalação e Execução - Projeto Academia

Este guia fornece instruções passo a passo para configurar e executar o projeto Academia, que consiste em um backend Spring Boot e um frontend React.

## Índice

1. [Configuração do IntelliJ IDEA](#configuração-do-intellij-idea)
2. [Importando e Executando o Backend](#importando-e-executando-o-backend)
3. [Importando e Executando o Frontend](#importando-e-executando-o-frontend)
4. [Testando a Aplicação Completa](#testando-a-aplicação-completa)
5. [Acessando o Banco de Dados H2](#acessando-o-banco-de-dados-h2)

## Configuração do IntelliJ IDEA

### Requisitos Prévios
- IntelliJ IDEA Ultimate instalado
- JDK 11 ou superior instalado
- Node.js e npm instalados

### Configuração do JDK no IntelliJ

1. Abra o IntelliJ IDEA Ultimate
2. Vá para `File > Project Structure`
3. Na seção `Project`, defina o SDK para JDK 11 ou superior
4. Clique em `Apply` e depois em `OK`

![Configuração do JDK](imagens/config_jdk.png)

## Importando e Executando o Backend

### Passo 1: Importar o Projeto Spring Boot

1. No IntelliJ IDEA, selecione `File > Open`
2. Navegue até a pasta `backend` do projeto e selecione-a
3. Clique em `OK`
4. Selecione `Open as Project` quando solicitado
5. Aguarde o IntelliJ indexar o projeto e baixar as dependências Maven

### Passo 2: Verificar Configurações Maven

1. Abra o arquivo `pom.xml` na raiz do projeto
2. Verifique se todas as dependências estão corretas
3. Se o IntelliJ mostrar um ícone de Maven no canto superior direito, clique nele e depois em `Reload project`

### Passo 3: Executar o Backend

1. Localize a classe `AcademiaApiApplication.java` em `src/main/java/com/helpgym/academiaapi/`
2. Clique com o botão direito na classe e selecione `Run 'AcademiaApiApplication'`
3. Aguarde o servidor iniciar - você verá logs na janela de execução
4. Verifique se o servidor está rodando na porta 8080

![Executando o Backend](imagens/run_backend.png)

## Importando e Executando o Frontend

### Passo 1: Importar o Projeto React

1. No IntelliJ IDEA, selecione `File > Open` (ou `File > New > Project from Existing Sources` se já estiver com um projeto aberto)
2. Navegue até a pasta `frontend` do projeto e selecione-a
3. Clique em `OK`
4. Selecione `Open as Project` ou `Open in New Window` se já estiver com o backend aberto

### Passo 2: Instalar Dependências

1. Abra um terminal no IntelliJ (View > Tool Windows > Terminal)
2. Navegue até a pasta do frontend (se necessário)
3. Execute o comando:
   ```
   npm install
   ```
4. Aguarde a instalação de todas as dependências

![Instalando Dependências](imagens/npm_install.png)

### Passo 3: Executar o Frontend

1. No terminal, execute o comando:
   ```
   npm start
   ```
2. Aguarde o servidor de desenvolvimento iniciar
3. O navegador será aberto automaticamente com a aplicação na URL `http://localhost:3000`

![Executando o Frontend](imagens/run_frontend.png)

## Testando a Aplicação Completa

### Passo 1: Verificar se Ambos os Servidores Estão Rodando

1. Backend: Verifique se o servidor Spring Boot está rodando na porta 8080
   - Acesse `http://localhost:8080/api/artigos` no navegador para testar
   - Você deve ver uma resposta JSON com a lista de artigos

2. Frontend: Verifique se o servidor React está rodando na porta 3000
   - Acesse `http://localhost:3000` no navegador
   - Você deve ver a página inicial da aplicação

### Passo 2: Testar Funcionalidades

1. **Registro de Usuário**:
   - Clique em "Registrar" na página inicial
   - Preencha o formulário com nome, email e senha
   - Clique em "Registrar"
   - Você será redirecionado para a página de login

2. **Login**:
   - Insira o email e senha cadastrados
   - Clique em "Entrar"
   - Você será redirecionado para a página principal da aplicação

3. **Navegação**:
   - Explore as diferentes seções da aplicação: Artigos, Academias, Patrocinadores e Treinamentos
   - Teste a criação, edição e exclusão de itens em cada seção

## Acessando o Banco de Dados H2

O projeto utiliza o banco de dados H2 em memória, que pode ser acessado através de um console web:

1. Com o backend em execução, acesse `http://localhost:8080/h2-console` no navegador
2. Configure os campos de conexão:
   - JDBC URL: `jdbc:h2:mem:academiadb`
   - Username: `sa`
   - Password: deixe em branco
3. Clique em "Connect"
4. Você terá acesso ao console do banco de dados, onde poderá executar consultas SQL e visualizar as tabelas

![Console H2](imagens/h2_console.png)

## Solução de Problemas Comuns

### Problema: Erro ao iniciar o backend

**Sintoma**: Mensagem de erro indicando que a porta 8080 já está em uso.

**Solução**:
1. Identifique o processo que está usando a porta 8080:
   - Windows: `netstat -ano | findstr 8080`
   - Linux/Mac: `lsof -i :8080`
2. Encerre o processo ou altere a porta do servidor no arquivo `application.properties`:
   ```properties
   server.port=8081
   ```

### Problema: Erro ao iniciar o frontend

**Sintoma**: Mensagem de erro indicando que a porta 3000 já está em uso.

**Solução**:
1. Quando o npm perguntar se deseja usar uma porta diferente, digite 'y'
2. Ou encerre o processo que está usando a porta 3000 e tente novamente

### Problema: Frontend não consegue se conectar ao backend

**Sintoma**: Mensagens de erro no console do navegador indicando falha na conexão com a API.

**Solução**:
1. Verifique se o backend está rodando
2. Verifique se o arquivo `.env` no frontend está configurado corretamente:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```
3. Verifique se o CORS está configurado corretamente no backend

## Próximos Passos

Após configurar e executar o projeto com sucesso, você pode:

1. Explorar o código-fonte para entender a estrutura e funcionamento
2. Adicionar novas funcionalidades
3. Personalizar o design da interface
4. Implementar testes automatizados
5. Configurar um banco de dados persistente para ambiente de produção
