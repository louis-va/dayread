"use client";

import { ModeToggle } from "./mode-toggle";

export default function Nav() {
  return (
    <header className="w-full">
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <a className="" target="_blank" rel="noopener noreferrer">
              <h1 className="text-primary font-bold">D.</h1>
            </a>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
