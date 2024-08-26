const cepInput = document.querySelector('.cep');
const info = document.querySelector('.info')


// permitir apenas numeros e retirar a mascara
cepInput.addEventListener("keypress", (e) =>{
    const numberValidation = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if(!numberValidation.test(key)){
        e.preventDefault();
        return;
    }

})

//pegar o cep
cepInput.addEventListener("keyup", (e) =>{

    const cepValue = e.target.value.replace(/\D/g, '');

    if(cepValue.length === 8){
        getCep(cepValue);
    }

    

})

const getCep = async (cep) => {

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json();
    console.log(data)

    let address = ''

    if(data) {
        address = `
            <div class="li-box">
                <p class="title-li">CEP</p>
                <li class="infoList">${data.cep}</li>
            </div>

            <div class="li-box">
                <p class="title-li">Rua</p>
                <li class="infoList">${data.logradouro}</li>
            </div>

            <div class="li-box">
                <p class="title-li">Bairro</p>
                <li class="infoList">${data.bairro}</li>
            </div>

            <div class="li-box">
                <p class="title-li">Cidade</p>
                <li class="infoList">${data.localidade}</li>
            </div>

            <div class="li-box">
                <p class="title-li">Estado</p>
                <li class="infoList">${data.uf}</li>
            </div>

            <div class="li-box">
                <p class="title-li">DDD</p>
                <li class="infoList">${data.ddd}</li>
            </div>
            
       `
    }

    info.innerHTML = address
}

function maskCep() {
    let cep = cepInput.value;

    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2')

    cepInput.value = cep
} 

