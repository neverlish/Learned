FROM osrf/ros:humble-desktop-full-jammy

ENV DEBIAN_FRONTEND=noninteractive

ARG USER_UID=1000
ARG USER_GID=1000

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    python3-argcomplete \
    python3-colcon-common-extensions \
    python3-rosdep \
    python3-vcstool \
    ros-humble-rmw-cyclonedds-cpp \
    ros-humble-teleop-twist-keyboard \
    ros-humble-turtlesim \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /tmp/tiago_public_ws/src \
    && vcs import --input https://raw.githubusercontent.com/pal-robotics/tiago_tutorials/humble-devel/tiago_public.repos /tmp/tiago_public_ws/src \
    && git clone --depth 1 --branch foxy-devel https://github.com/pal-robotics/backward_ros.git /tmp/tiago_public_ws/src/backward_ros \
    && apt-get update \
    && rosdep update \
    && rosdep install --from-paths /tmp/tiago_public_ws/src --ignore-src --rosdistro humble -y \
    && rm -rf /tmp/tiago_public_ws /root/.ros/rosdep /var/lib/apt/lists/*

RUN groupadd --gid ${USER_GID} ros \
    && useradd --uid ${USER_UID} --gid ${USER_GID} --create-home --shell /bin/bash ros \
    && mkdir -p /home/ros/ros2_ws \
    && chown -R ros:ros /home/ros

USER ros
ENV HOME=/home/ros
WORKDIR /home/ros/ros2_ws

RUN rosdep update

RUN printf '%s\n' \
    'source /opt/ros/humble/setup.bash' \
    'if [ -f ~/ros2_ws/install/local_setup.bash ]; then source ~/ros2_ws/install/local_setup.bash; fi' \
    'if [ -f /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash ]; then source /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash; fi' \
    'if [ -f /usr/share/vcstool-completion/vcs.bash ]; then source /usr/share/vcstool-completion/vcs.bash; fi' \
    'if [ -f /usr/share/colcon_cd/function/colcon_cd.sh ]; then source /usr/share/colcon_cd/function/colcon_cd.sh; export _colcon_cd_root=~/ros2_ws; fi' \
    'eval "$(register-python-argcomplete3 ros2)"' \
    'eval "$(register-python-argcomplete3 colcon)"' \
    'alias cw="cd ~/ros2_ws"' \
    'alias cs="cd ~/ros2_ws/src"' \
    'alias ccd="colcon_cd"' \
    'alias cb="cd ~/ros2_ws && colcon build --symlink-install --base-paths src .ros2/tiago_public/src"' \
    'alias cbs="colcon build --symlink-install --base-paths src .ros2/tiago_public/src"' \
    'alias cbp="colcon build --symlink-install --base-paths src .ros2/tiago_public/src --packages-select"' \
    'alias cbu="colcon build --symlink-install --base-paths src .ros2/tiago_public/src --packages-up-to"' \
    'alias ct="colcon test"' \
    'alias ctp="colcon test --packages-select"' \
    'alias ctr="colcon test-result"' \
    'alias tl="ros2 topic list"' \
    'alias te="ros2 topic echo"' \
    'alias nl="ros2 node list"' \
    'alias di="rosdep install --from-paths src .ros2/tiago_public/src -y --ignore-src --os=ubuntu:jammy"' \
    >> /home/ros/.bashrc

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip \
    ros-humble-pmb2-simulation \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --no-cache-dir transforms3d

USER ros

CMD ["bash"]
