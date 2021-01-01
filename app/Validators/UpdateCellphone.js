'use strict'

class UpdateCellphone {

    get rules() {
        return {
            description: 'min:3|max:120',
            number: 'min:11|max:11',
        }
    }

    get messages() {
        return {
            'description.min': 'Por favor, informe uma descrição com mais de 3 caracteres.',
            'description.max': 'A descrição deve possuir no máximo 120 caracteres.',
            'number.min': 'Por favor, informe um número com 11 caracteres.',
            'number.max': 'Por favor, informe um número com 11 caracteres.',
        }
    }

    get validateAll() {
        return true
    }

    get sanitizationRules() {
        return {
            description: 'trim',
            number: 'trim',
        }
    }

}

module.exports = UpdateCellphone