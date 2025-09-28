import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Features', href: '#' },
  { name: 'Company', href: '#' },
];

const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-300 overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img src="/vite.svg" alt="Symptom-iSense Logo" className="h-8 w-auto" />
              <span className="text-blue-600 font-bold text-xl">Symptom-iSense</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-blue-600"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-blue-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <img src="/vite.svg" alt="Symptom-iSense Logo" className="h-8 w-auto" />
                <span className="text-blue-600 font-bold text-xl">Symptom-iSense</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-blue-600"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-blue-100/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <img src="/vite.svg" alt="Health illustration" className="mx-auto mb-6 w-20 h-20 animate-bounce" />
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow">Symptom-iSense</h1>
          <p className="text-lg text-gray-700 mb-8">Your intelligent symptom checker</p>
          <ul className="mb-8 text-gray-600 space-y-2 text-base text-left max-w-sm mx-auto">
            <li className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Fast & accurate symptom analysis
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Private & secure
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Free to use
            </li>
          </ul>
          <div className="flex justify-center">
            <button className="rounded-md bg-blue-500 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-600 transition">
              Check Symptoms
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <a href="#" className="text-base font-semibold text-blue-700 hover:underline">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="mt-6 text-xs text-gray-400 text-center">
            Tip: Describe your symptoms in detail for best results.
          </div>
        </div>
      </main>
      <footer className="w-full text-gray-400 text-xs text-center py-2 absolute bottom-0 left-0 bg-transparent">
        &copy; 2025 Symptom-iSense. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
