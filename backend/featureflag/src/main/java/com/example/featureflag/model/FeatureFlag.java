package com.example.featureflag.model;

import jakarta.persistence.*;

@Entity
@Table(name = "feature_flags")
public class FeatureFlag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String environment;
    
    @Column(nullable = false)
    private boolean enabled;
    
    public FeatureFlag() {}
    
    public FeatureFlag(String name, String environment, boolean enabled) {
        this.name = name;
        this.environment = environment;
        this.enabled = enabled;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEnvironment() {
        return environment;
    }
    
    public void setEnvironment(String environment) {
        this.environment = environment;
    }
    
    public boolean isEnabled() {
        return enabled;
    }
    
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}