---
title: 'Testes e TDD com ReactJS'
---

Testes em ReactJS
===
![size](https://img.shields.io/github/languages/code-size/c0sta/react-tdd)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)  

# Overview
Resumão do que consegui encontrar até agora sobre testes com React, peguei bastante coisa de artigos e cursos da internet, os artigos e cursos do youtube estão tudo na bibliografia pra gente consultar caso a gente precise. 
Tentei focar mais nos Testes Unitários, mostrando alguns métodos mais usados das ferramenta que possivelmente vamos usar, tentei pegar o máximo de exemplos com React e Hooks que achei, caso encontrem mais só ir adicionando aqui pra gente poder consultar.



# Table of Contents
[TOC]

# Diferentes tipos de testes: 
![Manual Testing](https://i.imgur.com/QSS9MIA.png)


## **Testes Unitários (Unit Tests)**

Um teste unitário basicamente é o teste da menor parte testável de uma aplicação[1]. Numa linguagem funcional como o JavaScript por exemplo, a menor parte testável do código provavelmente será uma função.
No React, por exemplo, a maior parte dos componentes são puramente funções, que recebem uma `props` de *input* e retornam sempre o mesmo elemento como *output*.

**Exemplo besta:**
 função que soma a + b:
``` jsx=
 function soma(a, b){
     return a + b;
}
```
Poderiamos escrever um teste para checar se o retorno da função está de acordo com o esperado.

```jsx=
const resultado = soma(1,2);

test('adds 1 + 2 to equal 3', () => {
  expect(resultado).toBe(3);
});
```

![Unit Test](https://i.imgur.com/ftRlWBf.png)

## **Testes de Integração (Integration Tests)**
Testa a interação entre unidades, como funções, serviços, etc. Geralmente são usados Stubs ou Spies em conjunto, criando chamadas fakes para API's ou BD.
Podemos pensar em testes de integração como a conecção de múltiplos componentes, verificando se eles funcionam como esperado em conjunto.

## **Testes de Automação (Automation Tests)**
Também chamados de UI Tests ou End-to-End Tests, são testes que englobam a interação entre múltiplos componentes, simulando a interação do usuário final com o sistema, permitindo automatizar inputs, clicksde botões, navegações entre as rotas, etc. 

# Ferramentas
## Jest

### Métodos mais usados

#### **[Expect](https://jestjs.io/docs/en/expect)**
Usado para verificar se valores correspondem a determinadas condições, o `expect` nos dá acesso a diversos `matchers`(matchers são aqueles `toBe`, `toHave`, etc. Tem uma cacetada então vou só deixar o link pra vcs darem uma olhada) que nos permitem validar diferentes condições. 
* OBS - Sempre que tiverem com dúvidas de qual matcher usar, consultar esse link -> https://jestjs.io/docs/en/expect



#### `afterEach()` - **Executar após cada teste**
Um método que será chamado após a execução de cada teste.
```jsx=
    import { render, cleanup } from '@testing-library/preact'

    afterEach(cleanup()) // runs it after each test.

    test('testing something', () => {...})
    test('confirming that naruto destroys goku', () => {...})
``` 
    

####  `test.only()` - **Isolando Testes** 
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

#### `test.skip()` - **Pulando Testes**
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

### Matchers 

Peguei desse [Jest - CheatSheet](https://github.com/sapegin/jest-cheat-sheet/blob/master/Readme.md) no github.

#### Basic matchers

```jsx=
expect(42).toBe(42) // Strict equality (===)
expect(42).not.toBe(3) // Strict equality (!==)
expect([1, 2]).toEqual([1, 2]) // Deep equality
expect({ a: undefined, b: 2 }).toEqual({ b: 2 }) // Deep equality
expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 }) // Strict equality (Jest 23+)
```

#### Truthiness

```jsx=
// Matches anything that an if statement treats as true (not false, 0, '', null, undefined, NaN)
expect('foo').toBeTruthy()
// Matches anything that an if statement treats as false (false, 0, '', null, undefined, NaN)
expect('').toBeFalsy()
// Matches only null
expect(null).toBeNull()
// Matches only undefined
expect(undefined).toBeUndefined()
// The opposite of toBeUndefined
expect(7).toBeDefined()
// Matches true or false
expect(true).toEqual(expect.any(Boolean))
```

#### Numbers

```jsx=
expect(2).toBeGreaterThan(1)
expect(1).toBeGreaterThanOrEqual(1)
expect(1).toBeLessThan(2)
expect(1).toBeLessThanOrEqual(1)
expect(0.2 + 0.1).toBeCloseTo(0.3, 5)
expect(NaN).toEqual(expect.any(Number))
```

#### Strings

```jsx=
expect('long string').toMatch('str')
expect('string').toEqual(expect.any(String))
expect('coffee').toMatch(/ff/)
expect('pizza').not.toMatch('coffee')
expect(['pizza', 'coffee']).toEqual([expect.stringContaining('zz'), expect.stringMatching(/ff/)])
```

#### Arrays

```jsx=
expect([]).toEqual(expect.any(Array))
expect(['Alice', 'Bob', 'Eve']).toHaveLength(3)
expect(['Alice', 'Bob', 'Eve']).toContain('Alice')
expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 1 })
expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(['Alice', 'Bob']))
```

#### Objects

```jsx=
expect({ a: 1 }).toHaveProperty('a')
expect({ a: 1 }).toHaveProperty('a', 1)
expect({ a: { b: 1 } }).toHaveProperty('a.b')
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
expect({ a: 1, b: 2 }).toMatchObject({
  a: expect.any(Number),
  b: expect.any(Number)
})
expect([{ a: 1 }, { b: 2 }]).toEqual([
  expect.objectContaining({ a: expect.any(Number) }),
  expect.anything()
])
```

#### Exceptions

```jsx=
// const fn = () => { throw new Error('Out of cheese!') }
expect(fn).toThrow()
expect(fn).toThrow('Out of cheese')
expect(fn).toThrowErrorMatchingSnapshot()
```

### Referências
1. [Jest CheatSheet](https://devhints.io/jest)
2. [Referencia p/ doc](https://jestjs.io/docs/en/expect#expectvalue)
3. [Expect methods](https://jestjs.io/docs/en/expect)
4. [Only method](https://jestjs.io/docs/en/api#testonlyname-fn-timeout)
5. [Skip method](https://jestjs.io/docs/en/api#testskipname-fn)


---

## React Testing Library 
Essa lib tem como proposta permitir que nós devs, busquemos elementos como o usuário final buscaria. O usuário geralmente buscaria um botão ou um título pelo seu texto, um `input` pelo seu `placeholder` ou por seu`label` do formulário. Dessa forma, podemos testar nosso sistema mais ou menos do modo que ele será usado. 

>  The more your tests resemble the way your software is used, the more confidence they can give you.
> [name=[react-testing-library](https://testing-library.com/docs/guiding-principles)]
### Métodos mais usados

#### 1. **[render](https://testing-library.com/docs/react-testing-library/api#render)** 
 O método render "transforma" um Componente React em elementos DOM e retorna uma série de funções para testar esse mesmo Componente.
    
**Exemplo**
```jsx=
const url = '/greeting'
const { getByText, getByTestId, getByLabelText } = render(
      <Fetch url={url} />
)
```

#### 2. **[fireEvent](https://testing-library.com/docs/dom-testing-library/api-events#fireevent)** 
 Um método conveniente para disparar eventos na DOM. 

**OBS** - Reparem que no exemplo estou "selecionando" o botão pelo texto dele. (isso é daora dms)

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

### **[Queries Testing Library](https://testing-library.com/docs/dom-testing-library/api-queries)**

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

* **Botões e Headers** - `getByText()`

```jsx=
it('renders correctly title', () => {
  const { getByText } = render(<App>
                                <Header title="Hey there folk" />
                               </App>)

  expect(getByText(/Hey there/i).textContent).toBeInTheDocument()
})
```
* **Imagens** - `getByAltText()`

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
**OBS:** Usar o `getByPlaceholderText` apenas se seu input **não** tiver um label — **o que é menos acessível!**


**CheatSheet Completa**
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

# Testando Componentes Funcionais c/ Hooks 

**Exemplos:**
### **Controlled component - Form** 

Um `Controlled Form` significa que seus dados serão controlados através do `React state` ao invés de ser pelo próprio form. Ou seja, com o evento de `onChange` a cada tecla digitada no input o texto no `state` será atualizado.

   ```jsx=
    import React, { useState } from 'react';

    const Form = () => {
    
      const [valueChange, setValueChange] = useState('')
      const [valueSubmit, setValueSubmit] = useState('')

      const handleChange = (event) => (
        setValueChange(event.target.value)
      );

      const handleSubmit = (event) => {
        event.preventDefault();
        setValueSubmit(event.target.text1.value)
      };

        return (
          <div>
           <h1> React Hooks Form </h1>
            <form data-testid="form" onSubmit={handleSubmit}>
              <label htmlFor="text1">Input Text:</label>
              <input id="text1" onChange={handleChange} type="text" />
              <button type="submit">Submit</button>
            </form>
            <h3>React State:</h3>
              <p>Change: {valueChange}</p>
              <p>Submit Value: {valueSubmit}</p>
            <br />
          </div>
        )
    }
    export default Form;
```
    
Desta forma, temos que testar se o estado exibido está sendo alterado pelo evento de onChange e se o submit está ocorrendo corretamente

```jsx=
    import React from 'react';
    import ReactDOM from 'react-dom';
    import HooksForm1 from '../test_hook_form.js';
    import {render, fireEvent, cleanup} from '@testing-library/react';

    afterEach(cleanup)

    //testing a controlled component form.
    it('Inputing text updates the state', () => {
        const { getByText, getByLabelText } = render(<HooksForm1 />);

        expect(getByText(/Change/i).textContent).toBe("Change: ")

        fireEvent.change(getByLabelText("Input Text:"), {target: {value: 'Text' } } )

        expect(getByText(/Change/i).textContent).not.toBe("Change: ")
     })


     it('submiting a form works correctly', () => {
         const { getByTestId, getByText } = render(<HooksForm1 />);

         expect(getByText(/Submit Value/i).textContent).toBe("Submit Value: ")

         fireEvent.submit(getByTestId("form"), {target: {text1: {value: 'Text' } } })

         expect(getByText(/Submit Value/i).textContent).not.toBe("Submit Value: ")
      })
```
### useState() + useReducer() + useContext()
Nesse link tem uns tutoriais usando esses hooks acima, ele ensina bem a parte da fundamentação teórica e fala sobre algumas ferramentas, como o Enzyme e React-Test-Renderer. Caso queiram pular tudo isso é só pular pro tópico React-testing-library que vai ter os exemplos com os Hooks.
Link - https://www.freecodecamp.org/news/testing-react-hooks/



---


# Exemplos
To salvando aqui alguns exemplos que podem ser úteis pra gente, alguns links são tutoriais, outros vídeos e outros repositórios:
* [Testing Form w/ Submit](https://github.com/gleandroj/gsw-challenge/blob/master/front/src/components/Form.test.js) 
* [Testing Pagination Component](https://github.com/gleandroj/gsw-challenge/blob/master/front/src/components/TablePaginationActions.test.js)
* [Testing Using React Hooks](https://www.freecodecamp.org/news/testing-react-hooks/)
* [How i like to write Integration Tests in React](https://www.youtube.com/watch?v=is83bEK3n5A)
# Bibliografia

1. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3) 
2. [Testes automatizados em React - **LuizaLabs** ](https://medium.com/luizalabs/testes-automatizados-em-react-e431db826d65)
3. [**PluralSight**  - Testing React Applications w/ Jest](https://app.pluralsight.com/library/courses/testing-react-applications-jest/table-of-contents)
4. [Entenda de uma vez por todas o que são testes unitários, para que servem e como fazê-los](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3)
5. [Visão Geral sobre Testes](https://pt-br.reactjs.org/docs/testing.html)
6. [Unit Testing React Components](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2)
7. [Testing React Hooks](https://www.freecodecamp.org/news/testing-react-hooks/)
8. [FreeCodeCamp React TDD](https://www.freecodecamp.org/news/search/?query=react%20tdd)
9. [Tested React: Build and Test a Form using React Context](https://medium.com/front-end-weekly/tested-react-build-and-test-a-form-using-react-context-81870af6a9ac)

# Appendix and FAQ

:::info
**Find this document incomplete?** Leave a comment!
:::

###### tags: `Templates` `Documentation`
