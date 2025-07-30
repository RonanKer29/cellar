const Dashboard = ({ bottles }) => {
  return (
    <>
      {bottles.map((bottle) => (
        <div className="" key={bottle.id}>
          {bottle.name}
        </div>
      ))}
    </>
  );
};

export default Dashboard;
