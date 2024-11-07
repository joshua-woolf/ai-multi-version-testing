# Install Traefik
kubectl apply -f k8s/traefik-config.yaml
kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-definition-v1.yml

# Build and push API versions
Push-Location api
docker build -t localhost:5000/weather-api:v1 --build-arg API_VERSION=1 .
docker push localhost:5000/weather-api:v1
docker build -t localhost:5000/weather-api:v2 --build-arg API_VERSION=2 .
docker push localhost:5000/weather-api:v2

# Build and push webapp
Set-Location ../webapp
docker build -t localhost:5000/weather-webapp .
docker push localhost:5000/weather-webapp

# Deploy to Kubernetes
Set-Location ..
kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/api-routes.yaml
kubectl apply -f k8s/webapp-deployment.yaml

# Wait for Traefik to be ready
Write-Host "Waiting for Traefik to be ready..."
kubectl wait --for=condition=available deployment/traefik --timeout=60s

Write-Host "Deployment complete!"
Write-Host "Access the webapp at http://localhost:30000"
Write-Host "API is available at http://localhost:30001/weather"

# Return to original directory
Pop-Location
