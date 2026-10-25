import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseWithCovarianceStamped
from geometry_msgs.msg import PointStamped
from tf_transformations import quaternion_from_euler

# init_pose = x, y, theta
init_pose = [3.0, 4.0, 3.141592]

class InitRobot(Node):

    def __init__(self):
        super().__init__('initial_pose_pub_node')
        self.init_pose_pub_ = self.create_publisher(PoseWithCovarianceStamped, '/initialpose', 1)
        self.clicked_point_sub_ = self.create_subscription(PointStamped, '/clicked_point', self.point_callback, 1)

        # Set initial pose after a short delay
        timer_period = 0.5  # seconds
        self.trial_count = 5
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        self.trial_count -= 1
        self.init_pose(init_pose[0], init_pose[1], init_pose[2])

        if self.trial_count == 0:
            self.timer.cancel()  # Cancel timer after firing once

    def point_callback(self, msg):
        self.get_logger().info('Recieved Data:\n X : %f \n Y : %f \n Z : %f' % (msg.point.x, msg.point.y, msg.point.z))
        self.init_pose(msg.point.x, msg.point.y)

    def init_pose(self, x, y, theta=0.0):
        # radian to quaternion
        quat = quaternion_from_euler(0.0, 0.0, theta)

        # Publish initial pose
        msg = PoseWithCovarianceStamped()
        msg.header.frame_id = '/map'
        msg.pose.pose.position.x = x
        msg.pose.pose.position.y = y
        msg.pose.pose.position.z = 0.0
        msg.pose.pose.orientation.x = quat[0]
        msg.pose.pose.orientation.y = quat[1]
        msg.pose.pose.orientation.z = quat[2]
        msg.pose.pose.orientation.w = quat[3]

        self.get_logger().info('Publishing  Initial Position\n X= %f \n Y= %f '% (msg.pose.pose.position.x, msg.pose.pose.position.y))
        self.init_pose_pub_.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    init_robot = InitRobot()

    rclpy.spin(init_robot)
    init_robot.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()