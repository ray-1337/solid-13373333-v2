import { Component, lazy, onCleanup, onMount } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import MainPage from "./pages/Main/Index";
import Catbox from "./pages/FileUploader/Index";

const Index: Component = () => {
  function ignoreTab(event: KeyboardEvent) {
    if (event.key == "Tab" || event.keyCode == 9) {
      return event.preventDefault();
    };
  };

  onMount(() => {
    document.title = "i hid my pain here.";
    document.documentElement.addEventListener("keydown", (event) => ignoreTab(event));
  });

  onCleanup(() => {
    document.documentElement.removeEventListener("keydown", (event) => ignoreTab(event));
  });

  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/catbox" element={<Catbox/>} />
    </Routes>
  );
};

export default Index;