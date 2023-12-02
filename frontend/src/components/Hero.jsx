import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="border-2 rounded-lg w-3/6 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-semibold p-4">Authen</h1>
      <p className="p-4 text-center">
        It an Authentication Feature of Applications created using the
        technology stack of ReactJS, ExpressJS, NodeJS, MongoDB
      </p>
      <div className=" flex p-4 gap-8">
        <Link to="/login">
          <button className="p-2 px-6 border-2 rounded-lg">Login</button>
        </Link>
        <Link to="/signup">
          <button className="p-2 px-6 border-2 rounded-lg">Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
