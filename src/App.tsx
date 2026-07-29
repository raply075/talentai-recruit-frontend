import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#161925',
                color: '#f3f4f8',
                border: '1px solid #23273a',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#22d3ee', secondary: '#0f1119' } },
              error: { iconTheme: { primary: '#f87171', secondary: '#0f1119' } },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
