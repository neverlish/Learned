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
        <Sequence name="root_sequence">
            <RobotTask1   name="task1"/>
            <RobotTask2   name="task2"/>
            <RobotTask3   name="task3"/>
        </Sequence>
    </BehaviorTree>

</root>
)";

// clang-format on

int main()
{
    // We use the BehaviorTreeFactory to register our custom nodes
    BehaviorTreeFactory factory;

    factory.registerNodeType<RobotTask1>("RobotTask1");
    factory.registerNodeType<RobotTask2>("RobotTask2");
    factory.registerNodeType<RobotTask3>("RobotTask3");

    // Trees are created at deployment-time (i.e. at run-time, but only once at the beginning).
    // The currently supported format is XML.
    // IMPORTANT: when the object "tree" goes out of scope, all the TreeNodes are destroyed
    auto tree = factory.createTreeFromText(xml_text);

    // To "execute" a Tree you need to "tick" it.
    // The tick is propagated to the children based on the logic of the tree.
    // In this case, the entire sequence is executed, because all the children
    // of the Sequence return SUCCESS.
    tree.tickRoot();

    return 0;
}