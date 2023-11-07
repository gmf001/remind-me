import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  return (
    <>
      <nav className="flex w-full items-center justify-between py-2 px-8 h-[60px] border-b dark:border-neutral-800">
        <Logo />

        <div className="flex gap-4 items-center">
          <UserButton afterSignOutUrl="/" />
          <ThemeSwitcher />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
