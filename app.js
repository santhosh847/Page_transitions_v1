const tlLeave = gsap.timeline({
	defaults: {
		duration: 0.7,
		ease: "power2.out",
	},
});

const tlEnter = gsap.timeline({
	defaults: {
		duration: 0.7,
		ease: "power2.out",
	},
});

const leaveAnimation = (current, done) => {
	const product = current.querySelector(".img-container");
	const text = current.querySelector(".showcase-text");
	const circles = current.querySelectorAll(".circle");
	const arrow = current.querySelector(".showcase-arrow");
	return (
		tlLeave.to(product, { opacity: 0, y: 100, onComplete: done }),
		tlLeave.to(arrow, { opacity: 0, y: 100, onComplete: done }, "<"),
		tlLeave.to(text, { opacity: 0, y: 100, onComplete: done }, "<"),
		tlLeave.to(circles, { opacity: 0, y: 100, onComplete: done }, "<")
	);
};

const enterAnimation = (current, done, gradient) => {
	const product = current.querySelector(".img-container");
	const text = current.querySelector(".showcase-text");
	const circles = current.querySelectorAll(".circle");
	const arrow = current.querySelector(".showcase-arrow");
	return (
		tlEnter.to("body", { background: gradient }),
		tlEnter.fromTo(
			product,
			{ opacity: 0, y: 100 },
			{ opacity: 1, y: 0, onComplete: done },
			"<"
		),
		tlEnter.fromTo(
			arrow,
			{ opacity: 0, y: 100 },
			{ opacity: 1, y: 0, onComplete: done },
			"<"
		),
		tlEnter.fromTo(
			text,
			{ opacity: 0, y: 100 },
			{ opacity: 1, y: 0, onComplete: done },
			"<"
		),
		tlEnter.fromTo(
			circles,
			{ opacity: 0, y: 100 },
			{ opacity: 1, y: 0, onComplete: done },
			"<"
		)
	);
};

barba.init({
	preventRunning: true,
	transitions: [
		{
			name: "default-transition",
			once(data) {
				const done = this.async();
				let gradient = getGradient(data.next.namespace);
				gsap.set("body", { background: gradient });
				enterAnimation(data.next.container, done, gradient);
			},
			leave(data) {
				// create your stunning leave animation here
				const done = this.async();
				leaveAnimation(data.current.container, done);
			},
			enter(data) {
				// create your amazing enter animation here
				const done = this.async();
				let gradient = getGradient(data.next.namespace);
				enterAnimation(data.next.container, done, gradient);
			},
		},
		{
			name: "product-hero-transition",
			from: { namespace: ["product"] },
			to: { namespace: ["handbag", "boot", "hat"] },
			leave(data) {
				const done = this.async();
				leaveProduct(data.current.container, done);
			},
		},
		{
			name: "hero-product-transition",
			from: { namespace: ["handbag", "boot", "hat"] },
			to: { namespace: ["product"] },
			enter(data) {
				const done = this.async();
				enterProduct(data.current.container, done);
			},
		},
	],
});

function getGradient(color) {
	switch (color) {
		case "handbag":
			return "linear-gradient(260deg, #b75d62, #754d4f)";
		case "boot":
			return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
		case "hat":
			return "linear-gradient(260deg, #b27a5c, #7f5450)";
	}
}

//product page

function enterProduct(product, done) {
	gsap.fromTo(
		product,
		{ y: "100%" },
		{ y: 0, onComplete: done, duration: 2, ease: "power2.out" }
	);
}

function leaveProduct(product, done) {
	gsap.fromTo(
		product,
		{ y: 0 },
		{ y: "100%", onComplete: done, duration: 1, ease: "power2.out" }
	);
}
