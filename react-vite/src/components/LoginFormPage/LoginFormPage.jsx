import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const handleDemoLogin = async () => {
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );
    if (!serverResponse) {
      navigate("/");
    }
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <button onClick={handleExit} className="exit-button">
          ✕
        </button>
        
        <h1>Log In</h1>
        
        {Array.isArray(errors) && errors.length > 0 &&
          errors.map((message) => <p key={message} className="error-message">{message}</p>)
        }
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-fields">
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {errors.email && <p className="error-message">{errors.email}</p>}

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-buttons">
            <button type="submit">Log In</button>
            <button
              type="button"
              onClick={handleDemoLogin}
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;