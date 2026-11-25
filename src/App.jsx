import { Link, Outlet } from "react-router";
import { NavBar } from "./component/navbar";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <NavBar />
      <div>
        <Link to="/">Posts</Link>
        <Link to="your_post">Your post</Link>
      </div>
      <Outlet context={[count, setCount]} />
    </div>
  );
}

export default App;
