import React from "react";
import Api from "../api";

const useDashboard = () => {

    const [monthStatistics, setMonthStatistics] = React.useState([])

  const getMonthlyData = async () => {
    try {
      const res = await Api.get("/transactions/statistics/month");
      setMonthStatistics(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    getMonthlyData();
  }, []);


  return{monthStatistics}

};

export default useDashboard;
