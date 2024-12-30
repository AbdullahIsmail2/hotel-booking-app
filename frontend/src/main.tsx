import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./Contexts/AppContextProvider.tsx";
import { SearchContextProvider } from "./Contexts/SearchContext.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});



createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppContextProvider>
				<SearchContextProvider>
					<App />
				</SearchContextProvider>
			</AppContextProvider>
		</QueryClientProvider>
	</StrictMode>
);
