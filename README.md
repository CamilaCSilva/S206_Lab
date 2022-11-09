LISTAS DE EXERCÍCIO S206
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### CYPRESS
Para executar o projeto na linha de comando deve utilizar a linha de código:
```
.node_modules/.bin/cypress run --spec 'cypress/integration/aula_inatel/**/'
```

Para gerar o relatório, deve-se usar: 
```
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator. 
```

Além disso é preciso digitar as linhas abaixo no arquivo cypress.json.
```
{
    "reporter": "mochawesome",
    "reporterOptions":{ 
        "reportDir": "cypress/reports",
        "overwrite": false,
        "html": false,
        "json": true
    }
} 
```

Ápós fazer isso é só usar ox comandox abaixo para executar o projeto usar e poder visualizar o relatório html na pasta reports dentro de integration.

```
npx mochawesome-merge "cypress/reports/*json" > mochawesome.json
```
e 

```
npx marge mochawesome.json
```
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### KARATE 

Para usar o karate é necessário baixar o Maven e, pode ser necessário colocar variáveis em "Editar as variáveis de ambiente do sistema".

Para criar uma suíte de testes é só criar um arquivo .java, que tem uma classe que executará os testes, com as seguintes informações:
"
package examples;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class nomeTestRunner {
 
    @Test
    void testParallel() {
        Results results = Runner.path("classpath:aula_inatel")
                .tags("~@ignore") // organiza os testes
                //.outputCucumberJson(true)
                .parallel(5);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
    "
    
 Mas, também é possível usar tags nos testes e especificar qual teste eu quero rodar no arquivo .java. Se eu quiser rodar todos os testes é só deixar o arquivo .java como está, 
 mas se eu quiser rodar o teste com a tag @teste1 por exemplo, eu substituo '~@ignore' por:
 "
package examples;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class nomeTestRunner {
 
    @Test
    void testParallel() {
        Results results = Runner.path("classpath:aula_inatel")
                .tags("@teste1") // teste que eu quero rodar
                //.outputCucumberJson(true)
                .parallel(5);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
    "
Para escrever os testes e executá-los, cria-se um arquivo .feature e dentro desse arquivo eu coloco o meu elemento "Feature" e depois os meus cenários ou então o nome da tag
do teste em questão e depois essas informações.
Ex: Feature: Testar API X ou @teste1
     Scenario: ....          Feature: testar API x
                               Scenario: ....
                               
Escrevendo o teste pode-se criar vários cenários de teste e especificar na frente o que será testado e dentro deste cenário usar alguns elementos, como:
1. 'Given' que vai guardar a url do site que será testado;
2. 'When' que especifica método que será usado no cenário em questão, como "GET" ou "POST" por exemplo;
3. 'Then' que contém o status que eu espero como resposta da requisição que foi feita;
4. 'And' que pode ser usado para comparar informações, tipos, printar dados, entre outros.

Ex:
"
Scenario: Verificar o retorno com sucesso da API /v1/products?product_tags=Organic&product_type=lipstick com dados válidos de nome do produto e marca (request)
    Given url url_base
    Given path 'products.json?product_tags=Organic&product_type=lipstick'
    When method get 
    Then status 200
    And match response[0].name == "Lipstick"
"
                              
Para rodar os casos de teste há duas opções:
1. Instalar a extensão 'Karate Runner', apertar em 'Run' no teste que eu quero rodar ou antes de 'Feature', colocar o nome da minha classe Runner e dar enter.
2. Usar o comando mvn test -Dtest=nomeTestRunner.
Ao final de ambos vai aparecer o nome de um arquivo .html, é só copiar e colar no browser para acessar o relatório.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RESPOSTAS DA QUESTÃO 2:
1. Uma suíte de testes.
2. São testes automatizados.
3. No meio da pirâmide, são testes de integração.
4. São não-funcionais, porque os testes funcionais não focam no comportamento, e como o Karate é uma ferramenta baseada na metodologia BDD, o comportamento é o que importa.
5. Sim, porque alguns dos testes checam se o conteúdo de um atributo é válido.
6. Modificar alguma coisa no sistema, realizar a suíte de testes novamente e checar se há alguma mudança.


