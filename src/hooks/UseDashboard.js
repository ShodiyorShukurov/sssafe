import React from "react";
import Api from "../api";

const useDashboard = () => {

  const [monthStatistics, setMonthStatistics] = React.useState([])
  const [userStatistics, setUserStatistics] = React.useState([])
  const [userStatisticsMonth, setUserStatisticsMonth] = React.useState([])
  const [userStatisticsSource, setUserStatisticsSource] = React.useState([])

  const getMonthlyData = async () => {
    try {
      const res = await Api.get("/transactions/statistics/month");
      setMonthStatistics(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUserStatisticsData = async () => {
    try {
      const res = await Api.get("/users/statistics");
      setUserStatistics(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUserStatisticsMonthData = async () => {
    try {
      const res = await Api.get("/transactions/statistics/increase");
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUserStatisticsSouce = async () => {
    try {
      const res = await Api.get("/users/statistics/source");
      setUserStatisticsSource(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  React.useEffect(() => {
    getMonthlyData();
    getUserStatisticsData()
    getUserStatisticsMonthData();
    getUserStatisticsSouce()
  }, []);


  return {
    monthStatistics,
    userStatistics,
    userStatisticsMonth,
    userStatisticsSource,
  };

};

export default useDashboard;
