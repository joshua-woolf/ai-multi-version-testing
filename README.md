# Weather Forecast Application

A Kubernetes-based weather forecast application with versioned API support and a web frontend.

## Features

- Web interface displaying weather forecasts
- Dual API versions (v1: Celsius, v2: Fahrenheit)
- Traefik-powered routing
- Kubernetes deployment ready

## Prerequisites

- Docker
- Kind (Kubernetes in Docker)
- PowerShell
- kubectl

## Quick Start

1. Create the Kubernetes cluster and local registry:
   
```powershell
create-cluster.ps1
```

1. Deploy the application:
2. 
```powershell
.\deploy.ps1
```

Access the application:
Web UI: http://localhost:30000
API: http://localhost:30001/weather
API Versions
V1 (Default): Returns temperatures in Celsius with summer weather
V2: Returns temperatures in Fahrenheit with winter weather
To switch versions, add `?version=1` or `?version=2` to the web UI URL.

Local Development
The application uses a local Docker registry at localhost:20000 for development. All services are containerized and can be rebuilt using the provided Dockerfiles.
