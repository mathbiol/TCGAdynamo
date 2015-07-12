/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function tsne(data_raw, positions){
    
    this.compute_gradient = function(P,Y){
                
                var N = Y.length;
                
                var Qu = new Float64Array(N*N);
                var distance=0;
                var t_distr;
                var denominator = 0;
                for (var i=0;i<N;i++){
                    for (var k=i+1;k<N;k++){
                        distance = this.L2_norm(Y[i],Y[k]);
                        t_distr = 1.0/(1.0+distance);
                        Qu[i*N+k] = t_distr;
                        Qu[k*N+i] = t_distr;
                        denominator+=2*t_distr;
                    }
                }
                
                var Q = new Float64Array(N*N);
                for (var i=0;i<N*N;i++){
                    Q[i] = Math.max(Qu[i]/denominator,1e-100);
                }
                
              
                
                var grad = [];
                var cost = 0;
                for (var i=0;i<N;i++){
                    var gradient_sum = new Float64Array(2);
                    for (var k=0;k<N;k++){
                        cost += - P[i*N+k] * Math.log(Q[i*N+k]);
                        var premult = 4 * (P[i*N+k] - Q[i*N+k]) * Qu[i*N+k];
                        for(var d=0;d<2;d++) {
                            gradient_sum[d] += premult * (Y[i][d] - Y[k][d]);
                        }
                    }
                    grad.push(gradient_sum);
                }
                return {cost: cost, grad: grad}; 
            }
    
    this.L2_norm = function(x,y){
                
                var dim = x.length;
                var sum = 0;
                for (var i=0;i<dim; i++){
                    sum += (x[i]-y[i])*(x[i]-y[i]);
                }
                
                //sum = Math.sqrt(sum);
                
                return sum;
                
    }
    
    this.compute_distance_matrix = function(data){
                
                var N = data.length;
                var distances = new Float64Array(N*N);
                var distance;
                for (var i=0;i<N;i++){
                    for (var k=i+1;k<N;k++){
                        distance = this.L2_norm(data[i], data[k]);
                        distances[i*N+k]=distance;
                        distances[k*N+i]=distance;
                    }
                }
                
                return distances;
                
    }
    
    this.init_solution = function(rows,cols){
                
        var x = [];
                
        for(var i=0;i<rows;i++) {
            var xrow = [];
            for (var k=0;k<cols;k++){
                xrow.push((2*Math.random()-1)*1e-4);
            }
            x.push(xrow);
        }
                
        return x;
    }
    
    this.init_solution2 = function(positions){
        
        var x = [];
        
        for (var i=0;i<positions.length;i++){
            var xrow = [];
            xrow.push(positions[i].position.x);
            xrow.push(positions[i].position.y);
            x.push(xrow);
        }
        
        return x;
    }
    
    this.compute_symmetrized_probs = function(distances, perplexity){
                
                var N = Math.sqrt(distances.length);
                var sigma=1;
                var p_row = new Float64Array(N);
                var nominator = 0;
                var denominator = 0;
                var temp_value = 0;
                var H_target = Math.log(perplexity); 
                var tol = 1e-4;
                var P = new Float64Array(N * N);
                    var maxtries = 50;

                    for (var i = 0; i < N; i++) {
                        var sigma_min = -Infinity;
                        var sigma_max = Infinity;
                        sigma = 1 / Math.sqrt(2);
                        var num = 0;
                        var done = false;
                        while (!done) {

                            denominator = 0;
                            for (var k = 0; k < N; k++) {
                                //temp_value = Math.exp(-distances[i*N+k]*sigma2);
                                temp_value = Math.exp(-distances[i * N + k] * (1 / (2 * sigma * sigma)));
                                if (i === k) {
                                    temp_value = 0;
                                }
                                p_row[k] = temp_value;
                                denominator += temp_value;

                            }
                            H_current = 0;
                            for (var k = 0; k < N; k++) {
                                p_row[k] = p_row[k] / denominator;
                                if (p_row[k] > 1e-7) {
                                    H_current -= p_row[k] * Math.log(p_row[k]);
                                }
                            }

                            if (H_current > H_target) {

                                sigma_max = sigma;
                                if (sigma_min === Infinity) {
                                    sigma = sigma / Math.sqrt(2);
                                }
                                else {
                                    sigma = (sigma + sigma_min) / 2;
                                }
                            }
                            else {
                                sigma_min = sigma;
                                if (sigma_max === Infinity) {
                                    sigma = sigma * Math.sqrt(2);
                                }
                                else {
                                    sigma = (sigma + sigma_max) / 2;
                                }
                            }

                            num++;
                            if (Math.abs(H_current - H_target) < tol) {
                                done = true;
                            }
                            if (num >= maxtries) {
                                done = true;
                            }
                        }
                        for (var k=0;k<N;k++){
                            P[i*N+k] = p_row[k];
                        }
                    }
                    var P_out = new Float64Array(N * N);
                    var N2 = N*2;
                    for(var i=0;i<N;i++) {
                        for(var k=0;k<N;k++) {
                            P_out[i*N+k] = Math.max((P[i*N+k] + P[k*N+i])/N2, 1e-100);
                        }
                    }
                    
                    return P_out;
                }
    
    this.step = function(P,Y){
                
                var N = Math.sqrt(P.length);
                var cost_gradient = this.compute_gradient(P,Y);
                var cost = cost_gradient.cost;
                //console.log(this.iter+": "+cost);
                var grad = cost_gradient.grad;
                var momentum=0.5;
                var epsilon=10;
                
                var grad_temp;
                var momentum = 0.5;
                var previous_step;
                var new_step;
                var y_mean = new Float64Array(2);
                for(var i=0;i<N;i++) {
                    for(var d=0;d<2;d++) {
                        
                        grad_temp = grad[i][d];
                        previous_step = this.y_step[i][d];
                        new_step = momentum*previous_step - epsilon * grad_temp;
                        
                        this.y_step[i][d] = new_step;
                        
                        Y[i][d] += new_step;
                        
                        y_mean[d] += Y[i][d];
                    }
                }
                
                for(var i=0;i<N;i++) {
                    for(var d=0;d<this.dim;d++) {
                        Y[i][d] -= y_mean[d]/N;
                    }
                }
                
                this.iter++;
                return Y;
            }
    
    this.data = [];
    
    for (var i=0;i<data_raw.length;i++){
        this.data[i] = [];
        for (var k=0;k<data_raw[0].RPPA.length;k++){
            this.data[i][k] = data_raw[i].RPPA[k].value;
        }
    }
    this.perplexity = 30;
    this.distances = this.compute_distance_matrix(data_raw);
    this.P = this.compute_symmetrized_probs(this.distances,this.perplexity);
    //this.Y = this.init_solution2(positions);
    this.Y = this.init_solution(data_raw.length, 2);
    this.y_step = this.init_solution(data_raw.length, 2);
    this.iter=1;
    //this.Y = this.step(this.P, this.Y);
    
    for (var i = 0; i < 500; i++) {
        this.Y = this.step(this.P, this.Y);
    }
    
    for (var i=0;i<$visualization.dots.length;i++){
        $visualization.dots[i].position.x=this.Y[i][0]*($visualization.dots.length/180)*7e7;
        $visualization.dots[i].position.y=this.Y[i][1]*($visualization.dots.length/180)*7e7;
        //console.log(this.Y[i][0]+"; "+this.Y[i][1]);
    }
    console.log("moin");
    
    
    
}