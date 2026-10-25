const formulario = document.querySelector('.formulario');
const mensaje = document.querySelector("#message")
const btnDelete = document.querySelectorAll('.btn-delete');
const dialogEditPet = document.querySelector('#dialog-edit-pet');
const dialogoFormEditPet = document.querySelector('#form-dialog-edit-pet');
const btnCloseDialogEdit = document.querySelector("#btn-edit-close");
const btnEditPet = document.querySelector('.btn-edit');

formulario.addEventListener('submit', async (e) =>{
    //Al hacer clic en el boton submit del form, el navegador 
    // envía los datos al servidor y recarga la página.
    e.preventDefault()
    //convierte el fomrulario en {email, name, phone, password}
    const obtenerDatos = Object.fromEntries(new FormData(formulario));
    obtenerDatos.age = Number(obtenerDatos.age);
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
Array.from(btnEditPet).forEach(function(element){
  element.addEventListener('click', function(){
    const obj = element.closest('tr').children;
    dialogoFormEditPet.elements.itemId.value = element.dataset.id;
    dialogoFormEditPet.elements.name.value  = obj[0].textContent.trim();
    dialogoFormEditPet.elements.type.value = obj[1].textContent.trim();
    dialogoFormEditPet.elements.breed.value = obj[2].textContent.trim();
    dialogoFormEditPet.elements.age.value = obj[3].textContent.trim();
    dialogoFormEditPet.elements.sex.value = obj[4].textContent.trim();
    dialogoFormEditPet.elements.description.value = obj[5].textContent.trim();
    dialogoFormEditPet.elements.adopt.value = obj[6].textContent.trim();
    dialogEditPet.showModal();
  })
});
//este es mi boton para la cancelacion del update en el cuadro de dialogo
document.getElementById('edit-cancel').addEventListener('click', () => 
  dialog.close());

dialogoFormEditPet.addEventListener('submit', async function (e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(dialogoFormEditPet))
  const id = data.itemId
  delete data.itemId
  data.age = Number(data.age)

  try {
    const respuesta = await fetch(`/pets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!respuesta.ok) throw new Error("Couldn't update")
    window.location.reload()
  } catch (err) {
    console.error(err.message)
    alert(err.message)
  }
})

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