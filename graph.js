graph = function(nnodes){
   
    this.nnodes = nnodes;
    this.nedges = 0;
    this.total_weight = 0;
    this.edges = [];
    this.edgecounter = 0;
    this.degrees = [];
    this.node_neighbors = [];
    
    
    this.add_edge = function(source, target){
        this.edges[this.edgecounter] = [];
        this.edges[this.edgecounter].source=source;
        this.edges[this.edgecounter].target=target;
        this.edgecounter++;
        this.total_weight=this.edgecounter*2;
        
    }
    
    this.compute_weights = function(){
        for (var i=0;i<this.nnodes;i++){
            this.degrees[i]=0;
        }
        for (var i=0;i<this.edgecounter;i++){
            this.degrees[this.edges[i].source]++;
            this.degrees[this.edges[i].target]++;
        }
        
    }
    
    this.compute_node_neighbors = function(){
        for (var i=0;i<this.nnodes;i++){
            this.node_neighbors[i] = [];
        }
        for (var i=0;i<this.edgecounter;i++){
            this.node_neighbors[this.edges[i].source][this.node_neighbors[this.edges[i].source].length]=this.edges[i].target;
            this.node_neighbors[this.edges[i].target][this.node_neighbors[this.edges[i].target].length]=this.edges[i].source;
        }
    }
    
    this.list_edges = function(){
        for (var i=0;i<this.edgecounter;i++){
            console.log(this.edges[i].source+", "+this.edges[i].target);
        }
    }
    
    this.list_node_weights = function(){
        for (var i=0;i<this.nnodes;i++){
            console.log(i+": "+this.degrees[i]);
        }
    }
    
    
}