cmake_minimum_required(VERSION 3.5)
project(simple_bt_example)

# Default to C++14
if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 14)
endif()

# find dependencies
find_package(ament_cmake REQUIRED)
find_package(behaviortree_cpp_v3 REQUIRED)
find_package(rclcpp REQUIRED)

include_directories(include)

add_executable(ex_bt1 src/ex_bt1.cpp)
add_executable(ex_bt2 src/ex_bt2.cpp)
add_executable(ex_bt3 src/ex_bt3.cpp)

ament_target_dependencies(
  ex_bt1
  behaviortree_cpp_v3
  rclcpp
)

ament_target_dependencies(
  ex_bt2
  behaviortree_cpp_v3
  rclcpp
)

ament_target_dependencies(
  ex_bt3
  behaviortree_cpp_v3
  rclcpp
)

install(TARGETS
  ex_bt1
  ex_bt2
  ex_bt3
  DESTINATION lib/${PROJECT_NAME})

ament_package()