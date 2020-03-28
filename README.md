![size](https://img.shields.io/github/languages/code-size/c0sta/react-tdd)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)  

TDD + ReactJS
===

# Table of Contents
[TOC]

# Overview
Resumão do que consegui encontrar até agora sobre testes com React, peguei bastante coisa de artigos e cursos da internet, os artigos e cursos do youtube estão tudo na bibliografia pra gente consultar caso a gente precise. 
Tentei focar mais nos Testes Unitários, mostrando alguns métodos mais usados das ferramenta que possivelmente vamos usar, tentei pegar o máximo de exemplos com React e Hooks que achei, caso encontrem mais só ir adicionando aqui pra gente poder consultar.

# Testes em ReactJS
Realizamos testes para nos certificar que nossa aplicação vai funcionar como esperamos para nosso **usuário final**. Fazer os testes vai deixar nosso sistema bem mais robusto mas em compensação será menos propício a ter bugs e erros.

## O que testar e o que não testar?
Em nossos testes devemos focar em testar `funcionalidades` e nos certificar que essas funcionalidades irão funcionar corretamente para o usuário final.
Mas e o que não testar? 
Seguindo a filosofia do [Kent C. Dodds](https://kentcdodds.com/about/), nós não deveriamos testar detalhes de implementação, ou seja, testar coisas que não importam para o usuário final, como nomes de funções ou váriaveis.
Devemos focar em testar se os Componentes funcionam e renderizam corretamente, se componentes que interagem entre si estão integrados corretamente, etc. 

>  Your tests should test the functionality of the app, that mimic how it will be used by your end users. This will give you confidence that your app will function as intended in your production environment.  We will of course go into much more detail through out this article but this is the basic gist of it.
>  [name=[How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/)]
### Referência
* [How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/)
:::info
:pushpin: **OBS:**  Peguei esse trecho deste artigo (recomendo que deêm uma lida nele, acho que é o guia mais completo sobre o tema que achei).
:::

## Enzyme 
Uma lib desenvolvida pela equipe do `AirBnB` que facilita a criação de testes de componentes React.

>Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.
> [name=[Enzyme](https://airbnb.io/enzyme/)]

### Estrutura de um Teste com Enzyme
```jsx=
import React from 'react';
import { shallow } from 'enzyme';
 
import List from './List';
import ListItem from './ListItem';
 
describe('<List />', () => {
  it('renders three <ListItem /> components', () => {
    const wrapper = shallow(<List />);
    expect(wrapper.find('.List')).to.have.lengthOf(3);
  });
 
  it('renders children when passed in', () => {
    const wrapper = shallow((
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });
 

});
```
* `shallow()` - Esse método renderiza o componente que passarmos para ele, individualmente, sem renderizar os componentes filhos. 
* `contains()` - Com esse método podemos verificar se nosso componente contém ou não, algo que buscamos.

### Mount *vs* Shallow 
O método `mount` realiza a renderização completa do componente, renderizando seus componentes filhos também. Já o `shallow` monta apenas o componente individualmente, sem seus filhos.

Considerando esse Componente Pai e Filho

```jsx=
import React from 'react';

const App = () => {
  return (
    <div> 
      <ChildComponent /> 
    </div> 
  )
}

const ChildComponent = () => {
  return (
    <div>
     <p> Child components</p>
    </div>
  )
}
```

Se usassemos o `shallow`:

```jsx=
<App>
  <div> 
    <ChildComponent /> 
  </div>
</App> 
```

Agora com o `mount`:

```jsx=
<App>
  <div> 
    <ChildComponent> 
      <div>
       <p> Child components</p>
      </div>
    </ChildComponent>
   </div>
</App> 
```
Geralmente usamos o `mount` para testes de integração e o `shallow` para testes unitários.

### Referência
1. [How to Test React Components: The completeuide](https://www.freecodecamp.org/news/testing-react-hooks/)

## Jest [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest) 
Framework de teste padrão do`create-react-app`, com ele podemos fazer testes de Snapshot, Asserções, usar Spies e criar Mocks.

### Estrutura de um Teste

```jsx=
describe('makePoniesPink', () => {
  beforeAll(() => {
    /* Runs before all tests */
  })
  afterAll(() => {
    /* Runs after all tests */
  })
  beforeEach(() => {
    /* Runs before each test */
  })
  afterEach(() => {
    /* Runs after each test */
  })
  
  test('make each pony pink', () => {
    const actual = fn(['Alice', 'Bob', 'Eve'])
    expect(actual).toEqual(['Pink Alice', 'Pink Bob', 'Pink Eve'])
  })
})
```
* `describe()` - Como parâmetro nós devemos passar primeiro uma String que dirá o que estamos testando(ex: Qual Componente), e depois uma função contendo os testes. Geralmente um `describe` envolve um conjunto de testes sobre o mesmo contexto.
    * **Exemplo** - Poderiamos ter um conjunto de testes de um formulário, e dentro dele ter testes individuais para verificar a validação dos campos e outro para testar o submit, por exemplo.
    ```jsx=
        describe('formComponent', () => {
            it('validates form correctly', () => {...})
            it('should submit data on click', () => {...})
        })
     ```
    
* `test()` **ou** `it()` - Nesses métodos nós passamos como primeiro parâmetro uma String dizendo que funcionalidade estamos testando e como segundo parâmetro uma função contendo nosso teste. Geralmente usamos `expect` em conjunto com alguns [matchers](https://jestjs.io/docs/en/using-matchers) para fazer algumas asserções e verificar se está tudo funcionando como deveria.
### Referências
1. [Jest CheatSheet](https://github.com/sapegin/jest-cheat-sheet/blob/master/Readme.md) Nesse link tem uma junção dos métodos/matchers/mocks/etc. Que podemos usar do Jest.
2. [Docs](https://jestjs.io/docs/en/getting-started)
3. [Expect method](https://jestjs.io/docs/en/expect)
4. [Only method](https://jestjs.io/docs/en/api#testonlyname-fn-timeout)
5. [Skip method](https://jestjs.io/docs/en/api#testskipname-fn)

## End-to-End Tests (E2E)
### Cypress
O Cypress é usado para testes End-to-end testando a interação entre múltiplos componentes, simulando a interação do usuário final com o sistema e permitindo que realizemos automações de interações como inputs, clicks, navegações, etc. Alguns de seus prós é não precisar de configurações e ser 
> A tool for *reliably* testing *anything* that runs in web browser.
> [name=[Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)]

## React Testing Library 
Essa lib tem como proposta permitir que nós devs, busquemos elementos como o usuário final buscaria. O usuário geralmente buscaria um botão ou um título pelo seu texto, um `input` pelo seu `placeholder` ou por seu`label` do formulário. Dessa forma, podemos testar nosso sistema mais ou menos do modo que ele será usado. 

>  The more your tests resemble the way your software is used, the more confidence they can give you.
> [name=[react-testing-library](https://testing-library.com/docs/guiding-principles)]


### :memo: Métodos mais usados

#### 1. **[render](https://testing-library.com/docs/react-testing-library/api#render)** 
 O método da DOM e retorna uma série de funções para testar esse mesmo Componente.
    
**Exemplo**
```jsx=
const url = '/greeting'
const { getByText, getByTestId, getByLabelText } = render(
      <Fetch url={url} />
)
```

#### 2. **[fireEvent](https://testing-library.com/docs/dom-testing-library/api-events#fireevent)** 
 Um método conveniente para disparar eventos na DOM. 

:::info
**:pushpin: OBS** - Reparem que no exemplo estou "selecionando" o botão pelo texto dele. (mto foda pqp)
:::
**Exemplo com o evento `.click()`:**
```jsx=
it('Text in state is changed when button clicked', () => {
    const { getByText } = render(<TestHook />);

    expect(getByText(/Initial/i).textContent).toBe("Initial State")

    fireEvent.click(getByText("State Change Button"))

    expect(getByText(/Initial/i).textContent).toBe("Initial State Changed")
})

```
       
#### 3. **[cleanup](https://testing-library.com/docs/react-testing-library/api#cleanup)** 
O `cleanup()` é um método importado da [testing-library/react](https://testing-library.com/docs/preact-testing-library/api#cleanup) que basicamente realiza uma limpeza de `containers` gerados pelo teste na DOM.
    
> Unmounts the component from the container and destroys the container.
>[name= [cleanup docs](https://testing-library.com/docs/preact-testing-library/api#cleanup)]

**OBS** - Geralmente usado dentro do método `afterEach()`
   
**Exemplo com o `afterEach()`**
```jsx=
afterEach(cleanup)
```


### **[Queries](https://testing-library.com/docs/dom-testing-library/api-queries)**

**Variações das Queries**

| Queries Variantes | Return | 
| --------         | -------- | 
| getBy             | Element ou Error     | 
| getAllBy         | Element[ ] ou Error     | 
| queryBy         | Element ou null     | 
| queryAllBy     | Element[ ] ou [ ]  | 
| findBy             | Promise<Element> or Error | 
| findAllBy         | Promise<Element[]> or Error     | 

**Tipos que podem ser adicionados a Querie**

| Queries Variantes | Atributo DOM | 
| --------         | -------- | 
|   Text           | ```<h2>Text</h2>```      | 
| PlaceholderText        | ```<input placeholder="username" />```     | 
|     LabelText     | ```<label for="element" />```     | 
| AltText     | ```<img alt="movie poster" />```  | 
| Title             | ```<span title="Delete" />``` | 
| DisplayValue         | Valor atual de um `input`     | 
| Role         | ```<div role="dialog">...</div>```    | 
| TestId         | ```<input data-testid="username-input" />```    | 


#### **Exemplos de Queries:**

* **Para buscar pelo texto** - `getByText()`

```jsx=
it('renders correctly title', () => {
  const { getByText } = render(<App>
                                <Header title="Hey there folk" />
                               </App>)

  expect(getByText(/Hey there/i).textContent).toBeInTheDocument()
})
```
* **Buscando Imagens pelo `alt`** - `getByAltText()`

```jsx=
it('renders image correctly', () => {
  const { getByAltText } = render(<img alt="company logo" />)

  expect(getByAltText(/company logo/i)).toBeInTheDocument()
})
```

* **Quando temos um elemento com testId** - `getByTestId()`
```jsx=
it('renders modal correctly', () => {
const { getByTestId } = render(<div data-testid="container-modal">...</div>)

  expect(getByTestId(/container-modal/i)).toBeInTheDocument()
})
```
:::info
**:pushpin: OBS:** Usar o `getByPlaceholderText` apenas se seu input **não** tiver um label — **o que é menos acessível!**
:::
### **CheatSheet Completa**
![CheatSheet](https://i.imgur.com/3BrquRY.jpg)


### Referencias
1. [React Book - React Testing Library](https://softchris.github.io/books/react/react-testing-library/) 
2. [Docs](https://testing-library.com/)

---

## Axios Mock

* Função do Axios Mock
* Config?
* Como criar Mocks simples com ele


---


# Exemplos
To salvando aqui alguns exemplos que podem ser úteis pra gente, alguns links são tutoriais, outros vídeos e outros repositórios:
* [Testing Form w/ Submit](https://github.com/gleandroj/gsw-challenge/blob/master/front/src/components/Form.test.js) 
* [Testing Pagination Component](https://github.com/gleandroj/gsw-challenge/blob/master/front/src/components/TablePaginationActions.test.js)
* [Testing Using React Hooks](https://www.freecodecamp.org/news/testing-react-hooks/)
* [Testing Axios request w/ Jest](https://www.robinwieruch.de/axios-jest)
* [How i like to write Integration Tests in React](https://www.youtube.com/watch?v=is83bEK3n5A)

## Hooks testing
Nesse link tem uns tutoriais usando useState/useEffect/useContext/useReducer, ele explica bem  a fundamentação teórica de testes também e fala sobre algumas ferramentas, como o Enzyme e React-Test-Renderer. Caso queiram pular tudo isso é só pular pro tópico React-testing-library que vai ter os exemplos com os Hooks.

:link: - [How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/)
# Bibliografia

1. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3) 
2. [Testes automatizados em React - **LuizaLabs** ](https://medium.com/luizalabs/testes-automatizados-em-react-e431db826d65)
3. [**PluralSight**  - Testing React Applications w/ Jest](https://app.pluralsight.com/library/courses/testing-react-applications-jest/table-of-contents)
4. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3)
5. [Visão Geral sobre Testes](https://pt-br.reactjs.org/docs/testing.html)
6. [Unit Testing React Components](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2)
7. [Testing React Hooks](https://www.freecodecamp.org/news/testing-react-hooks/)
9. [Tested React: Build and Test a Form using React Context](https://medium.com/front-end-weekly/tested-react-build-and-test-a-form-using-react-context-81870af6a9ac)

# Appendix and FAQ

:::info
**Find this document incomplete?** Leave a comment!
:::
