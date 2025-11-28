import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { initDB, addReport, addLockerItem } from '../lib/db';
import { UploadCloud } from 'lucide-react';

const abuseTypes = [
  'Cyberbullying',
  'Non-consensual Sharing',
  'Online Harassment',
  'Doxxing',
  'Impersonation',
  'Other'
];

// Function to convert file to base64
const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export default function Report() {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !description) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const toastId = toast.loading('Saving your report securely...');

    try {
      await initDB();
      
      let evidenceData = null;
      if (evidence) {
        evidenceData = await toBase64(evidence);
      }

      const report = { 
        type, 
        description, 
        evidence: evidenceData, 
        fileName: evidence?.name,
        timestamp: new Date().toISOString() 
      };

      await addReport(report);
      
      // Also add to locker for centralized viewing
      await addLockerItem({ 
        type: 'Report', 
        content: `Report: ${type}`, 
        data: report,
        timestamp: new Date().toISOString() 
      });

      toast.success('Report saved to your secure locker.', { id: toastId });
      setType('');
      setDescription('');
      setEvidence(null);
      setFileName('');
    } catch (error) {
      console.error('Failed to save report:', error);
      toast.error('Could not save your report. Please try again.', { id: toastId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-dark-gray">Self-Reporting Tool</h1>
        <p className="text-md text-dark-gray/80 mt-2">No sign-up or personal IDs required. All data is stored only on your device.</p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-white p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">Type of Digital Abuse</label>
          <select 
            id="type" 
            value={type} 
            onChange={e => setType(e.target.value)} 
            className="w-full p-3 border rounded-md focus:ring-soft-purple focus:border-soft-purple bg-cream"
          >
            <option value="" disabled>Select a type...</option>
            {abuseTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            rows={6} 
            className="w-full p-3 border rounded-md focus:ring-soft-purple focus:border-soft-purple bg-cream"
            placeholder="Describe what happened. Avoid using real names."
          ></textarea>
        </div>

        <div>
          <label htmlFor="evidence" className="block text-sm font-bold text-gray-700 mb-2">Upload Evidence (Optional)</label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-cream">
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="evidence-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-soft-purple hover:text-soft-teal focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-soft-purple">
                  <span>Upload a file</span>
                  <input id="evidence-upload" name="evidence-upload" type="file" className="sr-only" onChange={e => { 
                      const file = e.target.files?.[0];
                      if(file){
                          setEvidence(file);
                          setFileName(file.name);
                      }
                  }} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">Images or screen recordings up to 10MB</p>
              {fileName && <p className='text-sm text-soft-teal pt-2'>{fileName}</p>}
            </div>
          </div>
        </div>

        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="w-full bg-soft-purple text-white font-bold py-3 px-4 rounded-md hover:bg-soft-teal transition-colors shadow-lg"
        >
          Save to My Secure Locker
        </motion.button>
      </motion.form>
    </div>
  );
}