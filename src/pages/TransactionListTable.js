import React from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Space,
  Modal,
  Input,
  Form,
  message,
  Select,
  InputNumber,
} from "antd";
import useTransactionList from "../hooks/UseTransactionList";
import { Link } from "react-router-dom";
import Main from "../components/layout/Main";
import Api from "../api";

const { Option } = Select;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Transaction Id",
    dataIndex: "transaction_id",
    key: "transaction_id",
    align: "center",
  },
  {
    title: "User ID",
    dataIndex: "user_id",
    key: "user_id",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => `${Number(amount / 100).toFixed(2)}`,
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    align: "center",
  },
  {
    title: "Success Transaction ID",
    dataIndex: "success_trans_id",
    key: "success_trans_id",
    align: "center",
  },
  {
    title: "Check ",
    dataIndex: "ofd_url",
    key: "ofd_url",
    align: "center",
    render: (_, record) =>
      record.ofd_url ? (
        <a href={record?.ofd_url} target="_blank" rel="noopener noreferrer">
          <Button type="link">See check</Button>
        </a>
      ) : (
        <span style={{ color: "red" }}>Check not available</span>
      ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Link to={"/transaction-id/" + record.id}>
        <Button type="link">More Info</Button>
      </Link>
    ),
    align: "center",
  },
];

function TransactionListTable() {
  const { transactionListData, setNext, next, setAddData } =
    useTransactionList();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddTransaction = async (values) => {

    const data = {
      user_id: Number(values.user_id),
      method: values.method,
      amount: Math.round(values.amount * 100),
      month: Number(values.month),
    };

    try {
      await Api.post("/transaction/add", data);
      setAddData(true);
      message.success("Transaction added successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to add transaction.");
    }
  };

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transaction List"
              extra={
                <Button type="primary" onClick={showModal}>
                  Add Transaction
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={transactionListData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Space style={{ padding: "10px" }}>
                {next > 1 ? (
                  <Button onClick={() => setNext(next - 1)}>Previous</Button>
                ) : (
                  ""
                )}
                {transactionListData?.length >= 50 ? (
                  <Button onClick={() => setNext(next + 1)}>Next</Button>
                ) : (
                  <Button disabled>Next</Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Modal for Adding Transaction */}
        <Modal
          title="Add Transaction"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleAddTransaction}>
            <Form.Item
              name="user_id"
              label="User Id"
              rules={[{ required: true, message: "Please input User Id!" }]}
            >
              <Input placeholder="Enter User Id" />
            </Form.Item>

            <Form.Item
              name="method"
              label="Method"
              rules={[{ required: true, message: "Please input Method!" }]}
            >
              <Select placeholder="Please input Method">
                <Option value="ADMIN">Admin</Option>
                <Option value="CASH">Cash</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount (The value before the point is the amount, and the value after the point is the penny.)"
              rules={[{ required: true, message: "Please input Amount!" }]}
            >
              <InputNumber
                placeholder="Enter Amount"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) => `${parseFloat(value || 0).toFixed(2)}`}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              name="month"
              label="Month"
              rules={[
                {
                  required: true,
                  message: "Please input Month!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Month" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Transaction
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Main>
  );
}

export default TransactionListTable;
