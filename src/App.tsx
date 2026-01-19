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
    
    // Method 2: Detect return from payment via localStorage flag
    // If user initiated payment and has Round 1 complete, auto-unlock Round 2
    try {
      const paymentInitiated = localStorage.getItem('reveal-payment-initiated');
      const paymentTime = localStorage.getItem('reveal-payment-initiated-time');
      
      if (paymentInitiated === 'true' && paymentTime) {
        const timeSincePayment = Date.now() - parseInt(paymentTime, 10);
        // Only auto-unlock if payment was initiated within last 30 minutes
        // (prevents false positives from old flags)
        if (timeSincePayment < 30 * 60 * 1000) {
          // Check if Round 1 is complete (required for Round 2)
          if (state.round1Complete && !state.hasPaid) {
            // User likely completed payment, auto-unlock Round 2
            dispatch({ type: 'COMPLETE_PAYMENT' });
            // Clear the flag
            localStorage.removeItem('reveal-payment-initiated');
            localStorage.removeItem('reveal-payment-initiated-time');
            // Navigate to payment success screen briefly, then auto-start Round 2
            dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
          }
        } else {
          // Flag is too old, clear it
          localStorage.removeItem('reveal-payment-initiated');
          localStorage.removeItem('reveal-payment-initiated-time');
        }
      }
    } catch {
      // Ignore storage errors
    }
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
