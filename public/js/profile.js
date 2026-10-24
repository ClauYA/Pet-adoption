const formulario = document.querySelector('.new-pet-form');
const mensaje = document.querySelector("#message")
const btnDelete = document.querySelectorAll('.btn-delete');
const newPet = document.querySelector('.btn-newPet');
const dialogPet = document.querySelector('#dialog-new-pet');
const btnCloseDialog = document.querySelector("#btn-close");
const dialogEditPet = document.querySelector('#dialog-edit-pet');
const dialogoFormNewPet = document.querySelector('.form-dialog-new-pet');
const dialogoFormEditPet = document.querySelector('.form-dialog-edit-pet');
const btnCloseDialogEdit = document.querySelector("#btn-edit-close");
//configuracion para mostrar el cuadro de dialogo para agregar una 
//nueva mascota
newPet.addEventListener('click', () =>{
    dialogPet.showModal();
})
//close the dialog
btnCloseDialog.addEventListener('click', () =>{
    dialogoFormNewPet.reset();
    dialogPet.close();
})

dialogoFormNewPet.addEventListener('submit', async (e) =>{
    //Al hacer clic en el boton submit del form, el navegador 
    // envía los datos al servidor y recarga la página.
    e.preventDefault()
    //convierte el fomrulario en {email, name, phone, password}
    const obtenerDatos = Object.fromEntries(new FormData(dialogoFormNewPet));
        try {
        //el fetch se arma con dos piezas q tenemos uno en el servidor /users y en routes/users.js post /registro
        const res = await fetch('/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obtenerDatos)
        })
        const data = await res.json()

        if (!res.ok) {
        mensaje.textContent = data.error || "Couldn't save pet"
        return
        }
        formulario.reset();
        window.location.reload();
    } catch (err) {
        mensaje.textContent = 'Error de conexión'
    }
})

formulario.addEventListener('submit', async (e) =>{
    //Al hacer clic en el boton submit del form, el navegador 
    // envía los datos al servidor y recarga la página.
    e.preventDefault()
    //convierte el fomrulario en {email, name, phone, password}
    const obtenerDatos = Object.fromEntries(new FormData(formulario));
        try {
        //el fetch se arma con dos piezas q tenemos uno en el servidor /users y en routes/users.js post /registro
        const res = await fetch('/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obtenerDatos)
        })
        const data = await res.json()

        if (!res.ok) {
        mensaje.textContent = data.error || "Couldn't save pet"
        return
        }
        formulario.reset();
        window.location.reload();
    } catch (err) {
        mensaje.textContent = 'Error de conexión'
    }
})

//Editarrrr
document.querySelectorAll('.btn-edit').forEach( boton =>{
  boton.addEventListener('click', () => 
    editPet(boton.dataset.id))
})

async function editPet(id) { 
  try {
    const res = await fetch(`/pets/${id}`)
    if (!res.ok) {
      alert('no cargaaaaa!')
      return
    }
    const pet = await res.json();
    dialogoFormEditPet.elements.id.value = pet._id;
    dialogoFormEditPet.elements.name.value = pet.name;
    dialogoFormEditPet.elements.type.value = pet.type;
    dialogoFormEditPet.elements.breed.value = pet.breed;
    dialogoFormEditPet.elements.age.value = pet.age;
    dialogoFormEditPet.elements.sex.value = pet.sex;

    dialogEditPet.showModal()
  } catch (err) {
    alert('Connection error', err.message)
  }
}



//necesito recuperar el token 
const token = localStorage.getItem('token')

btnDelete.forEach(boton => {
boton.addEventListener('click', () => {
    eliminar(boton.dataset.id)
})
})

async function eliminar(id) {
  if (!confirm('Delete this pet?')) return

  try {
    const res = await fetch(`/pets/${id}`, {
      method: 'delete',
      headers: { Authorization: `Bearer ${token}` }
    })
    //cuando el token no coinciden
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
      return
    }

    if (!res.ok) {
      const data = await res.json()
      alert(data.error || 'Could not delete')
      return
    }

    window.location.reload()
  } catch (err) {
    alert('Connection error')
  }
}