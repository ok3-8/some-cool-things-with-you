import React, { useState, useEffect } from "react";
import marked from "marked";

import theTextFile from "./promise.md";

import "./index.css";

function DIYCode() {
	const [postMarkdown, setPostMarkdown] = useState("");

	useEffect(() => {
		fetch(theTextFile)
			.then((response) => response.text())
			.then((text) => {
				// Logs a string of Markdown content.
				// Now you could use e.g. <rexxars/react-markdown> to render it.
				// console.log(text);
				setPostMarkdown(text);
			});
	}, []);

	const content = {
		__html: marked(postMarkdown),
	};

	return (
		<div className="App diy-code">
			<div className="box" dangerouslySetInnerHTML={content}></div>
		</div>
	);
}

export default DIYCode;
