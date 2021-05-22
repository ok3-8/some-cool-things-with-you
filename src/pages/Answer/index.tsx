import React, { useContext, useEffect, useRef, useState } from "react";

import marked from "marked";
import hljs from "highlight.js";
import dayjs from "dayjs";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

import { Context } from "../../App";
import codeJson from "./../../code_source/answer_json.json";
import "./index.css";

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	pedantic: false,
	sanitize: false,
	breaks: true,
	smartLists: true,
	smartypants: true,
	highlight: function (code) {
		return hljs.highlightAuto(code).value;
	},
});



function Answer() {
	const { tag } = useContext(Context);
	const [currentIndex,setCurIdx] = useState(0)
	const gitContainer = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (gitContainer.current) {
			const currentInfo = codeJson.ocean[currentIndex];
			const title = currentInfo.code.substring(0, currentInfo.code.indexOf("\n"));
			const gitTalk = new Gitalk({
				clientID: "9e9ac8734d3f7fe217d0",
				clientSecret: "178f81d3b50142a1d80798747ab5bc4ca573f885",
				repo: "some-cool-things-with-you", // The repository of store comments,
				owner: "ok3-8",
				admin: ["bluezhan", "Nico-M"],
				id: title, // Ensure uniqueness and length less than 50
				distractionFreeMode: false,
			});
			gitTalk.render(gitContainer.current);
		}
	}, [gitContainer,currentIndex]);
	function getJsonSingle() {
		const getIndex: any = {
			random: () => Math.floor(Math.random() * codeJson.ocean.length),
			sequence: () =>
				currentIndex + 1 > codeJson.ocean.length - 1 ? 0 : currentIndex + 1,
		};
		setCurIdx(getIndex[tag]());
		return codeJson.ocean[currentIndex];
	}

	const [data, setDate] = React.useState(codeJson.ocean[currentIndex]);
	const [btnState, setBtnState] = React.useState({
		disabled: false,
	});

	useEffect(() => {
		const getInfo: any[] = JSON.parse(
			window.localStorage.getItem("bestquestions") || "[]",
		);
		const currentInfo = codeJson.ocean[currentIndex];
		if (!getInfo.some((item: any) => item.id === currentInfo.id)) {
			const o = {
				id: currentInfo.id,
				title: currentInfo.code.substring(0, currentInfo.code.indexOf("\n")),
				language: currentInfo.language,
				usage: "15:00",
				times: 0,
				time: dayjs().format("hh:mm:ss DD/MM/YYYY"),
			};
			getInfo.push(o);
			window.localStorage.setItem("bestquestions", JSON.stringify(getInfo));
		}
	}, [currentIndex]);

	const goodCodeHtml = {
		__html: marked("## " + data.code),
	};

	function handleChange() {
		if (btnState.disabled) {
			return false;
		}
		setBtnState({ disabled: true });
		setTimeout(() => {
			setDate(getJsonSingle());
			(window as any).scrollTo({
				top: 0,
				behavior: "smooth",
			});
			setBtnState({ disabled: false });
		}, 800);
	}
	return (
		<div className="App answer">
			<div className="question">
				<div dangerouslySetInnerHTML={goodCodeHtml}></div>
			</div>
			<div className="change">
				<button
					onClick={handleChange}
					className={`progress-button ${btnState.disabled && "active"}`}
				>
					<span className="content">Keep on</span>
					<span className="progress"></span>
				</button>
			</div>
			<div id="gitalk-container" className="gitalk" ref={gitContainer}></div>
		</div>
	);
}

export default Answer;
