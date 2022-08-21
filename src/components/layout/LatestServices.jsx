import Headlines from "./Headlines";
import CardLayout from "./CardLayout";

function LatestServices() {
  const page = window.location.href;
  return (
    <div className="category">
      {page.includes("tasks") ? (
        ""
      ) : (
        <Headlines
          text="Latest Services"
          content="Most recently created services:"
        />
      )}

      <CardLayout />
    </div>
  );
}

export default LatestServices;
