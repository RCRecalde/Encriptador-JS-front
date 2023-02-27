const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R','S','T','U','V','W','X','Y','Z', '!', ' ']
const msjOriginal = document.getElementById('original')
const crypt = document.getElementById('encript')
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

//input original a array
const cambioMensaje = () => {
    const array = [...msjOriginal.value.toUpperCase()]//accede alvalor, lo pasa a mayuscula para compararlo con el alfabeto
    print(0, array) //indice actual de la palabra a encriptar, palabra a encriptar
}

const print = (letraIngresada, array) => {
    //caso base: finaliza la recursion, evita loop
    //cuando el largo del array sea igual al index actual es pq es la ultima letra
    if(array.length === letraIngresada) return;
    //si no es la ultima letra:
    //valor ingresado se le saca una letra al valor actual para la animacion hacia la "terminal"
    //se toma el elemento html y se le quita el 1er caracter con subString(1)
    msjOriginal.value = msjOriginal.value.substring(1)

    const span = document.createElement("span")
    resultado.appendChild(span)
    animacionConsola(span)
    //comienza la animacion
    .then( () => {
        //CARACTER ACTUAL
    const sinEncriptar = array[letraIngresada]
    //agregr caracter encriptado
    span.innerHTML = alfabeto.includes(sinEncriptar) ? alfabeto[(alfabeto.indexOf(sinEncriptar) + parseInt(rango.value)) % alfabeto.length ] : sinEncriptar//si incluye al caracter, lo buscamos dentro del alfabeto al indice del caracter sin codificar, a eso se le suma el rango (a(0) + 1= b)
    //se llama a la funcion dentro de si misma para la recursion, se posiciona un indice mas en el array
    print(letraIngresada + 1, array)
    })
    
} 

//caracteres al azar hasta el caracter correcto
const animacionConsola = span => {
    //promesa: valor disponible en el futuro. Animacion del caracter antes de la letra encriptada
    let animacion = 0
    return new Promise( resolve => {
        //setInterval ejecuta un fragmento de codigo de manera repetitiva en un intervalo de tiempo
        const duracion = setInterval( () => {
            //animacion: lo que pasa enese intervalo de tiempo: modificar el span creado por una letra aleatoria repetidamente

            //caracter aleatorio dentro del array: Math.random multiplicado por la longitud del array = un valor aleatorio entre 0 y la longitud del array
            //floor() redondea
            span.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)]
            animacion++; //cambia la letra

            //termina la animacion
            if(animacion === 5){
                clearInterval(duracion)//intervalo obtenido
                resolve()//promesa resuelta
            }
        }, 50) //50 ms
    })
}


//submit
const submit = e => {
    e.preventDefault()
    resultado.innerHTML = ''
    cambioMensaje()
}
crypt.onsubmit = submit