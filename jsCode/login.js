firebase.initializeApp({
    apiKey: "AIzaSyDZQPI_DkvJYAZP6ySwU4x0v34RoUXUyu0",
    authDomain: "prestacasa-1758e.firebaseapp.com",
    databaseURL: "https://prestacasa-1758e.firebaseio.com",
    projectId: "prestacasa-1758e",
    storageBucket: "prestacasa-1758e.appspot.com",
    messagingSenderId: "315948810598"
  });

//Obtener elementos del DOM
 const userEmail = document.getElementById('email_field');
 const userPass = document.getElementById('password_field');
 const btnLogin = document.getElementById('btnLogin');

 //Añadir evento login_form
 btnLogin.addEventListener('click', e => {
   //Obtene email y pass
   const email = userEmail.value;
   const pass = userPass.value;
   const auth = firebase.auth();
   //Sign in
   const promise = auth.signInWithEmailAndPassword(email, pass);
   promise.catch(e => console.log(e.message));
   firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // ...
     alert('Error: '+errorMessage);
   });

 });
 //Añadir un listener en tiempo real
 firebase.auth().onAuthStateChanged(firebaseUser => {
   if (firebaseUser) {
     window.location.replace("https://rikmtzl.github.io/vistasAgente/RegClientes.html");
     // location.href ="file:///C:/xampp/htdocs/PrestaCasa/Vistas%20Agente/RegClientes.html";
   }else {
     console.log('no logeado');
   }
 });
 var user = firebase.auth().currentUser;
