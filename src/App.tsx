import { useEffect } from 'react';
import { GameProvider, useGame } from './store';
import { LandingPage, GameBoard, Round1Results, PaymentSuccess, FinalResults, ShareCard } from './components';

function GameRouter() {
  const { state, dispatch } = useGame();

  // Handle payment return detection (works even if Polar doesn't redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const screen = urlParams.get('screen');
    
    // Method 1: Explicit payment success URL (if Polar redirects work)
    if (screen === 'paymentSuccess') {
      const checkoutId = urlParams.get('checkout_id');
      if (checkoutId) {
        try {
          localStorage.setItem('reveal-checkout-id', checkoutId);
        } catch {
          // Ignore storage errors
        }
      }
      
      dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    
    // Method 2: If user manually returns after payment (no redirect from Polar)
    // Show them a way to continue - but don't auto-unlock (we can't verify payment without backend)
    // The payment success screen will handle this with a manual button
  }, [dispatch, state.round1Complete, state.hasPaid]);

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
