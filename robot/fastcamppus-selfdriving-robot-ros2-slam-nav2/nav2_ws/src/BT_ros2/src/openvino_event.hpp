#pragma once

#include <chrono>
#include <iomanip>
#include <iostream>
#include <memory>
#include "rclcpp/rclcpp.hpp"
#include "rclcpp_action/rclcpp_action.hpp"
#include <unistd.h>
#include <behaviortree_cpp_v3/action_node.h>
#include <object_msgs/msg/objects_in_boxes.hpp>

static std::unordered_map<std::string, int> detected_objects;

void OpenVINOCallback(const object_msgs::msg::ObjectsInBoxes::SharedPtr msg)
{
    for(auto & obj : msg->objects_vector)
    {
        // Debug log
        //std::cout << "["<< ++cnt <<"] Detect object: '" << obj.object.object_name << "'." << std::endl;
        if (detected_objects.find(obj.object.object_name) != detected_objects.end()) {
            detected_objects[std::string(obj.object.object_name)]++;
        }
    }
}

class OpenVINOEvent : public BT::SyncActionNode
{
    public:
        OpenVINOEvent(const std::string& name, const BT::NodeConfiguration& config)
            : BT::SyncActionNode(name, config)
        {
            node_ = rclcpp::Node::make_shared("openvino_event");
            sub_ = node_->create_subscription<object_msgs::msg::ObjectsInBoxes>("/ros2_openvino_toolkit/detected_objects", 1000, OpenVINOCallback);
            sleep(1);
            time_init = node_->get_clock()->now();
        }

        static BT::PortsList providedPorts()
        {
            return{ BT::InputPort<std::string>("object") };
        }

        virtual BT::NodeStatus tick() override
        {
            std::string expect_object;

            if (!getInput<std::string>("object", expect_object)) {
                throw BT::RuntimeError("missing required input [object]");
            }
            // If the key doesn't exist, init it.
            if (detected_objects.find(expect_object) == detected_objects.end()) {
                detected_objects[expect_object] = 0;
            }

            auto duration = node_->get_clock()->now();

            // Make sure to context switch for other openvino process to publish data
            while (duration.seconds() - time_init.seconds() < 1.) {
              rclcpp::spin_some(node_);
              duration = node_->get_clock()->now();
            }

            time_init = duration;
            int cnt = detected_objects[expect_object];

            // The number of detected objects should be greater than 10 to avoid misbehavior
            if (cnt > 10) {
                // Print log in red
                fprintf(stderr, "\033[0;31m");
                fprintf(stderr, "Object['%s'] count=%d\n", expect_object.c_str(), cnt);
                fprintf(stderr, "\033[0m");
                // After detection, clear the all the detected object
                for (auto it = detected_objects.begin(); it != detected_objects.end(); it++) {
                    detected_objects[it->first] = 0;
                }
                return BT::NodeStatus::SUCCESS;
            }
            else {
                return BT::NodeStatus::FAILURE;
            }

          }

    private:
      rclcpp::Node::SharedPtr node_;
      rclcpp::Subscription<object_msgs::msg::ObjectsInBoxes>::SharedPtr sub_;
      rclcpp::Time time_init;
};
