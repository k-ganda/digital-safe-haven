import { motion } from 'framer-motion';
import { Phone, Shield, User, MessageSquareHeart } from 'lucide-react';

const resourceCategories = [
  {
    title: 'Emergency Hotlines',
    icon: <Phone className="w-8 h-8 text-soft-purple" />,
    resources: [
      { name: 'National Emergency Helpline', number: '999 / 112', description: 'For immediate police, ambulance, or fire response in Kenya.' },
      { name: 'Child Helpline Kenya', number: '116', description: 'Confidential support for children and young people.' },
    ],
  },
  {
    title: 'Cybercrime Units (Kenya)',
    icon: <Shield className="w-8 h-8 text-soft-purple" />,
    resources: [
      { name: 'DCI Cybercrime Unit', contact: 'complaints@cid.go.ke', description: 'Official unit for reporting cybercrime incidents.' },
      { name: 'Communications Authority of Kenya', contact: 'info@ca.go.ke', description: 'Report online abuse and other telecom-related issues.' },
    ],
  },
  {
    title: 'Mental Health Support',
    icon: <MessageSquareHeart className="w-8 h-8 text-soft-purple" />,
    resources: [
      { name: 'Befrienders Kenya', contact: '+254 733 606 606', description: 'Provides emotional support to prevent suicide.' },
      { name: 'Niskize', contact: 'niskize.co.ke', description: 'Affordable online counseling services in Kenya.' , link: 'https://niskize.co.ke'},
    ],
  },
  {
    title: 'Guidance',
    icon: <User className="w-8 h-8 text-soft-purple" />,
    resources: [
        { name: 'How to talk to a trusted adult', description: 'A guide to help you have a conversation with an adult you trust about what you are going through.', link: '#' },
    ],
  },
];

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-dark-gray mb-12">Resource Hub</h1>
      </motion.div>

      <div className="space-y-12">
        {resourceCategories.map((category, index) => (
          <motion.section 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="flex items-center mb-6">
              {category.icon}
              <h2 className="text-3xl font-bold text-dark-gray ml-4">{category.title}</h2>
            </div>
            <ul className="space-y-4">
              {category.resources.map((resource, rIndex) => (
                <li key={rIndex} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg text-soft-teal">{resource.name}</h3>
                  {resource.number && <p className="text-dark-gray/80"><strong>Hotline:</strong> {resource.number}</p>}
                  {resource.contact && <p className="text-dark-gray/80"><strong>Contact:</strong> {resource.contact}</p>}
                  <p className="text-dark-gray/80 mt-1">{resource.description}</p>
                  {resource.link && (
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-soft-purple hover:underline mt-2 inline-block">Visit Website</a>
                  )}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </div>
  );
}