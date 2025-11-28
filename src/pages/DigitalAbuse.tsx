import { motion } from 'framer-motion';
import { ShieldAlert, ImageOff, MessageCircleWarning, UserCog, Ghost } from 'lucide-react';

const abuseTypes = [
  {
    icon: <ShieldAlert className="w-12 h-12 text-soft-purple" />,
    title: 'Cyberbullying',
    description: 'Repeatedly sending hurtful messages, posting embarrassing photos, or spreading rumors online to intimidate or shame someone.',
    example: '"A group of classmates keeps creating group chats just to make fun of me, and they share screenshots of my profile to laugh at."',
  },
  {
    icon: <ImageOff className="w-12 h-12 text-soft-purple" />,
    title: 'Non-consensual Sharing',
    description: 'Sharing someone\'s private photos or videos without their permission, often to cause distress or humiliation.',
    example: '"My ex-partner threatened to post intimate photos of me online after we broke up."',
  },
  {
    icon: <MessageCircleWarning className="w-12 h-12 text-soft-purple" />,
    title: 'Online Harassment',
    description: 'A broader category that includes repeated unwanted contact, threats, or comments that make you feel unsafe.',
    example: '"A stranger on a gaming platform won\'t stop sending me aggressive and threatening messages."',
  },
  {
    icon: <UserCog className="w-12 h-12 text-soft-purple" />,
    title: 'Doxxing',
    description: 'Publicly revealing someone\'s private information like their home address, phone number, or workplace without their consent.',
    example: '"After a disagreement in an online forum, someone posted my full name and address in the comments."',
  },
  {
    icon: <Ghost className="w-12 h-12 text-soft-purple" />,
    title: 'Impersonation',
    description: 'Creating a fake social media profile or email account in someone else\'s name to post false or damaging information.',
    example: '"Someone made a fake Instagram account using my photos and is sending offensive messages to my friends."',
  },
];

export default function DigitalAbuse() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-dark-gray mb-4">What is Digital Abuse?</h1>
        <p className="text-lg text-center text-dark-gray/80 mb-12">It can take many forms, but it always involves the use of technology to harm, threaten, or control someone. Here are some common types.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {abuseTypes.map((abuse, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              {abuse.icon}
              <h2 className="text-2xl font-bold text-dark-gray ml-4">{abuse.title}</h2>
            </div>
            <p className="text-dark-gray/90 mb-4">{abuse.description}</p>
            <div className="bg-cream p-4 rounded-md border-l-4 border-soft-teal">
              <p className="font-mono text-sm text-dark-gray/80 italic">{abuse.example}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}