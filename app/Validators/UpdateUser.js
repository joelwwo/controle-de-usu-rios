'use strict'

class StoreUser {

    get rules() {
        return {
            name: 'min:2',
            email: 'email',
            password: 'min:6',
            cpf: 'min:11|max:11',
            type: 'in:master,edit,query,user'
        }
    }

    get messages() {
        return {
            'name.min': 'Por favor, informe um nome com mais de 1 caractere.',
            'email.email': 'Informe um e-mail válido.',
            'password.min': 'Por favor, informe uma senha com mais de 5 caracteres.',
            'cpf.min': 'O CPF deve possuir 11 caracteres.',
            'cpf.max': 'O CPF deve possuir 11 caracteres.',
            'type.in': 'O tipo de acesso deve ser: master, edição, consulta ou usuário.',
        }
    }

    get validateAll() {
        return true
    }

    get sanitizationRules() {
        return {
            email: 'normalize_email',
            password: 'trim',
            cpf: 'trim',
            name: 'trim',
            type: 'trim',
        }
    }

}

module.exports = StoreUser