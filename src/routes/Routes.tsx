import { BrowserRouter, HashRouter } from 'react-router-dom';

// routes
import { AllRoutes } from './index';

const Routes = () => {
	return (
		<BrowserRouter>
			<AllRoutes />
		</BrowserRouter>
	);
};

export default Routes;
