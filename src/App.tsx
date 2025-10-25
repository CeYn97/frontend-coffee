import MenuList from "./components/MenuList";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <MenuList />
      </main>
    </div>
  );
}

export default App;
