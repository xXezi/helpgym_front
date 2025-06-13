#!/bin/bash

# Cores para melhorar a visualização
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================\033[0m"
echo -e "${BLUE}       INICIANDO PROJETO ACADEMIA               \033[0m"
echo -e "${BLUE}==================================================\033[0m"

# Verificar se o backend já está em execução
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}Backend já está em execução na porta 8080.\033[0m"
    echo -e "${YELLOW}Ignorando inicialização do backend.\033[0m"
else
    echo -e "${GREEN}Iniciando backend...\033[0m"
    cd backend
    
    # Verificar se é Maven ou Gradle
    if [ -f "mvnw" ]; then
        chmod +x mvnw
        ./mvnw spring-boot:run > ../backend.log 2>&1 &
    elif [ -f "gradlew" ]; then
        chmod +x gradlew
        ./gradlew bootRun > ../backend.log 2>&1 &
    else
        echo -e "${RED}Não foi possível determinar se o projeto usa Maven ou Gradle.\033[0m"
        echo -e "${RED}Por favor, inicie o backend manualmente.\033[0m"
        exit 1
    fi
    
    echo -e "${GREEN}Backend iniciado na porta 8080.\033[0m"
    cd ..
    
    # Aguardar o backend iniciar
    echo -e "${YELLOW}Aguardando o backend iniciar (15 segundos)...\033[0m"
    sleep 15
fi

# Verificar se o frontend já está em execução
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}Frontend já está em execução na porta 3000.\033[0m"
    echo -e "${YELLOW}Encerrando para reiniciar...\033[0m"
    kill $(lsof -Pi :3000 -sTCP:LISTEN -t)
fi

# Iniciar o frontend
echo -e "${GREEN}Iniciando frontend...\033[0m"
cd academia-app
export NODE_OPTIONS=--openssl-legacy-provider
npm start

# Criar script para parar o projeto
cd ..
cat > stop-project.sh << EOL2
#!/bin/bash

# Cores para melhorar a visualização
GREEN='\\033[0;32m'
RED='\\033[0;31m'
NC='\\033[0m' # No Color

echo -e "\${GREEN}Encerrando processos do projeto...\033[0m"

# Encerrar frontend (porta 3000)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "Encerrando frontend na porta 3000..."
    kill \$(lsof -Pi :3000 -sTCP:LISTEN -t)
    echo -e "Frontend encerrado."
else
    echo -e "Frontend não está em execução."
fi

# Encerrar backend (porta 8080)
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "Encerrando backend na porta 8080..."
    kill \$(lsof -Pi :8080 -sTCP:LISTEN -t)
    echo -e "Backend encerrado."
else
    echo -e "Backend não está em execução."
fi

echo -e "\${GREEN}Todos os processos foram encerrados.\033[0m"
EOL2

chmod +x stop-project.sh
echo -e "${GREEN}Script para parar o projeto criado: stop-project.sh\033[0m"
