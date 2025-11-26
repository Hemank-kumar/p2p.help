import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-gradient-to-t from-black/100 to-black/0 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P2P</span>
              </div>
              <span className="text-2xl font-bold text-gradient">p2p.help</span>
            </div>
            <p className="text-white/70 max-w-sm">
              Empowering peer-to-peer learning through technology. Connect, learn, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <NavLink to="/" className="block text-white/70 hover:text-white transition-colors">
                Home
              </NavLink>
              <NavLink to="/learn" className="block text-white/70 hover:text-white transition-colors">
                Learn
              </NavLink>
              <NavLink to="/teach" className="block text-white/70 hover:text-white transition-colors">
                Teach
              </NavLink>
              <NavLink to="/contact" className="block text-white/70 hover:text-white transition-colors">
                Contact
              </NavLink>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2">
              <p className="text-white/70">
                <a href="mailto:p2p.help@p2p.help" className="hover:text-purple-400 transition-colors">
                  p2p.help@p2p.help
                </a>
              </p>
              <p className="text-white/70">Social platforms coming soon</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                Made with ❤️ by <span className="text-purple-400 font-semibold">Hemank Kumar</span>
              </p>
              <p className="text-white/60 text-sm">
                MCA, Department of Computer Applications
              </p>
              <p className="text-white/60 text-sm">
                KIET Group of Institutions, Ghaziabad, Uttar Pradesh, India
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/60 text-sm">
                © 2024 P2P.help. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}