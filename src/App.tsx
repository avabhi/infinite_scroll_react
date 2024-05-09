import * as React from "react";
import type { Location, useMatches } from "react-router-dom";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import "./index.css";
import InfiniteScrollList from "./components/list/List";
import { ItemProvider } from "./context/RootContext";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <InfiniteScrollList />,
      },
      {
        path: "list",
        element: <InfiniteScrollList />,
        handle: { scrollMode: "pathname" },
      },
    ],
  },
]);
console.log("router", router);

console.log("test");

export default function App() {
  return (
    <ItemProvider>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </ItemProvider>
  );
}

function Layout() {
  let getKey = React.useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      let match = matches.find((m) => (m.handle as any)?.scrollMode);
      if ((match?.handle as any)?.scrollMode === "pathname") {
        return location.pathname;
      }

      return location.key;
    },
    []
  );

  return (
    <>
      <div className="wrapper">
        <div className="right">
          <Outlet />
        </div>
      </div>
      <ScrollRestoration getKey={getKey} />
    </>
  );
}
