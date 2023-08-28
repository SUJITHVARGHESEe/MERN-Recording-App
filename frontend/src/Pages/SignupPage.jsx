import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../Redux/Action/UserAction";
import { toast } from "react-toastify";
import "./SignupPages.css";
function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl || "/"; // Default redirect to homepage
  const username = user ? user.name : null;
  const useremail = user ? user.email : null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(name, email, password));
      navigate("/");
      toast.success("signup successfully", { autoClose: 2000 });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (username && useremail) {
      navigate(redirect);
    } else {
      navigate("/signup");
    }
  }, [navigate, useremail, username, redirect]);

  return (
    <div className="signinPageContainer">
      <Form className="signinForm" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            controlId="name"
            type="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
          <Button type="submit">Sign up</Button>
        </div>
        <div>
          Already have account?{""}
          <Link to={"/signin"}>Create your account</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignupPage;
