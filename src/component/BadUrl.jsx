import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-2xl text-red-500 font-semibold">
          Oh no, this route doesn't exist!
        </h1>

        <Link
          className="text-blue-400 text-sm underline underline-offset-8 hover:text-blue-700 transition-colors"
          to="/"
        >
          You can go back to the home page by clicking here, though!
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
