const nombreUsuario = document.querySelector("#usuario");
const passwordUsuario = document.querySelector("#password");
const btnSubmit = document.querySelector(
  "#formulario-login button[type='submit']"
);
const formulario = document.querySelector("#formulario-login");

//Objeto de usuario
const usr = {
  usuario: "",
  password: "",
  color: "text-black",
};
//asignar eventos
nombreUsuario.addEventListener("input", validar);
passwordUsuario.addEventListener("input", validar);
formulario.addEventListener("submit", iniciarSesion);

function validar(e) {
  if (e.target.value.trim(" ") === "") {
    mostrarError(`No puede ir vacío el ${e.target.id}`, e.target.parentElement);
    return;
  }
  if (e.target.id === "usuario") {
    const existeUsuario = usuarios.some(
      (usr) => usr.usuario === e.target.value
    );
    if (!existeUsuario) {
      mostrarError(`No existe este usuario`, e.target.parentElement);
      usr.usuario = "";
      validarUsuario();
      return;
    }
    limpiarError(e.target.parentElement);
    usr["usuario"] = e.target.value.trim();
  }
  limpiarError(e.target.parentElement);
  usr[e.target.name] = e.target.value.trim();

  validarUsuario();
}

function mostrarError(msj, referencia) {
  limpiarError(referencia);
  const error = document.createElement("span");
  error.classList.add("text-red-500", "text-sm", "alerta-error");
  error.textContent = msj;
  referencia.appendChild(error);
  referencia.children[1].classList.add("border-2", "border-red-600");
}

function limpiarError(referencia) {
  const alerta = referencia.querySelector(".alerta-error");
  if (alerta) {
    alerta.remove();
    referencia.children[1].classList.remove("border-2", "border-red-600");
  }
}

function validarUsuario() {
  if (Object.values(usr).includes("")) {
    btnSubmit.classList.add("opacity-50");
    btnSubmit.disabled = true;
    return;
  }
  btnSubmit.classList.remove("opacity-50");
  btnSubmit.disabled = false;
}

function iniciarSesion(e) {
  e.preventDefault();
  const usuarioDB = usuarios.filter(
    (usuario) => usuario.usuario === usr.usuario
  );
  if (usuarioDB[0].password === usr.password) {
    localStorage.setItem("usuario", usr.usuario);
    localStorage.setItem("text-color", usuarioDB[0].color);
    window.location.href = "perfil.html";
  } else {
    mostrarError("Contraseña incorrecta", e.target.children[1]);
    e.target.children[1].children[1].value = "";
    usr.password = "";
    validarUsuario();
  }
}
