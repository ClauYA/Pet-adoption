//aca se hace lo q hacia en controllers cuando solo habia backend
const formularioLogin = document.querySelector('#login-form');
const mensaje = document.querySelector("#message");

formularioLogin.addEventListener('submit', async (e) =>{
    //Al hacer clic en el boton submit del form, el navegador 
    // envía los datos al servidor y recarga la página.
    e.preventDefault()
    //convierte el fomrulario en {email, name, phone, password}
    const obtenerDatos = Object.fromEntries(new FormData(formularioLogin));
    console.log(obtenerDatos)
        try {
        //el fetch se arma con dos piezas q tenemos uno en el servidor /users
        //y en routes/users.js post /registro
        const res = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obtenerDatos)
        })
        const data = await res.json()
        console.log(data)
        if (!res.ok) {
        mensaje.textContent = data.error || "Couldn't login"
        return
        }
        //en el controller generamos el token y necesitamos almacenar la clave token aqui
        //El token se guarda de manera permanente en el navegador y no se borra aunque cierres la pestaña o el navegador
        // se guarda xq vamos de login a otra pagina donde se necesita enviar a esa nueva pagina el token de autorization
        //no es seguro poner en localstorage
        localStorage.setItem('token', data.token)
        window.location.href = `/users/profile?token=${data.token}`
    } catch (err) {
        mensaje.textContent = 'Error de conexión'
    }
})