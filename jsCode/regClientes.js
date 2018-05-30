firebase.initializeApp({
    apiKey: "AIzaSyDZQPI_DkvJYAZP6ySwU4x0v34RoUXUyu0",
    authDomain: "prestacasa-1758e.firebaseapp.com",
    databaseURL: "https://prestacasa-1758e.firebaseio.com",
    projectId: "prestacasa-1758e",
    storageBucket: "prestacasa-1758e.appspot.com",
    messagingSenderId: "315948810598"
  });

  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

  //Cerrar sesion
   btnLogout.addEventListener('click', e => {
     firebase.auth().signOut();
   })
  //Crear Documentos
  function guardarC(){
      var nombre = document.getElementById('nombre').value;
      var apellidoP = document.getElementById('apellidoP').value;
      var apellidoM = document.getElementById('apellidoM').value;
      var edad = document.getElementById('edad').value;
      var telefono = document.getElementById('telefono').value;
      var direccion = document.getElementById('direccion').value;
      var sexo = document.getElementById('sexo').value;

    if(
        document.getElementById('nombre').value == '' ||
        document.getElementById('apellidoP').value == '' ||
        document.getElementById('apellidoM').value == '' ||
        document.getElementById('edad').value == '' ||
        document.getElementById('telefono').value == '' ||
        document.getElementById('direccion').value == ''
    ){
        alert("Porfavor llene los campos faltantes para continuar");
    }else{
        db.collection("Clientes").add({
            Nombre: nombre,
            ApellidoP: apellidoP,
            ApellidoM: apellidoM,
            Edad:edad,
            Telefono:telefono,
            Direccion:direccion,
            Sexo:sexo,
        })
        .then(function(docRef) {
            alert("El Cliente ha sido registrado");
            document.getElementById('nombre').value = '';
            document.getElementById('apellidoP').value = '';
            document.getElementById('apellidoM').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('direccion').value = '';



        })
        .catch(function(error) {
            alert("El cliente no se pudo registrar, intentelo de nuevo");
            console.error("Error adding document: ", error);
        });

    }
  }

  //Leer documentos
var tabla = document.getElementById('tabla');
db.collection("Clientes").onSnapshot((querySnapshot) =>{
    tabla.innerHTML = '';
    querySnapshot.forEach((doc)=>{

        console.log(`${doc.id} => ${doc.data().Nombre}`);
        document.getElementById('tabla').innerHTML += `
        <tr>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().ApellidoP}</td>
            <td>${doc.data().ApellidoM}</td>
            <td>${doc.data().Edad}</td>
            <td>${doc.data().Telefono}</td>
            <td>${doc.data().Direccion}</td>
            <td>${doc.data().Sexo}</td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().Nombre}','${doc.data().ApellidoP}','${doc.data().ApellidoM}','${doc.data().Edad}','${doc.data().Telefono}','${doc.data().Direccion}','${doc.data().Sexo}')">Editar</button></td>
            <td><button class="btn btn-danger"  onclick="eliminar('${doc.id}')">Eliminar</button></td>
          </tr>
        `
    });
});

//Borrar documentos
function eliminar(id){
    db.collection("Clientes").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Editar Documentos
function editar(id,nombre,apellidoP,apellidoM,edad,telefono,direccion,sexo){
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellidoP').value = apellidoP;
    document.getElementById('apellidoM').value = apellidoM;
    document.getElementById('edad').value = edad;
    document.getElementById('telefono').value = telefono;
    document.getElementById('direccion').value = direccion;
    document.getElementById('sexo').value = sexo;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';

    boton.onclick= function(){

        var editar = db.collection("Clientes").doc(id);
        var nombre = document.getElementById('nombre').value;
        var apellidoP = document.getElementById('apellidoP').value;
        var apellidoM = document.getElementById('apellidoM').value;
        var edad = document.getElementById('edad').value;
        var telefono = document.getElementById('telefono').value;
        var direccion = document.getElementById('direccion').value;
        var sexo = document.getElementById('sexo').value;


        return editar.update({
                Nombre: nombre,
                ApellidoP: apellidoP,
                ApellidoM: apellidoM,
                Edad:edad,
                Telefono:telefono,
                Direccion:direccion,
                Sexo:sexo,
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML="Agregar";
            document.getElementById('nombre').value = '';
            document.getElementById('apellidoP').value = '';
            document.getElementById('apellidoM').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('direccion').value = '';

        }
    )

        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }

}
