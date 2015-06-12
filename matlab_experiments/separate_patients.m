function [indices_below indices_above] = separate_patients( mat )

    [n,m] = size(mat);
    mean_survival = mean(mat(:,1))
    
    counter_below=0;
    counter_above=0;
    
    for i=1:n
        if mat(i,1)<mean_survival
            counter_below=counter_below+1;
        end;
    end;
    
    for i=1:n
        if mat(i,1)>mean_survival
            counter_above=counter_above+1;
        end;
    end;

    indices_below = zeros(1,counter_below);
    indices_above = zeros(1,counter_above);
    
    counter1=1;
    counter2=1;
    
    for i=1:n
        if mat(i,1)<mean_survival
            indices_below(1,counter1)=i;
            counter1=counter1+1;
        else
            indices_above(1,counter2)=i;
            counter2=counter2+1;
        end;
    end;
    
end

