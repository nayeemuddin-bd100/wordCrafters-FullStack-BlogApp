
import { Disclosure, Transition } from "@headlessui/react";

import { NavLink } from "react-router-dom";
import {
	MenuIcon,
	XIcon,
	LoginIcon,
	BookOpenIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";



const navigation = [
	{ name: "Home", href: "/", current: false },
	{ name: "Create", href: "/create-post", current: false },
	{ name: "Posts", href: "/posts", current: false },
	{ name: "Register", href: "/register", current: false },
	// { name: "Login", href: "/login", current: false },
];


const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
}
const PublicNavbar = () => {
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-16">
							<div className="flex">
								<div className="-ml-2 mr-2 flex items-center md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="flex-shrink-0 flex items-center">
									{/* Logo */}
									<BookOpenIcon className="h-10 w-10 text-yellow-200" />
								</div>
								<div className="hidden md:mx-2 md:flex md:items-center md:space-x-4">
									{navigation.map((item) => (
										<NavLink
											key={item.name}
											to={item.href}
											className={({ isActive }) =>
												classNames(
													isActive
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"pl-2 lg:px-3 py-2 rounded-md text-sm font-medium"
												)
											}
										>
											{item.name}
										</NavLink>
									))}
								</div>
							</div>
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<NavLink
										to="/login"
										type="button"
										className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
									>
										<LoginIcon
											className="-ml-1 mr-2 h-5 w-5"
											aria-hidden="true"
										/>
										<span>Login</span>
									</NavLink>
								</div>
								<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
									<NavLink
										to="/create-post"
										className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
									>
										<PlusIcon
											className="-ml-1 mr-2 h-5 w-5"
											aria-hidden="true"
										/>
										<span>New Post</span>
									</NavLink>
								</div>
							</div>
						</div>
					</div>

					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Disclosure.Panel className="md:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								{navigation.map((item) => (
									<Disclosure.Button
										as={NavLink}
										key={item.name}
										to={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block px-3 py-2 rounded-md text-base font-medium"
										)}
										// aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
}

export default PublicNavbar