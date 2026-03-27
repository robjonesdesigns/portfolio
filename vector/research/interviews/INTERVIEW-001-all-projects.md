---
name: Project interviews — Rob's words
description: Raw interview notes from conversations with Rob about each project — use this to write accurate case study copy and understand his actual experience
type: project
---

# Project Interviews — Rob's Own Words

Use this when writing or editing case study copy. These are Rob's actual answers, not summaries from projects.js.

---

## Honeywell APM (interviewed 2026-03-15) — Rob was at Honeywell for 3 years, not 4

**Users:** Reliability engineers at industrial companies like Shell. Depended on dashboards to catch equipment failures before they happened. A missed signal = unplanned downtime, costly repairs, potential safety incidents.

**Asset Health:** Was already existing when Rob got to it. Had broken affordances, unclear hierarchy, bad KPI organization. Rob redesigned it — updated colors, fixed affordances, reorganized KPI hierarchy. His mid-fidelity wireframes tested in the low 70s on the SUS. Through iteration, scores reached the high 80s. DO NOT say the original dashboard tested in the low 70s — that was Rob's first iteration, not the original.

**Asset Details:** Built from scratch. No existing design. 3-level modular structure: Reliability (RUL, failure risk), Maintenance (alerts, case management), Performance (OEE, operational metrics). Sub-asset drill-down.

**Key tension:** Rob's research supported a tab-based IA to reduce cognitive load. PM and SMEs pushed for single-page showing all data at once. Rob advocated for tabs based on research — the decision went to single page. The 3-level modular structure was how he designed for that constraint without overwhelming the user.

**Research process:** Wrote screeners and interview scripts from scratch, using the research team's past work as a starting point. Took a Dovetail course specifically to sharpen moderated test writing — wanted to make sure he was testing the right things and not leading participants. Ran sessions on UserTesting. Affinity mapped findings in Miro after each round.

**Compressor dashboard:** Also designed the Compressor Performance/Load dashboard for the APM Performance Suite — used in oil & gas and chemical manufacturing.

**Outcome:** SUS scores went from low 70s → **high 80s** (not "low 80s" — confirm before publishing). Shipped dashboards used by Shell and other industrial operators.

**Accessibility pushback:** Rob pushed back on accessibility shortcuts via video calls and emails — not in person. The people involved were: Head of Product Design for APM, a couple of senior engineers, and a subject matter expert who had worked as an engineer himself in the field.

**Personal notes:** Rob is shy about presenting but genuinely enjoys research and affinity mapping.

---

## Honeywell Warehouse (interviewed 2026-03-15)

**Users:** Operational Managers overseeing Print & Apply (P&A), Inbound, and Outbound logistics.

**The Merge:** Multiple conveyor sources combining into outbound lanes. Managers couldn't see bottlenecks forming upstream — by the time they knew there was a problem, it had already hit the outbound belts. No way to reroute at that point.

**First assignment:** Full heuristic evaluation of the existing platform using Nielsen's 10 Usability Heuristics. First thing he did after joining. Documented every violation — buttons with no affordances, unlabeled dropdowns, inconsistent typography, spacing issues. Presented findings to the design team. Became the foundation for UXQA work.

**UXQA:** After the heuristic review, he drove platform-wide fixes — reviewed implemented changes to verify affordances, typography hierarchy, dropdown labels, spacing, naming conventions were correctly applied.

**Homepage:** Built from scratch with a researcher. Did desk research, competitive reviews, affinity mapping to figure out which KPIs and operational areas mattered most. Built and tested multiple iterations, validating content priority and layout with users. Goal: a single starting point where a manager could immediately understand the state of their operation.

**Knowledge Base Articles:** Also contributed to the KBA structure and documentation content itself.

**Merge Dashboard:** Real-time visibility into asset status and conveyor lane performance. Managers could see which parts of the Merge were running or in downtime and make rerouting decisions for maximum throughput.

---

## Keytrn (formally interviewed 2026-03-16)

**Origin:** Friends Justin and Kristen had the idea — foreclosure data is buried across county tax websites, PDFs, separate parcel search tools. You have to do heavy due diligence across multiple sources or go to the county office and pay for a list. Rob pushed the idea further: instead of just buying lists, build a government portal so counties can upload and manage their own data.

**Why the portal idea:** Data freshness (lists go stale fast), scalability (visiting each county individually doesn't scale to other states), data quality (lists give you very little — the portal enables enriched, structured data). Also gives counties something valuable back: a dashboard to see their own inventory, track what's moving and what isn't, support neighborhood health and reduce tax blight.

**Co-founders:** Justin, Kristen (had personally bought a house through foreclosure — knew the process firsthand), and another friend who helped write the county call script. Rob drove structure: downloaded Teams, bought the business subscription, scheduled meetings, recorded them in notes and loaded into NotebookLM to track decisions and summaries. Kristen added agendas. Early meetings were unorganized until Rob systematized them.

**Target market:** Pennsylvania first — that's where Justin and Kristen lived and had bought property.

**County research:** Built an Excel sheet with every county, phone numbers, websites, call notes, and outcome tracking. Called county by county with a script. Calls were 5–10 minutes max — county workers have no time. Learned: the system is chaotic and inconsistent across counties. Each county runs independently, no standardization. Sale types vary: judicial, upset, repository, sheriff sales. Different workflows, different data formats, different processes county to county.

**Impact on design:** Chaos across counties + short attention spans drove the government portal toward simplicity and speed. Left nav to switch sections. Tabs within sections to preserve context (e.g., switch from Upload back to a property detail without losing place). Search, Upload, Management as the three core areas. Admin role for adding county team members. Recognized missed question: should have asked how many people per county manage foreclosures — would have informed user management design.

**Sale type decision:** Judicial, upset, repository, sheriff sales are opaque to regular buyers. Designed explicit badge on listing cards to show sale type. Detail screen includes plain-language explanation of what that sale type means and what the buyer is getting into. Decision: educate, don't assume knowledge.

**Conference — Savannah tax property conference:** Found investor-facing platforms that didn't appear in competitive research because they're paywalled. $100+/month, data-rich, built for real estate investors. Confirmed original direction. Foreclosure data is currently only accessible to investors who monetize it. Regular people — first-time buyers, people who need affordable housing — have no access to the same data. Mission: give regular homebuyers access to foreclosure data for free. "Where every home has a second chance." Build communities, not just portfolios. Investor tier with deeper API data (roof scores, occupancy signals, etc.) as the revenue model.

**Design system:** Started from a skeleton system. Rebuilt it — changed fonts, color tokens, components, added new components. Ran AB testing with 30 users across 3 color options. Dark forest green and navy blue came out nearly tied. Green = growth and community. Blue = trust, professionalism. Chose blue. Rationale: for a platform handling financial and legal property data, trust wins. Applied AirBnB-level simplicity and friendliness to a government/financial context.

**System architecture:** Defined a 30-step, 4-layer architecture — Access & Authentication, Data Access, Data Processing, Consumer Layer. Each step documented with: purpose, ownership, inputs, outputs, tools/APIs, estimated cost. APIs researched: ArcGIS/TIGER for parcels, NAIP for roof scoring, USPS vacancy data, Census ACS for neighborhood, OSRM/Mapbox for commute, NCES for schools, partner AVM for valuation, Google Street View/Mapbox satellite for images.

**What was designed/prototyped:**
- Consumer: property search → detail flow (complete)
- Government portal: upload flow (manual entry, PDF, CSV, batch uploads), user management (complete), dashboard (half-built)
- Consumer detail screen: photo/satellite imagery (progressive — show what's available), basic property info (rooms, sq footage, acreage), Overview, Taxes, Scores (roof/vegetation/occupancy), Value/Comps, Schools, Commute, Flood/Zoning, Images, Sources, sale type education. Future: title data via LexisNexis or similar partner.

**UGA Business Law Clinic:** Rob applied independently after co-founders couldn't align on entity structure or equity. Problem he identified: non-profit for the government portal + for-profit for consumer app is contradictory — government clients won't pilot a product if they think the company is profiting from their data. B-corp was considered. Rob scheduled the meeting, explained the full idea and the structural conflict, kept them updated with design progress via email. Outcome: law students + supervising professor produced a formal document recommending — LLC in Rob's name, early-stage IP guidance (what to protect and when), equity agreement giving Rob 100% with a plan to distribute once roles were formalized.

**Project status:** Prototypes built, not shipped. Co-founders stalled. Rob poured significant time and energy into it. Equity and ownership now resolved in his favor per UGA recommendation.

---

## Aysa (formally interviewed 2026-03-17)

- Corporate transparency app — helped ethically-minded consumers search, compare, and understand the financials and practices behind products they buy
- At launch: 20,000+ products, 500+ companies, hundreds of thousands of data points tracked
- 4 months total engagement, on and off. Two distinct phases:
  1. Initial 2-week sprint: stressed, no AI, other things pulling his attention — got something shippable out the door but not his best work
  2. Post-MVP iteration (months later): dove deep, fixed the search UX properly, tried to get team feedback but they were quiet — founder liked it a lot but wasn't always a reliable judge
- The iteration phase is where the real design thinking happened — that's what to feature in the case study
- Hardest part: founder wanted to move immediately, Rob pushed back on process but ultimately agreed given life circumstances (caring for brother, recent Honeywell layoff)
- Designed: homepage, product-first search flow, detail pages (profit margins via bar graphs, tax avoidance, CEO-worker pay gap), about, contact
- **Search UX — full story (two iterations):**
  - Founder wanted Google-style search bar at top, defaulting to product search, with buttons below to switch between Product / Tax Avoidance / Pay Gap modes. Problem: users didn't know which mode was active or what the categories meant.
  - Rob's pushback: the copy needed to explain what each mode did. Founder had a strong vision so Rob compromised — kept the search-first approach but replaced the buttons with cards that explained each category with a "click here to search" CTA. Shipped this version.
  - Months later, came back and fixed the UX properly:
    - Changed copy to make clear you're searching for a product — added microcopy examples like "Nike Air Jordans" or "Tesla Model 3" inside the search field
    - Two cards below search: Tax Avoidance and Pay Gap, each with friendly/snarky copy (used AI to add personality), "Discover more" button switches to that search mode
    - Added featured products section below: B-corps and ethical standouts like Patagonia — best-in-class for ethics/treatment of customers
    - Added articles section for ethical consumers below that
  - Lesson: shipped the compromise first, came back with time and fixed the real problem.
- Post-MVP: investor feedback came in, iterated on UX and branding, improved microcopy significantly
- Rebuilt pitch deck from scratch — founder resistant on language initially. Investors/mentors validated Rob's instinct: copy needed to be succinct and speak to a specific audience. Once external voices confirmed it, founder gave Rob more range (with resistance). Rob's approach: push back, compromise, wait for the right meeting to surface what he already knew.
- Founder had strong vision but needed external validation to accept direction changes. Rob's tactic was to agree on what he already knew in those meetings rather than fight solo.
- 15,000+ views in first social rollout (LinkedIn + Instagram)
- Pitch deck used for $2.1M seed round investor outreach
- Built a UI kit: color tokens, card components, responsive column framework
- Equity situation: never paid fairly for post-MVP work. Rob was managing financial precarity throughout — needed income, couldn't give the project full focus.
- **Reflection (Rob's words):** "I'd ask for money upfront so I could put more passion into it constantly rather than be worried about keeping a roof over my head and half-assing it because I needed to either work to make money or look for a job."
- For case study: frame as "I'd negotiate compensation upfront before taking on a project like this again — working without financial security limited how much I could push for the right outcome." Do not mention founder ego or personal conflict.

---

## Sinta (formally interviewed 2026-03-17)

- HR tech platform for recruiters interviewing candidates
- Found via Upwork, ~1 month, 35/hr part-time, solo designer
- Duration note: Rob was dealing with insomnia and unstable housing at the time — it took longer than it should have, but the actual design and conversation was 1 month. "5 months" in older notes is wrong.
- Founders had clear vision, no screens, no flows, no visual language
- Designed from scratch working directly from founder conversations:
  - Interview builder: add stages (screening, panel, debrief, assessment, presentation)
  - Scheduling flow
  - Live interview screen: video call with shortcut buttons to timestamp competencies (Creativity, Independence, etc.) and reactions (green flag, red flag, fire)
  - Three-column post-interview screen: (1) video + timestamp table, (2) transcription + job description tabs, (3) questions/answers/ratings + candidate profile tab; submit button bottom right
  - Candidate scorecard: data table with candidate, interviewer(s), flag counts, rating, HR decision, final decision selector
- Founders implemented the designs and were actively pitching investors — they were excited about the work and Rob's vision
- Rob left to take the Honeywell full-time role before knowing the outcome
- Company still operating as of early 2026 (LinkedIn shows new leadership, but no confirmed acquisition or VC raise — Gemini research shows unfunded/bootstrapped)
- DO NOT claim acquisition or funding raise in copy — Rob inferred this from LinkedIn but it is not confirmed
- Founders later hired arounda.agency to do the finished designs — Rob's work was the 0→1 foundation they built on, not the final shipped product. Frame accordingly.

---

## Additional freelance work (interviewed 2026-03-17)

### Coffee & Bananaz (creative agency, ~3 years)
- Designed and built the agency portfolio site in Webflow (photography, branding, web design work)
- Designed and built a private chef client site (Oscar Rodriguez) — branding, design, Webflow implementation
- Built CMS templates and trained founder to manage content independently
- Listed as employee in agency's about section
- Rate: $35/hr
- Agency recently shut down

### Alonesy (mentorship app, ~3 months, Upwork)
- Mentee-to-mentor app for young people (late teens) needing trusted mentorship
- Founded by a 20-something who felt young people needed support when families fall out
- Team of 3 designers; Rob led the mentee side and co-led research
- Full design cycle: moderated interviews (5 mentors, 5-6 young adults), usability testing, surveys, affinity mapping, personas
- 3 rounds of iteration, low-fidelity to high-fidelity prototype
- Designed: journaling/open writing flow, mentorship finder with mentor profiles, mentee onboarding, suggested mentors, messaging, emergency/self-help resources, editable profile
- MVP shipped; worked with developers to implement; app still live (design has evolved since)

### Brandathon (48-hour design challenge)
- Competitive weekend sprint: 3 teams of 3 designers, stayed up 48 hours designing
- **Republic (cryptocurrency banking + wallet platform):** designed SVGs for branding, website sections, hero page assets using Illustrator and Photoshop. Team did not win. Republic grew significantly and is currently running.
- **VR game:** designed creative/promotional website sections using Illustrator and Photoshop — horror movie references informed color palette and art direction. Team did not win but Rob received a shoutout from professional judges for outstanding art direction, color use, and visual references.
- Rob was junior at the time

### Justice Democrats (political action committee)
- Worked with various political campaigns (senate candidates, etc.)
- Designed campaign artifacts and built/maintained candidate websites using a base template
- Kept sites fresh and updated during active campaigns

### Uchu.Dev (design sprints / consulting)
- Design sprints with founders to prototype and approve mobile, web, and CRM platform designs based on business needs
- Helped with branding and business groundwork
- Worked on a habit-forming app concept (did not ship)
- Resulted in a long-term friendship with the founder

---

## Still needs formal interview

- Honeywell — any additional detail Rob wants to add or correct
