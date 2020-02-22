# Jest + ReactJS

## Direntes tipos de testes:
### **Testes Unitários (Unit Test)**

Um teste unitário basicamente é o teste da menor parte testável de um programa[1]. Numa linguagem funcional como o JavaScript por exemplo, a menor parte testável do código provavelmente será uma função ou um serviço, na orientação a objetos será o teste de uma classe ou os métodos de um objeto, etc. 

**Exemplo:**
Se tivessemos uma função que soma a + b, por exemplo:
``` JS
  function soma(a, b){
      return a + b;
}
```
Poderiamos escrever um teste para checar se o retorno da função está de acordo com o esperado.

``` JS
const resultado = soma(1,2);

test('adds 1 + 2 to equal 3', () => {
  expect(resultado).toBe(3);
});
```

![Unit Test](https://i.imgur.com/ftRlWBf.png)

* **Ferramentas** 
    * Mocha 
    * Jest

### **Teste de Componente (Component Test)**
Testa um componente individualmente, afim de verificar se seu funcionamento e sua renderização está ocorrendo da maneira correta.
    
![Component Test](https://i.imgur.com/zDz63vk.png)
    
* Ferramentas 
     * Jest
     * [Testing Library](https://testing-library.com/)
         * **OBS** - Pelo que vi essa lib tem sido utilizada para "substituir" o Enzyme por possuir uma sintaxe simplificada, não necessitar de configuração, permitir testar os elementos da DOM e ser acessível por default, como citado na doc.  Caso queiram ver um "Overview" sobre essa lib e o que ela resolve, recomendo esse [vídeo](https://www.youtube.com/watch?v=JKOwJUM4_RM&feature=youtu.be).
     * ~~Enzyme~~ 
         * **OBS** - Durante o curso da PluralSight o instrutor mencionou o Enzyme esta com muitas issues abertas e poucas resolvidas, estando com alguns bugs que podem afetar no desenvolvimento dos testes.

### **Teste de Snapshot (Snapshot Test)**
Um teste de Snapshot geralmente renderiza os elementos HTML do componente, convertendo para um JSON e guarda esse objeto para comparar com as próximas imagens de referência ao longo do teste. Caso haja alteração da imagem o teste irá falhar. Garantindo que a interface da aplicação não mudará de forma inesperada.

![Snapshot Test](https://i.imgur.com/Ec0OVgK.png)
    
* **Ferramentas**
    * Jest
    * [react-test-renderer](https://github.com/facebook/react/tree/master/packages/react-test-renderer)
### **End-to-End Test**
Testa a interação entre múltiplos componentes e simula a interação do usuário com o sistema, realizando inputs, clicks, navegações, etc. 
    
![E2E Test](https://i.imgur.com/41is7l1.png)
    
* **Ferramentas**
    *  Cypress
    *  Protractor

## Testando Componentes React

No geral, temos duas maneiras centrais de testar componentes React: 
* Renderizando árvores de componentes e confirmando seus outputs
* Executando uma aplicação completa em um navegador, simulando o usuário final utilizando a aplicação já com os dados reais (End-to-End)




Referência - https://pt-br.reactjs.org/docs/testing.html



## [Jest Globals](https://jestjs.io/docs/en/api)

As *Jest Globals* são métodos globais que não precisam ser importados. Esses métodos podem ser usados para **pular** ou **isolar** um teste, ou até mesmo executar um bloco de código antes ou depois da execução do teste.

OBS - Acho que os métodos que utilizaremos mais e podem ser úteis pra gente, são: 

* beforeEach()/beforeAll()
* afterEach()/afterAll()
* test.skip()
* test.only()


Referência - https://jestjs.io/docs/en/api 

### Alguns exemplos dos Globals: 
####  **Isolando Testes -** `test.only()`
Ao adicionar o método `.only()` ao teste, é possível **isolá-lo**, para que apenas ele seja executado.
**Exemplo:**

    test.only('it is raining', () => {
      expect(inchesOfRain()).toBeGreaterThan(0);
    });

    test('it is not snowing', () => {
      expect(inchesOfSnow()).toBe(0);
    });

Apenas o teste "it is raining" será executado.
Referência - https://jestjs.io/docs/en/api#testonlyname-fn-timeout

#### **Pulando Testes -** `test.skip()`
Se quisermos ignorar um teste que está falhando e que não podemos concertá-lo na hora, podemos usar o método `.skip()` para ignorar o teste.
**Exemplo:**

    test('it is raining', () => {
      expect(inchesOfRain()).toBeGreaterThan(0);
    });

    test.skip('it is not snowing', () => {
      expect(inchesOfSnow()).toBe(0);
    });

Referência - https://jestjs.io/docs/en/api#testskipname-fn

### Bibliografia

1. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3) 
2. [Testes automatizados em React - **LuizaLabs** ](https://medium.com/luizalabs/testes-automatizados-em-react-e431db826d65)
3. [**PluralSight**  - Testing React Applications w/ Jest](https://app.pluralsight.com/library/courses/testing-react-applications-jest/table-of-contents)
4. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3)
5. [Visão Geral sobre Testes](https://pt-br.reactjs.org/docs/testing.html)
6. [Unit Testing React Components](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2)