import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout.tsx';
import Home from './pages/Home';
import DigitalAbuse from './pages/DigitalAbuse';
import SupportAssistant from './pages/SupportAssistant';
import Report from './pages/Report';
import Locker from './pages/Locker';
import Resources from './pages/Resources';

export default function App() {
  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="what-is-digital-abuse" element={<DigitalAbuse />} />
          <Route path="get-support" element={<SupportAssistant />} />
          <Route path="self-reporting" element={<Report />} />
          <Route path="locker" element={<Locker />} />
          <Route path="emergency-resources" element={<Resources />} />
        </Route>
      </Routes>
    </>
  );
}