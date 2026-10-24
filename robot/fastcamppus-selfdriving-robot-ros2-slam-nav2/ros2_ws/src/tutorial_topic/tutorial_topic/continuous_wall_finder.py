import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist
import math

class ContinuousWallFinder(Node):
    def __init__(self):
        super().__init__('continuous_wall_finder')

        # Subscriber 생성
        self.subscription = self.create_subscription(
            LaserScan,
            '/scan_raw',
            self.lidar_callback,
            10)

        # Publisher 생성
        self.publisher = self.create_publisher(Twist, '/cmd_vel', 10)

        # 타이머 생성 (10Hz로 동작)
        self.timer = self.create_timer(0.1, self.timer_callback)

        # 로봇의 상태
        self.state = 'FIND_WALL'

        # 전방 거리
        self.front_distance = float('inf')

        self.get_logger().info('Continuous Wall Finder node has been started')

    def lidar_callback(self, msg):
        # 전방 30도(-15도에서 15도까지) 범위의 데이터 처리
        front_ranges = msg.ranges[len(msg.ranges)//2-15:len(msg.ranges)//2+15]

        # 무한대 값과 0값을 제외한 유효한 거리 값 찾기
        valid_ranges = [r for r in front_ranges if r != float('inf') and r != 0.0]

        if valid_ranges:
            self.front_distance = min(valid_ranges)
        else:
            self.front_distance = float('inf')

    def timer_callback(self):
        msg = Twist()

        if self.state == 'FIND_WALL':
            if self.front_distance > 4.0:
                # 좌회전
                msg.linear.x = 0.7
                msg.angular.z = 0.5
            else:
                self.state = 'MOVE_TO_WALL'
                self.get_logger().info('Wall found. Moving towards it.')

        elif self.state == 'MOVE_TO_WALL':
            if self.front_distance > 0.5:
                msg.linear.x = 0.4  # 천천히 전진
            else:
                self.state = 'FIND_NEXT_WALL'
                self.get_logger().info('Reached wall. Finding next wall.')

        elif self.state == 'FIND_NEXT_WALL':
            msg.angular.z = 0.7  # 좌회전
            if self.front_distance > 4.0:
                self.state = 'FIND_WALL'
                self.get_logger().info('Found open space. Searching for next wall.')

        self.publisher.publish(msg)
        self.get_logger().info(f'State: {self.state}, Front distance: {self.front_distance:.2f}m')

def main(args=None):
    rclpy.init(args=args)
    continuous_wall_finder = ContinuousWallFinder()
    rclpy.spin(continuous_wall_finder)
    continuous_wall_finder.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()