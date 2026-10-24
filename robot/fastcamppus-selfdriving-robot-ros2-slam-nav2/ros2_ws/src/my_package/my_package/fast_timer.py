import rclpy
from rclpy.node import Node

class FastTimerNode(Node):
    def __init__(self):
        super().__init__('fast_timer_node')
        timer_period = 0.1  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.count = 0

    def timer_callback(self):
        self.count += 1
        self.get_logger().info(f'Fast Count: {self.count}')

def main(args=None):
    rclpy.init(args=args)
    fast_timer_node = FastTimerNode()
    rclpy.spin(fast_timer_node)
    fast_timer_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()