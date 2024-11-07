import { Button, Table } from "antd";

const TransactionData = ({ transactionListData, showUserInfoModal }) => {
  const dataIndex =
    transactionListData?.length > 0
      ? transactionListData?.map((transaction, index) => ({
          id: index + 1,
          amount: transaction.amount,
          method: transaction.method,
          create_at: transaction.create_at.slice(0, 10  ),
          transactionId: transaction.id,
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
      title: "Create",
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => showUserInfoModal(record.transactionId)}
        >
          <svg
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="size-4"
          >
            <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
          </svg>
        </Button>
      ),
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

export default TransactionData;
