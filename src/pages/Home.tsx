import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, BookOpen, Shield, MessageSquare, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [vibe, setVibe] = useState('✨');

  const vibeOptions = [
    { emoji: '😩', label: 'Overwhelmed' },
    { emoji: '😔', label: 'Unsure' },
    { emoji: '✨', label: 'Feeling Okay' },
  ];

  return (
    <div className="bg-off-white min-h-screen text-gray-800 font-sans">
      <main className="px-4 md:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/b732b5e3-723a-4b4e-8e6d-49edaf34f58a/hero-illustration-6xygv6r-1764328161908.webp" alt="Calm and peaceful illustration" className="w-full max-w-lg mx-auto mb-8 rounded-lg" />
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">You deserve a digital space that feels safe. We got you.</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Private, judgment-free guidance and resources for navigating digital abuse.</p>
        </motion.section>

        {/* Vibe Check Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">How are you feeling right now?</h2>
          <div className="flex justify-center gap-4 md:gap-8">
            {vibeOptions.map(({ emoji, label }) => (
              <motion.button
                key={label}
                onClick={() => setVibe(emoji)}
                className={`p-4 rounded-full transition-all duration-300 ${vibe === emoji ? 'bg-soft-purple text-white scale-110' : 'bg-white shadow-md'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl md:text-4xl">{emoji}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div whileHover={{ y: -5 }} className="bg-soft-purple/20 p-8 rounded-2xl text-center flex flex-col items-center shadow-lg">
            <BookOpen size={40} className="text-soft-purple mb-4"/>
            <h3 className="text-2xl font-bold mb-2">Find Resources</h3>
            <p className="text-gray-600 mb-4">I need to learn what's happening.</p>
            <Link to="/resources" className="mt-auto bg-soft-purple text-white font-semibold py-2 px-6 rounded-lg hover:bg-soft-purple/80 transition-colors">Learn More</Link>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-soft-teal/20 p-8 rounded-2xl text-center flex flex-col items-center shadow-lg">
            <Shield size={40} className="text-soft-teal mb-4"/>
            <h3 className="text-2xl font-bold mb-2">Safe Locker</h3>
            <p className="text-gray-600 mb-4">I need a safe place to save proof.</p>
            <Link to="/locker" className="mt-auto bg-soft-teal text-white font-semibold py-2 px-6 rounded-lg hover:bg-soft-teal/80 transition-colors">Secure Locker</Link>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-soft-cream/80 p-8 rounded-2xl text-center flex flex-col items-center shadow-lg">
            <MessageSquare size={40} className="text-amber-600 mb-4"/>
            <h3 className="text-2xl font-bold mb-2">Talk To Someone</h3>
            <p className="text-gray-600 mb-4">I just need to talk to someone.</p>
            <Link to="/support-assistant" className="mt-auto bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors">Chat Now</Link>
          </motion.div>
        </section>

        {/* Amani Meter */}
        <section className="mt-20 text-center">
            <div className="inline-block relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <motion.div initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 1.5, delay: 1 }} >
                        <Sun size={60} className="text-amber-500" />
                    </motion.div>
                </div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Taking steps toward digital wellness! Keep going.</p>
        </section>

        {/* Featured Resources */}
        <section className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Self-Help Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">3 ways to mute toxicity</h3>
                    <p className="text-gray-700 text-base mb-4">Learn simple but effective techniques to filter out negative interactions online.</p>
                    <a href="#" className="font-bold text-soft-purple hover:text-soft-purple/80">Read More</a>
                </div>
            </div>
             <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">Setting up a Digital Boundary Plan</h3>
                    <p className="text-gray-700 text-base mb-4">Your guide to creating healthy and safe online spaces for yourself.</p>
                    <a href="#" className="font-bold text-soft-purple hover:text-soft-purple/80">Read More</a>
                </div>
            </div>
             <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">Understanding Digital Consent</h3>
                    <p className="text-gray-700 text-base mb-4">What it means, why it matters, and how to practice it.</p>
                    <a href="#" className="font-bold text-soft-purple hover:text-soft-purple/80">Read More</a>
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;