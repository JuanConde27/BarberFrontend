const form = document.querySelector("#forgot-password-form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.elements.email.value;
    try {
        const response = await fetch("http://localhost:3000/api/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if (response.ok) {
            Swal.fire({
                title: "¡Listo!",
                text: "Te hemos enviado un correo electrónico con las instrucciones para restablecer tu contraseña.",
                icon: "success",
                confirmButtonText: "Ok"
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "No se encontró ninguna cuenta con ese correo electrónico.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error!",
            text: "Ocurrió un error inesperado intentalo más tarde.",
            icon: "error",
            confirmButtonText: "Ok"
        });
    }
});