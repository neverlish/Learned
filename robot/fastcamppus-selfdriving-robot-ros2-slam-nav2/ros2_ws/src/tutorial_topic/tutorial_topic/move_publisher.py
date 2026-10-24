import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
import time

class MovePublisher(Node):
    def __init__(self):
        super().__init__('move_publisher')
        
        # Twist 메시지를 발행하는 publisher 생성
        # 토픽 이름은 '/cmd_vel', 큐 크기는 10으로 설정
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        
        # 0.1초(10Hz) 간격으로 타이머 콜백 함수 실행
        timer_period = 0.1  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        
        # 로봇의 이동 방향을 추적하기 위한 변수
        self.forward = True
        
        # 방향 전환 시간 설정 (5초)
        self.switch_time = 5.0  # seconds
        
        # 마지막 방향 전환 시간 기록
        self.last_switch_time = time.time()
        
        self.get_logger().info('MovePublisher has been started')

    def timer_callback(self):
        current_time = time.time()
        msg = Twist()
        
        # 5초마다 방향 전환
        if current_time - self.last_switch_time >= self.switch_time:
            self.forward = not self.forward
            self.last_switch_time = current_time
        
        if self.forward:
            msg.linear.x = 0.2  # 전진 속도 (m/s)
        else:
            msg.linear.x = -0.2  # 후진 속도 (m/s)
        
        # 계산된 속도 메시지 발행
        self.publisher_.publish(msg)
        
        # 로그 메시지 출력
        direction = "forward" if self.forward else "backward"
        self.get_logger().info(f'Moving {direction}: Linear velocity = {msg.linear.x} m/s')

def main(args=None):
    rclpy.init(args=args)
    move_publisher = MovePublisher()
    rclpy.spin(move_publisher)
    move_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()