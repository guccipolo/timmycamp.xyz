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
        "A borderless, trust-minimized fashion marketplace built to play by the same rules as crypto.",
      problem:
        "If crypto is borderless and trustless, its marketplaces should be too. Set applies that ethos to a familiar need: buying and selling clothes anywhere.",
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
        {
          title: "Design global access and dispute resolution into the system",
          detail:
            "The target architecture treats language, local-currency display, and neutral dispute resolution as core marketplace capabilities rather than regional add-ons.",
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
        "Local-currency conversion for SOL-denominated marketplace prices",
        "English-canonical content with derived multilingual experiences",
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
        "I connect requirements to secure, reliable systems with clear boundaries, ownership, integrations, and tradeoffs.",
      evidence: ["System boundaries and ADRs", "Security and privacy", "Reliability and recovery", "Integration and release strategy"],
    },
    {
      id: "ai",
      label: "Applied AI",
      title: "I use AI where it can remove friction or create a better experience.",
      body:
        "I connect models, data, interfaces, inference infrastructure, evaluation, and operational controls around a specific user outcome.",
      evidence: ["Flux Kontext + LoRA", "RAG-assisted workflows", "Inference architecture", "Evaluation and observability"],
    },
    {
      id: "blockchain",
      label: "Blockchain Solutions",
      title: "I turn on-chain capability into a product people can actually use.",
      body:
        "I connect smart contracts, wallets, indexing, off-chain data, privacy, and operations around a clear customer need.",
      evidence: ["Solana + Anchor programs", "Escrow and marketplace state", "Indexing and reconciliation", "Cross-chain architecture"],
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
    return h("header", { className: "site-header" }, h("a", { href: "#top", className: "wordmark" }, "Timmy Campbell"), h("nav", { "aria-label": "Primary navigation" }, h("a", { href: "#work" }, "Work"), h("a", { href: "#enterprise" }, "Team impact"), h("a", { href: "#capabilities" }, "How I help"), h("a", { href: "#contact" }, "Contact")), h("a", { className: "header-cta", href: "mailto:timcamp25@gmail.com" }, "Let’s talk"));
  }

  function Hero() {
    return h("section", { id: "top", className: "hero" }, h("div", { className: "hero-copy" }, h("p", { className: "kicker" }, "Solutions architecture · AI · Blockchain · Product"), h("h1", null, "I turn complex needs into useful systems."), h("p", { className: "lede" }, "I connect customer problems, technical architecture, and delivery—then shape the product experience around them."), h("div", { className: "hero-actions" }, h("a", { className: "button button-dark", href: "#work" }, "Explore the work"), h("a", { className: "text-link", href: "mailto:timcamp25@gmail.com" }, "Let’s talk", h("span", null, "↗")))), h("aside", { className: "hero-brief", "aria-label": "What I bring" }, h("p", { className: "brief-label" }, "What I bring"), h("p", { className: "brief-title" }, "Architecture judgment, product thinking, and enterprise delivery across emerging technology."), h("dl", null, h("div", null, h("dt", null, "Frame"), h("dd", null, "Customer needs, constraints, and outcomes")), h("div", null, h("dt", null, "Design"), h("dd", null, "Systems, data, integrations, and controls")), h("div", null, h("dt", null, "Deliver"), h("dd", null, "Priorities, tradeoffs, and team alignment")))));
  }

  function ProofStrip() {
    const items = [["Architecture", "Boundaries, tradeoffs, and reliability"], ["Applied AI", "Model workflows and user experience"], ["Blockchain", "Programs, escrow, and indexed state"], ["Product", "Discovery, priorities, and delivery"]];
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
          h(Panel, { title: "System architecture", meta: `${study.flow.length} layers`, open: openPanels[`${study.id}Flow`] || false, onToggle: () => togglePanel(`${study.id}Flow`), children: h("div", { className: "architecture-panel-inner" }, h(ArchitectureDiagram, { studyId: study.id }), h("p", { className: "architecture-detail-label" }, "Layer details"), h("div", { className: "architecture-flow" }, study.flow.map(([layer, tech, purpose]) => h("div", { key: layer }, h("span", null, layer), h("strong", null, tech), h("p", null, purpose))))) }),
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

  function FlowSequence({ nodes }) {
    return h("div", { className: "diagram-sequence" }, nodes.flatMap((node, index) => {
      const elements = [h("div", { key: `${node.title}-node`, className: `diagram-node ${node.kind || ""}` }, h("strong", null, node.title), node.detail && h("span", null, node.detail))];
      if (index < nodes.length - 1) elements.push(h("span", { key: `${node.title}-arrow`, className: "diagram-arrow", "aria-hidden": "true" }, "→"));
      return elements;
    }));
  }

  function SetArchitectureDiagram() {
    const interactionFlow = [
      { title: "Buyer / Seller", detail: "Wallet-signed actions", kind: "user" },
      { title: "Next.js Experience", detail: "Marketplace + API routes", kind: "offchain" },
      { title: "Solana Program", detail: "Anchor instructions", kind: "onchain" },
      { title: "Escrow", detail: "Non-custodial settlement", kind: "onchain" },
    ];
    const projectionFlow = [
      { title: "Solana Events", detail: "Authoritative state", kind: "onchain" },
      { title: "Helius + Indexer", detail: "Event ingestion", kind: "external" },
      { title: "Reconciliation", detail: "Backfill + repair", kind: "offchain" },
      { title: "PostgreSQL", detail: "Read model", kind: "offchain" },
      { title: "Marketplace UI", detail: "Search + operations", kind: "user" },
    ];
    const support = [
      ["IPFS", "Product media and metadata"],
      ["EasyPost", "Encrypted fulfillment and carrier updates"],
      ["RPC fallbacks", "Alchemy, Triton, Helius, and public RPC"],
      ["Sentry + Better Stack", "App errors and outside-in uptime"],
    ];

    return h("section", { className: "architecture-visual set-diagram", "aria-labelledby": "set-architecture-title" },
      h("div", { className: "diagram-heading" }, h("div", null, h("p", { className: "diagram-eyebrow" }, "Current architecture"), h("h5", { id: "set-architecture-title" }, "Trust on-chain. Commerce experience off-chain.")), h("p", null, "Financial state remains verifiable while indexed data keeps the marketplace fast and usable.")),
      h("div", { className: "diagram-lane" }, h("span", { className: "boundary-label" }, "User → on-chain boundary"), h(FlowSequence, { nodes: interactionFlow })),
      h("div", { className: "diagram-lane" }, h("span", { className: "boundary-label" }, "On-chain → off-chain projection"), h(FlowSequence, { nodes: projectionFlow })),
      h("div", { className: "support-boundary" }, h("span", { className: "boundary-label" }, "Supporting services"), h("div", { className: "support-grid" }, support.map(([title, detail]) => h("article", { key: title }, h("strong", null, title), h("span", null, detail)))))
    );
  }

  function LookLabArchitectureDiagram() {
    const [activeProduct, setActiveProduct] = useState("bhori");
    const products = {
      bhori: {
        label: "Bhori",
        subtitle: "Reference-based AI try-on",
        nodes: [
          { title: "Source image", detail: "Frame + lens choices", kind: "user" },
          { title: "Browser prep", detail: "Validate + optimize", kind: "offchain" },
          { title: "Modal", detail: "Inference service", kind: "external" },
          { title: "Flux Kontext + LoRA", detail: "Product-aware edit", kind: "ai" },
          { title: "Generated result", detail: "Progress events + image", kind: "user" },
        ],
      },
      infy: {
        label: "INFY",
        subtitle: "Interactive 3D configuration",
        nodes: [
          { title: "Multi-mesh GLB", detail: "Separated printable parts", kind: "external" },
          { title: "Three.js / WebGL", detail: "Browser rendering", kind: "offchain" },
          { title: "Customization state", detail: "Frame color selection", kind: "offchain" },
          { title: "3D preview", detail: "Rotate, zoom, inspect", kind: "user" },
        ],
      },
    };
    const active = products[activeProduct];

    function selectWithKeyboard(event, productId) {
      const order = ["bhori", "infy"];
      const currentIndex = order.indexOf(productId);
      let nextIndex = currentIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % order.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + order.length) % order.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = order.length - 1;
      if (nextIndex === currentIndex) return;
      event.preventDefault();
      const nextProduct = order[nextIndex];
      setActiveProduct(nextProduct);
      requestAnimationFrame(() => document.getElementById(`architecture-tab-${nextProduct}`).focus());
    }

    return h("section", { className: "architecture-visual looklab-diagram", "aria-labelledby": "looklab-architecture-title" },
      h("div", { className: "diagram-heading" }, h("div", null, h("p", { className: "diagram-eyebrow" }, "Current architecture"), h("h5", { id: "looklab-architecture-title" }, "Two products. Two purpose-built pipelines.")), h("p", null, "Switch products to see how each experience turns a different customer question into a visual answer.")),
      h("div", { className: "product-switch", role: "tablist", "aria-label": "LookLab product architecture" }, Object.entries(products).map(([id, product]) => h("button", { id: `architecture-tab-${id}`, key: id, type: "button", role: "tab", className: activeProduct === id ? "active" : "", "aria-selected": activeProduct === id, "aria-controls": `architecture-panel-${id}`, tabIndex: activeProduct === id ? 0 : -1, onClick: () => setActiveProduct(id), onKeyDown: (event) => selectWithKeyboard(event, id) }, h("strong", null, product.label), h("span", null, product.subtitle)))),
      h("div", { id: `architecture-panel-${activeProduct}`, className: "product-diagram-panel", role: "tabpanel", "aria-labelledby": `architecture-tab-${activeProduct}`, tabIndex: 0 }, h("span", { className: "boundary-label" }, active.subtitle), h(FlowSequence, { nodes: active.nodes }))
    );
  }

  function ArchitectureDiagram({ studyId }) {
    return studyId === "set" ? h(SetArchitectureDiagram) : h(LookLabArchitectureDiagram);
  }

  function EnterpriseWork() {
    return h("section", { id: "enterprise", className: "enterprise-section" },
      h("div", { className: "section-number" }, "03"),
      h("div", { className: "enterprise-copy" }, h("p", { className: "kicker" }, "Internal product · AssistRx"), h("h2", null, "Turning issue triage into a decision system."), h("p", { className: "enterprise-lede" }, "I designed a RAG-assisted triage workflow that combined governed knowledge, request-specific pathways, organizational context, and human review inside the Atlassian tools teams already used.")),
      h("div", { className: "enterprise-grid" },
        h("article", null, h("span", null, "01"), h("h3", null, "Structured the work"), h("p", null, "Mapped technical and administrative requests—including SFTP access, Azure access, variable updates, permissions, and release work—into templates with required inputs, responses, and next actions.")),
        h("article", null, h("span", null, "02"), h("h3", null, "Designed beyond classification"), h("p", null, "Combined RAG retrieval with defined pathways across many possible outcomes. Unmatched issues moved into expertise and organizational-ownership routes instead of being forced into the nearest category.")),
        h("article", null, h("span", null, "03"), h("h3", null, "Made it viable"), h("p", null, "Used Jira, Jira Automation, Confluence, Rovo, and existing workflows. Consulted Jira administrators on licensing, automation limits, permissions, support burden, and what was practical to maintain."))
      ),
      h("details", { className: "enterprise-detail" },
        h("summary", null, h("span", null, "How the triage architecture worked"), h("small", null, "View workflow")),
        h("div", { className: "triage-layout" },
          h("div", { className: "triage-flow" },
            [["01", "Recognize", "Compare the incoming Jira issue with defined technical and administrative templates."], ["02", "Retrieve", "Use Rovo and the RAG pipeline to gather approved Confluence guidance, related issues, procedures, and historical context."], ["03", "Follow the pathway", "Apply the matching template’s required-information checks, response pattern, routing logic, and next actions through Jira Automation."], ["04", "Handle the long tail", "For unmatched issues, examine documented subject-matter expertise and organizational ownership to recommend a team or point of contact."], ["05", "Review and act", "Present the evidence and recommendation to a Scrum Master or technical owner, who retains the final routing decision."]].map(([number, title, body]) => h("article", { key: number }, h("span", null, number), h("div", null, h("h3", null, title), h("p", null, body))))
          ),
          h("aside", { className: "impact-estimate" }, h("p", null, "Internal benchmark"), h("strong", null, "~90%"), h("h3", null, "triage agreement"), h("p", null, "Testing compared the workflow’s template selection, routing recommendation, required-information checks, and proposed next actions with human-reviewed expected outcomes."))
        )
      )
    );
  }

  function RoleLens({ lens, activeLens, setActiveLens }) {
    return h("section", { id: "capabilities", className: "lens-section" }, h("div", { className: "section-intro" }, h("p", { className: "kicker" }, "How I can help"), h("h2", null, "Architecture first. Product always."), h("p", null, "Select the lens most relevant to your team.")), h("div", { className: "lens-tabs", role: "tablist", "aria-label": "Professional capabilities" }, roleLenses.map((item) => h("button", { key: item.id, type: "button", role: "tab", className: activeLens === item.id ? "active" : "", onClick: () => setActiveLens(item.id), "aria-selected": activeLens === item.id }, item.label))), h("div", { className: "lens-detail", role: "tabpanel" }, h("div", null, h("h3", null, lens.title), h("p", null, lens.body)), h("ul", null, lens.evidence.map((item) => h("li", { key: item }, item)))));
  }

  function Approach() {
    const steps = [["01", "Frame", "Clarify the need, constraints, and success."], ["02", "Map", "Understand people, systems, data, and ownership."], ["03", "Decide", "Make the important tradeoffs visible."], ["04", "Deliver", "Sequence the work and manage risk."], ["05", "Improve", "Learn from real use and operations."]];
    return h("section", { className: "approach-section" }, h("div", { className: "section-intro" }, h("p", { className: "kicker" }, "How I work"), h("h2", null, "A good solution has to work for the customer and the team.")), h("div", { className: "approach-list" }, steps.map(([number, title, body]) => h("article", { key: number }, h("span", null, number), h("h3", null, title), h("p", null, body)))));
  }

  function Contact() {
    return h("section", { id: "contact", className: "contact-section" }, h("p", { className: "kicker" }, "Let’s build something useful"), h("h2", null, "Bring me the need. I’ll help shape the system and product around it."), h("p", null, "I work across solutions architecture, applied AI, blockchain systems, and technical product delivery."), h("div", { className: "contact-actions" }, h("a", { className: "button button-light", href: "mailto:timcamp25@gmail.com" }, "timcamp25@gmail.com ↗")));
  }

  function Footer() {
    return h("footer", null, h("span", null, "Timmy Campbell"), h("span", null, "Solutions Architecture · AI · Blockchain · Product"), h("span", null, "timmycamp.xyz"));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
