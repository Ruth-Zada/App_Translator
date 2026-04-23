App Translator - DevOps Project

A complete DevOps microservices platform showcasing Kubernetes-based deployment with Helm, Docker, and scalable service architecture. Built as a hands-on DevOps project to simulate a real-world microservices environment running on Kubernetes.

## Project Goal
This project demonstrates how to design, containerize, deploy, and manage a scalable microservices system using modern DevOps tools and best practices.

## Architecture
The system is built using a distributed architecture to ensure scalability, maintainability, and separation of concerns.

Architecture

## Components

### Frontend
Static web application  
Served using Nginx  
Communicates with backend via internal Kubernetes DNS  

### Backend
Built with Node.js  
Handles API requests  
Communicates with Translator service  
Stores translation history in PostgreSQL  

### Translator Service
Powered by LibreTranslate  
Self-hosted translation engine  
Provides language translation API  

### Database
PostgreSQL  
Stores translation history  
Uses Persistent Volume for data durability  

## System Flow
User accesses the system via Ingress (translator.local)  
Request is routed to the Frontend  
Frontend sends API request to Backend  
Backend sends translation request to Translator  
Translated text is returned to Backend  
Backend stores result in PostgreSQL  
Response is returned to the user  

## DevOps Highlights
Containerized multi-service application using Docker  
Orchestrated services using Kubernetes Deployments & Services  
Implemented Ingress Controller (NGINX) for routing  
Used Persistent Volumes (PV & PVC) for database storage  
Configured environment variables for dynamic configuration  
Packaged application using Helm Charts  
Internal communication using Kubernetes DNS  
Multi-container architecture (microservices)  

## Prerequisites
Docker  
Kubernetes (Minikube)  
Helm  
kubectl  

## How to Run

### Kubernetes (Recommended)
minikube start  
minikube addons enable ingress  

cd helm/app-translator  
helm dependency build  
helm install app-translator .  

## Access Application
echo "$(minikube ip) translator.local" | sudo tee -a /etc/hosts  

Open browser:  
http://translator.local  

## API Example
curl -X POST http://translator.local/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"hello","from":"en","to":"he"}'

Expected response:

{
  "translation": "שלום"
}

## Deployment Verification
All pods are running (kubectl get pods)  
Services are accessible via Ingress  
Backend communicates with PostgreSQL and Translator service  
Data persists after pod restart  

## Challenges & Solutions
Fixed service communication issues using kubectl logs and kubectl exec  
Solved DNS resolution problems between services  
Debugged container startup failures  
Implemented readiness & liveness probes for stability  
Ensured persistent storage works correctly after pod recreation  

## Project Structure
app-translator/  
├── backend/  
├── frontend/  
├── docker-compose.yml  
├── k8s/  
├── helm/  
│   └── app-translator/  
├── architecture.png  
└── README.md  

## Key Learnings
Designed and deployed a microservices architecture on Kubernetes  
Kubernetes networking and service discovery  
Stateful workloads with PostgreSQL  
Helm chart creation and templating  
Debugging distributed systems  
Infrastructure as Code (IaC)  

## Future Improvements
Add CI/CD pipeline (GitHub Actions)  
Add monitoring (Prometheus + Grafana)  
Add logging (ELK Stack)  
Implement authentication & security  
Deploy to cloud (AWS / GCP)  

## Author
DevOps Engineer in progress  
Focused on building scalable and production-ready systems
