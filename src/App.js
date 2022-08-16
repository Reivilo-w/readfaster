import { useState } from "react";
import "./scss/main.scss";

const App = () => {
	const [wordsPerMinute, setWordsPerMinute] = useState(500);
	const [actualWord, setActualWord] = useState("Texte");
	const [textToRead, setTextToRead] = useState(
		"Ceci est un exemple du texte que nous allons lire"
	);
	const [formClasses, setFormClasses] = useState("");

	const startReading = (event) => {
		event.preventDefault();
		const interval = 60000 / wordsPerMinute;

		let txt = `3 2 1 ... Go! ${textToRead}`;
    txt = txt.replace('.', ' ');
    txt = txt.replace(',', ' ');
    txt = txt.replace(/(?:\\[rn]|[\r\n]+)+/gm, ' ');;

    console.log(txt);
		const words = txt.split(" ");

		const intervalId = setInterval(() => {
			const word = words.shift();
			setActualWord(word);
			if (words.length === 0) {
				clearInterval(intervalId);
			}
		}, interval);

		setFormClasses("hided");
	};

	const showButton = () => {
		if (formClasses === "hided") {
			return (
				<button
					id="showForm"
					onClick={() => {
						setFormClasses("");
					}}
				>
					Show Form
				</button>
			);
		}
	};

	return (
		<div className="App">
			<form className={formClasses}>
				<div className="form-group">
					<label>Nombre de mots par minute:</label>
					<input
						type="number"
						onChange={(e) => {
							setWordsPerMinute(e.target.value);
						}}
						value={wordsPerMinute}
					/>
				</div>
				<div className="form-group">
					<label>Texte à lire</label>
					<textarea
						value={textToRead}
						onChange={(e) => {
							setTextToRead(e.target.value);
						}}
						name=""
						id=""
						cols="30"
						rows="10"
					></textarea>
				</div>
				<button onClick={startReading}>Start</button>
			</form>

			{showButton()}

			<div id="readme">{actualWord}</div>
		</div>
	);
};

export default App;

