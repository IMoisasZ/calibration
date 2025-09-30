import multer, { diskStorage } from 'multer'
import { extname, resolve } from 'path'
import { existsSync, mkdirSync } from 'fs' // Importe o módulo 'fs'
import { cwd } from 'process'

const uploadDir = resolve(cwd(), 'src', 'uploads', 'certificates')

// Garante que o diretório de upload exista
if (!existsSync(uploadDir)) {
	mkdirSync(uploadDir, { recursive: true }) // O 'recursive: true' cria pastas aninhadas
}

// Configuração de armazenamento: onde e como o arquivo será salvo.
const storage = diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir)
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname))
	},
})

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'application/pdf') {
			cb(null, true)
		} else {
			cb(
				new Error(
					'Formato de arquivo não suportado. Apenas PDFs são permitidos.'
				),
				false
			)
		}
	},
})

export default upload
