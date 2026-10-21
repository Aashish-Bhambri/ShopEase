
import { Link, NavLink } from "react-router-dom";
import { Search, UserRound, ShoppingCart } from "lucide-react";

const Navbar = ({searchText,setSearchText}) => {
  const cartCount = 2;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];
  return (
    <header className="bg-white flex flex-col">
      <nav className="container flex min-h-[80px] items-center justify-between gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-2xl font-extrabold tracking-tight text-foreground"
        >
          ShopEase
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-muted ${
                  isActive ? "text-foreground" : "text-muted"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Search bar */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const query = new FormData(event.currentTarget).get("search");
            if (query?.toString().trim()) {
              window.location.href =
                `/shop?search=${encodeURIComponent(query.toString().trim())}`;
            }
          }}
          className="hidden h-12 max-w-[360px] flex-1 items-center gap-3 rounded-xl border border-border bg-surface-secondary px-4 md:flex"
        >
          <Search size={20} className="shrink-0 text-muted" />
          <input
            value={searchText}
            type="search"
            name="search"
            placeholder="Search for products..."
            aria-label="Search for products"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            onChange={(e)=>setSearchText(e.target.value)}
          />
        </form>

        {/* User and cart */}
        <div className="flex shrink-0 items-center gap-5">
          <Link
            to="/account"
            aria-label="My account"
            className="text-foreground transition-colors hover:text-muted"
          >
            <UserRound size={26} strokeWidth={1.8} />
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative text-foreground transition-colors hover:text-muted"
          >
            <ShoppingCart size={27} strokeWidth={1.8} />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </Link>
        </div>
        
      </nav>
            <span className='border border-gray-200 w-full '></span>
      
    </header>
  );
};

export default Navbar;
