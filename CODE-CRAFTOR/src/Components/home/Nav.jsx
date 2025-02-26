/** @format */

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import homelogo from "../../assets/logoforhome.png";

const navigation = [
	{ name: "Compiler", href: "/compiler", current: false },
	{ name: "History Log", href: "/history", current: false },
	{ name: "Safe Save Log", href: "/safelog", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Nav() {
	const { logOut } = useUserAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			localStorage.clear();
			navigate("/home");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='bg-[#020817] shadow-lg border-b-4 border-[#3576df] w-full'>
			<Disclosure as='nav'>
				{({ open }) => (
					<>
						<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
							<div className='relative flex h-16 items-center justify-between'>
								{/* 🔹 Logo at the Top Left */}
								<div className='flex items-center'>
									<img
										className='h-10 w-auto'
										src={homelogo}
										alt='Company Logo'
									/>
								</div>

								{/* 🔹 Navigation Buttons */}
								<div className='hidden sm:flex sm:space-x-6'>
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											className={classNames(
												item.current
													? "bg-[#3576df] text-white border-b-2 border-white"
													: "text-white bg-[#1e3a8a] hover:bg-[#3576df] hover:text-white transition-all shadow-lg",
												"rounded-lg px-6 py-2 text-sm font-semibold transform hover:scale-105 duration-200"
											)}>
											{item.name}
										</Link>
									))}
								</div>

								{/* 🔹 Profile Dropdown */}
								<div className='flex items-center space-x-4'>
									<Menu
										as='div'
										className='relative'>
										<div>
											<Menu.Button className='flex items-center px-4 py-2 rounded-lg border border-[#3576df] bg-[#020817] text-white hover:bg-[#1e3a8a] transition-all transform hover:scale-105'>
												<span className='sr-only'>Open user menu</span>
												<img
													className='h-8 w-8 rounded-full border-2 border-[#3576df]'
													src={localStorage.getItem("profileImage")}
													alt='Profile'
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter='transition ease-out duration-100'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'>
											<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#020817] py-1 shadow-lg ring-1 ring-[#3576df] focus:outline-none'>
												<Menu.Item>
													{({ active }) => (
														<Link
															to='/profile'
															className={classNames(
																active
																	? "bg-[#3576df] text-white"
																	: "text-gray-300",
																"block px-4 py-2 text-sm rounded-md transition-all"
															)}>
															Your Profile
														</Link>
													)}
												</Menu.Item>

												<Menu.Item>
													{({ active }) => (
														<button
															onClick={handleLogout}
															className={classNames(
																active
																	? "bg-red-600 text-white"
																	: "text-gray-300",
																"block w-full text-left px-4 py-2 text-sm rounded-md transition-all"
															)}>
															Log out
														</button>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						</div>

						{/* 🔹 Mobile Menu */}
						<Disclosure.Panel className='sm:hidden bg-[#020817]'>
							<div className='space-y-1 px-2 pb-3 pt-2'>
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className='block px-4 py-2 text-base font-medium text-white bg-[#1e3a8a] rounded-md hover:bg-[#3576df] transition-all shadow-lg'
										aria-current={item.current ? "page" : undefined}>
										{item.name}
									</Link>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
