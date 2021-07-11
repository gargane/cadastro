class Validator {
    constructor() {
        this.validations = [ 
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-only-number'   
        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {

        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');


        //HTMLColletion -> array
        let inputsArray = [...inputs];


        //loop nos inputs e validação meadiante ao que for encontrado
        inputsArray.forEach(function (input) {

            //loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {

                    // limpando string para saber o método
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invoca o método
                    this[method](input, value);
                }
            }

        }, this);

    }
    //verifica se um input tem um numero minimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }

    }
    //verifica se um input apssou do limite de caractes
    maxlength(input, maxValue){
        
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }

    }

    //valida emails
    emailvalidate(input){
        //email@emai.com > email@email.com.br
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage =  `Insira um email no padrão nome@email.com`

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
                 
    }

    //valida se o campo tem apenas letras
    onlyletters(input){

        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especias`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
          }

    }

    /*valida se o campo so tem numeros
    onlynumber(input){

        let re = /^[1-9]+$/;

        let inputValue = input.value;

        let errorMessage =  `Este campo não aceita letras nem caractes especias`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
          }


    }*/



    //método para imprimir mensagens de error na tela
    printMessage(input, msg){

        //quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {
            
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
        
        }

    }

    //verifica se o input é requirido
    required(input){
        
        let inputValue = input.value;

        if(inputValue ===''){
            let errorMessage = `Este campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }

    }


    //limpa as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();


// evento que dispara as validações

submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);

});