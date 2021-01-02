import TodoGrid from "./components/TodoGrid";
import TodoDialog from "./components/TodoDialog";
import { connect } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { addTitle } from "./redux/actions";

const newData = "newDate";
function App() {
  return (
    <div className="app">
      <header>
        <TodoGrid />
        <TodoDialog />
      </header>
    </div>
  );
}

export default App;
