import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <div className=" custom-scroll h-screen max-w-full overflow-x-auto">
          <App />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
