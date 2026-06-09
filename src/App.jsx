import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Calendar,
  CheckCircle2,
  CircleDot,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Home,
  Image as ImageIcon,
  Mail,
  Play,
  Send,
  Users,
  Video,
  Wrench,
} from "lucide-react";
import { projects, siteSettings } from "./data/projects.js";
import { teamMembers } from "./data/team.js";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 19.4c-4 1.2-4-2-5.6-2.4" />
      <path d="M15 22v-3.4a3 3 0 0 0-.8-2.4c2.7-.3 5.6-1.4 5.6-6A4.7 4.7 0 0 0 18.5 7a4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C6.8 3.5 5.8 3.8 5.8 3.8A4.3 4.3 0 0 0 5.7 7a4.7 4.7 0 0 0-1.3 3.2c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.4V22" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const navItems = [
  { key: "home", label: "Home", href: "#home", icon: Home },
  { key: "projects", label: "Projects", href: "#projects", icon: Folder },
  { key: "team", label: "The Team", href: "#team", icon: Users },
  { key: "contact", label: "Contact Us", href: "#contact", icon: Mail },
];

function getRouteFromHash() {
  return window.location.hash.replace("#", "") || "home";
}

function formatDate(value) {
  if (!value) return "Not dated yet";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function statusLabel(status) {
  return status === "finished" ? "Finished" : "Ongoing";
}

function useHashRoute() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function useHubIndicator(ref, activeKey) {
  useEffect(() => {
    const hub = ref.current;
    if (!hub) return undefined;

    const items = Array.from(hub.querySelectorAll("[data-hub-key]"));
    let resizeObserver;

    const activeItem = () =>
      hub.querySelector(`[data-hub-key="${activeKey}"]`) || items[0];

    const moveTo = (item) => {
      if (!item) return;
      const hubRect = hub.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      hub.style.setProperty("--hub-x", `${itemRect.left - hubRect.left}px`);
      hub.style.setProperty("--hub-y", `${itemRect.top - hubRect.top}px`);
      hub.style.setProperty("--hub-w", `${itemRect.width}px`);
      hub.style.setProperty("--hub-h", `${itemRect.height}px`);
      hub.style.setProperty(
        "--hub-color",
        item.style.getPropertyValue("--hub-accent") || "var(--uc-primary)",
      );
    };

    const onLeave = () => moveTo(activeItem());
    const onResize = () => moveTo(activeItem());

    items.forEach((item) => {
      item.addEventListener("pointerenter", () => moveTo(item));
      item.addEventListener("focus", () => moveTo(item));
    });
    hub.addEventListener("pointerleave", onLeave);
    hub.addEventListener("focusout", (event) => {
      if (!hub.contains(event.relatedTarget)) onLeave();
    });
    window.addEventListener("resize", onResize);

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(hub);
      items.forEach((item) => resizeObserver.observe(item));
    }

    requestAnimationFrame(() => moveTo(activeItem()));

    return () => {
      hub.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
    };
  }, [activeKey, ref]);
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function HubNav({ items, activeKey, className = "", label = "Primary" }) {
  const ref = useRef(null);
  useHubIndicator(ref, activeKey);

  return (
    <nav className={`hub ${className}`} aria-label={label} data-hub ref={ref}>
      <span className="hub__indicator" aria-hidden="true" />
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.key === activeKey;
        return (
          <a
            className={`hub__item ${active ? "is-active" : ""}`}
            data-hub-key={item.key}
            href={item.href}
            key={item.key}
            aria-current={active ? "page" : undefined}
            style={{ "--hub-accent": item.accent || "var(--uc-primary)" }}
          >
            {Icon ? <Icon aria-hidden="true" size={17} strokeWidth={2} /> : null}
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function TopNavigation({ activeKey }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="A&A Projects home">
        <span className="brand__mark">A&A</span>
        <span className="brand__text">Projects</span>
      </a>
      <HubNav items={navItems} activeKey={activeKey} />
      <a className="header-action" href="#project-rover-v2">
        <Code2 size={17} aria-hidden="true" />
        <span>Latest build</span>
      </a>
    </header>
  );
}

function StatusPill({ status }) {
  return (
    <span className={`status-pill status-pill--${status}`}>
      <CircleDot size={14} aria-hidden="true" />
      {statusLabel(status)}
    </span>
  );
}

function ProgressBar({ value, label = "Progress" }) {
  return (
    <div className="progress" aria-label={`${label}: ${value}%`}>
      <div className="progress__meta">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <span className="progress__track">
        <span className="progress__fill" style={{ "--progress": `${value}%` }} />
      </span>
    </div>
  );
}

function App() {
  const route = useHashRoute();
  const [activeSection, setActiveSection] = useState("home");
  const activeProject = projects.find((project) => route === `project-${project.id}`);
  const navActiveKey = activeProject ? "projects" : activeSection;

  return (
    <div className="app-shell">
      <TopNavigation activeKey={navActiveKey} />
      {activeProject ? (
        <ProjectDetail project={activeProject} />
      ) : (
        <MainPage route={route} setActiveSection={setActiveSection} />
      )}
    </div>
  );
}

function MainPage({ route, setActiveSection }) {
  useRevealOnScroll();

  useEffect(() => {
    const sections = ["home", "projects", "team", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -58% 0px", threshold: [0.18, 0.28, 0.42] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    const id = navItems.some((item) => item.key === route) ? route : "home";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [route]);

  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}

function HeroSection() {
  const featured =
    projects.find((project) => project.id === siteSettings.featuredProjectId) ||
    projects.find((project) => project.featured) ||
    projects[0];

  return (
    <section className="hero section-anchor" id="home">
      <div className="hero__image" aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content" data-reveal>
        <div className="hero__copy">
          <h1>{siteSettings.title}</h1>
          <p className="hero__tagline">{siteSettings.tagline}</p>
          <p>{siteSettings.intro}</p>
          <div className="hero__actions">
            <a className="button button--primary" href={`#project-${featured.id}`}>
              View project
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href="#projects">
              Browse projects
            </a>
          </div>
          <p className="terminal-note">
            <Code2 size={18} aria-hidden="true" />
            Add media links in the data file
          </p>
        </div>
        <FeaturedProject project={featured} />
      </div>
    </section>
  );
}

function FeaturedProject({ project }) {
  return (
    <article className="featured-card">
      <div className="panel-heading">
        <span>Featured project</span>
        <StatusPill status={project.status} />
      </div>
      <img src={project.image} alt="" />
      <div className="featured-card__body">
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <a className="button button--wide" href={`#project-${project.id}`}>
          View project
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function ProjectsSection() {
  const ongoing = projects.filter((project) => project.status === "ongoing");
  const finished = projects.filter((project) => project.status === "finished");

  return (
    <section className="content-section section-anchor" id="projects" data-reveal>
      <div className="section-heading">
        <div>
          <h2>
            <Folder size={26} aria-hidden="true" />
            Projects
          </h2>
          <p>Split by status so the current work stays easy to find.</p>
        </div>
        <a className="button button--secondary" href="#project-rover-v2">
          Open dummy template
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="project-board">
        <ProjectColumn title="Ongoing" projects={ongoing} tone="lime" />
        <ProjectColumn title="Finished" projects={finished} tone="amber" />
      </div>
    </section>
  );
}

function ProjectColumn({ title, projects: columnProjects, tone }) {
  return (
    <div className={`project-column project-column--${tone}`}>
      <h3>{title}</h3>
      <div className="project-list">
        {columnProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <img src={project.image} alt="" />
      <div className="project-card__content">
        <div>
          <h4>{project.title}</h4>
          <p>{project.summary}</p>
        </div>
        <div className="project-card__footer">
          <StatusPill status={project.status} />
          <a aria-label={`View ${project.title}`} href={`#project-${project.id}`}>
            <ArrowRight size={19} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function TeamSection() {
  return (
    <section className="content-section section-anchor" id="team" data-reveal>
      <div className="section-heading">
        <div>
          <h2>
            <Users size={26} aria-hidden="true" />
            The Team
          </h2>
          <p>Placeholder profiles for now. Replace links and bios when ready.</p>
        </div>
      </div>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <article className="team-card" key={member.name}>
            <div className="team-card__avatar" aria-hidden="true">
              {member.avatarInitials}
            </div>
            <div className="team-card__body">
              <h3>{member.name}</h3>
              <p className="team-card__role">{member.role}</p>
              <p>{member.summary}</p>
              <div className="social-row" aria-label={`${member.name} links`}>
                <a href={member.links.linkedin} aria-label={`${member.name} LinkedIn`}>
                  <LinkedinIcon width={18} height={18} aria-hidden="true" />
                </a>
                <a href={member.links.github} aria-label={`${member.name} GitHub`}>
                  <GithubIcon width={18} height={18} aria-hidden="true" />
                </a>
                <a href={member.links.email} aria-label={`Email ${member.name}`}>
                  <Mail size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`A&A Projects message from ${form.name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:ammar@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section section-anchor" id="contact" data-reveal>
      <div className="contact-section__copy">
        <Send size={28} aria-hidden="true" />
        <div>
          <h2>Contact Us</h2>
          <p>Questions, ideas, or collaboration? This simple form opens an email draft.</p>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label htmlFor="contact-name">
          <span>Your name</span>
          <input
            id="contact-name"
            name="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            autoComplete="name"
          />
        </label>
        <label htmlFor="contact-email">
          <span>Your email</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            autoComplete="email"
          />
        </label>
        <label className="contact-form__message" htmlFor="contact-message">
          <span>Your message</span>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            rows={3}
          />
        </label>
        <button className="button button--primary" type="submit">
          Send Message
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}

function ProjectDetail({ project }) {
  const initialStepId =
    project.steps.find((step) => step.id === project.currentStepId)?.id ||
    project.steps[0]?.id;
  const [selectedStepId, setSelectedStepId] = useState(initialStepId);
  const selectedIndex = Math.max(
    0,
    project.steps.findIndex((step) => step.id === selectedStepId),
  );
  const [windowStart, setWindowStart] = useState(Math.floor(selectedIndex / 5) * 5);
  const selectedStep = project.steps[selectedIndex] || project.steps[0];
  const currentStep = project.steps.find((step) => step.id === project.currentStepId);

  useRevealOnScroll();

  useEffect(() => {
    setSelectedStepId(initialStepId);
    setWindowStart(Math.floor(Math.max(0, project.steps.findIndex((step) => step.id === initialStepId)) / 5) * 5);
  }, [initialStepId, project.id, project.steps]);

  const showPrev = windowStart > 0;
  const showNext = windowStart + 5 < project.steps.length;
  const visibleSteps = project.steps.slice(windowStart, windowStart + 5);

  const selectWindow = (nextStart) => {
    const boundedStart = Math.max(0, Math.min(nextStart, project.steps.length - 1));
    setWindowStart(boundedStart);
    setSelectedStepId(project.steps[boundedStart].id);
  };

  return (
    <main className="project-detail">
      <section className="detail-hero" data-reveal>
        <a className="back-link" href="#projects">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to projects
        </a>
        <div className="detail-hero__grid">
          <img className="detail-hero__image" src={project.image} alt="" />
          <div className="detail-hero__copy">
            <StatusPill status={project.status} />
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <aside className="current-step-panel">
            <span>Current step</span>
            <h2>{currentStep?.label || "Step 1"}</h2>
            <p>{currentStep?.title || "Update currentStepId in the data file."}</p>
            <ProgressBar value={project.progress} />
          </aside>
        </div>
      </section>

      <section className="step-nav-wrap" aria-label={`${project.title} steps`} data-reveal>
        <button
          className="step-arrow"
          type="button"
          onClick={() => selectWindow(windowStart - 5)}
          disabled={!showPrev}
          aria-label="Previous 5 steps"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="step-nav" role="tablist" aria-label="Project steps">
          {visibleSteps.map((step) => (
            <button
              className={`step-tab ${step.id === selectedStep.id ? "is-active" : ""}`}
              key={step.id}
              type="button"
              role="tab"
              aria-selected={step.id === selectedStep.id}
              onClick={() => setSelectedStepId(step.id)}
            >
              {step.label}
            </button>
          ))}
        </div>
        <button
          className="step-arrow step-arrow--next"
          type="button"
          onClick={() => selectWindow(windowStart + 5)}
          disabled={!showNext}
          aria-label="Next 5 steps"
        >
          <span>Next 5</span>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </section>

      <section className="detail-layout" data-reveal>
        <div className="build-log">
          <div className="panel-heading">
            <span>
              <FileText size={20} aria-hidden="true" />
              Build log
            </span>
            <span>{formatDate(selectedStep.date)}</span>
          </div>
          <h2>{selectedStep.title}</h2>
          {selectedStep.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Checklist items={selectedStep.checklist} />
        </div>

        <div className="media-stack">
          <MediaGallery photos={selectedStep.photos} />
          <VideoPanel videos={selectedStep.videos} />
        </div>

        <ProjectSidebar project={project} />
      </section>
    </main>
  );
}

function Checklist({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <CheckCircle2 size={17} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MediaGallery({ photos }) {
  return (
    <section className="media-panel">
      <div className="panel-heading">
        <span>
          <ImageIcon size={20} aria-hidden="true" />
          Photos
        </span>
        <span>{photos?.length || 0} files</span>
      </div>
      {photos?.length ? (
        <div className="gallery-grid">
          {photos.map((photo) => (
            <figure key={`${photo.src}-${photo.caption || photo.alt}`}>
              <img src={photo.src} alt={photo.alt} />
              {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : (
        <EmptyMedia icon={ImageIcon} text="Add local photos or image URLs in src/data/projects.js." />
      )}
    </section>
  );
}

function VideoPanel({ videos }) {
  return (
    <section className="media-panel">
      <div className="panel-heading">
        <span>
          <Video size={20} aria-hidden="true" />
          Video
        </span>
        <span>{videos?.length || 0} links</span>
      </div>
      {videos?.length ? (
        <div className="video-list">
          {videos.map((video) => (
            <VideoFrame video={video} key={video.title || video.url || video.note} />
          ))}
        </div>
      ) : (
        <EmptyMedia icon={Play} text="Add a YouTube, Vimeo, or local video path in src/data/projects.js." />
      )}
    </section>
  );
}

function EmptyMedia({ icon: Icon, text }) {
  return (
    <div className="empty-media">
      <Icon size={34} aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}

function getEmbedUrl(url) {
  if (!url) return "";
  if (/\.(mp4|webm|ogg)$/i.test(url)) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }
    return url;
  } catch {
    return url;
  }
}

function VideoFrame({ video }) {
  const src = getEmbedUrl(video.url);
  const isLocalVideo = /\.(mp4|webm|ogg)$/i.test(src);

  if (!src) {
    return (
      <div className="empty-media empty-media--video">
        <Play size={38} aria-hidden="true" />
        <strong>{video.title}</strong>
        <p>{video.note || "Add a video link in the data file."}</p>
      </div>
    );
  }

  return (
    <div className="video-frame">
      {isLocalVideo ? (
        <video src={src} controls preload="metadata" />
      ) : (
        <iframe
          src={src}
          title={video.title || "Project video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}

function ProjectSidebar({ project }) {
  const links = [
    { label: "Repository", href: project.links.repository, icon: GithubIcon },
    { label: "Demo", href: project.links.demo, icon: ExternalLink },
    { label: "Download", href: project.links.download, icon: Download },
  ].filter((link) => link.href);

  return (
    <aside className="project-sidebar">
      <ProgressBar value={project.progress} />
      <div className="sidebar-block">
        <h3>
          <Wrench size={18} aria-hidden="true" />
          Tags
        </h3>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="sidebar-block">
        <h3>
          <Box size={18} aria-hidden="true" />
          Resources
        </h3>
        {project.resources.length ? (
          <ul className="resource-list">
            {project.resources.map((resource) => (
              <li key={resource.label}>
                <span>{resource.label}</span>
                <small>{resource.value}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Add CAD, BOM, or download links when ready.</p>
        )}
      </div>
      {links.length ? (
        <div className="sidebar-block">
          <h3>
            <ExternalLink size={18} aria-hidden="true" />
            Links
          </h3>
          <div className="link-list">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.label} href={link.href}>
                  <Icon size={18} aria-hidden="true" />
                  {link.label}
                  <ExternalLink className="link-list__external" size={15} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="sidebar-block">
        <h3>
          <Calendar size={18} aria-hidden="true" />
          Last update
        </h3>
        <p>{formatDate(project.updatedAt)}</p>
      </div>
      <p className="terminal-note terminal-note--full">
        <Code2 size={18} aria-hidden="true" />
        Update this project in src/data/projects.js
      </p>
    </aside>
  );
}

export default App;
