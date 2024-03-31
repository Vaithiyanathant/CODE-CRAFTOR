/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";

import li from "../../assets/loginback.png";

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false); // State to track password visibility

	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");
	const { signUp } = useUserAuth();
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await signUp(email, password);
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<section className='regcon min-h-screen flex items-center justify-center '>
				<div className='bg-[#31363c] flex rounded-2xl shadow-lg max-w-3xl p-4'>
					<div className='sm:block hidden w-1/2'>
						<Link to='/login'>
							<img
								className='sm:block hidden rounded-2xl'
								alt='img-login'
								src={li}
							/>
						</Link>
					</div>
					<div className='sm:w-1/2 px-16'>
						<h2 className='font-bold text-2xl text-[white] text-center'>
							Register
						</h2>
						<p className='text-sm mt-7 text-[#ebdede] text-opacity-70 text-center'>
							If you don't have an account, create it now!
						</p>
						<form
							className='flex flex-col gap-4'
							onSubmit={handleSubmit}>
							{error && <h2 className='text-red'>{error}</h2>}
							<input
								className='p-2 mt-5 rounded-xl border'
								type='text'
								name='email'
								placeholder='Your email'
								onChange={(event) => setEmail(event.target.value)}
							/>
							<div className='relative flex items-center'>
								<input
									className='p-2 mt-2 rounded-xl border w-full'
									type={showPassword ? "text" : "password"}
									name='password'
									placeholder='Your password'
									onChange={(event) => setPassword(event.target.value)}
								/>
								<svg
									className='bi bi-eye-fill absolute right-4 top-5 cursor-pointer'
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='gray'
									viewBox='0 0 16 16'
									onClick={() => setShowPassword(!showPassword)}>
									<path
										fillRule='evenodd'
										d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z'
									/>
									<path
										fillRule='evenodd'
										d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z'
									/>
								</svg>
							</div>
							<button
								className='Login-button rounded-xl text-white py-2 mt-2'
								type='Submit'>
								Register
							</button>
						</form>
						<div className='mt-10 grid grid-cols-3 items-center text-gray-400'>
							<hr className='border-gray-400' />
							<p className='text-center text-sm text-white'>OR</p>
							<hr className='border-gray-400' />
						</div>
						<div className='mt-3 text-xs flex justify-between items-cente'>
							<p>
								<a
									href='#'
									className='text-white'>
									If you already have an account?
								</a>
							</p>
							<Link to='/login'>
								<button className='py-2 px-5 bg-white text-black border rounded-xl'>
									Login
								</button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Register;
