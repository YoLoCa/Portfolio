//Variables Globales
//contadores
let counter1 = document.getElementById('count1');
let counter2 = document.getElementById('count2');
let counter3 = document.getElementById('count3');
let counter4 = document.getElementById('count4');

//formulario
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('.form-control');
const textarea = document.getElementById('mensaje').value;
const campos = {
    nombre: false,
    email: false,
    mensaje: false
}

//Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, //letras y espacios pueden llevar acentos
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mensaje: /^[^]+$/  //Letras (pueden llevar acentos), numeros, espacios y símbolos puntuación expresión ? ; - () 
}

//Función load (autollamada)
const load = () => {
    animate(counter1, 0, 3200, 3000);
    animate(counter2, 0, 110, 3000);
    animate(counter3, 0, 500, 3000);
    animate(counter4, 0, 100, 3000);

//Funcion animacion features
    function animate(obj, initVal, lastVal, duration){
        let starTime = null;

        //get the current timestamp and assign it to the currentTime variable
        let currentTime = Date.now();

    // pass the current timestamo to the step function
        const step = (currentTime) => {
            //if the starTime is null, assign the currentTime to startTime
            if(!starTime){
                starTime = currentTime;
            }
        //Calculate the calue to be used in calculating the number to be displayed    
        const progress = Math.min ((currentTime - starTime) / duration, 1);

        //Calculate what to be displayed using the value gotten above

        obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

        //Checking to make sure the counter does not exceed the last value (lastVal)
        console.log(progress);
            if(progress < 1){
                window.requestAnimationFrame(step);
            }else{
                window.cancelAnimationFrame(window.requestAnimationFrame(step));
            }
        };

    window-requestAnimationFrame(step);  //llamada function animation
    }
}    
    //validación formulario
    const validarFormulario = (e) =>{
       switch (e.target.name){
        case "nombre":
           validarCampo(expresiones.nombre, e.target, 'nombre');
        break;

        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;

        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
        break;
        }
    }
    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(campo).classList.remove('form-control-invalid');
            document.getElementById(campo).classList.add('form-control-valid');
            document.querySelector(`#error-${campo} p`).classList.remove('error-activo');
            campos[campo] = true;
        }else{
            document.getElementById(campo).classList.add('form-control-invalid');
            document.getElementById(campo).classList.remove('form-control-valid');
            document.querySelector(`#error-${campo} p`).classList.add('error-activo');
            campos[campo] = false;
        }
    }
        
    inputs.forEach((input) =>{
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        if(campos.nombre && campos.email && campos.mensaje){
            formulario.reset();
            document.getElementById('form-validar').classList.add('form-validar-valid');
        }else{
            document.getElementById('form-validar').classList.remove('form-validar-valid');            
        }
    });

//Subir (go top)
const btnUp = document.getElementById('up');
//Evento scroll + Añadimos las clases que daran efecto al evento scroll
window.addEventListener('scroll', (e) =>{
    let y = document.documentElement.scrollTop;
    if(y === 0){
        btnUp.classList.add('up-active');
        btnUp.classList.remove('up-inactive');    
    }else if(y >= 500){
        btnUp.classList.add('up-inactive');
        btnUp.classList.remove('up-active');
    }
});
//Capturamos el evento comprobamos condicion
btnUp.addEventListener('click', (e)=>{
    if(e.target === btnUp || e.target.matches('.fa-chevron-up')){
        window.scrollTo({
            top:0,
            behavior: "smooth"
        });
    }
});  
    

