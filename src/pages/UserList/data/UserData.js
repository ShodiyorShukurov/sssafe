import { Table } from "antd";

const userData = ({
  userListData,
}) => {
  const dataIndex =
    userListData?.length > 0
      ? userListData.map((user, index) => ({
          id: user.id,
          chat_id: user.chat_id,
          phone_number: user.phone_number,
          create_at: user.create_at.slice(0,10),
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
      title: "User Id",
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
      title: "Create",
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataIndex}
      pagination={false}
      className="ant-border-space"
    />
  );
};

export default userData;
