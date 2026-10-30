# ros2_object_msgs
## Introduction
This package defines the object messages for ROS2. For ROS, you can find the object messages definition [here](https://github.com/intel/object_msgs).

* Install ROS2 Dashing ([guide](https://index.ros.org/doc/ros2/Installation/Dashing/Linux-Install-Debians/)) 
* Create a ROS2 workspace
```Shell
mkdir -p ~/ros2_ws/src
```
* Building and Installation
```
cd ~/ros2_ws/src
git clone https://github.com/intel/ros2_object_msgs
cd ~/ros2_ws
colcon build --symlink-install
source install/local_setup.bash
```

###### *Any security issue should be reported using process at https://01.org/security*
