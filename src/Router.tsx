import React from "react";

import Land4glory from "./pages/Land4glory";
import Bad2Good from "./pages/Bad2Good";
import Answer from "./pages/Answer";
import DIYCode from "./pages/DIYCode";
import Abcdefg from "./pages/Abcdefg";
import { Switch, Route } from "react-router-dom";

const Router = () => (
	<Switch>
		<Route exact path="/" component={Bad2Good} />
		<Route path="/land-of-lory" component={Land4glory} />
		<Route path="/bad-to-good" component={Bad2Good} />
		<Route path="/best-questions" component={Answer} />
		<Route path="/diy-code" component={DIYCode} />
		<Route path="/abcdefg" component={Abcdefg} />
	</Switch>
);

export default Router;
