import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import BirthdayForm from './components/BirthdayForm';
import StoryReader from './components/StoryReader';
import Navigation from './components/Navigation';

const PAYPAL_CLIENT_ID = 'your_paypal_client_id';

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<BirthdayForm />} />
              <Route path="/story" element={<StoryReader />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;