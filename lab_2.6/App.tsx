import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useState } from 'react';

function App() {
	const [activePage, setActivePage] = useState('1');
	return (
		<div>
			<Navbar active={activePage} onNavigate={setActivePage}/>
			<Gallery/>
			<Content/>
			<Footer/>
		</div>
	);
}

export default App;