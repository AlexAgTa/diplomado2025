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
        * def bubbleSort = 
        """
            function(arr) {
                var len = arr.length;
                var swapped;
                for(var i = 0; i < len; i++) {
                    swapped = false;
                    for(var j = 0; j < len - i - 1; j++) {
                        if(arr[j] > arr[j + 1]) {
                            // Intercambiar elementos
                            var temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                            swapped = true;
                        }
                    }
                    // Si no hubo intercambios en esta pasada, el array está ordenado
                    if(!swapped) {
                        break;
                    }
                }
                return arr;
            }
        """
        * def sortedMovesList = bubbleSort(movesList)
        * def originalList = movesList.sort()
        * match sortedMovesList == originalList
        * print '=== Primeros 5 movimientos ordenados ==='
        * def first5Moves = sortedMovesList.slice(0, 5)
        * karate.forEach(first5Moves, function(x){ karate.log('Movimiento:', x) })

    @evolution
    Scenario: Get evolution chain of Bulbasaur
        Given path 'pokemon/bulbasaur'
        When method Get
        Then status 200
        * def pokemonResponses = response

        # 1. Obtener la URL de la especie de Pokémon
        * def speciesUrl = pokemonResponses.species.url
        * print 'Species URL: ', speciesUrl

        # 2. Hacer una solicitud GET al endpoint Species
        Given url speciesUrl
        When method Get
        Then status 200 
        * def speciesResponses = response
        * def evolutionChainUrl = speciesResponses.evolution_chain.url
        * print 'Evolution Chain URL: ', evolutionChainUrl

        # 3. Hacer una solicitud GET al endpoint Evolution Chain
        Given url evolutionChainUrl
        When method Get
        Then status 200
        * def evolutionResponses = response

        # 4. Extraer y mostrar la cadena de evolución
        * def nameEvolutionOne = evolutionResponses.chain.evolves_to[0].species.name
        * print 'Primera evolución de Bulbasaur es: ', nameEvolutionOne

        * def nameEvolutionTwo  = evolutionResponses.chain.evolves_to[0].evolves_to[0].species.name
        * print 'Segunda evolución de Bulbasaur es: ', nameEvolutionTwo

        * match nameEvolutionOne == 'ivysaur'
        * match nameEvolutionTwo == 'venusaur'