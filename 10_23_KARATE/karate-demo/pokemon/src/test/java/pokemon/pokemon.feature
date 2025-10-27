Feature: Pokemon API Test

    Background:
        * url 'https://pokeapi.co/api/v2'

    Scenario: Get 200 service Pokemon
        Given path 'pokemon/pikachu'
        When method Get
        Then status 200
        Then match response.name == 'pikachu'

    @tagTest
    Scenario: Get 404 notFound Pokemon
        Given path 'pokemon/prueba404'
        When method Get
        Then status 404

    @exercise1
    Scenario: Get Pokemon moves and sort them by name
        Given path 'pokemon/pikachu'
        When method Get
        Then status 200
        * def movesList = karate.map(response.moves, function(x){ return x.move.name })
        * def sortedMovesList = movesList.sort()
        * match movesList == sortedMovesList
        * print '=== Primeros 5 movimientos ordenados ==='
        * def first5Moves = sortedMovesList.slice(0, 5)
        * karate.forEach(first5Moves, function(x){ karate.log('Movimiento:', x) })