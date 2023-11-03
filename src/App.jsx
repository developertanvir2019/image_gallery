import "./App.css";
import Gallery from "./Components/Gallery";

function App() {
  return (
    <div className="grid min-h-[100dvh] items-center py-8">
      <section>
        <div className="container">
          <Gallery />
        </div>
      </section>
    </div>
  );
}

export default App;
