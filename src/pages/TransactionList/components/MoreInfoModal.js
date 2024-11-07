import React, { useState } from "react";
import { Modal, Button, Row, Col, Card, Table } from "antd";
import Api from "../../../api";

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {
  const [transIdData, setTransIdData] = useState();

  const dataIndex =
    transIdData?.length > 0
      ? transIdData?.map((transaction) => ({
          id: transaction.id,
          transaction_id: transaction.transaction_id,
          user_id: transaction.user_id,
          amount: transaction.amount,
          method: transaction.method,
          success_trans_id: transaction.success_trans_id,
          ofd_url: transaction.ofd_url,
          create_at: transaction.create_at.slice(0, 10),
        }))
      : [];

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
          transaction_id
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
          success_trans_id
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
    {
      title: "Create",
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },
  ];

  const fetchTransData = async () => {
    if (!selectedUser) return;
    try {
      const res = await Api.get(`/transaction/${selectedUser}`);
      setTransIdData([res.data.data]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchTransData();
  }, [selectedUser]);

  return (
    <Modal
      title="Transaction Info"
      open={isModalUserInfo}
      onCancel={() => {
        setIsModalUserInfo(false);
        setSelectedUser(null);
        setTransIdData([]);
      }}
      footer={null}
      width={1100}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transaction Info"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataIndex}
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
