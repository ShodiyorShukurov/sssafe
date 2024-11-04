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


function TransactionListTable() {
  const {
    transactionListData,
    setNext,
    next,
    setAddData,
    fetchTransactionMonthData,
    total,
  } = useTransactionList();

  const handleFetch = (value) => {
    console.log(value);
    if (value) {
      fetchTransactionMonthData(value.year, value.month);
    } else {
      message.warning("Please provide both month and year");
    }
  };

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

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

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transaction List"
            >
              <Form
                layout="inline"
                form={form}
                style={{ padding: "20px" }}
                onFinish={handleFetch}
              >
                <Form.Item label="Month" name="month">
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #d9d9d9",
                      padding: "4px 11px",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                  >
                    <option>Select Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </Form.Item>

                <Form.Item label="Year" name="year">
                  <Input
                    type="number"
                    placeholder="YYYY"
                    maxLength={4}
                    min={1000}
                    max={9999}
                    style={{ width: 100 }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Form>

              {total ? (
                <div
                  style={{
                    marginBottom: "16px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#14A44D",
                    padding: "0 20px",
                  }}
                >
                  Total Amount: {Number(total?.sum / 100).toFixed(2)}
                </div>
              ) : (
                " "
              )}

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
      </div>
    </Main>
  );
}

export default TransactionListTable;
