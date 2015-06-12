function [ sum_over ] = sum_distance_between( obs1, obs2 )

    D = pdist2(obs1,obs2,'euclidean');
    %sum_over = sum(sum(D))/(size(D,1)*size(D,2));
    sum_over=D;
    %sum_over=max(D(:))
    
end

