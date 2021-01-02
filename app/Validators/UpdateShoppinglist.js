'use strict'

class UpdateShoppinglist {

    get rules() {
        return {
            amount: 'number',
            description: 'min:5|max:400'
        }
    }

    get messages() {
        return {
            'amount.number': 'Por favor, informe um valor numérico.',
            'description.min': 'Por favor, informe uma descrição com mais de 4 caracteres.',
            'description.max': 'Por favor, informe uma descrição de no máximo 400 caracteres.'
        }
    }

    get validateAll() {
        return true
    }

    get sanitizationRules() {
        return {
            amount: 'to_int',
            description: 'trim'
        }
    }

}

module.exports = UpdateShoppinglist