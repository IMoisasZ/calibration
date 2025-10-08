import CalibrationRoutes from './routes/Route'
import { UserProvider } from './context/user.context'

function App() {
	return (
		<UserProvider>
			<CalibrationRoutes />
		</UserProvider>
	)
}

export default App
