@echo off
REM ========================================
REM BuildSynt - Script Unificado Windows
REM Combina todas as funcionalidades em um só
REM ========================================

setlocal enabledelayedexpansion

REM Habilitar cores ANSI no Windows 10/11
for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j
if "%VERSION%" geq "10.0" (
    REM Tentar habilitar sequências de escape ANSI
    reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1
)

REM Mudar para o diretório raiz do projeto
cd /d "%~dp0\.."

REM Verificar se estamos no lugar certo
if not exist "frontend\package.json" (
    echo Erro: Execute este script a partir da raiz do projeto BuildSynt
    echo Uso: scripts\buildsynt.cmd [comando]
    pause
    exit /b 1
)

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo Erro: Docker nao esta instalado ou nao esta no PATH
    echo Instale o Docker Desktop e tente novamente
    pause
    exit /b 1
)

REM Verificar Docker Compose
docker compose version >nul 2>&1
if errorlevel 1 (
    echo Erro: Docker Compose nao esta disponivel
    echo Atualize o Docker Desktop
    pause
    exit /b 1
)

REM Processar comandos
set COMMAND=%1
if "%COMMAND%"=="" goto interactive_menu
if "%COMMAND%"=="help" goto show_help
if "%COMMAND%"=="--help" goto show_help
if "%COMMAND%"=="-h" goto show_help
if "%COMMAND%"=="dev" goto dev_environment
if "%COMMAND%"=="prod" goto prod_environment
if "%COMMAND%"=="build" goto build_images
if "%COMMAND%"=="status" goto show_status
if "%COMMAND%"=="logs" goto show_logs
if "%COMMAND%"=="down" goto stop_all
if "%COMMAND%"=="clean" goto clean_all
if "%COMMAND%"=="health" goto health_check
goto invalid_command

REM ========================================
REM Menu Interativo
REM ========================================
:interactive_menu
echo ========================================
echo    BuildSynt - Gerenciador Docker
echo ========================================
echo.
echo Escolha uma opcao:
echo   1 - Ambiente de Desenvolvimento
echo   2 - Ambiente de Producao
echo   3 - Build das Imagens
echo   4 - Ver Status dos Containers
echo   5 - Ver Logs
echo   6 - Parar Todos os Containers
echo   7 - Limpeza Completa
echo   8 - Health Check
echo   9 - Ajuda
echo   0 - Sair
echo.
set /p choice="Digite sua opcao (0-9): "

if "%choice%"=="1" goto dev_environment
if "%choice%"=="2" goto prod_environment
if "%choice%"=="3" goto build_images
if "%choice%"=="4" goto show_status
if "%choice%"=="5" goto show_logs
if "%choice%"=="6" goto stop_all
if "%choice%"=="7" goto clean_all
if "%choice%"=="8" goto health_check
if "%choice%"=="9" goto show_help
if "%choice%"=="0" goto end
echo Opcao invalida!
timeout /t 2 >nul
goto interactive_menu

REM ========================================
REM Ambiente de Desenvolvimento
REM ========================================
:dev_environment
echo ========================================
echo    Ambiente de DESENVOLVIMENTO
echo ========================================
echo - Hot reload ativo
echo - Debugging habilitado
echo - Porta: 3000
echo.

if not exist "docker\docker-compose.dev.yml" (
    echo Erro: docker\docker-compose.dev.yml nao encontrado
    pause
    exit /b 1
)

echo Parando containers existentes...
docker compose -f docker\docker-compose.dev.yml down >nul 2>&1

echo Construindo e iniciando containers...
docker compose -f docker\docker-compose.dev.yml up -d --build

if errorlevel 1 (
    echo Erro ao iniciar o ambiente de desenvolvimento
    pause
    exit /b 1
)

echo.
echo ✅ Ambiente de desenvolvimento iniciado!
echo 🌐 Frontend: http://localhost:3000
echo 📝 Logs: docker compose -f docker\docker-compose.dev.yml logs -f
echo.
goto show_final_status_dev

REM ========================================
REM Ambiente de Produção
REM ========================================
:prod_environment
echo [32m========================================[0m
echo [32m   Ambiente de PRODUCAO                [0m
echo [32m========================================[0m
echo [34m- Build otimizado[0m
echo [34m- Nginx como servidor[0m
echo [34m- Porta: 3000[0m
echo.

if not exist "docker\docker-compose.yml" (
    echo [31mErro: docker\docker-compose.yml nao encontrado[0m
    pause
    exit /b 1
)

echo [36mParando containers existentes...[0m
docker compose -f docker\docker-compose.yml down >nul 2>&1

echo [36mConstruindo e iniciando containers...[0m
docker compose -f docker\docker-compose.yml up -d --build

if errorlevel 1 (
    echo [31mErro ao iniciar o ambiente de producao[0m
    pause
    exit /b 1
)

echo.
echo [32m✅ Ambiente de producao iniciado![0m
echo [32m🌐 Frontend: http://localhost:3000[0m
echo [34m📝 Logs: docker compose -f docker\docker-compose.yml logs -f[0m
echo.
goto show_final_status_prod

REM ========================================
REM Build das Imagens
REM ========================================
:build_images
echo [32m========================================[0m
echo [32m   Build das Imagens Docker            [0m
echo [32m========================================[0m
echo.

echo [36mBuilding imagem de desenvolvimento...[0m
if exist "docker\docker-compose.dev.yml" (
    docker compose -f docker\docker-compose.dev.yml build
) else (
    echo [31mArquivo docker-compose.dev.yml nao encontrado[0m
)

echo.
echo [36mBuilding imagem de producao...[0m
if exist "docker\docker-compose.yml" (
    docker compose -f docker\docker-compose.yml build
) else (
    echo [31mArquivo docker-compose.yml nao encontrado[0m
)

echo.
echo [32m✅ Build concluido![0m
goto pause_and_continue

REM ========================================
REM Status dos Containers
REM ========================================
:show_status
echo [32m========================================[0m
echo [32m   Status dos Containers               [0m
echo [32m========================================[0m
echo.

echo [33m📊 Containers de Desenvolvimento:[0m
if exist "docker\docker-compose.dev.yml" (
    docker compose -f docker\docker-compose.dev.yml ps
) else (
    echo [31mArquivo docker-compose.dev.yml nao encontrado[0m
)

echo.
echo [33m📊 Containers de Producao:[0m
if exist "docker\docker-compose.yml" (
    docker compose -f docker\docker-compose.yml ps
) else (
    echo [31mArquivo docker-compose.yml nao encontrado[0m
)

echo.
echo [33m📊 Todas as imagens BuildSynt:[0m
docker images | findstr buildsynt

echo.
goto pause_and_continue

REM ========================================
REM Logs dos Containers
REM ========================================
:show_logs
echo [32m========================================[0m
echo [32m   Logs dos Containers                 [0m
echo [32m========================================[0m
echo.
echo [33mEscolha qual ambiente:[0m
echo   [32m1[0m - Logs Desenvolvimento
echo   [32m2[0m - Logs Producao
echo   [32m3[0m - Voltar
echo.
set /p log_choice="Digite sua opcao (1-3): "

if "%log_choice%"=="1" (
    echo [36mLogs do ambiente de desenvolvimento (Ctrl+C para sair):[0m
    docker compose -f docker\docker-compose.dev.yml logs -f
) else if "%log_choice%"=="2" (
    echo [36mLogs do ambiente de producao (Ctrl+C para sair):[0m
    docker compose -f docker\docker-compose.yml logs -f
) else if "%log_choice%"=="3" (
    goto interactive_menu
) else (
    echo [31mOpcao invalida![0m
    timeout /t 2 >nul
    goto show_logs
)
goto pause_and_continue

REM ========================================
REM Parar Todos os Containers
REM ========================================
:stop_all
echo [32m========================================[0m
echo [32m   Parando Todos os Containers         [0m
echo [32m========================================[0m
echo.

echo [36mParando containers de desenvolvimento...[0m
docker compose -f docker\docker-compose.dev.yml down >nul 2>&1

echo [36mParando containers de producao...[0m
docker compose -f docker\docker-compose.yml down >nul 2>&1

echo.
echo [32m✅ Todos os containers foram parados![0m
goto pause_and_continue

REM ========================================
REM Limpeza Completa
REM ========================================
:clean_all
echo [32m========================================[0m
echo [32m   Limpeza Completa do Sistema         [0m
echo [32m========================================[0m
echo.
echo [31m⚠️  ATENCAO: Esta operacao vai remover:[0m
echo   - Todos os containers do BuildSynt
echo   - Todas as imagens do BuildSynt
echo   - Todos os volumes do BuildSynt
echo   - Redes criadas pelo BuildSynt
echo.
set /p confirm="Tem certeza? (s/N): "
if /i not "%confirm%"=="s" goto interactive_menu

echo [36mParando todos os containers...[0m
docker compose -f docker\docker-compose.dev.yml down >nul 2>&1
docker compose -f docker\docker-compose.yml down >nul 2>&1

echo [36mRemovendo containers...[0m
docker compose -f docker\docker-compose.dev.yml down --remove-orphans >nul 2>&1
docker compose -f docker\docker-compose.yml down --remove-orphans >nul 2>&1

echo [36mRemovendo imagens BuildSynt...[0m
for /f "tokens=3" %%i in ('docker images ^| findstr buildsynt') do docker rmi %%i >nul 2>&1

echo [36mRemovendo volumes...[0m
docker compose -f docker\docker-compose.dev.yml down -v >nul 2>&1
docker compose -f docker\docker-compose.yml down -v >nul 2>&1

echo [36mLimpando cache do Docker...[0m
docker system prune -f >nul 2>&1

echo.
echo [32m✅ Limpeza completa finalizada![0m
goto pause_and_continue

REM ========================================
REM Health Check
REM ========================================
:health_check
echo [32m========================================[0m
echo [32m   Health Check dos Servicos           [0m
echo [32m========================================[0m
echo.

echo [33m🔍 Verificando containers...[0m
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | findstr buildsynt

echo.
echo [33m🔍 Verificando saude dos containers...[0m
for /f "tokens=1" %%i in ('docker ps --format "{{.Names}}" ^| findstr buildsynt') do (
    echo [36mContainer: %%i[0m
    docker exec %%i curl -f http://localhost:3000 >nul 2>&1
    if errorlevel 1 (
        echo [31m  ❌ Nao respondendo[0m
    ) else (
        echo [32m  ✅ Funcionando[0m
    )
)

echo.
echo [33m🔍 Testando acesso externo...[0m
curl -f http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo [31m❌ Frontend nao acessivel em http://localhost:3000[0m
) else (
    echo [32m✅ Frontend acessivel em http://localhost:3000[0m
)

goto pause_and_continue

REM ========================================
REM Status Final (Development)
REM ========================================
:show_final_status_dev
echo [33m📊 Status dos containers:[0m
timeout /t 3 >nul
docker compose -f docker\docker-compose.dev.yml ps
echo.
echo [32m🎉 Setup concluido![0m
goto pause_and_continue

REM ========================================
REM Status Final (Production)
REM ========================================
:show_final_status_prod
echo [33m📊 Status dos containers:[0m
timeout /t 3 >nul
docker compose -f docker\docker-compose.yml ps
echo.
echo [32m🎉 Setup concluido![0m
goto pause_and_continue

REM ========================================
REM Ajuda
REM ========================================
:show_help
echo [32m========================================[0m
echo [32m   BuildSynt - Script Unificado        [0m
echo [32m========================================[0m
echo.
echo [33mUso:[0m
echo   buildsynt.cmd [comando]
echo.
echo [33mComandos disponíveis:[0m
echo   [32mdev[0m      - Inicia ambiente de desenvolvimento
echo   [32mprod[0m     - Inicia ambiente de producao
echo   [32mbuild[0m    - Constroi todas as imagens
echo   [32mstatus[0m   - Mostra status dos containers
echo   [32mlogs[0m     - Exibe logs dos containers
echo   [32mdown[0m     - Para todos os containers
echo   [32mclean[0m    - Limpa completamente o sistema
echo   [32mhealth[0m   - Verifica saude dos servicos
echo   [32mhelp[0m     - Mostra esta ajuda
echo.
echo [33mExemplos:[0m
echo   buildsynt.cmd dev      # Inicia desenvolvimento
echo   buildsynt.cmd prod     # Inicia producao
echo   buildsynt.cmd status   # Ver status
echo   buildsynt.cmd clean    # Limpeza completa
echo   buildsynt.cmd          # Menu interativo
echo.
echo [33mComandos uteis:[0m
echo   docker compose -f docker\docker-compose.dev.yml logs -f
echo   docker compose -f docker\docker-compose.yml logs -f
echo   docker compose -f docker\docker-compose.dev.yml down
echo.
goto pause_and_continue

REM ========================================
REM Comando Inválido
REM ========================================
:invalid_command
echo Comando invalido: %COMMAND%
echo Use 'buildsynt.cmd help' para ver os comandos disponiveis
goto pause_and_continue

REM ========================================
REM Pausar e Continuar
REM ========================================
:pause_and_continue
echo Pressione qualquer tecla para continuar...
pause >nul
if "%COMMAND%"=="" goto interactive_menu
goto end

REM ========================================
REM Fim
REM ========================================
:end
