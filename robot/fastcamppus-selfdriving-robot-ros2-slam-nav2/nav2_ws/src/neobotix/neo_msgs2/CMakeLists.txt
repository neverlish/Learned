cmake_minimum_required(VERSION 3.5)
project(neo_msgs2)

## By default build with code optimization and no debug info
if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 14)
endif()
if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)
find_package(std_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/EmergencyStopState.msg"
  "msg/Keypad.msg"
  "msg/LCDOutput.msg"
  "msg/RelayBoardV2.msg"
  "msg/USBoard.msg"
  "msg/USBoardV2.msg"
  "msg/IOBoard.msg"
  "msg/SafetyMode.msg"
  "msg/SafetyState.msg"
  "msg/RelayBoardV3.msg"
  "msg/KinematicsState.msg"
  "msg/DockingStatus.msg"
  DEPENDENCIES geometry_msgs std_msgs
)

ament_package()


