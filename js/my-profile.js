document.addEventListener('DOMContentLoaded', ()=> {

    let userimg         = document.querySelector('#userimg')

    if (localStorage.getItem('userimg') === undefined) {
        userimg.src = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
     } else { userimg.src = localStorage.getItem('userimg')}

    var user = JSON.parse(localStorage.getItem('usuario'))

    if (localStorage.getItem('usuario') !== null) {

        nombre1.value       = user.nombre1
        nombre2.value       = user.nombre2
        apellido1.value     = user.apellido1
        apellido2.value     = user.apellido2
        email.value         = localStorage.getItem('user')
        number.value        = user.number

    }

    let profilesubmit = document.querySelector('#profilesubmit')
        profilesubmit.addEventListener('click', ()=> {

            let nombre1         = document.querySelector('#nombre1').value
            let nombre2         = document.querySelector('#nombre2').value
            let apellido1       = document.querySelector('#apellido1').value
            let apellido2       = document.querySelector('#apellido2').value
            let email           = document.querySelector('#email').value
            let number          = document.querySelector('#number').value
            

            const usuario = {

            nombre1: nombre1,    
            nombre2: nombre2,    
            
            apellido1: apellido1,
            apellido2: apellido2,
            
            email: email,
            number: number

            }



            savelocal('usuario', JSON.stringify(usuario))   
    
        })
})

function savelocal(nombre, valor) {

    localStorage.setItem(nombre, valor)


}


const fileUpload = document.querySelector('#fileupload')

    fileUpload.addEventListener('change', () => {

        let userimg = fileUpload.files[0]
        const ph = new FileReader()

        ph.readAsDataURL(userimg)

            ph.onload = () => {

                localStorage.setItem('userimg', ph.result)

            }
    
    })