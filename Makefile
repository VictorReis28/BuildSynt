# Makefile para gerenciar o ambiente BuildSynt

.PHONY: help build up down logs restart clean dev-up dev-down prod-up prod-down

# Cores para output
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
BLUE=\033[0;34m
NC=\033[0m

# Caminhos
DOCKER_DIR=./docker
SCRIPTS_DIR=./scripts
FRONTEND_DIR=./frontend

help: ## Mostra esta ajuda
	@echo "$(GREEN)BuildSynt - Gerenciamento Docker$(NC)"
	@echo ""
	@echo "$(YELLOW)Comandos disponíveis:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

# Comandos principais
build: build-frontend ## Constrói a imagem do frontend

up: prod-up ## Inicia ambiente de produção

down: ## Para todos os containers
	@echo "$(RED)Parando todos os containers...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.yml down 2>/dev/null || true
	docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml down 2>/dev/null || true

logs: ## Mostra logs do frontend
	docker compose -f $(DOCKER_DIR)/docker-compose.yml logs -f frontend 2>/dev/null || docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml logs -f frontend-dev

restart: down up ## Reinicia todos os containers

clean: ## Remove containers, volumes e imagens
	@echo "$(RED)Limpando ambiente...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.yml down -v --rmi all 2>/dev/null || true
	docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml down -v --rmi all 2>/dev/null || true
	docker system prune -f
	docker volume prune -f

# Build específico do frontend
build-frontend: ## Constrói apenas o frontend
	@echo "$(GREEN)Construindo frontend...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.yml build --no-cache frontend

build-frontend-dev: ## Constrói imagem de desenvolvimento do frontend
	@echo "$(GREEN)Construindo imagem de desenvolvimento do frontend...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml build --no-cache frontend-dev

# Comandos de desenvolvimento
dev-up: ## Inicia ambiente de desenvolvimento
	@echo "$(GREEN)Iniciando ambiente de desenvolvimento...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml up -d
	@echo "$(GREEN)Servidor de Desenvolvimento: http://localhost:3000$(NC)"
	@echo "$(BLUE)Hot Reload: Ativado$(NC)"
	@echo "$(BLUE)Status: $(NC)"
	@docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml ps

dev-down: ## Para ambiente de desenvolvimento
	@echo "$(RED)Parando ambiente de desenvolvimento...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml down

dev-logs: ## Mostra logs do ambiente de desenvolvimento
	docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml logs -f frontend-dev

dev-build: ## Constrói imagens de desenvolvimento
	@echo "$(GREEN)Construindo imagens de desenvolvimento...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml build --no-cache

# Comandos de produção
prod-up: ## Inicia ambiente de produção
	@echo "$(GREEN)Iniciando ambiente de produção...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.yml up -d
	@echo "$(GREEN)Aplicação Frontend: http://localhost:3000$(NC)"
	@echo "$(BLUE)Modo Produção: Build Otimizado$(NC)"
	@echo "$(BLUE)Status: $(NC)"
	@docker compose -f $(DOCKER_DIR)/docker-compose.yml ps

prod-down: ## Para ambiente de produção
	@echo "$(RED)Parando ambiente de produção...$(NC)"
	docker compose -f $(DOCKER_DIR)/docker-compose.yml down

prod-logs: ## Mostra logs do ambiente de produção
	docker compose -f $(DOCKER_DIR)/docker-compose.yml logs -f frontend

# Comandos de shell e debug
frontend-shell: ## Acessa shell do container frontend (produção)
	@echo "$(BLUE)Acessando shell do container frontend...$(NC)"
	docker exec -it buildsynt-frontend sh

frontend-dev-shell: ## Acessa shell do container frontend (desenvolvimento)
	@echo "$(BLUE)Acessando shell do container frontend de desenvolvimento...$(NC)"
	docker exec -it buildsynt-frontend-dev sh

# Monitoramento e status
status: ## Mostra status dos containers
	@echo "$(GREEN)Status dos Containers:$(NC)"
	@echo "$(YELLOW)Produção:$(NC)"
	@docker compose -f $(DOCKER_DIR)/docker-compose.yml ps 2>/dev/null || echo "Ambiente de produção não está executando"
	@echo "$(YELLOW)Desenvolvimento:$(NC)"
	@docker compose -f $(DOCKER_DIR)/docker-compose.dev.yml ps 2>/dev/null || echo "Ambiente de desenvolvimento não está executando"

health: ## Verifica saúde dos serviços
	@echo "$(GREEN)Verificação de Saúde:$(NC)"
	@curl -f http://localhost:3000/health 2>/dev/null && echo "$(GREEN)Frontend: OK$(NC)" || echo "$(RED)Frontend: FALHA$(NC)"

# Comandos de desenvolvimento local (sem Docker)
frontend-install: ## Instala dependências do frontend
	@echo "$(GREEN)Instalando dependências do frontend...$(NC)"
	cd $(FRONTEND_DIR) && yarn install

frontend-dev: ## Inicia frontend em modo desenvolvimento local
	@echo "$(GREEN)Iniciando servidor de desenvolvimento do frontend...$(NC)"
	cd $(FRONTEND_DIR) && yarn dev

frontend-build: ## Constrói frontend para produção
	@echo "$(GREEN)Construindo frontend para produção...$(NC)"
	cd $(FRONTEND_DIR) && yarn build

frontend-preview: ## Preview do build de produção
	@echo "$(GREEN)Iniciando servidor de preview do frontend...$(NC)"
	cd $(FRONTEND_DIR) && yarn preview

frontend-lint: ## Executa linting no frontend
	@echo "$(GREEN)Executando linting no frontend...$(NC)"
	cd $(FRONTEND_DIR) && yarn lint

frontend-type-check: ## Verifica tipos TypeScript
	@echo "$(GREEN)Verificando tipos TypeScript...$(NC)"
	cd $(FRONTEND_DIR) && yarn type-check

# Comandos de limpeza específicos
clean-frontend: ## Remove apenas containers e imagens do frontend
	@echo "$(RED)Limpando containers e imagens do frontend...$(NC)"
	docker stop buildsynt-frontend buildsynt-frontend-dev 2>/dev/null || true
	docker rm buildsynt-frontend buildsynt-frontend-dev 2>/dev/null || true
	docker rmi buildsynt/frontend:latest buildsynt/frontend:dev 2>/dev/null || true

# Comandos de backup e restore (para quando houver banco)
volumes-backup: ## Cria backup dos volumes
	@echo "$(GREEN)Criando backup dos volumes...$(NC)"
	docker run --rm -v buildsynt_nginx_logs:/data -v $(PWD)/backups:/backup alpine tar czf /backup/nginx_logs_$(shell date +%Y%m%d_%H%M%S).tar.gz -C /data .

# Comandos utilitários
inspect-network: ## Inspeciona a rede do Docker
	@echo "$(GREEN)Informações da Rede:$(NC)"
	docker network inspect buildsynt-network 2>/dev/null || echo "Rede de produção não encontrada"
	docker network inspect buildsynt-dev-network 2>/dev/null || echo "Rede de desenvolvimento não encontrada"

show-env: ## Mostra variáveis de ambiente dos containers
	@echo "$(GREEN)Variáveis de Ambiente dos Containers:$(NC)"
	@echo "$(YELLOW)Produção:$(NC)"
	@docker exec buildsynt-frontend env 2>/dev/null | grep -E "NODE_ENV|NGINX" || echo "Container de produção não está executando"
	@echo "$(YELLOW)Desenvolvimento:$(NC)"
	@docker exec buildsynt-frontend-dev env 2>/dev/null | grep -E "NODE_ENV|VITE" || echo "Container de desenvolvimento não está executando"

# Comandos de setup
setup: ## Executa configuração inicial do projeto
	@echo "$(GREEN)Executando configuração inicial do projeto...$(NC)"
	@if command -v bash >/dev/null 2>&1; then \
		chmod +x $(SCRIPTS_DIR)/buildsynt.sh && $(SCRIPTS_DIR)/buildsynt.sh; \
	else \
		echo "$(YELLOW)Use $(SCRIPTS_DIR)/buildsynt.cmd para Windows$(NC)"; \
	fi
