// icon
import { siAbletonlive, siNextdotjs, siAstro, siValorant, siTypescript, siSony, siPytorch, siSolid, siJavascript, siDiscord, siMongodb, siRedis, siObsstudio, siYoutube, siFfmpeg, siTensorflow, siExpress, siPostgresql, siSoundcloud, siNodedotjs } from "simple-icons/icons";
import { ProjectConsonant, IntermittentType } from "./typing";

// turn to white
for (const icon of [siSony, siNextdotjs]) {
  icon.hex = "121112";
};

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
const _projImg_yde = "/assets/proj/yde.webp";
const _projImg_valoedit = "/assets/proj/valoedit.animated.webp";

const website: ProjectConsonant = {
  name: "Website",
  projects: [
    {
      title: "Personal Project Authorization",
      image: "/assets/proj/project-auth.webp",
      description: "Accessing private/in-development personal project by through Discord or Telegram authorization, built with Astro.",
      tools: [siAstro, siTypescript],
      url: "https://project-authorization.13373333.one"
    },
    {
      title: "cDev: Dash",
      image: _projImg_cdevDash,
      url: "https://dash.cdev.shop/demo",
      description: "A Discord bot dashboard for cDev (Community Development), created with Next.js from scratch.",
      tools: [siNextdotjs],
    },
    {
      title: "ItchiHuskii's Personal Website",
      image: _projImg_itchi,
      description: "Best friend's personal website.",
      tools: [siTypescript, siNextdotjs],
      intermittentType: IntermittentType["Under Construction"]
    },
    {
      title: "13373333.one",
      image: _projImg_self,
      url: "https://github.com/ray-1337/solid-13373333-v2",
      description: "An open-source repository of this website.",
      tools: [siTypescript, siExpress],
    },
    {
      title: "Community Development",
      image: _projImg_cdev,
      url: "https://cdev.shop",
      description: "My first remotely startup project to advance limitations around Discord and FiveM communities.",
      tools: [siTypescript, siRedis, siNextdotjs, siMongodb, siDiscord, siPostgresql],
    },
  ]
};

const app: ProjectConsonant = {
  name: "Application",
  projects: [
    {
      title: "YouTube Discord Embed",
      image: _projImg_yde,
      url: "https://github.com/ray-1337/youtube-discord-embed",
      description: "Embed YouTube video on Discord, inspired by FixTweet.",
      tools: [siTypescript, siDiscord, siYoutube, siNextdotjs]
    },
    {
      title: "Discord Voice Message",
      image: _projImg_dvm,
      url: "https://github.com/ray-1337/discord-voice-message",
      description: "Transform .mp3 file to Discord voice message.",
      tools: [siJavascript, siNodedotjs],
    },
    {
      title: "Perceptual Hash",
      image: _projImg_phash,
      url: "https://npmjs.com/package/perceptual-hash",
      description: "A simple way to generate content-based image hashes on Node.js, also used on Anti-NSFW.",
      tools: [siTypescript, siNodedotjs],
    },
    {
      title: "Catbox",
      image: _projImg_catbox,
      url: "https://13373333.one/catbox",
      description: "A personal/private file storage. Powered by BunnyCDN.",
      tools: [siTypescript, siSolid],
      intermittentType: IntermittentType["Discontinued"]
    },
    {
      title: "Erase Our Memories",
      image: _projImg_eom,
      url: "https://github.com/ray-1337/erase-our-memories/",
      description: "A side-project/script to bulk-delete your messages from your exes contact.",
      tools: [siDiscord, siJavascript],
    },
    {
      title: "Anti-NSFW",
      image: _projImg_antinsfw,
      url: "https://docs.cdev.shop/anti-nsfw/grand-mirage",
      description: "A Discord bot that can detect NSFW content through machine learning.",
      tools: [siTypescript, siRedis, siMongodb, siDiscord, siTensorflow, siExpress],
    },
    {
      title: "GMDI Discord Bot",
      image: _projImg_gmdibot,
      url: "https://github.com/ray-1337/gmdi-private-bot/",
      description: "A Discord bot that is made exclusively for Geometry Dash Indonesia.",
      tools: [siTypescript, siDiscord, siExpress]
    },
    {
      title: "Discord & YouTube bot music",
      image: _projImg_dbm,
      url: "https://github.com/ray-1337/discord-music-bot/",
      description: "My first Discord Bot music, made from scratch, aiming for simplicity.",
      tools: [siTypescript, siDiscord, siYoutube, siFfmpeg]
    },
    {
      title: "Mountain & Hung / so-vits-svc-4.0",
      image: _projImg_mhsvsf,
      url: "https://huggingface.co/goodfaith/so-vits-svc-4.0-mountain-hung/",
      description: "A voice AI of Mountain & Hung voice actors, trained with 200 epochs.",
      tools: [siPytorch, siTensorflow]
    }
  ]
};

const entertainment: ProjectConsonant = {
  name: "Entertainment",
  projects: [
    {
      title: "CupcakKe",
      image: _projImg_cupcakke,
      url: "https://www.youtube.com/playlist?list=PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW",
      description: "A parodies of CupcakKe, remixed by me.",
      tools: [siYoutube, siAbletonlive, siSoundcloud]
    },
    {
      title: "VALORANT Funny Moment Edits",
      image: _projImg_valoedit,
      url: "https://www.youtube.com/playlist?list=PLGd05QsjGyxXeT6iFz9w4QaJA2d8L_YyF",
      description: "A compilation of VALORANT funny moments edit. Inspired by Jolidofc, edited on Sony Vegas.",
      tools: [siYoutube, siValorant, siSony]
    },
    {
      title: "IRE (03.12.2021)",
      image: _projImg_ire,
      url: "https://soundcloud.com/1337-3333/sets/ire",
      description: "A way to distract me from self-harm, but it didn't help.",
      tools: [siSoundcloud],
      intermittentType: IntermittentType["Abandoned"]
    },
    {
      title: "Blob Project",
      image: _projImg_blobproj,
      url: "https://youtube.com/@blobproj",
      description: "Creating a YouTube programming content with no retakes, and no fillers.",
      tools: [siObsstudio, siDiscord, siYoutube]
    },
  ]
};

export default [
  website, app, entertainment
];