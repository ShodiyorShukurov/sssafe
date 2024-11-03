import React from "react";
import Api from "../api";

const usePrice = () => {
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState(false)

  const fetchPriceData = async () => {
    try {
      const res = await Api.get("/prices");
      setEditData(false)
      setData([res.data.data]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchPriceData();
  }, [editData]);

  return { data, setEditData };
};

export default usePrice;
