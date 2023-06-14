if (!document.cookie.includes('token')) window.location.href = "/sections/auth.html"

const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', () => {

    // eliminar cookie

    localStorage.removeItem('id');
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = "../sections/auth.html"

})

document.addEventListener('DOMContentLoaded', async () => {
    const element = document.getElementById('barber');
    const barbers = await fetch('http://localhost:3000/api/barber', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${document.cookie.split('=')[1]}`
        }
    })

    const barbersJson = await barbers.json();

    barbersJson.barbers.forEach((barber) => {
        const option = document.createElement('option');
        option.value = barber._id;
        option.innerHTML = barber.name;
        element.appendChild(option);
    })

});

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const barber = document.getElementById('barber').value;
    const service = document.getElementById('service').value;
    let comments = document.getElementById('comments').value;

    console.log(name, date, time, barber, service, comments);

    if (!name || !date || !time || !barber || !service) {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        }).fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Faltan campos por completar!'
        })
        return;
    }

    if (comments == '') {
        comments = 'Sin pedido especial';
    }

    try {
        const response = await fetch('http://localhost:3000/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${document.cookie.split('=')[1]}`
            },
            body: JSON.stringify({
                name,
                date,
                time,
                barber,
                service,
                comments
            })
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            }).fire({
                icon: 'success',
                title: 'Reserva realizada con exito!'
            }).then(function () {
                location.reload();
            });
        } else if (response.status === 401) {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            }).fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No tienes permisos para realizar esta accion!'
            })
        } else if (response.status === 400 || response.status === 405) {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            }).fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya existe una reserva para este dia y hora!'
            }).then(function () {
                location.reload();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonText: 'Ok'
            })
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonText: 'Ok'
        })
    }
});