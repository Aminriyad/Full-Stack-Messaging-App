import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const handelSubmit = async (event) => {
    event.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  };
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handelSubmit}>
        <input
          value={username}
          onChange={(x) => setUsername(x.target.value)}
          type="text"
          placeholder="username"
          className="block w-full p-2 mb-2 border"
        />

        <input
          value={password}
          onChange={(x) => setPassword(x.target.value)}
          type="text"
          placeholder="password"
          className="block w-full p-2 mb-2 border"
        />

        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>

        {isLoginOrRegister === "register" && (
          <div className="text-center mt-2">
            Already a memeber?
            <br />
            <button
              onClick={() => {
                setIsLoginOrRegister("login");
              }}
            >
              Login here
            </button>
          </div>
        )}
        {isLoginOrRegister === "login" && (
          <div className="text-center mt-2">
            Don't have an account?{""}
            <button
              onClick={() => {
                setIsLoginOrRegister("register");
              }}
            >
              Register Here
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterAndLoginForm;
