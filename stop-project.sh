#!/bin/bash

# Cores para melhorar a visualização
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Encerrando os processos do projeto...${NC}"

# Verificar se os arquivos de PID existem
if [ -f ".backend_pid" ]; then
    BACKEND_PID=$(cat .backend_pid)
    echo -e "Encerrando backend (PID: $BACKEND_PID)..."
    kill -15 $BACKEND_PID 2>/dev/null || kill -9 $BACKEND_PID 2>/dev/null
    rm .backend_pid
else
    echo -e "${YELLOW}Arquivo .backend_pid não encontrado.${NC}"
fi

if [ -f ".frontend_pid" ]; then
    FRONTEND_PID=$(cat .frontend_pid)
    echo -e "Encerrando frontend (PID: $FRONTEND_PID)..."
    kill -15 $FRONTEND_PID 2>/dev/null || kill -9 $FRONTEND_PID 2>/dev/null
    rm .frontend_pid
else
    echo -e "${YELLOW}Arquivo .frontend_pid não encontrado.${NC}"
fi

# Função para verificar e matar processos em uma porta específica
function kill_port() {
    local port=$1
    local pid
    
    if command -v lsof &> /dev/null; then
        pid=$(lsof -i:$port -t 2>/dev/null)
    elif command -v netstat &> /dev/null && command -v grep &> /dev/null && command -v awk &> /dev/null; then
        pid=$(netstat -tuln | grep ":$port " | awk '{print $7}' | cut -d'/' -f1)
    elif command -v ss &> /dev/null && command -v grep &> /dev/null && command -v awk &> /dev/null; then
        pid=$(ss -tuln | grep ":$port " | awk '{print $7}' | cut -d'/' -f1)
    fi
    
    if [ ! -z "$pid" ]; then
        echo -e "Encontrado processo na porta $port (PID: $pid). Encerrando..."
        kill -15 $pid 2>/dev/null || kill -9 $pid 2>/dev/null
        return 0
    else
        return 1
    fi
}

# Verificar se há processos nas portas 8080 e 3000 e encerrá-los
echo -e "\n${YELLOW}Verificando processos nas portas 8080 e 3000...${NC}"

# Verificar porta 8080 (backend)
kill_port 8080

# Verificar porta 3000 (frontend)
kill_port 3000

echo -e "\n${GREEN}Todos os processos foram encerrados.${NC}"
