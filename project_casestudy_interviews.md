# Case Study Interview — Raw Reference

Rob Jones, Product Designer. Extracted from conversation transcript (af84bd62 session, 2026-03-15).
This document preserves Rob's exact words and the questions that prompted them, organized by project.

---

## HONEYWELL — Full Interview

**Date of interview:** 2026-03-15

### Setup / Context

Claude asked: "Starting with Honeywell since it's your most significant and recognizable role."

**Initial questions asked:**
1. What was the product exactly — who used it and what were they trying to accomplish day-to-day when they opened it?
2. What was broken or missing when you joined? What did the experience look like before your work?
3. Walk me through one specific dashboard or feature you're most proud of — what was the problem, what did you design, and how did it land with users?
4. What did your research process actually look like? You mentioned screeners and moderated interviews — how many sessions did you run, and what's an example of a finding that directly changed a design?
5. The SUS score went from the low 70s to the low 80s — what do you think drove that improvement most?
6. Is there anything the current case study copy gets wrong or undersells?

---

### Rob's Answer — Round 1

> "So with Honeywell I worked on 2 different products one for Warehouse Operations and one for Asset Performance Management for Industrial Engineers. With the Warehouse Operations platform I built the Merge Dashboard and Homepage, both shipped. As well as incremental changes to the platform entirely and a in depth heuristic review based on Jakob Nielsen's 10 Usability Heuristics in Interaction Design"

---

### Claude Follow-up Questions — Round 2

**On Warehouse Operations:**
1. Who were the users — warehouse workers, managers, logistics coordinators?
2. What was the Merge Dashboard? What problem did it solve and what does "merge" mean in that context?
3. What did the Homepage look like before vs. after your work?
4. The heuristic review — was that something you proposed or were you assigned it? And did it actually change anything, or was it more of a documentation exercise?

**On APM:**
5. The APM platform — what were the dashboards showing? Equipment health? Predictive maintenance alerts? Something else?
6. Which specific dashboards did you own on APM, and is there one that best represents your work there?

---

### Rob's Answer — Round 2

> "For Warehouse Operations the users were Operational Managers mainly to oversee logistics and understand packaging P&A, Inbound and Outbound. Mainly I was working on P&A, Outbound. and Merge was part of that since it is sometimes inbetween the two. The merge dashboard helped managers understand bottlenecks before it got to outbound conveyer belts to trucks. They could see whether there assets were running or in downtime and understand what parts of the Merge were being affected and how to switch around things for fastest outbound. Merge means what it says it takes multiple sources and merges them to the correct avenues or conveyer lanes. So there was no Homepage. I worked with a researcher to build the homepage from the ground up. We did a lot of research together and I built many iterations of the Homepage. The Homepage allowed the user to understand what the top KPIs were and what was being affected in terms of assets and areas of downtime. It allowed the user to look up Knowledge Based articles to get help and find resources for the platform. Which I helped design the KBA's and documentation too. It surfaced the important KPIs, and the important areas to look at for downtime. I did a lot of desk research competitive review and affinity mapping to understand the problem. The heuristic review was an assignment that I first got from Honeywell when I got there. I did a full review of the platform that informed the designers of things that can be fixed within the figma designs as well as the shipped product. With APM I worked on a redesign of Asset Health which showed an overview of the plant such as what assets were being affected by Downtime, RUL Remaining Useful Life, OEE, and other metrics and KPIs. They would be able to tell what the top assets that need attention. As well as Case Management for different assets. Then I worked on Asset Details from the ground up which showed a detail picture of the Asset in different metrics such as temperature, volume..etc.. and its subassets and what were being affected for that. It was broken down into 3 levels of modular components. First being Reliability understanding, Then Maintenance understanding and then Performance understanding. It showed all things that you are saying for Asset Details, Equipment Health ie Maintenance and Predictive alerts that go into trends. I then worked on another dashboard that I don't remember what it was called because it was a while ago but it showed the performance of the compressors load and details of it. I designed that from the ground up. as well as another dashboard I don't remember from the ground up. I also did iterative design throughout the platform on all the dashboards to help other designers get their job done."

---

### Claude Follow-up Questions — Round 3

**On Warehouse Operations:**
1. P&A — is that Pack and Assemble, or something else?
2. The Homepage research — you mentioned affinity mapping and competitive review. Did that research produce any specific insight that changed the direction of the design?
3. The heuristic review — did it ever get acted on? Did specific issues from it make it into shipped work?

**On APM:**
4. The SUS scores going from low 70s to low 80s — was that measured across both products, or specifically APM?
5. Asset Details with the 3-level modular breakdown (Reliability / Maintenance / Performance) — whose idea was that structure? Did it come from research, from you, from the PM?
6. The compressor dashboard — do you remember if it was for a specific industry vertical, like oil & gas or power generation?

**On both:**
7. What are you most proud of across the three years — a specific decision, a moment with a user, a design that really worked?
8. Is there anything about the Honeywell work the current case study copy undersells or gets wrong?

---

### Rob's Answer — Round 3

> "1. It means print and apply to get ready for outbound. 2. Yes all the research informed direction and what the user needed such as what areas are affected and need drilling down and what the top KPIs are (I don't remember them) that show the overall quality of the plant. 3. Yes, it got acted upon I worked on UXQA to ensure that the changes were made to the platform such as typography hierarchy, affordances for scrappy buttons that didn't have any, labels for the dropdown menus, spacing issues, and naming conventions. 4. It was low 70s to high 80s. That research was specific to APM, Asset Health and Asset Details. Asset Health was a redesign so I made changes to colors, affordances, metrics used, and some KPIs that went there yet and adjusted the whole page so these changes improved usability scores in moderated studies. 5. It came from a mixture of research, talking to Subject Matter Experts, and Product Managers. It was a conversation we had based on a few iterations we changed directions. The iterations tested well but they wanted more data points on a single page so this was the decision. I had done research and users liked the information broken up into tab approach but the product manager and subject matter experts wanted to see it all on one page... which is cognitive overload and the tab approach would of been better but they disagreed and wanted the single page. The compressor performance page was for the performance suite within APM. It was an addon that companies could buy to further understand what was happening to their assets. It was used for oil & gas as well as chemical manufacturing... which probably used oil and gas. Shell was one of our customers and a few others I don't remember. APM was made as a platform for industrial domain in its entirety and to fit for multiple verticals within the industrial. 7. Some of the most proud moments I had were leading the research for Asset Health and Asset Details. Using researchers past screeners and data. I designed a screen for UserTesting and wrote out interview scripts.... I took a class with Dovetail to further understand how to write interview scripts and user testing and concept testing with moderated tests. I really enjoyed that. I am shy though so I am not great at presenting but I do like doing research and going through data and creating affinity maps. I also really enjoyed working on Asset Details and UXQA throughout to ensure that all design decisions were implemented correctly because I know it worked based on feedback and the changes. 8. Last question. Yes. I think we generalize all the work into one case study so the Problem isn't really a problem it's just an overview of what I did which is in my resume."

---

### Decision: Split into Two Case Studies

Claude asked: Do you want to split these into two separate case studies, or keep them as one?

Rob's answer:
> "Let's have two. Write the case studies with proper things based on what I told you and add placeholders for the assets with text within the placeholder telling me what kind of asset is needed and whether video or photo would work better."

On assets:
> "I don't have figma files besides the final product so no screenshots of what I did or the process so I need to recreate all of them. I signed an NDA so I am not sure if I can use the final product but I would like to do a quick redesign of it without branding and finalized touches."

---

## KEY FACTS — Honeywell APM

- **Role:** UX Designer
- **Duration:** 3 years (April 2022 – June 2025)
- **Platform:** Asset Performance Management (APM) — used by reliability and maintenance engineers in industrial operations
- **Customers:** Shell and others (oil & gas, chemical manufacturing)
- **Specific dashboards designed:**
  - Asset Health — redesign of existing dashboard (not designed from scratch)
  - Asset Details — designed from scratch
  - Compressor Performance dashboard — designed from scratch (for APM Performance Suite add-on)
  - Another dashboard from scratch (Rob doesn't remember the name)
- **Asset Health changes:** Colors, affordances, metrics used, KPI reorganization
- **Asset Details structure:** 3 levels — Reliability (RUL, failure risk), Maintenance (alerts, case management), Performance (OEE, operational metrics). Sub-asset drill-down included.
- **SUS scores:** Low 70s → high 80s (specific to APM — Asset Health and Asset Details)
- **Research process:** Used researchers' past screeners as starting point, wrote new interview scripts and usability test designs for UserTesting, ran moderated sessions and concept testing. Took a Dovetail course on writing moderated test scripts.
- **The tab vs. single-page conflict:** Research showed users preferred tab approach to reduce cognitive load. PM and SMEs wanted all data on single page. Single page won. Rob believes tab approach would have been better but designed within the constraint using the 3-level modular breakdown.
- **UXQA work:** Typography hierarchy, button affordances, dropdown labels, spacing, naming conventions — verified changes were correctly implemented
- **Team setup:** Agile team with PM and engineering; also provided iterative design support across other designers' dashboards
- **Research tools used:** Miro (affinity mapping), UserTesting, Dovetail (for learning interview script methodology)
- **Rob is shy about presenting** but genuinely enjoys research and affinity mapping
- **No Figma files available** — signed NDA, cannot show shipped product without rebranding

---

## KEY FACTS — Honeywell Warehouse Operations

- **Platform:** Warehouse Operations — separate product from APM, different users
- **Users:** Operational Managers (not warehouse floor workers) — overseeing logistics
- **P&A:** Print and Apply — getting labels applied to packages ready for outbound
- **Workflows covered:** P&A (Print & Apply), Outbound, and Merge
- **Merge Dashboard:**
  - Merge = multiple conveyor sources combining into outbound lanes
  - Problem: managers couldn't see bottlenecks before they hit outbound belts
  - Solution: dashboard showing asset status (running vs. downtime) and which Merge areas were affected, so managers could reroute for maximum throughput
  - Both Merge Dashboard and Homepage shipped
- **Homepage:**
  - There was no homepage when Rob arrived — built from scratch with a researcher
  - Research methods: desk research, competitive review, affinity mapping
  - Research informed which KPIs to surface and which downtime areas to flag
  - Features: top KPIs, downtime areas, Knowledge Base Article access
  - Rob also helped design the KBA structure and documentation content
  - Built many iterations, validated with users at each step
- **Heuristic Review:**
  - First assignment when joining Honeywell
  - Based on Jakob Nielsen's 10 Usability Heuristics
  - Full platform audit documenting violations in Figma files and shipped product
  - Got acted on — Rob led UXQA to verify fixes were applied: typography hierarchy, button affordances, dropdown labels, spacing, naming conventions
- **Assets status:** No Figma files; NDA signed; will create de-branded recreations

---

## KEYTRN — Background Facts (from pre-interview mentions and projects.js)

*Note: No formal interview was conducted for Keytrn in this session. Content below is from Rob's mentions across the conversation and pre-existing projects.js data.*

- **Type:** Dual-sided PropTech platform — government data entry tool + consumer property browser
- **Focus:** Tax-delinquent and foreclosure property data in Pennsylvania
- **Research approach:** Called Pennsylvania county offices directly (20+ municipalities) to understand judicial, upset, and repository sale workflows
- **Research tools:** NotebookLM to organize call notes by county; AI to summarize patterns and surface inconsistencies
- **Government side designed:** Manual data entry, PDF upload, Excel import, modal-to-data-table interactions
- **Consumer side designed:** Property browsing experience (Zillow-like), handling variable listing data (photos, satellite imagery, bed/bath counts, acreage, legal status)
- **Rob's role:** Sole designer across both product sides simultaneously
- **Duration:** 5 months
- **Team:** 1 Designer, Founding Team
- **UGA Business Law Clinic:** Entity structure, IP, equity agreements — was involved but Rob was waiting to review documents before adding to case study
- **Videos created:** Prototype demo, NotebookLM research session, Miro IA map, Figma architecture — all hosted on Cloudinary

---

## AYSA — Background Facts (from conversation mentions and projects.js)

*Note: No formal interview was conducted for Aysa in this session. Content below is from Rob's mentions across the conversation.*

- **Product:** Corporate transparency app — surfaces tax avoidance, profit margins, CEO-to-worker pay gaps; longer-term vision for camera-based product search
- **Outcome:** 15,000+ views in first social rollout on LinkedIn and Instagram
- **Pitch deck:** Redesigned from scratch, being actively used in $2.1M seed round investor outreach
- **Timeline:** MVP shipped in under 2 weeks
- **Rob's role:** Sole designer, worked directly with founder
- **What Rob built:** Foundational UI kit (color tokens, card components, responsive column framework); restructured information hierarchy using UX principles; rebuilt pitch deck
- **Duration listed:** 4 months (longer engagement than the 2-week sprint)
- **Team:** 1 Designer, 1 Founder

---

## SINTA — Background Facts (from conversation mentions and projects.js)

*Note: No formal interview was conducted for Sinta in this session. Content below is from Rob's mentions and Wellfound population discussion.*

- **Product:** HR interview platform — "next-generation interview experience"
- **How Rob got the work:** Found via Upwork
- **Rob's role:** Sole freelance designer, full autonomy
- **What Rob delivered:** All screens for the complete product — no existing designs, flows, or visual language when he started
- **Process:** Worked directly from founder conversations, iterated based on founder feedback and early user responses
- **Duration:** 5 months
- **Team:** 1 Designer, 2 Founders
- **Why engagement ended:** Left for full-time UX Designer role at Honeywell; ended on good terms
- **Year:** 2022

---

## ALONESY — Background Facts (from conversation mentions)

*Note: No formal interview conducted. Content from brief mentions.*

- **Product:** Mentor-to-mentee app
- **What Rob did:** UX and UI design — research, design iterations, handoff. No branding.
- **Rob's role:** Freelance designer (solo)
- **Status:** Rob confirmed this was a 0→1 freelance engagement like the others

---

## COFFEE & BANANAZ — Background Facts (from conversation, line 1879)

*Note: No formal interview conducted.*

Rob's exact words:
> "It was a small creative agency and I built their website on Webflow including a template for case studies. I also helped build a webpage for a client"

- Built agency website on Webflow from scratch
- Created reusable case study template
- Built a client-facing webpage as part of an agency engagement
- Year not confirmed during conversation

---

## JUSTICE DEMOCRATS / POLITICAL ADVOCACY — Background Facts (from conversation, lines 1882-1889)

Rob's exact words:
> "what about national political advocacy group? where I worked in wordpress on politicians campaign websites and helped maintain them"

When asked the org name:
> "It was Justice Democrats but I don't want to show that I am a democrat"

- Maintained campaign websites for political candidates on WordPress
- Content updates and site maintenance across multiple active campaigns
- Not to be named in portfolio or resume — list as "Political Advocacy Organization"

---

## METRICS & NUMBERS — Cross-Project Reference

| Project | Key Number | Source |
|---|---|---|
| Honeywell APM | SUS: low 70s → **high 80s** | Rob confirmed in interview (correction from earlier "low 80s" in projects.js) |
| Honeywell | 7+ dashboards shipped across both products | Multiple mentions |
| Honeywell | 3 years (April 2022 – June 2025) | Rob confirmed |
| Aysa | **15,000+ views** first social rollout | Multiple mentions |
| Aysa | **$2.1M seed round** pitch deck | Multiple mentions |
| Aysa | MVP in **under 2 weeks** | Multiple mentions |
| Keytrn | **20+ municipalities** researched | Multiple mentions |
| Sinta | **5 months** engagement | Multiple mentions |
| Rob's career | **4+ years** total design experience | Rob confirmed |

---

## INTERVIEW FOLLOW-UP PLAN

Interviews were only completed for Honeywell in this session. Still needed:

- [ ] **Keytrn** — formal interview (process, research depth, specific decisions)
- [ ] **Aysa** — formal interview (founder relationship, what exactly was the app, design process, pitch deck story)
- [ ] **Sinta** — formal interview (Upwork context, what the interview platform actually did, design decisions)
- [ ] **Alonesy** — formal interview (what the mentorship app did, who it was for, what Rob designed)

To start: "let's do the case study interviews" and go one project at a time.
