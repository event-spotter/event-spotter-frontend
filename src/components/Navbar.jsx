import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import profileIcon from "../assets/profile-icon.png";


const API_URL = import.meta.env.VITE_API_URL;


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { isLoggedIn, isLoading, logOutUser, user } = useContext(AuthContext);
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/home" },
    { name: "Timeline", href: "/timeline" },
  ]);
 

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        let privateNavigation = [
          { name: "Home", href: "/home" },
          { name: "Timeline", href: "/timeline" },
          { name: "Logout", href: "/#" },
        ];

        setNavigation(privateNavigation);
         
      } else {
        let anonNavigation = [
          { name: "Home", href: "/dashboard" },
          { name: "Timeline", href: "/timeline" },
          { name: "Sign Up", href: "/auth/signup" },
          { name: "Login", href: "/auth/login" },
        ];
        setNavigation(anonNavigation);
      }
    }
  }, [isLoggedIn, isLoading]);
  
  

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="fixed top-0 w-full z-50 bg-[rgb(38,71,94)]">
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between  ">
            <div className="container-fluid">
        <NavLink to="/" 
        className="flex font-bold text-2xl font-serif text-yellow-500 hover:text-yellow-400  " href="#">
          Event Spotter
        </NavLink>
        </div>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end ">
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <NavLink
                        to={item.href}
                        key={item.name}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-yellow-500 text-sky-800"
                            : "text-yellow-500 hover:bg-yellow-400 hover:text-sky-700",
                          "rounded-md px-5 py-2 text-sm font-extrabold  font-sans "
                        )}
                        onClick={item.name === 'Logout'? logOutUser : undefined}
                        aria-current={
                          location.pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0  ">
                {/* Profile dropdown */}
                {isLoggedIn  ? (
                <Menu as="div" className="relative ml-3  ">

                   <div>
                    <Menu.Button className="relative flex rounded-full bg-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.image ? user.image : profileIcon}
                        alt=""
                      />
                    </Menu.Button>
                  </div>  
 

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                          to="profile"
                          key="profile"
                            className={classNames(
                              active ? "bg-slate-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="myFavoritesPage"
                            key="profile-favorites"
                         
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Favorites
                            </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                           
                          <NavLink
                            to="dashboard"
                            key="profile-logout"
                            onClick={logOutUser}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> ) : ''
                }

              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white "
                      : "text-gray-300 hover:bg-gray-0 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </div>
  );
}
