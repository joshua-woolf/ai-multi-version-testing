# Create Docker network
docker network create kind

# Create local registry
docker run -d --restart=always -p 20000:5000 --name registry --network kind registry:2

# Create temporary config file for Kind
$kindConfig = @"
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
containerdConfigPatches:
- |-
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."localhost:20000"]
    endpoint = ["http://registry:5000"]
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30000
    hostPort: 30000
    protocol: TCP
  - containerPort: 30001
    hostPort: 30001
    protocol: TCP
"@

# Create Kind cluster using the config
$kindConfig | kind create cluster --config=-

# Connect the registry to the cluster network
docker network connect "kind" registry
