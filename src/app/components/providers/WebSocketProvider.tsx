import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeWebSocket } from "../../store/slices/websocketSlice";
import type { AppDispatch } from "../../store/store";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const ws = dispatch(initializeWebSocket());
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [dispatch]);

  return <>{children}</>;
};
