FROM osrf/ros:humble-desktop-full-jammy

ENV DEBIAN_FRONTEND=noninteractive
ARG USER_UID=1000
ARG USER_GID=1000

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    git \
    libbullet-dev \
    python3-argcomplete \
    python3-colcon-common-extensions \
    python3-flake8 \
    python3-pip \
    python3-pytest-cov \
    python3-rosdep \
    python3-setuptools \
    python3-vcstool \
    openssh-server \
    wget \
    ros-humble-rmw-cyclonedds-cpp \
    ros-humble-teleop-twist-keyboard \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --gid ${USER_GID} ros \
    && useradd --uid ${USER_UID} --gid ${USER_GID} --create-home --shell /bin/bash ros \
    && mkdir -p /home/ros/nav2_ws \
    && chown -R ros:ros /home/ros

COPY nav2_ws/neuronbot2_ros2.repos /tmp/neuronbot2_ros2.repos
RUN mkdir -p /tmp/nav2_ws/src \
    && vcs import --input /tmp/neuronbot2_ros2.repos /tmp/nav2_ws/src \
    && apt-get update \
    && rosdep update \
    && rosdep install --from-paths /tmp/nav2_ws/src --ignore-src --rosdistro humble -r -y \
    && rm -rf /tmp/nav2_ws /tmp/neuronbot2_ros2.repos /root/.ros/rosdep /var/lib/apt/lists/*

RUN python3 -m pip install --no-cache-dir transforms3d

RUN apt-get update && apt-get install -y --no-install-recommends ros-humble-tf-transformations ros-humble-bcr-bot ros-humble-rtabmap ros-humble-rtabmap-slam ros-humble-rtabmap-ros ros-humble-joint-state-publisher && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y --no-install-recommends ros-humble-nav2-simple-commander && rm -rf /var/lib/apt/lists/*

USER ros
ENV HOME=/home/ros
WORKDIR /home/ros/nav2_ws
RUN rosdep update

RUN printf '%s\n' \
    'source /opt/ros/humble/setup.bash' \
    'if [ -f ~/nav2_ws/install/local_setup.bash ]; then source ~/nav2_ws/install/local_setup.bash; fi' \
    'if [ -f /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash ]; then source /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash; fi' \
    'if [ -f /usr/share/vcstool-completion/vcs.bash ]; then source /usr/share/vcstool-completion/vcs.bash; fi' \
    'eval "$(register-python-argcomplete3 ros2)"' \
    'eval "$(register-python-argcomplete3 colcon)"' \
    'alias cw="cd ~/nav2_ws"' \
    'alias cs="cd ~/nav2_ws/src"' \
    'alias cb="cd ~/nav2_ws && colcon build --symlink-install --cmake-args -DCMAKE_BUILD_TYPE=Release"' \
    'alias tl="ros2 topic list"' \
    'alias te="ros2 topic echo"' \
    'alias nl="ros2 node list"' \
    >> /home/ros/.bashrc

CMD ["bash"]
