import document from "document";
import { exercise } from "exercise"; // Registra calorías y pulso
import { me } from "appbit"; // Controla la ejecución de la app

// 1. Definición de tu rutina de rehabilitación
const rutina = [
  { nombre: "20 CRUNCH", img: "crunch.png" },
  { nombre: "20 SENTADILLAS", img: "sentadilla.png" },
  { nombre: "10 FLEXIONES", img: "flexion.png" }
];

let pasoActual = 0;

// 2. Referencias a los elementos de la pantalla
const txtNombre = document.getElementById("exercise-name");
const imgEjercicio = document.getElementById("exercise-img");
const btnSiguiente = document.getElementById("btn-next");
const btnAnterior = document.getElementById("btn-prev");

// 3. Iniciar el seguimiento biométrico (Calorías/Ritmo Cardíaco)
if (exercise.state === "stopped") {
  exercise.start("workout", { autosave: true });
}

// 4. Función para refrescar la interfaz
function mostrarPaso() {
  const ejercicio = rutina[pasoActual];
  txtNombre.text = ejercicio.nombre;
  imgEjercicio.href = `assets/${ejercicio.img}`;

  // Ocultar botón "Anterior" si estamos en el primer ejercicio
  btnAnterior.style.display = (pasoActual === 0) ? "none" : "inline";

  // Cambiar texto de "Siguiente" a "Finalizar" en el último paso
  const textoBoton = btnSiguiente.getElementById("text");
  textoBoton.text = (pasoActual === rutina.length - 1) ? "FINALIZAR" : "SIGUIENTE";
}

// 5. Configuración de los botones
btnSiguiente.addEventListener("activate", () => {
  if (pasoActual < rutina.length - 1) {
    pasoActual++;
    mostrarPaso();
  } else {
    // Si es el último, para el ejercicio y cierra la app
    exercise.stop();
    me.exit();
  }
});

btnAnterior.addEventListener("activate", () => {
  if (pasoActual > 0) {
    pasoActual--;
    mostrarPaso();
  }
});

// Carga inicial
mostrarPaso();