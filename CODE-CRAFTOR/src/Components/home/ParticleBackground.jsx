/** @format */

import particlesconfig from "./particles-config";
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
			options={particlesconfig}
		/>
	);
};

export default ParticleBackground;
