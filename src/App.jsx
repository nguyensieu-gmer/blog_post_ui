import { NavBar } from "./component/navbar";
import { Posts } from "./component/posts";
import { YourPost } from "./component/yourpost";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <NavBar />
      <div>
        {/* <Posts /> */}
        <div>
          <YourPost count={count} setCount={setCount} />
        </div>
      </div>
    </div>
  );
}

export default App;
