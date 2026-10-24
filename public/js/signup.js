const formulario = document.querySelector('#signup-form');
const mensaje = document.querySelector("#message")

formulario.addEventListener('submit', async (e) =>{
    //Al hacer clic en el boton submit del form, el navegador 
    // envía los datos al servidor y recarga la página.
    e.preventDefault()
    //convierte el fomrulario en {email, name, phone, password}
    const obtenerDatos = Object.fromEntries(new FormData(formulario));

        try {
        //el fetch se arma con dos piezas q tenemos uno en el servidor /users y en routes/users.js post /registro
        const res = await fetch('/users/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obtenerDatos)
        })
        const data = await res.json()

        if (!res.ok) {
        mensaje.textContent = data.error || "Couldn't register"
        return
        }
        window.location.href = '/auth/login'
    } catch (err) {
        mensaje.textContent = 'Error de conexión'
    }
})
