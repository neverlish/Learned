import rclpy
from rclpy.node import Node
from std_srvs.srv import Empty
from geometry_msgs.msg import Twist
import time

class SpinService(Node):
    def __init__(self):
        super().__init__('spin_service')
        self.srv = self.create_service(Empty, 'spin', self.spin_callback)
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        self.get_logger().info('Spin service has been started')

    def spin_callback(self, request, response):
        self.get_logger().info('Spinning for 5 seconds...')
        start_time = time.time()

        # Create Twist message for rotation
        twist = Twist()
        twist.angular.z = 1.5  # Rotate at 1.5 rad/s

        # Publish twist message for 5 seconds
        while time.time() - start_time < 5.0:
            self.publisher_.publish(twist)
            time.sleep(0.1)  # Small sleep to prevent flooding

        # Stop rotation
        twist.angular.z = 0.0
        self.publisher_.publish(twist)

        elapsed_time = time.time() - start_time
        self.get_logger().info(f'Spin completed in {elapsed_time:.2f} seconds')
        return response

def main(args=None):
    rclpy.init(args=args)
    spin_service = SpinService()
    rclpy.spin(spin_service)
    rclpy.shutdown()

if __name__ == '__main__':
    main()