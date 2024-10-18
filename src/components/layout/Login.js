import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { API_LOGIN, API_PASSWORD, } from "../../utils/constants";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Ant Design form hook
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values)
    if(values.text && values.password){
        localStorage.setItem(API_LOGIN, values.text)
        localStorage.setItem(API_PASSWORD, values.password)
    }

    if (
      localStorage.getItem(API_LOGIN) === "admin" &&
      localStorage.getItem(API_PASSWORD) === "12563Aas@"
    ) {
      navigate("/user-list");
    }else {
      notification.error({
        message: "Error",
        description: "Login yoki parol noto'g'ri",
      });
    }
  };

  const onFinish = async (values) => {
    try {
      handleSubmit(values);
    } catch (error) {
      notification.error({ message: error.errors.join(", ") });
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Login"
            name="text"
            rules={[{ required: true, message: "Loginni kiriting" }]}
          >
            <Input placeholder="Login" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Parolni kiriting" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
