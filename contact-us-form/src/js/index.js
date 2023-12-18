const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');
const $title = $('#title')

const $inputContainerBtnFormOne = $('#containerBtnFormOne');
const $inputBtnFormOne = $('#btnFormOne');
const $inputContainerBtnFormTwo = $('#containerBtnFormTwo');
const $inputBtnFormTwo = $('#btnFormTwo');
const $inputContainerBtnThree = $('#containerBtnFormThree')
const $inputBtnFormThree = $('#btnFormThree')
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');
const $inputHabilidades = $('#habilidades');
const $inputPontosForte = $('#pontosForte');





let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValido = false;
let cepValido = false;
let habilidadesValido = false;
let pontosForteValido = false;


const minLengthText = 2;
const minLengthTextArea = 10;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/

function validarInput(element, minLength, maxLength, regex) {
    const closest = $(element).closest('.input-data')
    if(!element.value 
        || (minLength && element.value.trim().length < minLength)
        || (maxLength && element.value.trim().length > maxLength)
        || (regex && !element.value.toLowerCase().match(regex)))
        {
        closest.addClass('error');
        return false;
        }
    closest.removeClass('error');
    return true;
            
    };

    function validaFormularioUm() {
        if(nomeValido && sobrenomeValido && emailValido && dataNascimentoValido) {
            $inputContainerBtnFormOne.removeClass('disabled');
            $inputBtnFormOne.removeClass('disabled');
            $inputBtnFormOne.off('click').on('click' , iniciarFormulario2);
        }else {
            $inputContainerBtnFormOne.addClassClass('disabled');
            $inputBtnFormOne.addClassClass('disabled');
            $inputBtnFormOne.off('click');

        }
    }

function iniciarFormulario3() {
    $stepText.text('Passo 3 de 3 - Suas Habilidades');
    $stepDescription.text('Precisamos desses dados para que possamos entrar em conato se necessário ')
    $stepTwo.hide();
    $stepThree.show();

    $inputHabilidades.keyup(function() {
        habilidadesValido = validarInput(this, minLengthTextArea);
        validarFormularioTres();
    });

    $inputPontosForte.keyup(function() {
        pontosForteValido = validarInput(this, minLengthTextArea);
        validarFormularioTres();
    });
}



function finalizarFormulario() {
    $stepThree.hide();
    $stepDescription.hide();
    $title.text('Inscrição finalizada com sucesso!')
    $stepText.text('Entraremos em contato em breve.')
}

function validarFormularioTres() {
    if(habilidadesValido && pontosForteValido) {
        $inputContainerBtnThree.removeClass('disabled');
        $inputBtnFormThree.removeClass('disabled');
        $inputBtnFormThree.off('click').on('click', salvarNoTrello);
    } else {
        $inputContainerBtnThree.addClass('disabled');
        $inputBtnFormThree.addClass('disabled');
        $inputBtnFormThree.off('click').on('click')
    }
}


    function iniciarFormulario2() {
        $stepText.text('Passo 2 de 3 - Dados de correspondência');
    $stepDescription.text('Precisamos desses dados para que possamos entrar em conato se necessário ')
    $stepOne.hide();
    $stepTwo.show();

    $inputEndereco.keyup(function() {
        enderecoValido = validarInput(this, minLengthTextArea);
        validarFormularioDois();
    })

$inputCidade.keyup(function() {
    cidadeValido = validarInput(this, minLengthText);
    validarFormularioDois();
})

$inputCep.keyup(function() {
    this.value = this.value.replace(/\D/g, '');
    cepValido = validarInput(this, null, null, /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/)
    if(cepValido) {
        this.value = this.value.replace(cepRegex , "$1.$2-$3");
        validarFormularioDois();
    }
})

$inputComplemento.keyup(function(){
        validarFormularioDois();
})
}

    function validarFormularioDois() {
        if(enderecoValido && cidadeValido && cepValido) {
            $inputContainerBtnFormTwo.removeClass('disabled');
            $inputBtnFormTwo.removeClass('disabled');
            $inputBtnFormTwo.off('click').on('click' , iniciarFormulario3);
        }else {
            $inputContainerBtnFormTwo.addClassClass('disabled');
            $inputBtnFormTwo.addClass('disabled');
            $inputBtnFormTwo.off('click');
        }
    }

function init() {
    $stepText.text('Passo 1 de 3 - Dados pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor ')
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function(){
        nomeValido = validarInput(this, minLengthText);
        validaFormularioUm();    
        });
}

$inputEmail.keyup(function() {
   emailValido = validarInput(this, null, null, emailRegex);
   validaFormularioUm();
})

$inputSobrenome.keyup(function(){
    sobrenomeValido = validarInput(this, minLengthText);
    validaFormularioUm();
    });

$inputDataNascimento.keyup(function(){
       dataNascimentoValido = validarInput(this, minLengthText);
       validaFormularioUm();     
        });

 $inputDataNascimento.change(function(){
          dataNascimentoValido = validarInput(this, minLengthText);
          validaFormularioUm();      
            });

 $inputMinibio.keyup(function() {
    validaFormularioUm();
 })           


$inputDataNascimento.on('focus', function(){
        this.type = 'date';
    })

 $inputDataNascimento.on('blur', function(){
        if(!this.value){
            this.type = 'text';
        }
    })
    

    async function salvarNoTrello() {
        try{
            const nome = $inputNome.val();
            const sobrenome = $inputSobrenome.val();
            const email = $inputEmail.val();
            const dataNascimento = $inputDataNascimento.val();
            const minibio = $inputMinibio.val();
            const endereco = $inputEndereco.val();
            const complemento = $inputComplemento.val();
            const cidade = $inputCidade.val();
            const cep = $inputCep.val();
            const habilidades = $inputHabilidades.val();
            const pontosFortes = $inputPontosForte.val();
    
            if(!nome || !sobrenome || !email || !dataNascimento || !endereco || !cidade || !cep || !habilidades || !pontosFortes) {
                return alert('Favor preencher todos os dados obrigatórios.')
            }

                const body = {
                name: 'Formulário de candidatura - ' + nome,
                desc: `Seguem dados do candidato:
                    ------------------- Dados pessoais ------------
                    Nome: ${nome}
                    Sobrenome: ${sobrenome}
                    Email: ${email}
                    Data nascimento: ${dataNascimento}
                    Minibio: ${minibio}
                    ------------------- Dados de correspondência ------------
                    Endereço: ${endereco}
                    Complemento: ${complemento}
                    Cidade: ${cidade}
                    CEP: ${cep}
                    ------------------- Dados de recrutamento ------------
                    Habilidades: ${habilidades}
                    Pontos Fortes: ${pontosForte}`
                };
            await feitch('https://api.trello.com/1/cards?idList=658059e7457a01562bbcfbfc&key=822a958ab3167609ae9d734c2ee18749&token=ATTA07228f6d6c17dec6c0116bd52436c061315e092a709f1e9d48c69421f16a04e5E0777DD6' , {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
            })
            return finalizarFormulario();
        }catch(e){
            console.log('Ocorreu um erro ao salvar no trello')
        }
    }
    


init();


