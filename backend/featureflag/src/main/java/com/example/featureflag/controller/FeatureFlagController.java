package com.example.featureflag.controller;

import com.example.featureflag.model.FeatureFlag;
import com.example.featureflag.service.FeatureFlagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flags")
public class FeatureFlagController {
    
    @Autowired
    private FeatureFlagService service;
    
    @GetMapping
    public List<FeatureFlag> getAllFlags(@RequestParam(required = false) String environment) {
        if (environment != null) {
            return service.getFlagsByEnvironment(environment);
        }
        return service.getAllFlags();
    }
    
    @PostMapping
    public FeatureFlag createFlag(@RequestBody FeatureFlag flag) {
        return service.createFlag(flag);
    }
    
    @GetMapping("/environment/{env}")
    public List<FeatureFlag> getFlagsByEnvironment(@PathVariable String env) {
        return service.getFlagsByEnvironment(env);
    }
    
    @PutMapping("/{id}/toggle")
    public FeatureFlag toggleFlag(@PathVariable Long id) {
        return service.toggleFlag(id);
    }
    
    @DeleteMapping("/{id}")
    public void deleteFlag(@PathVariable Long id) {
        service.deleteFlag(id);
    }
}