let notes = [];

// Resetear los inputs después de usarlos
const resetInput = () => {
  document.getElementById("note").value = "";
  const editElement = document.getElementById("edit");
  if (editElement) {
    editElement.value = "";
  }
  const numberedit = document.getElementById("number-edit");
  if (numberedit) {
    numberedit.value = "";
  }
  const eliminate = document.getElementById("eliminate");
  if (eliminate) {
    eliminate.value = "";
  }
};

// Función que agrega las notas al array
const add = () => {
  let info = document.getElementById("note").value;
  if (info === "") {
    alert("La nota está vacía");
  } else {
    notes.push(info);
    saveNotes();
    view();
    resetInput();
  }
};

// Función para mostrar los datos guardados
const view = () => {
  let read = document.getElementById("list");
  read.innerHTML = "";
  notes.forEach((note, index) => {
    read.innerHTML += `<li>${index + 1}. ${note}</li>`;
  });
};

// Función para crear elementos input en el DOM
const createInput = (id, placeholder, type, autocomplete) => {
  let input = document.getElementById(id);
  if (!input) {
    input = document.createElement("input");
    input.id = id;
    input.placeholder = placeholder;
    input.type = type;
    input.autocomplete = autocomplete;
  }
  return input;
};

// Función para crear botones en el DOM
const createButton = (text, id, callback) => {
  let button = document.getElementById(id);
  if (!button) {
    button = document.createElement("button");
    button.textContent = text;
    button.id = id;
    button.classList.add("boton");
    button.addEventListener("click", callback);
  }
  return button;
};

// Función para manejar el cambio o eliminación
const manageAction = (actionType) => {
  let inputId = actionType === "edit" ? "number-edit" : "eliminate";
  let input = createInput(
    inputId,
    `¿Qué número quieres ${actionType === "edit" ? "editar" : "eliminar"}?`,
    "number",
    "on"
  );
  input.classList.add("datum");

  let container = document.getElementById("container");
  container.appendChild(input);

  let callback = () => {
    let number = parseInt(input.value) - 1;
    if (isNaN(number) || number < 0 || number >= notes.length) {
      alert("El índice no es válido");
      return;
    }

    if (actionType === "edit") {
      let newNote = document.getElementById("edit")?.value || "";
      if (newNote === "") {
        alert("La nota está vacía");
        return;
      }
      notes[number] = newNote;
    } else {
      notes.splice(number, 1);
    }

    view();
    saveNotes();
    resetInput();
  };

  if (actionType === "edit") {
    let newNoteInput = createInput("edit", "Nueva nota", "text", "on");
    newNoteInput.classList.add("datum");
    container.appendChild(newNoteInput);
  }

  let button = createButton("Confirmar", `confirm-${actionType}`, callback);
  container.appendChild(button);
};

// Función para editar los datos en el array
const edit = () => manageAction("edit");

// Función para eliminar una nota del array
const eliminate = () => manageAction("eliminate");

// Verificar el localStorage
if (localStorage.getItem("note")) {
  notes = JSON.parse(localStorage.getItem("note"));
  view();
}

// Guarda las notas en localStorage en formato JSON
const saveNotes = () => {
  localStorage.setItem("note", JSON.stringify(notes));
};
