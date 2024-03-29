/* eslint-disable react/prop-types */
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MailIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
	blockUserAction,
	deleteUserAction,
	UnBlockUserAction,
} from "./../../redux/slices/users/usersSlices";
import toast from "react-hot-toast";

const UsersListItem = ({ user }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loggedInUser = useSelector((state) => state?.users?.profile);

	const isBlocked = loggedInUser?.blockedUsers?.includes(user?.id);
	const handleDelete = (id) => {
		const shouldDelete = window.confirm(
			"Are you sure you want to delete this user?"
		);
		if (shouldDelete) {
			if (!loggedInUser?.isAdmin) {
				return toast.error("Only Admin can delete user");
			} else if (user.email === "nayeemuddin.bd100@gmail.com") {
				return toast.error("Demo Admin cannot delete Super Admin");
			} else if (user.email === "wordcrafters@admin.com") {
				return toast.error("Demo Admin cannot delete Own Account");
			} else if (user.email === "wordcrafters@user.com") {
				return toast.error("Demo Admin cannot delete Demo User Account");
			}

			dispatch(deleteUserAction(id));
			toast.success("User deleted successfully");
		}
	};
	const handleMessage = () => {
		if (isBlocked) {
			return toast.error("Blocked user cannot send Message");
		}
		navigate(`/send-email?email=${user?.email}`);
	};

	return (
		<>
			<div className="p-3 mb-3 bg-white shadow rounded">
				<div className="flex flex-wrap items-center justify-center max-w-7xl mx-auto ">
					<div className="w-full lg:w-3/12 flex px-4 mb-3 lg:mb-0 justify-center lg:justify-start ">
						<img
							className="w-10 h-10 mr-3 object-cover rounded-full"
							src={user?.profilePhoto}
							alt="profile "
						/>
						<div>
							<p className="text-sm font-medium">
								{user?.firstName} {user?.lastName}
							</p>
							<p className="text-xs text-gray-500">{user?.email}</p>
						</div>
					</div>
					<div className="w-1/3 lg:w-2/12 px-4 mb-3 lg:mb-0 justify-center ">
						<p className="py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full">
							{user?.email === "nayeemuddin.bd100@gmail.com"
								? "Super Admin"
								: user?.email === "wordcrafters@admin.com"
								? "Demo Admin"
								: user?.email === "wordcrafters@user.com"
								? "Demo User"
								: user?.accountType}
						</p>
					</div>
					<div className="w-1/3 lg:w-1/12 px-4 mb-3 lg:mb-0 flex justify-end ">
						<p className="text-sm font-medium">
							<span className="text-base mr-2  text-bold text-yellow-500">
								{user?.followers?.length}
							</span>
							followers
						</p>
					</div>
					<div className=" w-full flex lg:justify-end lg:w-6/12 flex-wrap  px-4  mb-3 lg:mb-0 justify-center ">
						<div className="inline-block py-1 px-3 mr-2 mb-1 lg:mb-0 text-xs  rounded">
							{user?.posts?.length} Posts
						</div>
						<Link
							to={`/profile/${user?._id}`}
							className=" text-black inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-yellow-600 rounded hover:bg-gray-300 hover:text-black"
						>
							Profile
						</Link>

						{/* user blocked/unblocked */}
						{isBlocked ? (
							<button
								onClick={() => {
									dispatch(UnBlockUserAction(user?._id));
									toast.success("User Unblocked Successfully");
								}}
								className="inline-block px-2 text-center bg-gray-500 hover:bg-gray-700 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
							>
								Unblock
							</button>
						) : (
							<button
								onClick={() => {
									dispatch(blockUserAction(user?._id));
									toast.success("User Blocked Successfully");
								}}
								className="inline-block py-1 px-4 text-center bg-red-600 hover:bg-red-700 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
							>
								Block
							</button>
						)}

						<button
							type="button"
							onClick={handleMessage}
							className="inline-flex  justify-center items-center bg-indigo-900 px-2   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
						>
							<MailIcon
								className="-ml-1 mr-2 h-5 w-5 text-gray-200"
								aria-hidden="true"
							/>
							<span className="text-base mr-2  text-bold text-white ">
								Message
							</span>
						</button>
						<button
							type="button"
							onClick={() => handleDelete(user?._id)}
							className="inline-flex ml-2 justify-center items-center bg-red-600 px-2   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-white  hover:bg-red-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
						>
							<TrashIcon
								className="-ml-1 mr-2 h-5 w-5 text-gray-200"
								aria-hidden="true"
							/>
							<span className="text-base mr-2  text-bold">Delete</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UsersListItem;
