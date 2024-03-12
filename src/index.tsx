import { createRoot } from 'react-dom/client';
import './i18n'; // Assuming this is your internationalization config
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
// import { StrictMode } from 'react';

const store = configureStore({}); // Configure your store

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container); // Create a root instance
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
