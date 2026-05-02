import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "configs/reactQueryConfigs";
import Router from "./router/Router";
import Layout from "./layouts/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
        <Toaster />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
