# NeuronBot2 ROS 2 Humble 작업 공간

호스트 OS는 그대로 두고 Docker 컨테이너에서 Ubuntu 22.04 기반 ROS 2 Humble과 Gazebo Classic을 실행합니다. NeuronBot2 전용 이미지는 `docker/neuronbot2/Dockerfile`, 실행 설정은 `docker/neuronbot2/compose.yaml`에 있습니다.

## 워크스페이스 구성

- `nav2_ws/`: 호스트의 NeuronBot2 워크스페이스. 컨테이너에서는 `~/nav2_ws/`로 연결됩니다.
- `nav2_ws/src/`: `vcs import`로 가져온 NeuronBot2 외부 패키지이며 Git에서 추적할 수 있습니다.
- `nav2_ws/build/`, `nav2_ws/install/`, `nav2_ws/log/`: colcon 빌드 산출물이며 Git에서 제외됩니다.
- 이 프로젝트에서 직접 작성하는 패키지는 `ros2_ws/src/`에 둡니다.

## 이미지 빌드 및 소스 가져오기

이미지 빌드 과정에서 강의에 나온 시스템 패키지와 NeuronBot2 저장소의 rosdep 의존성을 설치합니다.

```bash
sudo docker compose -f docker/neuronbot2/compose.yaml build
```

호스트의 `nav2_ws/`가 컨테이너의 `~/nav2_ws/`로 연결되므로 저장소 루트에서 다음을 실행해 저장소를 가져오고 빌드합니다.

```bash
sudo docker compose -f docker/neuronbot2/compose.yaml run --rm humble bash -lc 'cd ~/nav2_ws && wget -O neuronbot2_ros2.repos https://raw.githubusercontent.com/Adlink-ROS/neuronbot2_ros2.repos/humble/neuronbot2_ros2.repos && mkdir -p src && vcs import src < neuronbot2_ros2.repos && rosdep update && rosdep install --from-paths src --ignore-src -r -y --rosdistro humble && colcon build --symlink-install --cmake-args -DCMAKE_BUILD_TYPE=Release'
```

## 시뮬레이션 실행 및 조작

시뮬레이션을 실행합니다.

```bash
sudo docker compose -f docker/neuronbot2/compose.yaml run --rm humble bash -lc 'source /opt/ros/humble/setup.bash && source ~/nav2_ws/install/local_setup.bash && ros2 launch neuronbot2_gazebo neuronbot2_world.launch.py'
```

별도의 터미널에서 키보드 조작 노드를 실행합니다.

```bash
sudo docker compose -f docker/neuronbot2/compose.yaml run --rm humble bash -lc 'source /opt/ros/humble/setup.bash && source ~/nav2_ws/install/local_setup.bash && ros2 run teleop_twist_keyboard teleop_twist_keyboard'
```

각 명령은 `Ctrl+C`로 종료합니다. Gazebo GUI의 `gazebo::rendering::Camera` assertion 오류를 피하도록 Compose에서 `GAZEBO_RESOURCE_PATH=/usr/share/gazebo-11`을 설정합니다. Compose는 호스트 네트워크, X11 디스플레이, NVIDIA GPU를 사용합니다.
