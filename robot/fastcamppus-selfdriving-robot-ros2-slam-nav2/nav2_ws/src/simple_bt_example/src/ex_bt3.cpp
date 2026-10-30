#include "behaviortree_cpp_v3/bt_factory.h"

using namespace BT;


class RobotTask1 : public BT::SyncActionNode
{
public:
    RobotTask1(const std::string& name) : BT::SyncActionNode(name, {})
    {
    }

    // You must override the virtual function tick()
    NodeStatus tick() override
    {
        std::cout << "RobotTask1: " << this->name() << std::endl;
        return BT::NodeStatus::FAILURE;
    }
};

class RobotTask2 : public BT::SyncActionNode
{
public:
    RobotTask2(const std::string& name) : BT::SyncActionNode(name, {})
    {
    }

    // You must override the virtual function tick()
    NodeStatus tick() override
    {
        std::cout << "RobotTask2: " << this->name() << std::endl;
        return BT::NodeStatus::SUCCESS;
    }
};

class RobotTask3 : public BT::SyncActionNode
{
public:
    RobotTask3(const std::string& name) : BT::SyncActionNode(name, {})
    {
    }

    // You must override the virtual function tick()
    NodeStatus tick() override
    {
        std::cout << "RobotTask3: " << this->name() << std::endl;
        return BT::NodeStatus::SUCCESS;
    }
};
static const char* xml_text = R"(

<root main_tree_to_execute = "MainTree" >

    <BehaviorTree ID="MainTree">
    <Fallback name="root_sequence">
        <RobotTask1   name="task1"/>
        <RobotTask2   name="task2"/>
        <RobotTask3   name="task3"/>
    </Fallback>
    </BehaviorTree>

</root>
)";

int main()
{
    // We use the BehaviorTreeFactory to register our custom nodes
    BehaviorTreeFactory factory;

    factory.registerNodeType<RobotTask1>("RobotTask1");
    factory.registerNodeType<RobotTask2>("RobotTask2");
    factory.registerNodeType<RobotTask3>("RobotTask3");

    auto tree = factory.createTreeFromText(xml_text);

    tree.tickRoot();

    return 0;
}
