'use strict'

class StoreAddress {

    get rules() {
        return {
            cep: 'min:7|max:7',
            name: 'required|min:2',
            publicPlace: 'required|min:5',
            neighborhood: 'required|min:5',
            city: 'required|min:4',
            state: 'required|min:2',
            location: 'url'
        }
    }

    get messages() {
        return {
            'cep.min': 'O CEP deve possuir 7 caracteres.',
            'cep.max': 'O CEP deve possuir 7 caracteres.',
            'name.required': 'Informe um nome para esse endereço como: casa, por exemplo.',
            'name.min': 'Por favor, informe um nome com mais de 1 caractere.',
            'publicPlace.required': 'Por favor, informe o endereço.',
            'publicPlace.min': 'Por favor, informe um endereço com mais de 5 caracteres.',
            'neighborhood.required': 'Por favor, o informe a quadra.',
            'neighborhood.min': 'Por favor, informe uma quadra com mais de 5 caracteres.',
            'city.required': 'Por favor, o informe a cidade.',
            'city.min': 'Por favor, informe uma cidade com mais de 3 caracteres.',
            'state.required': 'Por favor, o informe o estado.',
            'state.min': 'Por favor, informe um estado com mais de 1 caractere.',
            'location.url': 'A URL da localização está em um formato inválido.',
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