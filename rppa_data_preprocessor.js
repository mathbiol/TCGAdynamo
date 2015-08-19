function messageHandler(event) {
    
    var patients = event.data["patients"];
    var groups = event.data["groups"];
    
    function merge_data(){
        
        merged_data = [];
        
        var number_selected_groups = Object.keys(groups).length;
        var step = 0.8/(number_selected_groups+1);
        var offset=step;
        var temp_counter=1;
        var min=Number.POSITIVE_INFINITY;
        var max=Number.NEGATIVE_INFINITY;
        for (var i in groups){
            for (var x=0;x<groups[i].length;x++){
                for (var k=0;k<patients[0].RPPA.length;k++){
                    var x_pos=k-0.4+offset;
                    point=[x_pos,parseFloat(patients[groups[i][x]].RPPA[k].value),temp_counter];
                    if (parseFloat(patients[groups[i][x]].RPPA[k].value)>max){
                        max = parseFloat(patients[groups[i][x]].RPPA[k].value);
                    }
                    if (parseFloat(patients[groups[i][x]].RPPA[k].value)<min){
                        min = parseFloat(patients[groups[i][x]].RPPA[k].value);
                    }
                    merged_data.push(point);
                    
                }
            }
            if (groups[i].length>0){
                temp_counter++;
                offset=offset+step;  
            }
        }
        return {"data":merged_data, "min":min, "max":max};
    }
    
    points = merge_data();
    
    this.postMessage(points);
}

this.addEventListener('message', messageHandler, false);

