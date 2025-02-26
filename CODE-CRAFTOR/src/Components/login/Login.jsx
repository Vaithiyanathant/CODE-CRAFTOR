/** @format */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebaseconfig";
import { useUserAuth } from "../../context/UserAuthContext";
import registerimg from "../../assets/registerimg.png";
import ParticleBackground from "../Particle";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { logIn, googleSignIn } = useUserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await logIn(email, password);
			const userName = email.split("@")[0];

			localStorage.setItem(
				"profileImage",
				"https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
			);
			localStorage.setItem("userEmail", email);
			localStorage.setItem("userName", userName);

			navigate("/compiler");
		} catch (err) {
			setError(err.message);
		}
	};

	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		try {
			await googleSignIn();
			const user = auth.currentUser;

			const userName = user.displayName || user.email.split("@")[0];
			const userEmail = user.email;
			const profileImage =
				user.photoURL ||
				"https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg";

			localStorage.setItem("profileImage", profileImage);
			localStorage.setItem("userEmail", userEmail);
			localStorage.setItem("userName", userName);

			navigate("/compiler");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<ParticleBackground />

			<section className='logcon min-h-screen flex items-center justify-center '>
				{/* Login Container */}
				<div className='bg-[#020817] flex rounded-2xl shadow-lg border-4 border-[#3576df] max-w-3xl p-6 w-full'>
					{/* Left Section (Form) */}
					<div className='sm:w-1/2 px-10'>
						<h2 className='font-bold text-2xl text-white text-center'>Login</h2>
						<p className='text-sm mt-5 text-gray-300 text-center'>
							If you're already a member, easily log in.
						</p>

						{error && (
							<h2 className='text-red-500 text-sm mt-2 text-center'>{error}</h2>
						)}

						{/* Input Fields */}
						<form
							onSubmit={handleSubmit}
							className='flex flex-col gap-4'>
							<input
								className='p-2 mt-6 rounded-lg bg-[#1a1d22] text-white border border-gray-500 focus:border-[#3576df] outline-none'
								type='text'
								name='email'
								placeholder='Your Email'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div className='relative'>
								<input
									className='p-2 mt-3 rounded-lg bg-[#1a1d22] text-white border border-gray-500 focus:border-[#3576df] outline-none w-full'
									type='password'
									name='password'
									placeholder='Your Password'
									onChange={(e) => setPassword(e.target.value)}
								/>
								{/* SVG Eye */}
								<svg
									className='bi bi-eye-fill absolute top-1/2 right-4 transform -translate-y-1/2'
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='gray'
									viewBox='0 0 16 16'>
									<path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
									<path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
								</svg>
							</div>

							{/* Login Button */}
							<button className='bg-[#3576df] hover:bg-[#285bb7] text-white rounded-lg py-2 mt-4 transition-all'>
								Login
							</button>
						</form>

						{/* Divider */}
						<div className='mt-8 flex items-center text-gray-400'>
							<hr className='flex-1 border-gray-500' />
							<p className='px-2 text-sm'>OR</p>
							<hr className='flex-1 border-gray-500' />
						</div>

						{/* Google Login Button */}
						<button
							onClick={handleGoogleSignIn}
							className='bg-white border py-2 w-full rounded-lg mt-5 flex justify-center items-center text-sm hover:bg-gray-200 transition'>
							<img
								className='w-5 mr-3'
								src='./img/google_logo_icon.png'
								alt=''
							/>
							Login with Google
						</button>

						{/* Forgot Password */}
						<p className='mt-5 text-xs text-gray-300 text-center'>
							<a
								href='#'
								className='hover:text-white transition'>
								Forgot your password?
							</a>
						</p>

						{/* Sign Up Link */}
						<div className='mt-4 text-xs flex justify-between items-center'>
							<p className='text-gray-300'>Don't have an account?</p>
							<Link to='/register'>
								<button className='py-2 px-5 bg-[#3576df] text-white border border-[#3576df] rounded-lg hover:bg-[#285bb7] transition'>
									Register
								</button>
							</Link>
						</div>
					</div>

					{/* Right Section (Image) */}
					<div className='sm:block hidden w-1/2 '>
						<Link to='/register'>
							<img
								className='rounded-2xl'
								alt='img-login'
								src={registerimg}
							/>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};
