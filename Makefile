.DEFAULT_GOAL := help
.PHONY: help install dev build build-all preview check lint verify clean reset deploy ls

NODE    := $(shell mise which node 2>/dev/null || which node)
PNPM    := PATH="$(dir $(NODE)):$$PATH" pnpm
LANDING := embelleze-landing

# uso: make dev FILTER=outro-app
FILTER  ?= $(LANDING)

help:
	@echo ""
	@echo "  embelleze-trdd workspace"
	@echo ""
	@echo "  install              instala dependências do workspace"
	@echo "  dev                  dev server  [FILTER=pacote]"
	@echo "  build                build       [FILTER=pacote]"
	@echo "  build-all            build de todos os pacotes"
	@echo "  preview              preview do último build  [FILTER=pacote]"
	@echo "  check                type check  [FILTER=pacote]"
	@echo "  lint                 alias para check"
	@echo "  verify               alias para check"
	@echo "  clean                remove todos os dist/"
	@echo "  reset                limpa node_modules e reinstala"
	@echo "  deploy               check + build + instruções de deploy"
	@echo "  ls                   lista pacotes do workspace"
	@echo ""

install:
	$(PNPM) install

dev:
	$(PNPM) --filter $(FILTER) dev

build:
	$(PNPM) --filter $(FILTER) build

build-all:
	$(PNPM) -r build

preview:
	$(PNPM) --filter $(FILTER) preview

check:
	$(PNPM) --filter $(FILTER) check

lint: check
verify: check

clean:
	find . -name "dist" -not -path "*/node_modules/*" -exec rm -rf {} + 2>/dev/null || true

reset: clean
	rm -rf node_modules
	find . -name "node_modules" -not -path "*/node_modules/*/node_modules" -exec rm -rf {} + 2>/dev/null || true
	$(PNPM) install

deploy: check build
	@echo ""
	@echo "  check e build passaram."
	@echo "  push para o branch conectado ao Railway para disparar o deploy."
	@echo ""

ls:
	$(PNPM) ls -r --depth -1
