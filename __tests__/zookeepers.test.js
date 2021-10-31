const fs = require('fs')
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers')
const { zookeepers } = require('../data/zookeepers.json');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const { createNewAnimal } = require('../lib/animals');

jest.mock("fs")

test('filters by query', () => {
    let unfilteredZookeepers = zookeepers.filter(zookeeper => true)

    const result1 = filterByQuery({
        age: 32,
        name: 'Alex', 
        favoriteAnimal: 'Sloths'
    }, unfilteredZookeepers)

    expect(result1[0].name).toEqual('Alex')
})

test('finds by id', () => {
    let allZookeepers = zookeepers.filter( z => true)

    let shouldBeRyan = findById('4', allZookeepers);

    expect(shouldBeRyan.name).toEqual('Ryan')
})

test('creates new zookeeper', () => {
    const newGuy = createNewZookeeper({
        name: 'newGuy',
        age: 22,
        id: '342',
        favoriteAnimal: 'goldfish'
    }, zookeepers);

    expect(newGuy.name).toEqual('newGuy');
    expect(newGuy.age).toBe(22);
    expect(newGuy.id).toEqual('342');
    expect(newGuy.favoriteAnimal).toEqual('goldfish');
})

test('validates zookeeper', () => {
    const goodKeeper = {
        name: 'blah',
        age: 23,
        id: '123',
        favoriteAnimal: 'squirrel'
    }

    const badKeeper1 = {
        name: undefined,
        age: 23,
        id: '123',
        favoriteAnimal: 'squirrel'
    }

    const badKeeper2 = {
        name: 'blah',
        age: undefined,
        id: '123',
        favoriteAnimal: 'squirrel'
    }

    const badKeeper3 = {
        name: 'blah',
        age: 23,
        id: '123',
        favoriteAnimal: undefined
    }

    expect(validateZookeeper(goodKeeper, zookeepers)).toBe(true)
    expect(validateZookeeper(badKeeper1, zookeepers)).toBe(false)
    expect(validateZookeeper(badKeeper2, zookeepers)).toBe(false)
    expect(validateZookeeper(badKeeper3, zookeepers)).toBe(false)
})