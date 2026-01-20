import { useEffect } from 'react';
import { GameProvider, useGame } from './store';
import { LandingPage, GameBoard, Round1Results, PaymentSuccess, FinalResults, ShareCard } from './components';

function GameRouter() {
  const { state, dispatch } = useGame();

  // Handle payment return from Polar redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const screen = urlParams.get('screen')?.trim();
    
    // Polar redirects to: https://play-reveal.com/?screen=paymentSuccess&checkout_id={CHECKOUT_ID}&customer_session_token=...
    // The {CHECKOUT_ID} placeholder will be replaced by Polar with the actual checkout ID
    if (screen === 'paymentSuccess') {
      // Store checkout_id and customer_session_token if provided by Polar
      const checkoutId = urlParams.get('checkout_id');
      const customerSessionToken = urlParams.get('customer_session_token');
      
      if (checkoutId) {
        try {
          localStorage.setItem('reveal-checkout-id', checkoutId);
        } catch {
          // Ignore storage errors
        }
      }
      
      if (customerSessionToken) {
        try {
          localStorage.setItem('reveal-customer-session-token', customerSessionToken);
        } catch {
          // Ignore storage errors
        }
      }
      
      // Mark payment as complete (saves payment status to localStorage)
      dispatch({ type: 'COMPLETE_PAYMENT' });
      
      // Clean up URL immediately to prevent ERR_NAME_NOT_RESOLVED and re-triggering
      window.history.replaceState({}, '', window.location.pathname);
      
      // Always show PaymentSuccess screen so users can see the confirmation
      // PaymentSuccess component will handle auto-navigation to Round 2 after displaying success
      dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
    }
  }, [dispatch, state.round1Complete]);

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
