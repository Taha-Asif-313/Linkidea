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
        <div className="bg-white relative text-black min-h-screen w-full overflow-x-hidden">
          <App />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
