## General Docker Commands

```shell
# Displays the installed Docker version.
docker --version

# Shows system-wide information about Docker,
# including number of containers, images, and storage details.
docker info

# Lists all available Docker commands and options.
docker help
```

## Image Management

```shell
# Lists all images on the local machine.
docker images

# Downloads an image from Docker Hub or another registry.
docker pull [image-name]

# Builds a Docker image using a Dockerfile in the current directory
# and tags it with a name.
docker build -t [image-name] .

# Tags an image with a different name or version.
docker tag [source-image] [target-image:tag]

# Pushes an image to a registry like Docker Hub.
docker push [image-name]

# Removes one or more images by ID or name.
docker rmi [image-id]
```

## Container Management

```shell
# Lists all running containers.
docker ps

# Lists all containers, including stopped ones.
docker ps -a

# Creates and starts a container from an image
docker run [options] [image-name]
    # Common options
    -d # Run the container in detached mode.
    -p [host-port]:[container-port] # Maps a port from the host to the container.
    --name [container-name] # Assigns a name to the container.
    -v [host-path]:[container-path] # Mounts a volume.

# Removes a container.
docker rm [container-id/name]

# Forces the removal of a running container.
docker rm -f [container-id/name]

# Stops a running container
docker stop [container-id/name]

# Starts a stopped container
docker start [container-id/name]

# Restarts a container
docker restart [container-id/name]
```

## Container Interaction

```shell
# Runs a command inside a running container.
docker exec [container-id/name] [command]
# Example: docker exec -it [container-id] /bin/bash opens a bash shell in the container.

# Shows logs from a container.
docker logs [options] [container-id/name]
    --follow: Streams logs in real-time.

# Attaches your terminal to a running container's standard input/output.
docker attach [container-id/name]

# Forcing Immediate Termination. Sends SIGKILL
docker kill [options] [container-id/name]
    --signal, -s: Specifies the signal to send to the container. By default, it uses SIGKILL.
# Example signals: SIGTERM, SIGHUP, SIGINT.
```

## Debugging Commands

```shell
# Shows detailed information about a container, image, or network.
docker inspect [object-id/name]

# Displays real-time resource usage statistics of running containers.
docker stats [container-id/name]

# Shows processes running inside a container.
docker top [container-id/name]

# Streams real-time events from the Docker daemon.
docker events
```
