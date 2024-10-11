import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/api/auth", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          // console.log(res.token);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="30px"
        flexDirection="column"
        height="100vh"
        maxWidth="250px"
        margin={"auto"}
      >
        <TextField
          fullWidth
          id="username"
          label="Username"
          variant="outlined"
          value={form.username}
          name="username"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
        />

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
}
