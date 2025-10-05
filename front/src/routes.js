import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Answer } from "./business";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: ":chapterNumber",
        element: <Answer />
    }
]);