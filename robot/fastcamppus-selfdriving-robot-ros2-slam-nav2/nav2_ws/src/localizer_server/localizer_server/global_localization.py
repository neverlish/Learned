import rclpy
from rclpy.node import Node
from std_srvs.srv import Empty
from rcl_interfaces.msg import Parameter, ParameterValue, ParameterType
from rcl_interfaces.srv import SetParameters
from time import sleep

class GlobalLocalization(Node):
    def __init__(self):
        super().__init__('global_localization_node')
        # create client
        self.relocalization_client = self.create_client(Empty, 'reinitialize_global_localization')
        self.param_client = self.create_client(SetParameters, '/amcl/set_parameters')

        # wait for service
        while not self.relocalization_client.wait_for_service(timeout_sec=1.0) \
                and not self.param_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')

    def set_amcl_params(self, max_particles, min_particles):
        params = [
            Parameter(name='max_particles', value=ParameterValue(type=ParameterType.PARAMETER_INTEGER, integer_value=max_particles)),
            Parameter(name='min_particles', value=ParameterValue(type=ParameterType.PARAMETER_INTEGER, integer_value=min_particles))
        ]
        req = SetParameters.Request()

        for param in params:
            req.parameters.append(param)

        future = self.param_client.call_async(req)
        future.add_done_callback(self.set_amcl_params_callback)

        # print current max_particles and min_particles
        self.get_logger().info('max_particles: %d' % max_particles)
        self.get_logger().info('min_particles: %d' % min_particles)
        return future.result()

    def call_reinitialize_global_localization(self):
        req = Empty.Request()
        return self.relocalization_client.call_async(req)

    def set_amcl_params_callback(self, future):
        try:
            response = future.result()
        except Exception as e:
            self.get_logger().error('Service call failed %r' % (e,))
        else:
            self.get_logger().info('Service call succeeded %r' % (response,))

def main(args=None):
    rclpy.init(args=args)
    global_localization = GlobalLocalization()

    # adjust parameters for global localization
    global_localization.set_amcl_params(20000, 1000)
    rclpy.spin_once(global_localization)

    # call service reinitialize_global_localization
    future = global_localization.call_reinitialize_global_localization()
    rclpy.spin_until_future_complete(global_localization, future)
    if future.result() is not None:
        global_localization.get_logger().info('Global localization reinitialized successfully.')
    else:
        global_localization.get_logger().error('Failed to call service reinitialize_global_localization')

    # restore default parameters
    sleep(7)
    global_localization.set_amcl_params(2000, 500)

    rclpy.spin(global_localization)
    global_localization.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
