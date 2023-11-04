import "./App.css";
import Editor from "./Components/Editor";
import Gallery from "./Components/Gallery";

function App() {
  return (
    <div className="grid min-h-[100vh] items-center py-12">
      <Gallery />
      <Editor />
    </div>
  );
}

export default App;
