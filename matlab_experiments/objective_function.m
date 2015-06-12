function answer  = objective_function(weights,indices_below, indices_above, mat)

    weights1 = weights(1:171);
    weights2 = weights(172:342);

    weighted_above = generate_weighted_mat(weights1,indices_above,mat);
    weighted_below = generate_weighted_mat(weights2,indices_below,mat);
    
    D1=squareform(pdist(weighted_above,'cosine'));
    D2=squareform(pdist(weighted_below,'cosine'));
    D3 = pdist2(weighted_above,weighted_below,'cosine');
    
    sum1=0;
    for i=1:size(weighted_above,1)
        sum1=sum1+mean(D1(i,:));
    end;
    sum1=sum1/(size(D1,1));
    
    sum2=0;
    for i=1:size(weighted_below,1)
        sum2=sum2+mean(D2(i,:));
    end;
    sum2=sum2/(size(D1,1));
    
    sum3=0;
    for i=1:size(weighted_above,1)
        sum3=sum3+mean(D3(i,:));
    end;
    sum3=sum3/(size(D1,1));
    
   
    answer = (sum1+sum2)/sum3
    %answer=(sum_distances(weighted_above)+sum_distances(weighted_below))/sum_distance_between(weighted_above,weighted_below);

end

