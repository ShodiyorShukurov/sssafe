import { Row, Col, Card, Table, Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import Api from "../api";

const columns = (showImage) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Trans ID",
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
    render: (amount) => `${amount.toFixed(2)}`, // 2 ondalik raqam bilan ko'rsatish
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
  {
    title: "Actions",
    key: "actions",
    align: "center",
    render: (_, record) =>
      record.method === "CARD" ? (
        <Button type="link" onClick={() => showImage()}>
          see the picture
        </Button>
      ) : null,
  },
];

function TransIdTable() {
  const { id } = useParams();
  const [transIdData, setTransIdData] = useState();
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");


const fetchImgData = async (transId) => {
  try {
    const res = await Api.get(`/transaction/photo/${transId}`, {
      responseType: "blob", 
    });
    const imageUrl = URL.createObjectURL(res.data); 
    setImageUrl(imageUrl); 
  } catch (error) {
    console.log(error);
    throw error;
  }
};

  const fetchTransData = async () => {
    try {
      const res = await Api.get(`/transaction/read/${id}`);
      setTransIdData(res.data);
      if (res.data.method === "CARD") fetchImgData(res.data.transId)
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchTransData();
  }, []);

  if (!transIdData) {
    return <div>Transaction not found</div>;
  }


    const showImage = () => {
      setVisible(true);
    };


  // Modalni yopish
  const handleCancel = () => {
    setVisible(false);
  };

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
                columns={columns(showImage)}
                dataSource={[transIdData]}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Rasm ko'rsatish uchun modal */}
      <Modal
        title="Foydalanuvchi Rasm"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <img alt="User" style={{ width: "100%" }} src={imageUrl} />
      </Modal>
    </div>
  );
}

export default TransIdTable;
