import React from "react";
import { Row, Col, Card, Button, Space, Input, message } from "antd";
import useUserList from "../../hooks/UseUserList";
import Main from "../../components/layout/Main";
import UserData from "./data/UserData";

function UsersListTable() {
  const {
    userListData,
    next,
    setNext,
    fetchUserPhoneNumberData,
  } = useUserList();

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "20px",
                }}
              >
                <div>
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
                </div>
              </div>

              <div className="table-responsive">
                <UserData
                  userListData={userListData}
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
