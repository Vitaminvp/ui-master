import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it('render without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
