function [ sum_over ] = sum_distances( observations )

    D=pdist(observations,'euclidean');
    
    sum_over = D;

end

