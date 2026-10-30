import rclpy
from rclpy.node import Node
from std_srvs.srv import SetBool
from geometry_msgs.msg import Twist

class TiagoMoveServer(Node):
    def __init__(self):
        super().__init__('tiago_move_server')
        self.srv = self.create_service(SetBool, 'tiago_move', self.tiago_move_callback)
        self.publisher_ = self.create_publisher(Twist, 'cmd_vel', 10)
        self.timer = self.create_timer(0.1, self.timer_callback)  # 10Hz
        self.is_moving = False # Flag to check if TIAGo is moving
        self.get_logger().info('TIAGo Move Server has been started')

    def tiago_move_callback(self, request, response):
        self.is_moving = request.data

        if self.is_moving:
            response.message = "TIAGo starts moving in a circle"
            self.get_logger().info('TIAGo starts moving in a circle')
        else:
            response.message = "TIAGo stops moving"
            self.get_logger().info('TIAGo stops moving')

        response.success = True # Set response success to True
        return response

    def timer_callback(self):
        msg = Twist()
        if self.is_moving:
            # Move in a circle
            msg.linear.x = 0.5  # 0.5 m/s
            msg.angular.z = 0.7  # 0.7 rad/s
        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    tiago_move_server = TiagoMoveServer()
    rclpy.spin(tiago_move_server)
    tiago_move_server.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()