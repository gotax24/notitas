let notas = [];

const agregar = () => {
  let notita = document.getElementById("nota").value;
  if (notita === "") {
    alert("Esta vacia la nota");
  } else {
    notas.push(notita);
    guardarNotasEnLocalStorage(); // Guarda las notas actualizadas en localStorage
  }
  ver();
};

const ver = () => {
  let leer = document.getElementById("lista");
  leer.innerHTML = "";
  for (let i = 0; i < notas.length; i++) {
    leer.innerHTML += `<li>${notas[i]}</li>`;
  }
};

const editar = () => {
  let input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Cual numero quieres editar?";

  let edicion = document.createElement("input");
  edicion.type = "text";
  edicion.placeholder = "Nueva nota";

  let boton2 =
    document.getElementById("cambio") || document.createElement("button");
  if (!boton2.id) {
    boton2.id = "cambio";
    boton2.textContent = "Confirmar cambio";
    let contenedor = document.getElementById("contenedor");
    contenedor.appendChild(input);
    contenedor.appendChild(edicion);
    contenedor.appendChild(boton2);

    boton2.addEventListener("click", () => {
      let indice = parseInt(input.value) - 1;
      let nuevaNota = edicion.value;
      if (indice < 0 || indice >= notas.length) {
        alert("El indice no existe");
      } else if (nuevaNota === "") {
        alert("La nota esta vacia");
      } else {
        notas[indice] = nuevaNota;
        ver();
      }
    });
  }
};

const eliminar = () => {
  let input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Cual  numero quieres eliminar?";

  let boton2 =
    document.getElementById("confirmar") || document.createElement("button");
  if (!boton2.id) {
    boton2.textContent = "Confirmar eliminacion";
    boton2.id = "confirmar";

    let contendeor = document.getElementById("contenedor");
    contendeor.appendChild(input);
    contendeor.appendChild(boton2);

    boton2.addEventListener("click", () => {
      let number = input.value - 1;
      if (number < 0 || number >= notas.length) {
        alert("El indice no existe");
      } else {
        notas.splice(number, 1);
        ver();
      }
    });
  }
};

//Verifica el local storage
if (localStorage.getItem("notitas")) {
  notas = JSON.parse(localStorage.getItem("notitas"));
  ver();
}

const guardarNotasEnLocalStorage = () => {
  // Guarda las notas en el localStorage en formato JSON
  localStorage.setItem("notitas", JSON.stringify(notas));
};