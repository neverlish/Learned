import rclpy
from rclpy.node import Node
from custom_interfaces.srv import MoveRobot
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
import time

class MovementServer(Node):
    def __init__(self):
        super().__init__('movement_server')
        self.srv = self.create_service(MoveRobot, 'move_robot', self.move_robot_callback)
        self.velocity_publisher = self.create_publisher(Twist, 'cmd_vel', 10)

        self.get_logger().info('TIAGo Movement Controller has been started')

    def move_robot_callback(self, request, response):
        twist = Twist()
        twist.linear.x = request.linear_velocity
        twist.angular.z = request.angular_velocity

        start_time = self.get_clock().now()
        while (self.get_clock().now() - start_time).nanoseconds / 1e9 < request.duration:
            self.velocity_publisher.publish(twist)
            time.sleep(0.1)

        # 로봇 정지
        stop_twist = Twist()
        self.velocity_publisher.publish(stop_twist)
        response.success = True

        if request.linear_velocity > 0.0 and request.angular_velocity == 0.0:
            response.message = 'Robot moved forward'
        elif request.linear_velocity < 0.0 and request.angular_velocity == 0.0:
            response.message = 'Robot moved backward'
        elif request.linear_velocity == 0.0 and request.angular_velocity > 0.0:
            response.message = 'Robot turned left'
        elif request.linear_velocity == 0.0 and request.angular_velocity < 0.0:
            response.message = 'Robot turned right'
        else:
            response.message = 'Robot moved in a curve'

        return response

def main(args=None):
    rclpy.init(args=args)
    tiago_movement_server = MovementServer()
    rclpy.spin(tiago_movement_server)
    tiago_movement_server.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()