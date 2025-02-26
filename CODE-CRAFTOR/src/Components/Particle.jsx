/** @format */

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
	const particlesInit = async (main) => {
		console.log(main);
		await loadFull(main);
	};

	return (
		<Particles
			id='tsparticles'
			init={particlesInit}
			options={{
				autoPlay: true,
				background: {
					color: { value: "#020817" }, // Dark background
				},
				fullScreen: { enable: true, zIndex: -1 },
				detectRetina: true,
				fpsLimit: 120,
				interactivity: {
					detectsOn: "canvas",
					events: {
						onHover: {
							enable: true,
							mode: ["repulse", "grab"], // Repulse & Grab effect on hover
							parallax: { enable: true, force: 10, smooth: 20 },
						},
						onClick: {
							enable: true,
							mode: "push", // Click to add more pentagons
						},
					},
					modes: {
						grab: {
							distance: 180, // Increase the distance of the "grab" effect
							links: { opacity: 0.8, color: "#3576df" },
						},
						repulse: {
							distance: 120, // Push pentagons away when hovered
							duration: 0.4,
						},
						push: {
							quantity: 2, // Add more pentagons on click
						},
					},
				},
				particles: {
					number: {
						value: 100, // More pentagons
						density: { enable: true, area: 800 },
					},
					color: {
						value: "#3576df", // Blue pentagons
					},
					shape: {
						type: "polygon", // Pentagon shape
						polygon: { sides: 5 },
					},
					opacity: {
						value: 0.7,
						random: true,
						animation: {
							enable: true,
							speed: 0.5,
							minimumValue: 0.3,
							sync: false,
						},
					},
					size: {
						value: 6,
						random: true,
						animation: { enable: true, speed: 1, minimumValue: 2, sync: false },
					},
					move: {
						enable: true,
						speed: 1.5, // Smooth floating speed
						direction: "none",
						random: false,
						straight: false,
						outModes: { default: "out" },
					},
					links: {
						enable: true, // Link pentagons with thin blue lines
						distance: 150,
						color: "#3576df",
						opacity: 0.5,
						width: 1,
					},
				},
				pauseOnBlur: true,
				pauseOnOutsideViewport: true,
			}}
		/>
	);
};

export default ParticleBackground;
