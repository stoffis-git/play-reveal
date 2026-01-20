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
      
      // If Round 1 is complete, start Round 2 directly (skip PaymentSuccess screen)
      // Payment status is already saved by COMPLETE_PAYMENT action
      if (state.round1Complete) {
        // Small delay to ensure payment status is saved before starting Round 2
        setTimeout(() => {
          dispatch({ type: 'START_ROUND_2' });
        }, 100);
      } else {
        // Round 1 not complete yet, show PaymentSuccess screen
        dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
      }
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
