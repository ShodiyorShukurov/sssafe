import React from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Space,
  Input,
  message,
  Modal,
  Upload,
  Form,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useUserList from "../hooks/UseUserList";
import Main from "../components/layout/Main";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Api from "../api";

const { Option } = Select;

function UsersListTable() {
  const { userListData, next, setNext, fetchUserPhoneNumberData } =
    useUserList();

  const [phoneNumber, setPhoneNumber] = React.useState();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [fileList, setFileList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form] = Form.useForm();

  /* SEND MESSAGE TO USER*/
  const openMessageModal = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleSendMessage = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("text", values.text);
    formData.append("photo", values.photo.file);
    formData.append("chat_id", selectedUser.chat_id);

    try {
      await Api.post("/news/single/user", formData);
      message.success("Successfully!");
      setIsLoading(false);
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
      setSelectedUser(null);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      message.error("Failed");
    }
  };

  /* SEND MESSAGE TO USERS*/

  const handleSendMessageUsers = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("text", values.text);
    formData.append("photo", values.photo.file);
    formData.append("user_subcribe", values.user_subcribe);

    try {
      await Api.post("/news/all/users", formData);
      message.success("Successfully!");
      setIsLoading(false);
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      message.error("Failed");
    }
  };

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

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={"/user-list/" + record.chat_id}>
            <Button type="link">More Info</Button>
          </Link>

          <Button type="link" onClick={() => openMessageModal(record)}>
            Send message
          </Button>
        </Space>
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

                <Button type="primary" onClick={() => openMessageModal()}>
                  Send message to users
                </Button>
              </div>

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

        {/* User send message Modal */}
        <Modal
          title="Send Message"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={
              selectedUser?.chat_id ? handleSendMessage : handleSendMessageUsers
            }
          >
            <Form.Item
              name="text"
              label="Text"
              rules={[{ required: true, message: "Please enter text" }]}
            >
              <ReactQuill
                theme="snow"
                placeholder="Type your message here..."
                style={{ marginBottom: "16px" }}
              />
            </Form.Item>

            <Form.Item
              name="photo"
              label="Photo"
              rules={[{ required: true, message: "Please upload a picture" }]}
            >
              <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleUploadChange}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>

            {selectedUser?.chat_id ? (
              " "
            ) : (
              <Form.Item
                name="user_subcribe"
                label="User subcribe"
                rules={[
                  { required: true, message: "Please select a user account" },
                ]}
              >
                <Select placeholder="Please select a user account">
                  <Option key={"all"} value={"all"}>
                    All
                  </Option>
                  <Option key={"true"} value={"true"}>
                    Channel subscribers
                  </Option>
                  <Option key={"false"} value={"false"}>
                    Channel not subscribers
                  </Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={isLoading}
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Main>
  );
}

export default UsersListTable;
