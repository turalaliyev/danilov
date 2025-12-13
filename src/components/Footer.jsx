export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-display text-2xl tracking-[0.22em] uppercase">
              Danilov
            </div>
            <p className="mt-3 text-sm text-black/60 max-w-md leading-relaxed">
              A modern shoe house inspired by timeless craftsmanship and clean
              design. Built for daily wear — finished like a statement piece.
            </p>
          </div>

          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-black/60">
              Customer care
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a className="hover:opacity-70" href="#">
                  Shipping
                </a>
              </li>
              <li>
                <a className="hover:opacity-70" href="#">
                  Returns
                </a>
              </li>
              <li>
                <a className="hover:opacity-70" href="#">
                  Size guide
                </a>
              </li>
              <li>
                <a className="hover:opacity-70" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-black/60">
              Follow
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a className="hover:opacity-70" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a className="hover:opacity-70" href="#">
                  TikTok
                </a>
              </li>
              <li>
                <a className="hover:opacity-70" href="#">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-black/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-black/60">
          <span>
            © {new Date().getFullYear()} Danilov. All rights reserved.
          </span>
          <span className="tracking-[0.25em] uppercase">
            Made with React + Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
