import React from 'react'

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com" className="hover:underline" target="_blank">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
          <li>
            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">About</a>
          </li>
          <li>
            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy
              Policy</a>
          </li>
          <li>
            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licensing</a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Contact</a>
          </li>
        </ul>
      </footer>
  </div>
  )
}

export default Footer
