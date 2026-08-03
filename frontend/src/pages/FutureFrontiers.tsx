import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Rocket, Atom, Zap, ArrowLeft, Brain, Leaf, Star, Microscope, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductImage from '@/components/ui/ProductImage';

const FutureFrontiers: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.3 });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <>
      <Helmet>
        <title>Future Frontiers of Gold | Space & Quantum Technology | The Luster</title>
        <meta name="description" content="Explore gold's role in future technologies: space exploration, quantum computing, renewable energy, and medical breakthroughs. Discover how gold will shape tomorrow." />
        <meta name="keywords" content="gold future, space exploration, quantum computing, nanotechnology, renewable energy, medical technology, gold applications" />
        <meta property="og:title" content="Future Frontiers: Gold's Role in Tomorrow's Technology" />
        <meta property="og:description" content="From Mars missions to quantum computers, discover how gold will continue to push the boundaries of human achievement." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/placeholder.svg" />
        <meta property="og:url" content={typeof window !== 'undefined' ? `${window.location.origin}/future-frontiers` : '/future-frontiers'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Future Frontiers of Gold | Space & Quantum Technology | The Luster" />
        <meta name="twitter:description" content="Explore gold's role in future technologies across quantum systems, space exploration, and renewable energy." />
        <meta name="twitter:image" content="/images/placeholder.svg" />
        <link rel="canonical" href={typeof window !== 'undefined' ? `${window.location.origin}/future-frontiers` : '/future-frontiers'} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Future Frontiers of Gold',
            description: 'Explore gold\'s role in future technologies: space exploration, quantum computing, renewable energy, and medical breakthroughs. Discover how gold will shape tomorrow.',
            image: '/images/placeholder.svg',
            author: { '@type': 'Organization', name: 'The Luster' },
            publisher: { '@type': 'Organization', name: 'The Luster' },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': typeof window !== 'undefined' ? `${window.location.origin}/future-frontiers` : '/future-frontiers',
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
        {/* Animated Space Background */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-white to-luxury-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
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
              <Rocket className="w-24 h-24 text-luxury-gold mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-playfair font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #9370DB, #4169E1)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Future Frontiers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 font-cormorant mb-8 leading-relaxed"
            >
              As we stand on the threshold of a new technological age, gold continues to be humanity's 
              most trusted companion in our boldest ventures—from the quantum realm to the far reaches of space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/modern-technology">
                <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Modern Technology
                </Button>
              </Link>
              <Link to="/wonders-of-gold">
                <Button className="bg-luxury-gold text-black hover:bg-soft-gold">
                  Complete the Journey
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Future Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[Rocket, Atom, Brain, Leaf, Star, Microscope].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute text-luxury-gold opacity-20"
                style={{
                  left: `${15 + (i * 12)}%`,
                  top: `${15 + (i * 12)}%`
                }}
                animate={{
                  y: [-15, 15, -15],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.7
                }}
              >
                <Icon className="w-10 h-10" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Space Exploration Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Conquering the Final Frontier
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                As humanity prepares for interplanetary exploration, gold remains our most reliable 
                partner in the hostile environment of space.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full hover:border-luxury-gold/60 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Rocket className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Mars Missions</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Future Mars rovers and habitats will rely on gold-plated components to withstand 
                      extreme temperature variations and protect critical electronics from radiation.
                    </p>
                    <div className="text-sm text-luxury-gold space-y-1">
                      <div>• Radiation shielding</div>
                      <div>• Temperature regulation</div>
                      <div>• Communication systems</div>
                      <div>• Life support electronics</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full hover:border-luxury-gold/60 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Space Telescopes</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Next-generation space telescopes like the James Webb will use gold-plated mirrors 
                      to capture infrared light from the most distant galaxies in the universe.
                    </p>
                    <div className="text-sm text-luxury-gold space-y-1">
                      <div>• Mirror coatings</div>
                      <div>• Infrared reflection</div>
                      <div>• Instrument protection</div>
                      <div>• Signal integrity</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full hover:border-luxury-gold/60 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Zap className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Asteroid Mining</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Future asteroid mining operations will seek gold-rich asteroids that could 
                      contain more precious metals than exist in Earth's entire crust.
                    </p>
                    <div className="text-sm text-luxury-gold space-y-1">
                      <div>• Resource extraction</div>
                      <div>• Space manufacturing</div>
                      <div>• Orbital construction</div>
                      <div>• Deep space missions</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quantum Computing Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-indigo-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                  The Quantum Revolution
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Quantum computers represent the next leap in computational power, and gold's unique 
                  properties may be crucial in making these revolutionary machines a reality.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Atom className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Quantum Stability</h4>
                      <p className="text-gray-300">
                        Gold's resistance to oxidation and electrical noise makes it ideal for 
                        maintaining the delicate quantum states required for quantum computing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Brain className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Neural Networks</h4>
                      <p className="text-gray-300">
                        Gold nanoparticles could enable the creation of artificial neural networks 
                        that mimic the human brain's processing capabilities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Cpu className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Superconducting Circuits</h4>
                      <p className="text-gray-300">
                        Gold contacts in superconducting quantum circuits ensure reliable 
                        connections at the extremely low temperatures required for quantum operations.
                      </p>
                    </div>
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
                    className="absolute inset-0 border-4 border-luxury-gold rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-8 border-4 border-purple-500 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-16 border-4 border-blue-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Atom className="w-24 h-24 text-luxury-gold z-10" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Medical Breakthroughs Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Medical Miracles of Tomorrow
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The future of medicine will be powered by gold nanotechnology, offering precise 
                treatments and revolutionary diagnostic capabilities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Targeted Drug Delivery",
                  desc: "Gold nanoparticles will deliver drugs directly to diseased cells",
                  icon: <Microscope className="w-12 h-12" />
                },
                {
                  title: "Regenerative Medicine",
                  desc: "Gold scaffolds will help grow new organs and repair damaged tissue",
                  icon: <Zap className="w-12 h-12" />
                },
                {
                  title: "Diagnostic Sensors",
                  desc: "Ultra-sensitive gold-based sensors will detect diseases at the molecular level",
                  icon: <Brain className="w-12 h-12" />
                },
                {
                  title: "Cancer Thermotherapy",
                  desc: "Gold nanoparticles will heat and destroy cancer cells with pinpoint accuracy",
                  icon: <Star className="w-12 h-12" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-luxury-gold group-hover:bg-luxury-gold/30 transition-all duration-300"
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="text-xl font-playfair text-luxury-gold mb-3">{item.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainable Future Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-green-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="relative w-80 h-80 mx-auto">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-400 via-luxury-gold to-blue-500 rounded-full opacity-70"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 120, 240, 360]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-8 bg-gradient-to-br from-blue-400 via-green-500 to-luxury-gold rounded-full opacity-70"
                    animate={{
                      scale: [1.1, 1, 1.1],
                      rotate: [360, 240, 120, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="w-24 h-24 text-white z-10" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                  A Sustainable Tomorrow
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Gold will play a crucial role in creating a sustainable future, from clean energy 
                  production to environmental remediation technologies.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Leaf className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Green Catalysis</h4>
                      <p className="text-gray-300">
                        Gold catalysts will enable cleaner chemical processes, reducing pollution 
                        and making manufacturing more environmentally friendly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Zap className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Solar Energy</h4>
                      <p className="text-gray-300">
                        Advanced solar cells will use gold nanoparticles to improve efficiency 
                        and make renewable energy more accessible worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Microscope className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Environmental Cleanup</h4>
                      <p className="text-gray-300">
                        Gold nanoparticles will help break down pollutants and toxins, 
                        cleaning contaminated water and soil for future generations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-playfair font-bold text-luxury-gold mb-6">
                The Next Decade
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A glimpse into the golden future that awaits us in the coming years.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                { year: "2025", event: "First quantum computers with gold components enter commercial use" },
                { year: "2027", event: "Gold-based cancer treatments reach clinical trials worldwide" },
                { year: "2030", event: "Mars rover mission launches with extensive gold-plated equipment" },
                { year: "2033", event: "First asteroid mining mission targets gold-rich near-Earth object" },
                { year: "2035", event: "Gold nanotechnology revolutionizes personalized medicine" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-luxury-gold text-black rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {item.year}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Technology Videos Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-indigo-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Gold's Future in Space and Beyond
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Witness how gold will enable humanity's greatest achievements in space exploration and quantum technology.
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
                    src="https://www.youtube.com/embed/E8XvDj-yOYQ"
                    title="James Webb Space Telescope and Gold"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mt-4 mb-2">Space Exploration</h3>
                <p className="text-gray-300">See how gold enables the James Webb Space Telescope to peer into the cosmic depths.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-300">
                  <iframe
                    src="https://www.youtube.com/embed/Fmp4XvGx3dM"
                    title="Quantum Computing and Gold"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mt-4 mb-2">Quantum Revolution</h3>
                <p className="text-gray-300">Discover the role of gold in quantum computing and future technology breakthroughs.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Futuristic Collection Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Future Heritage Collection
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Wear tomorrow's legacy today with designs inspired by humanity's greatest frontiers in space and technology.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Quantum Resonance Ring",
                  price: "$4,590",
                  description: "Inspired by quantum mechanics and parallel universes",
                  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Mars Mission Pendant",
                  price: "$3,250",
                  description: "Celebrating humanity's journey to the Red Planet",
                  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Neural Network Earrings",
                  price: "$2,890",
                  description: "Mimicking the connections of artificial intelligence",
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
                      <div className="absolute top-4 right-4">
                        <Rocket className="w-6 h-6 text-luxury-gold" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-playfair text-luxury-gold mb-2">{product.name}</h3>
                      <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-luxury-gold">{product.price}</span>
                        <Link to="/shop">
                          <Button size="sm" className="bg-luxury-gold text-black hover:bg-soft-gold">
                            Pre-Order
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

        {/* Interactive Timeline */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-purple-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Timeline to Tomorrow
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A glimpse into the golden future that awaits humanity.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { year: "2025", event: "Quantum computers reach practical applications", icon: <Atom className="w-8 h-8" /> },
                { year: "2030", event: "First crewed mission to Mars launches", icon: <Rocket className="w-8 h-8" /> },
                { year: "2035", event: "Gold-based nanotechnology revolutionizes medicine", icon: <Microscope className="w-8 h-8" /> },
                { year: "2040", event: "Space-based solar power using gold technology", icon: <Leaf className="w-8 h-8" /> },
                { year: "2050", event: "Asteroid mining begins commercial operations", icon: <Star className="w-8 h-8" /> }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-playfair text-luxury-gold mb-2">{item.year}</h3>
                    <p className="text-gray-300">{item.event}</p>
                  </div>
                  <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center text-luxury-gold">
                    {item.icon}
                  </div>
                  <div className="flex-1" />
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
            <Rocket className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
            <h2 className="text-4xl font-playfair font-bold text-luxury-gold mb-6">
              The golden thread continues
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              From the cosmic forge of dying stars to the frontiers of human achievement, 
              gold's story is far from over. The next chapter is being written in laboratories, 
              spacecraft, and quantum computers around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/wonders-of-gold">
                <Button className="bg-luxury-gold text-black hover:bg-soft-gold px-8 py-3">
                  Return to Journey Home
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                  Explore Our Gold Collection
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default FutureFrontiers;