/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import App from "./Route";
import { MetaProvider, Link } from "solid-meta";

// base css
import "./css/Base.css";
import "./css/Reset.css";
import ico from "./assets/ico.webp";

render(() => (
  <MetaProvider>
    {/* <Link href="https://fonts.googleapis.com/css2?family=Outft:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="preload stylesheet" /> */}
    {/* <Link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/v5-font-face.min.css" rel="preload stylesheet" /> */}
    {/* <Link href={ico} rel="shortcut icon" /> */}

    <Router>
      <App />
    </Router>
  </MetaProvider>
), document.querySelector("good-faith") as HTMLElement);