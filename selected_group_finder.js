function messageHandler(event) {
    
    var patients = event.data["patients"];
    var parameter = event.data["parameter"];
    var value = event.data["value"];
    var selected_patients=[];
    
    for (var i=0;i<patients.length;i++){
        if (patients[i].clinical[parameter]==value){
            selected_patients.push(i);
        }
    }
    
    
    this.postMessage(selected_patients);
}

// Defining the callback function raised when the main page will call us
this.addEventListener('message', messageHandler, false);