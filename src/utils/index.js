const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const requestResponse = {
    success: {
        code: 200,
        status: true,
        message: 'BERHASIL MEMUAT PERMINTAAN'
    },
    incomplete_body: {
        code: 400,
        status: false,
        message: 'PERMINTAAN DALAM MASALAH, CEK PERMINTAAN ANDA'
    },
    unauthorized: {
        code: 401,
        status: false,
        message: 'UNAUTHORIZED'
    },
    not_found: {
        code: 404,
        status: false,
        message: 'FILE TIDAK DITEMUKAN'
    },
    unprocessable_entity: {
        code: 422,
        status: false,
        message: 'PERMINTAAN TIDAK DAPAT DI PROSES'
    },
    server_error: {
        code: 500,
        status: false,
        message: 'SERVER DALAM GANGGUAN, SILAHKAN KONTAK ADMINISTRATOR'
    },
}

module.exports = {
    requestResponse,
    upload
}