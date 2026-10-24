import rclpy
from rclpy.node import Node
from custom_interfaces.msg import RobotStatus
import random

class RobotStatusPublisher(Node):
    def __init__(self):
        super().__init__('robot_status_publisher')
        self.publisher_ = self.create_publisher(RobotStatus, 'robot_status', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.get_logger().info('Robot Status Publisher has been started')

    def timer_callback(self):
        msg = RobotStatus()
        msg.x = random.uniform(-10.0, 10.0)
        msg.y = random.uniform(-10.0, 10.0)
        msg.theta = random.uniform(-3.14, 3.14)
        msg.battery_percentage = random.randint(0, 100)
        msg.temperature = random.uniform(0.0, 50.0)

        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: x={msg.x:.2f}, y={msg.y:.2f}, theta={msg.theta:.2f}, battery={msg.battery_percentage}%')

def main(args=None):
    rclpy.init(args=args)
    robot_status_publisher = RobotStatusPublisher()
    rclpy.spin(robot_status_publisher)
    robot_status_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()