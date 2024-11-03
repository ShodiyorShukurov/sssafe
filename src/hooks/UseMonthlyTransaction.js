import React from "react";
import Api from "../api";

const useMonthlyTransaction = (date) => {
  const [transactionMonthlyData, setTransactionMonthlyData] = React.useState();
  const [total, setTotal] = React.useState();
  const [next, setNext] = React.useState(1);
  const [month, setMonth] = React.useState();

  const fetchTransactionData = async (year, month) => {
    setMonth(month);
    try {
      const res = await Api.get(
        `/transactions/filter?limit=50&page=${next}&month=${month}&year=${year}`
      );
      setTransactionMonthlyData(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    if (!month) return;

    fetchTransactionData();
  }, [next]);

  return {
    transactionMonthlyData,
    fetchTransactionData,
    total,
    setNext,
    next,
  };
};

export default useMonthlyTransaction;
