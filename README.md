# Feature Flag Manager

A minimal SaaS-style feature flag service inspired by LaunchDarkly.
Built to demonstrate full-stack development, CI/CD, and Kubernetes deployment.

Tech: Angular, Spring Boot, MySQL, Docker, Kubernetes.

## Getting Started

### 1. Clone Repository
```bash
git clone <repository-url>
cd feature-flag-manager
```

### 2. Setup MySQL Database
Run MySQL and create a database, or let Spring Boot auto-create it:
```bash
mysql -u root -p
CREATE DATABASE featureflag;
```

### 3. Run Backend
```bash
cd backend/featureflag
mvn spring-boot:run
```

### 4. Run Frontend
```bash
cd frontend
npm install
ng serve
```

### 5. Open Application
Open your browser and navigate to: http://localhost:4200
