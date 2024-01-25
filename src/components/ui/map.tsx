"use client";
import { FunctionComponent, useEffect, useState } from "react";

export const Map: FunctionComponent = ({ ...props }) => {
  const [Client, setClient] = useState<FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== "undefined") {
        const newClient = (await import("@/components/ui/client-map")).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  if (typeof global.window === "undefined" || !Client) {
    return null;
  }

  return Client ? <Client {...props} /> : null;
};
