const inputEmail = document.getElementById("logemailregister");
const inputPassword = document.getElementById("logpassregister");
const formregister = document.getElementById("formregister");

formregister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("lognameregister").value;
  const email = inputEmail.value;
  const password = inputPassword.value;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
  const regex_username = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

  if (name === "" || email === "" || password === "") {
    //alert('Debes rellenar todos los campos');
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "Debes rellenar todos los campos",
    });
    return;
  } else if (!regex.test(email)) {
    // alert('El email no es válido [ Debe ser del tipo: @example.com ]');
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "El email no es válido [ Debe ser del tipo: @example.com ]",
    });
    return;
  } else if (!regex_password.test(password)) {
    // alert('La contraseña no es válida [ Debe ser mayor a 6 caracteres, contener al menos una mayúscula, una minúscula y un número ]');
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title:
        "La contraseña no es válida [ Debe ser mayor a 6 caracteres, contener al menos una mayúscula, una minúscula y un número ]",
    });
    return;
  } else if (!regex_username.test(name)) {
    // alert('El nombre de usuario no es válido [ Debe ser mayor a 6 caracteres, contener al menos una mayúscula y una minúscula ]');
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title:
        "El nombre de usuario no es válido [ Debe ser mayor a 6 caracteres, contener al menos una mayúscula y una minúscula ]",
    });
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/api/register", {
      name,
      email,
      password,
    });
    console.log(response);
    //alert('Usuario registrado correctamente');
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    })
      .fire({
        icon: "success",
        title: "Usuario registrado correctamente",
      })
      .then(() => {
        location.reload();
      });
  } catch (error) {
    console.error(error);
    // alert('Este usuario ya existe');
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
        })
        .fire({
            icon: "error",
            title: "Este usuario ya existe",
        })
        .then(() => {
            location.reload();
    });
  }
});
