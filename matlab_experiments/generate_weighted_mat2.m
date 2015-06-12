function [ weighted_mat ] = generate_weighted_mat2( mat, weights )

    
    weighted_mat = zeros(size(mat));
    
    weights1 = weights(1:171);
    weights2 = weights(172:342);

    for i=1:69
        weighted_mat(i,:)=weights1.*mat(i,:);
    end;
    
    for i=70:138
        weighted_mat(i,:)=weights2.*mat(i,:);
    end;


end

