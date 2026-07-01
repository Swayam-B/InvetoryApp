import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import Toasts from './components/Toasts.jsx';

import Locations from './pages/Locations.jsx';
import LocationDetail from './pages/LocationDetail.jsx';
import ContainerDetail from './pages/ContainerDetail.jsx';
import ShoppingList from './pages/ShoppingList.jsx';

export default function App() {
  return (
    <div className="mx-auto flex min-h-full max-w-xl flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-4">
        <Routes>
          <Route path="/" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetail />} />
          <Route path="/containers/:id" element={<ContainerDetail />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SearchOverlay />
      <Toasts />
    </div>
  );
}
