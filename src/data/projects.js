export const siteSettings = {
  title: "A&A Projects",
  tagline: "Build logs for code, prints, and prototypes",
  intro:
    "A maker-lab archive by Ammar and Adam. We document ideas, broken versions, current steps, photos, videos, and final builds so each project has a clear history.",
  featuredProjectId: "rover-v2",
};

/*
  How to edit:
  - Add a new object to projects[] for a new project.
  - status accepts "ongoing" or "finished".
  - currentStepId should match one step id.
  - photos can be local files in public/assets, e.g. "/assets/photo.png", or remote URLs.
  - videos can be YouTube/Vimeo page links, embed links, or local MP4/WebM files in public/assets.
*/
export const projects = [
  {
    id: "rover-v2",
    title: "Rover v2",
    status: "ongoing",
    featured: true,
    progress: 28,
    currentStepId: "step-2",
    category: "Programming + 3D Printing",
    summary:
      "A small autonomous rover prototype with a 3D printed chassis, camera module, and ROS-ready control stack.",
    description:
      "Rover v2 is a dummy project template that shows how the project pages work. Replace this with the real project when the template is approved.",
    image: "/assets/rover-v2.png",
    updatedAt: "2026-06-09T13:45:00+03:00",
    tags: ["robotics", "3d-printing", "raspberry-pi", "computer-vision"],
    links: {
      repository: "https://github.com/",
      demo: "",
      download: "",
    },
    resources: [
      { label: "CAD Files", value: "Add STEP/STL link" },
      { label: "BOM", value: "Add CSV or sheet link" },
    ],
    steps: [
      {
        id: "step-1",
        label: "Step 1",
        title: "Project setup and requirements",
        date: "2026-06-01",
        body: [
          "Define the rover goal, rough dimensions, core electronics, and the first mechanical constraints.",
          "The step template supports paragraphs, image galleries, and video embeds. Keep notes short and practical.",
        ],
        checklist: ["Choose chassis size", "List electronics", "Sketch first layout"],
        photos: [
          {
            src: "/assets/rover-chassis.png",
            alt: "3D printed rover chassis components on a workbench",
            caption: "Early chassis layout and electronics stack.",
          },
        ],
        videos: [],
      },
      {
        id: "step-2",
        label: "Step 2",
        title: "Chassis prototype",
        date: "2026-06-05",
        body: [
          "Model and print the first chassis plate. Check wheel clearance, camera placement, and cable paths before committing to the next print.",
          "This is marked as the current step in the project data.",
        ],
        checklist: ["Print base plate", "Test wheel clearance", "Revise camera mount"],
        photos: [
          {
            src: "/assets/rover-chassis.png",
            alt: "Printed rover chassis plates and electronics",
            caption: "First chassis plates ready for fit testing.",
          },
          {
            src: "/assets/rover-v2.png",
            alt: "Rover prototype with camera module",
            caption: "Target look for the assembled prototype.",
          },
        ],
        videos: [
          {
            title: "Assembly video placeholder",
            url: "",
            note: "Add a YouTube, Vimeo, or local MP4/WebM path here.",
          },
        ],
      },
      {
        id: "step-3",
        label: "Step 3",
        title: "Electronics and wiring",
        date: "",
        body: [
          "Mount the controller, power module, sensors, and camera. Route wires so the top shell can be removed without unplugging the whole rover.",
        ],
        checklist: ["Mount controller", "Route power", "Label sensor cables"],
        photos: [],
        videos: [],
      },
      {
        id: "step-4",
        label: "Step 4",
        title: "Control software",
        date: "",
        body: [
          "Create the control loop, test motor calibration, and log basic telemetry. Keep screenshots or demo clips in this step.",
        ],
        checklist: ["Motor calibration", "Telemetry logging", "Manual control test"],
        photos: [],
        videos: [],
      },
      {
        id: "step-5",
        label: "Step 5",
        title: "Obstacle tests",
        date: "",
        body: [
          "Run a simple obstacle course and document failures, battery life, and mechanical weak points.",
        ],
        checklist: ["Build test course", "Record run", "List failures"],
        photos: [],
        videos: [],
      },
      {
        id: "step-6",
        label: "Step 6",
        title: "Second chassis revision",
        date: "",
        body: [
          "Apply the first testing feedback and print a stronger, cleaner second chassis revision.",
        ],
        checklist: ["Revise CAD", "Print v2", "Retest fit"],
        photos: [],
        videos: [],
      },
      {
        id: "final-project",
        label: "Final Project",
        title: "Final build and release",
        date: "",
        body: [
          "Add final photos, a demo video, source links, and files someone else can use to reproduce the project.",
        ],
        checklist: ["Final photos", "Demo video", "Publish files"],
        photos: [],
        videos: [],
      },
    ],
  },
  {
    id: "led-cube",
    title: "LED Cube 8x8x8",
    status: "finished",
    featured: false,
    progress: 100,
    currentStepId: "final-project",
    category: "Electronics",
    summary:
      "A finished dummy project for a programmable LED cube with animations and a printed base.",
    description:
      "Example finished project used to show the finished-project layout.",
    image: "/assets/led-cube.png",
    updatedAt: "2026-05-18T18:30:00+03:00",
    tags: ["arduino", "leds", "soldering", "animation"],
    links: {
      repository: "https://github.com/",
      demo: "",
      download: "",
    },
    resources: [],
    steps: [
      {
        id: "step-1",
        label: "Step 1",
        title: "Planning",
        date: "",
        body: ["Define the cube size, controller, current draw, and base design."],
        checklist: ["Select LEDs", "Estimate power", "Plan base"],
        photos: [
          {
            src: "/assets/led-cube.png",
            alt: "LED cube prototype",
            caption: "Finished cube reference.",
          },
        ],
        videos: [],
      },
      {
        id: "final-project",
        label: "Final Project",
        title: "Final LED cube",
        date: "",
        body: ["Add final photos, firmware notes, and demo clips here."],
        checklist: ["Firmware uploaded", "Base printed", "Demo recorded"],
        photos: [
          {
            src: "/assets/led-cube.png",
            alt: "Finished LED cube",
            caption: "Finished dummy project image.",
          },
        ],
        videos: [],
      },
    ],
  },
  {
    id: "filament-spool-holder",
    title: "Filament Spool Holder",
    status: "finished",
    featured: false,
    progress: 100,
    currentStepId: "final-project",
    category: "3D Printing",
    summary:
      "A compact printed holder concept used as a second finished-project sample.",
    description:
      "Replace this placeholder with a real 3D printing project when ready.",
    image: "/assets/hero-maker-lab.png",
    updatedAt: "2026-04-27T19:00:00+03:00",
    tags: ["3d-printing", "workshop", "utility"],
    links: {
      repository: "",
      demo: "",
      download: "",
    },
    resources: [],
    steps: [
      {
        id: "step-1",
        label: "Step 1",
        title: "Design",
        date: "",
        body: ["Create a simple holder shape and print a small test piece."],
        checklist: ["Measure spool", "Sketch support", "Print test"],
        photos: [
          {
            src: "/assets/hero-maker-lab.png",
            alt: "Maker lab workbench",
            caption: "Placeholder workshop image.",
          },
        ],
        videos: [],
      },
      {
        id: "final-project",
        label: "Final Project",
        title: "Final holder",
        date: "",
        body: ["Add final print settings, STL links, and photos."],
        checklist: ["Upload STL", "Add settings", "Add final photo"],
        photos: [],
        videos: [],
      },
    ],
  },
];
