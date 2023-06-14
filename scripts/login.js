const formlogin = document.getElementById("formlogin");
const inputEmailLogin = document.getElementById("logemail");
const inputPasswordLogin = document.getElementById("logpass");

formlogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = inputEmailLogin.value;
  const password = inputPasswordLogin.value;

  if (email === "" || password === "") {
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
      }
    })
      .fire({
        icon: "error",
        title: "Debes rellenar todos los campos",
      })
    return;
  }

  try {
    const res = await axios.post("https://barberbackend-3z4s.onrender.com/api/login", {
      email,
      password,
    });
    console.log(res);

    if (res.status === 200) {
      // alert('Usuario logueado correctamente');
      // crear la cookie
      const token = res.data.token;
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

      document.cookie = `token=${token}; expires=${expires}; path=/`;

      const id = res.data.id;
      localStorage.setItem("id", id);

      if (res.data.role === "USER_ROLE") {
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
            title: "¡Bienvenido!",
          })
          .then(function () {
            window.location.href = "../sections/booking.html";
          });
      } else if (res.data.role === "BARBER_ROLE") {
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
            title: "¡Bienvenido!",
          })
          .then(function () {
            window.location.href = "../sections/dashboard_barber.html";
          });
      } else if (res.data.role === "ADMIN_ROLE") {
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
            title: "¡Bienvenido!",
          })
          .then(function () {
            window.location.href = "../sections/dashboard_admin.html";
          });
      }
    }
  } catch (error) {
    console.log(error.response.data.message);
    // alert('Email o contraseña incorrectos');
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
        title: "Email o contraseña incorrectos",
      })
      .then(function () {
        location.reload();
      }
    );
  }
});
