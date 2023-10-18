/// <reference types="Cypress" />

//EXEMPLO PARA TESTAR UM PROJETO LOCAL, APARTIR DA RAIZ DO PROJETO
// describe('Central de Atendimento ao Cliente TAT', function() {
//     it('verifica o título da aplicação', function() {
//         cy.visit('./src/index.html')
        
//         cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
//     })
// })
  
//Essa é uma estrutura basica de teste, primeiramente temos describe que é a suite de teste.
// temos o it que é o teste propriamente dito.
// Os dois precisão informar dois parametros, uma descrção e uma função anonima.

//EXEMPLO PARA TESTAR UM TITULO NA WEB
// describe('Central de Atendimento ao Cliente TAT', function() {
//     it('verifica o título da aplicação', function() {
//         cy.visit('https://unitedsoftware.com.br')
        
//         cy.title().should('be.equal', 'United Software - Welcome to the Future')
//     })
// })

//EXEMPLO PARA TESTAR UM H1 NA WEB
// describe('Central de Atendimento ao Cliente TAT', function() {
//     it('Verificando Title da pagina', function(){
//         cy.visit('https://unitedsoftware.com.br')

//         // cy.get('div[class="header-inf-mestre"]')
//         //     .get('div[class="textos"]')
//         //     cy.get('h1')
//         //     .first()
//         //     .should('have.text', 'UNITED SOFTWARE')

//         cy.get('h1')
//             .first()
//             .should('have.text', 'UNITED SOFTWARE')
//     })
// })

//exercicios
describe('preenche os campos obrigatórios e envia o formulário', function(){
    //MOVENDO O VISIT PARA UM BLOCO BEFORE, ELE VAI EXECUTAR ANTES DE QUALQUER BLOCO DE DESCIBE
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    //duas formas de fazer
    // it('preenche campo farsname', function(){
    //     const input = cy.get('input[id="firstName"]')
    //     input.type("Zezerino")
    //     input.should('have.value', 'Zezerino')
    // })

    // it('preenche campo lastname', function(){
    //     cy.get('input[id="lastName"]')
    //         .type('Mattos')
    //         .should('have.value', 'Mattos')
    // })

        it('verifica o título da aplicação', function() {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        //Exercicio 1
        it('preenche os campos obrigatórios e envia o formulário', function(){
            cy.get('#firstName').type('Zezerino')
            cy.get('#lastName').type('Mattos')
            cy.get('#email').type('mattos@teste.com')
            cy.get('#email-checkbox').click()
            cy.get('#open-text-area').type('teste')
            cy.get('button[type="submit"]').click()

            cy.get('.success').should('be.visible') // Lemrando que agora temos o teste, quando verificamos, até então tinhamos apenas uma verificação.
        })

        //Exercicio 2 colocando um objeto de tempo para sobreescrever o dalay de type == Quando tem texto longo essa é a melhor pratica
        //Ou seja vamos sobre escrever o Delay defalt de type para 0 pois por default ela vem com 10 milisegundos
        it('preenche os campos obrigatórios e envia o formulário', function(){
            const textLong = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

            cy.get('#firstName').type('Zezerino')
            cy.get('#lastName').type('Mattos')
            cy.get('#email').type('mattos@teste.com')
            cy.get('#email-checkbox').click()
            cy.get('#open-text-area').type(textLong, {delay: 0})
            cy.get('button[type="submit"]').click()

            cy.get('.success').should('be.visible') // Lemrando que agora temos o teste, quando verificamos, até então tinhamos apenas uma verificação.
        })

        //Exercicio 2 fazendo com que falhe a aplicação e a mensagem que aparece tem que ser a de erros na aplicação e com isso o teste vai passar.
        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
            cy.get('#firstName').type('Zezerino')
            cy.get('#lastName').type('Mattos')
            cy.get('#email').type('mattos@teste,com') // vamos testar com uma virgula no lugar do ponto
            cy.get('#email-checkbox').click()
            cy.get('#open-text-area').type('teste')
            cy.get('button[type="submit"]').click()

            cy.get('.error').should('be.visible') // Lemrando que agora temos o teste, quando verificamos, até então tinhamos apenas uma verificação.
        })
        
        //Exercicio 3 vamos verificar se o campo digitado tem o padrão que é exigida
        it('Campo de telefone continua vazio quando preenchido com valor não numérico', function(){
            cy.get('#phone') // o input só aceita numero, se não for numero ele fica vazio
                .type('abcdefposusys')
                .should('have.value', '')
                //Nesse caso pegamos o campo, tentamos digitar e como o campo não permite por ser um input numerico, encadeamos p valor de uma string vazia para seu value e assim o teste passa novamente.
        })

        //Exercicio 4 vamos marcar o checkbox de obrigatório o telefone e o campo de telefone vai estar vazio e com isso a aplicação do form tem que informar o usuário que o input de telefone é obrigatório, ou seja tem que exibir uma mensagem de erro.
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
            cy.get('#firstName').type('Zezerino')
            cy.get('#lastName').type('Mattos')
            cy.get('#email').type('mattos@teste.com') // vamos testar com uma virgula no lugar do ponto
            // cy.get('#email-checkbox').click()
            cy.get('#phone-checkbox').click()
            cy.get('#open-text-area').type('teste')
            cy.get('button[type="submit"]').click()

            cy.get('.error').should('be.visible') // Lemrando que agora temos o teste, quando verificamos, até então tinhamos apenas uma verificação.
        })

        //Exercicio 5 Vamos aprender sobre a o Clear ele limpa um campo ou um textarea
        it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
            cy.get('#firstName')
                .type('Zezerino')
                .should('have.value', 'Zezerino')
                .clear()
                .should('have.value', '')
            
            cy.get('#lastName')
                .type('Mattos')
                .should('have.value', 'Mattos')
                .clear()
                .should('have.value', '')

            cy.get('#email')
                .type('mattos@teste.com')
                .should('have.value', 'mattos@teste.com')
                .clear()
                .should('have.value', '')

            cy.get('#phone')
                .type('4899999999')
                .should('have.value', '4899999999')
                .clear()
                .should('have.value', '')
        })

        //Exercicio 6 Agora tem que exibir a mensagem de erro quando não preencho nem um campo obrigatório.
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
            cy.get('button[type="submit"]')
                .click()
            cy.get('.error')
                .should('be.visible')
        })

        //Exercicio 7 Vamos trabalhar com comandos customizados
        it('envia o formuário com sucesso usando um comando customizado', function(){
            cy.fillMandatoryFieldsAndSubmit() // este é um comando customizado e ele não existe, nós é que vamos criar ele para poder usar aqui. Então dentro da pasta support vamos criar no arquivo commands.js
            //Podemos passar também argumentos como exemplo cy.fillMandatoryFieldsAndSubmit(nome, sobreNome) e lá no nosso argumento personalizado receber
            cy.contains('button', 'Enviar').click()
            cy.get('.success').should('be.visible') //Agora fazemos a verificações lá no comando customizado e aqui apenas testamos
        })

        //Exercicio 8 Outra forma para identificar elementos e não ficar apenas com o GET é usarmos o CONTAINS
        //Vamos substituir o get de um botão por um contains
        it('Subtituindo o get por contains no button', function(){
            cy.fillMandatoryFieldsAndSubmit()

            cy.contains('button', 'Enviar').click() //Trocamos o get por contains

            cy.get('.success').should('be.visible')
        })

        //Vamos selecionar um campo suspenso os "selects" e para isso nós podemos selecionar por texto, value e indice da options. E se os campos forem de multiplas escolhas, vc pode selecionar do mesmo jeito e colocar em um array. ex: cy.get('select').select(['Blog', Youtube]);
        it('seleciona um produto (YouTube) por seu texto', function(){ //selecionamos pelo texto e verificamos se tem o valor
            cy.get('select#product')
                .select('YouTube')
                .should('have.value', 'youtube')
        })

        it('seleciona um produto (Mentoria) por seu valor (value)', function(){ //selecionamos pelo value e verifivamos se tem o texto
            cy.get('#product')
                .select('mentoria')
                .should('be.visible', 'Mentoria')
        })

        it('seleciona um produto (Blog) por seu índice', function(){ //selecionamos pelo indice e verifivamos se tem o valor
            cy.get('#product')
                .select(1)
                .should('have.value', 'blog')
        })

        //Vamos trabalhar o radios buttons, e por questão de semantica o recomendado e usar o .check e não o .radios, pois vc está testando checando se está marcado.
        it('marca o tipo de atendimento "Feedback"', function(){
            cy.get('input[type="radio"][value="feedback"]')
                .check()
                .should('have.value', 'feedback')
        })

        //Vamos agora usar o .each() e cy.wrap(), sendo que o ecch() é um array e o wrap encapsula
        it('marca cada tipo de atendimento', function(){
            cy.get('input[type="radio"]')
                .should('have.length', 3) //Estou verificando se tem 3 valor de options
                .each(function($radio){ //o each é uma função que recebe como argumento cada item que foi selecionado.
                    cy.wrap($radio).check() //Vamos usar o warap para inpacotar cada um desses items. precisamos empacotar para poder mandar comandos do cypres como o should.
                    cy.wrap($radio).should('be.checked') // Vamos vericar cada um deles se foi marcado
                })
                //Esse teste pega o input do tipo radio, verifica tem 3, depois ele entra em um lup verificando se cada um deles está marcado.
        })

        //Vamos usar o Check e o Uncheck para marcar ou desmarcar checkbox e radio e não o click, pois o clique ele também faz, mas pode atrapalhar a semantica pois se tem algo que tem que estar marcado e clica ele desmarca e se usaar o checked ele não desmarca ele tem um comando especifico para desmarcar que é o Unchek.
        //Vamos marcar e desmarcar checkbox.
        it('marca ambos checkboxes, depois desmarca o último', function(){
            cy.get('input[type="checkbox"]')
                .check() //Quando tem um iput de checkbox eu não preciso especificar qual que eu quero ele pega todos que tem, nesse exemplo ele marcou os dois.
                .should('be.checked') //Verificando se ambos estão marcado
                .last() //Com o .last ele pega apenas o ultimo
                .uncheck() //estamos desmarcando o ultimo.
                .should('not.be.checked') //Verificando se está desmarcado
                //Então estamos pegando todos, marcando todos, pegando o ultimo e limpando ele, e fizemos a verificação.
        })

        //Fazendo upload de arquivos com Cypress aula 29 basico
        //Vamos selecionar um arquivo da pasta fixtures, é nesta pasta que vai ficar nosso arquivo para fazermos upload como por exemplo anexar um curriculo em um formulário.
        //Por exemplo: cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').
        it('seleciona um arquivo da pasta fixtures', function(){
            cy.get('#file-upload') //Pegando o input
                .should('not.have.value') //Verificando se não tem nem um valor
                .selectFile('./cypress/fixtures/example.json') //Selecionando o arquivo que quero carregar em file
                .should(function($input){ //Criando uma função de Calback para pegar o objeto
                    //console.log($input)
                    expect($input[0].files[0].name).to.equal('example.json') //Verificando se o nome do arquivo é example.json.
                })
        })

        //Neste exemplo ao contrario do outro que simula que está clicando no botão e pegando o arquivo, aqui vamos simular que estamos arrastando um arquivo para cima dele.
        it('seleciona um arquivo simulando um drag-and-drop', function(){
            cy.get('#file-upload') //Pegando o input
                .should('not.have.value') //Verificando se não tem nem um valor
                .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //arrastando o arquivo que quero carregar em file
                .should(function($input){ //Criando uma função de Calback para pegar o objeto
                    //console.log($input)
                    expect($input[0].files[0].name).to.equal('example.json') //Verificando se o nome do arquivo é example.json.
                })
        })

        //Vamos usar uma fixture e com isso não precisamos dar o caminho todo de onde está nosso arquivo ex: selectFile('./cypress/fixtures/example.json'
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
            cy.fixture('example.json').as('sampleFile') //fizemos a fixture e damos um alias para ela "AS"
            cy.get('#file-upload') //Pegando o input
                .should('not.have.value') //Verificando se não tem nem um valor
                .selectFile('@sampleFile') //carregando o arquivo que quero carregar em file e ai precisamos colocar um @ e colocar o nome que demos para nossa fixture.
                .should(function($input){ //Criando uma função de Calback para pegar o objeto
                    //console.log($input)
                    expect($input[0].files[0].name).to.equal('example.json') //Verificando se o nome do arquivo é example.json.
                })
        })
        
        //Vamos testar links que abrem em outra aba do navegador, e com isso vamos testar duas opções apenas, mas na documentação oficial existem outras.
        /*
            Alternativa 1 - confie que o navegador funciona (teste a aplicação, não o browser)
            
            Ou seja, se um elemento do tipo âncora (a) possui o atributo target com o valor _blank, quando clicado, obrigatóriamente o valor do atributo href será aberto em uma nova aba. Este é o compartamento padrão em qualquer navegador.

            Neste caso, podemos simplesmente verificar tal característica, sem nem mesmo precisar clicar no elemento.

            Algo como o seguinte:

            cy.get('.some-link').should('have.attr', 'target', '_blank')
       
            Alternativa 2 - remova o atributo target do elemento

            Já se você precisa ir para esta outra página, o Cypress deixa você remover a propriedade target do elemento âncora.

            Para isso, te apresento a funcionalidade .invoke().

            Com a funcionalidade invoke(), você pode fazer o seguinte, por exemplo: cy.get('#link-que-abre-em-outra-aba').invoke('removeAttr', 'target').

            Vale comentar que, para tal alternativa funcionar, a página que normalmente abre em outra aba deve estar no mesmo domínio (ou sub-domínio) da aplicação em teste.
        
        */

        //Vamos ao exemplo 1, aqui vamos apenas verificar na pagina se tem o 'target', '_blank'
        it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
            cy.get('#privacy a') //Pegamos o elemento a que está dentro de uma div com id privacy
                .should('have.attr', 'target', '_blank') //verificamos se tem 'target', '_blank' se o navegador está funcionando ele vai abrir em outra aba.
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
            const textPrivacy = 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.'

            cy.get('#privacy a') //Pegamos o elemento a que está dentro de uma div com id privacy
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#title') //Poderiamos fazer uma verificação usando o get ou a mais recomendada que é contains
                .should('be.visible', 'CAC TAT - Política de privacidade')

            cy.contains(textPrivacy) //Fizemos usando o contais e colocamos uma variavel com o texto, mas poderia ser direto.
                .should('be.visible')
        })

        //ATENÇÃO, PROXIMO EXERCICIO É PARA TESTARMOS UMA PAGINA DE FORMA INDEPENDENTE E PARA ISSO VAMOS CRIAR UM NOVO ARQUIVO CHAMADO DE privacy.spec.js
        //-----------------------------------------------------------------------------------------

        /*
            Simulando o viewport de um dispositivo móvel

            Com o Cypress, é possível redimensionar o navegador para simular o uso da aplicação em um dispositivo móvel.

            A forma que considero mais simples de atingir tal resultado, é passar tais dimensões direto via linha de comando, ao executar o cypress.

            Algo como o seguinte: cypress open --config viewportWidth=370 viewportHeight=660.
        
        */
       //como nós configuramos lá no inicio no cypres.json para ele ter o tamanho de:
       /*
        {
            "pluginsFile": false,
            "viewportHeight": 880,
            "viewportWidth": 1280
        }

        Então agora via de comando vamos sobre escrever para simular um dispositivo movel e para isso vamos sobre escrever o arquivo package.json que o scripts vai ficar assim:
        "scripts": {
            "cy:open": "cypress open",
            "cy:open:mobile": "cypress open --config viewportWidth=410 viewportHeight=860",
            "test": "cypress run"
        },
        Com isso é só salvar e colocar para rodar com o comando no terminal npm run cy:open:mobile que já vai abrir no tamanho de mobile e a partir dai é só fazer os mesmos teste que fez no modelo web.

       */
//------------------------------------------------------------------------------------------------------

        /*
            Vamos deichar rodar nossos teste agora no modelo headless
            Rodar testes de forma "headless" no Cypress significa executar testes automatizados em um navegador web sem a interface gráfica do usuário (GUI). Isso é feito em segundo plano, sem exibir a janela do navegador, o que permite que os testes sejam executados de maneira mais eficiente e discreta, ideal para testes em servidores de integração contínua ou em máquinas sem interface gráfica. O Cypress oferece a opção de rodar testes em modo "headless" para melhorar o desempenho e a automação de testes web.

            Pra rodar no nosso exemplo basta npm run teste. Uma vez que nosso package.json está assim: 

             "scripts": {
                "cy:open": "cypress open",
                "cy:open:mobile": "cypress open --config viewportWidth=410 viewportHeight=860",
                "test": "cypress run"
            },

            E pra rodar como mobile incluimos nele a configuração para mobile:
             "scripts": {
                "cy:open": "cypress open",
                "cy:open:mobile": "cypress open --config viewportWidth=410 viewportHeight=860",
                "test": "cypress run",
                "test:mobile": "cypress run --config viewportWidth=410 viewportHeight=860"
            },

            Basta parar o terminal e rodar npm run test:mobile

            Ele vai criar uma pasta de videos para armazenar um video do teste passando e no caso de falhar ele cria uma pasta de screenhots com uma imagem da falha. Tudo isso pensado para informar sucesso ou erro na execução do teste.
        
        Exemplo funcionando.
       it('Cypress Runner simulando um dispositivo com 410 pixels de largura e 860 pixels de altura', function(){
        cy.fixture('example.json').as('sampleFile') //fizemos a fixture e damos um alias para ela "AS"
        cy.get('#file-upload') //Pegando o input
            .should('not.have.value') //Verificando se não tem nem um valor
            .selectFile('@sampleFile') //carregando o arquivo que quero carregar em file e ai precisamos colocar um @ e colocar o nome que demos para nossa fixture.
            .should(function($input){ //Criando uma função de Calback para pegar o objeto
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json') //Verificando se o nome do arquivo é example.json.
            })
       })
       */

       //Vamos Controle o "relógio" 🕐 do navegador com os comandos cy.clock() e cy.tick()
       //Com a funcinalidade cy.clock(), você pode "congelar" 🧊 o relógio do navegador.
       //E com a funcionalidade cy.tick(), você pode avançar no tempo. 🕒

        it('verificam mensagens (de sucesso e erro) mensagem aparece, mas também que desaparece após 3 segundos', ()=> {
            cy.clock() //Estou congelando o relógio do navegador
            cy.fillMandatoryFieldsAndSubmit()
            cy.contains('button', 'Enviar').click()
            cy.get('.success').should('be.visible')  //Estou verificando se a mensagem aparece na tela
            cy.tick(3000) //Estou adiantando o relogio do navegador em 3 segundos, que era o tempo que a menssagem aparecia na tela
            cy.get('.success').should('not.be.visible') //Estou verificando se ela já não está mais na tela depois dos 3 segundos.

            //Aqui estou mudando um pouco a estrutura do it coloquei um função anonima diferente "() =>", apenas mostrando que também podemos fazer assim.

            //Como congelamos o relogio do navegador e depois pulamos para 3 segundos depois, nós não precisamos ficar aguardando 3 segundos para que a mensagem suma, no fim ganhamos tempo no nosso teste pois ele durou apenas 1 segundo e meio.
        })

       /*
            VAMOS USAR A BIBLIOTECA lodash (Cypress._) 
            👨‍🏫 A funcionalidade _.times() serve para você executar uma função de callback um certo número de vezes, onde o número de vezes é o primeiro argumento, e a função de callback é o segundo.

            VAMOS EXECUTAR UM TESTE 5 VEZES PARA VER QUE ELE É ESTAVEL
       */
        Cypress._.times(5, ()=> {
            it('verificam mensagens (de sucesso e erro) mensagem aparece, mas também que desaparece após 3 segundos', ()=> {
                cy.clock() //Estou congelando o relógio do navegador
                cy.fillMandatoryFieldsAndSubmit()
                cy.contains('button', 'Enviar').click()
                cy.get('.success').should('be.visible')  //Estou verificando se a mensagem aparece na tela
                cy.tick(3000) //Estou adiantando o relogio do navegador em 3 segundos, que era o tempo que a menssagem aparecia na tela
                cy.get('.success').should('not.be.visible')
            
            })
        })

        /*
            👨‍🏫 A funcionalidade _.repeat() serve para repetir uma string um certo número de vezes, onde o primeiro argumento é a string a qual deseja-se repetir, e o segundo argumento quantas vezes tal string deve ser repetida.

            VAMOS FAZER COM UM TEXTO OU STRING SE REPITA QUANTAS VEZES QUISERMOS, NO NOSSO CASO VAMOS REPETIR 3 VEZES
        */
        it('Preenchendo os campos e usando um CTRL + V para o Textarea', function(){
            const longText = Cypress._.repeat('teste', 10) // Nosso CTRL + V, esse comando vai fazer com teste se repita 10 x

            cy.get('#firstName').type('Zezerino')
            cy.get('#lastName').type('Mattos')
            cy.get('#email').type('mattos@teste.com')
            cy.get('#email-checkbox').click()
            cy.get('#open-text-area')
                //.type(longText) Qualquer um dos dois vai usar a variavel
                .invoke('val', longText)
                .should('have.value', longText)
        })

        /*
            Invoque atributos e métodos de elementos com o comando .invoke()
            Vimos o invoke na aula Lidando com links que abrem em outra aba, para remover o atributo target de um elemento, evitando que quando clicado, a página não abra em outra aba.

            Além disso, no conteúdo Como “simular” um CTRL+V com Cypress, demonstrei o uso do .invoke('val'), para definir o valor de um campo de texto, para quando precisamos digitar um texto longo e não queremos perder tempo.

            Dois últimos usos do .invoke() que eu quero que você conheça são:

            Com o comando .invoke('show'), você pode forçar a exibição de um elemento HTML que esteja escondido, com um estilo display: none;, por exemplo.

            E com o comando .invoke('hide'), você pode esconder um elemento que está sendo exibido.

            Crie um teste chamado exibe e esconde as mensagens de sucesso e erro usando o .invoke()
        */
        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
            cy.get('.success')
                .should('not.be.visible')
                .invoke('show')
                .should('be.visible')
                .and('contain', 'Mensagem enviada com sucesso.')
                .invoke('hide')
                .should('not.be.visible')
            cy.get('.error')
                .should('not.be.visible')
                .invoke('show')
                .should('be.visible')
                .and('contain', 'Valide os campos obrigatórios!')
                .invoke('hide')
                .should('not.be.visible')
        })

        /*
            Um dos maiores "poderes" 🦸🏽‍♂️ do Cypress é a possibilidade de executar comandos à nível de rede.

            Um destes comandos é o cy.request().

            Com o comando cy.request(), você pode executar requisições HTTP à nível de rede, ganhando tempo no setup dos testes e focando no que interessa quando se trata de testar as coisas pela interface gráfica de usuário.

            Se você quiser, você pode até mesmo usar o comando cy.request() para testar APIs REST.

            VAMOS CRIAR UM TESTE QUE VAI FAZER UMA REQUISIÇÃO HTTP
        */
        it('faz uma requisição HTTP', function(){
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html') //Fazendo a requisição
                .should((response)=> {  //Colocando a resposta dentro de um should
                    //console.log(response)
                    const { status, statusText, body } = response // desestruturando o objeto
                    expect(status).to.equal(200) //Fazendo as verificações
                    expect(statusText).to.equal('OK')
                    expect(body).to.include('CAC TAT')
                })
        })

        /*
            DESAFIO
            Nesse desafio vamos usar o  .invoke para dar um show, mas tambem podemos usar ele para mudar um texto da pagina na camada local.
        */
        it.only('Mostra gato e muda title', () =>{
            cy.get('#cat')
                .invoke('show')
                .should('be.visible')
            cy.get('#title')
                .invoke('text', 'TESTE TITLE')
                .should('have.text', 'TESTE TITLE')
        })
})
