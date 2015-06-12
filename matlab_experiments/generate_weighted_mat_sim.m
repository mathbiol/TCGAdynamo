function [ weighted_mat ] = generate_weighted_mat_sim( mat, weights )

    nrows = size(mat,1);
    weighted_mat = zeros(size(mat));
    
    for i=1:nrows
       weighted_mat(i,:)=weights.*mat(i,:) ;
    end;


end

