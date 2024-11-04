import React from "react";
import Api from "../api";

const useTransactionList = () => {
  const [transactionListData, setTransactionListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [addData, setAddData] = React.useState(false);
  const [total, setTotal] = React.useState();

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
    if(!month) return; 
    try {
      const res = await Api.get(
        `/transactions/filter?limit=50&page=${next}&month=${month}&year=${year}`
      );
      setTransactionListData(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchTransactionData();
    fetchTransactionMonthData()
  }, [next, addData]);

  return {
    transactionListData,
    setNext,
    next,
    setAddData,
    total,
    fetchTransactionMonthData,
  };
};

export default useTransactionList;
