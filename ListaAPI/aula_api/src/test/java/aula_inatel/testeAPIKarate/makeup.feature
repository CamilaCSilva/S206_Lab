@makeup
Feature: Executar testes funcionais na API Makeup 
# (https://makeup-api.herokuapp.com/)
 
Background: Executar antes de cada teste
    * def url_base = 'https://makeup-api.herokuapp.com/api/v1/'

Scenario: Verificar o retorno com sucesso da API /v1/products.json?product_tags=Organic&product_type=lipstick com dados válidos de requisição (request)
    Given url url_base
    Given path 'products.json?product_tags=Organic&product_type=lipstick'
    When method get 
    Then status 200

Scenario: Verificar o retorno com sucesso da API /v1/products.json?product_tags=Organic&product_type=lipstick com dados inválidos de requisição (request)
    Given url url_base
    Given path 'products.json?product_tags=Organic&product_type=lipstick1%#34'
    When method get 
    Then status 400

Scenario: Verificar o retorno com sucesso da API /v1/products?product_tags=Organic&product_type=lipstick com dados válidos de nome do produto e marca (request)
    Given url url_base
    Given path 'products.json?product_tags=Organic&product_type=lipstick'
    When method get 
    Then status 200
    And match response[0].name == "Lipstick"
    And match response[0].brand == "boosh"
 
Scenario: Verificar o retorno com sucesso da API /v1/products?product_tags=Organic&product_type=lipstick com dados válidos de requisição (request)
    Given url url_base
    Given path 'products.json?product_tags=Organic&product_type=lipstick'
    When method get 
    Then status 200
    And match response[0].product_colors[0].colour_name == 'Babs'

Scenario: Verificar o retorno com sucesso da API /v1/products?product_tags=Organic&product_type=lipstick com dados inválidos de requisição (request)
    Given url url_base
    Given path 'products.json?product_tags=Organic&product_type=lipstick'
    When method get 
    Then status 200
    And match response[0].product_colors[0].hex_value != 'CB4975'

Scenario: Verifica se o segundo lipstick tem a cor com nome Rosie 
    Given url url_base
    Given path 'products.json?product_tags=Organic&product_type=lipstick'
    When method get 
    Then status 200
    And match response[0].product_colors[1].colour_name == 'Rosie'

Scenario: Verificar o se o nome do Blush é uma string
    Given url url_base
    Given path 'products.json?product_tags=Natural&product_type=blush'
    When method get
    Then status 200
    And match each $ contains {name:'#string'}

Scenario: Tentar fazer um post e printar o tamanho
    Given url url_base
    Given path 'products.json?product_tags=Natural&product_type=blush'
    And request {brand:'MakeB',name:"Beauty Blush",price:"20.50"} 
    When method post 
    Then status 201    
    And print karate.sizeOf(response)
