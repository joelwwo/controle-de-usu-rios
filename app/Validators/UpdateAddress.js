'use strict'

class StoreAddress {

    get rules() {
        return {
            cep: 'min:8|max:8',
            name: 'min:2',
            publicPlace: 'min:5',
            neighborhood: 'min:5',
            city: 'min:4',
            state: 'min:2',
            details: 'min:3',
            location: 'url'
        }
    }

    get messages() {
        return {
            'cep.min': 'O CEP deve possuir 8 caracteres.',
            'cep.max': 'O CEP deve possuir 8 caracteres.',
            'name.min': 'Por favor, informe um nome com mais de 1 caractere.',
            'publicPlace.min': 'Por favor, informe um endereço com mais de 5 caracteres.',
            'neighborhood.min': 'Por favor, informe uma quadra com mais de 5 caracteres.',
            'city.min': 'Por favor, informe uma cidade com mais de 3 caracteres.',
            'state.min': 'Por favor, informe um estado com mais de 1 caractere.',
            'location.url': 'A URL da localização está em um formato inválido.',
            'details.min': 'Por favor, informe um complemento com mais de 2 caracteres.',
        }
    }

    get validateAll() {
        return true
    }

    get sanitizationRules() {
        return {
            name: 'trim',
            publicPlace: 'trim',
            neighborhood: 'trim',
            city: 'trim',
            state: 'trim',
            cep: 'trim',
            location: 'trim',
        }
    }

}

module.exports = StoreAddress