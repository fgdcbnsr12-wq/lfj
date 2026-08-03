import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, Sparkles, Crown, ArrowLeft, ArrowRight, Telescope, Atom, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductImage from '@/components/ui/ProductImage';

const CosmicOrigins: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.3 });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <>
      <Helmet>
        <title>Cosmic Origins of Gold | The Birth of Elements | The Luster</title>
        <meta name="description" content="Discover how gold was forged in the hearts of dying stars and neutron star collisions billions of years ago. Explore the cosmic journey of the universe's most precious element." />
        <meta name="keywords" content="gold cosmic origins, neutron stars, stellar nucleosynthesis, heavy elements formation, gold in space, astronomy, astrophysics" />
        <meta property="og:title" content="Cosmic Origins of Gold: From Stars to Earth" />
        <meta property="og:description" content="Journey through space and time to discover how gold was born in stellar explosions and traveled across the cosmos to reach Earth." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/placeholder.svg" />
        <meta property="og:url" content={typeof window !== 'undefined' ? `${window.location.origin}/cosmic-origins` : '/cosmic-origins'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cosmic Origins of Gold | The Birth of Elements | The Luster" />
        <meta name="twitter:description" content="Discover how gold was forged in the hearts of dying stars and neutron star collisions billions of years ago." />
        <meta name="twitter:image" content="/images/placeholder.svg" />
        <link rel="canonical" href={typeof window !== 'undefined' ? `${window.location.origin}/cosmic-origins` : '/cosmic-origins'} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Cosmic Origins of Gold',
            description: 'Discover how gold was forged in the hearts of dying stars and neutron star collisions billions of years ago. Explore the cosmic journey of the universe\'s most precious element.',
            image: '/images/placeholder.svg',
            author: { '@type': 'Organization', name: 'The Luster' },
            publisher: { '@type': 'Organization', name: 'The Luster' },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': typeof window !== 'undefined' ? `${window.location.origin}/cosmic-origins` : '/cosmic-origins',
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Animated Background Stars */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6">
          <motion.div
            style={{ y: textY }}
            className="text-center max-w-5xl mx-auto z-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: isHeroInView ? 1 : 0.8, rotate: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="mb-8"
            >
              <Star className="w-24 h-24 text-luxury-gold mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-playfair font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700, #FFA500)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Cosmic Origins
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 font-cormorant mb-8 leading-relaxed"
            >
              The extraordinary journey of gold begins not on Earth, but in the violent death throes of massive stars, 
              where the universe's rarest elements are forged in cosmic furnaces of unimaginable power.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/wonders-of-gold">
                <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Journey
                </Button>
              </Link>
              <Link to="/modern-technology">
                <Button className="bg-luxury-gold text-black hover:bg-soft-gold">
                  Next: Modern Technology
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Gold Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-luxury-gold rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </section>

        {/* The Stellar Forge Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                The Stellar Forge
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Deep in the cores of massive stars, temperatures reach 100 million degrees Celsius, 
                creating the perfect conditions for nuclear fusion to craft heavy elements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center">
                    <Atom className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Nuclear Fusion</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Inside stellar cores, lighter elements like hydrogen and helium fuse together 
                      under extreme pressure and temperature, gradually building heavier elements 
                      through the stellar nucleosynthesis process.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center">
                    <Sparkles className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">The R-Process</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The rapid neutron capture process occurs during supernova explosions, 
                      allowing atomic nuclei to capture multiple neutrons quickly before they 
                      can decay, creating gold and other precious metals.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center">
                    <Globe className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Cosmic Distribution</h3>
                    <p className="text-gray-300 leading-relaxed">
                      When massive stars explode as supernovae, they scatter these newly-forged 
                      heavy elements across the cosmos, seeding future solar systems with the 
                      materials needed for rocky planets and precious metals.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Neutron Star Collision Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                  Kilonova: The Gold Factory
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Recent astronomical discoveries have revealed that the majority of gold in the universe 
                  is actually created during the spectacular collision of neutron stars—one of the most 
                  violent events in the cosmos.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      <strong className="text-luxury-gold">Ultra-dense Matter:</strong> Neutron stars contain matter so dense that a teaspoon would weigh as much as Mount Everest.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      <strong className="text-luxury-gold">Gravitational Waves:</strong> These collisions create ripples in spacetime that we can now detect with LIGO observatories.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      <strong className="text-luxury-gold">Gold Production:</strong> A single kilonova can produce more gold than our sun's mass in precious metals.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="relative w-80 h-80 mx-auto">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-luxury-gold via-orange-500 to-red-600 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-4 bg-gradient-to-br from-yellow-400 via-luxury-gold to-orange-600 rounded-full"
                    animate={{
                      scale: [1.1, 1, 1.1],
                      rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Telescope className="w-24 h-24 text-black z-10" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey to Earth Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                The 4.6 Billion Year Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                The gold atoms that adorn your jewelry today began their journey in the cosmic explosions 
                that occurred billions of years before our solar system even existed. When our sun and 
                planets formed from a cloud of gas and dust, they inherited the stellar legacy of countless 
                generations of stars that lived and died before them.
              </p>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Stellar Death", desc: "Massive star explodes as supernova" },
                  { step: "2", title: "Cosmic Drift", desc: "Gold atoms travel through space for billions of years" },
                  { step: "3", title: "Solar Formation", desc: "Heavy elements gather in our solar nebula" },
                  { step: "4", title: "Earth's Birth", desc: "Gold becomes part of our planet's core and crust" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="w-16 h-16 bg-luxury-gold text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-playfair text-luxury-gold mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Educational Videos Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Cosmic Gold Documentary
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Watch how scientists discovered the cosmic origins of gold and the incredible journey from stellar explosions to Earth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-300">
                  <iframe
                    src="https://www.youtube.com/embed/1GCf29FPM4k"
                    title="How Gold is Created in the Universe"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mt-4 mb-2">The Birth of Gold in Stars</h3>
                <p className="text-gray-300">Discover how massive stars create gold through nuclear fusion and explosive supernovae.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-300">
                  <iframe
                    src="https://www.youtube.com/embed/IuW9wK_W-wQ"
                    title="Neutron Star Collisions Create Gold"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mt-4 mb-2">Kilonova Gold Factory</h3>
                <p className="text-gray-300">Learn about neutron star collisions and how they produce most of the gold in the universe.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stellar Collection Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Cosmic Gold Collection
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Embrace the cosmic heritage of gold with jewelry that celebrates the stellar origins of this precious metal.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Stellar Nebula Necklace",
                  price: "$2,890",
                  description: "Inspired by the cosmic clouds where gold is born",
                  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Supernova Ring",
                  price: "$1,650",
                  description: "Capturing the explosive beauty of stellar death",
                  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Galaxy Spiral Earrings",
                  price: "$1,290",
                  description: "Echoing the cosmic dance of distant galaxies",
                  image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center"
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group"
                >
                  <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm overflow-hidden hover:border-luxury-gold/60 transition-all duration-300 hover:scale-105">
                    <div className="relative overflow-hidden">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        fallbackSrc="/images/placeholder.svg"
                        showViewer={true}
                        className="absolute inset-0"
                        ratio={4 / 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-playfair text-luxury-gold mb-2">{product.name}</h3>
                      <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-luxury-gold">{product.price}</span>
                        <Link to="/shop">
                          <Button size="sm" className="bg-luxury-gold text-black hover:bg-soft-gold">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto"
          >
            <Crown className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
            <h2 className="text-4xl font-playfair font-bold text-luxury-gold mb-6">
              Every piece of gold is literally stardust
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              The next time you hold a piece of gold jewelry, remember that you're touching atoms 
              forged in the heart of a dying star billions of years ago—a cosmic treasure that 
              traveled across the universe to reach your hands.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/modern-technology">
                <Button className="bg-luxury-gold text-black hover:bg-soft-gold px-8 py-3">
                  Discover Gold's Modern Technology
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/wonders-of-gold">
                <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                  Continue the Journey
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default CosmicOrigins;