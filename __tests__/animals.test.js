const fs = require('fs')
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require('../lib/animals')
const { animals } = require('../data/animals.json')
jest.mock('fs')

test('creates animal object', () => {
    const animal = createNewAnimal(
        { name: 'SomeAnimal', id: '12345' }, 
        animals
    )

    expect(animal.name).toBe('SomeAnimal')
    expect(animal.id).toBe('12345')
})

test('filters by query', () => {
    const startingAnimals = [
        {
            id: '3',
            name: 'Noel',
            species: 'gorilla', 
            diet: 'omnivore',
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: '4',
            name: 'Erica',
            species: 'bear',
            diet: 'carnivore',
            personalityTraits: ['impish', 'sassy', 'brave'],
        },
    ];

    const updatedAnimals = filterByQuery({ species: 'gorilla' }, startingAnimals)

    expect(updatedAnimals.length).toEqual(1)
})

test('finds by id', () => {
    const startingAnimals = [
        {
            id: '3',
            name: 'Noel',
            species: 'gorilla', 
            diet: 'omnivore',
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: '4',
            name: 'Erica',
            species: 'bear',
            diet: 'carnivore',
            personalityTraits: ['impish', 'sassy', 'brave'],
        },
    ];

    const result = findById('3', startingAnimals)

    expect(result.name).toBe('Noel')
})

test('validates personality traits', () => {
    const animal = {
        id: '3', 
        name: 'Erica', 
        species: 'gorilla', 
        diet: 'omnivore', 
        personalityTraits: ['quirky', 'rash']
    }

    const invalidAnimal = {
        id: '3', 
        name: 'Erica', 
        species: 'gorilla', 
        diet: 'omnivore'
    }

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true)
    expect(result2).toBe(false)
})