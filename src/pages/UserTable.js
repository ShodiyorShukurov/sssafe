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

function UserTable() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  React.useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const res = await Api.get(`/transactions/user?user_id=${id}`);
        if (isMounted) {
          setUserData(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!userData) {
    return <Main>Data not found</Main>;
  }

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="User Details"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={userData}
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

export default UserTable;
