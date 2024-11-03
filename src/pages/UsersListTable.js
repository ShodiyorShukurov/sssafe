import { Row, Col, Card, Table, Button, Space, Input, message } from "antd";
import { Link } from "react-router-dom";
import useUserList from "../hooks/UseUserList";
import Main from "../components/layout/Main";
import styled from "styled-components";
import React from "react";

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
      phone_number ? <a href={"tel:" + phone_number}>{phone_number}</a> : "N/A",
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
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Link to={"/user-list/" + record.id}>
        <Button type="link">More Info</Button>
      </Link>
    ),
    align: "center",
  },
];

function UsersListTable() {
  const { userListData, next, setNext, fetchUserPhoneNumberData } =
    useUserList();

  const [phoneNumber, setPhoneNumber] = React.useState();

  const onSearch = () => {
    if (!phoneNumber) {
      message.warning("Must enter a phone number!");
      return;
    }
    const number = phoneNumber.startsWith("+")
      ? phoneNumber.slice(1)
      : phoneNumber;
    fetchUserPhoneNumberData(number);
  };

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="User List"
            >
              <Input
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onPressEnter={onSearch}
                style={{
                  marginBottom: "16px",
                  width: "300px",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              />
              <Button
                onClick={onSearch}
                type="primary"
                style={{ marginLeft: "10px" }}
              >
                Search
              </Button>

              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={userListData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Space style={{ padding: "10px" }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    Previous
                  </Button>
                )}

                {userListData?.length >= 50 ? (
                  <Button color="dark" onClick={() => setNext(next + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button variant="text" color="dark" disabled>
                    Next
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}

export default UsersListTable;
