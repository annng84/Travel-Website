export interface CommitteeMember {
  id: string;
  name: string;
  honorific?: string;
  role: string;
  category: 'executive' | 'standing' | 'advisory';
  department: string;
  term: string;
  bio: string;
  achievements: string[];
  email: string;
  phone?: string;
  linkedin?: string;
  imageUrl: string;
  quote?: string;
}

export interface HistoricalEvent {
  id: string;
  year: number;
  dateStr: string;
  era: 'founding' | 'civic_expansion' | 'mid_century' | 'modern_growth' | 'centennial';
  eraLabel: string;
  title: string;
  summary: string;
  fullNarrative: string;
  documentTitle?: string;
  documentType?: 'Charter' | 'Deed' | 'Meeting Minutes' | 'Speech' | 'Photographic Record';
  documentExcerpt?: string;
  signatories?: string[];
  imageUrl?: string;
}

export interface SocietyEvent {
  id: string;
  title: string;
  type: 'upcoming' | 'past';
  category: 'Gala & Banquets' | 'Cultural Lectures' | 'Youth & Scholarship' | 'General Assembly' | 'Community Service';
  date: string;
  time: string;
  timestamp: string; // ISO format for countdown
  venue: string;
  address: string;
  description: string;
  schedule: { time: string; activity: string }[];
  keynoteSpeaker?: string;
  dressCode?: string;
  ticketPrice?: string;
  capacity?: number;
  registeredCount: number;
  imageUrl: string;
  recapNotes?: string;
  highlights?: string[];
}

export interface SocietyBrandConfig {
  organizationName: string;
  establishedYear: number;
  motto: string;
  accentColor: 'navy' | 'burgundy' | 'emerald' | 'amber';
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  headquarters: string;
}

export const initialBrandConfig: SocietyBrandConfig = {
  organizationName: "Metropolitan Heritage Society & Foundation",
  establishedYear: 1888,
  motto: "Concordia, Traditio et Progressus • Unity, Tradition, and Progress",
  accentColor: "navy",
  heroSubtitle: "Dedicated to the enduring preservation of regional culture, historic legacy, and civic leadership across three centuries.",
  contactEmail: "secretary@heritagesociety.org",
  contactPhone: "+1 (555) 234-8890",
  headquarters: "The Sovereign Hall & Archival Guild, 450 Heritage Way, Suite 100",
};

export const initialCommitteeMembers: CommitteeMember[] = [
  {
    id: "mem-1",
    name: "Dr. Eleanor Vance-Montgomery",
    honorific: "D.Phil, FRSA",
    role: "Society President",
    category: "executive",
    department: "Executive Council",
    term: "2023 – 2027 (2nd Term)",
    bio: "Dr. Vance-Montgomery has led the Society through its historic 135th milestone, spearheading the $2.5M Historic Preservation Endowment and modernizing digital access to over 15,000 archival manuscripts. A former senior fellow of historical humanities, she brings thirty years of non-profit governance experience.",
    achievements: [
      "Inaugurated the Centennial Endowment Trust for Academic Fellows",
      "Restored the 1912 Guildhall Library and climate-controlled vaults",
      "Author of 'Three Centuries of Civic Fellowship: The Metropolitan Story'"
    ],
    email: "president@heritagesociety.org",
    phone: "+1 (555) 234-8891",
    linkedin: "https://linkedin.com",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    quote: "Our duty is not merely to guard the ashes of our past, but to pass forward the living flame of fellowship to the coming generations."
  },
  {
    id: "mem-2",
    name: "Marcus Thorne",
    honorific: "Esq., LL.M",
    role: "Vice President & Chief Legal Counsel",
    category: "executive",
    department: "Executive Council",
    term: "2024 – 2028",
    bio: "Marcus has served on the legal advisory board for over twelve years. He oversees institutional governance, chartered legal affairs, statutory compliance, and constitutional amendments across our regional chapters.",
    achievements: [
      "Drafted the Society's Revised 2024 Charter of Inclusivity & Heritage",
      "Safeguarded the permanent endowment trust under perpetual tax-exempt covenant",
      "Coordinated with municipal landmarks preservation commissions"
    ],
    email: "vp.legal@heritagesociety.org",
    phone: "+1 (555) 234-8892",
    linkedin: "https://linkedin.com",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    quote: "Sound governance is the bedrock upon which our century of cultural trust firmly rests."
  },
  {
    id: "mem-3",
    name: "Victoria Chen",
    honorific: "MBA, B.Sc",
    role: "General Secretary",
    category: "executive",
    department: "Executive Council",
    term: "2022 – 2026",
    bio: "Victoria directs committee administrative operations, official assemblies, and inter-organization diplomatic ties. With an extensive background in philanthropic program execution, she oversees member communications and general secretarial records.",
    achievements: [
      "Implemented cloud-synchronized archival voting and meeting proceedings",
      "Grew active member engagement across nationwide chapters by 42%",
      "Oversees the editorial board of the Quarterly Heritage Gazette"
    ],
    email: "secretary@heritagesociety.org",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    quote: "Clear communication binds the fellowship together; integrity keeps us whole."
  },
  {
    id: "mem-4",
    name: "Jonathan Sterling",
    honorific: "CPA, CFA",
    role: "Treasurer & Finance Director",
    category: "executive",
    department: "Executive Council",
    term: "2023 – 2027",
    bio: "A veteran wealth manager and certified public accountant, Jonathan has stewarded the Society's investment reserves and annual operating budgets with prudence, achieving consecutive clean audit evaluations for five years.",
    achievements: [
      "Increased scholarship endowment yields by 18% through ethical ESG assets",
      "Funded 100% of the digital conservation laboratory debt-free",
      "Maintained four-star charity navigator accountability compliance"
    ],
    email: "treasurer@heritagesociety.org",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    quote: "Prudent stewardship ensures our great mission will flourish for the next one hundred years."
  },
  {
    id: "mem-5",
    name: "Prof. Arthur Kingsbury",
    honorific: "Ph.D",
    role: "Chief Archival Historian & Curator",
    category: "standing",
    department: "Archives & Heritage Committee",
    term: "2021 – 2025",
    bio: "Professor Emeritus of History, Arthur leads our archival research department. He curates the society's original 1888 founding manifests, rare manuscripts, and commemorative photography collection.",
    achievements: [
      "Digitized the complete 1888–1945 hand-written Guild Minutes",
      "Curated major exhibition with the State Historical Museum",
      "Established the Rare Book & Ephemera Preservation Protocol"
    ],
    email: "archives@heritagesociety.org",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    quote: "History is a conversation across generations. We preserve the voices so that tomorrow may listen."
  },
  {
    id: "mem-6",
    name: "Beatrice Morales",
    honorific: "M.A.",
    role: "Events & Annual Assemblies Chair",
    category: "standing",
    department: "Gala & Special Events Committee",
    term: "2024 – 2026",
    bio: "Beatrice brings over fifteen years of high-profile gala production and symposium coordination. She directs our Annual Heritage Banquet, Spring Lecture Series, and international delegate hospitality.",
    achievements: [
      "Organized the 135th Gala with record-setting 450 dignitaries in attendance",
      "Expanded community cultural evenings to sell-out audiences",
      "Pioneered hybrid virtual viewing for our overseas alumni"
    ],
    email: "events@heritagesociety.org",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    quote: "Every gathering is a celebration of our living fellowship andshared heritage."
  },
  {
    id: "mem-7",
    name: "Dr. David O'Connor",
    honorific: "Ed.D",
    role: "Youth & Scholarship Directorate Chair",
    category: "standing",
    department: "Youth & Scholarship Committee",
    term: "2023 – 2027",
    bio: "Dr. O'Connor oversees our youth fellowship program, collegiate historical scholarships, and high school academic awards, mentoring the next generation of historians and community leaders.",
    achievements: [
      "Disbursed $180,000 in university research grants in the past academic year",
      "Launched the High School Heritage Essay Competition across 40 districts",
      "Built the Young Historians Summer Apprenticeship program"
    ],
    email: "scholarships@heritagesociety.org",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    quote: "When we invest in the intellectual curiosity of our youth, we secure the future of our culture."
  },
  {
    id: "mem-8",
    name: "Samantha Wright",
    honorific: "M.Arch",
    role: "Architectural & Memorial Assets Custodian",
    category: "standing",
    department: "Preservation & Landmarks Committee",
    term: "2022 – 2026",
    bio: "A licensed preservation architect, Samantha safeguards the Society's historic properties, commemorative monuments, and historic stained glass assemblies across the metropolitan quarter.",
    achievements: [
      "Led seismic retrofit and restoration of the 1912 Romanesque Grand Hall",
      "Earned the Governor's Historic Landmark Preservation Citation",
      "Cataloged 120 historic public monuments under society guardianship"
    ],
    email: "landmarks@heritagesociety.org",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    quote: "Our physical structures carry the stone-carved memory of those who built before us."
  },
  {
    id: "mem-9",
    name: "The Hon. George Abernathy",
    honorific: "K.St.J (Ret.)",
    role: "President Emeritus & Senior Trustee",
    category: "advisory",
    department: "Board of Trustees & Advisory Council",
    term: "Lifetime Trustee",
    bio: "Former Society President (1998–2010) and retired federal magistrate. The Honorable George Abernathy provides institutional counsel, conflict mediation, and long-range strategic wisdom to the sitting executive board.",
    achievements: [
      "Presided over the Society's 110th and 120th Centennial Jubilee convocations",
      "Established the Abernathy Trust for Heritage Education",
      "Fifty-two years of distinguished civic service"
    ],
    email: "trustees@heritagesociety.org",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    quote: "Constancy of purpose through times of rapid change is the truest mark of institutional greatness."
  }
];

export const initialHistoricalEvents: HistoricalEvent[] = [
  {
    id: "hist-1",
    year: 1888,
    dateStr: "October 18, 1888",
    era: "founding",
    eraLabel: "The Founding Era (1888–1910)",
    title: "Signing of the Original Charter of Fellowship",
    summary: "Fourteen prominent civic leaders, scholars, and trade guild masters gathered in the historic council chamber to formalize the Heritage Society.",
    fullNarrative: "On a brisk autumn evening in October 1888, following the rapid industrialization of our metropolitan county, fourteen civic leaders recognized that the unique arts, ancestral records, and cultural cohesion of our community were in danger of dissolution. Convening in the Old Town Assembly Hall under the chairmanship of Alderman Thomas Vance, they drafted and executed the original 'Articles of Perpetual Fellowship & Cultural Preservation'. Each founder pledged personal bonds to create a permanent archive.",
    documentTitle: "The Original Charter of Perpetual Association of 1888",
    documentType: "Charter",
    documentExcerpt: "We, the undersigned citizens and guardians of communal memory, do hereby bind ourselves and our successors in perpetual concord to preserve the records, promote the arts, and honor the sacrifices of our forebears for all ages to come.",
    signatories: [
      "Alderman Thomas Vance (First President)",
      "Dr. Julian Sterling, M.D.",
      "Archivist Henry C. Thorne",
      "Captain Robert Kingsley",
      "Master Guildsman Elias Vance"
    ],
    imageUrl: "/src/assets/images/history_archive_vintage_1791619991115.jpg"
  },
  {
    id: "hist-2",
    year: 1912,
    dateStr: "May 4, 1912",
    era: "founding",
    eraLabel: "The Founding Era (1888–1910)",
    title: "Dedication of the Metropolitan Guildhall & Archive Vaults",
    summary: "Construction completed on the neo-classical Sovereign Guildhall, providing a permanent home for the society's growing manuscripts, library, and banquet hall.",
    fullNarrative: "Following generous civic subscription and philanthropic land bequests, the cornerstone for the permanent headquarters was laid in 1910 and dedicated in May 1912. Designed in grand Romanesque Revival style by renowned municipal architect Percival Wright, the structure featured fortified fireproof vaults, oak-paneled meeting chambers, and a 500-seat banqueting hall that remains our spiritual home today.",
    documentTitle: "Guildhall Cornerstone Inscription & Architectural Deed",
    documentType: "Deed",
    documentExcerpt: "Erected in honor of the pioneer generation; dedicated to the enduring instruction of posterity.",
    imageUrl: "/src/assets/images/heritage_hero_banner_1791619968238.jpg"
  },
  {
    id: "hist-3",
    year: 1934,
    dateStr: "September 12, 1934",
    era: "civic_expansion",
    eraLabel: "Resilience & Civic Relief (1911–1945)",
    title: "Establishment of the Great Depression Relief & Artisan Fund",
    summary: "During the depths of the economic depression, the society mobilized resources to sustain struggling local artisans, musicians, and historians.",
    fullNarrative: "Faced with unprecedented economic hardship, Society President Arthur Sterling restructured the fellowship's endowment into an active relief program. Over 300 traditional woodcarvers, stonecutters, musicians, and historical researchers were commissioned to document municipal records, restore public murals, and preserve oral family histories, ensuring heritage survived the crisis intact.",
    documentTitle: "Resolution of Emergency Civic Relief & Guild Subsidy",
    documentType: "Meeting Minutes",
    documentExcerpt: "Let it never be said that poverty quenched our culture. What we save today will sustain the spirit of tomorrow.",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hist-4",
    year: 1956,
    dateStr: "June 20, 1956",
    era: "mid_century",
    eraLabel: "Post-War Golden Jubilee (1946–1975)",
    title: "The Golden Jubilee & Archival Public Research Reading Room",
    summary: "Celebrating over sixty-five years of service, the Society opened its doors to collegiate scholars and the public with a dedicated research library.",
    fullNarrative: "Marking the mid-century revival, the Society expanded the second wing of the Guildhall to house a public research reading room. Tens of thousands of family genealogies, historic cartographic charts, and town registers were opened to collegiate researchers, establishing our institution as the definitive authority on regional heritage.",
    documentTitle: "Governor's Proclamation of Commendation",
    documentType: "Speech",
    documentExcerpt: "A commonwealth that forgets its origins cannot guide its destination. We salute the Heritage Society for preserving the compass.",
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hist-5",
    year: 1988,
    dateStr: "October 18, 1988",
    era: "modern_growth",
    eraLabel: "Centennial Milestone & Modern Growth (1976–2000)",
    title: "The Centennial Jubilee & Centennial Endowment Trust",
    summary: "One hundred years since the inaugural gathering, the Society established a multi-million-dollar endowment for youth fellowships and collegiate grants.",
    fullNarrative: "A black-tie assembly of over 600 international delegates and descendants of the founding fourteen gathered in the Sovereign Hall. The Centennial Declaration was ratified, cementing an ambitious mission: transition from passive preservation into active generational mentorship through endowed academic chairs and secondary school grants.",
    documentTitle: "The Centennial Covenant & Endowment Manifesto",
    documentType: "Charter",
    documentExcerpt: "One century of faithfulness fulfilled; another century of enlightenment begun.",
    imageUrl: "/src/assets/images/community_event_stage_1791620031804.jpg"
  },
  {
    id: "hist-6",
    year: 2018,
    dateStr: "April 15, 2018",
    era: "centennial",
    eraLabel: "21st Century & Next Era (2001–Present)",
    title: "Launch of the Digital Manuscript Vault & Open Heritage Project",
    summary: "Equipped with state-of-the-art spectral imaging, the society began digitizing its fragile 19th-century paper artifacts for researchers worldwide.",
    fullNarrative: "Under the direction of Dr. Eleanor Vance-Montgomery, a high-resolution multispectral scanner was installed in the climate-controlled vaults. In partnership with major university libraries, over 25,000 pages of rare deeds, letters, and architectural drawings were made freely accessible online.",
    documentTitle: "Open Knowledge & Archival Consortium Protocol",
    documentType: "Photographic Record",
    documentExcerpt: "Making history touchable across every screen without aging a single fiber of parchment.",
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hist-7",
    year: 2024,
    dateStr: "October 18, 2024",
    era: "centennial",
    eraLabel: "21st Century & Next Era (2001–Present)",
    title: "136th Anniversary Convocation & Future Centennial Blueprint",
    summary: "Ratification of the Society's 2030 Sustainability & Youth Leadership Roadmap, welcoming over 120 new junior fellows.",
    fullNarrative: "With membership surpassing 4,200 worldwide, the General Assembly approved the construction of a new educational pavilion and established partnerships with twelve historic sister societies across Europe and the Americas.",
    documentTitle: "The 2030 Vision Statement of the General Assembly",
    documentType: "Charter",
    documentExcerpt: "Rooted in heritage, reaching toward tomorrow.",
    imageUrl: "/src/assets/images/heritage_hero_banner_1791619968238.jpg"
  }
];

export const initialEvents: SocietyEvent[] = [
  {
    id: "evt-next",
    title: "136th Annual Grand Heritage Gala & Preservation Awards",
    type: "upcoming",
    category: "Gala & Banquets",
    date: "Saturday, November 14, 2026",
    time: "6:30 PM – 11:00 PM EDT",
    timestamp: "2026-11-14T18:30:00",
    venue: "The Sovereign Guildhall & Grand Ballroom",
    address: "450 Heritage Way, Metropolitan Historic District",
    description: "Our premier formal celebration of the year! Join over 400 civic leaders, patrons, scholars, and friends for an unforgettable evening featuring the presentation of the 2026 Heritage Honors, a four-course seasonal banquet, silent auction of rare prints, and live classical chamber orchestra.",
    schedule: [
      { time: "6:30 PM", activity: "Champagne Reception & Archival Exhibition Viewing in the Gallery" },
      { time: "7:30 PM", activity: "President's Welcome & Official Call to Order by Dr. Eleanor Vance-Montgomery" },
      { time: "8:00 PM", activity: "Four-Course Executive Banquet prepared by Chef Laurent Fontaine" },
      { time: "9:15 PM", activity: "Conferral of the 2026 Sovereign Heritage Medals & Youth Scholarships" },
      { time: "10:00 PM", activity: "Keynote Address: 'Memory as Civic Duty' & Musical Ball" }
    ],
    keynoteSpeaker: "The Hon. Dame Evelyn Cross, Chancellor of Historical Antiquities",
    dressCode: "Black Tie / Formal Evening Attire / Medals & Decorations Welcome",
    ticketPrice: "$175 Patron / $85 Junior Fellow / Table of 10: $1,500",
    capacity: 450,
    registeredCount: 382,
    imageUrl: "/src/assets/images/heritage_hero_banner_1791619968238.jpg",
    highlights: [
      "Presentation of $180,000 in collegiate youth research awards",
      "Live chamber quartet performing 19th-century regional compositions",
      "Exclusive preview of the newly restored 1888 Founding Manuscript",
      "Commemorative bound edition of the 136th Annual Society Annals"
    ]
  },
  {
    id: "evt-2",
    title: "Centennial Archive Colloquium: Unseen 19th Century Deeds",
    type: "upcoming",
    category: "Cultural Lectures",
    date: "Thursday, December 3, 2026",
    time: "2:00 PM – 4:30 PM EDT",
    timestamp: "2026-12-03T14:00:00",
    venue: "Guildhall Research Library & Atrium",
    address: "450 Heritage Way, Library Wing Room 204",
    description: "A rare academic seminar presenting newly discovered architectural drawings, secret guild covenants, and correspondence between founding civic elders from 1888 to 1912.",
    schedule: [
      { time: "2:00 PM", activity: "Curator's introduction to rare illuminated documents" },
      { time: "2:45 PM", activity: "Lecture by Prof. Arthur Kingsbury: 'The Hidden Architects'" },
      { time: "3:45 PM", activity: "Audience Q&A & Hands-on viewing under conservator supervision" }
    ],
    keynoteSpeaker: "Prof. Arthur Kingsbury & Conservator Elena Rostova",
    dressCode: "Smart Casual",
    ticketPrice: "Free for Society Members / $15 Guest Donation",
    capacity: 90,
    registeredCount: 68,
    imageUrl: "/src/assets/images/history_archive_vintage_1791619991115.jpg",
    highlights: [
      "First public display of Alderman Thomas Vance's 1889 personal journal",
      "High-magnification digital microscope inspection station",
      "Afternoon tea and artisan pastry reception included"
    ]
  },
  {
    id: "evt-3",
    title: "Annual General Assembly & 2027 Committee Elections",
    type: "upcoming",
    category: "General Assembly",
    date: "Saturday, January 23, 2027",
    time: "10:00 AM – 1:30 PM EDT",
    timestamp: "2027-01-23T10:00:00",
    venue: "Main Council Chambers & Zoom Livestream",
    address: "450 Heritage Way, Chamber Hall",
    description: "The statutory constitutional gathering of the general membership. Review of audited financial reports, election of new Executive and Standing Committee members, and voting on 2027 capital restoration projects.",
    schedule: [
      { time: "10:00 AM", activity: "Quorum verification & reading of previous minutes" },
      { time: "10:30 AM", activity: "Treasurer's presentation of the 2026 Fiscal Audit" },
      { time: "11:30 AM", activity: "Committee slate elections & secret ballot tallying" },
      { time: "12:30 PM", activity: "Announcement of results & light fellowship luncheon" }
    ],
    dressCode: "Business Attire",
    ticketPrice: "Complimentary for all active voting members",
    capacity: 250,
    registeredCount: 145,
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Official distribution of the 2026 Annual Audit Report",
      "Voting on the proposed expansion of the West Vault Archive",
      "Induction of 2026 Lifetime Fellows"
    ]
  },
  {
    id: "evt-past-1",
    title: "135th Founders' Day Memorial Banquet & Convocation",
    type: "past",
    category: "Gala & Banquets",
    date: "October 19, 2025",
    time: "7:00 PM EDT",
    timestamp: "2025-10-19T19:00:00",
    venue: "The Sovereign Guildhall Ballroom",
    address: "450 Heritage Way",
    description: "Our landmark 135th anniversary assembly attended by over 420 guests, commemorating the vision of the fourteen original founders with the unveiling of a newly restored bronze memorial plaque.",
    schedule: [
      { time: "7:00 PM", activity: "Founders' Roll Call and Bell Tolling Ceremony" },
      { time: "8:00 PM", activity: "Jubilee Dinner & Historical Retrospective Film" }
    ],
    imageUrl: "/src/assets/images/community_event_stage_1791620031804.jpg",
    registeredCount: 420,
    recapNotes: "Raised $140,000 for the Junior Fellows Endowment. Unveiled the restored 1888 Founders Plaque and honored twelve 50-year veteran members with the Order of the Oak Leaf.",
    highlights: [
      "420 guests from 14 regional chapters in attendance",
      "Unveiling of the newly restored Founders Bronze Relief",
      "Celebratory address broadcast to regional television archives"
    ]
  },
  {
    id: "evt-past-2",
    title: "Spring Historical Architecture Walking Tour & Tea",
    type: "past",
    category: "Community Service",
    date: "May 17, 2025",
    time: "1:00 PM – 5:00 PM EDT",
    timestamp: "2025-05-17T13:00:00",
    venue: "Historic Old Quarter & Riverfront Promenade",
    address: "Starting at the Guildhall Steps",
    description: "A guided walking exploration of twelve late-Victorian and Romanesque landmark buildings saved from demolition by the Society over the past century.",
    schedule: [
      { time: "1:00 PM", activity: "Walking departure from Guildhall courtyard" },
      { time: "4:00 PM", activity: "Traditional afternoon cream tea in the Conservatory" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    registeredCount: 180,
    recapNotes: "More than 180 local families and architecture students joined the guided circuit, culminating in an architectural sketching exhibition.",
    highlights: [
      "Private access inside three typically closed landmark residences",
      "Special souvenir field guide with vintage 1890s maps",
      "Proceeds donated to the Stone Facade Restoration Fund"
    ]
  }
];

export const STORAGE_KEYS = {
  BRAND: "heritage_society_brand_v1",
  MEMBERS: "heritage_society_members_v1",
  HISTORY: "heritage_society_history_v1",
  EVENTS: "heritage_society_events_v1",
  RSVPS: "heritage_society_rsvps_v1",
  CUSTOM_DOCS: "heritage_society_uploaded_docs_v1",
};

export function getStoredBrand(): SocietyBrandConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRAND);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Using default brand", e);
  }
  return initialBrandConfig;
}

export function saveStoredBrand(brand: SocietyBrandConfig) {
  localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brand));
}

export function getStoredMembers(): CommitteeMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Using default members", e);
  }
  return initialCommitteeMembers;
}

export function saveStoredMembers(members: CommitteeMember[]) {
  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
}

export function getStoredHistory(): HistoricalEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Using default history", e);
  }
  return initialHistoricalEvents;
}

export function saveStoredHistory(history: HistoricalEvent[]) {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

export function getStoredEvents(): SocietyEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Using default events", e);
  }
  return initialEvents;
}

export function saveStoredEvents(events: SocietyEvent[]) {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

export interface UserUploadedDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  extractedTextSnippet: string;
  status: 'parsed' | 'imported';
}

export function getStoredUploadedDocs(): UserUploadedDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_DOCS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(e);
  }
  return [
    {
      id: "doc-sample-1",
      name: "Charter_Constitution_1888_Certified_Transcript.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      uploadDate: "Archived Record",
      extractedTextSnippet: "Articles of perpetual association ratified by the fourteen founding trustees...",
      status: "parsed"
    },
    {
      id: "doc-sample-2",
      name: "Executive_Committee_Roster_2024_2026.docx",
      size: "480 KB",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      uploadDate: "Archived Record",
      extractedTextSnippet: "Officers: Dr. Eleanor Vance-Montgomery (President), Marcus Thorne (VP), Victoria Chen (Sec)...",
      status: "parsed"
    },
    {
      id: "doc-sample-3",
      name: "136th_Annual_Gala_Official_Programme.pdf",
      size: "3.1 MB",
      type: "application/pdf",
      uploadDate: "Archived Record",
      extractedTextSnippet: "Order of proceedings: Keynote by The Hon. Dame Evelyn Cross, Sovereign Medals conferral...",
      status: "parsed"
    }
  ];
}

export function saveStoredUploadedDocs(docs: UserUploadedDocument[]) {
  localStorage.setItem(STORAGE_KEYS.CUSTOM_DOCS, JSON.stringify(docs));
}
