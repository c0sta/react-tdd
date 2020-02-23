---
title: 'Testes e TDD com ReactJS'
disqus: hackmd
---

Testes e TDD com React
===
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)

## Table of Contents

[TOC]

## Direntes tipos de testes:
### **Testes Unitários (Unit Test)**

Um teste unitário basicamente é o teste da menor parte testável de um programa[1]. Numa linguagem funcional como o JavaScript por exemplo, a menor parte testável do código provavelmente será uma função ou um serviço, na orientação a objetos será o teste de uma classe ou os métodos de um objeto, etc. 

**Exemplo:**
Se tivessemos uma função que soma a + b, por exemplo:
``` jsx=
 function soma(a, b){
     return a + b;
}
```
Poderiamos escrever um teste para checar se o retorno da função está de acordo com o esperado.

``` jsx=
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
    
* **Ferramentas** 
     * Jest
     * [Testing Library](https://testing-library.com/)
         * **OBS** - Pelo que vi essa lib tem sido utilizada para "substituir" o Enzyme por possuir uma sintaxe simplificada, não necessitar de configuração, permitir testar os elementos da DOM e ser acessível por default, como citado na doc.  Caso queiram ver um "Overview" sobre essa lib e o que ela resolve, recomendo esse [vídeo](https://www.youtube.com/watch?v=JKOwJUM4_RM&feature=youtu.be).
     * ~~Enzyme~~ 
         * **OBS** - Durante o curso da PluralSight o instrutor mencionou que o Enzyme possui bastante issues abertas e poucas resolvidas, estando com alguns bugs que podem afetar no desenvolvimento dos testes.

### **Teste de Snapshot (Snapshot Test)**
Um teste de Snapshot geralmente renderiza os elementos HTML do componente, convertendo para um JSON e armazena esse objeto para comparar com as próximas imagens ao longo do teste. Caso haja alteração da imagem o teste irá falhar. Garantindo que a interface da aplicação não mudará de forma inesperada.
> Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.
 [name= Jest — [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)]

![Snapshot Test](https://i.imgur.com/Ec0OVgK.png)
    
* **Ferramentas**
    * Jest
    * [react-test-renderer](https://github.com/facebook/react/tree/master/packages/react-test-renderer)
    
### **Teste End-to-End(E2E)**
Os testes End-to-end testam a interação entre múltiplos componentes, simulando a interação do usuário final com o sistema, permitindo que realizemos automações das interações como inputs, clicks, navegações, etc. 
    
![E2E Test](https://i.imgur.com/41is7l1.png)
    
* **Ferramentas**
    *  [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)
    *  Protractor

## Ferramentas
### Jest
* Função do Jest
* Métodos mais usados
    * afterEach()
    * beforeEach()
    * expect()
    * toBe()
    * jest.fn()

#### [Jest Globals](https://jestjs.io/docs/en/api)
As *Jest Globals* são métodos globais que não precisam ser importados. Esses métodos podem ser usados para **pular** ou **isolar** um teste, ou até mesmo executar um bloco de código antes ou depois da execução do teste.
**Exemplos:**
* [afterEach()](https://jestjs.io/docs/en/api#aftereachfn-timeout) / [afterAll()](https://jestjs.io/docs/en/api#afterallfn-timeout)
* [beforeEach()](https://jestjs.io/docs/en/api#beforeeachfn-timeout) / [beforeAll()](https://jestjs.io/docs/en/api#beforeallfn-timeout) 
* test.skip()
* test.only()

Referência - https://jestjs.io/docs/en/api  

#####  **Isolando Testes -** `test.only()`
Ao adicionar o método `.only()` no teste, é possível **isolá-lo**, para que apenas ele seja executado.
**Exemplo:**
```jsx=
    test.only('it is raining', () => {
      expect(inchesOfRain()).toBeGreaterThan(0);
    });

    test('it is not snowing', () => {
      expect(inchesOfSnow()).toBe(0);
    });
```
Apenas o teste "it is raining" será executado.
Referência - https://jestjs.io/docs/en/api#testonlyname-fn-timeout

##### **Pulando Testes -** `test.skip()`
Se quisermos ignorar um teste que está falhando e que não podemos concertá-lo na hora, podemos usar o método `.skip()` para ignorar o teste.
**Exemplo:**
```jsx=
    test('it is raining', () => {
      expect(inchesOfRain()).toBeGreaterThan(0);
    });

    test.skip('it is not snowing', () => {
      expect(inchesOfSnow()).toBe(0);
    });
```
Referência - https://jestjs.io/docs/en/api#testskipname-fn
#### Docs
1. [Jest CheatSheet](https://devhints.io/jest)
2. [Referencia p/ docs](https://jestjs.io/docs/en/expect#expectvalue)
    
### Testing Library - React
* Função do Testing Library 
    * Transformar os componentes para elementos DOM (*Document Object Model*)
    >  The main utilities it provides involve querying the DOM for nodes in a way that's similar to how the user finds elements on the page. In this way, the library helps ensure your tests give you confidence that your application will work when a real user uses it.
    > Referência - https://testing-library.com/docs/intro#this-solution
* Métodos mais usados 
    * renderIntoDocument()
    * render()
    * fireEvent()
        * button click
            * exemplo
    * queries
        * getByText()
        * getByTestId()
        * queryByText()
        * findByPlaceHolderText()
    * cleanup - O que ele faz?
* CheatSheet p/ consulta 
    * https://testing-library.com/docs/dom-testing-library/cheatsheet
* Referência p/ docs
    * https://testing-library.com/

### ReactDOM
* Função da lib ReactDOM
* react-dom/test-utils
    * act()
* Métodos que vamos usar
    * unmountComponentAtNode()
    * render()


### react-test-renderer 
* Função do react-test-render
* Falar sobre Snapshot testing e quando usar
> Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.
 [name= Jest — [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)]
* Métodos mais usados
* Exemplos
* Referência

Referência - https://pt-br.reactjs.org/docs/testing.html

### Cypress 
* Função do Cypress
* Instalação
    * yarn add --dev cypress
    * No campo `scripts: {...}` do arquivo ` package.json` , adicionar `"e2e": "cypress open"`
    * Executar o comando `yarn e2e`
* Funções principais
Referência - https://www.youtube.com/watch?v=0aAdglT39go&list=PLXXnezSEtvNMlfJFd1Z2wilxymcOaVl9Q&index=1
Doc - https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell
## Exemplos

* [Testing Form w/ Submit](https://github.com/gleandroj/gsw-challenge/blob/master/front/src/components/Form.test.js)
* [Testing Pagination Component](https://github.com/gleandroj/gsw-challenge/blob/master/front/src/components/TablePaginationActions.test.js)
* 

## Bibliografia

1. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3) 
2. [Testes automatizados em React - **LuizaLabs** ](https://medium.com/luizalabs/testes-automatizados-em-react-e431db826d65)
3. [**PluralSight**  - Testing React Applications w/ Jest](https://app.pluralsight.com/library/courses/testing-react-applications-jest/table-of-contents)
4. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3)
5. [Visão Geral sobre Testes](https://pt-br.reactjs.org/docs/testing.html)
6. [Unit Testing React Components](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2)


## Appendix and FAQ

:::info
**Find this document incomplete?** Leave a comment!
:::

###### tags: `Templates` `Documentation`
