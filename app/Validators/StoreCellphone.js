'use strict'

class StoreCellphone {

    get rules() {
        return {
            description: 'required|min:3|max:120',
            number: 'unique:cellphones|required|min:11|max:11',
        }
    }

    get messages() {
        return {
            'description.required': 'Informe a descrição.',
            'description.min': 'Por favor, informe uma descrição com mais de 3 caracteres.',
            'description.max': 'A descrição deve possuir no máximo 120 caracteres.',
            'number.required': 'Informe o número.',
            'number.min': 'Por favor, informe um número com 11 caracteres.',
            'number.max': 'Por favor, informe um número com 11 caracteres.',
            'number.unique': 'O número informado já está em uso em outra conta.',
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

module.exports = StoreCellphone