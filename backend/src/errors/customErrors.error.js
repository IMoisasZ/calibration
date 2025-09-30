class CustomError extends Error {
	constructor(message, status) {
		super(message)
		this.name = this.constructor.name
		this.status = status
	}
}

class NotFoundError extends CustomError {
	constructor(message = 'Resource not found') {
		super(message, 404)
	}
}

class BadRequestError extends CustomError {
	constructor(message = 'Bad request') {
		super(message, 400)
	}
}

class AlreadyAdded extends CustomError {
	constructor(message = 'Bad request') {
		super(message, 400)
	}
}

export { CustomError, NotFoundError, BadRequestError, AlreadyAdded }
