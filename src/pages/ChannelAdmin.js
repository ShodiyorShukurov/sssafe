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
  Input,
} from "antd";
import Main from "../components/layout/Main";
import Api from "../api";
import useChannelAdmin from "../hooks/UseChannelAdmin";

function ChannelAdmin() {
  const { channelAdminData, setEditData } = useChannelAdmin();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const [form] = Form.useForm();

  const showModal = (item) => {
    setSelectItem(item);
    setIsModalVisible(true);

    form.setFieldsValue({
      username: item.username,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEditPrice = async (values) => {
    const data = {
      id: Number(selectItem.id),
      username: values.username,
    };

    try {
      await Api.put("/channel-admin/edit", data);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
      align: "center",
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
              title="Channel Admin Table"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={channelAdminData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Edit Price"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleEditPrice}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please Username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Edit Username
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Main>
  );
}

export default ChannelAdmin;
