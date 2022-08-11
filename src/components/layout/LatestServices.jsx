import Headlines from "./Headlines";
import CardLayout from "./CardLayout";

function LatestServices() {
  return (
    <div className="category">
      <Headlines
        text="Latest Services"
        content="Most recently created services:"
      />
      <CardLayout />
    </div>
  );
}

export default LatestServices;
