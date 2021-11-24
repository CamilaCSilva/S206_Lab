@starwars
Feature: Executar testes funcionais nas APIs do Star Wars (swapi)

Scenario: Verificar o retorno com sucesso da API /people/1/ com dados válidos de requisição (request)
    Given url 'https://swapi.dev/api/people/1/'
    When method get 
    Then status 200

Scenario: Verificar o retorno com sucesso da API /people/1/ com dados inválidos de requisição (request)
    Given url 'https://swapi.dev/api/people/1/1234'
    When method get 
    # Then status 201
    Then status 404
