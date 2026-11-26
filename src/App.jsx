import { Link, Outlet } from "react-router";
import { NavBar } from "./component/navbar";
import { useState } from "react";
import style from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className={`${style.content} grid grid-cols-4 gap-6`}>
          <aside className="col-span-1 rounded-lg bg-white p-4 shadow-sm">
            <nav className="flex flex-col sticky gap-3 md:flex-col shadow">
              {" "}
              <Link
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700 hover:bg-blue-100"
                to="/"
              >
                Posts
              </Link>
              <Link
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700 hover:bg-blue-100"
                to="your_post"
              >
                Your post
              </Link>
            </nav>
          </aside>
          <main className="col-span-3 rounded-lg bg-white p-6 shadow-sm">
            <Outlet context={[count, setCount]} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
