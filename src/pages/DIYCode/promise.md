# 手撕 Promise

**前言**

很多同学在学习 Promise 时，知其然却不知其所以然，对其中的用法理解不了。本系列文章由浅入深逐步实现 Promise，并结合流程图、实例以及动画进行演示，达到深刻理解 Promise 用法的目的。

本系列文章由如下几个章节组成：

- 图解 Promise 实现原理(一)—— 基础实现 (本篇)
- 图解 Promise 实现原理(二)：Promise 链式调用
- 图解 Promise 实现原理(三)：Promise 原型方法实现
- 图解 Promise 实现原理(四)：Promise 静态方法实现
- 本文适合对 Promise 的用法有所了解的人阅读，如果还不清楚，请自行查阅阮一峰老师的 《ES6 入门 之 Promise 对象》。

Promise 规范有很多，如 Promise/A，Promise/B，Promise/D 以及 Promise/A 的升级版 Promise/A+，有兴趣的可以去了解下，最终 ES6 中采用了 Promise/A+ 规范。所以本文的 Promise 源码是按照 Promise/A+规范来编写的(不想看英文版的移步 Promise/A+规范中文翻译)。

## 第一步

想要写源码，我们其实根据其 API 倒退我们准备写的源码。毕竟我们现在是在逆向开发。所以看看我们用常用的 promise 用法。先看一下最常用的以下两种场景：

```javascript
//场景一：直接调用 -> 这就意味着在写源码的时候 Promise方法上本身绑定的就有 resolve 或者 reject的属性

Promise.resolve(1000); // -> 成功的值
Promise.reject("some error"); // -> 失败的值

//场景二：实例化 -> 这就意味着原型方法上要有个 then的方法
new Promise((resolve, reject) => {
	// 这里来个异步的代码
	settimeout(() => {
		resolve(1000);
	}, 1000);
}).then((res) => {
	console.log("接受的结果", res);
});
```

## 第二步

...
