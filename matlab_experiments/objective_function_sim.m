function [ answer ] = objective_function_sim( observations, weights )

    patients_below = observations(1:69,:);
    patients_above = observations(70:138,:);
    
    weights1 = weights(1:171);
    weights2 = weights(172:342);
    
    weighted_below = generate_weighted_mat_sim(patients_below,weights1);
    weighted_above = generate_weighted_mat_sim(patients_above,weights2);
    
    %weighted_below = generate_weighted_mat_sim(patients_below,weights);
    %weighted_above = generate_weighted_mat_sim(patients_above,weights);
    
    D1=squareform(pdist(weighted_above,'euclidean'));
    D2=squareform(pdist(weighted_below,'euclidean'));
    D3 = pdist2(weighted_above,weighted_below,'euclidean');
    
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
    
   
    answer = (sum1+sum2)/sum3;

end

