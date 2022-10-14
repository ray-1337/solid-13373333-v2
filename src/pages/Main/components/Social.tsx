import { Component, Show, createSignal, createEffect, For, JSX } from "solid-js";
import { sleep } from "../../../Util";

import style from "../../../css/Main.module.css";

const Social: Component<{ active?: boolean }> = (props: { active?: boolean }) => {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = createSignal<boolean>(false), [deferToggle, setDeferToggle] = createSignal<boolean>(false);
  createEffect(() => {
    derivedProps() ? setToggle(true) : sleep(750).then(() => setToggle(false));
    toggle() ? setTimeout(() => setDeferToggle(true), 5) : setDeferToggle(false);
  });

  return (
    <Show when={toggle()}>
      <div class={style.social} data-itchi={String(Boolean(deferToggle()))}>
        {/* heading */}
        <div class={style.heading_confront} style={{ background: "linear-gradient(90deg, rgba(95,117,223,1) 0%, rgba(84,155,235,1) 100%)" }}>
          <div class={style.title}> <h1>Social</h1> </div>
          <div class={style.sub}> <p>Here's a list of my social media, or any fun account, in case if you want to contact with me.</p> </div>
        </div>

        <For each={List()}>{
          (state) => {
            let color = state.colorArray.length > 1 ? state.colorArray.map((val, i) => {
              let math = Math.min(Math.max(Math.round((100 / state.colorArray.length) * i), 0), 100);

              return `${val} ${(i == 1 && state.colorArray.length == 2) ? 90 : math}%`;
            }) : state.colorArray[0];

            let combined: JSX.CSSProperties = state.colorArray.length > 1 ?
              { "background-image": `linear-gradient(90deg, ${color}), -webkit-linear-gradient(90deg, ${color})` } :
              { "background-color": state.colorArray[0] }


            return (
              <div class={style.tab}>
                <a rel="noreferrer" target="_blank" href={state.url}>
                  <div class={style.insider} style={combined}>
                    <h1>{state.title}</h1>
                  </div>
                </a>
              </div>
            );
          }
        }</For>
      </div>
    </Show>
  )
};

export default Social;

function List() {
  return [
    {
      url: "https://instagram.com/ray__1337",
      title: "Instagram",
      colorArray: ["#002296", "#82008f", "#c0007a", "#ea0c5f", "#ff5341", "#ff8320", "#f6ba00"]
    },
    {
      url: "https://www.linkedin.com/in/ray1337",
      title: "LinkedIn",
      colorArray: ["#0077b5"]
    },
    {
      url: "https://youtube.com/ray1337",
      title: "YouTube",
      colorArray: ["#ff0000", "#282828"]
    },
    {
      url: "https://dsc.bio/13373333",
      title: "Discord",
      colorArray: ["#5866EF", "#7289DA"]
    },
    {
      url: "https://paypal.me/ray0001",
      title: "PayPal",
      colorArray: ["#003087", "#009cde"]
    },
    {
      url: "https://monkeytype.com/profile/u3IXbBVc81Rit6bbrdHHykm7XLE3",
      title: "Monkeytype",
      colorArray: ["#333436", "#e2b615"]
    },
    {
      url: "https://crowdin.com/profile/ray1337",
      title: "Crowdin",
      colorArray: ["#aad23b", "#fdb714"]
    },
    {
      url: "https://github.com/ray-1337",
      title: "GitHub",
      colorArray: ["#7c7c7c", "#121112"]
    },
    {
      url: "https://www.roblox.com/users/3659215527/profile",
      title: "ROBLOX",
      colorArray: ["#e3241c"]
    },
    {
      url: "https://open.spotify.com/artist/70AzjYUmP524pQbJXWWJoa",
      title: "Spotify",
      colorArray: ["#1db954", "#191414"]
    },
    {
      url: "https://soundcloud.com/1337-3333",
      title: "SoundCloud",
      colorArray: ["#ff9533", "#ff7f34", "#fe6d35", "#ff5836", "#ff4137"]
    },
    {
      url: "https://twitter.com/ray__1337",
      title: "Twitter",
      colorArray: ["#0ff", "#00efff", "#00deff", "#00cbff", "#00b8ff", "#00a3ff"]
    },
    {
      url: "https://bacotnihurl.bandcamp.com/",
      title: "Bandcamp",
      colorArray: ["#00a8b4", "#629aa9"]
    },
    {
      url: "https://www.reddit.com/user/ray-1337",
      title: "Reddit",
      colorArray: ["#ff6314", "#ff5700", "#369", "#5296dd"]
    },
    {
      url: "https://unsplash.com/@lostfaith/",
      title: "Unsplash",
      colorArray: ["#121112", "#FFFFFF"]
    },
    {
      url: "https://www.musixmatch.com/profile/3vUCAOhODWVY7oPWb_6Sw_GlOvhtCzZ2bMQAAqRVj71ldCLrqYUSOGkcRmF2cM6eqO3EmxQZzKpTxWGt45a3Mltz2s-I-iEgL3bjTctPRLf1SjWsIAGFiFaBt1GVB7qMZof3x3d1vS81K06c6DEKwJQ8uH0",
      title: "Musixmatch",
      colorArray: ["#ff6050", "#ff0e83", "#d54262"]
    },
    {
      url: "https://10fastfingers.com/user/1967566/",
      title: "10FastFingers",
      colorArray: ["#aad23b", "#fdb714"]
    },
    {
      url: "https://genius.com/ray_1337",
      title: "Genius",
      colorArray: ["#121112", "#ffff64"]
    },
    {
      url: "https://e926.net/users/1125753",
      title: "E926/E621",
      colorArray: ["#144058"]
    }
  ];
};