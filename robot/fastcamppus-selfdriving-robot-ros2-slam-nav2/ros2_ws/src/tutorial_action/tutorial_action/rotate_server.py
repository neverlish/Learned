import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from turtlesim.action import RotateAbsolute
from geometry_msgs.msg import Twist
import time

class RotateActionServer(Node):
    def __init__(self):
        super().__init__('rotate_action_server')

        # Action server 초기화
        self.action_server = ActionServer(
            self,
            RotateAbsolute,
            'rotate_tiago',
            self.execute_callback
        )

        # cmd_vel 퍼블리셔 설정
        self.cmd_pub = self.create_publisher(Twist, 'cmd_vel', 10)

        # 현재 회전 각도 변수
        self.current_angle = 0.0

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal to rotate to angle: %f' % goal_handle.request.theta)

        # 목표 각도와 현재 각도 차이 계산
        target_angle = goal_handle.request.theta
        angle_diff = target_angle - self.current_angle

        # 회전 방향 및 속도 설정
        twist_msg = Twist()
        twist_msg.angular.z = 0.5 if angle_diff > 0 else -0.5

        # 피드백 메시지 초기화
        feedback_msg = RotateAbsolute.Feedback()

        # 목표 각도에 도달할 때까지 반복
        while abs(angle_diff) > 0.01:
            self.cmd_pub.publish(twist_msg)

            # 각도 차이 업데이트
            angle_diff -= 0.01 * twist_msg.angular.z  # 간단한 각도 차이 갱신

            # 피드백 메시지 업데이트 및 publish
            feedback_msg.remaining = abs(angle_diff)
            goal_handle.publish_feedback(feedback_msg)

            # 각도 도달 확인
            if abs(angle_diff) <= 0.01:
                break

            time.sleep(0.01)

        # 목표에 도달하면 정지
        twist_msg.angular.z = 0.0
        self.cmd_pub.publish(twist_msg)

        # 현재 각도 초기화
        self.current_angle = 0.0

        # 목표 도달 및 응답
        goal_handle.succeed()
        result = RotateAbsolute.Result()
        result.delta = angle_diff

        self.get_logger().info('Goal achieved with delta: %f' % result.delta)
        return result


def main(args=None):
    rclpy.init(args=args)
    node = RotateActionServer()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()