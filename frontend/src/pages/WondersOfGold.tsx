import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Sparkles,
  Crown,
  Coins,
  Cpu,
  Heart,
  Rocket,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RandomProductSection from "@/components/products/RandomProductSection";

const WondersOfGold: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  // Background color transform
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#0a0a0a", "#121212", "#1a1a1a", "#0f0f0f", "#151515", "#0a0a0a"]
  );

  // Golden thread progress
  const threadProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const sections = document.querySelectorAll(".story-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(
              entry.target.getAttribute("data-section") || "0"
            );
            setActiveSection(sectionIndex);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const shareExperience = () => {
    if (navigator.share) {
      navigator.share({
        title: "Wonders of Gold: An Interactive Journey Through Time",
        text: "I just explored the #WondersOfGold. From stars to circuits, its story is incredible.",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `I just explored the #WondersOfGold. From stars to circuits, its story is incredible. ${window.location.href}`
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Wonders of Gold: An Interactive Journey Through Time | The Luster
        </title>
        <meta
          name="description"
          content="Explore the fascinating history of gold from its cosmic origins to future applications. An immersive journey through mythology, empires, technology, and space exploration."
        />
        <meta
          name="keywords"
          content="gold history, interactive timeline, gold technology, precious metals, digital museum, educational experience"
        />
        <meta property="og:title" content="Wonders of Gold: An Interactive Journey Through Time" />
        <meta property="og:description" content="From neutron star collisions to quantum computing - discover gold's incredible story through an immersive digital experience." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/placeholder.svg" />
        <meta property="og:url" content={typeof window !== "undefined" ? `${window.location.origin}/wonders-of-gold` : "/wonders-of-gold"} />
        <meta property="og:site_name" content="The Luster" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wonders of Gold: An Interactive Journey Through Time" />
        <meta name="twitter:description" content="From neutron star collisions to quantum computing - discover gold's incredible story through an immersive digital experience." />
        <meta name="twitter:image" content="/images/placeholder.svg" />
        <link rel="canonical" href={typeof window !== "undefined" ? `${window.location.origin}/wonders-of-gold` : "/wonders-of-gold"} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Wonders of Gold: An Interactive Journey Through Time",
            description:
              "Explore the fascinating history of gold from its cosmic origins to future applications. An immersive journey through mythology, empires, technology, and space exploration.",
            image: "/images/placeholder.svg",
            author: {
              "@type": "Organization",
              name: "The Luster",
            },
            publisher: {
              "@type": "Organization",
              name: "The Luster",
            },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": typeof window !== "undefined" ? `${window.location.origin}/wonders-of-gold` : "/wonders-of-gold",
            },
          })}
        </script>
      </Helmet>

      <motion.div
        className="min-h-screen relative overflow-x-hidden"
        style={{ backgroundColor }}
      >
        {/* Golden Thread */}
        <motion.div
          className="fixed left-8 top-0 w-0.5 bg-gradient-to-b from-luxury-gold to-soft-gold z-10"
          style={{ height: threadProgress }}
        />

        {/* Floating Gold Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-luxury-gold rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <Crown className="w-24 h-24 text-luxury-gold mx-auto animate-sparkle" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-playfair font-bold mb-6"
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37, #FFD700, #FFA500)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Wonders of Gold
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 font-cormorant mb-8"
            >
              The Story of an Element. The History of Humanity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-gray-400 font-inter"
            >
              Scroll to begin your journey through time
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 1: The Dawn of Desire */}
        <Link to="/cosmic-origins" className="block group">
          <StorySection
            sectionNumber={1}
            title="The Dawn of Desire"
            subtitle="Pre-history – 3000 BCE"
            icon={<Sparkles className="w-12 h-12" />}
            theme="Myth, Magic, and First Discoveries"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <InfoPoint
                  title="Cosmic Origins"
                  description="Gold's incredible journey began in the violent collision of neutron stars billions of years ago, forging this precious element in the cosmos before it found its way to Earth."
                />
                <InfoPoint
                  title="First Contact"
                  description="Paleolithic humans discovered gold flakes in Spanish caves over 40,000 years ago, beginning humanity's eternal fascination with this radiant metal."
                />
                <InfoPoint
                  title="The Lure of the River"
                  description="Ancient civilizations discovered alluvial gold in riverbeds, particularly along the Nile, where the precious metal would change the course of human history."
                />
                <InfoPoint
                  title="The Sun Metal"
                  description="Egyptians, Incas, and other early cultures worshipped gold as the flesh of the gods, associating it with the sun, divinity, and eternal life."
                />
              </div>
              <div className="relative">
                <motion.div
                  className="w-80 h-80 bg-gradient-to-br from-luxury-gold to-soft-gold rounded-full opacity-20 absolute -top-10 -left-10"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Crown className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-2">
                      Mask of Tutankhamun
                    </h3>
                    <p className="text-gray-300">
                      The golden death mask that has mesmerized the world for
                      over 3,000 years.
                    </p>
                  </CardContent>
                </Card>

                {/* YouTube Video Section */}
                <div className="mt-8">
                  <div className="aspect-video bg-black/50 border border-luxury-gold/30 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/CTtf5s2HFkA"
                      title="The History of Gold"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-2">
                    Ancient Gold: From Cosmic Origins to Civilizations
                  </p>
                </div>
              </div>
            </div>
          </StorySection>
        </Link>

        {/* Section 2: The Currency of Kings */}
        <StorySection
          sectionNumber={2}
          title="The Currency of Kings"
          subtitle="3000 BCE – 1400 AD"
          icon={<Coins className="w-12 h-12" />}
          theme="Power, Empire, and the Birth of Finance"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <InfoPoint
                title="First Coinage"
                description="The Lydian Lion, minted around 650 BCE, became the world's first gold coins, revolutionizing trade and establishing the foundation of modern economics."
              />
              <InfoPoint
                title="Roman Grandeur"
                description="The Aureus coin funded legions and empires, while gold jewelry became symbols of power and status across the Roman Empire."
              />
              <InfoPoint
                title="The Alchemist's Dream"
                description="Medieval scholars obsessed over transmuting base metals into gold, representing the ultimate quest for wealth and knowledge that drove scientific discovery."
              />
              <InfoPoint
                title="Symbol of Faith"
                description="From Christian chalices to Buddhist statues and Islamic calligraphy, gold became the divine medium across all world religions."
              />
            </div>
            <InteractiveTimeline />
          </div>
        </StorySection>

        {/* Section 3: The Age of Greed and Glory */}
        <StorySection
          sectionNumber={3}
          title="The Age of Greed and Glory"
          subtitle="1400 AD – 1900 AD"
          icon={<Crown className="w-12 h-12" />}
          theme="Exploration, Conquest, and Global Rushes"
        >
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <InfoPoint
                title="The New World"
                description="The quest for El Dorado drove Spanish conquistadors to the Americas, where they plundered Incan and Aztec gold, forever altering global power dynamics."
              />
              <InfoPoint
                title="The Gold Rushes"
                description="From California to Klondike to Australia, gold rushes created boom towns, shaped nations, and demonstrated humanity's relentless pursuit of fortune."
              />
              <InfoPoint
                title="Foundation of Wealth"
                description="Gold bullion stored in central vaults became the bedrock of national wealth and international trust in an increasingly connected world."
              />
            </div>
            <GoldRushMap />
          </div>
        </StorySection>

        {/* Section 4: The Modern Standard */}
        <StorySection
          sectionNumber={4}
          title="The Modern Standard"
          subtitle="20th Century"
          icon={<Crown className="w-12 h-12" />}
          theme="The Engine of the Global Economy"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <InfoPoint
                title="The Gold Standard"
                description="For over a century, the world's currencies were backed by gold, providing stability and trust in international commerce until the system ended in 1971."
              />
              <InfoPoint
                title="Fort Knox & Central Banks"
                description="Massive gold reserves in places like Fort Knox became symbols of national strength and economic stability during turbulent times."
              />
              <InfoPoint
                title="Jewellery & Art"
                description="Gold maintained its status as the ultimate material for luxury, from Cartier masterpieces to traditional Indian wedding jewelry worn by millions."
              />
            </div>
            <GoldStandardChart />

            <div className="md:col-span-2 mt-16">
              {/* --- CORRECTED #1: Added unique sectionId prop --- */}
              <RandomProductSection
                title="Timeless Gold Elegance"
                limit={3}
                sectionId="wonders-elegance"
              />
            </div>
          </div>
        </StorySection>

        {/* Section 5: The Technological Marvel */}
        <Link to="/modern-technology" className="block group">
          <StorySection
            sectionNumber={5}
            title="The Technological Marvel"
            subtitle="Present Day"
            icon={<Cpu className="w-12 h-12" />}
            theme="The Unseen Hero of Modern Technology"
          >
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <InfoPoint
                  title="The Digital Age"
                  description="Every smartphone, computer, and GPS device relies on gold's unmatched conductivity and corrosion resistance in critical circuits."
                />
                <InfoPoint
                  title="Saving Lives"
                  description="Gold nanoparticles fight cancer, dental crowns restore smiles, and gold compounds treat rheumatoid arthritis, making it a medical marvel."
                />
                <InfoPoint
                  title="The Golden Shield"
                  description="Astronaut visors and satellite components use gold to reflect infrared radiation and control temperature in the harsh environment of space."
                />
              </div>
              <TechnologyShowcase />

              <div className="mt-12">
                <div className="aspect-video bg-black/50 border border-luxury-gold/30 rounded-lg overflow-hidden max-w-4xl mx-auto">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/VcI0hJDVFAo"
                    title="Gold in Modern Technology"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <p className="text-center text-gray-400 text-sm mt-4">
                  Gold's Hidden Role in Modern Electronics and Medicine
                </p>
              </div>
              <div className="mt-20">
                {/* --- CORRECTED #2: Added unique sectionId prop --- */}
                <RandomProductSection
                  title="Modern Gold Innovations"
                  limit={3}
                  sectionId="wonders-innovations"
                />
              </div>
            </div>
          </StorySection>
        </Link>

        {/* Section 6: The Final Frontier */}
        <Link to="/future-frontiers" className="block group">
          <StorySection
            sectionNumber={6}
            title="The Final Frontier"
            subtitle="The Future"
            icon={<Rocket className="w-12 h-12" />}
            theme="Pioneering the Future"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <InfoPoint
                  title="Space Exploration"
                  description="Essential for future Mars missions and space telescopes like James Webb, gold will help humanity explore the cosmos where it was born."
                />
                <InfoPoint
                  title="Quantum Computing"
                  description="Gold's unique properties may unlock the next generation of quantum computers, revolutionizing how we process information."
                />
                <InfoPoint
                  title="Sustainable Catalysis"
                  description="Gold catalysts help create cleaner fuels and reduce pollution, contributing to a more sustainable future for our planet."
                />
                <InfoPoint
                  title="Nanotechnology"
                  description="The future of targeted drug delivery and advanced diagnostics will be powered by gold nanoparticles smaller than viruses."
                />
              </div>
              <FutureVision />

              <div className="mt-8">
                <div className="aspect-video bg-black/50 border border-luxury-gold/30 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/psuRGfAaju4"
                    title="Gold in Space Exploration"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <p className="text-center text-gray-400 text-sm mt-2">
                  James Webb Space Telescope: Gold's Role in Deep Space
                  Discovery
                </p>
              </div>
            </div>
          </StorySection>
        </Link>

        {/* Final Call to Action */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <h2 className="text-5xl md:text-6xl font-playfair font-bold text-luxury-gold mb-6">
                Gold's story is still being written.
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                From the hearts of dying stars to the frontiers of human
                innovation, gold continues to shape our world in ways we're only
                beginning to understand.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-12"
            >
              {/* --- CORRECTED #3: Added unique sectionId prop --- */}
              <RandomProductSection
                title="Continue Your Discovery"
                limit={3}
                sectionId="wonders-discovery"
              />
            </motion.div>

            <Button
              onClick={shareExperience}
              className="bg-luxury-gold hover:bg-soft-gold text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share This Journey
            </Button>
          </div>
        </section>
      </motion.div>
    </>
  );
};

// --- NO CHANGES BELOW THIS LINE ---

// Component definitions for sections and interactive elements
const StorySection: React.FC<{
  sectionNumber: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  theme: string;
  children: React.ReactNode;
}> = ({ sectionNumber, title, subtitle, icon, theme, children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: "-30%" });

  return (
    <motion.section
      ref={ref}
      className="story-section min-h-screen flex items-center px-6 py-24"
      data-section={sectionNumber}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 pl-16"
        >
          <div className="flex items-center mb-4">
            <div className="text-luxury-gold mr-4">{icon}</div>
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold">
                {title}
              </h2>
              <p className="text-xl text-gray-400 font-cormorant">{subtitle}</p>
            </div>
          </div>
          <p className="text-lg text-gray-300 font-inter italic">{theme}</p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="pl-16"
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

const InfoPoint: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <motion.div
    className="group p-6 bg-black/30 border border-luxury-gold/20 rounded-lg hover:border-luxury-gold/50 transition-all duration-300"
    whileHover={{ scale: 1.02, y: -2 }}
  >
    <h4 className="text-xl font-playfair font-semibold text-luxury-gold mb-3 group-hover:text-soft-gold transition-colors">
      {title}
    </h4>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
);

const InteractiveTimeline: React.FC = () => (
  <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm p-6">
    <CardContent className="space-y-4">
      <h3 className="text-2xl font-playfair text-luxury-gold mb-6">
        Ancient Civilizations
      </h3>
      {["Egypt", "Mesopotamia", "Greece", "Rome"].map((civ, index) => (
        <motion.div
          key={civ}
          className="flex items-center space-x-4 p-3 bg-luxury-gold/10 rounded-lg cursor-pointer hover:bg-luxury-gold/20 transition-colors"
          whileHover={{ x: 10 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="w-3 h-3 bg-luxury-gold rounded-full" />
          <span className="text-gray-300">{civ}</span>
        </motion.div>
      ))}
    </CardContent>
  </Card>
);

const GoldRushMap: React.FC = () => (
  <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm p-8">
    <CardContent>
      <h3 className="text-2xl font-playfair text-luxury-gold mb-6 text-center">
        Major Gold Rushes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "California Gold Rush",
            year: "1848",
            impact: "300,000 people",
          },
          {
            name: "Klondike Gold Rush",
            year: "1896",
            impact: "100,000 prospectors",
          },
          {
            name: "Australian Gold Rush",
            year: "1851",
            impact: "Population doubled",
          },
        ].map((rush, index) => (
          <motion.div
            key={rush.name}
            className="text-center p-4 bg-luxury-gold/10 rounded-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
          >
            <h4 className="font-playfair text-luxury-gold text-lg mb-2">
              {rush.name}
            </h4>
            <p className="text-gray-400 text-sm">{rush.year}</p>
            <p className="text-gray-300 text-sm mt-2">{rush.impact}</p>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const GoldStandardChart: React.FC = () => (
  <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm p-8">
    <CardContent>
      <h3 className="text-2xl font-playfair text-luxury-gold mb-6">
        The Gold Standard Era
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-luxury-gold/20">
          <span className="text-gray-300">Bretton Woods System</span>
          <span className="text-luxury-gold">1944-1971</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-luxury-gold/20">
          <span className="text-gray-300">Nixon Shock</span>
          <span className="text-luxury-gold">August 15, 1971</span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-300">End of Gold Standard</span>
          <span className="text-luxury-gold">Global Impact</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TechnologyShowcase: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        icon: <Cpu className="w-8 h-8" />,
        title: "Electronics",
        desc: "Smartphones & Computers",
      },
      {
        icon: <Heart className="w-8 h-8" />,
        title: "Medicine",
        desc: "Cancer Treatment & Dentistry",
      },
      {
        icon: <Rocket className="w-8 h-8" />,
        title: "Aerospace",
        desc: "Satellites & Space Suits",
      },
    ].map((tech, index) => (
      <motion.div
        key={tech.title}
        className="text-center p-6 bg-black/50 border border-luxury-gold/30 rounded-lg"
        whileHover={{ scale: 1.05, borderColor: "rgba(212, 175, 55, 0.6)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
      >
        <div className="text-luxury-gold mb-4">{tech.icon}</div>
        <h4 className="font-playfair text-luxury-gold text-lg mb-2">
          {tech.title}
        </h4>
        <p className="text-gray-300 text-sm">{tech.desc}</p>
      </motion.div>
    ))}
  </div>
);

const FutureVision: React.FC = () => (
  <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm overflow-hidden">
    <CardContent className="p-8">
      <div className="text-center">
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-luxury-gold to-soft-gold rounded-full mx-auto mb-6 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-16 h-16 text-black" />
        </motion.div>
        <h3 className="text-2xl font-playfair text-luxury-gold mb-4">
          James Webb Space Telescope
        </h3>
        <p className="text-gray-300">
          18 hexagonal gold-coated mirrors enabling humanity to see further into
          space than ever before.
        </p>
      </div>
    </CardContent>
  </Card>
);

export default WondersOfGold;
