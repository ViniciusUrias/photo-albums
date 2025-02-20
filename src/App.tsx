import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import Router from "./routes";

function App() {
	const queryClient = new QueryClient();

	return (
		<ThemeProvider defaultTheme="dark" storageKey="@user-theme-pref">
			<div id="live-region" aria-live="polite" className="sr-only"></div>

			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
