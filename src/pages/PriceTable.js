import React from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  message,
  InputNumber,
} from "antd";
import Main from "../components/layout/Main";
import Api from "../api";
import usePrice from "../hooks/UsePrice";

function PriceTable() {
  const { data, setEditData } = usePrice();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const [form] = Form.useForm();

  const showModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);

    form.setFieldsValue({
      price: Number(item.price / 100).toFixed(2),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };



  const handleEditPrice = async (values) => {
    const data = {
      id: Number(selectItem.id),
      price: Math.round(values.price * 100),
    };

    try {
      await Api.put("/price/edit", data);
      setEditData(true);
      message.success("Price edit successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to edit price.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => `${Number(price / 100).toFixed(2)}`,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => showModal(record)}>Edit</Button>
      ),
      align: "center",
    },
  ];

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Price Table"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Modal for Adding Transaction */}
        <Modal
          title="Edit Price"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleEditPrice}>
            <Form.Item
              name="price"
              label="Price (The value before the point is the amount, and the value after the point is the penny.)"
              rules={[{ required: true, message: "Please Price!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) => `${parseFloat(value || 0).toFixed(2)}`}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Edit Price
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Main>
  );
}

export default PriceTable;
