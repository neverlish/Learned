import rclpy
from rclpy.node import Node

class TimerNode(Node):
    def __init__(self):
        super().__init__('timer_node')
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.count = 0

    def timer_callback(self):
        self.count += 1
        self.get_logger().info(f'Hello ROS2! Count: {self.count}')

def main(args=None):
    rclpy.init(args=args)
    timer_node = TimerNode()
    rclpy.spin(timer_node)
    timer_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()