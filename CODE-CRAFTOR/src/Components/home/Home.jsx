/** @format */
import styled from "styled-components";
import { cursor, useTypewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import homelogo from "../../assets/logoforhome.png";

export const Home = () => {
	const github = () => {
		window.open("https://github.com/Vaithiyanathant/CODE-CRAFTOR", "_blank");
	};
	const [typeEffect] = useTypewriter({
		words: ["CodeCraftor", "a tool for coders"],
		loop: { loopCount: 1 },
		typeSpeed: 100,
		deleteSpeed: 60,
		cursor: {
			show: true, // Show the cursor
			blink: true, // Make the cursor blink
			element: "|", // You can customize the cursor element
			hideWhenDone: true, // Hide the cursor when typing is done
			hideWhenNotStarted: false, // Do not hide the cursor when typing hasn't started
		},
	});
	return (
		<HomeStyled>
			<div className='home logcon'>
				<div className='content'>
					<div className='left'>
						<div className='text cursor'>
							<h1 className='cursor text-white'>
								<span>{typeEffect}</span>
								{cursor}
							</h1>
							<h3>tool for coders</h3>
							<p>
        <li><strong>Efficient and Secure Coding</strong>: Advanced online compiler supporting multiple languages.</li>
        <li><strong>Safe Save Mode</strong>: Auto-saves work to prevent data loss.</li>
        <li><strong>History Log</strong>: Tracks code changes and allows reversion to previous versions.</li>
        <li><strong>Real-Time Collaboration</strong>: Shared coding sessions and integrated chat.</li>
        <li><strong>User-Friendly Interface</strong>: Enhanced coding experience with syntax highlighting and debugging tools.</li>
        <li><strong>Cloud Storage</strong>: Securely store projects and access them anytime.</li>
        <li><strong>Ideal for Developers</strong>: Suitable for both individual developers and collaborative teams.</li>
        <li><strong>Start Coding Today</strong>: Begin coding with CodeCraftor to elevate your development process!</li>
							</p>
							<div className='btns'>
								<Link
									to='/register'
									className='signup'>
									Get started!
								</Link>
								<Link
									to='/login'
									className='login'>
									Login
								</Link>
							</div>
							<button
								className='git'
								onClick={() => github()}>
								<img
									src='https://img.icons8.com/ios-filled/30/ffffff/github.png'
									alt='github'
								/>
								View on Github
							</button>
						</div>
					</div>
					<div className='right'>
						<img className="homelogo"
							alt='logo'
							src={homelogo}
						/>
					</div>
				</div>
			</div>
		</HomeStyled>
	);
};

const HomeStyled = styled.div`
	* {
		transition: all 150ms ease-in-out;
	}
	.home {
		/* background: rgb(33, 38, 45); */
		background: black;
		height: 100vh;
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.content {
			border: 0.3rem solid rgb(48, 55, 60);
			display: flex;
			justify-content: center;
			border-radius: 1.5rem;
			/* height: 85%; */
			/* overflow-y: scroll; */
			width: 90%;
			.left {
				display: flex;
				width: 55%;
				/* border: 1rem solid black; */
				flex-direction: column;
				background-color: black;
				/* border-radius: 1rem; */
				border-bottom-left-radius: 1rem;
				border-top-left-radius: 1rem;
				margin: 0rem;
				.text {
					width: 100%;
					padding: 1.5rem;
					/* padding-left: 2rem; */
					h1 {
						font-size: 3rem;
						font-weight: 800;
					}
					h3 {
						font-size: 1.4rem;
					}
					p {
						color: #ffffff;
						font-size: 1.1rem;
						line-height: 1.7rem;
						padding-top: 1.5rem;
					}
					ul {
						color: white;
						padding-top: 0.5rem;
						padding-left: 1rem;
						li {
							display: list-item;
							margin-left: 1rem;
							line-height: 1.7rem;
							font-size: 1.1rem;
							list-style-type: disc;
						}
					}
					.btns {
						width: 100%;
						display: flex;
						padding-top: 1rem;
						padding-bottom: 0.75rem;
						justify-content: space-between;
						.signup {
							width: 48%;
							border-radius: 0.6rem;
							background-color: #ffffff;
							padding: 0.75rem;
							text-align: center;
							color: #000000;
							font-weight: 700;
							border: 0.2rem solid #ffffff;
							text-decoration: none;
							:hover {
								cursor: pointer;
								color: #ffffff;
								background-color: #000000;
							}
						}
						.login {
							width: 48%;
							border-radius: 0.6rem;
							background-color: #ffffff;
							padding: 0.75rem;
							text-align: center;
							font-weight: 700;
							border: 0.2rem solid #ffffff;
							color: #000000;
							text-decoration: none;
							:hover {
								cursor: pointer;
								color: #ffffff;
								background-color: #000000;
							}
						}
					}
					button {
						background-color: #000;
						color: #ffffff;
						border: 0.1rem solid white;
						width: 100%;
						padding: 0.7rem;
						border-radius: 1rem;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 1.2rem;
						font-weight: 500;
						:hover {
							cursor: pointer;
							font-size: 1.25rem;
							padding: 0.71rem;
							text-decoration: underline;
						}
						img {
							background-color: #000;
							color: #000;
							padding-right: 0.5rem;
						}
					}
				}
			}
			.right {
				width: 45%;
				background-color: #000000;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom-right-radius: 1rem;
				border-top-right-radius: 1rem;
				img {
					width: 30rem;
				}
			}
		}
	}

	@media (max-width: 1200px) {
		.home {
			.content {
				.right {
					img {
						width: 25rem;
					}
				}
			}
		}
	}
	@media (max-width: 1050px) {
		.home {
			.content {
				.left {
					.text {
						h1 {
							font-size: 2.5rem;
						}
						h3 {
							font-size: 1.2rem;
						}
						p {
							font-size: 1rem;
						}
						ul {
							li {
								font-size: 1rem;
								line-height: 1.5rem;
							}
						}
						.btns {
							/* width: 100%; */
							padding-top: 0.8rem;
							padding-bottom: 0.6rem;
							font-size: 1rem;
							.signup {
								/* width: 48%;
                border-radius: 0.6rem; */
								padding: 0.6rem;
								font-weight: 700;
							}
							.login {
								/* width: 48%;
                border-radius: 0.6rem; */
								padding: 0.6rem;
								font-weight: 700;
							}
						}
						button {
							padding: 0.5rem;
							font-size: 1rem;
							:hover {
								font-size: 1.1rem;
								padding: 0.65rem;
							}
							img {
								padding-right: 0.5rem;
							}
						}
					}
				}
				.right {
					img {
						width: 20rem;
					}
				}
			}
		}
	}
	@media (max-width: 800px) {
		.home {
			.content {
				.left {
					.text {
						h1 {
							font-size: 2rem;
						}
						h3 {
							font-size: 1rem;
						}
						p {
							font-size: 0.8rem;
						}
						ul {
							li {
								font-size: 0.8rem;
								line-height: 1.2rem;
							}
						}
						.btns {
							padding-top: 0.8rem;
							padding-bottom: 0.6rem;
							font-size: 1rem;
							.signup {
								padding: 0.3rem;
								font-weight: 700;
							}
							.login {
								padding: 0.3rem;
								font-weight: 700;
							}
						}
						button {
							padding: 0.3rem;
							font-size: 0.8rem;
							font-weight: 600;
							:hover {
								font-size: 1rem;
								padding: 0.35rem;
							}
							img {
								padding-right: 0.5rem;
							}
						}
					}
				}
				.right {
					img {
						width: 16rem;
					}
				}
			}
		}
	}
	@media (max-width: 650px) {
		.home {
			.content {
				.left {
					.text {
						h1 {
							font-size: 1.5rem;
						}
						h3 {
							font-size: 0.8rem;
						}
						p {
							font-size: 0.6rem;
							line-height: 1rem;
						}
						ul {
							li {
								font-size: 0.6rem;
								line-height: 1.2rem;
							}
						}
						.btns {
							padding-top: 0.5rem;
							padding-bottom: 0.6rem;
							font-size: 0.8rem;
							.signup {
								padding: 0.15rem;
								font-weight: 700;
							}
							.login {
								padding: 0.15rem;
								font-weight: 700;
							}
						}
						button {
							padding: 0.1rem;
							font-size: 0.7rem;
							border-radius: 0.75rem;
							:hover {
								font-size: 1rem;
								padding: 0.35rem;
							}
							img {
								width: 2rem;
								padding-right: 0.5rem;
							}
						}
					}
				}
				.right {
					img {
						width: 13rem;
					}
				}
			}
		}
	}
	@media (max-width: 425px) {
		.home {
			.content {
				padding: 1.5rem;
				/* padding-top: 1.5rem; */
				background-color: #000000;
				flex-direction: column-reverse;
				justify-content: space-between;
				align-items: center;
				/* width: 70%; */
				/* padding: 0.1rem; */
				.left {
					border-radius: 1.3rem;
					padding: 0rem;
					margin: 0rem;
					width: 100%;
					.text {
						padding-top: 0rem;
						h1 {
							display: none;
						}
						h3 {
							display: none;
						}
						p {
							display: none;
						}
						ul {
							li {
								font-size: 0.8rem;
								line-height: 1.2rem;
							}
						}
						.btns {
							padding-top: 0.8rem;
							padding-bottom: 0.8rem;
							font-size: 0.8rem;
							font-weight: 800;
							.signup {
								padding: 0.15rem;
								font-weight: 700;
							}
							.login {
								padding: 0.15rem;
								font-weight: 700;
							}
						}
						button {
							padding: 0.1rem;
							font-size: 0.8rem;
							border-radius: 0.75rem;
							:hover {
								font-size: 1rem;
								padding: 0.35rem;
							}
							img {
								width: 2rem;
								padding-right: 0.5rem;
							}
						}
					}
				}
				.right {
					border-radius: 1.3rem;
					/* height: 10rem; */
					/* position: absolute; */
					overflow: hidden;
					height: 5rem;
					width: 14rem;
					img {
						/* object-fit: contain; */
						margin: 0 0 0 0;
						/* height: 5rem; */
						border-radius: 1.3rem;
					}
				}
			}
		}
	}
	@media (max-width: 320px) {
		.home {
			.content {
				padding: 1rem;
			}
		}
	}
	@media (max-width: 290px) {
		.home {
			.content {
				justify-content: space-around;
				height: 55%;
				.left {
					.text {
						.btns {
							.login {
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}
					}
				}
			}
		}
	}
`;
