"use client";

import { ModeToggle } from "./mode-toggle";
import Logo from "@/features/Logo";

export default function Nav() {
  return (
    <header className="w-full">
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <a className="" target="_blank" rel="noopener noreferrer">
              <Logo size={'sm'} />
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
