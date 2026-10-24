import rclpy
from rclpy.node import Node
from std_srvs.srv import Empty
from geometry_msgs.msg import Twist
import time

class CircleService(Node):
    def __init__(self):
        super().__init__('circle_service')
        self.srv = self.create_service(Empty, 'circle', self.circle_callback)
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        self.get_logger().info('Circle service has been started')

    def circle_callback(self, request, response):
        self.get_logger().info('Drawing a circle for 10 seconds...')
        start_time = time.time()

        # Create Twist message for circular motion
        twist = Twist()
        twist.linear.x = 1.0  # Move forward at 1.0 m/s
        twist.angular.z = 1.5  # Rotate at 1.5 rad/s

        # Publish twist message for 10 seconds
        while time.time() - start_time < 10.0:
            self.publisher_.publish(twist)
            time.sleep(0.1)  # Small sleep to prevent flooding

        # Stop motion
        twist.linear.x = 0.0
        twist.angular.z = 0.0
        self.publisher_.publish(twist)

        elapsed_time = time.time() - start_time
        self.get_logger().info(f'Circle completed in {elapsed_time:.2f} seconds')
        return response

def main(args=None):
    rclpy.init(args=args)
    circle_service = CircleService()
    rclpy.spin(circle_service)
    rclpy.shutdown()

if __name__ == '__main__':
    main()