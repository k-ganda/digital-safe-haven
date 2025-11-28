import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePanicDelete } from '../hooks/usePanicDelete';
import { initDB, getLockerItems } from '../lib/db';
import { toast } from 'sonner';
import { Trash2, FileText, Download } from 'lucide-react';

export default function Locker() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      await initDB();
      const storedItems = await getLockerItems();
      setItems(storedItems.reverse());
    } catch (error) {
      toast.error('Could not load your locker. The database might be disabled.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const panicDelete = usePanicDelete(() => setItems([]));

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDownloadPacket = () => {
      toast.info('The Download Evidence Packet feature will be implemented in a future version.');
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-dark-gray">Safe Documentation Locker</h1>
        <p className="text-md text-dark-gray/80 mt-2">All data here is stored securely on your device and can be deleted instantly.</p>
      </motion.div>

      <div className="flex justify-between items-center mb-6">
        <motion.button 
            onClick={handleDownloadPacket}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition-colors shadow-lg"
        >
            <Download className="mr-2 h-4 w-4"/>
            Download Evidence Packet
        </motion.button>
        <motion.button 
            onClick={panicDelete} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors shadow-lg"
        >
          <Trash2 className="mr-2 h-4 w-4"/>
          Panic Delete All Data
        </motion.button>
      </div>

      {loading && <p>Loading your locker...</p>}

      {!loading && items.length === 0 && (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Your Locker is Empty</h3>
          <p className="text-dark-gray/70 mt-2">Use the Self-Reporting tool to save evidence here.</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-4">
          {items.map(item => (
            <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                  <div className='flex items-center'>
                      <FileText className="h-6 w-6 text-soft-purple mr-3" />
                      <div>
                        <h3 className="font-bold text-lg">{item.type}: {item.content}</h3>
                        <p className="text-sm text-gray-500">Saved on: {new Date(item.timestamp).toLocaleString()}</p>
                      </div>
                  </div>
              </div>
              {item.data?.description && <p className='mt-3 text-gray-700 pl-9'>{item.data.description}</p>}
              {item.data?.evidence && (
                  <div className='mt-3 pl-9'>
                      <p className='font-bold text-sm mb-2'>Evidence:</p>
                      <img src={item.data.evidence} alt={item.data.fileName} className='rounded-md border max-w-xs' />
                  </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}