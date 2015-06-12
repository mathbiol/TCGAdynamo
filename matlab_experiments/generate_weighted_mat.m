function [ observations ] = generate_weighted_mat( weights, indices, mat )

    n_rows = size(indices,2);
    n_cols = size(mat,2)-1;
    observations = zeros(n_rows,n_cols);
    
    for i=1:n_rows
        observations(i,:)=weights.*mat(indices(i),2:end);
    end;

end

