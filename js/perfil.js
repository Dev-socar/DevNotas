const usuarioNombre = document.querySelector("#usuario");
const btnLogout = document.querySelector(".cerrar-sesion");
const formulario = document.querySelector("#formulario-nota");
const listadoNotas = document.querySelector("#notas");
let notas = [];

eventos();
function eventos() {
  formulario.addEventListener("submit", agregarNota);
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length === 0) {
      window.location.href = "index.html";
      return;
    }
    notas = JSON.parse(localStorage.getItem("notas")) || [];
    crearHTML();
    iniciarApp();
  });
}

function iniciarApp() {
  infoUsuario();
  cerrarSession();
}

function cerrarSession() {
  btnLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}

function infoUsuario() {
  const usuario = localStorage.getItem("usuario");
  const textColor = localStorage.getItem("text-color");
  usuarioNombre.textContent = `{${usuario}}`;
  usuarioNombre.classList.add(textColor);
}

function agregarNota(e) {
  e.preventDefault();
  const titulo = document.querySelector("#titulo").value;
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${año}`;
  const notaTexto = document.querySelector("#nota").value;
  if (titulo.trim(" ") === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puede ir vacío el Título",
      timer: 3000,
    });
    return;
  }
  if (notaTexto.trim(" ") === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puede ir vacía la nota",
      timer: 3000,
    });
    return;
  }
  const nota = {
    id: Date.now(),
    titulo,
    fecha: fechaFormateada,
    notaTexto,
  };
  notas = [...notas, nota];
  crearHTML();
  Swal.fire({
    icon: "success",
    title: "Nota creada correctamente",
    showConfirmButton: false,
    timer: 1500,
  });

  formulario.reset();
}

function crearHTML() {
  limpiarHTML();
  if (notas.length > 0) {
    notas.forEach((nota) => {
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add(
        "p-1",
        "text-white",
        "bg-red-500",
        "rounded-md",
        "justify-self-end"
      );
      btnEliminar.onclick = () => {
        borrarNota(nota.id);
      };

      const notaDiv = document.createElement("div");
      notaDiv.classList.add("nota", "shadow-md", "rounded-md", "p-5", "w-full");

      notaDiv.innerHTML = `
            <h3 class="text-2xl">${nota.titulo}</h3>
                    <span class="text-sm text-slate-400">${nota.fecha}</span>
                    <p class="text-lg text-justify">${nota.notaTexto}</p>
            `;
      notaDiv.appendChild(btnEliminar);
      listadoNotas.appendChild(notaDiv);
    });
  }
  storeLocal();
}

function borrarNota(id) {
  notas = notas.filter((nota) => nota.id !== id);
  crearHTML();
}

function storeLocal() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function limpiarHTML() {
  while (listadoNotas.firstChild) {
    listadoNotas.removeChild(listadoNotas.firstChild);
  }
}
