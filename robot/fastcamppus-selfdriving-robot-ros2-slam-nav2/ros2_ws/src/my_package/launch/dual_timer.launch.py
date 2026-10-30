from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_package',
            executable='timer_node',
            name='my_timer_node'
        ),
        Node(
            package='my_package',
            executable='fast_timer_node',
            name='my_fast_timer_node',
        )
    ])