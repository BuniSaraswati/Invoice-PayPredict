import "./App.css";
import Footer from "./Components/Footer";
import FunButtons from "./Components/FunButtons";
import Navbar from "./Components/Navbar";
import Table from "./Components/Table";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <FunButtons />
      <Table />
      <Footer />
    </div>
  );
};

export default App;
