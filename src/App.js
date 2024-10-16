import { Switch, Route, Redirect } from "react-router-dom";
import UsersListTable from "./pages/UsersListTable";
import TransactionListTable from  './pages/TransactionListTable'
import MonthlyTransaction from "./pages/MonthlyTransaction";
import UserIdTransaction from "./pages/UserIdTransaction";
import UserTable from "./pages/UserTable";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import TransIdTable from "./pages/TransIdTable";

function App() {
  return (
    <div className="App">
      <Switch>
        <Main>
          <Route exact path="/user-list" component={UsersListTable} />
          <Redirect from="*" to="/user-list" />
          <Route
            exact
            path="/transaction-list"
            component={TransactionListTable}
          />
          <Route exact path="/user-list/:id" component={UserTable} />
          <Route
            exact
            path="/monthly-transactions"
            component={MonthlyTransaction}
          />
          <Route
            exact
            path="/userId-transaction"
            component={UserIdTransaction}
          />
          <Route exact path="/transaction-id/:id" component={TransIdTable} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;

  
