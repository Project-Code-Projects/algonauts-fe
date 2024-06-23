"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReactFlowProvider } from 'reactflow';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}><ReactFlowProvider>{children}</ReactFlowProvider></Provider>;
};

export default Providers;
