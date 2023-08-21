let secuenciaGenerada = [];
let secuenciaUsuario = [];
let record = 0;
let nivel = 5;
let turnoUsuario = false;

const botonEmpezar = document.getElementById("Empezar");
botonEmpezar.addEventListener('click', () => {
    document.body.style.backgroundColor = "#cf6f00";
    nivel = 1;
    secuenciaGenerada.length = 0;
    secuenciaUsuario.length = 0;
    setTimeout(()=>{
      generarSecuencia();
    mostrarSecuencia();
    },200)
    
})

function generarSecuencia(){
  turnoUsuario = false;  
  let numero = generarNumeroAleatorio();
    let colores = ['red', 'green', 'yellow', 'blue']
    let color = colores[numero-1]
    secuenciaGenerada.push(color);
    console.log('secuencia generada:', secuenciaGenerada)
}


function mostrarSecuencia() {
  let indice = 0;

  function cambiarSiguienteBoton() {
    if (indice < secuenciaGenerada.length) {
      let colorOriginal = secuenciaGenerada[indice];
      if (colorOriginal == 'yellow') {
        colorOriginal = '#ffd900';
      }
      const boton = document.querySelector(`.boton[data-color="${secuenciaGenerada[indice]}"]`);
      const color = boton.getAttribute("data-color");
      switch (color) {
      case "red":
        const notaAudio = new Audio("6669.mp3");
        reproducirNota(notaAudio)
        break;
        case "green":
        const notaAudio2 = new Audio("6670.mp3");
        reproducirNota(notaAudio2)
        break;
        case "yellow":
        const notaAudio3 = new Audio("6671.mp3");
        reproducirNota(notaAudio3)
        break;
        case "blue":
        const notaAudio4 = new Audio("6672.mp3");
        reproducirNota(notaAudio4)
        break;
      default:
        break;
    }
      
      boton.style.backgroundColor = oscurecerColor(secuenciaGenerada[indice], 0.6);

      setTimeout(() => {
        boton.style.backgroundColor = colorOriginal;
        setTimeout(() => {
          indice++;
          cambiarSiguienteBoton();
        },300)
        
      }, 500);
    } else {
      turnoUsuario = true;
    }
  }

  cambiarSiguienteBoton();
}

function reproducirNota(audio) {
  audio.currentTime = 0; // Reiniciar el tiempo de reproducción para reproducir la nota nuevamente
  audio.play(); // Reproducir la nota
}

function HacerSonido(color){
  switch (color) {
    case "red":
      const notaAudio = new Audio("6669.mp3");
      reproducirNota(notaAudio)
      break;
      case "green":
      const notaAudio2 = new Audio("6670.mp3");
      reproducirNota(notaAudio2)
      break;
      case "yellow":
      const notaAudio3 = new Audio("6671.mp3");
      reproducirNota(notaAudio3)
      break;
      case "blue":
      const notaAudio4 = new Audio("6672.mp3");
      reproducirNota(notaAudio4)
      break;
    default:
      break;
  }
}

function intentoColor(div){
  if(turnoUsuario){
    let color = div.getAttribute("data-color");
    let boton = document.querySelector(`.boton[data-color="${color}"]`);
    boton.style.backgroundColor = oscurecerColor(color, 0.6)
    setTimeout(()=>{
      boton.style.backgroundColor = color
    },300)
    secuenciaUsuario.push(color);
    console.log("Secuencia usuario: ",secuenciaUsuario)
    
    let check = verificarSecuencia();
    if(check == true && nivel == secuenciaUsuario.length){
      secuenciaUsuario.length = 0;
      nivel++;
      document.getElementById("nivelActual").textContent = "Nivel: " + nivel;

      setTimeout(()=>{
        generarSecuencia();
        mostrarSecuencia();
      },1000)
      
    }
    if(check == false){
      console.log("ENTRAAAAAAAAA") 
        const error = new Audio("error.mp3");
       reproducirNota(error);
       document.body.style.backgroundColor = "#AF280E";
     }
     else{
      HacerSonido(color);
     }
    
    
  }  
}

function comprobarRecord(nivel){
  if(nivel > record){
    record = nivel
    localStorage.setItem("record", record)
    let text = document.getElementById("record");
    text.textContent = `Record: ${localStorage.getItem("record")}`;
  }
}

function verificarSecuencia() {
  console.log("NIVEL: ", nivel)
  console.log("secuen. Usuario: ", secuenciaUsuario.length)
    for (let i = 0; i < secuenciaUsuario.length; i++) {
      if (secuenciaUsuario[i] !== secuenciaGenerada[i]) {
        console.log("ERROR")
        comprobarRecord(nivel)
        nivel = 1;
        secuenciaGenerada = [];
        secuenciaUsuario = [];
        turnoUsuario = false;
        document.getElementById("nivelActual").textContent = "Nivel: " + 1;
        return false; // Si hay un error, devolver false
      }
    
    
    
  }
  return true; // Si todas las comparaciones son exitosas, devolver true
  
  return false;
  
}


function generarNumeroAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    return numeroAleatorio;
  }

  function oscurecerColor(color, factor) {
    if (color.startsWith("#")) {
      // Color en formato hexadecimal
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
      const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
      const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
      
      return `#${(newR << 16 | newG << 8 | newB).toString(16).padStart(6, '0')}`;
    } else {
      // Color en formato de nombre
      const nombresColores = {
        red: "#FF0000",
        green: "#008000",
        blue: "#0000FF",
        yellow: '#ffd900'
      };
  
      if (nombresColores[color.toLowerCase()]) {
        return oscurecerColor(nombresColores[color.toLowerCase()], factor);
      } else {
        throw new Error("Color no reconocido");
      }
    }
  }
  