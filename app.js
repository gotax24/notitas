let notas = [];

const agregar = () => {
  let notita = document.getElementById("nota").value;
  if (notita === "") {
    alert("Esta vacia la nota");
  } else {
    notas.push(notita);
  }
  ver();
};

const ver = () => {
  let leer = document.getElementById("lista");
  leer.innerHTML = "";
  for (let i = 0; i < notas.length; i++) {
    leer.innerHTML += `<li>${notas[i]} </li>`;
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
      notas[indice] = nuevaNota;
      ver();
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

      let newNotes = [];
      for (let i = 0; i < notas.length; i++) {
        if (i != number) {
          newNotes.push(notas[i]);
        }
      }
      notas = newNotes;
      ver();
    });
  }
};
