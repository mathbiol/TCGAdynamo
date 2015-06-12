function [ ordered_mat ] = preprocess( mat )

    med = median(mat(:,1));
    counter1=1;
    counter2=1;
    ordered_mat = zeros(size(mat,1),size(mat,2)-1);
    
    for i=1:size(mat,1)
        if mat(i,1)<med
            ordered_mat(counter1,:)=mat(i,2:end);
            counter1=counter1+1;
        end;
    end;
    
    counter1 = counter1-1;
    
    for i=1:size(mat,1)
        if mat(i,1)>med
            ordered_mat(counter1+counter2,:)=mat(i,2:end);
            counter2=counter2+1;
        end;
    end;

end

