import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Keytrn logo (inline SVG — no stretching, no expiry) ─────────────────────
const KeytrnLogo = ({ height = 30 }) => (
  <svg height={height} viewBox="0 0 62 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Keytrn" style={{ display: 'block', flexShrink: 0 }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M32.7902 0.879589C34.0844 -0.293194 36.0418 -0.293199 37.336 0.879589L46.4475 9.13616C47.1695 9.79078 47.5825 10.7262 47.5825 11.7075V20.9672C47.5822 22.8727 46.0561 24.4179 44.174 24.4181H37.5346C37.5957 24.6142 37.63 24.8228 37.63 25.0393V29.0002C37.63 30.0202 38.4466 30.8481 39.4541 30.8481H39.8701C40.6475 30.8481 41.2778 31.4855 41.2781 32.2725C41.2781 33.0597 40.6477 33.698 39.8701 33.698H38.2724C37.9175 33.6981 37.63 33.9902 37.63 34.3496C37.6302 34.7087 37.9176 34.9999 38.2724 35H39.8402C40.6342 35.0003 41.2779 35.6519 41.2781 36.4559C41.2781 37.26 40.6343 37.9125 39.8402 37.9128H38.0039C37.9007 39.2257 37.404 40 35.8847 40C33.5057 39.9998 33.5058 37.9928 33.5058 36.7884C33.5058 36.2473 33.4431 35.4014 33.5236 34.6338C33.5206 34.5724 33.5189 34.5106 33.5192 34.4484L33.5558 25.0315C33.5566 24.8181 33.5888 24.6115 33.649 24.4181H26.2062C24.3553 24.418 22.8416 22.9215 22.7977 21.0481L22.5803 11.7558C22.5567 10.7461 22.972 9.77606 23.7153 9.10246L32.7902 0.879589ZM37.174 5.27748C35.8966 4.20472 34.042 4.2194 32.7813 5.3123L27.4744 9.91239C26.7186 10.5679 26.284 11.5255 26.2839 12.5331V17.8713C26.2842 19.7769 27.8101 21.3221 29.6924 21.3222H40.5137C42.3957 21.3219 43.9219 19.7768 43.9222 17.8713V12.5657C43.922 11.5392 43.4698 10.5656 42.6895 9.91014L37.174 5.27748Z" fill="#213694"/>
    <path d="M0.454465 35.2873C0.321156 35.2873 0.212084 35.2444 0.12725 35.1585C0.0424168 35.0726 0 34.9622 0 34.8272V22.8641C0 22.7291 0.0424168 22.6187 0.12725 22.5328C0.212084 22.4469 0.321156 22.4039 0.454465 22.4039H2.74497C2.87828 22.4039 2.98735 22.4469 3.07219 22.5328C3.15702 22.6187 3.19944 22.7291 3.19944 22.8641V26.9499L6.56248 22.7536C6.61096 22.68 6.68973 22.6064 6.7988 22.5328C6.91999 22.4469 7.07754 22.4039 7.27145 22.4039H9.88916C9.99824 22.4039 10.0891 22.4469 10.1618 22.5328C10.2346 22.6064 10.2709 22.6923 10.2709 22.7904C10.2709 22.8763 10.2467 22.95 10.1982 23.0113L5.85351 28.5696L10.5436 34.68C10.5921 34.7291 10.6163 34.8027 10.6163 34.9008C10.6163 34.999 10.5739 35.091 10.4891 35.1769C10.4163 35.2505 10.3315 35.2873 10.2346 35.2873H7.52595C7.3078 35.2873 7.13814 35.2383 7.01694 35.1401C6.90787 35.0419 6.83516 34.9683 6.7988 34.9192L3.19944 30.3732V34.8272C3.19944 34.9622 3.15702 35.0726 3.07219 35.1585C2.98735 35.2444 2.87828 35.2873 2.74497 35.2873H0.454465Z" fill="#213694"/>
    <path d="M15.6666 35.4714C14.2365 35.4714 13.0973 35.0787 12.249 34.2935C11.4006 33.5082 10.9583 32.3426 10.9219 30.7966C10.9219 30.7107 10.9219 30.6002 10.9219 30.4653C10.9219 30.3303 10.9219 30.226 10.9219 30.1524C10.9583 29.1831 11.1704 28.3548 11.5582 27.6677C11.9581 26.9683 12.5035 26.4407 13.1943 26.0849C13.8972 25.7168 14.7152 25.5328 15.6484 25.5328C16.7149 25.5328 17.5935 25.7475 18.2843 26.1769C18.9872 26.6064 19.5144 27.1892 19.8658 27.9254C20.2173 28.6616 20.393 29.5021 20.393 30.4469V30.8886C20.393 31.0235 20.3445 31.134 20.2476 31.2199C20.1627 31.3058 20.0597 31.3487 19.9385 31.3487H14.1214C14.1214 31.361 14.1214 31.3794 14.1214 31.4039C14.1214 31.4285 14.1214 31.453 14.1214 31.4775C14.1335 31.8334 14.1941 32.1585 14.3032 32.453C14.4122 32.7475 14.5819 32.9806 14.8122 33.1524C15.0424 33.3242 15.3212 33.41 15.6484 33.41C15.8908 33.41 16.0907 33.3732 16.2483 33.2996C16.4179 33.2137 16.5573 33.1217 16.6664 33.0235C16.7754 32.9131 16.8603 32.8211 16.9209 32.7475C17.03 32.6248 17.1148 32.5511 17.1754 32.5266C17.2481 32.4898 17.3572 32.4714 17.5026 32.4714H19.7567C19.8779 32.4714 19.9749 32.5082 20.0476 32.5818C20.1324 32.6432 20.1688 32.7352 20.1567 32.8579C20.1446 33.0665 20.0415 33.318 19.8476 33.6125C19.6537 33.907 19.3689 34.2015 18.9932 34.4959C18.6297 34.7781 18.1691 35.0113 17.6117 35.1953C17.0542 35.3794 16.4058 35.4714 15.6666 35.4714ZM14.1214 29.5266H17.1936V29.4898C17.1936 29.0972 17.133 28.7536 17.0118 28.4591C16.9027 28.1647 16.727 27.9377 16.4846 27.7782C16.2543 27.6186 15.9756 27.5389 15.6484 27.5389C15.3212 27.5389 15.0424 27.6186 14.8122 27.7782C14.594 27.9377 14.4243 28.1647 14.3032 28.4591C14.182 28.7536 14.1214 29.0972 14.1214 29.4898V29.5266Z" fill="#213694"/>
    <path d="M23.4523 38.7843C23.3432 38.7843 23.2523 38.7474 23.1796 38.6738C23.1069 38.6002 23.0705 38.5082 23.0705 38.3978C23.0705 38.3732 23.0705 38.3364 23.0705 38.2873C23.0826 38.2505 23.1008 38.2076 23.125 38.1585L24.543 34.6984L21.0527 26.3426C21.0163 26.2567 20.9981 26.1831 20.9981 26.1217C21.0224 26.0113 21.0709 25.9193 21.1436 25.8456C21.2163 25.7598 21.3072 25.7168 21.4163 25.7168H23.4886C23.6462 25.7168 23.7613 25.7598 23.834 25.8456C23.9188 25.9193 23.9734 26.0052 23.9976 26.1033L26.0882 31.4591L28.2151 26.1033C28.2635 26.0052 28.3241 25.9193 28.3968 25.8456C28.4817 25.7598 28.6029 25.7168 28.7604 25.7168H30.7964C30.9055 25.7168 30.9964 25.7598 31.0691 25.8456C31.1539 25.9193 31.1963 26.0052 31.1963 26.1033C31.1963 26.1647 31.1782 26.2444 31.1418 26.3426L25.9973 38.3978C25.9609 38.4959 25.9003 38.5818 25.8155 38.6554C25.7306 38.7413 25.6095 38.7843 25.4519 38.7843H23.4523Z" fill="#213694"/>
    <path d="M44.5649 35.2873C44.4316 35.2873 44.3225 35.2444 44.2377 35.1585C44.1528 35.0726 44.1104 34.9622 44.1104 34.8272V26.1769C44.1104 26.0542 44.1528 25.9499 44.2377 25.8641C44.3225 25.7659 44.4316 25.7168 44.5649 25.7168H46.6554C46.7887 25.7168 46.8978 25.7659 46.9826 25.8641C47.0675 25.9499 47.1099 26.0542 47.1099 26.1769V26.9131C47.4371 26.5328 47.8249 26.2383 48.2733 26.0297C48.7338 25.8211 49.2489 25.7168 49.8185 25.7168H50.6183C50.7395 25.7168 50.8425 25.7598 50.9274 25.8456C51.0243 25.9315 51.0728 26.042 51.0728 26.1769V28.0726C51.0728 28.1953 51.0243 28.3058 50.9274 28.4039C50.8425 28.4898 50.7395 28.5328 50.6183 28.5328H48.855C48.3581 28.5328 47.9703 28.6739 47.6916 28.9561C47.425 29.226 47.2917 29.6125 47.2917 30.1156V34.8272C47.2917 34.9622 47.2432 35.0726 47.1462 35.1585C47.0614 35.2444 46.9523 35.2873 46.819 35.2873H44.5649Z" fill="#213694"/>
    <path d="M52.8198 35.2873C52.6865 35.2873 52.5774 35.2444 52.4926 35.1585C52.4078 35.0726 52.3653 34.9622 52.3653 34.8272V26.1769C52.3653 26.042 52.4078 25.9315 52.4926 25.8456C52.5774 25.7598 52.6865 25.7168 52.8198 25.7168H54.9103C55.0437 25.7168 55.1527 25.7598 55.2376 25.8456C55.3224 25.9315 55.3648 26.042 55.3648 26.1769V26.8763C55.6799 26.496 56.092 26.1769 56.601 25.9193C57.11 25.6616 57.7099 25.5328 58.4006 25.5328C59.1035 25.5328 59.7216 25.6923 60.2549 26.0113C60.8002 26.3303 61.2244 26.8027 61.5274 27.4285C61.8425 28.042 62 28.7966 62 29.6923V34.8272C62 34.9622 61.9515 35.0726 61.8546 35.1585C61.7697 35.2444 61.6667 35.2873 61.5455 35.2873H59.255C59.1338 35.2873 59.0248 35.2444 58.9278 35.1585C58.843 35.0726 58.8006 34.9622 58.8006 34.8272V29.8027C58.8006 29.226 58.6612 28.7843 58.3825 28.4775C58.1158 28.1585 57.7159 27.999 57.1827 27.999C56.6858 27.999 56.2859 28.1585 55.9829 28.4775C55.692 28.7843 55.5466 29.226 55.5466 29.8027V34.8272C55.5466 34.9622 55.4981 35.0726 55.4012 35.1585C55.3163 35.2444 55.2133 35.2873 55.0921 35.2873H52.8198Z" fill="#213694"/>
    <path d="M29.972 9.98067C29.972 9.34538 30.4807 8.83037 31.1081 8.83037H33.3805C34.008 8.83037 34.5166 9.34538 34.5166 9.98067V12.2813C34.5166 12.9166 34.008 13.4316 33.3805 13.4316H31.1081C30.4807 13.4316 29.972 12.9166 29.972 12.2813V9.98067Z" fill="#213694"/>
    <path d="M35.6528 9.98067C35.6528 9.34538 36.1615 8.83037 36.789 8.83037H39.0613C39.6888 8.83037 40.1975 9.34538 40.1975 9.98067V12.2813C40.1975 12.9166 39.6888 13.4316 39.0613 13.4316H36.789C36.1615 13.4316 35.6528 12.9166 35.6528 12.2813V9.98067Z" fill="#213694"/>
    <path d="M29.972 15.7322C29.972 15.0969 30.4807 14.5819 31.1081 14.5819H33.3805C34.008 14.5819 34.5166 15.0969 34.5166 15.7322V18.0328C34.5166 18.6681 34.008 19.1831 33.3805 19.1831H31.1081C30.4807 19.1831 29.972 18.6681 29.972 18.0328V15.7322Z" fill="#213694"/>
    <path d="M35.6528 15.7322C35.6528 15.0969 36.1615 14.5819 36.789 14.5819H39.0613C39.6888 14.5819 40.1975 15.0969 40.1975 15.7322V18.0328C40.1975 18.6681 39.6888 19.1831 39.0613 19.1831H36.789C36.1615 19.1831 35.6528 18.6681 35.6528 18.0328V15.7322Z" fill="#213694"/>
  </svg>
)
const IMGS = {
  walnut:     'https://www.figma.com/api/mcp/asset/e7b67e1a-1bc9-4243-a0b9-6be94b9bd223',
  walnutHero: 'https://www.figma.com/api/mcp/asset/081d2825-967b-4534-8b6c-49471c19ad77',
  oakwood:    'https://www.figma.com/api/mcp/asset/4ea23108-d39e-4ffc-9de5-873fd39fdbc1',
  pine:       'https://www.figma.com/api/mcp/asset/bc3d24af-b49b-4811-bb9b-d485fb65f76c',
  chestnut:   'https://www.figma.com/api/mcp/asset/e2d15032-5b4b-43cc-9374-b26cbd8a7762',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SALE_TYPES = [
  { key: 'judicial',   label: 'Judicial Sales',   badge: 'Judicial Sale',   color: '#804337' },
  { key: 'upset',      label: 'Upset Sales',      badge: 'Upset Sale',      color: '#4343a1' },
  { key: 'private',    label: 'Private Sales',    badge: 'Private Sale',    color: '#1a6b8a' },
  { key: 'repository', label: 'Repository Sales', badge: 'Repository Sale', color: '#2d5428' },
]

const PRICE_OPTIONS = [
  { label: 'Any price', value: null },
  { label: 'Under $15k', value: 15000 },
  { label: 'Under $20k', value: 20000 },
  { label: 'Under $25k', value: 25000 },
]
const BED_OPTIONS = [
  { label: 'Any', value: null },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
]
const TYPE_OPTIONS = [
  { label: 'Any', value: null },
  { label: 'Home', value: 'Home' },
  { label: 'Condo', value: 'Condo' },
  { label: 'Land', value: 'Land' },
  { label: 'Multi-family', value: 'Multi' },
]

const PROPERTIES = [
  {
    id: 1,
    thumb: IMGS.walnut, hero: IMGS.walnutHero,
    address: '412 Walnut Street', city: 'Jeannette, PA, 15644',
    crumbs: ['PA', 'Westmoreland', 'Jeannette', '15644', 'Walnut Street'],
    price: '$20,000', beds: 3, baths: 1, sqft: '1,014', acres: '0.73',
    saleType: 'judicial', county: 'Westmoreland County',
    presenceScore: 15, roofCondition: 23,
    parcel: '02 02 40 2 930', owner: 'Olivia Rhye', propertyType: 'Home',
    mapPin: { x: '28%', y: '25%' },
  },
  {
    id: 2,
    thumb: IMGS.oakwood, hero: IMGS.oakwood,
    address: '27 Oakwood Drive', city: 'Greensburg, PA, 15601',
    crumbs: ['PA', 'Westmoreland', 'Greensburg', '15601', 'Oakwood Drive'],
    price: '$18,500', beds: 2, baths: 1, sqft: '924', acres: '0.44',
    saleType: 'judicial', county: 'Westmoreland County',
    presenceScore: 22, roofCondition: 45,
    parcel: '03 05 12 1 441', owner: 'Thomas Wright', propertyType: 'Home',
    mapPin: { x: '45%', y: '38%' },
  },
  {
    id: 3,
    thumb: IMGS.pine, hero: IMGS.pine,
    address: '416 Pine Street', city: 'Irwin, PA, 15642',
    crumbs: ['PA', 'Westmoreland', 'Irwin', '15642', 'Pine Street'],
    price: '$22,056', beds: 2, baths: 1, sqft: '1,080', acres: '0.31',
    saleType: 'upset', county: 'Westmoreland County',
    presenceScore: 8, roofCondition: 61,
    parcel: '04 08 33 2 117', owner: 'Margaret Hall', propertyType: 'Home',
    mapPin: { x: '60%', y: '30%' },
  },
  {
    id: 4,
    thumb: IMGS.chestnut, hero: IMGS.chestnut,
    address: '14 Chestnut Lane', city: 'Jeannette, PA, 15644',
    crumbs: ['PA', 'Westmoreland', 'Jeannette', '15644', 'Chestnut Lane'],
    price: '$25,000', beds: 4, baths: 2, sqft: '1,342', acres: '0.58',
    saleType: 'repository', county: 'Westmoreland County',
    presenceScore: 31, roofCondition: 72,
    parcel: '02 03 17 4 209', owner: 'Robert Chen', propertyType: 'Home',
    mapPin: { x: '35%', y: '58%' },
  },
  {
    id: 5,
    thumb: IMGS.oakwood, hero: IMGS.oakwood,
    address: '88 Maple Avenue', city: 'Latrobe, PA, 15650',
    crumbs: ['PA', 'Westmoreland', 'Latrobe', '15650', 'Maple Avenue'],
    price: '$16,200', beds: 2, baths: 1, sqft: '876', acres: '0.36',
    saleType: 'upset', county: 'Westmoreland County',
    presenceScore: 18, roofCondition: 38,
    parcel: '05 11 04 3 882', owner: 'James Peterson', propertyType: 'Home',
    mapPin: { x: '70%', y: '50%' },
  },
  {
    id: 6,
    thumb: IMGS.walnut, hero: IMGS.walnutHero,
    address: '55 Cedar Road', city: 'Connellsville, PA, 15425',
    crumbs: ['PA', 'Westmoreland', 'Connellsville', '15425', 'Cedar Road'],
    price: '$14,750', beds: 3, baths: 1, sqft: '998', acres: '0.52',
    saleType: 'judicial', county: 'Westmoreland County',
    presenceScore: 11, roofCondition: 29,
    parcel: '06 02 28 1 554', owner: 'Linda Thompson', propertyType: 'Home',
    mapPin: { x: '20%', y: '65%' },
  },
]

// Location suggestions for the dropdown
const LOCATION_SUGGESTIONS = [
  { label: 'Westmoreland County, PA',    count: '6 properties' },
  { label: 'Pennsylvania',               count: '6 properties' },
  { label: 'Jeannette, PA 15644',        count: '2 properties' },
  { label: 'Greensburg, PA 15601',       count: '1 property' },
  { label: 'Irwin, PA 15642',            count: '1 property' },
  { label: 'Latrobe, PA 15650',          count: '1 property' },
  { label: 'Connellsville, PA 15425',    count: '1 property' },
  { label: 'Allegheny County, PA',       count: 'Browse listings' },
  { label: 'Philadelphia County, PA',    count: 'Browse listings' },
  { label: 'Pittsburgh, PA',             count: 'Browse listings' },
  { label: 'Judicial Sales — PA',        count: '4 properties' },
  { label: 'Upset Sales — PA',           count: '2 properties' },
]

function getSuggestions(query) {
  if (!query.trim()) return []
  const q = query.toLowerCase()

  const locations = LOCATION_SUGGESTIONS
    .filter(l => l.label.toLowerCase().includes(q))
    .slice(0, 3)
    .map(l => ({ kind: 'location', label: l.label, sublabel: l.count }))

  const properties = PROPERTIES
    .filter(p =>
      p.address.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.county.toLowerCase().includes(q) ||
      p.price.toLowerCase().includes(q)
    )
    .slice(0, 3)
    .map(p => ({ kind: 'property', label: p.address, sublabel: `${p.city.replace(/, /g, ', ')} · ${p.price}`, property: p }))

  return [...locations, ...properties].slice(0, 6)
}

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

// ─── Motion variants ──────────────────────────────────────────────────────────
const slide = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.26, ease: [0.4, 0, 0.2, 1] } },
  exit:  { opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconSearch = ({ color = 'white', size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconMapPin = ({ color = '#535862', size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 6.5 4 6.5S10 8 10 5c0-2.2-1.8-4-4-4zm0 5.5A1.5 1.5 0 116 3a1.5 1.5 0 010 3z" fill={color} />
  </svg>
)

const IconChevronLeft = ({ color = '#2e48b0', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13 4l-6 6 6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconChevronRight = ({ color = '#213694' }) => (
  <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden="true">
    <path d="M2 1l4 4-4 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
    <path d="M8 7v4M8 5.5v.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const IconHeart = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill={filled ? 'white' : 'none'} stroke="white" strokeWidth="1.6" aria-hidden="true">
    <path d="M10 17.5C10 17.5 2.5 12.5 2.5 7.5a4 4 0 018 0 4 4 0 018 0c0 5-7.5 10-7.5 10z" />
  </svg>
)

const IconSliders = ({ color = '#414651', size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M2 8h12M2 12h12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="5" cy="4" r="1.8" fill="white" stroke={color} strokeWidth="1.4" />
    <circle cx="11" cy="8" r="1.8" fill="white" stroke={color} strokeWidth="1.4" />
    <circle cx="7" cy="12" r="1.8" fill="white" stroke={color} strokeWidth="1.4" />
  </svg>
)

const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <circle cx="5" cy="5" r="4.5" stroke="#039855" strokeWidth="1" />
    <path d="M3 5l1.5 1.5L7 3.5" stroke="#039855" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Sparkline ────────────────────────────────────────────────────────────────
const Sparkline = ({ value }) => {
  const pts = [0, 8, 12, 4, 20, 10, 30, 14, 45, 6, 60, 10, 75, 8, 88, 11, 100, value * 0.18]
  const pairs = pts.reduce((acc, _, i, a) => i % 2 === 0 ? [...acc, [a[i], a[i + 1]]] : acc, [])
  const d = pairs.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${(x / 100) * 356} ${18 - y}`).join(' ')
  return (
    <svg width="100%" height="22" viewBox="0 0 356 22" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Sale type badge ──────────────────────────────────────────────────────────
const Badge = ({ type }) => {
  const st = SALE_TYPES.find(s => s.key === type) || SALE_TYPES[0]
  return (
    <span style={{
      background: st.color, color: 'white', fontFamily: 'Lato, sans-serif',
      fontSize: '10px', fontWeight: 500, padding: '2px 8px', borderRadius: '99px', whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {st.badge}
    </span>
  )
}

// ─── Property card ────────────────────────────────────────────────────────────
const PropertyCard = ({ property, onClick }) => (
  <motion.div
    role="button"
    tabIndex={0}
    aria-label={`View details for ${property.address}, ${property.city.replace(', PA,', ', PA')}, listed at ${property.price}`}
    whileHover={{ scale: 1.025, y: -3, boxShadow: '0 12px 28px rgba(0,0,0,0.14)' }}
    whileTap={{ scale: 0.975 }}
    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
    onClick={() => onClick && onClick(property)}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick && onClick(property) } }}
    style={{
      background: 'white', borderRadius: '10px', overflow: 'hidden',
      cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
      width: '100%', fontFamily: 'Lato, sans-serif',
    }}
  >
    <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
      <img src={property.thumb} alt={property.address} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: i === 0 ? 'white' : 'rgba(255,255,255,0.45)' }} />
        ))}
      </div>
    </div>
    <div style={{ padding: '10px 14px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div>
          <p style={{ fontSize: '9px', color: '#535862', fontWeight: 600, lineHeight: 1.3 }}>Uploaded by:</p>
          <p style={{ fontSize: '9px', color: '#535862', fontWeight: 600, lineHeight: 1.3 }}>{property.county}</p>
        </div>
        <Badge type={property.saleType} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '2px' }}>
        <IconCheck />
        <p style={{ fontSize: '9px', color: '#414651' }}>County Verified</p>
      </div>
      <p style={{ fontSize: '11px', color: '#414651', lineHeight: 1.5 }}>{property.address}</p>
      <p style={{ fontSize: '11px', color: '#414651', lineHeight: 1.5, marginBottom: '4px' }}>{property.city.replace(', PA,', ', PA')}</p>
      <p style={{ fontSize: '11px', color: '#535862' }}>{property.beds} Bed · {property.baths} Bath · {property.sqft} ft²</p>
      <p style={{ fontSize: '19px', color: '#414651', fontWeight: 700, marginTop: '4px' }}>{property.price}</p>
    </div>
  </motion.div>
)

// ─── Shared nav ───────────────────────────────────────────────────────────────
const KeytrnNav = ({ isMobile }) => (
  <nav style={{
    background: '#f5fafc', borderBottom: '1px solid #e0ecf5', height: '58px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: isMobile ? '0 20px' : '0 60px', fontFamily: 'Lato, sans-serif',
    position: 'sticky', top: 0, zIndex: 100,
  }}>
    <KeytrnLogo height={30} />
    {!isMobile && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {['Browse', 'Educate', 'About', 'Support', 'Account'].map(item => (
          <button key={item} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#535862', fontFamily: 'Lato, sans-serif' }}>
            {item}
          </button>
        ))}
        <button style={{ background: 'white', border: '1px solid #213694', borderRadius: '99px', padding: '6px 14px', fontSize: '14px', fontWeight: 600, color: '#213694', fontFamily: 'Lato, sans-serif', cursor: 'pointer' }}>
          Sign up/Sign in
        </button>
      </div>
    )}
    {isMobile && (
      <button style={{ background: '#2e48b0', border: 'none', borderRadius: '99px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, color: 'white', fontFamily: 'Lato, sans-serif', cursor: 'pointer' }}>
        Sign in
      </button>
    )}
  </nav>
)

// ─── Search input with smart dropdown ─────────────────────────────────────────
function SearchInput({ value, onChange, onSearch, onSelectLocation, onSelectProperty, placeholder = 'State, county, city, zip, address', compact = false }) {
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(-1)
  const wrapRef = useRef(null)
  const inputRef = useRef(null)

  const suggestions = getSuggestions(value)
  const showDrop = focused && suggestions.length > 0

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const submit = useCallback((q) => {
    const query = (q || value || '').trim()
    if (!query) return
    setLoading(true)
    setFocused(false)
    setTimeout(() => { setLoading(false); onSearch(query) }, 580)
  }, [value, onSearch])

  const selectSuggestion = (s) => {
    setFocused(false)
    if (s.kind === 'property') {
      onChange(s.label)
      onSelectProperty(s.property)
    } else {
      onChange(s.label)
      submit(s.label)
    }
  }

  const handleKeyDown = (e) => {
    if (!showDrop) {
      if (e.key === 'Enter') submit()
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHovered(h => Math.min(h + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHovered(h => Math.max(h - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); hovered >= 0 ? selectSuggestion(suggestions[hovered]) : submit() }
    else if (e.key === 'Escape') { setFocused(false); setHovered(-1) }
  }

  const inputHeight = compact ? '36px' : '44px'
  const inputFontSize = compact ? '14px' : '16px'

  return (
    <div ref={wrapRef} style={{ position: 'relative', flex: 1 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'white', borderRadius: '99px',
        border: `1.5px solid ${focused ? '#2e48b0' : '#d5d7da'}`,
        padding: compact ? '6px 10px 6px 14px' : '10px 10px 10px 14px',
        height: inputHeight,
        boxShadow: focused ? '0 0 0 3px rgba(46,72,176,0.1)' : '0 1px 2px rgba(10,13,18,0.05)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}>
        {compact && <IconSearch color="#717680" size={14} />}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label="Search properties by location, city, or address"
          aria-expanded={showDrop}
          aria-controls="search-listbox"
          aria-activedescendant={hovered >= 0 ? `search-option-${hovered}` : undefined}
          aria-autocomplete="list"
          placeholder={placeholder}
          value={value}
          onChange={e => { onChange(e.target.value); setHovered(-1) }}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: inputFontSize, color: value ? '#414651' : '#717680', fontFamily: 'Lato, sans-serif' }}
        />
        <motion.button
          aria-label="Search"
          onClick={() => submit()}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{ width: compact ? '28px' : '32px', height: compact ? '28px' : '32px', borderRadius: '50%', background: '#2e48b0', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          {loading
            ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }} style={{ width: '12px', height: '12px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
            : <IconSearch size={compact ? 12 : 14} />
          }
        </motion.button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDrop && (
          <motion.div
            id="search-listbox"
            role="listbox"
            aria-label="Search suggestions"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
              background: 'white', borderRadius: '14px', overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(33,54,148,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #e8f0f8', zIndex: 200,
            }}
          >
            {suggestions.map((s, i) => (
              <motion.div
                key={i}
                id={`search-option-${i}`}
                role="option"
                aria-selected={hovered === i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px',
                  background: hovered === i ? '#f0f5ff' : 'white',
                  cursor: 'pointer', transition: 'background 0.1s',
                  borderBottom: i < suggestions.length - 1 ? '1px solid #f0f4f8' : 'none',
                }}
              >
                {s.kind === 'property' ? (
                  <>
                    <img src={s.property.thumb} alt={s.property.address} style={{ width: '40px', height: '32px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</p>
                      <p style={{ fontSize: '11px', color: '#535862', fontFamily: 'Lato, sans-serif' }}>{s.sublabel}</p>
                    </div>
                    <Badge type={s.property.saleType} />
                  </>
                ) : (
                  <>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <IconMapPin color="#2e48b0" size={14} />
                    </div>
                    <div style={{ flex: 1 }}>
                      {/* Highlight matching portion */}
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>
                        {highlightMatch(s.label, value)}
                      </p>
                      <p style={{ fontSize: '11px', color: '#535862', fontFamily: 'Lato, sans-serif' }}>{s.sublabel}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
            {/* Footer hint */}
            <div style={{ padding: '8px 14px', background: '#fafbff', borderTop: '1px solid #f0f4f8' }}>
              <p style={{ fontSize: '11px', color: '#717680', fontFamily: 'Lato, sans-serif' }}>
                Press <strong style={{ color: '#2e48b0' }}>Enter</strong> to search all results &nbsp;·&nbsp; <strong style={{ color: '#2e48b0' }}>↑↓</strong> to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Bold the matched portion of text
function highlightMatch(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ color: '#2e48b0' }}>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  )
}

// ─── Filter dropdown ──────────────────────────────────────────────────────────
function FilterDropdown({ filters, onChange, compact = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeCount = Object.values(filters).filter(v => v !== null).length
  const set = (key, val) => onChange(prev => ({ ...prev, [key]: prev[key] === val ? null : val }))
  const clear = () => onChange({ priceMax: null, beds: null, propertyType: null })

  const btnH = compact ? '36px' : '44px'
  const accent = open || activeCount > 0
  const iconColor = open ? 'white' : accent ? '#2e48b0' : '#414651'

  const pill = (active) => ({
    padding: '5px 12px', borderRadius: '99px', border: 'none', cursor: 'pointer',
    fontSize: '13px', fontWeight: 600, fontFamily: 'Lato, sans-serif',
    background: active ? '#2e48b0' : '#f0f4f8',
    color: active ? 'white' : '#414651',
  })

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        aria-expanded={open} aria-label="Open filters"
        style={{
          height: btnH, display: 'flex', alignItems: 'center', gap: '6px',
          padding: compact ? '0 12px' : '0 16px',
          background: open ? '#2e48b0' : 'white',
          border: `1.5px solid ${accent ? '#2e48b0' : '#d5d7da'}`,
          borderRadius: '99px', cursor: 'pointer',
          fontSize: compact ? '13px' : '15px', fontWeight: 600,
          color: open ? 'white' : accent ? '#2e48b0' : '#414651',
          fontFamily: 'Lato, sans-serif',
          transition: 'background 0.15s, border-color 0.15s, color 0.15s',
          position: 'relative',
        }}
      >
        <IconSliders color={iconColor} size={compact ? 13 : 15} />
        Filters
        {activeCount > 0 && !open && (
          <span style={{
            position: 'absolute', top: '-5px', right: '-5px',
            width: '17px', height: '17px', borderRadius: '50%',
            background: '#2e48b0', color: 'white', fontSize: '10px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #f5fafc',
          }}>{activeCount}</span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: '272px', background: 'white', borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(33,54,148,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #e8f0f8', zIndex: 300, overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 16px 12px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#535862', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Lato, sans-serif', margin: '0 0 10px' }}>Price</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {PRICE_OPTIONS.map(opt => (
                  <motion.button key={String(opt.value)} onClick={() => set('priceMax', opt.value)} whileTap={{ scale: 0.95 }} style={pill(filters.priceMax === opt.value)}>{opt.label}</motion.button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0f4f8' }} />
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#535862', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Lato, sans-serif', margin: '0 0 10px' }}>Bedrooms</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                {BED_OPTIONS.map(opt => (
                  <motion.button key={String(opt.value)} onClick={() => set('beds', opt.value)} whileTap={{ scale: 0.95 }} style={{ ...pill(filters.beds === opt.value), flex: 1 }}>{opt.label}</motion.button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0f4f8' }} />
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#535862', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Lato, sans-serif', margin: '0 0 10px' }}>Property Type</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {TYPE_OPTIONS.map(opt => (
                  <motion.button key={String(opt.value)} onClick={() => set('propertyType', opt.value)} whileTap={{ scale: 0.95 }} style={pill(filters.propertyType === opt.value)}>{opt.label}</motion.button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0f4f8', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbff' }}>
              <motion.button onClick={clear} whileTap={{ scale: 0.95 }} aria-label="Clear all filters"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: activeCount > 0 ? '#414651' : '#b0b7c3', fontFamily: 'Lato, sans-serif', padding: 0 }}>
                Clear all
              </motion.button>
              <motion.button onClick={() => setOpen(false)} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} aria-label="Apply filters"
                style={{ background: '#2e48b0', border: 'none', borderRadius: '99px', padding: '6px 18px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'white', fontFamily: 'Lato, sans-serif' }}>
                Apply
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ onSearch, onSelectProperty, activeFilters, onFiltersChange, advFilters, onAdvFilters }) {
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024
  const px = isMobile ? '20px' : '60px'

  const [query, setQuery] = useState('')

  const toggleFilter = (key) =>
    onFiltersChange(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

  const cardCols = isMobile ? 2 : isTablet ? 2 : 4
  const cardWidth = isMobile ? 'calc(50% - 8px)' : isTablet ? 'calc(50% - 12px)' : '272px'

  return (
    <div style={{ background: '#f5fafc', minHeight: '100vh', fontFamily: 'Lato, sans-serif' }}>
      <KeytrnNav isMobile={isMobile} />

      {/* Hero */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '40px 20px 0' : '64px 60px 0' }}>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: 600, color: '#414651', textAlign: 'center', marginBottom: '20px', fontFamily: 'Lato, sans-serif', maxWidth: '600px' }}
        >
          Where every home has a second chance.
        </motion.h1>

        {/* Search + filter button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45 }}
          style={{ width: '100%', maxWidth: '740px', display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <SearchInput
              value={query}
              onChange={setQuery}
              onSearch={q => onSearch(q)}
              onSelectProperty={onSelectProperty}
            />
          </div>
          <FilterDropdown filters={advFilters} onChange={onAdvFilters} />
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
          style={{
            display: 'flex', gap: '8px', marginTop: '14px',
            width: '100%', maxWidth: '740px',
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: isMobile ? '4px' : '0',
            justifyContent: 'space-between',
          }}
        >
          {SALE_TYPES.map((st, i) => {
            const on = activeFilters.includes(st.key)
            return (
              <motion.button
                key={st.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: on ? 1 : 0.45, y: 0 }}
                transition={{ delay: 0.28 + i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-pressed={on}
                onClick={() => toggleFilter(st.key)}
                style={{
                  background: on ? '#2e48b0' : '#e5e7eb',
                  border: 'none', borderRadius: '99px',
                  padding: isMobile ? '7px 12px' : '8px 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  flex: 1, minWidth: 0,
                  fontSize: isMobile ? '12px' : '14px', fontWeight: 600,
                  color: on ? 'white' : '#535862', fontFamily: 'Lato, sans-serif',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {st.label}
                {!isMobile && on && <IconInfo />}
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Featured Homes */}
      <div style={{ padding: isMobile ? '40px 20px 0' : isTablet ? '48px 40px 0' : '60px 60px 0' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.45 }}>
          <h2 style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 600, color: '#414651', marginBottom: '4px', fontFamily: 'Lato, sans-serif' }}>
            Second-Chance Homes in Westmoreland County
          </h2>
          <p style={{ fontSize: isMobile ? '14px' : '16px', color: '#414651', marginBottom: '20px', fontFamily: 'Lato, sans-serif' }}>
            Explore properties made available through local foreclosure sales — affordable, verified, and waiting for the right buyer.
          </p>

          {/* Cards — wrap on mobile/tablet, row on desktop */}
          <div style={{
            display: 'flex',
            flexWrap: cardCols < 4 ? 'wrap' : 'nowrap',
            gap: isMobile ? '12px' : '20px',
          }}>
            {PROPERTIES.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.38, duration: 0.4 }}
                style={{ width: cardCols < 4 ? cardWidth : '272px', flexShrink: 0 }}
              >
                <PropertyCard property={p} onClick={() => onSearch('Westmoreland County, PA')} />
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '36px', paddingBottom: '60px' }}>
            <p style={{ fontSize: '16px', color: '#414651', fontFamily: 'Lato, sans-serif', marginBottom: '12px' }}>Continue exploring</p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSearch('Westmoreland County, PA')}
              style={{ background: 'white', border: '1px solid #213694', borderRadius: '99px', padding: '8px 14px', fontSize: '14px', fontWeight: 600, color: '#213694', fontFamily: 'Lato, sans-serif', cursor: 'pointer' }}
            >
              Explore more homes
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── RESULTS SCREEN ───────────────────────────────────────────────────────────
function ResultsScreen({ query, onCardClick, initialFilters, onBackHome, advFilters, onAdvFilters }) {
  const width = useWindowWidth()
  const isMobile = width < 640
  const showMap = width >= 1000
  const px = isMobile ? '16px' : '40px'

  const [active, setActive] = useState(initialFilters ?? ['judicial', 'upset', 'private', 'repository'])
  const [search, setSearch] = useState(query || '')
  const [mapView, setMapView] = useState(false)

  const toggle = (key) => setActive(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  const filtered = PROPERTIES
    .filter(p => active.includes(p.saleType))
    .filter(p => !advFilters.priceMax || parseInt(p.price.replace(/[$,]/g, '')) <= advFilters.priceMax)
    .filter(p => !advFilters.beds || p.beds >= advFilters.beds)
    .filter(p => !advFilters.propertyType || p.propertyType === advFilters.propertyType)

  return (
    <div style={{ background: '#f5fafc', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Lato, sans-serif', overflow: 'hidden' }}>
      <KeytrnNav isMobile={isMobile} />

      {/* Search + filter bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e0ecf5', padding: isMobile ? '10px 16px' : '12px 40px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <motion.button
            onClick={onBackHome}
            whileHover={{ x: -3 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: isMobile ? '13px' : '14px', fontWeight: 600, color: '#2e48b0', fontFamily: 'Lato, sans-serif', flexShrink: 0, padding: '4px 0' }}
          >
            <IconChevronLeft />
            {isMobile ? 'Home' : 'Back to home'}
          </motion.button>
          {!isMobile && <div style={{ width: '1px', height: '22px', background: '#e0ecf5', flexShrink: 0, margin: '0 6px' }} />}
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '260px', maxWidth: '420px' }}>
            <SearchInput
              value={search}
              onChange={setSearch}
              onSearch={q => setSearch(q)}
              onSelectProperty={onCardClick}
              compact
            />
          </div>
          <FilterDropdown filters={advFilters} onChange={onAdvFilters} compact />
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: isMobile ? '2px' : '0', flexShrink: 0, maxWidth: isMobile ? '100%' : 'none' }}>
            {SALE_TYPES.map(st => {
              const on = active.includes(st.key)
              return (
                <motion.button
                  key={st.key}
                  onClick={() => toggle(st.key)}
                  aria-pressed={on}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ opacity: on ? 1 : 0.38 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    background: on ? '#2e48b0' : '#e5e7eb',
                    color: on ? 'white' : '#535862', border: 'none', borderRadius: '99px',
                    padding: isMobile ? '5px 10px' : '6px 13px',
                    fontSize: isMobile ? '11px' : '13px', fontWeight: 600,
                    fontFamily: 'Lato, sans-serif', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                >
                  {isMobile ? st.label.replace(' Sales', '') : st.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Cards panel — always visible, full width when no map */}
        <div style={{
          width: showMap ? '560px' : '100%',
          flexShrink: 0, overflowY: 'auto',
          padding: isMobile ? '16px' : `20px 20px 20px ${showMap ? '40px' : px}`,
          display: (!showMap && mapView) ? 'none' : 'block',
        }}>
          <p role="status" aria-live="polite" style={{ fontSize: '13px', color: '#717680', marginBottom: '14px', fontFamily: 'Lato, sans-serif' }}>
            <strong style={{ color: '#414651' }}>{filtered.length} properties</strong> in Westmoreland County, PA
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '10px' : '14px' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id} layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                >
                  <PropertyCard property={p} onClick={onCardClick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Map panel */}
        {showMap && (
          <div style={{
            flex: 1, position: 'relative', overflow: 'hidden',
            background: '#dde8f0',
            backgroundImage: `
              linear-gradient(rgba(33,54,148,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(33,54,148,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
              <path d="M120,0 Q130,200 110,400 Q90,600 120,800" stroke="#213694" strokeWidth="2" fill="none" />
              <path d="M280,0 L280,800" stroke="#213694" strokeWidth="1.5" fill="none" />
              <path d="M0,100 L700,100" stroke="#213694" strokeWidth="2" fill="none" />
              <path d="M0,260 Q200,250 400,280 Q600,310 700,260" stroke="#213694" strokeWidth="1.5" fill="none" />
              <path d="M0,440 L700,440" stroke="#213694" strokeWidth="1" fill="none" />
              <path d="M400,0 Q410,300 430,600 L430,800" stroke="#213694" strokeWidth="1" fill="none" />
            </svg>
            {PROPERTIES.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08 * i + 0.2, type: 'spring', stiffness: 320, damping: 22 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                onClick={() => onCardClick(p)}
                role="button"
                tabIndex={0}
                aria-label={`View ${p.address}, ${p.price}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCardClick(p) } }}
                style={{ position: 'absolute', left: p.mapPin.x, top: p.mapPin.y, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: 1 }}
              >
                <div style={{
                  background: i === 0 ? '#2e48b0' : 'white',
                  color: i === 0 ? 'white' : '#2e48b0',
                  border: '2px solid #2e48b0', borderRadius: '20px',
                  padding: '3px 10px', fontSize: '11px', fontWeight: 700,
                  fontFamily: 'Lato, sans-serif', whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}>
                  {p.price}
                </div>
              </motion.div>
            ))}
            <p style={{ position: 'absolute', bottom: '10px', right: '14px', fontSize: '10px', color: '#535862', fontFamily: 'Lato, sans-serif' }}>
              Westmoreland County, PA
            </p>
          </div>
        )}

        {/* Mobile map toggle */}
        {!showMap && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMapView(v => !v)}
            style={{
              position: 'fixed', bottom: '20px', right: '20px',
              background: '#2e48b0', color: 'white', border: 'none', borderRadius: '99px',
              padding: '10px 18px', fontSize: '13px', fontWeight: 600,
              fontFamily: 'Lato, sans-serif', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(46,72,176,0.35)', zIndex: 50,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <IconMapPin color="white" size={14} />
            {mapView ? 'Show list' : 'Show map'}
          </motion.button>
        )}
      </div>
    </div>
  )
}

// ─── Carousel views ───────────────────────────────────────────────────────────
const SatelliteView = () => (
  <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#2a3a2a' }}>
    {/* 2x2 ESRI World Imagery tiles — Jeannette, PA area (z=17) */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', width: '100%', height: '100%' }}>
      {[[49410, 36550], [49410, 36551], [49411, 36550], [49411, 36551]].map(([y, x]) => (
        <img
          key={`${x}-${y}`}
          src={`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/17/${y}/${x}`}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ))}
    </div>
    {/* Pin at center */}
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.55))' }}>
      <svg width="22" height="28" viewBox="0 0 24 30" fill="none" aria-hidden="true">
        <path d="M12 0C5.372 0 0 5.372 0 12c0 9 12 18 12 18s12-9 12-18C24 5.372 18.628 0 12 0z" fill="#e53e3e" />
        <circle cx="12" cy="12" r="5" fill="white" />
      </svg>
    </div>
    {/* Attribution */}
    <span style={{ position: 'absolute', bottom: '4px', right: '6px', fontSize: '9px', color: 'rgba(255,255,255,0.65)', fontFamily: 'sans-serif', pointerEvents: 'none' }}>
      Powered by Esri
    </span>
  </div>
)

const PlotView = ({ property }) => (
  <svg width="100%" height="100%" viewBox="0 0 700 440" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#f8f5f0' }}>
    <rect width="700" height="440" fill="#f8f5f0" />
    {Array.from({ length: 14 }).map((_, i) => (
      <line key={`h${i}`} x1="40" y1={58 + i * 24} x2="660" y2={58 + i * 24} stroke="#d4c8b8" strokeWidth="0.5" />
    ))}
    {Array.from({ length: 27 }).map((_, i) => (
      <line key={`v${i}`} x1={40 + i * 24} y1="58" x2={40 + i * 24} y2="370" stroke="#d4c8b8" strokeWidth="0.5" />
    ))}
    <rect x="120" y="96" width="360" height="244" fill="rgba(196,168,122,0.12)" stroke="#4a3820" strokeWidth="2.5" />
    <line x1="120" y1="86" x2="480" y2="86" stroke="#4a3820" strokeWidth="1" />
    <polygon points="120,83 120,89 113,86" fill="#4a3820" />
    <polygon points="480,83 480,89 487,86" fill="#4a3820" />
    <text x="300" y="82" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#4a3820">132.00 ft</text>
    <line x1="110" y1="96" x2="110" y2="340" stroke="#4a3820" strokeWidth="1" />
    <polygon points="107,96 113,96 110,89" fill="#4a3820" />
    <polygon points="107,340 113,340 110,347" fill="#4a3820" />
    <text x="102" y="222" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#4a3820" transform="rotate(-90,102,222)">242.00 ft</text>
    <rect x="200" y="148" width="200" height="140" fill="#e8ddd0" stroke="#6b5030" strokeWidth="1.5" />
    <text x="300" y="222" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#6b5030">DWELLING</text>
    <text x="300" y="236" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6b5030">{property.sqft} sq ft</text>
    <rect x="364" y="290" width="38" height="28" fill="#d4c4a8" stroke="#6b5030" strokeWidth="1" />
    <text x="383" y="310" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6b5030">GARAGE</text>
    <circle cx="628" cy="104" r="28" fill="none" stroke="#4a3820" strokeWidth="1.5" />
    <path d="M628 80 L633 98 L628 94 L623 98 Z" fill="#4a3820" />
    <text x="628" y="76" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#4a3820">N</text>
    <text x="628" y="140" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#4a3820">S</text>
    <text x="594" y="107" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#4a3820">W</text>
    <text x="662" y="107" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#4a3820">E</text>
    <text x="300" y="392" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#4a3820">Parcel: {property.parcel}</text>
    <text x="300" y="408" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#4a3820">{property.address} · {property.acres} acres</text>
    <rect x="120" y="418" width="50" height="5" fill="#4a3820" />
    <rect x="170" y="418" width="50" height="5" fill="white" stroke="#4a3820" strokeWidth="1" />
    <text x="120" y="432" fontFamily="monospace" fontSize="9" fill="#4a3820">0</text>
    <text x="165" y="432" fontFamily="monospace" fontSize="9" fill="#4a3820">50 ft</text>
    <text x="213" y="432" fontFamily="monospace" fontSize="9" fill="#4a3820">100 ft</text>
  </svg>
)

// ─── Property image carousel ──────────────────────────────────────────────────
const carouselVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }),
}

function PropertyImageCarousel({ property, height, borderRadius = '0' }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const slides = [
    { type: 'photo',     label: 'Exterior',       src: property.hero },
    { type: 'satellite', label: 'Satellite View' },
    { type: 'plot',      label: 'Lot Plot' },
  ]

  const go = (next) => {
    setDir(next > index ? 1 : -1)
    setIndex(next)
  }

  const slide = slides[index]

  return (
    <div style={{ position: 'relative', height, borderRadius, overflow: 'hidden', background: '#1a2a1a' }}>
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={index}
          custom={dir}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: 'absolute', inset: 0 }}
        >
          {slide.type === 'photo'
            ? <img src={slide.src} alt={slide.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            : slide.type === 'satellite'
              ? <SatelliteView />
              : <PlotView property={property} />
          }
        </motion.div>
      </AnimatePresence>

      {/* Slide label */}
      <div style={{ position: 'absolute', top: '10px', left: '12px', background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(6px)', borderRadius: '99px', padding: '3px 10px', pointerEvents: 'none' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'white', fontFamily: 'Lato, sans-serif' }}>{slide.label}</span>
      </div>

      {/* Prev */}
      <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
        <motion.button
          onClick={() => go(index === 0 ? slides.length - 1 : index - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous image"
          style={{ background: 'rgba(255,255,255,0.88)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.22)' }}
        >
          <IconChevronLeft size={16} color="#213694" />
        </motion.button>
      </div>

      {/* Next */}
      <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
        <motion.button
          onClick={() => go(index === slides.length - 1 ? 0 : index + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next image"
          style={{ background: 'rgba(255,255,255,0.88)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.22)' }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 4l6 6-6 6" stroke="#213694" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', alignItems: 'center', zIndex: 2 }}>
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            animate={{ width: i === index ? '18px' : '7px', background: i === index ? 'white' : 'rgba(255,255,255,0.5)' }}
            transition={{ duration: 0.2 }}
            style={{ height: '7px', borderRadius: '99px', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── DETAIL SCREEN ────────────────────────────────────────────────────────────
function DetailScreen({ property, onBack }) {
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1000
  const stacked = width < 1000
  const px = isMobile ? '16px' : '35px'

  const [saved, setSaved] = useState(false)
  if (!property) return null

  const presenceColor = property.presenceScore < 25 ? '#039855' : '#d92d20'
  const roofColor = property.roofCondition > 50 ? '#039855' : '#d92d20'

  return (
    <div style={{ background: '#f2f8fc', minHeight: '100vh', fontFamily: 'Lato, sans-serif' }}>
      <KeytrnNav isMobile={isMobile} />

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '10px 16px' : '14px 35px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '32px', flexWrap: 'wrap', minWidth: 0 }}>
          <motion.button
            onClick={onBack}
            whileHover={{ x: -3 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: isMobile ? '14px' : '16px', fontWeight: 600, color: '#2e48b0', fontFamily: 'Lato, sans-serif', flexShrink: 0 }}
          >
            <IconChevronLeft />
            Back to search
          </motion.button>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
              {property.crumbs.map((c, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'Lato, sans-serif', color: i === property.crumbs.length - 1 ? '#414651' : '#213694', cursor: i < property.crumbs.length - 1 ? 'pointer' : 'default' }}>
                    {c}
                  </span>
                  {i < property.crumbs.length - 1 && <IconChevronRight />}
                </span>
              ))}
            </div>
          )}
        </div>
        <motion.button
          onClick={() => setSaved(s => !s)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          style={{ background: saved ? '#1a3a9e' : '#2e48b0', border: 'none', borderRadius: '99px', padding: isMobile ? '8px 14px' : '10px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: isMobile ? '14px' : '16px', fontWeight: 600, color: 'white', fontFamily: 'Lato, sans-serif', transition: 'background 0.2s', flexShrink: 0 }}
        >
          <motion.div animate={{ scale: saved ? [1, 1.45, 1] : 1 }} transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}>
            <IconHeart filled={saved} />
          </motion.div>
          {saved ? 'Saved' : 'Save property'}
        </motion.button>
      </div>

      {/* Main content */}
      <div style={{ padding: `0 ${px}` }}>

        {/* Hero card: side-by-side on desktop, stacked on mobile */}
        {stacked ? (
          // Stacked layout
          <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,13,18,0.1)', marginBottom: '16px' }}>
            <PropertyImageCarousel property={property} height={isMobile ? 220 : 300} />
            {/* Details stacked below image */}
            <div style={{ background: 'white', padding: '16px 20px' }}>
              <p style={{ fontSize: '22px', fontWeight: 600, color: '#414651', marginBottom: '6px', fontFamily: 'Lato, sans-serif' }}>{property.price}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                <IconMapPin />
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>{property.address}</p>
              </div>
              <p style={{ fontSize: '14px', color: '#414651', marginBottom: '12px', paddingLeft: '16px', fontFamily: 'Lato, sans-serif' }}>{property.city}</p>
              <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: '12px' }} />
              <div style={{ display: 'flex', gap: '20px' }}>
                {[{ val: property.beds, label: 'Beds' }, { val: property.baths, label: 'Baths' }, { val: property.sqft, label: 'Sq Ft' }, { val: property.acres, label: 'acres' }].map(({ val, label }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: '18px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>{val}</p>
                    <p style={{ fontSize: '10px', fontWeight: 500, color: '#414651', fontFamily: 'Lato, sans-serif' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Desktop side-by-side
          <div style={{ display: 'flex', gap: '24px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,13,18,0.1), 0 1px 2px rgba(10,13,18,0.06)', height: '494px' }}>
            <div style={{ width: '757px', flexShrink: 0, borderRadius: '10px 0 0 10px', overflow: 'hidden' }}>
              <PropertyImageCarousel property={property} height={494} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflow: 'hidden' }}>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ background: 'white', borderRadius: '10px', padding: '24px', overflow: 'hidden' }}>
                <p style={{ fontSize: '24px', fontWeight: 600, color: '#414651', marginBottom: '8px', fontFamily: 'Lato, sans-serif' }}>{property.price}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  <IconMapPin />
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>{property.address}</p>
                </div>
                <p style={{ fontSize: '14px', color: '#414651', marginBottom: '12px', paddingLeft: '16px', fontFamily: 'Lato, sans-serif' }}>{property.city}</p>
                <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: '12px' }} />
                <div style={{ display: 'flex', gap: '24px' }}>
                  {[{ val: property.beds, label: 'Beds' }, { val: property.baths, label: 'Bathrooms' }, { val: property.sqft, label: 'Sq Ft' }, { val: property.acres, label: 'acres' }].map(({ val, label }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <p style={{ fontSize: '20px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>{val}</p>
                      <p style={{ fontSize: '10px', fontWeight: 500, color: '#414651', fontFamily: 'Lato, sans-serif' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} style={{ background: 'white', borderRadius: '10px', padding: '16px 24px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>Presence Score</p>
                  <p style={{ fontSize: '20px', fontWeight: 600, color: presenceColor, fontFamily: 'Lato, sans-serif' }}>{property.presenceScore}%</p>
                </div>
                <div style={{ margin: '8px 0 4px' }}><Sparkline value={property.presenceScore} /></div>
                <p style={{ fontSize: '10px', color: '#535862', fontFamily: 'Lato, sans-serif' }}>Likelihood of current occupancy</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }} style={{ background: 'white', borderRadius: '10px', padding: '16px 24px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>Roof Condition</p>
                  <p style={{ fontSize: '20px', fontWeight: 600, color: roofColor, fontFamily: 'Lato, sans-serif' }}>{property.roofCondition}/100</p>
                </div>
                <div style={{ margin: '8px 0 4px' }}><Sparkline value={property.roofCondition} /></div>
                <p style={{ fontSize: '10px', color: '#535862', fontFamily: 'Lato, sans-serif' }}>Estimated roof condition</p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Score cards on mobile/tablet (shown below hero) */}
        {stacked && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: 'white', borderRadius: '10px', padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>Presence Score</p>
                <p style={{ fontSize: '18px', fontWeight: 600, color: presenceColor, fontFamily: 'Lato, sans-serif' }}>{property.presenceScore}%</p>
              </div>
              <div style={{ margin: '6px 0 3px' }}><Sparkline value={property.presenceScore} /></div>
              <p style={{ fontSize: '10px', color: '#535862', fontFamily: 'Lato, sans-serif' }}>Likelihood of current occupancy</p>
            </div>
            <div style={{ background: 'white', borderRadius: '10px', padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#414651', fontFamily: 'Lato, sans-serif' }}>Roof Condition</p>
                <p style={{ fontSize: '18px', fontWeight: 600, color: roofColor, fontFamily: 'Lato, sans-serif' }}>{property.roofCondition}/100</p>
              </div>
              <div style={{ margin: '6px 0 3px' }}><Sparkline value={property.roofCondition} /></div>
              <p style={{ fontSize: '10px', color: '#535862', fontFamily: 'Lato, sans-serif' }}>Estimated roof condition</p>
            </div>
          </div>
        )}

        {/* Bottom panels */}
        <div style={{ display: 'grid', gridTemplateColumns: stacked ? '1fr' : '1fr 1fr', gap: stacked ? '12px' : '24px', marginTop: stacked ? '0' : '24px', paddingBottom: '48px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: 'white', borderRadius: '10px', padding: '20px 24px', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#414651', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>Property Details</h2>
            {[
              { label: 'Sale Type', val: <Badge type={property.saleType} /> },
              { label: 'Property Type', val: property.propertyType },
              { label: 'Parcel Number', val: property.parcel },
            ].map(({ label, val }, i) => (
              <div key={label}>
                {i > 0 && <div style={{ borderTop: '1px solid #e5e7eb', margin: '10px 0' }} />}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '14px', color: '#717680', fontFamily: 'Lato, sans-serif' }}>{label}:</p>
                  {typeof val === 'string'
                    ? <p style={{ fontSize: '14px', color: '#414651', fontFamily: 'Lato, sans-serif' }}>{val}</p>
                    : val}
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }} style={{ background: 'white', borderRadius: '10px', padding: '20px 24px', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#414651', marginBottom: '12px', fontFamily: 'Lato, sans-serif' }}>Listing Information</h2>
            {[
              { label: 'Uploaded by', val: property.county },
              { label: 'Verification', val: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="#039855" strokeWidth="1.5" /><path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#039855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <p style={{ fontSize: '14px', color: '#414651', fontFamily: 'Lato, sans-serif' }}>County Verified</p>
                </div>
              )},
              { label: 'Owner', val: property.owner },
            ].map(({ label, val }, i) => (
              <div key={label}>
                {i > 0 && <div style={{ borderTop: '1px solid #e5e7eb', margin: '10px 0' }} />}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '14px', color: '#717680', fontFamily: 'Lato, sans-serif' }}>{label}:</p>
                  {typeof val === 'string'
                    ? <p style={{ fontSize: '14px', color: '#414651', fontFamily: 'Lato, sans-serif' }}>{val}</p>
                    : val}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function KeytrnPrototype() {
  const [screen, setScreen] = useState('home')
  const [dir, setDir] = useState(1)
  const [query, setQuery] = useState('')
  const [property, setProperty] = useState(null)
  const [activeFilters, setActiveFilters] = useState(['judicial', 'upset', 'private', 'repository'])
  const [advFilters, setAdvFilters] = useState({ priceMax: null, beds: null, propertyType: null })

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  const go = (next, d = 1) => { setDir(d); setScreen(next) }

  const handleSearch = (q) => { setQuery(q); go('results', 1) }
  const handleSelectProperty = (p) => { setProperty(p); go('detail', 1) }

  return (
    <div style={{ overflow: 'hidden' }}>
      <AnimatePresence mode="wait" custom={dir}>
        {screen === 'home' && (
          <motion.div key="home" custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
            <HomeScreen
              onSearch={handleSearch}
              onSelectProperty={handleSelectProperty}
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
              advFilters={advFilters}
              onAdvFilters={setAdvFilters}
            />
          </motion.div>
        )}
        {screen === 'results' && (
          <motion.div key="results" custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
            <ResultsScreen
              query={query}
              onCardClick={handleSelectProperty}
              initialFilters={activeFilters}
              onBackHome={() => go('home', -1)}
              advFilters={advFilters}
              onAdvFilters={setAdvFilters}
            />
          </motion.div>
        )}
        {screen === 'detail' && (
          <motion.div key="detail" custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
            <DetailScreen property={property} onBack={() => go('results', -1)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
