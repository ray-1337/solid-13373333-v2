/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import App from "./Route";

// base css
import "./css/Base.css";
import "./css/Reset.css";

render(() => (
  <Router>
    <App />
  </Router>
), document.querySelector("good-faith") as HTMLElement);