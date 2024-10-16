import { Row, Col, Card, Table, Input, Button, Form, message } from "antd";
import React, { useState } from "react";
import useMonthlyTransaction from "../hooks/UseMonthlyTransaction";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Transaction ID",
    dataIndex: "transId",
    key: "transId",
    align: "center",
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
  },
  {
    title: "Pay At",
    dataIndex: "payAt",
    key: "payAt",
    align: "center",
    render: (payAt) => {
      const date = new Date(...payAt); // payAt arrayidan sana olish
      return <span>{date.toLocaleDateString()}</span>;
    },
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
  const { transactionMonthlyData, fetchTransactionData } =
    useMonthlyTransaction();

  const handleFetch = () => {
    if (month && year) {
      fetchTransactionData(year, month);
    } else {
      message.warning("Please provide both month and year");
    }
  };

  // Calculate total amount
  const totalAmount =
    transactionMonthlyData?.length > 0
      ? transactionMonthlyData?.reduce(
          (total, record) => total + record.amount,
          0
        )
      : 0;

  return (
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

            {/* Show message if no data */}
            {!transactionMonthlyData || transactionMonthlyData.length === 0 ? (
              <div
                style={{
                  marginBottom: "16px",
                  padding: "20px",
                  fontSize: "18px",
                }}
              >
                No information found
              </div>
            ) : (
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
                  Total Amount: {totalAmount.toLocaleString()}
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
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MonthlyTransaction;
