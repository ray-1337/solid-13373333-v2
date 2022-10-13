import { Component, onMount, onCleanup } from "solid-js";
import style from "../../css/Main.module.css";

import * as PIXI from 'pixi.js';

import { ShaderSystem } from '@pixi/core';
import { install } from '@pixi/unsafe-eval';
install({ ShaderSystem });

// images
import img002 from "../../assets/002.webp";

// etc
import etc1 from "../../assets/etc/a.webp";
import { sleep } from "../../Util";

const renderOptions: PIXI.IRendererOptionsAuto = {
  height: 1737, width: 1158,
  backgroundAlpha: 0,
  clearBeforeRender: true
};

let renderer = PIXI.autoDetectRenderer(renderOptions);

const Wobbly: Component = () => {
  let basingstoke!: HTMLDivElement;

  onMount(() => itchi());

  onCleanup(() => itchi().clear());

  function itchi() {
    function recreate() {
      renderer = PIXI.autoDetectRenderer(renderOptions);
  
      let delta_scale = 115, delta_offset = 4;
      let stage = new PIXI.Container();
      let texture = PIXI.Texture.from(img002);
      let logo = new PIXI.Sprite(texture);
  
      let displacementSprite = PIXI.Sprite.from(etc1);
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  
      let displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
      stage.addChild(displacementSprite);
      stage.addChild(logo);
      displacementSprite.scale.y = 2;
      displacementSprite.scale.x = 2
      basingstoke.appendChild(renderer.view);
  
      function matthew() {
        const animationFrame = requestAnimationFrame(matthew);
        displacementFilter.scale.x = delta_scale;
        displacementFilter.scale.y = delta_scale;
        displacementSprite.x += delta_offset;
        displacementSprite.y += delta_offset;
        stage.filters = [displacementFilter];
        renderer.render(stage);
  
        return {
          clear: () => cancelAnimationFrame(animationFrame)
        };
      };
  
      renderer.addListener("postrender", async () => {
        await sleep(1000);
        basingstoke.classList.add(style.aktif);
      });
  
      matthew();
    };

    return {
      recreate: recreate(),
      clear: function buro() {
        renderer.destroy(true);
        // matthew().clear();
        // stage.destroy(true);
        // texture.destroy(true);
        // logo.destroy(true);
        // displacementSprite.destroy(true);
        // displacementFilter.destroy();
        // basingstoke.removeChild(renderer.view);
        // matthew().clear();
        // renderer.removeAllListeners();
        return;
      }
    };
  };

  return (
    <div class={style.wobbly} ref={(evt) => basingstoke = evt}> </div>
  );
};

export default Wobbly;