/** @format */

import i18n from 'i18n'
import path from 'path'
import { fileURLToPath } from 'url'

// 1. Setup para Módulos ES6 (para obter __dirname)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 2. Configuração do i18n
i18n.configure({
	// Idiomas suportados
	locales: ['pt_BR', 'en'],

	// Idioma padrão (usado se não souber o idioma do usuário)
	defaultLocale: 'pt_BR',

	// Caminho da pasta onde os arquivos JSON estarão (ex: na pasta "locales" na raiz do projeto)
	directory: path.join(__dirname, '..', 'locales'),

	// Usa notação de objeto, permitindo chaves aninhadas (ex: "VALIDATION.STATUS")
	objectNotation: true,

	// Recarrega os arquivos automaticamente se forem alterados (ótimo para desenvolvimento)
	autoReload: true,

	// Nome da variável global que será usada para traduzir. Usaremos '__' (dois underscores).
	register: global,
})

export default i18n
