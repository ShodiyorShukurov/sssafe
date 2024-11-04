import { Row, Col, Card, Table, Button } from "antd";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import Api from "../api";
import Main from "../components/layout/Main";

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
    render: (transaction_id) =>
      transaction_id ? (
        { transaction_id }
      ) : (
        <span style={{ color: "red" }}>Not found</span>
      ),
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
    render: (success_trans_id) =>
      success_trans_id ? (
        { success_trans_id }
      ) : (
        <span style={{ color: "red" }}>Not found</span>
      ),
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
];

function TransIdTable() {
  const { id } = useParams();
  const [transIdData, setTransIdData] = useState();


  const fetchTransData = async () => {
    try {
      const res = await Api.get(`/transaction/${id}`);
      setTransIdData(res.data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchTransData();
  }, [id]);

  if (!transIdData) {
    return <Main>Transaction not found</Main>;
  }


  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transaction Details"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={[transIdData]}
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

export default TransIdTable;
