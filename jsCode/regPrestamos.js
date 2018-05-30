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


  
//Leer clientes
    db.collection("Clientes").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            document.getElementById('clientes').innerHTML += `
            <option value="${doc.data().Nombre + ' ' + doc.data().ApellidoP + ' ' + doc.data().ApellidoM}">
                           ${doc.data().Nombre + ' ' + doc.data().ApellidoP + ' ' + doc.data().ApellidoM}
            </option>
            `
        });
    });

    


function interes(){
    var interes1 = 0;
    var cantidad1 = document.getElementById('cantidad').value;
    
    interes1 = (cantidad1*0.05)/4;

    document.getElementById('interes').value = interes1;

}

function pago(){
    
    var cantidad = document.getElementById('cantidad').value;
    var semanas = document.getElementById('semanas').value;   
    var interes = document.getElementById('interes').value;
    
    
    var pago = cantidad/semanas;

    var total = parseInt(pago) + parseInt(interes);

    document.getElementById('pSemanal').value = parseInt(total);

    var pTotal = (parseInt(semanas)* parseInt(interes)) + parseInt(cantidad);

    document.getElementById('pTotal').value = parseInt(pTotal);
}

//Fechas
    // var f = new Date();
    // document.getElementById('fecha').value= f.getDate() + "/" + (f.getMonth()+1) + "/" + f.getFullYear();
    // document.getElementById('prueba').value = f.getDate() ;

    // if(f.getDay()==6){
    //     document.getElementById('fpPago').value=(f.getDate()+9) + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    // }else{
    //     document.getElementById('fpPago').value=(f.getDate()+8) + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    // }

    var myDate = new Date();
    var f = new Date();
    
    myDate.getFullYear();
    myDate.getDate();
    myDate.getMonth();

    var sunday = myDate.getDay();
    while (myDate.getDay() != sunday) {
        myDate.setDate(myDate.getDate()+1);
    }

    myDate.setDate(myDate.getDate()+7);

    document.getElementById('fecha').value = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    document.getElementById('fpPago').value = myDate.getDate() + "/" + (myDate.getMonth() +1) + "/" + myDate.getFullYear();



 
    


//Crear Documentos
  function guardarP(){
      var cliente = document.getElementById('clientes').value;
      var cantidad = document.getElementById('cantidad').value;
      var fecha = document.getElementById('fecha').value;
      var fpPago = document.getElementById('fpPago').value;
      var semanas = document.getElementById('semanas').value;
      var interes = document.getElementById('interes').value;
      var pSemanal = document.getElementById('pSemanal').value;
      var pTotal = document.getElementById('pTotal').value;

    db.collection("Prestamos").add({
        Cliente: cliente,
        Cantidad: cantidad,
        Fecha: fecha,
        FechaPrimerPago: fpPago,
        Semanas:semanas,
        Interes:interes,
        PagoSemanal:pSemanal,
        PagoTotal:pTotal,

    })
    .then(function(docRef) {
        alert("El Prestamo ha sido registrado");
        document.getElementById('cantidad').value = '';
        document.getElementById('semanas').value = '';
        document.getElementById('interes').value = '';
        document.getElementById('pSemanal').value = '';
        document.getElementById('pTotal').value = '';
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

