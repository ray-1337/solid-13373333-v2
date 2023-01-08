import { useEffect, createRef } from 'react';
import style from "../css/Main.module.css";

import {
  IRendererOptionsAuto,
  autoDetectRenderer,
  Container,
  Texture,
  TextureSource,
  Sprite,
  SpriteSource,
  WRAP_MODES,
  filters as PIXIFilters
} from 'pixi.js';

import { ShaderSystem } from '@pixi/core';
import { install } from '@pixi/unsafe-eval';
install({ ShaderSystem });

// images
import selfie from "../assets/006.webp";

// etc
import etc1 from "../assets/etc/a.webp";
import { sleep } from "../Util";

const renderOptions: IRendererOptionsAuto = {
  height: 1166, width: 873,
  backgroundAlpha: 0,
  clearBeforeRender: true
};

let renderer = autoDetectRenderer(renderOptions);

export default function Wobbly() {
  let basingstoke = createRef<HTMLDivElement>(), {current: basingstokeRef} = basingstoke;

  useEffect(() => {
    const itchiInstitute = itchi();
    itchiInstitute.recreate();

    return itchiInstitute.clear();
  });

  function itchi() {
    function recreate() {
      renderer = autoDetectRenderer(renderOptions);
  
      let delta_scale = 250, delta_offset = 2;
      let stage = new Container();
      let texture = Texture.from(selfie as TextureSource);
      let logo = new Sprite(texture);
  
      let displacementSprite = Sprite.from(etc1 as SpriteSource);
      displacementSprite.texture.baseTexture.wrapMode = WRAP_MODES.MIRRORED_REPEAT;
  
      let displacementFilter = new  PIXIFilters.DisplacementFilter(displacementSprite);
      stage.addChild(displacementSprite);
      stage.addChild(logo);
      displacementSprite.scale.y = 2.5;
      displacementSprite.scale.x = 2.5;
      basingstokeRef!.appendChild(renderer.view);
  
      function matthew() {
        const animationFrame = requestAnimationFrame(matthew);
        displacementFilter.scale.x = delta_scale;
        displacementFilter.scale.y = delta_scale;
        displacementSprite.x += delta_offset;
        displacementSprite.y += delta_offset;
        stage.filters = [displacementFilter];
        renderer.render(stage); // i hate this
  
        return {
          clear: () => cancelAnimationFrame(animationFrame)
        };
      };
  
      renderer.addListener("postrender", async () => {
        await sleep(1000);
        basingstokeRef!.classList.add(style.aktif);
      });
  
      return matthew();
    };

    return {
      recreate,
      clear: function buro() {
        return renderer.destroy(true);
      }
    };
  };

  return (
    <div className={style.wobbly} ref={basingstoke}> </div>
  );
};