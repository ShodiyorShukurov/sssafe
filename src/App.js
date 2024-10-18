import { Route, Routes, Navigate } from "react-router-dom";
import UsersListTable from "./pages/UsersListTable";
import TransactionListTable from "./pages/TransactionListTable";
import MonthlyTransaction from "./pages/MonthlyTransaction";
import UserIdTransaction from "./pages/UserIdTransaction";
import UserTable from "./pages/UserTable";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import TransIdTable from "./pages/TransIdTable";
import LoginPage from "./components/layout/Login";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Private route logic for protecting routes */}
        <Route
          path="/"
          element={
            <PrivateRoute/>
          }
        >
          <Route path="user-list" element={<UsersListTable />} />
          <Route path="transaction-list" element={<TransactionListTable />} />
          <Route path="user-list/:id" element={<UserTable />} />
          <Route path="monthly-transactions" element={<MonthlyTransaction />} />
          <Route path="userId-transaction" element={<UserIdTransaction />} />
          <Route path="transaction-id/:id" element={<TransIdTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
