import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../Redux/Action/UserAction";
function LoginPage() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl || "/"; // Default redirect to homepage
  const { user } = useSelector((state) => state.user);
  const username = user ? user.name : null;
  const useremail = user ? user.email : null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password));
      navigate(redirect);
      toast.success("login successfully", { autoClose: 2000 });
    } catch (error) {
      toast.error(error.message);
    }
  };
    useEffect(() => {
      if (username && useremail) {
        navigate(redirect); // Redirect to another page if user is already logged in
      }
    }, [navigate]);
  return (
    <div className="signinPageContainer">
      <Form className="signinForm" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            controlId="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            controlId="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign in</Button>
        </div>
        <div>
          create new account?
          <Link to={"/signup"}>Create your account</Link>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
