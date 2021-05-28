import React, { useEffect, useReducer } from "react";
import { Link, useLocation } from "react-router-dom";
import ouibounce from "ouibounce";

import Router from "./Router";

import avatar from "./assets/avatar5.jpg";
import setting from "./assets/setting.png";

import marked from "marked";
import hljs from "highlight.js";

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

export const Context = React.createContext({ tag: "random" });

function reducer(state: any, action: any) {
	switch (action.type) {
		case "random":
			return { tag: "random" };
		case "sequence":
			return { tag: "sequence" };
		default:
			throw new Error();
	}
}

function CircularText({ text, emoji, color }: any) {
	return (
		<div className={`circular ${color}`}>
			<svg viewBox="0 0 100 100">
				<path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
				<text>
					<textPath xlinkHref="#circle">{text}</textPath>
				</text>
			</svg>
			<span>{emoji}</span>
		</div>
	);
}

function App() {
	const [state, dispatch] = useReducer(reducer, { tag: "random" });

	// useEffect(() => {
	//   window.onbeforeunload = function() {
	//     console.log('beforeunload')
	//     return 1;
	//   };
	//   window.onblur = function () {
	//     console.log("失去焦点");
	//   }
	//   document.addEventListener('visibilitychange',function(){
	//     if(document.visibilityState==='hidden'){
	//       console.log("选项卡切换");
	//     }
	//   });
	// }, []);
	useEffect(() => {
		ouibounce(document.getElementById("ouibounce-modal"), { cookieExpire: 1 });
	}, []);
	const { pathname } = useLocation();
	const hasSetting = ["/bad-to-good", "/best-questions"].includes(pathname);

	function handleChange(e: any) {
		const { checked } = e.target;
		dispatch({ type: checked ? "sequence" : "random" });
	}

	function handleClick() {
		return (document.getElementById("ouibounce-modal")!.style.display = "none");
	}

	const { tag } = state;

	return (
		<Context.Provider
			value={{
				tag,
			}}
		>
			<div>
				<div className="nav">
					<Link to="/land-of-lory">
						<div className="logo">
							<img alt="avatar" src={avatar}></img>
						</div>
					</Link>
					<Link to="/bad-to-good">
						<CircularText text="Bad To Good" emoji="🥝" color="green" />
					</Link>
					<Link to="/best-questions">
						<CircularText text="Best Question" emoji="🍋" color="cyan" />
					</Link>
					<Link to="/diy-code">
						<CircularText text="Do it yourself" emoji="🍓" color="cc99" />
					</Link>
					<Link to="/abcdefg">
						<CircularText text="A B C D E F G" emoji="🍓" color="timber" />
					</Link>
					<div
						className="cycle"
						style={{ display: `${hasSetting ? "block" : "none"}` }}
					>
						<div className="option">
							<div className="tg-list-item">
								<h4>in sequence or by random</h4>
								<input
									className="tgl tgl-flip"
									id="cb5"
									onChange={handleChange}
									type="checkbox"
								/>
								<label
									className="tgl-btn"
									data-tg-off="Random"
									data-tg-on="Sequence"
									htmlFor="cb5"
								></label>
							</div>
						</div>
						<div
							className="setting"
							style={{
								animation: `${
									tag === "random" ? "rondomRotation" : "rotation"
								} 1.6s linear infinite`,
							}}
						>
							<img alt="setting" src={setting}></img>
						</div>
					</div>
				</div>
				<Router />
				<div
					id="ouibounce-modal"
					className="ns-box ns-growl ns-effect-genie ns-type-notice ns-show"
				>
					<div className="ns-box-inner">
						<p>
							Your preferences have been saved successfully. See all your
							settings in your
							{/* eslint-disable-next-line */}
							<a href="#">profile overview</a>.
						</p>
					</div>
					<span className="ns-close" onClick={handleClick}></span>
				</div>
			</div>
		</Context.Provider>
	);
}

export default App;
