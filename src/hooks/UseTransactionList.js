import React from "react";
import Api from "../api";

const useTransactionList = () => {
  const [transactionListData, setTransactionListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [addData, setAddData] = React.useState(false);
  const [total, setTotal] = React.useState();
  const [isModalUserInfo, setIsModalUserInfo] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const showUserInfoModal = (record) => {
    setSelectedUser(record);
    setIsModalUserInfo(true);
  };

  const fetchTransactionData = async () => {
    try {
      const res = await Api.get(`/transactions/list?limit=50&page=${next}`);
      setTransactionListData(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchTransactionMonthData = async (year, month) => {
    if (!month) return;
    try {
      const res = await Api.get(
        `/transactions/filter?limit=50&page=${next}&month=${month}&year=${year}`
      );
      setTransactionListData(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 404") {
        setTransactionListData([]);
      }
    }
  };

  React.useEffect(() => {
    fetchTransactionData();
    fetchTransactionMonthData();
  }, [next, addData]);

  return {
    transactionListData,
    setNext,
    next,
    setAddData,
    total,
    fetchTransactionMonthData,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    selectedUser,
    setSelectedUser,
  };
};

export default useTransactionList;
