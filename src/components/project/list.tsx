// icon
import { siAbletonlive, siNextdotjs, siTypescript, siPytorch, siSolid, siJavascript, siDiscord, siMongodb, siRedis, siObsstudio, siYoutube, siFfmpeg, siTensorflow, siExpress, siPostgresql, siSoundcloud, siNodedotjs } from "simple-icons/icons";
import { shuffleArray } from "../Utility";

siNextdotjs.hex = "121112";

// images
const _projImg_ire = "/assets/proj/ire.webp";
const _projImg_self = "/assets/proj/1337.webp";
const _projImg_cdev = "/assets/proj/cdev.webp";
const _projImg_blobproj = "/assets/proj/blobproj.webp";
const _projImg_gmdibot = "/assets/proj/gmdibot.webp";
const _projImg_antinsfw = "/assets/proj/antinsfw.webp";
const _projImg_catbox = "/assets/proj/catbox.webp";
const _projImg_eom = "/assets/proj/eom.webp";
const _projImg_dbm = "/assets/proj/dbm.webp";
const _projImg_phash = "/assets/proj/phash.webp";
const _projImg_mhsvsf = "/assets/proj/m_h_svsf.webp";
const _projImg_dvm = "/assets/proj/dvm.webp";
const _projImg_cdevDash = "/assets/proj/cdevdash.webp";
const _projImg_cupcakke = "/assets/proj/cupcakke.webp";
const _projImg_itchi = "/assets/proj/itchi.webp";

const cupcakkeVideoExample = ["obiZGmIrcto", "mh9QhWIGsEQ", "wZ2M9IIYIpk"];

const projectList = [
  {
    title: "cDev: Dash",
    image: _projImg_cdevDash,
    url: "https://dash.cdev.shop",
    description: "A Discord bot dashboard for cDev (Community Development), created with Next.js from scratch.",
    tools: [siNextdotjs],
    projectId: "cdev-dash"
  },
  {
    title: "ItchiHuskii's Personal Website",
    image: _projImg_itchi,
    description: "Bestie's personal website.",
    tools: [siTypescript, siNextdotjs],
    projectId: "itchi",
    resigned: 4
  },
  {
    title: "13373333.one",
    image: _projImg_self,
    url: "https://github.com/ray-1337/solid-13373333-v2",
    description: "An open-source repository of this website.",
    tools: [siTypescript, siExpress],
    projectId: "this"
  },
  {
    title: "Discord Voice Message",
    image: _projImg_dvm,
    url: "https://github.com/ray-1337/discord-voice-message",
    description: "Transform .mp3 file to Discord voice message.",
    tools: [siJavascript, siNodedotjs],
    projectId: "dvm"
  },
  {
    title: "Perceptual Hash",
    image: _projImg_phash,
    url: "https://npmjs.com/package/perceptual-hash",
    description: "A simple way to generate content-based image hashes on Node.js, also used on Anti-NSFW.",
    tools: [siTypescript, siNodedotjs],
    projectId: "perceptual_hash"
  },
  {
    title: "CupcakKe",
    image: _projImg_cupcakke,
    url: "https://www.youtube.com/playlist?list=PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW",
    description: "A parodies of CupcakKe, remixed by me.",
    tools: [siYoutube, siAbletonlive, siSoundcloud],
    projectId: "cupcakke",
    html: `
    This is my side project, is just creating a song with CupcakKe vocal chops.
    This project is absolutely inappropriate to many viewers, yet focused just for fun.

    There is nothing I can explain, but I made things similar like this, for example:
    <iframe src="https://www.youtube-nocookie.com/embed/${cupcakkeVideoExample[Math.floor(Math.random() * cupcakkeVideoExample.length)]}"></iframe>
    `
  },
  {
    title: "Catbox",
    image: _projImg_catbox,
    url: "https://13373333.one/catbox",
    description: "A personal/private file storage. Powered by BunnyCDN.",
    tools: [siTypescript, siSolid],
    projectId: "catbox",
    resigned: 1
  },
  {
    title: "Community Development",
    image: _projImg_cdev,
    url: "https://cdev.shop",
    description: "My first remotely startup project to advance limitations around Discord and FiveM communities.",
    tools: [siTypescript, siRedis, siNextdotjs, siMongodb, siDiscord, siPostgresql],
    resigned: 0,
    projectId: "cdev"
  },
  {
    title: "Erase Our Memories",
    image: _projImg_eom,
    url: "https://github.com/ray-1337/erase-our-memories/",
    description: "A side-project/script to bulk-delete your messages from your exes contact.",
    tools: [siDiscord, siJavascript],
    projectId: "eom"
  },
  {
    title: "IRE (03.12.2021)",
    image: _projImg_ire,
    url: "https://soundcloud.com/1337-3333/sets/ire",
    description: "A way to distract me from self-harm, but it didn't help.",
    tools: [siSoundcloud],
    resigned: 1,
    projectId: "ire"
  },
  {
    title: "Blob Project",
    image: _projImg_blobproj,
    url: "https://blob-project.com",
    description: "Creating a YouTube programming content with no retakes, and no fillers.",
    tools: [siObsstudio, siDiscord, siYoutube],
    projectId: "blobproj"
  },
  {
    title: "Anti-NSFW",
    image: _projImg_antinsfw,
    url: "https://docs.cdev.shop/anti-nsfw/grand-mirage",
    description: "A Discord bot that can detect NSFW content through machine learning.",
    tools: [siTypescript, siRedis, siMongodb, siDiscord, siTensorflow, siExpress],
    projectId: "anti-nsfw"
  },
  {
    title: "GMDI Discord Bot",
    image: _projImg_gmdibot,
    url: "https://github.com/ray-1337/gmdi-private-bot/",
    description: "A Discord bot that is made exclusively for Geometry Dash Indonesia.",
    tools: [siTypescript, siDiscord, siExpress],
    resigned: 0,
    projectId: "gmdibot"
  },
  {
    title: "Discord & YouTube bot music",
    image: _projImg_dbm,
    url: "https://github.com/ray-1337/discord-music-bot/",
    description: "Newest project to solve concerns around Discord music bot era by giving it open source.",
    tools: [siTypescript, siDiscord, siYoutube, siFfmpeg],
    resigned: 0,
    projectId: "dbm"
  },
  {
    title: "Mountain & Hung / so-vits-svc-4.0",
    image: _projImg_mhsvsf,
    url: "https://huggingface.co/goodfaith/so-vits-svc-4.0-mountain-hung/",
    description: "A voice AI of Mountain & Hung voice actors, trained with 200 epochs.",
    tools: [siPytorch, siTensorflow],
    resigned: 0,
    projectId: "mhsvs"
  }
];

const finalShuffled = shuffleArray(projectList);

export default finalShuffled;