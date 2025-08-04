# 🚀 BuildSynt - Scripts de Gerenciamento

## 📁 Scripts Disponíveis

### 🖥️ Windows

- **`buildsynt.cmd`** - Script completo Windows (Menu + Comandos)

### 🐧 Linux/macOS

- **`buildsynt.sh`** - Script completo Unix (Menu + Comandos)

## 🎯 Uso Rápido

### Menu Interativo (Recomendado)

```bash
# Windows
scripts\buildsynt.cmd

# Linux/macOS (primeiro tornar executável)
chmod +x scripts/buildsynt.sh
./scripts/buildsynt.sh
```

### Comandos Diretos

```bash
# Windows
scripts\buildsynt.cmd dev      # Desenvolvimento
scripts\buildsynt.cmd prod     # Produção
scripts\buildsynt.cmd status   # Ver status
scripts\buildsynt.cmd clean    # Limpeza completa

# Linux/macOS
./scripts/buildsynt.sh dev     # Desenvolvimento
./scripts/buildsynt.sh prod    # Produção
./scripts/buildsynt.sh status  # Ver status
./scripts/buildsynt.sh clean   # Limpeza completa
```

## ⚡ Comandos Disponíveis

| Comando  | Descrição                                |
| -------- | ---------------------------------------- |
| `dev`    | Ambiente de desenvolvimento (hot reload) |
| `prod`   | Ambiente de produção (otimizado)         |
| `build`  | Constrói todas as imagens                |
| `status` | Status de todos os containers            |
| `logs`   | Logs dos containers (submenu)            |
| `down`   | Para todos os containers                 |
| `clean`  | Limpeza completa (com confirmação)       |
| `health` | Health check dos serviços                |
| `help`   | Ajuda detalhada                          |

## 🌐 Acesso

Após iniciar qualquer ambiente:

- **Frontend:** <http://localhost:3000>

## 🆘 Comandos de Emergência

```bash
# Parar tudo rapidamente
scripts\buildsynt.cmd down     # Windows
./scripts/buildsynt.sh down    # Linux

# Reset completo
scripts\buildsynt.cmd clean    # Windows
./scripts/buildsynt.sh clean   # Linux
```
