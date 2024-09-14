let notes = [];

//Resetear los input despues de usarlos
const resetInput = () => {
  const add = document.getElementById("note");
  const edit = document.getElementById("edit");
  const numberEdit = document.getElementById("number-edit");
  const eliminate = document.getElementById("eliminate");

  let a = (add.value = "");
  let b = (edit.value = "");
  let c = (numberEdit.value = "");
  let d = (eliminate.value = "");

  return a, b, c, d;
};

// Funcion que agrega las notas al array
const add = () => {
  let info = document.getElementById("note").value;
  if (info === "") {
    alert("Esta vacia la nota");
  } else {
    notes.push(info);
    saveNotes(); // Guarda las notas actualizadas en localStorage
  }
  view();
  resetInput();
};

//Funcion para mostrar los datos guardados
const view = () => {
  let read = document.getElementById("list");
  read.innerHTML = "";
  for (let i = 0; i < notes.length; i++) {
    read.innerHTML += `<li>${notes[i]}</li>`;
  }
};

//Funcion para editar los datos en el array
const edit = () => {
  let input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Cual numero quieres editar?";
  input.classList.add("datum");
  input.id = "number-edit";

  let edit = document.createElement("input");
  edit.type = "text";
  edit.placeholder = "Nueva nota";
  edit.classList.add("datum");
  edit.id = "edit";

  //Se pregunta si en el document esta el id si no esta se crea ...
  let button =
    document.getElementById("change") || document.createElement("button");
  if (!button.id) {
    button.id = "change";
    button.textContent = "Confirmar el cambio";
    button.classList.add("boton");
    let container = document.getElementById("container");
    container.appendChild(input);
    container.appendChild(edit);
    container.appendChild(button);

    button.addEventListener("click", () => {
      let indice = parseInt(input.value) - 1;
      let nuevaNota = edit.value;
      if (indice < 0 || indice >= notes.length) {
        alert("El indice no existe");
      } else if (nuevaNota === "") {
        alert("La nota esta vacia");
      } else {
        notes[indice] = nuevaNota;
        view();
        saveNotes();
        resetInput();
      }
    });
  }
};

const eliminate = () => {
  let input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Cual  numero quieres eliminar?";
  input.classList.add("datum");
  input.id = "eliminate";

  //Se pregunta si en el document esta el id si no esta se crea ...
  let button =
    document.getElementById("confirmar") || document.createElement("button");
  if (!button.id) {
    button.textContent = "Confirmar";
    button.id = "confirmar";
    button.classList.add("boton");

    let container = document.getElementById("container");
    container.appendChild(input);
    container.appendChild(button);

    button.addEventListener("click", () => {
      let number = input.value - 1;
      if (number < 0 || number >= notes.length) {
        alert("El indice no existe");
      } else {
        notes.splice(number, 1);
        view();
        saveNotes();
        resetInput();
      }
    });
  }
};

//verifica el local storage
if (localStorage.getItem("note")) {
  notes = JSON.parse(localStorage.getItem("note"));
  view();
}

const saveNotes = () => {
  // Guarda las notas en el localStorage en formato JSON
  localStorage.setItem("note", JSON.stringify(notes));
};
