const service = require('../services/auth_services')
const { requestResponse } = require('../utils/index')
const logger = require('../utils/logger')

let response

const login = async (req, res) => {
	let loginResponse
	try {
		const { USERNAME, PASSWORD } = req.body
		loginResponse = await service.login({ USERNAME, PASSWORD })
		const { refreshToken, code, message, status, accessToken } = loginResponse

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		})

		response = {
			code: code,
			message: message,
			status: status,
			accessToken: accessToken
		}

	} catch (error) {
		logger.error(error)
		response = { ...requestResponse.server_error }
	}
	res.json(response)
}

const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken
		if (!refreshToken) response = { ...requestResponse.unauthorized }
		const data = await service.refreshToken(refreshToken)
		response = { ...data }
	} catch (error) {
		logger.error(error)
		response = { ...requestResponse.server_error }
	}
	res.json(response)
}

const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken
		const logout = await service.logout(refreshToken)
		res.clearCookie('refreshToken')
		response = { ...requestResponse.success }
	} catch (error) {
		logger.error(error)
		response = { ...requestResponse.server_error }
	}
	res.json(response)
}

module.exports = {
	login,
	logout,
	refreshToken
}