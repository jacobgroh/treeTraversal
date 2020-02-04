import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import "./style.css";
import Tree from "./components/tree";
import Header from "./components/header";

function App() {
  const container = useRef("container");
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (container.current !== undefined) {
      let height = container.current.clientHeight;
      let width = container.current.clientWidth;
      setDimensions({
        width,
        height
      });
    }
  }, []);

  return (
    <div>
      <section className="tree__header">
        <Header />
      </section>
      <section ref={container} className="tree__container">
        <Tree width={dimensions.width} height={dimensions.height} />
      </section>
    </div>
  );
}

export default App;
