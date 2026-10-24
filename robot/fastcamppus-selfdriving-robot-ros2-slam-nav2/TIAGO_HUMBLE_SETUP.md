# TIAGo ROS 2 Humble 작업 공간

호스트는 Ubuntu 24.04를 그대로 사용합니다. Docker 컨테이너 안에서 Ubuntu 22.04 기반 ROS 2 Humble 환경을 실행합니다.

## 작업 공간 구성

- `src/`: 이 프로젝트에서 개발하는 패키지
- `.ros2/tiago_public/src/`: PAL에서 제공하는 TIAGo 공개 의존성 소스. 내려받은 소스는 Git에서 제외합니다.
- 환경을 구성할 때 PAL Humble 튜토리얼 브랜치에서 TIAGo 공개 저장소 목록을 가져옵니다.
- `build/`, `install/`, `log/`: `colcon` 빌드로 생성되며 Git에서 제외합니다.

## Docker 이미지 빌드

저장소 루트에서 실행합니다.

```bash
sudo docker compose build
```

이미지에는 Humble, Gazebo Classic, TIAGo 시스템 의존성, Cyclone DDS, `teleop_twist_keyboard`, `turtlesim`, `pmb2_simulation`, Python `transforms3d`가 포함됩니다.

## TIAGo 작업 공간 가져오기 및 빌드

컨테이너 셸을 엽니다.

```bash
sudo docker compose run --rm humble
```

컨테이너 안에서 공개 저장소를 가져오고 의존성을 설치한 뒤 빌드합니다.

```bash
vcs import --input https://raw.githubusercontent.com/pal-robotics/tiago_tutorials/humble-devel/tiago_public.repos .ros2/tiago_public/src
git clone --depth 1 --branch foxy-devel https://github.com/pal-robotics/backward_ros.git .ros2/tiago_public/src/backward_ros
rosdep install --from-paths src .ros2/tiago_public/src --ignore-src --rosdistro humble -y
cb
```

`cb` 별칭은 `src/`와 `.ros2/tiago_public/src/`에 있는 패키지를 함께 빌드합니다.

## 새 ROS 2 패키지 만들기

Compose의 작업 디렉터리는 패키지 저장소 루트입니다. `ros2 pkg create`는 기본적으로 현재 디렉터리에 패키지 폴더를 만들기 때문에, `src/`에 만들려면 대상 디렉터리를 지정합니다.

```bash
sudo docker compose run --rm humble bash -lc 'source /opt/ros/humble/setup.bash && ros2 pkg create --build-type ament_python --destination-directory src my_package --dependencies rclpy'
```

## 호스트 터미널에서 공개 시뮬레이션 실행

컨테이너 셸을 직접 열 필요는 없습니다. 저장소 루트에서 첫 번째 호스트 터미널로 시뮬레이션을 시작합니다.

```bash
sudo docker compose run --rm humble bash -lc 'source /opt/ros/humble/setup.bash && source install/setup.bash && ros2 launch tiago_gazebo tiago_gazebo.launch.py is_public_sim:=True'
```

두 번째 호스트 터미널에서 키보드 조작 노드를 실행합니다.

```bash
sudo docker compose run --rm humble bash -lc 'source /opt/ros/humble/setup.bash && source install/setup.bash && ros2 run teleop_twist_keyboard teleop_twist_keyboard --ros-args -r cmd_vel:=/mobile_base_controller/cmd_vel_unstamped'
```

두 명령은 임시 컨테이너 안에서 ROS 2를 실행하고, 출력과 키보드 입력을 호스트 터미널에 연결합니다. 각 명령은 `Ctrl+C`를 눌러 종료합니다.

Compose는 호스트 네트워크를 사용하고, 호스트의 X11 디스플레이를 연결하며, Gazebo와 RViz에 NVIDIA GPU를 할당합니다. 호스트에 NVIDIA Container Toolkit을 설치하고 Docker에서 NVIDIA 런타임을 설정해야 합니다. TIAGo 시뮬레이션 저장소의 권장 설정에 따라 Cyclone DDS를 기본 미들웨어로 사용합니다.
