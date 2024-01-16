import "./App.css";
import { useState, useEffect } from "react";
import afterFrame from "afterframe";
import ttiPolyfill from "tti-polyfill";

function App() {
  const [data, setData] = useState([]);
  let answer = {
    create1000: "",
    create10000: "",
    remove1: "",
    remove1000: "",
    update1000: "",
  };
  const measure = (param) => {
    function measureInteraction(interactionName) {
      performance.mark(interactionName + " start");

      return {
        end() {
          performance.mark(interactionName + " end");
          const measure = performance.measure(
            interactionName + " duration",
            interactionName + " start",
            interactionName + " end"
          );
          answer[param] = measure.duration;
          console.log(`${param} took`, measure.duration, "ms");
        },
      };
    }
    const interaction = measureInteraction();
    afterFrame(() => {
      interaction.end();
    });
  };

  const handleRemove = () => {
    measure("remove1");
    setData((current) => current.filter((data, i) => i !== 0));
  };
  const handleRemove1000 = () => {
    measure("remove1000");
    setData((current) => current.filter((data, i) => i > 1000));
  };
  const create1000 = () => {
    measure("create1000");
    setData((current) => [...current, ...Array(1000).fill(0)]);
  };
  const create10000 = () => {
    measure("create10000");
    setData((current) => [...current, ...Array(10000).fill(0)]);
  };
  const update1000 = () => {
    measure("update1000");
    setData((current) =>
      current.map((data, i) => (i < 1000 ? (data = 1) : (data = 0)))
    );
  };

  useEffect(() => {
    create1000();
    setTimeout(() => {
      create10000();
      setTimeout(() => {
        handleRemove();
        setTimeout(() => {
          handleRemove1000();
          setTimeout(() => {
            update1000();
            setTimeout(() => {
              fetch("http://localhost:8000/write_data", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(answer),
              })
                .then((res) => res.json())
                .then((el) => console.log(el));
              ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
                console.log(tti);
              });
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, [""]);
  return (
    <div className="App">
      <button onClick={create1000}>Создать 1000 элементов</button>
      <button onClick={create10000}>Создать 10000 элементов</button>
      <button onClick={handleRemove}>Удалить 1 элемент</button>
      <button onClick={handleRemove1000}>Удалить 1000 элементов</button>
      <button onClick={update1000}>Заменить 1000 </button>
      {Array.from(data, (el, k) => (
        <div key={k}>{el}</div>
      ))}
    </div>
  );
}

export default App;
