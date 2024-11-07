import React, { useState } from "react";
import { Modal, Form, Button, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Api from "../../../api";


const { Option } = Select;

const SendMessageUserModal = ({
  isModalVisible,
  handleCancel,
  selectedUser,
  setSelectedUser,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("text", values.text);
    formData.append("photo", values?.photo ? values?.photo.file : null);
    formData.append("chat_id", selectedUser.chat_id);

    try {
      await Api.post("/news/single/user", formData);
      message.success("Successfully!");
      setIsLoading(false);
      setSelectedUser(null);
      handleCancel();
      form.resetFields();
    } catch (error) {
      setIsLoading(false);
      setSelectedUser(null);
      console.error(error);
      message.error("Failed");
    }
  };

  const handleSendMessageUsers = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("text", values.text);
    formData.append("photo", values?.photo ? values?.photo.file : null);
    formData.append("user_subcribe", values.user_subcribe);

    try {
      await Api.post("/news/all/users", formData);
      message.success("Successfully!");
      setIsLoading(false);
      handleCancel();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      message.error("Failed");
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isImageOrVideo =
      file.type.startsWith("image/") || file.type.startsWith("video/");
    if (!isImageOrVideo) {
      message.error("Only images or videos are allowed!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return (
    <Modal
      title="Send Message"
      open={isModalVisible}
      onCancel={handleCancel}
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
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: ["bold", "italic", "link", "undo", "redo"],
              image: {
                upload: false,
              },
            }}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ text: data });
            }}
          />
        </Form.Item>
        <Form.Item name="photo" label="Photo or video">
          <Upload
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Image or Video</Button>
          </Upload>
        </Form.Item>

        {selectedUser?.chat_id ? null : (
          <Form.Item
            name="user_subcribe"
            label="User Subscription"
            rules={[
              { required: true, message: "Please select a user account" },
            ]}
          >
            <Select placeholder="Please select a user account">
              <Option key="all" value="all">
                All
              </Option>
              <Option key="true" value="true">
                Channel subscribers
              </Option>
              <Option key="false" value="false">
                Channel non-subscribers
              </Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={isLoading}>
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendMessageUserModal;
