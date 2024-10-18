import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Input, message } from "antd";
import useUserTransaction from "../hooks/UseUserTransaction";
import Main from "../components/layout/Main";

// table code start
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
  {
    title: "Success Transaction ID",
    dataIndex: "successTransId",
    key: "successTransId",
    align: "center",
  },
];


function UserIdTransaction() {
 const [searchId, setSearchId] = useState("");
 const { transactionListData, fetchTransactionData } = useUserTransaction();
 console.log(transactionListData)

   const onSearch = () => {
     if (!searchId) {
       message.warning("ID kiritishingiz shart!"); 
       return;
     }
     fetchTransactionData(searchId);
   };
  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="User Transaction List"
            >
             
              <Input
                placeholder="Enter ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onPressEnter={onSearch}
                style={{ marginBottom: "16px", width: "300px", marginLeft: "20px", marginTop: "20px" }}
              />
              <Button onClick={onSearch} type="primary" style={{marginLeft: "10px" }}>
                Search
              </Button>

              <div className="table-responsive" style={{ marginTop: "16px" }}>
                <Table
                  columns={columns}
                  dataSource={transactionListData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}

export default UserIdTransaction;
