import { useEffect } from 'react';
import { GameProvider, useGame } from './store';
import { LandingPage, GameBoard, Round1Results, PaymentSuccess, FinalResults, ShareCard } from './components';

function GameRouter() {
  const { state, dispatch } = useGame();

  // Handle payment return from Polar redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const screen = urlParams.get('screen')?.trim();
    
    // Polar redirects to: https://playreveal.com?screen=paymentSuccess
    // Optional: &checkout_id={CHECKOUT_ID} if you include {CHECKOUT_ID} in success_url
    if (screen === 'paymentSuccess') {
      // Store checkout_id if provided by Polar
      const checkoutId = urlParams.get('checkout_id');
      if (checkoutId) {
        try {
          localStorage.setItem('reveal-checkout-id', checkoutId);
        } catch {
          // Ignore storage errors
        }
      }
      
      // Navigate to payment success screen
      dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
      
      // Clean up URL to remove query params (prevents re-triggering on refresh)
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [dispatch]);

  switch (state.currentScreen) {
    case 'landing':
      return <LandingPage />;
    case 'round1':
      return <GameBoard round={1} />;
    case 'round1Results':
      return <Round1Results />;
    case 'paywall':
      // Redirect paywall to round1Results (single unlock screen)
      return <Round1Results />;
    case 'paymentSuccess':
      return <PaymentSuccess />;
    case 'round2':
      return <GameBoard round={2} />;
    case 'finalResults':
      return <FinalResults />;
    case 'share':
      return <ShareCard />;
    default:
      return <LandingPage />;
  }
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
