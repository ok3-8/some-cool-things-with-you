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
			<div className="url-list">
				<ul>
					<li>
						<span>JS手写实现new的实现方式</span>
					</li>
					<li>
						<span>JS手写实现new的实现方式</span>
					</li>
					<li>
						<span>call、aplly、bind 实现</span>
					</li>
					<li>
						<span>new 实现</span>
					</li>
					<li>
						<span>class 实现继承</span>
					</li>
					<li>
						<span>async/await 实现</span>
					</li>
					<li>
						<span>reduce 实现</span>
					</li>
					<li>
						<span>实现一个双向数据绑定</span>
					</li>
					<li>
						<span>instanceof 实现</span>
					</li>
					<li>
						<span>Array.isArray 实现</span>
					</li>
					<li>
						<span>Object.create 的基本实现原理</span>
					</li>
					<li>
						<span>getOwnPropertyNames 实现</span>
					</li>
					<li>
						<span>promise 实现</span>
					</li>
					<li>
						<span>手写一个防抖/节流函数</span>
					</li>
					<li>
						<span>柯里化函数的实现</span>
					</li>
					<li>
						<span>手写一个深拷贝</span>
					</li>
					<li>
						<span>...</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default DIYCode;
