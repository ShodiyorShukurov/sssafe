import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "../../api";
import { API_TOKEN } from "../../utils/constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await Api.post("/admin/login", {
        admin_email: values.admin_email,
        admin_password: values.admin_password,
      });

      if (res.data.status === 401) {
        notification.error({
          message: "Error",
          description: "Login yoki parol noto'g'ri",
        });
      } else if (res.data.token) {
        localStorage.setItem(API_TOKEN, res.data.token);
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Login yoki parol noto'g'ri",
      });
      setLoading(false);
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
            label="Email"
            name="admin_email"
            rules={[{ required: true, message: "Email kiriting" }]}
          >
            <Input placeholder="Login" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="admin_password"
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
