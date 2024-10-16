import React from "react";
import Api from "../api";

const useMonthlyTransaction = (date) => {
  const [transactionMonthlyData, setTransactionMonthlyData] = React.useState();

  const fetchTransactionData = async (year, month) => {
    console.log(year, month,)
    try {
      const res = await Api.get(`/transaction/monthly?year=${year}&month=${month}`);
      setTransactionMonthlyData(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

//   React.useEffect(() => {
//     fetchTransactionData();
//   }, []);

  return {
    transactionMonthlyData,
    fetchTransactionData,
  };
};

export default useMonthlyTransaction;
