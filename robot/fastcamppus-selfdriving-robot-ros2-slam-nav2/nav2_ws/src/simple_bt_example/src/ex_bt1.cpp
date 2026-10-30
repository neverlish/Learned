//"header" to BT - our software connection to BT framework
#include "behaviortree_cpp_v3/bt_factory.h"

using namespace BT;

/** Behavior Tree are used to create a logic to decide what
 * to "do" and when.
 * The exercises as it was discussed and depicted in the
 * figure do not include a â€œconnectionâ€ to ROS.
 * The action for the robot, in our case, is defined as a separate C++ class.
 */

//C++ classes defines robot actions/behaviors

//----------------Class ApproachBall---------------------------------------
class ApproachBall : public BT::SyncActionNode // we inherit the SyncActionNode - for synchronous behaviour
//later we inherit the AsyncActionNode instead to run action in asynchronous mode. Details later
{
public:
    ApproachBall(const std::string& name) : BT::SyncActionNode(name, {})
    {
    }

    // You must override the virtual function tick()
    NodeStatus tick() override
    {
        //we just print on the terminal
        std::cout << "ApproachBall: " << this->name() << std::endl;
        //the action completes with SUCCESS, you can see below the action can "finish" with FAILURE
        return BT::NodeStatus::SUCCESS;
    }
};

//----------------Class FindBall------------------------------------------
class FindBall : public BT::SyncActionNode
{
public:
    FindBall(const std::string& name) : BT::SyncActionNode(name, {})
    {
    }

    // You must override the virtual function tick()
    NodeStatus tick() override
    {
        std::cout << "FindBall: " << this->name() << std::endl;
        return BT::NodeStatus::SUCCESS;
    }
};

//----------------Class PlaceBall------------------------------------------
class PlaceBall : public BT::SyncActionNode
{
public:
    PlaceBall(const std::string& name) : BT::SyncActionNode(name, {})
    {
    }

    // You must override the virtual function tick()
    NodeStatus tick() override
    {
        std::cout << "PlaceBall: " << this->name() << std::endl;
        return BT::NodeStatus::SUCCESS;
    }
};

//----------------Class GripperInterface------------------------------------------
class GripperInterface
{
private:
    bool _opened;

public:
    GripperInterface() : _opened(true)
    {
    }

    NodeStatus open()
    {
        _opened = true;
        std::cout << "GripperInterface::open" << std::endl;
        return BT::NodeStatus::SUCCESS;
    }

    NodeStatus close()
    {
        std::cout << "GripperInterface::close" << std::endl;
        _opened = false;
        return BT::NodeStatus::SUCCESS;
    }
};

BT::NodeStatus BallClose()
{
    std::cout << "[ Close to ball: NO ]" << std::endl;
    return BT::NodeStatus::FAILURE;
}

BT::NodeStatus BallGrasped()
{
    std::cout << "[ Grasped: NO ]" << std::endl;
    return BT::NodeStatus::FAILURE;
}

//definition of BT which reflects logical connection between robot actions
static const char* xml_text = R"(
<root main_tree_to_execute = "MainTree" >
    <BehaviorTree ID="MainTree">
        <Sequence name="root_sequence">
            <FindBall   name="ball_ok"/>
                <Sequence>
                    <Fallback>
                        <BallClose   name="no_ball"/>
                        <ApproachBall    name="approach_ball"/>
                    </Fallback>
                    <Fallback>
                        <BallGrasped   name="no_grasp"/>
                        <GraspBall  name="grasp_ball"/>
                    </Fallback>
                </Sequence>
            <PlaceBall   name="ball_placed"/>
        </Sequence>
    </BehaviorTree>
</root>
)";

int main()
{
    // We use the BehaviorTreeFactory to register our custom nodes
    BehaviorTreeFactory factory;

    //Node registration process
    factory.registerNodeType<ApproachBall>("ApproachBall");
    factory.registerNodeType<FindBall>("FindBall");
    factory.registerNodeType<PlaceBall>("PlaceBall");

    // Registering a SimpleActionNode using a function pointer.
    // you may also use C++11 lambdas instead of std::bind
    //this method is not recommended so we are not going to use any more
    factory.registerSimpleCondition("BallClose", std::bind(BallClose));
    factory.registerSimpleCondition("BallGrasped", std::bind(BallGrasped));

    //You can also create SimpleActionNodes using methods of a class
    //this method is not recommended so we are not going to use any more
    GripperInterface gripper;
    factory.registerSimpleAction("GraspBall", std::bind(&GripperInterface::close, &gripper));

    // Trees are created at deployment-time (i.e. at run-time, but only once at the beginning).
    // The currently supported format is XML.
    // IMPORTANT: when the object "tree" goes out of scope, all the TreeNodes are destroyed
    auto tree = factory.createTreeFromText(xml_text);

    // To "execute" a Tree you need to "tick" it.
    // The tick is propagated to the children based on the logic of the tree.

    tree.tickRoot();

    return 0;
}