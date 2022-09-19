import { Provider } from "react-redux";
import store from "./app/store";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllTransactions from "./pages/AllTransactions";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<AllTransactions />} />
          </Routes>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
