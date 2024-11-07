import React from "react";
import { Row, Col, Card, Button, Space, Input, Form, message } from "antd";
import useTransactionList from "../../hooks/UseTransactionList";
import Main from "../../components/layout/Main";
import TransactionData from "./data/TransactionData";
import MoreInfoModal from "./components/MoreInfoModal";

function TransactionListTable() {
  const {
    transactionListData,
    setNext,
    next,
    fetchTransactionMonthData,
    total,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    selectedUser,
    setSelectedUser,
  } = useTransactionList();

  const [form] = Form.useForm();

  const handleFetch = (value) => {
    if (value.month && value.year) {
      fetchTransactionMonthData(value.year, value.month);
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
              title="Transaction List"
            >
              <Form
                form={form}
                layout="inline"
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
                <TransactionData
                  transactionListData={transactionListData}
                  showUserInfoModal={showUserInfoModal}
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

      <MoreInfoModal
        isModalUserInfo={isModalUserInfo}
        setIsModalUserInfo={setIsModalUserInfo}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </Main>
  );
}

export default TransactionListTable;
