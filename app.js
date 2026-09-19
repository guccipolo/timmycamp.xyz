(function () {
  const { useMemo, useState } = React;
  const h = React.createElement;

  const caseStudies = [
    {
      id: "set",
      index: "01",
      type: "Distributed commerce",
      title: "Set",
      url: "https://sl0p.exchange",
      urlLabel: "View live product",
      status: "Production system",
      summary:
        "A peer-to-peer fashion marketplace that makes crypto useful for buying and selling real products.",
      problem:
        "Crypto is powerful, but rarely useful in everyday life. Set applies it to a familiar need: buying and selling clothes.",
      role:
        "I designed and built the product, marketplace architecture, commerce workflows, privacy controls, and operational safeguards.",
      outcomes: [
        "Familiar buying and selling backed by non-custodial escrow.",
        "Fast product discovery without compromising settlement integrity.",
        "Private shipping and tracking for physical fulfillment.",
      ],
      flow: [
        ["Experience", "Next.js + React", "Buyer, seller, inventory, order, review, and notification workflows"],
        ["Trust", "Solana + Anchor", "Listings, purchases, escrow, shipment, delivery, refunds, and settlement"],
        ["Projection", "PostgreSQL / Supabase", "Rebuildable search, dashboards, taxonomy, fulfillment, and analytics read model"],
        ["Events", "TypeScript indexer", "WebSocket logs, decoding, backfills, checkpoints, and reconciliation"],
        ["Media", "IPFS", "Immutable product media with gateway fallback and projection repair"],
        ["Operations", "Sentry + Better Stack", "Application telemetry and outside-in critical-path monitoring"],
      ],
      decisions: [
        {
          title: "Solana is authoritative for marketplace and financial state",
          detail:
            "Wallet-owned actions and deterministic PDA accounts make core state independently verifiable. PostgreSQL can improve usability, but it cannot overrule terminal chain state.",
        },
        {
          title: "PostgreSQL is a rebuildable application read model",
          detail:
            "Search, filters, dashboards, shipping, notifications, and reporting need relational queries. The projection is optimized for product experience and recoverable from chain events and durable metadata.",
        },
        {
          title: "Synchronization is redundant and idempotent",
          detail:
            "Action-triggered sync gives immediate feedback; the indexer and periodic reconciliation recover missed events. Expected-state checks, monotonic checkpoints, and terminal-state protection prevent stale updates from moving records backward.",
        },
        {
          title: "Private fulfillment data is encrypted and owner-scoped",
          detail:
            "Wallet-signature authentication establishes identity. Shipping and tracking data remain encrypted at rest, while keyed hashes support duplicate detection without exposing plaintext values.",
        },
      ],
      hardening: [
        "Durable, single-use wallet-auth nonces and HTTP-only sessions",
        "Automated route-policy checks across public, wallet, owner, admin, webhook, and diagnostic APIs",
        "Stale-state protection, tombstones, retryable chain-state errors, and duplicate-event convergence",
        "Encrypted shipping and EasyPost carrier reconciliation",
        "Isolated PostgreSQL integration tests and production preflight checks",
        "RPC provider fallback with method policy, health signals, and request tracing",
      ],
      planned: [
        "Native-SOL V2 escrow with buyer-paid fees and deterministic refund accounting",
        "Cross-chain dispute resolution using LayerZero, Arbitrum, and Kleros",
        "Append-only reputation facts with versioned, role-specific calculations",
        "Future USDC and EVM settlement boundaries",
      ],
      stack: ["Solana", "Anchor", "Rust", "Next.js", "TypeScript", "PostgreSQL", "IPFS", "EasyPost"],
    },
    {
      id: "looklab",
      index: "02",
      type: "Applied AI",
      title: "LookLab",
      url: "https://looklab.emberniche.com",
      urlLabel: "Open LookLab",
      status: "Live experiment",
      summary:
        "Two ways to explore expressive eyewear before purchase: AI try-on and interactive 3D configuration.",
      products: [
        {
          name: "Bhori",
          category: "AI virtual try-on",
          need: "See a frame with your own face, outfit, expression, and setting.",
          experience:
            "Upload a photo, choose frame and lens colors, and generate a personalized visualization.",
          technology: "Flux Kontext · LoRA · Modal · WebSockets",
        },
        {
          name: "INFY",
          category: "3D product configurator",
          need: "Inspect the frame from every angle and compare printable colors.",
          experience:
            "Rotate, zoom, and recolor the 3D frame directly in the browser.",
          technology: "Three.js · GLB · React · WebGL",
        },
      ],
      problem:
        "Product photos cannot show how a frame fits someone’s style or reveal the object from every angle.",
      role:
        "I shaped both products, trained Bhori’s LoRA, deployed its Modal workflow, and built INFY’s browser-based 3D experience.",
      outcomes: [
        "Try-on using real outfits, expressions, and environments.",
        "Better frame and lens color control through targeted training.",
        "Instant 3D inspection of INFY form and colorways.",
      ],
      flow: [
        ["Input", "Browser", "Source image, product selection, frame color, and lens color"],
        ["Preparation", "Client processing", "Image validation and optimization before upload"],
        ["Inference", "Modal", "Flux Kontext workflow with product-specific LoRA"],
        ["Control", "Prompt contract", "Activation phrase plus explicit frame and lens color attributes"],
        ["Progress", "WebSocket events", "Generation phases, latency visibility, success, and failure states"],
        ["Exploration", "Three.js + GLB", "Interactive matte-color preview for the INFY 3D frame"],
      ],
      decisions: [
        {
          title: "Use generative try-on instead of a rigid AR overlay",
          detail:
            "The experiment prioritizes emotional realism and fashion context. Users can work from lifestyle images rather than only a front-facing, calibrated camera pose, trading strict geometry for expressive flexibility.",
        },
        {
          title: "Adapt Flux Kontext with a targeted LoRA",
          detail:
            "The base model preserves scene context while the LoRA introduces product identity. Training the same frame across multiple frame and lens colors gives the model a useful prior for controlling both attributes in one generation.",
        },
        {
          title: "Treat prompting as an interface contract",
          detail:
            "The trained activation phrase and color syntax are product inputs, not incidental prose. The UI translates customer choices into a consistent generation request rather than exposing prompt engineering to the shopper.",
        },
      ],
      hardening: [
        "Durable generation jobs that survive refreshes and disconnects",
        "Typed progress-event contract and explicit retry states",
        "Upload validation, rate limits, content safety, and retention policy",
        "Latency, cold-start, failure-category, and cost-per-generation telemetry",
        "Evaluation across product identity, frame color, lens color, face preservation, and scene preservation",
        "Concurrency controls and capacity planning for inference demand",
      ],
      planned: [
        "Formal evaluation set spanning faces, poses, lighting, occlusion, and color combinations",
        "Generation history with durable job recovery",
        "Controlled comparison between generated try-on and 3D product configuration",
      ],
      stack: ["Flux Kontext", "LoRA", "Modal", "Next.js", "WebSockets", "Three.js", "Supabase"],
    },
  ];

  const roleLenses = [
    {
      id: "architecture",
      label: "Solutions Architecture",
      title: "I turn business needs into systems teams can trust and operate.",
      body:
        "I connect business requirements to secure, reliable systems with clear boundaries, ownership, and tradeoffs.",
      evidence: ["System boundaries and ADRs", "Security and privacy controls", "Reliability and recovery", "Integration and release strategy"],
    },
    {
      id: "ai",
      label: "AI Engineering",
      title: "I use AI where it can remove friction or create a better experience.",
      body:
        "I connect models to useful workflows, measurable quality, manageable cost, and clear human ownership.",
      evidence: ["LoRA training and prompt contracts", "Modal inference workflows", "RAG-assisted triage", "Evaluation, latency, and cost thinking"],
    },
    {
      id: "product",
      label: "Technical Product",
      title: "I keep customer value connected to what the team actually builds.",
      body:
        "I turn ambiguity into priorities, align teams, and keep delivery connected to customer and business value.",
      evidence: ["Discovery to delivery", "Cross-functional facilitation", "Backlog and release ownership", "Customer and business framing"],
    },
  ];

  function App() {
    const [activeCase, setActiveCase] = useState("set");
    const [activeLens, setActiveLens] = useState("architecture");
    const [openPanels, setOpenPanels] = useState({});
    const study = useMemo(() => caseStudies.find((item) => item.id === activeCase), [activeCase]);
    const lens = useMemo(() => roleLenses.find((item) => item.id === activeLens), [activeLens]);

    function togglePanel(key) {
      setOpenPanels((current) => ({ ...current, [key]: !current[key] }));
    }

    return h("main", null, h(Header), h(Hero), h(ProofStrip), h(CaseStudy, { study, activeCase, setActiveCase, openPanels, togglePanel }), h(EnterpriseWork), h(RoleLens, { lens, activeLens, setActiveLens }), h(Approach), h(Contact), h(Footer));
  }

  function Header() {
    return h("header", { className: "site-header" }, h("a", { href: "#top", className: "wordmark" }, "Timmy Campbell"), h("nav", { "aria-label": "Primary navigation" }, h("a", { href: "#work" }, "Work"), h("a", { href: "#enterprise" }, "Team impact"), h("a", { href: "#capabilities" }, "How I help"), h("a", { href: "#contact" }, "Contact")), h("a", { className: "header-cta", href: "mailto:hello@timmycamp.xyz" }, "Let’s talk"));
  }

  function Hero() {
    return h("section", { id: "top", className: "hero" }, h("div", { className: "hero-copy" }, h("p", { className: "kicker" }, "Product · AI · Solutions"), h("h1", null, "I turn difficult problems into useful products."), h("p", { className: "lede" }, "I connect customer needs, technical decisions, and delivery across AI, cloud, and product teams."), h("div", { className: "hero-actions" }, h("a", { className: "button button-dark", href: "#work" }, "See my work"), h("a", { className: "text-link", href: "mailto:hello@timmycamp.xyz" }, "Let’s talk", h("span", null, "↗")))), h("aside", { className: "hero-brief", "aria-label": "How I help" }, h("p", { className: "brief-label" }, "How I help"), h("p", { className: "brief-title" }, "Find the real need. Shape the right solution. Help the team deliver it."), h("dl", null, h("div", null, h("dt", null, "Clarify"), h("dd", null, "What problem are we solving?")), h("div", null, h("dt", null, "Shape"), h("dd", null, "What is the practical path?")), h("div", null, h("dt", null, "Deliver"), h("dd", null, "How do we make it real?")))));
  }

  function ProofStrip() {
    const items = [["Discover", "Start with the actual need"], ["Design", "Make tradeoffs understandable"], ["Deliver", "Connect people, product, and technology"], ["Improve", "Learn from real use and operations"]];
    return h("section", { className: "proof-strip", "aria-label": "Portfolio evidence" }, items.map(([value, label]) => h("div", { key: label }, h("strong", null, value), h("span", null, label))));
  }

  function CaseStudy({ study, activeCase, setActiveCase, openPanels, togglePanel }) {
    return h("section", { id: "work", className: "case-section" },
      h("div", { className: "section-intro" }, h("p", { className: "kicker" }, "Selected work"), h("h2", null, "Products built around real needs."), h("p", null, "Start with the outcome. Open the details for architecture and delivery decisions.")),
      h("div", { className: "case-tabs", role: "tablist", "aria-label": "Select a case study" }, caseStudies.map((item) => h("button", { key: item.id, role: "tab", type: "button", className: activeCase === item.id ? "case-tab active" : "case-tab", onClick: () => setActiveCase(item.id), "aria-selected": activeCase === item.id }, h("span", null, item.index), h("strong", null, item.title), h("small", null, item.type)))),
      h("article", { className: "case-study" },
        h("header", { className: "case-header" }, h("div", null, h("p", { className: "status" }, study.status), h("h3", null, study.title), h("p", { className: "case-summary" }, study.summary)), h("a", { className: "button button-light", href: study.url, target: "_blank", rel: "noreferrer" }, study.urlLabel, " ↗")),
        study.products && h("div", { className: "product-split" }, h("p", { className: "block-label" }, "Two products, two jobs"), h("div", null, study.products.map((product, index) => h("article", { key: product.name }, h("div", { className: "product-heading" }, h("span", null, String(index + 1).padStart(2, "0")), h("p", null, product.category)), h("h4", null, product.name), h("p", { className: "product-need" }, product.need), h("p", { className: "product-experience" }, product.experience), h("small", null, product.technology))))),
        h("div", { className: "case-foundation" }, h("div", null, h("h4", null, "Product problem"), h("p", null, study.problem)), h("div", null, h("h4", null, "My ownership"), h("p", null, study.role))),
        h("div", { className: "outcomes" }, h("p", { className: "block-label" }, "What the solution makes possible"), h("div", null, study.outcomes.map((item, index) => h("p", { key: item }, h("span", null, String(index + 1).padStart(2, "0")), item)))),
        h("div", { className: "case-panels" },
          h(Panel, { title: "System architecture", meta: `${study.flow.length} layers`, open: openPanels[`${study.id}Flow`] || false, onToggle: () => togglePanel(`${study.id}Flow`), children: h("div", { className: "architecture-flow" }, study.flow.map(([layer, tech, purpose]) => h("div", { key: layer }, h("span", null, layer), h("strong", null, tech), h("p", null, purpose)))) }),
          h(Panel, { title: "Architecture decisions", meta: `${study.decisions.length} ADRs`, open: openPanels[`${study.id}Decisions`] || false, onToggle: () => togglePanel(`${study.id}Decisions`), children: h("div", { className: "decision-list" }, study.decisions.map((item, index) => h("article", { key: item.title }, h("span", null, `ADR-${String(index + 1).padStart(3, "0")}`), h("h5", null, item.title), h("p", null, item.detail)))) }),
          h(Panel, { title: "Production hardening", meta: `${study.hardening.length} controls`, open: openPanels[`${study.id}Hardening`] || false, onToggle: () => togglePanel(`${study.id}Hardening`), children: h("ul", { className: "plain-list" }, study.hardening.map((item) => h("li", { key: item }, item))) }),
          h(Panel, { title: "Designed evolution", meta: "Not yet shipped", open: openPanels[`${study.id}Planned`] || false, onToggle: () => togglePanel(`${study.id}Planned`), children: h("div", null, h("p", { className: "disclosure" }, "These items are architecture and roadmap work, clearly separated from production functionality."), h("ul", { className: "plain-list" }, study.planned.map((item) => h("li", { key: item }, item)))) })
        ),
        h("div", { className: "stack-row" }, study.stack.map((item) => h("span", { key: item }, item)))
      )
    );
  }

  function Panel({ title, meta, open, onToggle, children }) {
    return h("div", { className: open ? "panel open" : "panel" }, h("button", { type: "button", onClick: onToggle, "aria-expanded": open }, h("span", null, title), h("small", null, meta), h("i", { "aria-hidden": "true" }, open ? "−" : "+")), open && h("div", { className: "panel-content" }, children));
  }

  function EnterpriseWork() {
    return h("section", { id: "enterprise", className: "enterprise-section" }, h("div", { className: "section-number" }, "03"), h("div", { className: "enterprise-copy" }, h("p", { className: "kicker" }, "Team impact · AssistRx"), h("h2", null, "Giving delivery teams time back."), h("p", { className: "enterprise-lede" }, "I introduced AI-assisted workflows that reduced repetitive work while keeping decisions with the team.")), h("div", { className: "enterprise-grid" }, h("article", null, h("span", null, "01"), h("h3", null, "Faster triage"), h("p", null, "RAG-assisted preparation reduced recurring analysis from hours to minutes in observed workflows.")), h("article", null, h("span", null, "02"), h("h3", null, "Smoother releases"), h("p", null, "Automated repetitive CAB, release, dependency, risk, and reporting work.")), h("article", null, h("span", null, "03"), h("h3", null, "Practical adoption"), h("p", null, "Fit AI into existing team routines while keeping people accountable for decisions."))));
  }

  function RoleLens({ lens, activeLens, setActiveLens }) {
    return h("section", { id: "capabilities", className: "lens-section" }, h("div", { className: "section-intro" }, h("p", { className: "kicker" }, "How I can help"), h("h2", null, "One practice. Three roles."), h("p", null, "Select the lens most relevant to your team.")), h("div", { className: "lens-tabs", role: "tablist", "aria-label": "Professional capabilities" }, roleLenses.map((item) => h("button", { key: item.id, type: "button", role: "tab", className: activeLens === item.id ? "active" : "", onClick: () => setActiveLens(item.id), "aria-selected": activeLens === item.id }, item.label))), h("div", { className: "lens-detail", role: "tabpanel" }, h("div", null, h("h3", null, lens.title), h("p", null, lens.body)), h("ul", null, lens.evidence.map((item) => h("li", { key: item }, item)))));
  }

  function Approach() {
    const steps = [["01", "Frame", "Clarify the need, constraints, and success."], ["02", "Map", "Understand people, systems, data, and ownership."], ["03", "Decide", "Make the important tradeoffs visible."], ["04", "Deliver", "Sequence the work and manage risk."], ["05", "Improve", "Learn from real use and operations."]];
    return h("section", { className: "approach-section" }, h("div", { className: "section-intro" }, h("p", { className: "kicker" }, "How I work"), h("h2", null, "A good solution has to work for the customer and the team.")), h("div", { className: "approach-list" }, steps.map(([number, title, body]) => h("article", { key: number }, h("span", null, number), h("h3", null, title), h("p", null, body)))));
  }

  function Contact() {
    return h("section", { id: "contact", className: "contact-section" }, h("p", { className: "kicker" }, "Let’s solve something useful"), h("h2", null, "Bring me the messy problem."), h("p", null, "I’m interested in solutions architecture, applied AI, and technical product roles."), h("a", { className: "button button-light", href: "mailto:hello@timmycamp.xyz" }, "Start a conversation ↗"));
  }

  function Footer() {
    return h("footer", null, h("span", null, "Timmy Campbell"), h("span", null, "Technical Product Architect"), h("span", null, "timmycamp.xyz"));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
