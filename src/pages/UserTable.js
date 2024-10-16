import { Row, Col, Card, Table, Button } from "antd";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import Api from "../api";

const columns = () => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Phone Number",
    dataIndex: "contactNumber",
    key: "contactNumber",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  },
  {
    title: "Admin (0-5)",
    dataIndex: "admin",
    key: "admin",
    align: "center",
  },
  {
    title: "Subscribed",
    dataIndex: "subscribed",
    key: "subscribed",
    align: "center",
    render: (subscribed) => (
      <Button type={subscribed ? "primary" : "default"} className="tag-primary">
        {subscribed ? "Subscribed" : "Not Subscribed"}
      </Button>
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
  const [userData, setUserData] = useState();

  React.useEffect(() => {
    let isMounted = true; // track if component is mounted

    const fetchUserData = async () => {
      try {
        const res = await Api.get(`/user/read/${id}`);
        if (isMounted) {
          setUserData(res.data); // only update state if mounted
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false; // cleanup function to set isMounted to false
    };
  }, [id]);

  if (!userData) {
    return <div>User not foundi</div>;
  }

  return (
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
                columns={columns()} // Call the columns function
                dataSource={[userData]}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserTable;
