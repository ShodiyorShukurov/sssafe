import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Button,
  Form,
  message,
  Space,
} from "antd";
import React, { useState } from "react";
import useMonthlyTransaction from "../hooks/UseMonthlyTransaction";
import Main from "../components/layout/Main";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Transaction ID",
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
    title: "Success Transaction Id",
    dataIndex: "success_trans_id",
    key: "success_trans_id",
    align: "center",
  },
  {
    title: "Check",
    dataIndex: "ofd_url",
    key: "ofd_url",
    align: "center",
    render: (_, record) => (
      <a href={record?.ofd_url} target="_blanck">
        <Button type="link">See check</Button>
      </a>
    ),
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    align: "center",
  },
];

function MonthlyTransaction() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { transactionMonthlyData, fetchTransactionData, setNext, next, total } =
    useMonthlyTransaction();

  const handleFetch = () => {
    if (month && year) {
      fetchTransactionData(year, month);
    } else {
      message.warning("Please provide both month and year");
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
              title="Monthly Transaction List"
            >
              {/* Form for inputting month and year */}
              <Form
                layout="inline"
                style={{ marginBottom: "16px", padding: "20px" }}
              >
                <Form.Item label="Month">
                  <Input
                    type="number"
                    placeholder="MM"
                    value={month}
                    maxLength={2}
                    min={1}
                    max={12}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 2) setMonth(value);
                    }}
                  />
                </Form.Item>
                <Form.Item label="Year">
                  <Input
                    type="number"
                    placeholder="YYYY"
                    value={year}
                    maxLength={4}
                    min={1000}
                    max={9999}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 4) setYear(value);
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleFetch}>
                    Search
                  </Button>
                </Form.Item>
              </Form>

              {
                <>
                  {/* Total amount */}
                  <div
                    style={{
                      marginBottom: "16px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#14A44D",
                      padding: "0 20px",
                    }}
                  >
                    Total Amount: {total ? Number(total?.sum / 100).toFixed(2): "00.00"}
                  </div>

                  {/* Table */}
                  <div className="table-responsive">
                    <Table
                      columns={columns}
                      dataSource={transactionMonthlyData}
                      pagination={false}
                      className="ant-border-space"
                    />
                  </div>
                </>
              }

              <Space style={{ padding: "10px" }}>
                {next > 1 ? (
                  <Button onClick={() => setNext(next - 1)}>Previous</Button>
                ) : (
                  ""
                )}
                {transactionMonthlyData?.length >= 50 ? (
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

export default MonthlyTransaction;
