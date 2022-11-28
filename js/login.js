document.addEventListener('DOMContentLoaded', () => {
    
    const boton = document.querySelector('#logBtn');
    

    boton.addEventListener('click', (event) => {
        console.log('click')
        event.preventDefault();

        const email = document.querySelector('#email')
        const password= document.querySelector('#password')

        console.log(password)
       
        if (email.value == '' || password.value == '') {
            document.getElementById('password').classList.add('is-invalid');
            document.getElementById('email').classList.add('is-invalid');
        } else {
            location.replace("home.html")
            
        }  

        localStorage.setItem("user", email.value);

    })
}) 

     
