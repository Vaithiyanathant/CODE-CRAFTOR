/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import li from "../../assets/loginback.png";
import ParticleBackground from "../Particle";

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
			<ParticleBackground />
			<section className='regcon min-h-screen flex items-center justify-center '>
				{/* Register Container */}
				<div className='bg-[#020817] flex rounded-2xl shadow-lg border-4 border-[#3576df] max-w-3xl p-6 w-full'>
					{/* Left Section (Image) */}
					<div className='sm:block hidden w-1/2  rounded-2xl p-2'>
						<Link to='/login'>
							<img
								className='rounded-xl'
								alt='img-login'
								src={li}
							/>
						</Link>
					</div>

					{/* Right Section (Form) */}
					<div className='sm:w-1/2 px-10'>
						<h2 className='font-bold text-2xl text-white text-center'>
							Register
						</h2>
						<p className='text-sm mt-5 text-gray-300 text-center'>
							If you don't have an account, create it now!
						</p>

						{/* Input Fields */}
						<form
							className='flex flex-col gap-4'
							onSubmit={handleSubmit}>
							{error && (
								<h2 className='text-red-500 text-sm mt-2 text-center'>
									{error}
								</h2>
							)}

							<input
								className='p-2 mt-6 rounded-lg bg-[#1a1d22] text-white border border-gray-500 focus:border-[#3576df] outline-none'
								type='text'
								name='email'
								placeholder='Your Email'
								onChange={(event) => setEmail(event.target.value)}
							/>

							<div className='relative flex items-center'>
								<input
									className='p-2 mt-2 rounded-lg bg-[#1a1d22] text-white border border-gray-500 focus:border-[#3576df] outline-none w-full'
									type={showPassword ? "text" : "password"}
									name='password'
									placeholder='Your Password'
									onChange={(event) => setPassword(event.target.value)}
								/>
								<svg
									className='bi bi-eye-fill absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
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

							{/* Register Button */}
							<button className='bg-[#3576df] hover:bg-[#285bb7] text-white rounded-lg py-2 mt-4 transition-all'>
								Register
							</button>
						</form>

						{/* Divider */}
						<div className='mt-8 flex items-center text-gray-400'>
							<hr className='flex-1 border-gray-500' />
							<p className='px-2 text-sm'>OR</p>
							<hr className='flex-1 border-gray-500' />
						</div>

						{/* Already Have an Account */}
						<div className='mt-4 text-xs flex justify-between items-center'>
							<p className='text-gray-300'>Already have an account?</p>
							<Link to='/login'>
								<button className='py-2 px-5 bg-[#3576df] text-white border border-[#3576df] rounded-lg hover:bg-[#285bb7] transition'>
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
