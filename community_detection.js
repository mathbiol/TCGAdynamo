community = function(graph){
    
    this.graph = graph;
    this.community_of_node = [];
    this.in = [];
    this.tot = [];
    this.size = graph.nnodes;
    for (var i=0;i<this.size;i++){
        this.community_of_node[i]=i;
        this.in[i] = 0;
        this.tot[i] = graph.degrees[i];
    }
    
    this.iteration = function(){
        var improvement = false;
        this.random_order = [];
        for (var i=0;i<this.size;i++){
            this.random_order[i]=i;
        }
        for (var i=0;i<this.size;i++){
            var random_pos = Math.floor(Math.random() * this.size-1);
            var tmp = this.random_order[i];
            this.random_order[i] = this.random_order[random_pos];
            this.random_order[random_pos] = tmp;
        }
        do{
        improvement=false;
       
        for (var tmp_node=0; tmp_node<this.size; tmp_node++){
            var node = tmp_node;
            var node_community = this.community_of_node[node];
            var neighboring_communities = this.get_community_neighborhood(node);
           
            var index_of_node_comm;
            for (var i=0;i<neighboring_communities.length;i++){
                if (neighboring_communities[i][0]==node_community)
                    index_of_node_comm=i;
            }
            
            this.remove(node, node_community, neighboring_communities[index_of_node_comm][1]);
            var best_community= node_community;
            var best_number_links = 0;
            var best_increase = 0;
            
            for (var i=0;i<neighboring_communities.length;i++){
                var increase = this.modularity_gain(node, neighboring_communities[i][0], neighboring_communities[i][1]);
                
                if (increase>best_increase){
                    best_community = neighboring_communities[i][0];
                    best_number_links = neighboring_communities[i][1];
                    best_increase = increase;
                }
            }
            
            this.insert(node, best_community, best_number_links);
            
            if (best_community!=node_community){
                improvement=true;
            }
            
        }
        console.log(this.modularity());
    }while(improvement==true);
        
        
       
    }
    
    this.modularity = function(){
        var q=0;
        var m2=this.graph.total_weight;
        
        for (var i=0;i<this.size;i++){
            if (this.tot[i]>0){
                q=q+this.in[i]/m2-((this.tot[i]/m2)*(this.tot[i]/m2));
            }
        }
        
        return q;
    }
    
    this.modularity_gain=function(node, community, dnodecomm){
        
        var totc = this.tot[community];
        var degc = this.graph.degrees[node];
        var m2 = this.graph.total_weight;
        var dnc = dnodecomm;
        
        return (dnc-(totc*degc/m2));
        
    }
    
    this.get_community_neighborhood=function(node){
        
        var communities = [];
        var neighbors = this.graph.node_neighbors[node];
        var deg = this.graph.degrees[node];
        communities[0]=[];
        communities[0][0]=this.community_of_node[node];
        communities[0][1]=0;
        
        for (var i=0;i<deg;i++){
            var neighbor = neighbors[i];
            var community_of_neighbor = this.community_of_node[neighbor];
            var neighbor_weight = 1;
            
            if (neighbor!=node){
                
                var found=false;
                var array_position=0;
                for (var k=0;k<communities.length;k++){
                    if (communities[k][0]==community_of_neighbor){
                        found=true;
                        array_position=k;
                    }
                }
                
                if (found){
                    communities[array_position][1]+=neighbor_weight;
                }
                else{
                    var array_length = communities.length;
                    communities[array_length]=[];
                    communities[array_length][0]=community_of_neighbor;
                    communities[array_length][1]=neighbor_weight;
                }
                
            }
            
            
        }
        
        return communities;
    }
    
    this.remove=function(node, community, dnodecomm){
        this.tot[community]-=this.graph.degrees[node];
        this.in[community]-=2*dnodecomm;
        this.community_of_node[node]=-1;
    }
    
    this.insert=function(node, community, dnodecomm){
        this.tot[community]+=this.graph.degrees[node];
        this.in[community]+=2*dnodecomm;
        this.community_of_node[node]=community;
    }
    
}

