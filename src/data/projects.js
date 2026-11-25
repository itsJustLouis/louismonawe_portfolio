// ─────────────────────────────────────────────────────────────────────────────
// YOUR WORK ARCHIVE
// Every project is one entry: a video plus a few lines about it. That's it.
//
// TO ADD A PROJECT
//   1. Drop the video into the  public/videos/  folder (MP4, ideally under 50MB).
//   2. Copy any entry below, paste it where you want it in the list, and fill it in.
//   3. Set  video: "your-file-name.mp4"  (just the file name).
//
// FIELDS
//   title        Project name.                                   (required)
//   description  One to three sentences: what it is, what you did. (required)
//   year         e.g. "2024" or "2025 – present".                  (optional)
//   role         What you did on it.                              (optional)
//   tags         Tools or skills, shown as small labels.           (optional)
//   video        File name in public/videos/, or null if you don't have one yet
//                (the thumbnail then says "Video coming soon").
//   images       Optional screenshots instead of a video: a list of
//                { src, alt }. The first one is the thumbnail; selecting it opens
//                a gallery. Put the files in src/images/projects/ and import them.
//                If a project has both, the video wins.
//   link         A live site or repo, e.g. "https://gaiclab.co.za/". Or null.
//   featured     true = also shown on the homepage.
//
// The list order is the order on the site, so put your strongest work first.
// ─────────────────────────────────────────────────────────────────────────────

// Older recordings that already live in src/videos are imported like this.
// New videos don't need an import: put them in public/videos and use the file name.
import recipeVideo from "../videos/Recipe.mp4";
import routesVideo from "../videos/Routes.mp4";
import handTrackingVideo from "../videos/Crit3Video.mp4";
import photographyVideo from "../videos/magaza.mp4";
import fakugesiVideo from "../videos/Fakugesi.mp4";
import gaiclabWalkthroughVideo from "../videos/GaicLab_Walkthrough.mp4";
import NutrixPromoVideo from "../videos/NutrixEats_Advertisement.mp4";
import NutrixWalkthroughVideo from "../videos/NutrixWalkthrough.mp4";
import AbsaCryptoHubVideo from "../videos/absacrypto.mp4";
import translanguagingVideo from "../videos/Translademia_Walkthrough.mp4";
import WashBookVideo from "../videos/Washbook_Walkthrough.mp4";

// Screenshots for projects shown as image galleries.
import finlaCover from "../images/projects/finla-cover.webp";
import finlaBrand from "../images/projects/finla-brand.webp";
import finlaStages from "../images/projects/finla-stages.webp";
import digraCover from "../images/projects/digra-cover.webp";
import digraStart from "../images/projects/digra-start.webp";
import digraEvents from "../images/projects/digra-events.webp";

const projects = [
  {
    title: "Car Wash-Book",
    description: "Car Wash-Book is a car wash booking platform for South Africa, which has 3 platforms, Customer Dashboard, Merchant Dashboard and Admin Dashboard. It lets you book a wash in under a minute, with no queues and no unanswered orders. Drivers find a nearby wash and see the exact price for their Vehicle before they commit. They can only pick a time when a bay is actually free, and they pay in person when they arrive. Car washes get a dashboard that turns bookings into a live schedule. They approve, reschedule or decline requests from their phone and manage their services, prices, hours and photos, and any request they leave unanswered expires on its own, so no customer is left waiting. Every business is vetted before it goes live. Ratings run both ways to keep washes reliable and customers honest. It runs on Next.js, TypeScript and Supabase on Vercel.",
    year: "2025 – present",
    role: "Co-Founder, designer and developer",
    tags: ["Next.js", "Supabase", "Figma", "Product strategy", "UX/UI design", "Web development", "Business workflows", "Design systems", "Accessibility"],
    video: WashBookVideo,
    link: null,
    featured: true,
  },
  {
    title: "Finla Group",
    description:
      "Brand identity and website for Finla Group, a firm that gets South African small businesses' books, CIPC and SARS compliance and funding applications in order. I designed the identity from scratch: a sprouting F symbol, a custom wordmark, the colour palette, typography and brand guidelines. Then I designed and built the seven-page website with light and dark modes and an accessible enquiry form, and set up the domain, hosting and business email.",
    year: "2026",
    role: "Brand designer, web designer and developer",
    tags: ["Brand identity", "Logo design", "Brand guidelines", "Web design", "Web development", "Accessibility", "Hosting and email setup"],
    video: null,
    images: [
      { src: finlaCover, alt: "The Finla Group website in dark mode, light mode and on a phone" },
      { src: finlaBrand, alt: "Finla Group brand board: the sprouting F symbol, the green and cream palette, and the Fraunces and Jost typefaces" },
      { src: finlaStages, alt: "The 'Three stages, one team' section of the Finla Group homepage" },
    ],
    link: "https://finlagroup.com",
    featured: true,
  },
  {
    title: "DiGRA South Africa",
    description:
      "The website for DiGRA South Africa, the South African chapter of the Digital Games Research Association. I designed the UI/UX, a bold, game-inspired look with clear paths in for students, researchers and industry, and built the site with Lindokuhle Dlamini: events, news, membership and an admin area the board uses to keep content up to date.",
    year: "2026 – present",
    role: "UI/UX designer and co-developer",
    tags: ["UX/UI design", "Information architecture", "React", "Tailwind CSS", "Content management", "Accessibility"],
    video: null,
    images: [
      { src: digraCover, alt: "The DiGRA South Africa homepage on a laptop and a phone" },
      { src: digraStart, alt: "The 'Start Here' section with paths for students, researchers and industry" },
      { src: digraEvents, alt: "The DiGRA South Africa events page" },
    ],
    link: "https://digrasa.co.za",
    featured: true,
  },
  {
    title: "Nutrix",
    description: "Web applications and business workflows built in Django, from user roles and interface planning to turning business needs into working features.",
    year: "2023 – present",
    role: "Co-Founder and software developer",
    tags: ["React.JS", "Supabase", "SCSS","Python", "Django", "Business workflows"],
    video: NutrixWalkthroughVideo,
    link: null,
    featured: true,
  },
   {
    title: "Nutrix Advert Campaign",
    description: "A marketing campaign for Nutrix, including a series of short videos and social media content. This is just one of them.",
    year: "2023 – present",
    role: "Marketing Lead",
    tags: ["Advertising", "Marketing"],
    video: NutrixPromoVideo,
    link: null,
    featured: true,
  },
  {
    title: "Absa CryptoHub",
    description: "A fintech UX prototype for crypto inside everyday banking. Took first place at the 2024 Absa Design Hackathon.",
    year: "2024",
    role: "UX/UI designer, Strategist and User researcher",
    tags: ["Figma", "Prototyping", "Fintech"],
    video: AbsaCryptoHubVideo,
    link: null,
    featured: true,
  },
  {
    title: "Translanguaging AI",
    description: "An AI-assisted translation tool that helps teachers support learners across South African languages, built on the NLLB translation model.",
    year: "2025 – present",
    role: "Researcher and developer",
    tags: ["Hugging Face", "Transformers", "Artificial Intelligence", "Natural language processing", "Machine learning" , "Model deployment", "Gradio", "NLLB", "EdTech research"],
    video: translanguagingVideo,
    link: null,
    featured: true,
  },
  {
    title: "GAIC Lab website",
    description: "A clean, accessible website for the Games, Artificial Intelligence and Culture (GAIC) Lab at Wits, built to put the lab's research and activities front and centre.",
    year: "2024",
    role: "Full-stack developer",
    tags: ["React.JS", "SCSS", "Accessibility"],
    video: gaiclabWalkthroughVideo,
    link: "https://gaiclab.co.za/",
    featured: false,
  },
  {
    title: "Sim-Life",
    description: "A simulation game about managing a virtual character's life, exploring how to simulate AI-driven behaviour in the spirit of The Sims. I led the project and designed and developed the game in Unity and C#, with Python scripts for the AI behaviour. Contact me for a playable version.",
    year: 2024,
    role: "Project manager, game designer and developer",
    tags: ["Unity", "C#", "Python", "Game design"],
    video: null,
    link: null,
    featured: false,
  },
  {
    title: "Hand-tracking game",
    description: "A game you play with your hands, using computer vision and Google MediaPipe to move objects on screen.",
    year: 2024,
    role: "Project Manager, Game Designer and Developer",
    tags: ["Computer vision", "MediaPipe", "Game design"],
    video: handTrackingVideo,
    link: null,
    featured: true,
  },
  {
    title: "Recipe book web app",
    description: "An interactive recipe book with step-by-step cooking views.",
    year: 2023,
    role: "Full-stack developer",
    tags: ["React", "UI design"],
    video: recipeVideo,
    link: null,
    featured: false,
  },
  {
    title: "Bus routes and ticket booking",
    description: "Route search and ticket booking for commuters.",
    year: 2023,
    role: "Full-stack developer",
    tags: ["Web app", "Booking flow"],
    video: routesVideo,
    link: null,
    featured: false,
  },
  {
    title: "Photography portfolio",
    description: "A portfolio website designed and built for a client photographer.",
    year: 2024,
    role: "Full-stack developer",
    tags: ["Client work", "Web design"],
    video: photographyVideo,
    link: null,
    featured: false,
  },
  {
    title: "Fak'ugesi festival game",
    description: "A game made by a small team for the Fak'ugesi Digital Innovation Festival competition. I was the programmer and project manager.",
    year: 2024,
    role: "Programmer, Project Manager",
    tags: ["Game development", "Team project"],
    video: fakugesiVideo,
    link: null,
    featured: false,
  },
];

// Turns `video` into a playable address. File names point to public/videos/;
// imported videos (from src/videos) are already full addresses.
export function videoSrc(video) {
  if (!video) return null;
  if (video.startsWith("/") || video.startsWith("http") || video.startsWith("data:")) return video;
  return `${process.env.PUBLIC_URL}/videos/${video}`;
}

export default projects;
