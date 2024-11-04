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
      title: "Chat Id",
      dataIndex: "chat_id",
      key: "chat_id",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
      render: (phone_number) =>
        phone_number ? (
          <a href={"tel:" + phone_number}>{phone_number}</a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Subscribe",
      dataIndex: "subscribe",
      key: "subscribe",
      align: "center",
      render: (subscribe) => (
        <Button
          type={subscribe ? "primary" : "default"}
          className={subscribe ? "tag-primary" : "tag-badge"}
        >
          {subscribe ? "Subscribed" : "Not Subscribed"}
        </Button>
      ),
    },

    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      align: "center",
      render: (duration) => (
        <span>
          {duration ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: "Expired",
      dataIndex: "expired",
      key: "expired",
      align: "center",
      render: (expired) => (
        <span>
          {expired !== null ? (
            expired
          ) : (
            <span style={{ color: "red " }}>Not Found</span>
          )}
        </span>
      ),
    },

    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      align: "center",
      render: (center) => (
        <span>
          {center !== null ? (
            center
          ) : (
            <span style={{ color: "red " }}>Not Found</span>
          )}
        </span>
      ),
    },
  ];

function UserTable() {
  const { id } = useParams();
  const [userData, setUserData] = useState();

  React.useEffect(() => {
    let isMounted = true; 

    const fetchUserData = async () => {
      try {
        const res = await Api.get(`/user/${id}`);
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
    return <Main>User not found</Main>;
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
                  columns={columns} // Call the columns function
                  dataSource={[userData]}
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
