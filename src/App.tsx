import { useEffect } from 'react';
import { GameProvider, useGame } from './store';
import { LandingPage, RemotePaymentScreen, RemoteSessionSetup, InviteAcceptance, SessionCancelled, GameBoard, Round1Results, PaymentSuccess, FinalResults, RemoteSessionOverlay } from './components';
import { recordPayment } from './services/paymentTracking';

function GameRouter() {
  const { state, dispatch } = useGame();

  // Handle invite links: /play/{CODE}
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/play\/([A-Za-z0-9]{4,12})\/?$/);
    if (!match) return;
    const code = match[1].toUpperCase();

    dispatch({ type: 'SELECT_MODE', mode: 'remote' });
    dispatch({ type: 'SET_REMOTE_SESSION', sessionId: code, playerId: 2 });
    dispatch({ type: 'NAVIGATE_TO', screen: 'inviteAcceptance' });
  }, [dispatch]);

  // Prevent zoom on screen changes - reset viewport scale
  useEffect(() => {
    const resetViewport = () => {
      // Reset viewport scale to prevent zoom
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    };

    // Reset on screen change
    resetViewport();

    // Also reset after a short delay to catch any delayed layout changes
    const timer = setTimeout(resetViewport, 100);

    return () => clearTimeout(timer);
  }, [state.currentScreen]);

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
      void recordPayment({ checkoutId });

      // Decide where to route after payment based on purpose
      let purpose: string | null = null;
      try {
        purpose = localStorage.getItem('reveal-payment-purpose');
        localStorage.removeItem('reveal-payment-purpose');
      } catch {
        // ignore
      }
      
      // Clean up URL immediately to prevent ERR_NAME_NOT_RESOLVED and re-triggering
      window.history.replaceState({}, '', window.location.pathname);
      
      if (purpose === 'remote') {
        dispatch({ type: 'NAVIGATE_TO', screen: 'remoteSetup' });
      } else {
        // Always show PaymentSuccess screen so users can see the confirmation
        // PaymentSuccess component will handle auto-navigation to Round 2 after displaying success
        dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
      }
    }
  }, [dispatch, state.round1Complete]);

  switch (state.currentScreen) {
    case 'landing':
      return <LandingPage />;
    case 'remotePayment':
      return <RemotePaymentScreen />;
    case 'remoteSetup':
      return <RemoteSessionSetup />;
    case 'inviteAcceptance':
      return <InviteAcceptance />;
    case 'sessionCancelled':
      return <SessionCancelled />;
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
    default:
      return <LandingPage />;
  }
}

function App() {
  return (
    <GameProvider>
      <RemoteSessionOverlay />
      <GameRouter />
    </GameProvider>
  );
}

export default App;
