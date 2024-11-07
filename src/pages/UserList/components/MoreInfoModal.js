import React, { useState } from "react";
import { Modal, Button, Row, Col, Card, Table } from "antd";
import Api from "../../../api";

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {
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
      render: (_, record) =>
        record?.ofd_url ? (
          <a href={record?.ofd_url} target="_blanck">
            <Button type="link">See check</Button>
          </a>
        ) : (
          <span style={{ color: "red " }}>Not Found</span>
        ),
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      align: "center",
    },
  ];

  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    if (!selectedUser?.chat_id) return;
    try {
      const res = await Api.get(
        `/transactions/user?user_id=${selectedUser?.chat_id}`
      );
      if (res.data.data.length > 0) {
        setUserData(res.data.data);
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, [selectedUser?.chat_id]);

  console.log(userData);
  return (
    <Modal
      title="User Info"
      open={isModalUserInfo}
      onCancel={() => {
        setIsModalUserInfo(false);
        setSelectedUser(null);
        setUserData([]);
      }}
      footer={null}
      width={1000}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="User Info"
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
    </Modal>
  );
};

export default MoreInfoModal;
