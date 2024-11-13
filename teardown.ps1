# Delete Kind cluster
kind delete cluster

# Remove Docker registry
docker stop registry
docker rm registry

# Remove Docker network
docker network rm kind

Write-Host "Teardown complete!"
