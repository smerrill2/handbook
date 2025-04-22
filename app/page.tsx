'use client'; // Required for client-side hooks

import React, { useState, useEffect, useCallback } from 'react'; // Removed useRef
import Image from "next/image";

// Updated NavClicker styling to match Alpha theme
// Removed unused NavClicker const
// const NavClicker = ({ href, children }: { href: string; children: React.ReactNode }) => (
//   <a 
//     href={href} 
//     className="inline-block bg-alpha-primary hover:bg-alpha-secondary text-alpha-text font-pixel shadow-md py-2 px-4 m-2 text-center transition-colors duration-200"
//   >
//     {children}
//   </a>
// );

// Organize menuItems into chapters
const chapters = [
  {
    id: "intro",
    title: "Introduction",
    icon: "/icons/intro-icon.svg",
    sections: [
      { href: "#cover-letter-intro", label: "Introduction" },
      { href: "#culture", label: "Our Desired Culture" },
    ]
  },
  {
    id: "mission",
    title: "Mission & Values",
    icon: "/icons/mission-icon.svg",
    sections: [
      { href: "#mission", label: "Mission and Vision" },
      { href: "#values", label: "Values" },
    ]
  },
  {
    id: "transparency",
    title: "Transparency & Conduct",
    icon: "/icons/transparency-icon.svg",
    sections: [
      { href: "#transparency", label: "Transparency" },
      { href: "#candidate-fit", label: "Candidate Fit" },
      { href: "#termination", label: "Termination Triggers" },
    ]
  },
  {
    id: "benefits",
    title: "Benefits & Time Off",
    icon: "/icons/benefits-icon.svg",
    sections: [
      { href: "#vacation", label: "Vacation and Leave" },
      { href: "#benefits", label: "Benefits & Development" },
    ]
  },
  {
    id: "organization",
    title: "Organization & Performance",
    icon: "/icons/organization-icon.svg",
    sections: [
      { href: "#organization", label: "Organization" },
      { href: "#salaries", label: "Salaries" },
      { href: "#performance", label: "Performance" },
      { href: "#concerns", label: "Employee Concerns" },
    ]
  },
];

// Flatten chapters into a single array for navigation
const menuItems = chapters.flatMap(chapter => {
  // Insert a chapter title section before the actual content sections
  return [
    { href: `#chapter-${chapter.id}`, label: `Chapter: ${chapter.title}`, icon: chapter.icon, isChapter: true },
    ...chapter.sections
  ];
});

// Add the Creator section at the very end
menuItems.push({ href: "#creator", label: "Meet the Creator", isCreatorSection: true });

// Local storage key
// Removed unused UNLOCKED_SECTIONS_KEY variable assignment

// Type for the next section info
// Removed unused NextSectionInfo interface definition

// --- Ordered Background Images ---
const backgroundImages = [
  '/Background_1.png',
  '/Midday_bg2.png',
  '/Evening_bg3.png',
  '/dusk_bg4.png',
  '/night bg5.png',
  '/DOMAIN_OF_THE_SHATTERED6.png'
];

// Identify dark backgrounds for text contrast
const darkBackgrounds = [
  '/InitialPhoto.png', // The intermediate Stonehenge image
  '/Evening_bg3.png',
  '/dusk_bg4.png',
  '/night bg5.png',
  '/DOMAIN_OF_THE_SHATTERED6.png'
];

// Constants for animation durations
const PAGE_TURN_DURATION = 250; // ms for fade out/in
const BG_FADE_DURATION = 500;   // ms for background crossfade
const SPLASH_BG_IMAGE = '/InitialPhoto.png'; // Use the correct intermediate image
const LINGER_DURATION = 3000; // 3 seconds linger time
const LOADING_BAR_DURATION = BG_FADE_DURATION + LINGER_DURATION; // Total time the bar is visible

// Interface for Section item (already exists, but good for clarity)
interface MenuItem {
  href: string;
  label: string;
  icon?: string;  // Optional icon path
  isChapter?: boolean; // Whether this item is a chapter header
  isCreatorSection?: boolean; // NEW: Flag for the creator section
}

// Props type for the SectionContent component
interface SectionContentProps {
  section: MenuItem | undefined;
  headingClasses: string;
  subHeadingClasses: string;
  sectionClasses: string;
}

// NEW: Component to render specific section content
const SectionContent = ({ section, headingClasses, subHeadingClasses, sectionClasses }: SectionContentProps) => {
  if (!section) return null;

  // Render chapter title with icon
  if (section.isChapter) {
    return (
      <section key={section.href} id={section.href.substring(1)} className={`${sectionClasses} text-center flex flex-col justify-center h-full`}>
        <div className="flex flex-col items-center justify-center py-8">
          <h2 className={`text-3xl text-alpha-primary font-pixel font-bold mb-6`}>
            CHAPTER
          </h2>
          {section.icon && (
            <div className="my-6">
              <Image
                src={section.icon}
                alt={`${section.label} icon`}
                width={120}
                height={120}
                priority
                className="pixelated" // This ensures the icon remains pixelated when scaled
              />
            </div>
          )}
          <h3 className={`text-2xl text-[#f39c12] font-pixel font-semibold mt-6 px-4 py-2 border-t-2 border-b-2 border-[#f39c12]`}>
            {section.label.replace('Chapter: ', '')}
          </h3>
        </div>
      </section>
    );
  }

  // NEW: Render Creator section
  if (section.isCreatorSection) {
    return (
      <section key={section.href} id={section.href.substring(1)} className={`${sectionClasses} text-center flex flex-col justify-center items-center h-full`}>
        <h2 className={`${headingClasses} mb-6`}>Meet the Creator</h2>
        <div className="p-1 border-4 border-red-400 rounded-md bg-white shadow-lg">
          <Image
            src="/Creator.png" // Assuming image is in /public/Creator.png
            alt="Portrait of the Creator"
            width={192} // w-48
            height={192} // h-48
            priority // Load it eagerly if it's visible initially (might not be needed here)
            className="pixelated object-cover" // Ensure pixelation, cover ensures it fills the space if aspect ratio differs
          />
        </div>
      </section>
    );
  }

  const renderContent = () => {
    switch (section.href) {
      case '#cover-letter-intro':
        return (
          <>
            <h2 className={headingClasses}>Introduction: Welcome to Stonehenge Games!</h2>
            <p className="mb-4">Welcome! This handbook outlines the core principles and practices of Stonehenge Games. We operate in the vibrant **MMORPG industry**, dedicated to creating engaging and innovative gaming experiences.</p>
            <p className="mb-4">Our **organizational structure** is built around agile Squads (up to 8 people) grouped into Units (up to 64), with a total **headcount capped at 128 employees**. This fosters close collaboration and rapid development. We primarily **develop and maintain our flagship MMORPG**, integrating unique, non-intrusive advertising methods as our main **revenue source** through sponsorships.</p>
          </>
        );
      case '#culture':
        return (
          <>
            <h2 className={headingClasses}>Our Desired Culture</h2>
            <p className="mb-4">We strive for a culture defined by:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>**Transparency:** Open communication about finances, game mechanics, and decisions.</li>
              <li>**Community Focus:** Prioritizing player fun and engagement.</li>
              <li>**Innovation:** Encouraging creative solutions in both game development and advertising.</li>
              <li>**Fairness:** Ensuring equitable treatment and opportunities for all employees.</li>
              <li>**Support & Growth:** Fostering psychological safety and professional development (like our Freedom Fridays!).</li>
            </ul>
            <p>The following sections detail how these cultural values translate into our daily operations and policies. We believe this approach empowers our team and builds trust with our community.</p>
          </>
        );
      case '#mission':
        return (
          <>
            <h2 className={headingClasses}>Mission and Vision</h2>
            <p className="mb-4">Our mission is to bridge the gap between gamers and advertisers, fostering enhanced community engagement, fun, and creativity in advertising through non-intrusive methods. We aim to create unique, innovative experiences for all parties in our MMORPG.</p>
          </>
        );
      case '#values':
        return (
          <>
            <h2 className={headingClasses}>Values</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Create fun for the community</li>
              <li>Increase engagement across our MMORPG</li>
              <li>Promote challenging, fair gameplay</li>
              <li>Drive innovation in advertising</li>
              <li>Deliver unique experiences for players and advertisers</li>
            </ul>
          </>
        );
      case '#transparency':
        return (
          <>
            <h2 className={headingClasses}>Transparency</h2>
            <p className="mb-4">We believe transparency is crucial for building trust both internally and with our player community. Therefore, we are highly transparent about:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Drop chances in-game</li>
              <li>Sponsorship payments from advertisers</li>
              <li>Quarterly sponsorship earnings, which are donated to the Ad Council charity</li>
            </ul>
            <p className="mb-4">While not publicly traded, we openly share financial details related to sponsorships to maintain trust with our community.</p>
            <p className="italic text-sm"><strong>Reasoning:</strong> Openness about game mechanics (drop rates) and finances (sponsorships, donations) directly supports our values of fairness and community focus. It ensures players understand the game and see the positive impact of our advertising model.</p>
            <p className="italic text-sm">This approach fosters trust and reinforces the community&apos;s connection to our success.</p>
          </>
        );
      case '#candidate-fit':
        return (
          <>
            <h2 className={headingClasses}>Candidate Fit</h2>
            <h3 className={subHeadingClasses}>Great Fit</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Passionate about creating high-quality games</li>
              <li>Devoted to community engagement</li>
              <li>Motivated to generate revenue through innovative advertising</li>
            </ul>
            <h3 className={subHeadingClasses}>Poor Fit</h3>
            <p className="mb-2">Candidates who:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Disrespect the community</li>
              <li>Fail to communicate (e.g., no-call, no-show)</li>
              <li>Treat coworkers without dignity and respect</li>
            </ul>
          </>
        );
      case '#termination':
        return (
          <>
            <h2 className={headingClasses}>Termination Triggers</h2>
            <p className="mb-2">Employees may face termination for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Disrespecting the community</li>
              <li>Failing to call in</li>
              <li>Treating coworkers without dignity and respect</li>
            </ul>
          </>
        );
      case '#vacation':
        return (
          <>
            <h2 className={headingClasses}>Vacation and Family Leave Policy</h2>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>PTO Accrual</strong>: 2 hours of PTO earned for every 40 hours worked</li>
              <li><strong>Starting Leave</strong>: 1 week of vacation, 1 week of sick pay</li>
              <li><strong>Rollover</strong>: Leave carries over yearly with no payout at fiscal year-end</li>
              <li><strong>Sabbatical</strong>: Full-time employees receive a month-long sabbatical every 3 years</li>
            </ul>
            <h3 className={subHeadingClasses}>Extenuating Circumstances</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>FMLA</strong>: Available for employees passing a drug test (marijuana permitted; other substances lead to denial and potential termination)</li>
              <li><strong>Maternity Leave</strong>: 4 months for mothers</li>
              <li><strong>Disability/ADA</strong>: All locations are WELL-certified and ADA-compliant (except remote work-from-home setups)</li>
            </ul>
            <h3 className={subHeadingClasses}>Paid Holiday Schedule</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>5 floating holidays of employee&apos;s choice</li>
              <li>Christmas Day off for all employees</li>
            </ul>
          </>
        );
      case '#organization':
        return (
          <>
            <h2 className={headingClasses}>Organization Structure</h2>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Squads</strong>: Teams of up to 8 people</li>
              <li><strong>Units</strong>: Collections of squads, up to 64 people</li>
              <li><strong>Headcount Cap</strong>: Maximum 128 employees</li>
              <li><strong>Leadership</strong>: Each squad has a leader reporting to a unit lead</li>
              <li><strong>Mentorship</strong>: Senior employees mentor entry-level staff to reach intermediate level within 1 year</li>
              <li><strong>Collaboration</strong>: Squads and units may collaborate on projects</li>
            </ul>
          </>
        );
      case '#salaries':
        return (
          <>
            <h2 className={headingClasses}>Salaries</h2>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Standardization</strong>: Entry, intermediate, and senior levels have fixed salaries</li>
              <li><strong>Transparency</strong>: All salaries are public for employees and the community</li>
              <li><strong>Determination</strong>: Salaries reflect the value provided by each role</li>
            </ul>
            <p className="italic text-sm mt-4">
              <strong>Reasoning:</strong> Public, standardized salaries ensure fairness and transparency, reducing potential bias and conflict. They reflect our commitment to valuing roles based on contribution, aligning with our flat hierarchy and collaborative culture.
            </p>
          </>
        );
      case '#performance':
        return (
          <>
            <h2 className={headingClasses}>Performance Measurement and Reviews</h2>
            <p className="mb-4">Performance evaluation focuses on contribution and innovation, moving away from rigid, traditional metrics.</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Individual Performance</strong>: Measured by value brought to the company</li>
              <li><strong>Team Performance</strong>: Managed at the unit lead level, with senior staff overseeing squad contributions</li>
              <li><strong>Review Process</strong>: Conducted holistically, focusing on innovation and productivity</li>
              <li><strong>Frequency</strong>: Not specified, but tied to ongoing squad and unit evaluations</li>
            </ul>
            <p className="italic text-sm">
              <strong>Reasoning:</strong> A holistic review process supports our values of innovation and collaboration. By focusing on overall value rather than strict metrics, and not tying reviews to fixed, infrequent dates, we encourage continuous improvement and risk-taking without the pressure of traditional review cycles.
            </p>
          </>
        );
      case '#concerns':
        return (
          <>
            <h2 className={headingClasses}>Employee Concerns and Psychological Safety</h2>
            <h3 className={subHeadingClasses}>Open Communication</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Open-door policy on Wednesdays (8 AM–5 PM) for all employees to contact higher-ups</li>
              <li>No meetings scheduled on Wednesdays to ensure accessibility</li>
            </ul>
            <h3 className={subHeadingClasses}>Confidentiality</h3>
            <p className="mb-4">Whistleblower protections observed</p>
            <h3 className={subHeadingClasses}>Psychological Safety</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Agile-inspired practices (without strict SCRUM)</li>
              <li>Emphasis on innovation, trust, and openness</li>
              <li>No terminations without unit approval</li>
            </ul>
            <h3 className={subHeadingClasses}>Special Operations</h3>
            <p className="mb-4">HR and other non-work-related issues handled outside traditional unit structure</p>
            <p className="italic text-sm">
              <strong>Reasoning:</strong> Providing psychological safety through open communication channels (Open Door Wednesdays), confidentiality assurances, and collaborative termination decisions is paramount. This fosters trust, encourages feedback, and allows employees to focus on innovation without fear of unfair repercussions.
            </p>
          </>
        );
      case '#benefits':
        return (
          <>
            <h2 className={headingClasses}>Benefits and Professional Development</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>401k and Benefits</strong>: Standard offerings (details not specified)</li>
              <li><strong>Tuition Reimbursement</strong>: Available for employees pursuing higher education</li>
              <li><strong>Freedom Fridays</strong>: Every other Friday dedicated to upskilling, learning, or passion projects
                <ul className="list-disc list-inside ml-4">
                  <li>Failure to engage in professional development may result in reprimand</li>
                </ul>
              </li>
            </ul>
          </>
        );
      default: return null;
    }
  };

  return (
    <section key={section.href} id={section.href.substring(1)} className={sectionClasses}>
      {renderContent()}
    </section>
  );
};

export default function Home() {
  // --- State Management ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [previousBgImage, setPreviousBgImage] = useState<string>(backgroundImages[0]);
  const [isAnimatingBg, setIsAnimatingBg] = useState<boolean>(false);
  const [pageTurnState, setPageTurnState] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const [isShowingBook, setIsShowingBook] = useState<boolean>(false);
  const [overrideBgImage, setOverrideBgImage] = useState<string | null>(null); // State for intermediate BG

  // --- Core Effects ---
  useEffect(() => { // localStorage Effect
    setIsLoaded(true);
  }, []);

  useEffect(() => { // Splash Screen Key Listener
    if (hasStarted) return;

    const handleStartKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setCurrentSectionIndex(0);
        setHasStarted(true);
      }
    };
    window.addEventListener('keydown', handleStartKey);

    return () => {
      window.removeEventListener('keydown', handleStartKey);
    };
  }, [hasStarted]); // Re-added dependency

  // Effect to Trigger Initial Fade-in Animations when Game Starts
  useEffect(() => {
    // Triggered only when hasStarted becomes true
    if (hasStarted) {
      // Step 1: Fade from Initial BG (backgroundImages[0]) to Intermediate BG (SPLASH_BG_IMAGE)
      setPreviousBgImage(backgroundImages[0]);
      setOverrideBgImage(SPLASH_BG_IMAGE); // Set the intermediate target
      setIsAnimatingBg(true);

      // After Step 1 BG fade completes...
      const step1Timer = setTimeout(() => {
        setIsAnimatingBg(false); // Momentarily stop bg animation state

        // Step 2: Show book, fade from Intermediate BG to First Page BG
        setIsShowingBook(true); // Trigger book fade-in
        setPreviousBgImage(SPLASH_BG_IMAGE); // Set previous to the intermediate image
        setOverrideBgImage(null); // Clear the override, currentBgImage will now calculate normally
        setIsAnimatingBg(true); // Trigger second background fade
        setPageTurnState('entering'); // Trigger book content fade-in

        // Cleanup timers for Step 2 animations
        const bgTimer = setTimeout(() => setIsAnimatingBg(false), BG_FADE_DURATION);
        const pageTimer = setTimeout(() => setPageTurnState('idle'), PAGE_TURN_DURATION);

        // Return cleanup for Step 2 timers
        return () => {
            clearTimeout(bgTimer);
            clearTimeout(pageTimer);
        };
      }, BG_FADE_DURATION + LINGER_DURATION); // Wait for first background fade AND linger to finish

      // Cleanup for Step 1 timeout
      return () => {
        clearTimeout(step1Timer);
      };
    }
  }, [hasStarted]); // Triggered only by hasStarted

  // --- Page Turn Handlers ---
  const handlePreviousPage = useCallback(() => {
    if (pageTurnState !== 'idle') return;
    // Move back two sections (left and right page)
    const prevSectionIndex = Math.max(0, currentSectionIndex - 2);
    if (prevSectionIndex !== currentSectionIndex) {
      setPageTurnState('exiting');
      // Background changes every spread (2 sections)
      const currentSpreadIndex = Math.floor(currentSectionIndex / 2);
      const prevSpreadIndex = Math.floor(prevSectionIndex / 2);
      if (currentSpreadIndex !== prevSpreadIndex) {
        setPreviousBgImage(backgroundImages[currentSpreadIndex % backgroundImages.length]);
        setIsAnimatingBg(true);
      }
      setTimeout(() => {
        setCurrentSectionIndex(prevSectionIndex);
        setPageTurnState('entering');
        setTimeout(() => setPageTurnState('idle'), PAGE_TURN_DURATION);
      }, PAGE_TURN_DURATION);
    }
  }, [currentSectionIndex, pageTurnState]);

  const handleNextPage = useCallback(() => {
    if (pageTurnState !== 'idle') return;
    // Move forward two sections (left and right page)
    const nextSectionIndex = currentSectionIndex + 2;
    if (nextSectionIndex < menuItems.length) {
      setPageTurnState('exiting');
      // Background changes every spread (2 sections)
      const currentSpreadIndex = Math.floor(currentSectionIndex / 2);
      const nextSpreadIndex = Math.floor(nextSectionIndex / 2);
      if (currentSpreadIndex !== nextSpreadIndex) {
        setPreviousBgImage(backgroundImages[currentSpreadIndex % backgroundImages.length]);
        setIsAnimatingBg(true);
      }
      setTimeout(() => {
        setCurrentSectionIndex(nextSectionIndex);
        setPageTurnState('entering');
        setTimeout(() => setPageTurnState('idle'), PAGE_TURN_DURATION);
      }, PAGE_TURN_DURATION);
    }
  }, [currentSectionIndex, pageTurnState]);

  // --- Keyboard Navigation Effect --- (Uses updated handlers)
  useEffect(() => {
    if (!hasStarted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNextPage();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePreviousPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasStarted, handleNextPage, handlePreviousPage]);

  // --- Effect to end background animation state after transition ---
  useEffect(() => {
    if (isAnimatingBg) {
      const timer = setTimeout(() => {
        setIsAnimatingBg(false);
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimatingBg]);

  // --- Conditional Returns --- (Now AFTER all core hooks)
  if (!isLoaded) {
    return null; 
  }

  if (!hasStarted) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center font-pixel text-center p-4"
        style={{ backgroundImage: `url('/Background_1.png')` }} // Use first background
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-xl">
          <div className="animate-pulse">
            <h1 className="text-4xl sm:text-5xl text-alpha-secondary font-bold mb-4">
               Are you READY to BEGIN
            </h1>
            <p className="text-xl sm:text-2xl text-white">
              Press <kbd className="font-pixel inline-block bg-alpha-primary text-alpha-text py-1 px-2 mx-1 rounded border-b-2 border-gray-700 shadow-sm hover:bg-alpha-secondary hover:border-gray-900 transform active:translate-y-px active:border-b-0 active:shadow-none">ENTER</kbd> to start
            </p>
          </div>
        </div>
        {/* Logo can still be here if desired */}
        <Image 
          src="/images/logo.svg"
          alt="Stonehenge Logo" 
          width={300} // Slightly larger maybe?
          height={120}
          priority
        />
      </div>
    );
  }

  // --- Styling constants (unchanged) ---
  const sectionClasses = "p-6 border border-alpha-secondary shadow-md scroll-mt-20";
  const headingClasses = "text-2xl text-alpha-primary font-pixel font-semibold mb-4";
  const subHeadingClasses = "text-xl text-alpha-primary font-pixel font-semibold mb-2";

  // --- Calculate Current Background Image ---
  // Background changes every spread (2 sections)
  const currentSpreadIndex = Math.floor(currentSectionIndex / 2);
  const currentBgImage = overrideBgImage ?? backgroundImages[currentSpreadIndex % backgroundImages.length];

  // --- Determine if current background is dark ---
  const isDarkBackground = darkBackgrounds.includes(currentBgImage);

  // --- Get current sections for left and right pages ---
  const leftSection = menuItems[currentSectionIndex];
  const rightSection = menuItems[currentSectionIndex + 1]; // May be undefined on the last spread
  
  // Check if this is the last spread 
  const isLastSpread = currentSectionIndex + 2 >= menuItems.length;

  return (
    <main 
      className="flex min-h-screen flex-col items-center p-8 sm:p-16 pt-24 font-pixel relative pb-20 text-alpha-text overflow-hidden"
    >
      {/* Background Layers */} 
      <div 
         className="absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-500 ease-in-out z-0" // Layer for previous/fading background - Changed to bg-cover
         style={{ backgroundImage: `url(${previousBgImage})`, opacity: isAnimatingBg ? 0 : 1 }} // Fades OUT when animating starts
      />
      <div
         className={`absolute inset-0 bg-no-repeat bg-center z-0 ${currentBgImage === SPLASH_BG_IMAGE ? 'bg-contain' : 'bg-cover'}`}
         style={{ backgroundImage: `url(${currentBgImage})` }} // Dynamically updated
      />

      {/* Header Area: Logo Only */}
      <div className="w-full flex justify-center mb-12 h-20 z-10"> {/* Simpler header */} 
        {overrideBgImage !== SPLASH_BG_IMAGE && (
          <Image 
            src="/images/logo.svg"
            alt="Stonehenge Logo" 
            width={200}
            height={80}
            priority
          />
        )}
      </div>

      {/* Book Container (Outer Frame) - Fixed dimensions */}
      <div 
         className={`w-full max-w-7xl bg-[#8B4513] p-4 rounded-lg shadow-xl border-2 border-[#654321] relative z-10 book-frame transform transition-all duration-700 ease-in-out ${isShowingBook ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
         style={{ height: "calc(75vh)" }} // Fixed height for book container
      >
        {/* Inner Pages Container */} 
        <div className="flex space-x-4 h-full"> 
          {/* Left Page */} 
          <div className="flex-1 bg-[#f5e8c8] p-4 sm:p-6 rounded shadow-inner border border-gray-400 h-full overflow-y-auto">
            <div 
              className={`space-y-12 book-content font-pixel text-black transition-opacity ease-in-out duration-${PAGE_TURN_DURATION} h-full`}
              style={{ opacity: pageTurnState === 'exiting' ? 0 : 1 }}
            >
              {leftSection && ( 
                <SectionContent 
                  section={leftSection} 
                  headingClasses={headingClasses} 
                  subHeadingClasses={subHeadingClasses} 
                  sectionClasses={sectionClasses} 
                />
              )}
            </div>
          </div>

          {/* Right Page */} 
          <div className="flex-1 bg-[#f5e8c8] p-4 sm:p-6 rounded shadow-inner border border-gray-400 h-full overflow-y-auto flex flex-col justify-between">
            <div 
              className={`space-y-12 book-content font-pixel text-black transition-opacity ease-in-out duration-${PAGE_TURN_DURATION} h-full`}
              style={{ opacity: pageTurnState === 'exiting' ? 0 : 1 }}
            >
              {rightSection && ( 
                <SectionContent 
                  section={rightSection} 
                  headingClasses={headingClasses} 
                  subHeadingClasses={subHeadingClasses} 
                  sectionClasses={sectionClasses} 
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls Area */}
      {isShowingBook && (
        <div className={`mt-6 text-center z-20 relative ${isDarkBackground ? 'text-white' : 'text-alpha-text'}`}>
          <p className="text-lg mb-3">
            USE ARROW KEYS TO TURN PAGES
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentSectionIndex === 0}
              className={`bg-alpha-primary hover:bg-alpha-secondary text-alpha-text font-pixel py-2 px-4 border border-alpha-secondary rounded shadow-md transition-colors duration-200 ${currentSectionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${isDarkBackground ? 'border-white' : 'border-alpha-secondary'}`}
            >
              &lt; Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={isLastSpread}
              className={`bg-alpha-primary hover:bg-alpha-secondary text-alpha-text font-pixel py-2 px-4 border border-alpha-secondary rounded shadow-md transition-colors duration-200 ${isLastSpread ? 'opacity-50 cursor-not-allowed' : ''} ${isDarkBackground ? 'border-white' : 'border-alpha-secondary'}`}
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}

      {/* Loading Bar - Appears only during the initial photo transition */}
      {overrideBgImage === SPLASH_BG_IMAGE && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg z-20 px-4">
          {/* Loading bar container */}
          <div className="h-4 bg-alpha-secondary bg-opacity-75 rounded-sm overflow-hidden border-2 border-alpha-primary shadow-lg">
            {/* Animated inner bar - Using CSS animation */}
            <div 
              className="h-full bg-alpha-primary rounded-sm animate-fill-bar" 
              style={{ animationDuration: `${LOADING_BAR_DURATION}ms` }}
            ></div>
          </div>
          <p className="text-center text-white text-shadow-md text-sm sm:text-base mt-2 font-pixel tracking-wider">
            LOADING HANDBOOK...
          </p>
        </div>
      )}
    </main>
  );
}
