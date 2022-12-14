import * as React from "react";

/**
 * Export Play route and redirect to play.html for tetris gameplay with play.js
 * @returns JSX.Element
 */
export default function Play() {
	return (
		<head>
			<meta httpEquiv='refresh' content='0; url=play.html' />
		</head>
	);
}
