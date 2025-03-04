import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { tokens } from "stylex-packagified/tokens";

const styles = stylex.create({
  header: {
    fontSize: "40px",
    color: tokens.header_color_primary,
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 {...stylex.props(styles.header)}>Vite + React</h1>

      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
