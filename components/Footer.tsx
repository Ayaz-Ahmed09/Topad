// "use client";
// import Link from "next/link";
// import { useEffect, useRef } from "react";
// import {
//   // Facebook,
//   // Twitter,
//   // Linkedin,
//   // Instagram,
//   Crown,
//   Mail,
//   Phone,
//   MapPin,
//   Sparkles,
// } from "lucide-react";
// import Image from "next/image";

// export default function Footer() {
//   // useEffect(() => {
//   //   const canvas = document.getElementById("footer-lines") as HTMLCanvasElement;
//   //   const ctx = canvas.getContext("2d")!;
//   //   let width = (canvas.width = window.innerWidth);
//   //   let height = (canvas.height = canvas.offsetHeight);

//   //   const lines = Array.from({ length: 25 }, (_, i) => ({
//   //     y: (i / 25) * height,
//   //     amp: 30 + Math.random() * 50,
//   //     offset: Math.random() * 1000,
//   //   }));

//   //   const draw = (t: number) => {
//   //     ctx.clearRect(0, 0, width, height);
//   //     ctx.strokeStyle = "rgba(255,140,0,0.35)";
//   //     ctx.lineWidth = 1.5;

//   //     lines.forEach((line) => {
//   //       ctx.beginPath();
//   //       for (let x = 0; x <= width; x += 10) {
//   //         let y = line.y + Math.sin((x + t / 20 + line.offset) / 50) * line.amp;
//   //         ctx.lineTo(x, y);
//   //       }
//   //       ctx.stroke();
//   //     });

//   //     requestAnimationFrame(draw);
//   //   };

//   //   requestAnimationFrame(draw);

//   //   const resize = () => {
//   //     width = canvas.width = window.innerWidth;
//   //     height = canvas.height = canvas.offsetHeight;
//   //   };
//   //   window.addEventListener("resize", resize);

//   //   return () => window.removeEventListener("resize", resize);
//   // }, []);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = 300); // footer height

//     const lines: { x: number; y: number; angle: number; speed: number }[] = [];

//     for (let i = 0; i < 50; i++) {
//       lines.push({
//         x: Math.random() * width,
//         y: Math.random() * height,
//         angle: Math.random() * Math.PI * 2,
//         speed: 0.5 + Math.random() * 1.5,
//       });
//     }

//     /*************  ✨ Windsurf Command 🌟  *************/
//     function draw() {
//       if (!ctx) return; // Ensure the context is available

//       ctx.clearRect(0, 0, width, height);

//       // Background
//       ctx.fillStyle = "#111"; // dark background
//       ctx.fillRect(0, 0, width, height);

//       ctx.strokeStyle = "rgba(255,255,255,0.3)";
//       ctx.lineWidth = 1;

//       lines.forEach((line) => {
//         if (!line) return; // Ensure the line exists

//         ctx.beginPath();
//         ctx.moveTo(line.x, line.y);

//         // move line
//         line.x += Math.cos(line.angle) * line.speed;
//         line.y += Math.sin(line.angle) * line.speed;

//         // random curve effect
//         line.angle += (Math.random() - 0.5) * 0.1;

//         ctx.lineTo(line.x, line.y);
//         ctx.stroke();

//         // wrap around edges
//         if (line.x < 0) line.x = width;
//         if (line.x > width) line.x = 0;
//         if (line.y < 0) line.y = height;
//         if (line.y > height) line.y = 0;
//       });

//       requestAnimationFrame(draw);
//     }
//     /*******  91333a0e-c36f-4a8a-81a2-3189282bc325  *******/

//     draw();

//     // Resize listener
//     const resizeHandler = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = 300;
//     };
//     window.addEventListener("resize", resizeHandler);

//     return () => {
//       window.removeEventListener("resize", resizeHandler);
//     };
//   }, []);

//   return (
//     <footer className="relative footer-texture overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
//       {/* Elegant background pattern */}
//       <canvas
//         ref={canvasRef}
//         className="absolute top-0 left-0 w-full h-full pointer-events-none"
//       />
//       <div className="absolute inset-0 bg-elegant-texture opacity-10"></div>

//       {/* Floating elements */}
//       {/* <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-accent-400/10 rounded-full blur-xl animate-float"></div>
//         <div
//           className="absolute bottom-20 right-20 w-40 h-40 bg-rose-400/10 rounded-full blur-xl animate-float"
//           style={{ animationDelay: "2s" }}
//         ></div>
//       </div> */}

//       <div className="container-custom py-20 relative z-10">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* Company Info */}
//           <div className="lg:col-span-2">
//             <Link href="/" className="flex items-center space-x-3 mb-8 group">
//               <div className="relative">
//                 <div className="bg-gradient-to-br from-gray-500 to-black/20 p-3 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
//                   <Image
//                     src="/logo.png"
//                     alt="Logo"
//                     width={50}
//                     height={55}
//                     // className="w-10 h-10"
//                   />
//                 </div>
//                 {/* <div className="absolute -top-1 -right-1">
//                   <Sparkles
//                     className="text-accent-300 animate-pulse"
//                     size={16}
//                   /> */}
//                 {/* </div> */}
//               </div>
//               <div>
//                 <span className="text-2xl font-display font-bold text-gradient">
//                   Top AD
//                 </span>
//                 <div className="text-sm text-primary-300 font-medium">
//                   Premium Agency
//                 </div>
//               </div>
//             </Link>

//             {/* <p className="text-primary-200 mb-8 max-w-md leading-relaxed text-lg">
//               Elite digital marketing agency delivering exceptional ROI through
//               masterful Google Ads management, luxury web development, and
//               premium conversion optimization strategies.
//             </p> */}

//             {/* Contact Info */}
//             <div className="space-y-4 mb-8">
//               <div className="flex items-center space-x-4">
//                 <div className="bg-black p-2 rounded-xl">
//                   <Mail className="text-orange-500" size={18} />
//                 </div>
//                 <span className="text-primary-200">teams@topad.site</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-black p-2 rounded-xl">
//                   <Phone className="text-orange-500" size={18} />
//                 </div>
//                 <span className="text-primary-200">+923096194974</span>
//                 <span className="text-primary-200">+923328787123</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-black p-2 rounded-xl">
//                   <MapPin className="text-orange-500" size={18} />
//                 </div>
//                 <span className="text-primary-200">Global Premium Service</span>
//               </div>
//             </div>

//             {/* Social Links */}
//             {/* <div className="flex space-x-4">
//               {[
//                 {
//                   icon: Facebook,
//                   href: "https://facebook.com",
//                   color: "hover:bg-blue-500",
//                 },

//                 {
//                   icon: Instagram,
//                   href: "https://instagram.com",
//                   color: "hover:bg-pink-500",
//                 },
//               ].map(({ icon: Icon, href, color }, index) => (
//                 <a
//                   key={index}
//                   href={href}
//                   className={`bg-primary-700/50 p-3 rounded-xl ${color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
//                 >
//                   <Icon size={20} />
//                 </a>
//               ))}
//             </div> */}
//           </div>

//           {/* Premium Services */}
//           {/* <div>
//             <h4 className="text-xl font-display font-bold mb-8 text-white flex items-center">
//               <Crown className="mr-2 text-orange-500" size={20} />
//               Premium Services
//             </h4>
//             <ul className="space-y-4">
//               {[
//                 {
//                   name: "Google Ads Mastery",
//                   href: "https://wa.me/923096194974?text=Hi! I'm interested in Google Ads Mastery",
//                 },
//                 {
//                   name: "Luxury Web Development",
//                   href: "https://wa.me/923096194974?text=Hi! I need luxury web development",
//                 },
//                 {
//                   name: "Premium Shopify Stores",
//                   href: "https://wa.me/923096194974?text=Hi! I want a premium Shopify store",
//                 },
//                 {
//                   name: "Elite Landing Pages",
//                   href: "https://wa.me/923096194974?text=Hi! I need elite landing pages",
//                 },
//                 {
//                   name: "Strategic Funnels",
//                   href: "https://wa.me/923096194974?text=Hi! I want strategic funnel design",
//                 },
//               ].map((service, index) => (
//                 <li key={index}>
//                   <Link
//                     href={service.href}
//                     target="_blank"
//                     className="text-primary-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
//                   >
//                     <Sparkles
//                       className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                       size={14}
//                     />
//                     {service.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//           {/* Company Links */}
//           <div>
//             <h4 className="text-xl font-display font-bold mb-8 text-white">
//               Company
//             </h4>
//             <ul className="space-y-4">
//               {[
//                 { name: "About Us", href: "/about" },
//                 { name: "Blog", href: "/blog" },
//                 { name: "Contact", href: "/contact" },
//                 { name: "Privacy Policy", href: "/privacy-policy" },
//                 { name: "Terms of Service", href: "/terms" },
//               ].map((link, index) => (
//                 <li key={index}>
//                   <Link
//                     href={link.href}
//                     className="text-primary-300 hover:text-orange-500 transition-colors duration-300"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-orange-500 mt-16 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-primary-400 text-sm">
//               © {new Date().getFullYear()} Top AD. All rights reserved. Premium
//               Digital Marketing Agency.
//             </p>
//             <div className="flex items-center space-x-8 mt-4 md:mt-0">
//               <span className="text-primary-400 text-sm">
//                 Certified Partners
//               </span>
//               <div className="flex items-center space-x-6 text-xs text-primary-500">
//                 <span className="bg-primary-700/50 px-3 py-1 rounded-full">
//                   Google Premier
//                 </span>
//                 <span className="bg-primary-700/50 px-3 py-1 rounded-full">
//                   Meta Business
//                 </span>
//                 <span className="bg-primary-700/50 px-3 py-1 rounded-full">
//                   Shopify Plus
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Crown, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

// WhatsApp Icon Component for clarity
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="ml-2 transition-transform group-hover:translate-x-1"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886.004 2.021.666 3.965 1.915 5.471l-1.267 4.625 4.75-1.249zM9.354 8.752c-.196-.297-.42-.315-.61-.322-.195-.008-.41-.004-.616-.004-.204 0-.533.07-.817.373-.283.302-.936.913-.936 2.219s.959 2.576 1.095 2.748c.136.171 1.867 2.956 4.597 4.05.61.25.978.4.13.644.152.243.94.883 1.082 1.036.14.152.184.22.12.37.064.151.043.463-.04.577-.085.112-.304.151-.429.151-.125.001-.271-.023-.42-.06-.149-.036-1.017-.487-1.948-1.162-.93-.675-1.54-1.511-1.763-1.785-.224-.273-.45-.434-.616-.434-.165 0-.33.061-.475.211z" />
  </svg>
);

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = footerRef.current;
    if (!canvas || !footer) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width: number;
    let height: number;
    const lines: { x: number; y: number; angle: number; speed: number }[] = [];

    const setup = () => {
      width = canvas.width = footer.offsetWidth;
      height = canvas.height = footer.offsetHeight;
      lines.length = 0;
      const lineCount = Math.floor((width * height) / 10000);
      for (let i = 0; i < lineCount; i++) {
        lines.push({
          x: Math.random() * width,
          y: Math.random() * height,
          angle: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.5,
        });
      }
    };

    const draw = () => {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      lines.forEach((line) => {
        if (!line) {
          return;
        }
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;
        line.angle += (Math.random() - 0.5) * 0.1;
        ctx.lineTo(line.x, line.y);
        ctx.stroke();
        if (line.x < 0) line.x = width;
        if (line.x > width) line.x = 0;
        if (line.y < 0) line.y = height;
        if (line.y > height) line.y = 0;
      });
      requestAnimationFrame(draw);
    };

    setup();
    draw();

    const resizeHandler = () => setup();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative footer-texture overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50"
      />

      <div className="container-custom py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-500 to-black/20 p-3 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Image src="/logo.png" alt="Logo" width={50} height={55} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-display font-bold text-gradient">
                  Top AD
                </span>
                <div className="text-sm text-primary-300 font-medium">
                  Premium Agency
                </div>
              </div>
            </Link>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-black p-2 rounded-xl">
                  <Mail className="text-orange-500" size={18} />
                </div>
                <span className="text-primary-200">teams@topad.site</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-black p-2 rounded-xl">
                  <Phone className="text-orange-500" size={18} />
                </div>
                <span className="text-primary-200">+923096194974</span>
                <span className="text-primary-200">+923328787123</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-black p-2 rounded-xl">
                  <MapPin className="text-orange-500" size={18} />
                </div>
                <span className="text-primary-200">Global Premium Service</span>
              </div>
            </div>
          </div>

          {/* UPDATED: Call to Action instead of Services List */}
          <div>
            <h4 className="text-xl font-display font-bold mb-8 text-white flex items-center">
              <Crown className="mr-2 text-orange-500" size={20} />
              Ready to Grow?
            </h4>
            <p className="text-primary-300 mb-6 leading-relaxed">
              Let's discuss how our premium services can elevate your brand.
              Contact us for a personalized strategy.
            </p>
            <Link
              href="https://wa.me/923096194974?text=Hi! I'm interested in your premium services."
              target="_blank"
              className="inline-flex items-center font-bold text-orange-500 hover:text-orange-400 transition-colors duration-300 group"
            >
              Start a Conversation
              <WhatsAppIcon />
            </Link>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xl font-display font-bold mb-8 text-white">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-orange-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-500 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-center place-items-center items-center">
            <p className="text-primary-400 text-sm">
              © {new Date().getFullYear()} Top AD. All rights reserved. Premium
              Digital Marketing Agency.
            </p>
            {/* <div className="flex items-center space-x-8 mt-4 md:mt-0">
              <span className="text-primary-400 text-sm">
                Certified Partners
              </span>
              <div className="flex items-center space-x-6 text-xs text-primary-500">
                <span className="bg-primary-700/50 px-3 py-1 rounded-full">
                  Google Premier
                </span>
                <span className="bg-primary-700/50 px-3 py-1 rounded-full">
                  Meta Business
                </span>
                <span className="bg-primary-700/50 px-3 py-1 rounded-full">
                  Shopify Plus
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
