/** Shape of case study entries in src/data/projects.js */

export interface ProcessBulletBlock {
  type: 'bullets'
  items: string[]
}

export interface ProcessParagraphBlock {
  type: 'paragraph'
  text: string
}

export type ProcessBlock = ProcessBulletBlock | ProcessParagraphBlock

export interface ConversationQuote {
  question: string
  response: string
  source: string
}

export interface DesignDecisionBlock {
  problem?: string
  headline?: string
  decision?: string
  why?: string
}

export interface BeforeAfterMedia {
  beforeImage: string
  afterVideo?: string
  afterImage?: string
}

export interface ProcessMediaItem {
  id?: string
  sectionLabel?: string
  followedByInsight?: boolean
  label?: string
  caption?: string
  video?: string
  image?: string
  videoGrid?: string[]
  conversations?: ConversationQuote[]
  conversationsFootnote?: string
  decision?: DesignDecisionBlock
  sectionBreak?: boolean
  beforeAfter?: BeforeAfterMedia
  systemMap?: boolean
}

export interface DesignDecision {
  title: string
  problem: string
  decision: string
  why: string
}

export interface Project {
  slug: string
  title: string
  company: string
  role?: string
  metaProblem?: string
  outcomes?: string[]
  headline: string
  intro?: string
  orientationNote?: string
  liveUrl?: string
  liveUrlNote?: string
  problem?: string
  process?: string | ProcessBlock[]
  outcome?: string
  reflection?: string
  keyInsight?: string
  processMedia?: ProcessMediaItem[]
  designDecisions?: DesignDecision[]
  ugaContent?: string | null | undefined
}
