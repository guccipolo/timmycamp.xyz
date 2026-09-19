from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent
OUTPUT_DIR = ROOT / "resume"
OUTPUT_DIR.mkdir(exist_ok=True)
OUTPUT = OUTPUT_DIR / "Timothy_Campbell_Blockchain_Resume.pdf"

INK = colors.HexColor("#111111")
MUTED = colors.HexColor("#555555")
BLUE = colors.HexColor("#245CFF")
LINE = colors.HexColor("#D3D3CE")


def register_fonts():
    font_candidates = [
        ("ResumeSans", "/System/Library/Fonts/Supplemental/Arial.ttf"),
        ("ResumeSansBold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
        ("ResumeSansItalic", "/System/Library/Fonts/Supplemental/Arial Italic.ttf"),
    ]
    for name, path in font_candidates:
        if Path(path).exists():
            pdfmetrics.registerFont(TTFont(name, path))


register_fonts()
FONT = "ResumeSans" if "ResumeSans" in pdfmetrics.getRegisteredFontNames() else "Helvetica"
BOLD = "ResumeSansBold" if "ResumeSansBold" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Bold"
ITALIC = "ResumeSansItalic" if "ResumeSansItalic" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Oblique"

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="ResumeName", fontName=BOLD, fontSize=20, leading=22, alignment=TA_CENTER, textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle(name="ResumeContact", fontName=FONT, fontSize=8.9, leading=11, alignment=TA_CENTER, textColor=INK, spaceAfter=5))
styles.add(ParagraphStyle(name="ResumeTitle", fontName=ITALIC, fontSize=10.1, leading=12.5, alignment=TA_CENTER, textColor=MUTED, spaceAfter=12))
styles.add(ParagraphStyle(name="Section", fontName=BOLD, fontSize=10.5, leading=12, textColor=INK, spaceBefore=8, spaceAfter=5, borderWidth=0, keepWithNext=True))
styles.add(ParagraphStyle(name="Body", fontName=FONT, fontSize=8.85, leading=11.6, textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle(name="BodySmall", fontName=FONT, fontSize=8.35, leading=10.7, textColor=INK, spaceAfter=3))
styles.add(ParagraphStyle(name="ResumeBullet", fontName=FONT, fontSize=8.65, leading=11.2, textColor=INK, leftIndent=12, firstLineIndent=-7, bulletIndent=2, spaceAfter=2.8))
styles.add(ParagraphStyle(name="ResumeBulletSmall", fontName=FONT, fontSize=8.2, leading=10.5, textColor=INK, leftIndent=12, firstLineIndent=-7, bulletIndent=2, spaceAfter=2.4))
styles.add(ParagraphStyle(name="Role", fontName=BOLD, fontSize=9.6, leading=11, textColor=INK))
styles.add(ParagraphStyle(name="Company", fontName=FONT, fontSize=9.6, leading=11, textColor=INK))
styles.add(ParagraphStyle(name="Date", fontName=FONT, fontSize=8.8, leading=11, alignment=TA_RIGHT, textColor=INK))
styles.add(ParagraphStyle(name="ProjectTitle", fontName=BOLD, fontSize=10.1, leading=12, textColor=INK, spaceBefore=2, spaceAfter=3))
styles.add(ParagraphStyle(name="ProjectSub", fontName=ITALIC, fontSize=8.7, leading=10.5, textColor=MUTED, spaceAfter=4))
styles.add(ParagraphStyle(name="Label", fontName=BOLD, fontSize=8.65, leading=11, textColor=INK))


def section(title):
    return [Paragraph(title.upper(), styles["Section"]), Table([[""]], colWidths=[7.1 * inch], rowHeights=[0.6], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), INK), ("LINEBELOW", (0, 0), (-1, -1), 0, INK)])), Spacer(1, 4)]


def bullet(text, small=False):
    return Paragraph(f"<bullet>&bull;</bullet>{text}", styles["ResumeBulletSmall" if small else "ResumeBullet"])


def role_header(role, company, location, dates):
    left = Paragraph(f"<b>{role}</b> &nbsp;|&nbsp; {company} - {location}", styles["Company"])
    right = Paragraph(dates, styles["Date"])
    return Table([[left, right]], colWidths=[5.5 * inch, 1.6 * inch], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))


def page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont(FONT, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(letter[0] - 0.55 * inch, 0.33 * inch, f"TIMOTHY CAMPBELL  |  {doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(str(OUTPUT), pagesize=letter, rightMargin=0.55 * inch, leftMargin=0.55 * inch, topMargin=0.48 * inch, bottomMargin=0.48 * inch, title="Timothy Campbell Blockchain Resume", author="Timothy Campbell")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume")
doc.addPageTemplates(PageTemplate(id="resume-pages", frames=[frame], onPage=page_number))

story = []
story.extend([
    Paragraph("TIMOTHY CAMPBELL", styles["ResumeName"]),
    Paragraph("Newark, NJ &nbsp;|&nbsp; (347) 570-0360 &nbsp;|&nbsp; timcamp25@gmail.com &nbsp;|&nbsp; <link href='https://timmycamp.xyz' color='#245CFF'>timmycamp.xyz</link>", styles["ResumeContact"]),
    Paragraph("Blockchain Product &amp; Solutions | Technical Project Manager", styles["ResumeTitle"]),
])

story += section("Summary")
story.append(Paragraph("Technical project and product leader with experience turning blockchain infrastructure, applied AI, and enterprise delivery needs into usable systems. Built a live non-custodial Solana marketplace spanning Anchor programs, escrow, wallet authentication, event-driven indexing, encrypted fulfillment, IPFS media, and RPC reliability. Brings cross-functional experience across frontend, backend, data, AI/ML, DevOps, security, reporting, and regulated healthcare environments.", styles["Body"]))

story += section("Core Competencies")
competencies = [
    ("Blockchain", "Solana, Anchor, Rust, wallet-signature authentication, PDAs, non-custodial escrow, on-chain settlement, RPC strategy, indexers, EVM/L2 ecosystems, bridging and cross-chain risk."),
    ("Architecture", "Trust boundaries, source-of-truth design, read models, idempotent synchronization, APIs, event flows, privacy, observability, ADRs, reliability, and production hardening."),
    ("Product & Delivery", "Discovery, requirements, roadmap-to-capacity alignment, Agile delivery, cross-team dependencies, CAB, release governance, risk escalation, and executive communication."),
    ("AI & Automation", "RAG-assisted triage, Atlassian Rovo, Confluence, Jira automation, Flux Kontext, LoRA adaptation, Modal inference, and AI-assisted engineering workflows."),
    ("Technical", "Next.js, React, TypeScript, Node.js, PostgreSQL/Supabase, Redis, Helius, IPFS/Pinata, EasyPost, Sentry, Better Stack, Power BI, SQL, GitHub, and AWS fundamentals."),
]
for label, text in competencies:
    story.append(Paragraph(f"<b>{label}:</b> {text}", styles["BodySmall"]))

story += section("Professional Experience")
story.append(role_header("Technical Project Manager", "AssistRx", "Orlando, FL (Remote)", "Aug 2024 - Present"))
for text in [
    "Own delivery across reporting, ETL, and AI/ML squads in a regulated healthcare environment, from discovery and sizing through testing, validation, sign-off, and production rollout.",
    "Architected RAG-assisted DevOps triage that retrieves ticket history and approved Confluence guidance, summarizes ownership and dependencies, and prepares next-step recommendations for human review; modeled a reduction from 45-60 minutes of manual preparation to 10-15 minutes assisted.",
    "Built Atlassian-based operating solutions using Jira, Confluence, Rovo, dashboards, and automation for reporting, recurring tasks, release readiness, dependencies, and stakeholder communication.",
    "Designed sprint-health and delivery dashboards surfacing blockers, aging work, throughput, dependency risk, and release readiness for engineering, product, QA, operations, and executives.",
    "Run CAB and release governance under audit and compliance constraints, coordinating intake, readiness, approvals, rollout, and follow-up automation.",
    "Partner with product owners on refinement, acceptance criteria, capacity alignment, risk, and continuous PDLC improvement.",
]:
    story.append(bullet(text))

story.append(Spacer(1, 3))
story.append(role_header("Technical Project Manager", "Lithia Motors", "Medford, OR (Remote)", "Sep 2023 - Jun 2024"))
for text in [
    "Led Agile transformation across two distributed data teams; reduced cycle time 15% through backlog hygiene, delivery coaching, and explicit work-in-progress controls.",
    "Improved planning and dependency visibility in Azure DevOps using delivery metrics and retrospectives to surface risks and guide stakeholder decisions.",
    "Facilitated Agile workshops across product, engineering, and data functions.",
]:
    story.append(bullet(text))

story.append(Spacer(1, 3))
story.append(role_header("SAFe Scrum Master", "CVS Health", "New York, NY", "Oct 2021 - Aug 2023"))
for text in [
    "Coached four Scrum teams across regulated healthcare initiatives, improving velocity approximately 20% through stronger planning, refinement, and continuous improvement.",
    "Facilitated PI planning, dependency reviews, ceremonies, and stakeholder alignment across distributed teams.",
    "Built Rally dashboards that gave leadership real-time initiative health, delivery risk, and dependency visibility.",
]:
    story.append(bullet(text))

story.append(PageBreak())

story += section("Selected Blockchain Product")
story.append(Paragraph("Set (formerly sl0p.exchange)", styles["ProjectTitle"]))
story.append(Paragraph("Founder, Product & Architecture Lead | Live Solana fashion marketplace", styles["ProjectSub"]))
for text in [
    "Defined the product thesis: if crypto is borderless and trust-minimized, its marketplaces should reflect that ethos while giving people a practical reason to use crypto.",
    "Designed and built Solana/Anchor marketplace programs for profiles, listings, purchases, escrow, shipment, delivery, refunds, and settlement using deterministic PDA accounts.",
    "Separated authoritative on-chain state from a rebuildable PostgreSQL read model for fast search, dashboards, fulfillment, notifications, and marketplace operations.",
    "Built a TypeScript indexer with WebSocket ingestion, transaction decoding, backfills, checkpoints, and reconciliation; added stale-state protection and idempotent synchronization across application and indexer paths.",
    "Implemented wallet-signature authentication, HTTP-only sessions, owner-scoped authorization, X25519-encrypted shipping data, encrypted tracking, and service-controlled private tables.",
    "Integrated EasyPost carrier reconciliation, IPFS media with gateway fallback, Redis caching, Sentry telemetry, Better Stack uptime monitoring, and multi-provider Solana RPC fallback.",
    "Produced ADRs, API inventories, data-flow reviews, isolated PostgreSQL integration tests, production preflight checks, and operational hardening roadmaps.",
]:
    story.append(bullet(text, small=True))

story.append(Spacer(1, 3))
story.append(Paragraph("Designed evolution - not yet shipped", styles["Label"]))
story.append(Paragraph("International product access with SOL-to-local-currency display and English-canonical multilingual content; native-SOL V2 escrow; and cross-chain dispute resolution connecting Solana to Kleros on Arbitrum through LayerZero.", styles["BodySmall"]))

story += section("Selected AI Products")
story.append(Paragraph("LookLab by Ember Niche", styles["ProjectTitle"]))
story.append(Paragraph("Product exploration spanning AI image editing and interactive 3D configuration", styles["ProjectSub"]))
for text in [
    "Bhori: built an AI try-on experience for aviator sunglasses using image-to-image references rather than conventional text-to-image generation; adapted Flux Kontext with a product-specific LoRA for frame identity plus frame and lens color control.",
    "Designed the Bhori workflow from product hypothesis through prompt contract, customer interface, Modal-hosted inference, WebSocket progress, and generation failure handling.",
    "INFY: built a browser-based configurator for Ember Niche's first 3D-printed frame using a multi-mesh GLB separated into customizable parts, Three.js/WebGL interaction, and matte color visualization.",
]:
    story.append(bullet(text, small=True))

story += section("Blockchain Perspective")
story.append(Paragraph("Active on-chain since 2018 across EVM mainnet, major L2s, and Solana. First-hand experience with self-custody, bridging, DeFi protocols, wallet approval risks, phishing, cross-chain trust assumptions, and multiple market cycles informs product and architecture decisions around account ownership, custody, settlement, and user safety.", styles["BodySmall"]))

story += section("Certifications & Education")
story.append(Paragraph("Certified SAFe 5 Scrum Master &nbsp;|&nbsp; Certified SAFe 6 Product Owner / Product Manager &nbsp;|&nbsp; AWS Cloud Practitioner in progress", styles["BodySmall"]))
story.append(Paragraph("B.A. Philosophy - John Jay College of Criminal Justice, New York, NY", styles["BodySmall"]))

doc.build(story)
print(OUTPUT)
