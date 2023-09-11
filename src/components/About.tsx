import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { preventClick } from "./Utility";
import Image from "next/image";
import { marked } from "marked";
import Vibrant from "node-vibrant";
import ImageLoader from "./Loader";

import style from "../css/components/About.module.css";

export default function AboutPage(props: { active?: boolean }) {
  const contextImg = "https://twitter.com/Gab_914/status/1674430803261149184";

  const ShortBio = marked.parseInline(`
    **Hello.** I'm Ray, and I'm a *full-stack developer*, and my origin is from <u>Indonesia</u>.
    I've been interested in programming something since <u>I was 11 years old</u>.
    After 3 years of trying (2017-2020), I've tried to push my limits by <u>learning HTML, CSS, and friends</u>, until I finally made this and I'm here.
    `, { gfm: true, breaks: true });
  
  const [pfpColorProm, setPfpColorProm] = useState<string | null>(null);

  const [toggle, setToggle] = useState<boolean>(props?.active || false)

  const [deferredToggle] = useDebouncedValue(toggle, 10);
  useEffect(() => setToggle(true), []);

  return (
    <div className={style.about} data-itchi={String(deferredToggle)}>
      <div className={style.header} style={{ "backgroundColor": pfpColorProm || undefined }}></div>

      <div className={style.overview}>
        <div className={style.selfie} onClick={() => contextImg ? window.open(contextImg, "_blank") : null}>
          <Image
            crossOrigin={"anonymous"}
            loader={ImageLoader}
            fill={true}
            src={"/assets/pfp/legosi.webp"}
            alt={contextImg}
            loading={"lazy"}
            draggable={false}
            onContextMenu={(evt) => preventClick(evt)}
            onLoad={async (evt) => {
              evt.currentTarget.classList.add(style.kuma);

              if (!pfpColorProm) {
                const getPalette = await Vibrant.from(evt.currentTarget).getPalette();
                setPfpColorProm(getPalette?.DarkVibrant?.hex || "#121112");
              };
            }}
            />
        </div>

        <div className={style.fullname}>
          <h1 style={{ color: pfpColorProm || undefined }}>Hizkia Ray</h1>
        </div>
      </div>

      <div className={style.bullcrap}>
        <div className={style.bullcrap_title}>
          <h1>Short Bio</h1>
          <span></span>
        </div>

        <div className={style.bullcrap_more}>
          <p dangerouslySetInnerHTML={{__html: ShortBio}}></p>
        </div>
      </div>
    </div>
  );
};