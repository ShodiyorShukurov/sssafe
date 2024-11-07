import { Button, Form,  InputNumber, message, Modal, Select } from "antd";
import Api from "../../../api";


const { Option } = Select;

const AddTransactionModal = ({
  isTransactionModalVisible,
  handleTransactionCancel,
  selectedUser,
  setSelectedUser,
}) => {
  const [form] = Form.useForm();

  const handleAddTransaction = async (values) => {
    const data = {
      user_id: Number(selectedUser?.chat_id),
      method: values.method,
      amount: Math.round(values.amount * 100), 
      month: Number(values.month),
    };
    console.log(data);

    try {
      const res = await Api.post("/transaction/add", data);

      if (res.data) {
        message.success("Transaction added successfully!");
        handleTransactionCancel();
        form.resetFields();
        setSelectedUser(null);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add transaction.");
    }
  };

  return (
    <Modal
      title="Add Transaction"
      open={isTransactionModalVisible}
      onCancel={handleTransactionCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleAddTransaction}>
        <Form.Item
          name="method"
          label="Method"
          rules={[{ required: true, message: "Please select Method!" }]}
        >
          <Select placeholder="Please select Method">
            <Option value="ADMIN">Admin</Option>
            <Option value="CASH">Cash</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please Amount" }]}
        >
          <InputNumber
            type="number"
            placeholder="Enter Amount"
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="month"
          label="Month"
          rules={[{ required: true, message: "Please input Month!" }]}
        >
          <InputNumber placeholder="Enter Month" min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Transaction
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTransactionModal;
