"""
Droplet — Annual Sustainability Report 2025
Generates a professional multi-page PDF with varied visual layouts.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, black, Color
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    Paragraph, Spacer, PageBreak, Table, TableStyle,
    HRFlowable, KeepTogether, Flowable
)
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, Frame, NextPageTemplate
import os

# ── Brand colors ──
BLUE       = HexColor("#0066FF")
BLUE_DARK  = HexColor("#0044CC")
DARK       = HexColor("#0F172A")
DARK_2     = HexColor("#1E293B")
SLATE      = HexColor("#334155")
MUTED      = HexColor("#64748B")
LIGHT_GRAY = HexColor("#F8FAFC")
LIGHT_BLUE = HexColor("#EFF6FF")
BORDER     = HexColor("#E2E8F0")
GREEN      = HexColor("#10B981")
GREEN_BG   = HexColor("#ECFDF5")
AMBER      = HexColor("#F59E0B")
CYAN       = HexColor("#06B6D4")
VIOLET     = HexColor("#8B5CF6")

WIDTH, HEIGHT = letter
CONTENT_W = WIDTH - 1.7 * inch

# ── Output path ──
OUTPUT = os.path.join(os.path.dirname(__file__), "public", "Droplet_Annual_Sustainability_Report_2025.pdf")


# ═══════════════════════════════════════
# Custom flowables for visual variety
# ═══════════════════════════════════════

class DarkBanner(Flowable):
    """Full-width dark background panel with large stat + label."""
    def __init__(self, stat, label, description, accent=BLUE, h=110):
        Flowable.__init__(self)
        self.stat = stat
        self.label = label
        self.description = description
        self.accent = accent
        self.h = h

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (availWidth, self.h)

    def draw(self):
        c = self.canv
        # Dark background
        c.setFillColor(DARK)
        c.roundRect(0, 0, self.width, self.h, 6, fill=1, stroke=0)
        # Accent bar on left
        c.setFillColor(self.accent)
        c.roundRect(0, 0, 4, self.h, 2, fill=1, stroke=0)
        # Big stat
        c.setFillColor(self.accent)
        c.setFont("Helvetica-Bold", 42)
        c.drawString(28, self.h - 52, self.stat)
        # Label
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(28, self.h - 72, self.label)
        # Description
        c.setFillColor(HexColor("#94A3B8"))
        c.setFont("Helvetica", 9)
        # Word-wrap description
        words = self.description.split()
        line = ""
        y = self.h - 92
        for w in words:
            test = line + " " + w if line else w
            if c.stringWidth(test, "Helvetica", 9) < self.width - 56:
                line = test
            else:
                c.drawString(28, y, line)
                y -= 12
                line = w
        if line:
            c.drawString(28, y, line)


class AccentQuote(Flowable):
    """Quote with thick left accent bar — no box background."""
    def __init__(self, text, attribution, accent=BLUE):
        Flowable.__init__(self)
        self.text = text
        self.attribution = attribution
        self.accent = accent

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (availWidth, 80)

    def draw(self):
        c = self.canv
        # Accent bar
        c.setFillColor(self.accent)
        c.rect(0, 0, 3, 80, fill=1, stroke=0)
        # Quote text
        c.setFillColor(DARK)
        c.setFont("Helvetica-Oblique", 11)
        words = self.text.split()
        line = ""
        y = 62
        for w in words:
            test = line + " " + w if line else w
            if c.stringWidth(test, "Helvetica-Oblique", 11) < self.width - 40:
                line = test
            else:
                c.drawString(20, y, line)
                y -= 16
                line = w
        if line:
            c.drawString(20, y, line)
        # Attribution
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(20, 6, self.attribution)


class ProgressBar(Flowable):
    """Horizontal progress bar with label and value."""
    def __init__(self, label, value, max_val, display, color=BLUE):
        Flowable.__init__(self)
        self.label = label
        self.value = value
        self.max_val = max_val
        self.display = display
        self.color = color

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (availWidth, 32)

    def draw(self):
        c = self.canv
        bar_w = self.width - 120
        # Label
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 9)
        c.drawString(0, 20, self.label)
        # Track
        c.setFillColor(HexColor("#E2E8F0"))
        c.roundRect(0, 0, bar_w, 10, 5, fill=1, stroke=0)
        # Fill
        fill_w = (self.value / self.max_val) * bar_w
        c.setFillColor(self.color)
        c.roundRect(0, 0, fill_w, 10, 5, fill=1, stroke=0)
        # Value text
        c.setFillColor(self.color)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(bar_w + 12, 0, self.display)


class SectionDivider(Flowable):
    """Large section number with thin rule — replaces boxed headers."""
    def __init__(self, number, title):
        Flowable.__init__(self)
        self.number = number
        self.title = title

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (availWidth, 58)

    def draw(self):
        c = self.canv
        # Large faded number
        c.setFillColor(HexColor("#E2E8F0"))
        c.setFont("Helvetica-Bold", 56)
        c.drawString(0, 4, self.number)
        # Title overlaid
        c.setFillColor(DARK)
        c.setFont("Helvetica-Bold", 20)
        num_w = c.stringWidth(self.number, "Helvetica-Bold", 56)
        c.drawString(num_w + 12, 16, self.title)
        # Thin blue underline
        c.setStrokeColor(BLUE)
        c.setLineWidth(2)
        c.line(0, 0, self.width, 0)


class StatStrip(Flowable):
    """Row of stats with just thin top/bottom lines — open, airy feel."""
    def __init__(self, items):
        """items = [(value, label, color), ...]"""
        Flowable.__init__(self)
        self.items = items

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (availWidth, 72)

    def draw(self):
        c = self.canv
        n = len(self.items)
        col_w = self.width / n
        # Top thin rule
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.5)
        c.line(0, 72, self.width, 72)
        c.line(0, 0, self.width, 0)

        for i, (val, label, color) in enumerate(self.items):
            x = i * col_w
            # Vertical divider (except first)
            if i > 0:
                c.setStrokeColor(BORDER)
                c.setLineWidth(0.5)
                c.line(x, 8, x, 64)
            # Value
            c.setFillColor(color)
            c.setFont("Helvetica-Bold", 28)
            c.drawString(x + 12, 30, val)
            # Label
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 8)
            c.drawString(x + 12, 12, label)


class MiniCard(Flowable):
    """Small card with colored top edge — for timeline items."""
    def __init__(self, quarter, items, accent=BLUE):
        Flowable.__init__(self)
        self.quarter = quarter
        self.items = items
        self.accent = accent

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        line_count = sum(1 + max(0, len(item) // 60) for item in self.items)
        self.h = 30 + line_count * 14
        return (availWidth, self.h)

    def draw(self):
        c = self.canv
        # Card background
        c.setFillColor(LIGHT_GRAY)
        c.roundRect(0, 0, self.width, self.h, 4, fill=1, stroke=0)
        # Colored top edge
        c.setFillColor(self.accent)
        c.roundRect(0, self.h - 3, self.width, 3, 1, fill=1, stroke=0)
        # Quarter label
        c.setFillColor(self.accent)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(12, self.h - 22, self.quarter)
        # Items
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 8.5)
        y = self.h - 40
        for item in self.items:
            words = item.split()
            line = ""
            for w in words:
                test = line + " " + w if line else w
                if c.stringWidth(test, "Helvetica", 8.5) < self.width - 32:
                    line = test
                else:
                    c.drawString(12, y, line)
                    y -= 12
                    line = w
            if line:
                c.drawString(12, y, line)
                y -= 14


class KeyValueRow(Flowable):
    """Single spec row with dotted leader between key and value."""
    def __init__(self, key, value):
        Flowable.__init__(self)
        self.key = key
        self.value = value

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (availWidth, 20)

    def draw(self):
        c = self.canv
        c.setFillColor(SLATE)
        c.setFont("Helvetica", 9)
        key_w = c.stringWidth(self.key, "Helvetica", 9)
        c.drawString(0, 5, self.key)
        # Dotted leader
        c.setFillColor(BORDER)
        c.setFont("Helvetica", 8)
        dot_start = key_w + 8
        val_w = c.stringWidth(self.value, "Helvetica-Bold", 9)
        dot_end = self.width - val_w - 8
        x = dot_start
        while x < dot_end:
            c.drawString(x, 5, ".")
            x += 5
        # Value
        c.setFillColor(DARK)
        c.setFont("Helvetica-Bold", 9)
        c.drawRightString(self.width, 5, self.value)
        # Bottom line
        c.setStrokeColor(HexColor("#F1F5F9"))
        c.setLineWidth(0.5)
        c.line(0, 0, self.width, 0)


# ──────────────────────────────────────────────
# Custom doc template
# ──────────────────────────────────────────────
class ReportDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)
        frame = Frame(
            0.85 * inch, 0.85 * inch,
            CONTENT_W, HEIGHT - 1.7 * inch,
            id="main"
        )
        self.addPageTemplates([
            PageTemplate(id="cover", frames=[frame], onPage=self._cover_page),
            PageTemplate(id="content", frames=[frame], onPage=self._content_page),
        ])

    def _cover_page(self, canvas_obj, doc):
        c = canvas_obj
        c.saveState()
        # Full dark background
        c.setFillColor(DARK)
        c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
        # Geometric accents — angled lines
        c.setStrokeColor(DARK_2)
        c.setLineWidth(1)
        for i in range(8):
            y = HEIGHT - 80 - i * 35
            c.line(WIDTH * 0.55, y, WIDTH, y - 60)
        # Large circle element (top-right)
        c.setStrokeColor(HexColor("#1E293B"))
        c.setLineWidth(2)
        c.circle(WIDTH - 0.5 * inch, HEIGHT - 1 * inch, 140, fill=0, stroke=1)
        c.circle(WIDTH - 0.5 * inch, HEIGHT - 1 * inch, 100, fill=0, stroke=1)
        # Blue accent dot cluster
        c.setFillColor(BLUE)
        c.circle(WIDTH - 2.5 * inch, 2 * inch, 4, fill=1, stroke=0)
        c.circle(WIDTH - 2.3 * inch, 2.15 * inch, 3, fill=1, stroke=0)
        c.circle(WIDTH - 2.1 * inch, 1.95 * inch, 5, fill=1, stroke=0)
        c.circle(WIDTH - 2.35 * inch, 1.8 * inch, 3, fill=1, stroke=0)
        # Bottom line accent
        c.setStrokeColor(BLUE)
        c.setLineWidth(2)
        c.line(0.85 * inch, 1.2 * inch, 3.5 * inch, 1.2 * inch)
        c.restoreState()

    def _content_page(self, canvas_obj, doc):
        c = canvas_obj
        c.saveState()
        # Minimal top bar — just the brand name and thin line
        c.setFont("Helvetica-Bold", 7)
        c.setFillColor(BLUE)
        c.drawString(0.85 * inch, HEIGHT - 0.42 * inch, "DROPLET")
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7)
        c.drawString(1.45 * inch, HEIGHT - 0.42 * inch, "ANNUAL SUSTAINABILITY REPORT  /  2025")
        # Thin line
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.5)
        c.line(0.85 * inch, HEIGHT - 0.50 * inch, WIDTH - 0.85 * inch, HEIGHT - 0.50 * inch)
        # Page number — right-aligned, styled
        c.setFont("Helvetica", 7)
        c.setFillColor(MUTED)
        c.drawRightString(WIDTH - 0.85 * inch, 0.5 * inch, f"{doc.page}")
        # Thin bottom line
        c.setStrokeColor(BORDER)
        c.line(0.85 * inch, 0.6 * inch, WIDTH - 0.85 * inch, 0.6 * inch)
        c.restoreState()


# ──────────────────────────────
# Styles
# ──────────────────────────────
styles = getSampleStyleSheet()

cover_year = ParagraphStyle("CoverYear", fontName="Helvetica-Bold", fontSize=80, leading=80, textColor=BLUE)
cover_title = ParagraphStyle("CoverTitle", fontName="Helvetica-Bold", fontSize=34, leading=40, textColor=white, spaceAfter=8)
cover_sub = ParagraphStyle("CoverSub", fontName="Helvetica", fontSize=13, leading=18, textColor=HexColor("#94A3B8"), spaceAfter=4)

body = ParagraphStyle("Body", fontName="Helvetica", fontSize=10, leading=15, textColor=SLATE, alignment=TA_JUSTIFY, spaceAfter=8)
body_bold = ParagraphStyle("BodyBold", parent=body, fontName="Helvetica-Bold")
body_sm = ParagraphStyle("BodySm", parent=body, fontSize=9, leading=13)
body_white = ParagraphStyle("BodyWhite", parent=body, textColor=HexColor("#CBD5E1"))

subsection = ParagraphStyle("SubSection", fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=DARK, spaceBefore=16, spaceAfter=6)
subsection_blue = ParagraphStyle("SubBlue", parent=subsection, textColor=BLUE)

footnote = ParagraphStyle("Footnote", fontName="Helvetica", fontSize=7.5, leading=10, textColor=MUTED, spaceAfter=4)
label_style = ParagraphStyle("Label", fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=MUTED, spaceAfter=2)
toc_num = ParagraphStyle("TOCNum", fontName="Helvetica-Bold", fontSize=11, leading=24, textColor=BLUE)
toc_title = ParagraphStyle("TOCTitle", fontName="Helvetica", fontSize=11, leading=24, textColor=SLATE)


# ──────────────────────────────
# Helpers
# ──────────────────────────────
def thin_rule(color=BORDER):
    return HRFlowable(width="100%", thickness=0.5, color=color, spaceBefore=4, spaceAfter=4)

def blue_accent():
    return HRFlowable(width="20%", thickness=2, color=BLUE, spaceBefore=2, spaceAfter=10)

def data_table(headers, rows, col_widths=None):
    data = [headers] + rows
    if col_widths is None:
        n = len(headers)
        col_widths = [CONTENT_W / n] * n
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 8),
        ("FONTSIZE", (0, 1), (-1, -1), 8.5),
        ("TEXTCOLOR", (0, 0), (-1, 0), MUTED),
        ("BACKGROUND", (0, 0), (-1, 0), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), SLATE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, 0), 1, DARK),
        ("LINEBELOW", (0, 1), (-1, -2), 0.25, BORDER),
        ("LINEBELOW", (0, -1), (-1, -1), 1, BORDER),
    ]))
    return t


# ══════════════════════════════════════
# BUILD REPORT
# ══════════════════════════════════════
story = []

# ──────── COVER ────────
story.append(Spacer(1, 2.4 * inch))
story.append(Paragraph("2025", cover_year))
story.append(Spacer(1, 10))
story.append(Paragraph("Annual<br/>Sustainability<br/>Report", cover_title))
story.append(Spacer(1, 16))
story.append(Paragraph("Water Intelligence for the World's Data Centers", cover_sub))
story.append(Spacer(1, 4))
story.append(Paragraph("Published March 2026  |  Droplet, Inc.", cover_sub))
story.append(Spacer(1, 1.2 * inch))
conf = ParagraphStyle("Conf", fontName="Helvetica", fontSize=7, leading=9, textColor=HexColor("#475569"))
story.append(Paragraph(
    "CONFIDENTIAL  |  Distribution limited to authorized stakeholders.  |  "
    "2026 Droplet, Inc. All rights reserved.", conf
))

# ──────── TOC ────────
story.append(NextPageTemplate("content"))
story.append(PageBreak())

story.append(Paragraph("CONTENTS", ParagraphStyle("TOCHead", fontName="Helvetica-Bold", fontSize=9, textColor=MUTED, spaceAfter=6, tracking=200)))
story.append(blue_accent())
story.append(Spacer(1, 8))

toc_items = [
    ("01", "Letter from the CEO"),
    ("02", "Executive Summary"),
    ("03", "Environmental Impact"),
    ("04", "Platform & Sensor Network"),
    ("05", "Client Outcomes"),
    ("06", "Operational Footprint"),
    ("07", "Goals & Roadmap"),
    ("08", "Appendix"),
]
for num, title in toc_items:
    row = Table(
        [[Paragraph(num, toc_num), Paragraph(title, toc_title)]],
        colWidths=[0.5 * inch, CONTENT_W - 0.5 * inch],
    )
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("LINEBELOW", (0, 0), (-1, -1), 0.25, BORDER),
    ]))
    story.append(row)

# ──────── 01 CEO LETTER ────────
story.append(PageBreak())
story.append(SectionDivider("01", "Letter from the CEO"))
story.append(Spacer(1, 18))

story.append(Paragraph(
    "To our stakeholders, partners, and the broader sustainability community,", body_bold))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "2025 was a defining year for Droplet. What began as a research thesis on data center water waste "
    "has matured into a platform deployed across 14 countries, monitoring over 2.8 billion gallons of "
    "water flowing through some of the world's largest compute facilities. The urgency of our mission "
    "has never been clearer: global AI workloads grew 4x this year, and with them, water consumption "
    "surged to unprecedented levels.", body))
story.append(Paragraph(
    "Our approach is simple but powerful -- deploy low-cost, high-precision sensor nodes directly into "
    "cooling infrastructure, stream telemetry to a unified dashboard, and let our AI engine surface "
    "actionable optimizations in real time. The results speak for themselves: clients using Droplet "
    "reduced water waste by an average of 34%, saving a combined 412 million gallons in 2025 alone.", body))
story.append(Paragraph(
    "But technology is only part of the story. This year we published our open Water Efficiency "
    "Index (WEI), partnered with the U.S. Department of Energy's Better Data Centers initiative, and "
    "contributed to ISO/IEC 30134-9 -- the first international standard for data center water metrics. "
    "We believe transparency accelerates progress, and we intend to lead by example.", body))
story.append(Paragraph(
    "As we enter 2026, our focus sharpens: deeper AI-driven predictions, broader sensor coverage, and "
    "a relentless commitment to making every drop count.", body))
story.append(Spacer(1, 24))

# Signature block — no box, just a clean line + name
story.append(thin_rule(DARK))
story.append(Spacer(1, 4))
story.append(Paragraph("<b>The Droplet Leadership Team</b>", ParagraphStyle("Sig", fontName="Helvetica-Bold", fontSize=10, textColor=DARK)))
story.append(Paragraph("San Francisco, CA  |  March 2026", ParagraphStyle("SigSub", fontName="Helvetica", fontSize=8, textColor=MUTED)))


# ──────── 02 EXEC SUMMARY ────────
story.append(PageBreak())
story.append(SectionDivider("02", "Executive Summary"))
story.append(Spacer(1, 18))

story.append(Paragraph(
    "Droplet's mission is to eliminate preventable water waste in data center cooling. In 2025, "
    "our platform monitored 6,240 active sensor nodes across 87 facilities, processing over "
    "18 billion telemetry data points to deliver real-time insights and automated recommendations.", body))
story.append(Spacer(1, 12))

# Stats — open strip style (no boxes)
story.append(StatStrip([
    ("412M", "GALLONS SAVED", BLUE),
    ("34%", "WASTE REDUCTION", GREEN),
    ("6,240", "SENSOR NODES", CYAN),
    ("87", "FACILITIES", VIOLET),
]))
story.append(Spacer(1, 6))
story.append(StatStrip([
    ("99.97%", "PLATFORM UPTIME", BLUE),
    ("18B+", "DATA POINTS", GREEN),
    ("14", "COUNTRIES", CYAN),
    ("$28.6M", "COST SAVINGS", VIOLET),
]))
story.append(Spacer(1, 20))

# Milestones as timeline cards (2x2 grid)
story.append(Paragraph("KEY MILESTONES", label_style))
story.append(Spacer(1, 6))

q1_card = MiniCard("Q1 2025", [
    "Launched Droplet AI -- natural-language water system queries",
    "Deployed Sensor Node Pro v2 with pressure + conductivity",
], BLUE)
q2_card = MiniCard("Q2 2025", [
    "Signed enterprise deals with 3 Fortune 100 hyperscalers",
    "Published open Water Efficiency Index (WEI) framework",
], CYAN)
q3_card = MiniCard("Q3 2025", [
    "Achieved SOC 2 Type II and ISO 27001 certifications",
    "Reached 5,000 active nodes -- 10x YoY growth",
], GREEN)
q4_card = MiniCard("Q4 2025", [
    "DOE partnership: Better Data Centers Initiative",
    "Contributed to ISO/IEC 30134-9 drafting committee",
], VIOLET)

row1 = Table([[q1_card, Spacer(8, 1), q2_card]], colWidths=[CONTENT_W/2 - 4, 8, CONTENT_W/2 - 4])
row1.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0)]))
row2 = Table([[q3_card, Spacer(8, 1), q4_card]], colWidths=[CONTENT_W/2 - 4, 8, CONTENT_W/2 - 4])
row2.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0)]))
story.append(row1)
story.append(Spacer(1, 8))
story.append(row2)


# ──────── 03 ENVIRONMENTAL IMPACT ────────
story.append(PageBreak())
story.append(SectionDivider("03", "Environmental Impact"))
story.append(Spacer(1, 18))

story.append(Paragraph(
    "Water scarcity is accelerating worldwide. The United Nations projects that by 2030, global water "
    "demand will exceed supply by 40%. Data centers -- responsible for an estimated 2% of U.S. freshwater "
    "withdrawals -- represent one of the fastest-growing sources of industrial water consumption.", body))
story.append(Spacer(1, 12))

# Dark banner — hero stat
story.append(DarkBanner(
    "412M", "Gallons Saved in 2025",
    "Equivalent to the annual water supply for 12,400 U.S. households, or filling 624 Olympic swimming pools.",
    BLUE, 100,
))
story.append(Spacer(1, 16))

# Progress bars — quarterly savings (visual, not tabular)
story.append(Paragraph("QUARTERLY SAVINGS TRAJECTORY", label_style))
story.append(Spacer(1, 4))
story.append(ProgressBar("Q1  --  62 facilities, 3,820 nodes", 78.4, 130, "78.4M gal", HexColor("#94A3B8")))
story.append(ProgressBar("Q2  --  71 facilities, 4,610 nodes", 94.1, 130, "94.1M gal", CYAN))
story.append(ProgressBar("Q3  --  79 facilities, 5,440 nodes", 112.7, 130, "112.7M gal", BLUE))
story.append(ProgressBar("Q4  --  87 facilities, 6,240 nodes", 126.8, 130, "126.8M gal", BLUE_DARK))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "<i>Gallons saved = delta between baseline (pre-Droplet) and actual consumption, "
    "normalized for workload intensity (kW/rack).</i>", footnote))
story.append(Spacer(1, 14))

# Equivalencies — two-column layout
story.append(Paragraph("PUTTING IT IN PERSPECTIVE", label_style))
story.append(Spacer(1, 6))

equiv_left = [
    Paragraph("<font color='#0066FF'><b>12,400</b></font> households supplied for a year", body_sm),
    Spacer(1, 6),
    Paragraph("<font color='#06B6D4'><b>624</b></font> Olympic swimming pools filled", body_sm),
]
equiv_right = [
    Paragraph("<font color='#10B981'><b>9,200</b></font> acres of farmland irrigated", body_sm),
    Spacer(1, 6),
    Paragraph("<font color='#8B5CF6'><b>3.1M</b></font> people with drinking water for a day", body_sm),
]
eq_t = Table([[equiv_left, equiv_right]], colWidths=[CONTENT_W/2, CONTENT_W/2])
eq_t.setStyle(TableStyle([
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 0),
]))
story.append(eq_t)
story.append(Spacer(1, 16))

# Carbon co-benefits — dark banner (different accent)
story.append(DarkBanner(
    "1,840", "Metric Tons CO2e Avoided",
    "Equivalent to removing 398 passenger vehicles from the road for one year. Based on EPA WaterSense methodology.",
    GREEN, 95,
))


# ──────── 04 PLATFORM & SENSOR NETWORK ────────
story.append(PageBreak())
story.append(SectionDivider("04", "Platform & Sensor Network"))
story.append(Spacer(1, 18))

# Spec sheet — dotted leader style (not a table)
story.append(Paragraph("SENSOR NODE PRO  /  HARDWARE SPECIFICATIONS", label_style))
story.append(Spacer(1, 8))

specs = [
    ("Flow Accuracy", "+/- 0.5% of reading"),
    ("Pressure Range", "0 - 200 PSI (0 - 13.8 bar)"),
    ("Temperature Range", "-10C to 85C"),
    ("Conductivity", "0 - 2,000 uS/cm"),
    ("Connectivity", "Wi-Fi 6  /  LoRa  /  Ethernet"),
    ("Sampling Rate", "Up to 100 Hz (configurable)"),
    ("Power", "PoE (802.3af) or 5V USB-C"),
    ("Enclosure Rating", "IP67 (dust-tight, waterproof)"),
    ("Dimensions", "72 x 54 x 38 mm"),
    ("Certifications", "FCC, CE, UL 61010-1"),
]
for k, v in specs:
    story.append(KeyValueRow(k, v))
story.append(Spacer(1, 18))

# Gateway — clean paragraph
story.append(Paragraph("WIRELESS MESH GATEWAY", label_style))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "Each gateway aggregates telemetry from up to 250 sensor nodes over LoRa mesh (1.2 km range). "
    "Data is encrypted end-to-end (AES-256) and forwarded via redundant LTE / Ethernet uplink. "
    "In 2025: <b>142 gateways deployed</b>, <b>99.94% packet delivery rate</b>.", body))
story.append(Spacer(1, 16))

# Droplet AI — stat strip + description
story.append(Paragraph("DROPLET AI", label_style))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "A conversational interface for querying water systems in natural language. Fine-tuned on sensor "
    "telemetry, historical trends, and facility metadata to deliver actionable insights -- from "
    "predicting pipe fouling 72 hours early to optimizing flow rates for mixed GPU/CPU workloads.", body))
story.append(Spacer(1, 8))

story.append(StatStrip([
    ("148K", "QUERIES HANDLED", BLUE),
    ("4.7/5", "USER SATISFACTION", GREEN),
    ("72hr", "PREDICTIVE WINDOW", CYAN),
]))
story.append(Spacer(1, 14))

# AI categories — progress bars as % breakdown
story.append(Paragraph("TOP QUERY CATEGORIES", label_style))
story.append(Spacer(1, 4))
story.append(ProgressBar("Anomaly Investigation", 38, 50, "38%", BLUE))
story.append(ProgressBar("Optimization Requests", 31, 50, "31%", CYAN))
story.append(ProgressBar("Predictive Maintenance", 22, 50, "22%", GREEN))
story.append(ProgressBar("System Health Checks", 9, 50, "9%", MUTED))


# ──────── 05 CLIENT OUTCOMES ────────
story.append(PageBreak())
story.append(SectionDivider("05", "Client Outcomes"))
story.append(Spacer(1, 18))

story.append(Paragraph(
    "Anonymized results from three enterprise deployments completed in 2025. "
    "All figures verified by clients' sustainability teams.", body))
story.append(Spacer(1, 10))

# Clean table — minimal style
story.append(data_table(
    ["METRIC", "HYPERSCALER A", "COLO PROVIDER B", "ENTERPRISE C"],
    [
        ["Facility Size", "42 MW", "18 MW", "6 MW"],
        ["Nodes Deployed", "840", "360", "120"],
        ["Baseline WUE", "1.80 L/kWh", "2.10 L/kWh", "2.45 L/kWh"],
        ["Post-Droplet WUE", "1.22 L/kWh", "1.51 L/kWh", "1.68 L/kWh"],
        ["Water Saved (Annual)", "186M gal", "54M gal", "14M gal"],
        ["Cost Savings (Annual)", "$12.4M", "$3.6M", "$0.9M"],
        ["Payback Period", "4.2 months", "5.8 months", "7.1 months"],
        ["ROI (Year 1)", "842%", "614%", "489%"],
    ],
    col_widths=[1.8 * inch, 1.55 * inch, 1.55 * inch, 1.55 * inch],
))
story.append(Spacer(1, 20))

# Quote — accent bar style (not boxed)
story.append(AccentQuote(
    '"Droplet gave us visibility we never had. Within 60 days, we identified '
    '3.2 million gallons per month of waste from over-provisioned cooling loops '
    'that our BMS completely missed."',
    "-- VP of Infrastructure, Hyperscaler A"
))
story.append(Spacer(1, 20))

# NPS — big single stat, no box
nps_left = [
    Paragraph("78", ParagraphStyle("NPSBig", fontName="Helvetica-Bold", fontSize=52, textColor=BLUE)),
    Paragraph("Net Promoter Score", ParagraphStyle("NPSLabel", fontName="Helvetica", fontSize=9, textColor=MUTED)),
]
nps_right = [
    Spacer(1, 10),
    Paragraph("Top 1% of B2B infrastructure SaaS products. "
              "Client retention rate: <b>100%</b> -- zero churn across all contracted accounts in 2025.", body),
]
nps_t = Table([[nps_left, nps_right]], colWidths=[1.5 * inch, CONTENT_W - 1.5 * inch])
nps_t.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0)]))
story.append(nps_t)


# ──────── 06 OPERATIONAL FOOTPRINT ────────
story.append(PageBreak())
story.append(SectionDivider("06", "Operational Footprint"))
story.append(Spacer(1, 18))

story.append(Paragraph(
    "We hold ourselves to the same standard we set for our clients. Below is a transparent "
    "accounting of Droplet's own resource consumption.", body))
story.append(Spacer(1, 10))

story.append(data_table(
    ["CATEGORY", "2024", "2025", "CHANGE"],
    [
        ["Cloud Compute (MWh)", "142", "218", "+54%"],
        ["Cloud Emissions (tCO2e)", "12.4", "14.8", "+19%"],
        ["Office Energy (MWh)", "38", "41", "+8%"],
        ["Business Travel (tCO2e)", "24.1", "18.6", "-23%"],
        ["Hardware Shipped (units)", "1,820", "4,640", "+155%"],
        ["Packaging Waste (kg)", "410", "320", "-22%"],
        ["Total Scope 1+2 (tCO2e)", "51.2", "56.8", "+11%"],
        ["Total Scope 3 (tCO2e)", "128.4", "142.1", "+11%"],
    ],
    col_widths=[2.6 * inch, 1.2 * inch, 1.2 * inch, 1.45 * inch],
))
story.append(Spacer(1, 16))

# Emissions intensity — dark banner
story.append(DarkBanner(
    "-47%", "Emissions Intensity Reduction",
    "tCO2e per million gallons saved declined from 0.38 to 0.20. Committed to Scope 1+2 carbon neutrality by end of 2026.",
    GREEN, 95,
))
story.append(Spacer(1, 18))

# Team — side-by-side stat + text
team_left = [
    Paragraph("28 > 64", ParagraphStyle("TeamBig", fontName="Helvetica-Bold", fontSize=28, textColor=BLUE)),
    Paragraph("EMPLOYEES", label_style),
]
team_right = [
    Spacer(1, 4),
    Paragraph(
        "Sustainability committee (CEO, CTO, VP Ops, 2 independent advisors) meets quarterly. "
        "Appointed Head of Sustainability in Q3 2025 for reporting and third-party verification.", body_sm),
]
team_t = Table([[team_left, team_right]], colWidths=[2 * inch, CONTENT_W - 2 * inch])
team_t.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0)]))
story.append(team_t)


# ──────── 07 GOALS & ROADMAP ────────
story.append(PageBreak())
story.append(SectionDivider("07", "Goals & Roadmap"))
story.append(Spacer(1, 18))

story.append(Paragraph("2026 TARGETS", label_style))
story.append(Spacer(1, 8))

goals = [
    ("1B gal", "Cumulative Lifetime Savings", "Expand to 150+ facilities, increase avg waste reduction to 40%.", BLUE),
    ("48hr", "Predictive Maintenance GA", "Advance detection of pipe scaling, fouling, and valve degradation.", CYAN),
    ("Net Zero", "Carbon-Neutral Operations", "Verified renewable energy credits and direct air capture partnerships.", GREEN),
    ("Apache 2.0", "Open-Source Firmware", "Release Sensor Node Pro firmware for community-driven innovation.", VIOLET),
    ("v2.0", "WEI Standard Update", "Real-time weather normalization, workload-aware baselines, Scope 3 water.", AMBER),
    ("2 Hubs", "EMEA & APAC Expansion", "Regional support in Amsterdam and Singapore for growing international demand.", BLUE),
]

for val, title, desc, color in goals:
    # Each goal: colored value on left, title + desc on right
    g_left = [Paragraph(val, ParagraphStyle("GVal", fontName="Helvetica-Bold", fontSize=16, textColor=color))]
    g_right = [
        Paragraph(f"<b>{title}</b>", ParagraphStyle("GTitle", fontName="Helvetica-Bold", fontSize=10, textColor=DARK, spaceAfter=2)),
        Paragraph(desc, body_sm),
    ]
    g_t = Table([[g_left, g_right]], colWidths=[1.3 * inch, CONTENT_W - 1.3 * inch])
    g_t.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ("LINEBELOW", (0,0), (-1,-1), 0.25, BORDER),
    ]))
    story.append(g_t)
    story.append(Spacer(1, 6))

story.append(Spacer(1, 16))
story.append(AccentQuote(
    '"Every gallon we save is a gallon that stays in rivers, aquifers, and communities. '
    'The data center industry has an opportunity -- and an obligation -- to lead on water '
    'stewardship. We intend to make that leadership inevitable."',
    "-- Droplet Leadership"
))


# ──────── 08 APPENDIX ────────
story.append(PageBreak())
story.append(SectionDivider("08", "Appendix"))
story.append(Spacer(1, 18))

story.append(Paragraph("MEASUREMENT METHODOLOGY", label_style))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "All water savings use a before/after methodology aligned with IPMVP Option C (Whole Facility). "
    "Baseline: minimum 90-day pre-deployment monitoring via BMS + utility meters. Post-deployment "
    "savings: delta between projected baseline (adjusted for IT load, temp, humidity) and actual "
    "metered consumption. Regression models validated to R-squared > 0.92.", body))
story.append(Spacer(1, 10))

story.append(Paragraph("SENSOR CALIBRATION", label_style))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "Factory-calibrated against NIST-traceable standards. Automatic field recalibration every 90 days "
    "via zero-point drift correction. Nodes drifting beyond +/- 1.5% flagged for inspection. "
    "2025 field replacement rate: <b>0.3%</b>.", body))
story.append(Spacer(1, 10))

story.append(Paragraph("DATA GOVERNANCE", label_style))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "Encrypted in transit (TLS 1.3) and at rest (AES-256). Single-tenant database partitions. "
    "24-month default retention. SOC 2 Type II examination Q3 2025: <b>zero findings</b>.", body))
story.append(Spacer(1, 10))

story.append(Paragraph("THIRD-PARTY VERIFICATION", label_style))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "Environmental claims reviewed by Apex Companies, LLC. Carbon emissions per GHG Protocol "
    "Corporate Standard and EPA eGRID factors (2024). Verification statement available on request.", body))
story.append(Spacer(1, 30))

# Disclaimer — minimal
story.append(thin_rule())
story.append(Paragraph(
    "This report contains forward-looking statements. Actual results may differ materially. "
    "Figures are unaudited unless noted.  |  2026 Droplet, Inc. All rights reserved.  |  "
    "Droplet, Sensor Node Pro, and the Droplet logo are trademarks of Droplet, Inc.", footnote))


# ══════════════════════════════
# Generate
# ══════════════════════════════
doc = ReportDocTemplate(
    OUTPUT,
    pagesize=letter,
    title="Droplet -- Annual Sustainability Report 2025",
    author="Droplet, Inc.",
    subject="Annual Sustainability Report",
    creator="Droplet Report Generator",
)

doc.build(story)
print(f"Report generated: {OUTPUT}")
