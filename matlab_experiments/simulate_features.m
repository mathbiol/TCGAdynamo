function [ observations ] = simulate_features()

    observations = zeros(100,150);
    for i=1:50
    mean = 2;
    standard_dev = 2;
    features(1:30) = standard_dev.*randn(30,1) + mean;
    
    mean=-2;
    standard_dev = 2;
    features(31:60) = standard_dev.*randn(30,1) + mean;
    
    mean=0;
    standard_dev = 1;
    features(61:150) = standard_dev.*randn(90,1) + mean;
    
    %features(1:150) = standard_dev.*randn(150,1) + mean;
    %features(1:50) = features(1:50)/10;
    
    %features(1:150) = standard_dev.*randn(150,1) + mean;
    
    observations(i,:)=features;
    end;

    for i=51:100
    
    mean=-2;
    standard_dev = 2;
    features(1:30) = standard_dev.*randn(30,1) + mean;
    
    mean = 2;
    standard_dev = 2;
    features(31:60) = standard_dev.*randn(30,1) + mean;
    
    mean=0;
    standard_dev = 1;
    features(61:150) = standard_dev.*randn(90,1) + mean;
    
    %features(1:150) = standard_dev.*randn(150,1) + mean;
    
    %features(1:50) = features(1:50)/10;
    
    %features(1:150) = standard_dev.*randn(150,1) + mean;
    
    observations(i,:)=features;
    end;
    
    
    for i=1:100
        %observations(i,1:60) = observations(i,1:60)./(randi([1 50],1,60));
    end;
    
    observations = observations(:,randperm(size(observations,2)));
    
end

