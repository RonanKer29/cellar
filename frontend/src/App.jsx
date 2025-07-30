import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto bg-gray-50">
        <Home />
      </main>
    </div>
  );
};

export default App;
