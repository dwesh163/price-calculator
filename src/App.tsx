import { useState, useEffect } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

interface DrinkItem {
	id: string;
	name: string;
	price: number;
	color: string;
	text: string;
	quantity: number;
}

function App() {
	const [drinks, setDrinks] = useState<DrinkItem[]>([
		{ id: '1', name: 'Suze', price: 4.0, color: 'bg-blue-500', text: 'SUZE', quantity: 0 },
		{ id: '2', name: 'Martini', price: 4.0, color: 'bg-yellow-500', text: 'MARTINI', quantity: 0 },
		{ id: '3', name: 'Passon', price: 5.0, color: 'bg-green-500', text: 'PASSON', quantity: 0 },
		{ id: '4', name: 'Malibu', price: 5.0, color: 'bg-cyan-500', text: 'MALIBU', quantity: 0 },
		{ id: '5', name: 'Apfelkorn', price: 5.0, color: 'bg-amber-600', text: 'APFELKORN', quantity: 0 },
		{ id: '6', name: 'Trojka', price: 6.0, color: 'bg-emerald-500', text: 'TROJKA', quantity: 0 },
		{ id: '7', name: 'Trojka Rouge', price: 6.0, color: 'bg-red-500', text: 'TROJKA ROUGE', quantity: 0 },
		{ id: '8', name: 'Trojka Verte', price: 6.0, color: 'bg-purple-500', text: 'TROJKA VERTE', quantity: 0 },
		{ id: '9', name: 'Jäger', price: 6.0, color: 'bg-rose-500', text: 'JÄGER', quantity: 0 },
		{ id: '10', name: 'Gin', price: 6.0, color: 'bg-indigo-500', text: 'GIN', quantity: 0 },
		{ id: '11', name: 'Whisky', price: 6.0, color: 'bg-pink-500', text: 'WHISKY', quantity: 0 },
		{ id: '12', name: 'Rhum', price: 6.0, color: 'bg-orange-500', text: 'RHUM', quantity: 0 },
		{ id: '13', name: 'Smirnoff Ice', price: 6.0, color: 'bg-teal-500', text: 'SMIRNOFF ICE', quantity: 0 },
		{ id: '14', name: 'Desperados', price: 6.0, color: 'bg-lime-500', text: 'DESPERADOS', quantity: 0 },
		{ id: '15', name: 'Bière', price: 4.0, color: 'bg-blue-600', text: 'BIÈRE', quantity: 0 },
		{ id: '16', name: 'Minérale', price: 3.0, color: 'bg-gray-500', text: 'MINÉRALE', quantity: 0 },
	]);

	const [total, setTotal] = useState(0);

	useEffect(() => {
		const newTotal = drinks.reduce((sum, drink) => sum + drink.price * drink.quantity, 0);
		setTotal(newTotal);
	}, [drinks]);

	const handleDrinkTap = (drinkId: string) => {
		setDrinks((prev) => prev.map((drink) => (drink.id === drinkId ? { ...drink, quantity: drink.quantity + 1 } : drink)));
	};

	const adjustQuantity = (drinkId: string, change: number) => {
		setDrinks((prev) => prev.map((drink) => (drink.id === drinkId ? { ...drink, quantity: Math.max(0, drink.quantity + change) } : drink)));
	};

	const resetAll = () => {
		setDrinks((prev) => prev.map((drink) => ({ ...drink, quantity: 0 })));
	};

	const getFormula = () => {
		const items = drinks.filter((drink) => drink.quantity > 0);
		if (items.length === 0) return '...';

		return items.map((drink) => (drink.quantity === 1 ? `${drink.price}` : `${drink.quantity}×${drink.price}`)).join(' + ');
	};

	return (
		<div className="min-h-screen bg-gray-900 px-5 py-4 safe-area-inset">
			<div className="max-w-full mx-auto">
				<div className="text-center mb-6 mt-4">
					<div className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-2 drop-shadow-lg" style={{ fontFamily: 'Montserrat', fontWeight: 900 }}>
						{total.toFixed(0)} CHF
					</div>
					{getFormula() && (
						<div className="text-sm sm:text-base md:text-lg text-gray-300 font-medium bg-gray-800 rounded-xl px-3 py-2 inline-block max-w-full overflow-x-auto" style={{ fontFamily: 'Montserrat' }}>
							{getFormula()}
						</div>
					)}
				</div>

				<div className="grid grid-cols-3 gap-3 mb-6">
					{drinks.map((drink) => (
						<div key={drink.id} className={`${drink.color} rounded-2xl sm:rounded-3xl p-3 sm:p-4 aspect-square flex flex-col shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95`}>
							<button onClick={() => handleDrinkTap(drink.id)} className="flex-1 focus:outline-none active:scale-95 transition-transform mb-2 sm:mb-3">
								<div className="w-full h-full flex items-center justify-center rounded-xl sm:rounded-2xl backdrop-blur-sm">
									<div className="text-white font-bold text-xs text-center px-1" style={{ fontFamily: 'Montserrat', fontWeight: 900 }}>
										{drink.text}
									</div>
								</div>
							</button>

							<div className="flex items-center justify-between bg-white/20 rounded-xl sm:rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
								<button onClick={() => adjustQuantity(drink.id, -1)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-all active:scale-90 touch-manipulation" disabled={drink.quantity === 0}>
									<Minus size={14} strokeWidth={4} className="text-white" />
								</button>

								<div className="text-lg sm:text-xl font-bold text-white px-1 sm:px-2 min-w-0" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>
									{drink.quantity}
								</div>

								<button onClick={() => adjustQuantity(drink.id, 1)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-all active:scale-90 touch-manipulation">
									<Plus size={14} strokeWidth={4} className="text-white" />
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="text-center pb-4">
					<button onClick={resetAll} className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2 mx-auto touch-manipulation" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>
						<RotateCcw size={18} />
						RESET
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
