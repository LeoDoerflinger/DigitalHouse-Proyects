const submitFunction = (event) => {
  if (!validarFormulario()){
    event.preventDefault();
  }else{
    event.preventDefault();
    alert(
        "¡Formulario enviado correctamente!" + "\n" +
        "Nombre: "+ document.getElementById("nombre").value + "\n"+
        "Apellido: "+ document.getElementById("apellido").value + "\n"+
        "Documento: "+ document.getElementById("documento").value + "\n"+
        "Edad: "+ document.getElementById("edad").value + "\n"+
        "Email: "+ document.getElementById("mail").value + "\n"+
        "Actividad: "+ document.getElementById("actividad").value + "\n"+
        "Nivel académico: "+ document.getElementById("estudio").value + "\n"
        
    )
  }
};

document
  .getElementById("formulario")
  .addEventListener("submit", submitFunction);

function validarFormulario() {
  //ESTO VALIDA LOS CAMPOS DE TEXTO
  const camposTexto = document.querySelectorAll(`input[type="text"]`);
  let validacionCorrecta = true;
  camposTexto.forEach((campo) => {
    let errorCampo = document.getElementById(
      `error` + campo.id.charAt(0).toUpperCase() + campo.id.slice(1)
    ); //error + id con la palabra en mayuscula
    if (campo.value.length == "") {
      mostrarError(errorCampo, "¡Este campo está vacío!");
      validacionCorrecta = false;
    } else if (campo.value.length > 0 && campo.value.length < 7) {
      mostrarError(errorCampo, "¡Este campo debe tener al menos 7 caracteres!");
      validacionCorrecta = false;
    } else {
      ocultarError(errorCampo);
    }
  });
  //ESTO VALIDA EL EMAIL
  const email = document.getElementById("mail");
  let errorEmail = document.getElementById("errorMail");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    //ESTE REGEX VALIDA EL FORMATO DEL MAIL
    ocultarError(errorEmail);
  } else {
    mostrarError(errorEmail, "¡Ingrese un correo electrónico válido!");
  }
  //ESTO VALIDA LA EDAD
  const edad = document.getElementById("edad");
  const errorEdad = document.getElementById("errorEdad");
  if (edad.value < 18) {
    mostrarError(errorEdad, "¡Debes tener al menos 18 años para ingresar!");
    validacionCorrecta = false;
  } else {
    ocultarError(errorEdad);
  }

  //ESTO VALIDA LA ACTIVIDAD

  const actividad = document.getElementById("actividad");
  const errorActividad = document.getElementById("errorActividad");
  if (actividad.value == "") {
    mostrarError(errorActividad, "¡Debes seleccionar una actividad!");
    validacionCorrecta = false;
  } else {
    ocultarError(errorActividad);
  }

  //ESTO VALIDA LOS ESTUDIOS
  const estudios = document.getElementById("estudio");
  const errorEstudios = document.getElementById("errorEstudio");
  if (estudios.value == "") {
    mostrarError(errorEstudios, "¡Debes seleccionar un nivel de estudios!");
    validacionCorrecta = false;
  } else {
    ocultarError(errorEstudios);
  }

  //ESTO VALIDA LOS TYC
  const tyc = document.getElementById("terminos");
  const errorTyc = document.getElementById("errorTerminos");
  if (terminos.checked == false) {
    mostrarError(errorTyc, "¡Debes aceptar los términos y condiciones!");
    validacionCorrecta = false;
  } else {
    ocultarError(errorTyc);
  }

  return validacionCorrecta; //el formulario es válido
}

const mostrarError = (elemento, mensaje) => {
  elemento.textContent = mensaje;
  elemento.style.display = "block";
};

const ocultarError = (elemento) => {
  elemento.textContent = "";
  elemento.style.display = "none";
};
