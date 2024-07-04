"use client";
import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataUser";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PhotoIcon } from '@heroicons/react/24/solid'

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: string;
  teachersId: [string];
  studentsId: [string];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function page({ params }: { params: { name: string } }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData({ name: `${params?.name}`, setUser, setLoading });
  }, []);

  if (loading || status === "loading") {
    return <Loading />;
  }

  return (
    <main>
      {user && (
        <div className="text-white">
          <img src={user.image} className="rounded-full mx-auto block" alt="" />
          <p className="font-poppins-bold uppercase text-center pt-[20px] text-lg">
            {user.name}
          </p>
          <p className="font-poppins-bold uppercase text-center pb-[20px]">
            @{user.username}
          </p>
          <p className="font-poppins-bold uppercase text-center py-[10px] text-lg">
            {user.role}
          </p>

      <form className="m-12 p-8 bg-grey rounded-md">
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-2xl font-bold leading-7 text-white">User Profile</h2>
            <p className="mt-1 text-base leading-6 text-white">
              Update your account details here.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="block flex-1 border-none bg-black py-1.5 outline-none focus:ring-green text-white placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder={user.username}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-white">
                  Biography
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm placeholder:text-gray-500 focus:ring-green sm:text-sm sm:leading-6"
                    defaultValue={''}
                    placeholder="Example: “My name is John Doe, and I am proud to be a Parkway Early Childhood Panda! I am from St. Louis, received a Bachelors Degree in Education from the University of Dayton, and my Masters in Education from Missouri Baptist University."
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-300">Describe your role and any details you want to add here.</p>
              </div>

              {/* <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                  Foto Profil
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-50"
                  >
                    Ganti Foto
                  </button>
                </div>
              </div> */}

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                  Profile Picture
                </label>
                <label htmlFor="file-upload" className="mt-2 flex justify-center rounded-lg border border-dashed bg-black border-white/25 px-6 py-10">
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <p className="pl-1 text-center">Tap to upload a photo!</p>
                    <p className="text-xs leading-5 text-gray-600">Format: PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div> 
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-xl font-bold leading-7 text-white">Personal Details</h2>
            <p className="mt-1 text-base leading-6 text-white">Update your personal details here.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    placeholder={user.name}
                    className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus focus:ring-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={user.email}
                    className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus focus:ring-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-white">
                  Street Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    placeholder="Example: Cijambe Street, Cijambe, Ujungberung District"
                    className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus focus:ring-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    placeholder="Example: Bandung City"
                    className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus focus:ring-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    placeholder="Example: West Java"
                    className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus focus:ring-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                 Country
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="country"
                    id="country"
                    autoComplete="country"
                    placeholder="Example: Indonesia"
                    className="block w-full rounded-md border-0 py-1.5 bg-black text-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus focus:ring-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-white" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-green hover:text-white shadow-sm hover:bg-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            Save
          </button>
        </div>
      </form>

          <button
            className="btn-blue gap-[10px] !bg-red-500 justify-center mx-auto block"
            onClick={() => signOut()}
          >
            logout{" "}
            <img src="/svg/logout.svg" className="w-[20px] inline" alt="" />
          </button>
        </div>
      )}

      {user === null && (
        <div className="text-white text-center py-[150px] px-[20px]">
          <h1 className="text-[2rem] font-poppins-bold">
            user tidak ditemukan !
          </h1>
          <p>user dengan username {params.name} tidak ditemukan</p>
          <Link href={"/"} className="btn-blue mx-auto my-[50px]">
            Home
          </Link>
        </div>
      )}
    </main>
  );
}
