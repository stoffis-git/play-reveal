import { useEffect } from 'react';
import { GameProvider, useGame } from './store';
import { LandingPage, GameBoard, Round1Results, Paywall, PaymentSuccess, FinalResults, ShareCard } from './components';
import { Menu } from './components/Menu';

function GameRouter() {
  const { state, dispatch } = useGame();

  // Handle URL params for payment success redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const screen = urlParams.get('screen');
    
    if (screen === 'paymentSuccess') {
      dispatch({ type: 'NAVIGATE_TO', screen: 'paymentSuccess' });
      // Clean up URL without refreshing
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
      return <Paywall />;
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
      <MenuWrapper />
      <GameRouter />
    </GameProvider>
  );
}

function MenuWrapper() {
  const { state } = useGame();
  // Don't render Menu in App for game screens - GameBoard will render it inline
  const isGameScreen = state.currentScreen === 'round1' || state.currentScreen === 'round2';
  if (isGameScreen) return null;
  return <Menu />;
}

export default App;
