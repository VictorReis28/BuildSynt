#!/bin/bash

# ========================================
# BuildSynt - Script Unificado Linux/macOS
# Combina todas as funcionalidades em um só
# ========================================

set -e

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Mudar para o diretório raiz do projeto
cd "$(dirname "$0")/.." || exit 1

# Verificar se estamos no lugar certo
if [ ! -f "frontend/package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script a partir da raiz do projeto BuildSynt${NC}"
    echo -e "${YELLOW}Uso: ./scripts/buildsynt.sh [comando]${NC}"
    exit 1
fi

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não encontrado. Por favor, instale o Docker.${NC}"
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose não encontrado. Por favor, atualize o Docker.${NC}"
    exit 1
fi

# Função para exibir o cabeçalho
show_header() {
    echo -e "${GREEN}========================================"
    echo -e "   BuildSynt - Gerenciador Docker      "
    echo -e "========================================${NC}"
    echo
}

# Função para pausar
pause_and_continue() {
    echo
    echo -e "${CYAN}Pressione Enter para continuar...${NC}"
    read -r
}

# Função para menu interativo
interactive_menu() {
    while true; do
        clear
        show_header
        echo -e "${YELLOW}Escolha uma opção:${NC}"
        echo -e "  ${GREEN}1${NC} - Ambiente de Desenvolvimento"
        echo -e "  ${GREEN}2${NC} - Ambiente de Produção"
        echo -e "  ${GREEN}3${NC} - Build das Imagens"
        echo -e "  ${GREEN}4${NC} - Ver Status dos Containers"
        echo -e "  ${GREEN}5${NC} - Ver Logs"
        echo -e "  ${GREEN}6${NC} - Parar Todos os Containers"
        echo -e "  ${GREEN}7${NC} - Limpeza Completa"
        echo -e "  ${GREEN}8${NC} - Health Check"
        echo -e "  ${GREEN}9${NC} - Ajuda"
        echo -e "  ${GREEN}0${NC} - Sair"
        echo
        read -p "Digite sua opção (0-9): " choice

        case $choice in
            1) dev_environment; return ;;
            2) prod_environment; return ;;
            3) build_images; pause_and_continue ;;
            4) show_status; pause_and_continue ;;
            5) show_logs; pause_and_continue ;;
            6) stop_all; pause_and_continue ;;
            7) clean_all; pause_and_continue ;;
            8) health_check; pause_and_continue ;;
            9) show_help; pause_and_continue ;;
            0) echo -e "${GREEN}👋 Até logo!${NC}"; exit 0 ;;
            *) echo -e "${RED}Opção inválida!${NC}"; sleep 2 ;;
        esac
    done
}

# Função para ambiente de desenvolvimento
dev_environment() {
    show_header
    echo -e "${GREEN}   Ambiente de DESENVOLVIMENTO         ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "${BLUE}- Hot reload ativo${NC}"
    echo -e "${BLUE}- Debugging habilitado${NC}"
    echo -e "${BLUE}- Porta: 3000${NC}"
    echo

    if [ ! -f "docker/docker-compose.dev.yml" ]; then
        echo -e "${RED}❌ Erro: docker/docker-compose.dev.yml não encontrado${NC}"
        exit 1
    fi

    echo -e "${CYAN}🛑 Parando containers existentes...${NC}"
    docker compose -f docker/docker-compose.dev.yml down > /dev/null 2>&1 || true

    echo -e "${CYAN}🔨 Construindo e iniciando containers...${NC}"
    if docker compose -f docker/docker-compose.dev.yml up -d --build; then
        echo
        echo -e "${GREEN}✅ Ambiente de desenvolvimento iniciado!${NC}"
        echo -e "${GREEN}🌐 Frontend: http://localhost:3000${NC}"
        echo -e "${BLUE}📝 Logs: docker compose -f docker/docker-compose.dev.yml logs -f${NC}"
        echo
        show_final_status "dev"
    else
        echo -e "${RED}❌ Erro ao iniciar o ambiente de desenvolvimento${NC}"
        exit 1
    fi
}

# Função para ambiente de produção
prod_environment() {
    show_header
    echo -e "${GREEN}   Ambiente de PRODUÇÃO                ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "${BLUE}- Build otimizado${NC}"
    echo -e "${BLUE}- Nginx como servidor${NC}"
    echo -e "${BLUE}- Porta: 3000${NC}"
    echo

    if [ ! -f "docker/docker-compose.yml" ]; then
        echo -e "${RED}❌ Erro: docker/docker-compose.yml não encontrado${NC}"
        exit 1
    fi

    echo -e "${CYAN}🛑 Parando containers existentes...${NC}"
    docker compose -f docker/docker-compose.yml down > /dev/null 2>&1 || true

    echo -e "${CYAN}🔨 Construindo e iniciando containers...${NC}"
    if docker compose -f docker/docker-compose.yml up -d --build; then
        echo
        echo -e "${GREEN}✅ Ambiente de produção iniciado!${NC}"
        echo -e "${GREEN}🌐 Frontend: http://localhost:3000${NC}"
        echo -e "${BLUE}📝 Logs: docker compose -f docker/docker-compose.yml logs -f${NC}"
        echo
        show_final_status "prod"
    else
        echo -e "${RED}❌ Erro ao iniciar o ambiente de produção${NC}"
        exit 1
    fi
}

# Função para build das imagens
build_images() {
    show_header
    echo -e "${GREEN}   Build das Imagens Docker            ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo

    echo -e "${CYAN}🔨 Building imagem de desenvolvimento...${NC}"
    if [ -f "docker/docker-compose.dev.yml" ]; then
        docker compose -f docker/docker-compose.dev.yml build
    else
        echo -e "${RED}❌ Arquivo docker-compose.dev.yml não encontrado${NC}"
    fi

    echo
    echo -e "${CYAN}🔨 Building imagem de produção...${NC}"
    if [ -f "docker/docker-compose.yml" ]; then
        docker compose -f docker/docker-compose.yml build
    else
        echo -e "${RED}❌ Arquivo docker-compose.yml não encontrado${NC}"
    fi

    echo
    echo -e "${GREEN}✅ Build concluído!${NC}"
}

# Função para mostrar status
show_status() {
    show_header
    echo -e "${GREEN}   Status dos Containers               ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo

    echo -e "${YELLOW}📊 Containers de Desenvolvimento:${NC}"
    if [ -f "docker/docker-compose.dev.yml" ]; then
        docker compose -f docker/docker-compose.dev.yml ps
    else
        echo -e "${RED}❌ Arquivo docker-compose.dev.yml não encontrado${NC}"
    fi

    echo
    echo -e "${YELLOW}📊 Containers de Produção:${NC}"
    if [ -f "docker/docker-compose.yml" ]; then
        docker compose -f docker/docker-compose.yml ps
    else
        echo -e "${RED}❌ Arquivo docker-compose.yml não encontrado${NC}"
    fi

    echo
    echo -e "${YELLOW}📊 Todas as imagens BuildSynt:${NC}"
    docker images | grep buildsynt || echo -e "${YELLOW}Nenhuma imagem BuildSynt encontrada${NC}"
}

# Função para mostrar logs
show_logs() {
    show_header
    echo -e "${GREEN}   Logs dos Containers                 ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo
    echo -e "${YELLOW}Escolha qual ambiente:${NC}"
    echo -e "  ${GREEN}1${NC} - Logs Desenvolvimento"
    echo -e "  ${GREEN}2${NC} - Logs Produção"
    echo -e "  ${GREEN}3${NC} - Voltar"
    echo
    read -p "Digite sua opção (1-3): " log_choice

    case $log_choice in
        1)
            echo -e "${CYAN}📝 Logs do ambiente de desenvolvimento (Ctrl+C para sair):${NC}"
            docker compose -f docker/docker-compose.dev.yml logs -f
            ;;
        2)
            echo -e "${CYAN}📝 Logs do ambiente de produção (Ctrl+C para sair):${NC}"
            docker compose -f docker/docker-compose.yml logs -f
            ;;
        3)
            return
            ;;
        *)
            echo -e "${RED}Opção inválida!${NC}"
            sleep 2
            show_logs
            ;;
    esac
}

# Função para parar todos os containers
stop_all() {
    show_header
    echo -e "${GREEN}   Parando Todos os Containers         ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo

    echo -e "${CYAN}🛑 Parando containers de desenvolvimento...${NC}"
    docker compose -f docker/docker-compose.dev.yml down > /dev/null 2>&1 || true

    echo -e "${CYAN}🛑 Parando containers de produção...${NC}"
    docker compose -f docker/docker-compose.yml down > /dev/null 2>&1 || true

    echo
    echo -e "${GREEN}✅ Todos os containers foram parados!${NC}"
}

# Função para limpeza completa
clean_all() {
    show_header
    echo -e "${GREEN}   Limpeza Completa do Sistema         ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo
    echo -e "${RED}⚠️  ATENÇÃO: Esta operação vai remover:${NC}"
    echo "  - Todos os containers do BuildSynt"
    echo "  - Todas as imagens do BuildSynt"
    echo "  - Todos os volumes do BuildSynt"
    echo "  - Redes criadas pelo BuildSynt"
    echo

    read -p "Tem certeza? (s/N): " confirm
    if [[ ! "$confirm" =~ ^[Ss]$ ]]; then
        return
    fi

    echo -e "${CYAN}🛑 Parando todos os containers...${NC}"
    docker compose -f docker/docker-compose.dev.yml down > /dev/null 2>&1 || true
    docker compose -f docker/docker-compose.yml down > /dev/null 2>&1 || true

    echo -e "${CYAN}🗑️  Removendo containers...${NC}"
    docker compose -f docker/docker-compose.dev.yml down --remove-orphans > /dev/null 2>&1 || true
    docker compose -f docker/docker-compose.yml down --remove-orphans > /dev/null 2>&1 || true

    echo -e "${CYAN}🗑️  Removendo imagens BuildSynt...${NC}"
    docker images | grep buildsynt | awk '{print $3}' | xargs -r docker rmi > /dev/null 2>&1 || true

    echo -e "${CYAN}🗑️  Removendo volumes...${NC}"
    docker compose -f docker/docker-compose.dev.yml down -v > /dev/null 2>&1 || true
    docker compose -f docker/docker-compose.yml down -v > /dev/null 2>&1 || true

    echo -e "${CYAN}🧹 Limpando cache do Docker...${NC}"
    docker system prune -f > /dev/null 2>&1 || true

    echo
    echo -e "${GREEN}✅ Limpeza completa finalizada!${NC}"
}

# Função para health check
health_check() {
    show_header
    echo -e "${GREEN}   Health Check dos Serviços           ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo

    echo -e "${YELLOW}🔍 Verificando containers...${NC}"
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep buildsynt || echo -e "${YELLOW}Nenhum container BuildSynt encontrado${NC}"

    echo
    echo -e "${YELLOW}🔍 Verificando saúde dos containers...${NC}"
    containers=$(docker ps --format "{{.Names}}" | grep buildsynt || true)
    if [ -n "$containers" ]; then
        while IFS= read -r container; do
            echo -e "${CYAN}Container: $container${NC}"
            if docker exec "$container" curl -f http://localhost:3000 > /dev/null 2>&1; then
                echo -e "  ${GREEN}✅ Funcionando${NC}"
            else
                echo -e "  ${RED}❌ Não respondendo${NC}"
            fi
        done <<< "$containers"
    else
        echo -e "${YELLOW}Nenhum container ativo encontrado${NC}"
    fi

    echo
    echo -e "${YELLOW}🔍 Testando acesso externo...${NC}"
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend acessível em http://localhost:3000${NC}"
    else
        echo -e "${RED}❌ Frontend não acessível em http://localhost:3000${NC}"
    fi
}

# Função para mostrar status final
show_final_status() {
    local env=$1
    echo -e "${YELLOW}📊 Status dos containers:${NC}"
    sleep 3
    if [ "$env" = "dev" ]; then
        docker compose -f docker/docker-compose.dev.yml ps
    else
        docker compose -f docker/docker-compose.yml ps
    fi
    echo
    echo -e "${GREEN}🎉 Setup concluído!${NC}"

    if [ -z "$1" ] || [ "$1" = "" ]; then
        pause_and_continue
    fi
}

# Função para mostrar ajuda
show_help() {
    show_header
    echo -e "${GREEN}   BuildSynt - Script Unificado        ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo
    echo -e "${YELLOW}Uso:${NC}"
    echo "  ./buildsynt.sh [comando]"
    echo
    echo -e "${YELLOW}Comandos disponíveis:${NC}"
    echo -e "  ${GREEN}dev${NC}      - Inicia ambiente de desenvolvimento"
    echo -e "  ${GREEN}prod${NC}     - Inicia ambiente de produção"
    echo -e "  ${GREEN}build${NC}    - Constrói todas as imagens"
    echo -e "  ${GREEN}status${NC}   - Mostra status dos containers"
    echo -e "  ${GREEN}logs${NC}     - Exibe logs dos containers"
    echo -e "  ${GREEN}down${NC}     - Para todos os containers"
    echo -e "  ${GREEN}clean${NC}    - Limpa completamente o sistema"
    echo -e "  ${GREEN}health${NC}   - Verifica saúde dos serviços"
    echo -e "  ${GREEN}help${NC}     - Mostra esta ajuda"
    echo
    echo -e "${YELLOW}Exemplos:${NC}"
    echo "  ./buildsynt.sh dev      # Inicia desenvolvimento"
    echo "  ./buildsynt.sh prod     # Inicia produção"
    echo "  ./buildsynt.sh status   # Ver status"
    echo "  ./buildsynt.sh clean    # Limpeza completa"
    echo "  ./buildsynt.sh          # Menu interativo"
    echo
    echo -e "${YELLOW}Comandos úteis:${NC}"
    echo "  docker compose -f docker/docker-compose.dev.yml logs -f"
    echo "  docker compose -f docker/docker-compose.yml logs -f"
    echo "  docker compose -f docker/docker-compose.dev.yml down"
    echo
}

# Processar argumentos da linha de comando
case "${1:-}" in
    "dev")
        dev_environment
        ;;
    "prod")
        prod_environment
        ;;
    "build")
        build_images
        pause_and_continue
        ;;
    "status")
        show_status
        pause_and_continue
        ;;
    "logs")
        show_logs
        ;;
    "down")
        stop_all
        pause_and_continue
        ;;
    "clean")
        clean_all
        pause_and_continue
        ;;
    "health")
        health_check
        pause_and_continue
        ;;
    "help"|"--help"|"-h")
        show_help
        pause_and_continue
        ;;
    "")
        interactive_menu
        ;;
    *)
        echo -e "${RED}❌ Comando inválido: $1${NC}"
        echo -e "${YELLOW}Use './buildsynt.sh help' para ver os comandos disponíveis${NC}"
        exit 1
        ;;
esac
