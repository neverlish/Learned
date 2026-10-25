import rclpy
from rclpy.node import Node
from rclpy.qos import ReliabilityPolicy, QoSProfile, HistoryPolicy
from rclpy.duration import Duration

from sensor_msgs.msg import LaserScan
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Twist

from transforms3d.euler import quat2euler

# Import the libraries to use executors and callback groups
from rclpy.callback_groups import ReentrantCallbackGroup, MutuallyExclusiveCallbackGroup
from rclpy.executors import MultiThreadedExecutor, SingleThreadedExecutor

class RobotControl(Node):
    def __init__(self):
        super().__init__('solution2_node')

        self.seconds_sleeping = 10 # 회전할 시간을 10초로 설정

        # Publisher
        self.vel_pub = self.create_publisher(Twist, 'cmd_vel', 10)
        self.cmd_msg = Twist()

        # Callback group
        self.group1 = MutuallyExclusiveCallbackGroup()
        self.group2 = MutuallyExclusiveCallbackGroup()
        self.group3 = MutuallyExclusiveCallbackGroup()

        # Subscriber
        self.odom_sub = self.create_subscription(
            Odometry, 'mobile_base_controller/odom', self.odom_callback, 10,
            callback_group=self.group1)
        self.scan_sub = self.create_subscription(
            LaserScan, 'scan_raw', self.scan_callback,
            QoSProfile(depth=10, reliability=ReliabilityPolicy.RELIABLE, history=HistoryPolicy.KEEP_LAST,),
            callback_group=self.group2)

        # Timer
        self.timer = self.create_timer(0.3, self.timer_callback, callback_group=self.group3)

        self.front_laser = 0.0 # 전방 레이저 거리
        self.roll, self.pitch, self.yaw = 0.0, 0.0, 0.0

    def odom_callback(self, msg: Odometry):
        self.get_logger().info("Odom CallBack")
        orientation_q = msg.pose.pose.orientation
        orientation_list = [orientation_q.x, orientation_q.y, orientation_q.z, orientation_q.w]
        self.roll, self.pitch, self.yaw = quat2euler(orientation_list)

    def scan_callback(self, msg: LaserScan):
        self.get_logger().info("Scan CallBack")
        self.front_laser = msg.ranges[359] # 전방 레이저 거리

    def stop_robot(self):
        self.cmd_msg.linear.x = 0.0
        self.cmd_msg.angular.z = 0.0
        self.vel_pub.publish(self.cmd_msg)

    def move_straight(self):
        self.cmd_msg.linear.x = 0.3
        self.cmd_msg.angular.z = 0.0
        self.vel_pub.publish(self.cmd_msg)

    def rotate(self):
        self.cmd_msg.angular.z = -0.4
        self.cmd_msg.linear.x = 0.0

        rotation_start_time = self.get_clock().now() # 회전 시작 시간 기록
        rotation_duration = Duration(seconds=self.seconds_sleeping)

        self.get_logger().info("Starting rotation for " + str(self.seconds_sleeping) + " seconds")

        while self.get_clock().now() - rotation_start_time < rotation_duration:
            self.vel_pub.publish(self.cmd_msg)

        self.get_logger().info("Rotation complete")
        self.stop_robot()

    def timer_callback(self):
        self.get_logger().info("Timer CallBack")
        if self.front_laser == 0.0: return

        try:
            self.get_logger().warning(">>> Front Range Value=" + str(self.front_laser))
            if self.front_laser > 0.5:
                self.get_logger().info("MOVE STRAIGHT")
                self.move_straight()
            else:
                self.get_logger().info("STOP ROTATE")
                self.stop_robot()
                self.rotate()
        except:
            pass


def main(args=None):
    rclpy.init(args=args)
    control_node = RobotControl()

    # Create a multi-threaded executor
    executor = MultiThreadedExecutor(num_threads=3)
    executor.add_node(control_node)

    try:
        executor.spin()
    finally:
        executor.shutdown()
        executor.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()