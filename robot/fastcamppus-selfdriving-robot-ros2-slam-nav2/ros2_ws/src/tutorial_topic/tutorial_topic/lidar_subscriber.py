import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
import math

class LidarSubscriber(Node):
    def __init__(self):
        super().__init__('lidar_subscriber')
        self.subscription = self.create_subscription(
            LaserScan,
            '/scan_raw',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning
        
        self.get_logger().info('LidarSubscriber has been started')

    def listener_callback(self, msg):
        # 전방 180도(-90도에서 90도까지) 범위의 데이터만 처리
        front_ranges = msg.ranges[len(msg.ranges)//4:3*len(msg.ranges)//4]
        
        # 무한대 값과 0값을 제외한 유효한 거리 값 찾기
        valid_ranges = [r for r in front_ranges if r != float('inf') and r != 0.0]
        
        if valid_ranges:
            min_distance = min(valid_ranges)
            min_angle = front_ranges.index(min_distance) - len(front_ranges)//2
            min_angle_degrees = min_angle * (msg.angle_increment * 180.0 / math.pi)
            
            self.get_logger().info(f'Closest obstacle: Distance = {min_distance:.2f} m, Angle = {min_angle_degrees:.2f} degrees')
        else:
            self.get_logger().info('No obstacles detected in the front 180 degrees')

def main(args=None):
    rclpy.init(args=args)
    lidar_subscriber = LidarSubscriber()
    rclpy.spin(lidar_subscriber)
    lidar_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()