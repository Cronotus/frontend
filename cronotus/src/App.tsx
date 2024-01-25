import { SWRConfig } from "swr";
import swrFetcher from "./services/swrFetcher";
import AuthenticationHandler from "./components/AuthenticationHandler";

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        revalidateOnFocus: true,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (
            (error.status && error.status > 400 && error.status < 500) ||
            retryCount < 3
          ) {
            return;
          }
          setTimeout(() => void revalidate({ retryCount }), 5000);
        },
        refreshInterval: 15000,
      }}
    >
      <AuthenticationHandler />
    </SWRConfig>
  );
}

export default App;
