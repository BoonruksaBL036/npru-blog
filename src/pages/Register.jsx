import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authentication.service";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const handleSubmit = async () => {
    if (!user.username || !user.password) {
      Swal.fire({
        title: "Error",
        text: "Username or Password cannot be empty!",
        icon: "error",
      });
    } else {
      try {
        const response = await AuthService.register(user.username, user.password);
        console.log("Register Response:", response);
        
        // ตรวจสอบ status 201 หรือ 200 หรือข้อความสำเร็จ
        if (response?.status === 201 || response?.status === 200 || response?.data?.message?.includes("successfully")) {
          Swal.fire({
            title: "Success",
            text: response?.data?.message || "Registration successful",
            icon: "success",
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response?.data?.message || "Registration failed",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Register Error:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || error?.message || "Registration failed",
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body space-y-2">
        <h2 className="card-title">Register</h2>
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input
            type="text"
            className="grow"
            placeholder="username"
            name="username"
            onChange={handleChange}
            value={user.username}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            type="password"
            className="grow"
            placeholder="*****"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <button className="btn btn-soft btn-success" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
    </div>
  );
};

export default Register;
