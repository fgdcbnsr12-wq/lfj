import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Cpu, Smartphone, Heart, Zap, ArrowLeft, ArrowRight, Car, Satellite, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductImage from '@/components/ui/ProductImage';

const ModernTechnology: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.3 });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <>
      <Helmet>
        <title>Gold in Modern Technology | Electronics & Medical Applications | The Luster</title>
        <meta name="description" content="Discover how gold powers modern technology from smartphones to medical devices. Explore gold's crucial role in electronics, aerospace, and life-saving medical applications." />
        <meta name="keywords" content="gold technology, electronics, medical devices, conductivity, smartphones, computers, gold applications, nanotechnology" />
        <meta property="og:title" content="Gold in Modern Technology: The Hidden Hero" />
        <meta property="og:description" content="From your smartphone to life-saving medical devices, discover how gold's unique properties make it indispensable in modern technology." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/placeholder.svg" />
        <meta property="og:url" content={typeof window !== 'undefined' ? `${window.location.origin}/modern-technology` : '/modern-technology'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gold in Modern Technology | Electronics & Medical Applications | The Luster" />
        <meta name="twitter:description" content="Discover how gold powers modern technology from smartphones to medical devices and aerospace systems." />
        <meta name="twitter:image" content="/images/placeholder.svg" />
        <link rel="canonical" href={typeof window !== 'undefined' ? `${window.location.origin}/modern-technology` : '/modern-technology'} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Gold in Modern Technology',
            description: 'Discover how gold powers modern technology from smartphones to medical devices. Explore gold\'s crucial role in electronics, aerospace, and life-saving medical applications.',
            image: '/images/placeholder.svg',
            author: { '@type': 'Organization', name: 'The Luster' },
            publisher: { '@type': 'Organization', name: 'The Luster' },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': typeof window !== 'undefined' ? `${window.location.origin}/modern-technology` : '/modern-technology',
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden">
        {/* Animated Circuit Pattern Background */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10h80v80h-80z" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="20" cy="20" r="3" fill="currentColor"/>
                <circle cx="80" cy="80" r="3" fill="currentColor"/>
                <path d="M20 20L80 80M80 20L20 80" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" className="text-luxury-gold"/>
          </svg>
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
              <Cpu className="w-24 h-24 text-luxury-gold mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-playfair font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700, #00BFFF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Modern Technology
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 font-cormorant mb-8 leading-relaxed"
            >
              Beyond its beauty and value, gold has become the hidden hero of modern technology. 
              Its unique properties make it indispensable in everything from the device you're reading this on 
              to the satellites orbiting our planet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/cosmic-origins">
                <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Cosmic Origins
                </Button>
              </Link>
              <Link to="/future-frontiers">
                <Button className="bg-luxury-gold text-black hover:bg-soft-gold">
                  Next: Future Frontiers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[Smartphone, Cpu, Heart, Zap, Car, Satellite].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute text-luxury-gold opacity-20"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${20 + (i * 10)}%`
                }}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, -5, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                <Icon className="w-8 h-8" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Electronics Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                The Electronic Revolution
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Gold's superior conductivity and corrosion resistance make it irreplaceable 
                in modern electronics, ensuring reliability in our most critical devices.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full hover:border-luxury-gold/60 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Smartphone className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Smartphones & Computers</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Every smartphone contains approximately 50 milligrams of gold in its circuit boards, 
                      connectors, and memory chips, ensuring reliable signal transmission.
                    </p>
                    <div className="text-sm text-luxury-gold">
                      <div>• Circuit board connections</div>
                      <div>• Memory chip contacts</div>
                      <div>• Processor components</div>
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
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full hover:border-luxury-gold/60 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Satellite className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Aerospace Technology</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Spacecraft and satellites rely on gold-plated components to withstand 
                      extreme temperatures and radiation in the harsh environment of space.
                    </p>
                    <div className="text-sm text-luxury-gold">
                      <div>• Satellite reflectors</div>
                      <div>• Astronaut visors</div>
                      <div>• Critical circuitry</div>
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
                <Card className="bg-black/50 border-luxury-gold/30 backdrop-blur-sm h-full hover:border-luxury-gold/60 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Car className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-playfair text-luxury-gold mb-4">Automotive Systems</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Modern vehicles contain gold in airbag sensors, GPS systems, and engine 
                      management computers, ensuring safety and performance.
                    </p>
                    <div className="text-sm text-luxury-gold">
                      <div>• Airbag sensors</div>
                      <div>• GPS navigation</div>
                      <div>• Engine computers</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Medical Applications Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                  Saving Lives with Gold
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Gold's biocompatibility and unique properties have made it invaluable in medical 
                  applications, from treating cancer to replacing teeth and powering life-saving devices.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Heart className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Cancer Treatment</h4>
                      <p className="text-gray-300">
                        Gold nanoparticles can be programmed to target cancer cells specifically, 
                        delivering radiation therapy directly to tumors while sparing healthy tissue.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Shield className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Arthritis Relief</h4>
                      <p className="text-gray-300">
                        Gold compounds have been used for decades to treat rheumatoid arthritis, 
                        reducing inflammation and providing relief to millions of patients.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Zap className="w-8 h-8 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-luxury-gold font-semibold mb-2">Dental Applications</h4>
                      <p className="text-gray-300">
                        Gold alloys are still preferred for dental crowns and implants due to their 
                        durability, biocompatibility, and resistance to corrosion in the mouth.
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
                    className="absolute inset-0 bg-gradient-to-br from-luxury-gold via-red-500 to-pink-600 rounded-full"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-8 bg-gradient-to-br from-red-400 via-luxury-gold to-yellow-500 rounded-full"
                    animate={{
                      scale: [1.05, 1, 1.05],
                      rotate: [360, 270, 180, 90, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-24 h-24 text-white z-10" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Why Gold Works
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Gold's unique physical and chemical properties make it irreplaceable in modern applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Perfect Conductor",
                  desc: "Excellent electrical conductivity ensures reliable signal transmission",
                  icon: "⚡"
                },
                {
                  title: "Corrosion Resistant", 
                  desc: "Never tarnishes or corrodes, maintaining performance indefinitely",
                  icon: "🛡️"
                },
                {
                  title: "Biocompatible",
                  desc: "Safe for medical implants and does not cause allergic reactions",
                  icon: "❤️"
                },
                {
                  title: "Malleable & Ductile",
                  desc: "Can be shaped into incredibly thin wires and complex components",
                  icon: "🔧"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-playfair text-luxury-gold mb-3">{item.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black to-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-playfair font-bold text-luxury-gold mb-6">
                Gold in Numbers
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The scale of gold's role in modern technology is truly staggering.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "300", unit: "tons", desc: "Gold used in electronics annually" },
                { number: "7%", unit: "of total", desc: "Gold demand from technology sector" },
                { number: "41", unit: "mg", desc: "Average gold in a mobile phone" },
                { number: "1", unit: "gram", desc: "Gold can be stretched into 2km wire" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-luxury-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl text-gray-300 mb-2">{stat.unit}</div>
                  <div className="text-sm text-gray-400">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Videos Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Gold in Technology Today
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover how gold is revolutionizing modern technology and enabling breakthrough innovations.
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
                    src="https://www.youtube.com/embed/CTtf5s2HFkA"
                    title="Gold in Electronics and Technology"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mt-4 mb-2">Electronics Revolution</h3>
                <p className="text-gray-300">See how gold enables the electronics that power our digital world.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-luxury-gold/30 hover:border-luxury-gold/60 transition-all duration-300">
                  <iframe
                    src="https://www.youtube.com/embed/VQKMoT-6XSg"
                    title="Gold in Medical Technology"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-playfair text-luxury-gold mt-4 mb-2">Medical Breakthroughs</h3>
                <p className="text-gray-300">Explore gold's life-saving applications in modern medicine and healthcare.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech-Inspired Collection Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-gold mb-6">
                Tech-Inspired Gold Collection
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Celebrate gold's technological prowess with modern designs that honor its role in advancing human innovation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Circuit Board Bracelet",
                  price: "$1,890",
                  description: "Modern design inspired by electronic circuits",
                  image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Nano-Tech Ring",
                  price: "$2,150",
                  description: "Precision engineering meets timeless elegance",
                  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
                },
                {
                  name: "Digital Waves Necklace",
                  price: "$3,290",
                  description: "Flowing design representing digital signals",
                  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
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
                        <Cpu className="w-6 h-6 text-luxury-gold" />
                      </div>
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
            <Cpu className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
            <h2 className="text-4xl font-playfair font-bold text-luxury-gold mb-6">
              The invisible hero powering our digital age
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              While we admire gold's beauty in jewelry, its true modern miracle lies in the technology 
              that connects us, heals us, and pushes the boundaries of human achievement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/future-frontiers">
                <Button className="bg-luxury-gold text-black hover:bg-soft-gold px-8 py-3">
                  Explore Future Frontiers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/wonders-of-gold">
                <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                  Return to Journey
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default ModernTechnology;