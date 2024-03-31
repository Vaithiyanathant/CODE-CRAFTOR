/** @format */
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import registerimg from "../../assets/registerimg.png";

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
			localStorage.setItem(
				"profileImage",
				"https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
			);
			navigate("/compiler");
		} catch (err) {
			setError(err.message);
		}
	};
	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		try {
			await googleSignIn();
			const url = auth.currentUser.photoURL;
			localStorage.setItem("profileImage", url);
			navigate("/compiler");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<section className='logcon min-h-screen flex items-center justify-center'>
				{/* Login container */}
				<div className='bg-[#31363c] flex rounded-2xl shadow-lg max-w-3xl p-4'>
					{/* Form */}
					<div className='sm:w-1/2 px-16'>
						<h2 className='font-bold text-2xl text-[white] text-center'>
							Login
						</h2>
						<p className='text-sm mt-7 text-[white] text-opacity-70 text-center'>
							If you're already a member, easily log in
						</p>
						{error && <h2 className='text-red'>{error}</h2>}

						{/* Data entry group */}
						<form
							onSubmit={handleSubmit}
							className='flex flex-col gap-4'
							action=''>
							<input
								className='p-2 mt-8 rounded-xl border'
								type='text'
								name='email'
								placeholder='Your email'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div className='relative'>
								<input
									className='p-2 mt-3 rounded-xl border w-full'
									type='password'
									name='password'
									placeholder='Your password'
									onChange={(e) => setPassword(e.target.value)}
								/>

								{/* SVG Eye */}
								<svg
									className='bi bi-eye-fill absolute top-1/2 right-4 translate-y-1/2top-6'
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='gray'
									viewBox='0 0 16 16'>
									<path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
									<path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
								</svg>
							</div>

							<button
								className='Login-button rounded-xl text-white py-2 mt-2'
								type='submit'>
								Login
							</button>
						</form>
						<div className='mt-10 grid grid-cols-3 items-center text-gray-400'>
							<hr className='border-gray-400' />
							<p className='text-center text-sm'>OR</p>
							<hr className='border-gray-400' />
						</div>
						<button
							onClick={handleGoogleSignIn}
							className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center text-sm'>
							<img
								className='w-6 mr-3'
								src='./img/google_logo_icon.png'
								alt=''
							/>
							Login with Google
						</button>
						<p className='mt-5 text-xs border-b border-gray-400 py-4'>
							<a
								href=''
								className='text-white'>
								Forgot Your password?
							</a>
						</p>
						<div className='mt-3 text-xs flex justify-between items-cente'>
							<p>
								<a
									href='#'
									className='text-white'>
									If you don't have an account?
								</a>
							</p>
							<Link to='/register'>
								<button className='py-2 px-5 bg-white text-black  border rounded-xl'>
									register
								</button>
							</Link>
						</div>
					</div>

					{/* Image */}
					<div className='sm:block hidden w-1/2'>
						<Link to='/register'>
							<img
								className='sm:block hidden rounded-2xl'
								alt='img-login'
								src={registerimg}
							/>
						</Link>
					</div>
				</div>

				{/* =============== */}
			</section>
		</>
	);
};
