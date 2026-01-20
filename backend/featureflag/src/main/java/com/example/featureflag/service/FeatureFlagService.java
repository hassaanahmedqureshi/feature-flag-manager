package com.example.featureflag.service;

import com.example.featureflag.model.FeatureFlag;
import com.example.featureflag.repository.FeatureFlagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureFlagService {
    
    @Autowired
    private FeatureFlagRepository repo;
    
    public List<FeatureFlag> getAllFlags() {
        return repo.findAll();
    }
    
    public FeatureFlag createFlag(FeatureFlag flag) {
        return repo.save(flag);
    }
    
    public List<FeatureFlag> getFlagsByEnvironment(String env) {
        return repo.findByEnvironment(env);
    }
    
    public FeatureFlag toggleFlag(Long id) {
        FeatureFlag flag = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Flag not found"));
        flag.setEnabled(!flag.isEnabled());
        return repo.save(flag);
    }
    
    public void deleteFlag(Long id) {
        repo.deleteById(id);
    }
}