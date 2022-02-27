import { useState } from "react";
import SettingsContext from "../components/SettingsContext";
import Timer from "../components/Timer";

function App() {
  const [workMin, setWorkMin] = useState(45);
  const [breakMin, setBreakMin] = useState(15);

  return (
    <div className="App">
      <SettingsContext.Provider value={{
        workMin,
        breakMin,
        setWorkMin,
        setBreakMin,
      }}>
        <Timer />
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
