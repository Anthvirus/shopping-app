"use client"
import App from "@/components/app";
import { Provider } from "react-redux";
import store from "../store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}
