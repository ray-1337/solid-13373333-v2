import { useState, useEffect } from "react";
import { sleep, preventClick } from "../Util";
import Image from "next/image";
import { marked } from "marked";
import Vibrant from "node-vibrant";

import style from "../css/components/About.module.css";

import rayImg from "../../../assets/pfp/legosi.webp";

export default function AboutPage(props: { active?: boolean }) {
  const contextImg = "https://twitter.com/Gab_914/status/1674430803261149184";

  const ShortBio = marked.parseInline(`
    **Hello.** I'm Ray, and I'm a *full-stack developer*, and my origin is from <u>Indonesia</u>.
    I've been interested in developing server things since <u>I was 11 years old</u>.
    And, I've also mastered in developing website since March and April 2020.
    `, { gfm: true, breaks: true });
    
  const [toggle, setToggle] = useState<boolean>(false)
  const [deferToggle, setDeferToggle] = useState<boolean>(false);

  useEffect(() => {
    props?.active ? setToggle(true) : sleep(750).then(() => setToggle(false));
    toggle ? setTimeout(() => setDeferToggle(true), 5) : setDeferToggle(false);
  });

  const [pfpColorProm, setPfpColorProm] = useState<string | null>(null);

  return (
    <div className={style.about} data-itchi={String(deferToggle)}>
      <div className={style.header} style={{ "backgroundColor": pfpColorProm || undefined }}></div>

      <div className={style.overview}>
        <div className={style.selfie} onClick={() => contextImg ? window.open(contextImg, "_blank") : null}>
          <Image
            src={rayImg}
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