import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

// interface ServiceCardProps {
//   icon: LucideIcon;
//   title: string;
//   description: string;
//   features: string[];
//   link: string;
//   gradient: string;
// }

// export default function ServiceCard({
//   icon: Icon,
//   title,
//   description,
//   features,
//   link,
//   gradient,
// }: ServiceCardProps) {
//   return (
//     <div className="group schema-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
//       {/* Card Header with Gradient */}
//       <div
//         className={`bg-gradient-to-br ${gradient} p-8 relative overflow-hidden`}
//       >
//         <div className="absolute top-0 right-0 opacity-20">
//           <Sparkles size={80} />
//         </div>
//         <div className="relative z-10">
//           <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300">
//             <Icon size={48} />
//           </div>
//           <h3 className="text-2xl font-display font-bold text-white mb-4">
//             {title}
//           </h3>
//           <p className="text-white/90 leading-relaxed">{description}</p>
//         </div>
//       </div>

//       {/* Features List */}
//       <div className="p-8">
//         <ul className="space-y-4 mb-8">
//           {features.map((feature, index) => (
//             <li key={index} className="flex items-center text-primary-700">
//               <div className="bg-emerald-100 rounded-full p-1 mr-4">
//                 <Check className="text-emerald-600" size={16} />
//               </div>
//               <span className="font-medium">{feature}</span>
//             </li>
//           ))}
//         </ul>

//         {/* CTA Button */}
//         <Link
//           href={link}
//           target="_blank"
//           className="group/btn w-full bg-gradient-to-r from-primary-800 to-primary-900 text-white px-6 py-4 rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all font-semibold flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
//         >
//           <span>Start Premium Project</span>
//           <ArrowRight
//             className="ml-2 group-hover/btn:translate-x-1 transition-transform"
//             size={18}
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }
interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  link: string;
  pattern: string; // changed from gradient
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  link,
  pattern,
}: ServiceCardProps) {
  return (
    <div className="group schema-card rounded-3xl place-content-center place-items-center overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:ring-2 hover:ring-orange-400">
      {/* Card Header with Pattern */}
      <div className={`${pattern} p-8 relative overflow-hidden text-white`}>
        <div className="absolute top-0 right-0 opacity-20 group-hover:opacity-80 transition-opacity duration-500">
          <Icon size={50} className="text-black" />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-display text-warm font-bold mb-4">
            {title}
          </h3>
          <p className="text-black/80 leading-relaxed ">{description}</p>
        </div>
      </div>

      {/* Features */}
      <div className="p-8">
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-black/50">
              <div className="bg-black rounded-full p-1 mr-4">
                <Check className="text-orange-600 text-xl" size={16} />
              </div>
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <Link
          href={link}
          target="_blank"
          className="group/btn w-full bg-gradient-to-r from-orange-500 to-black-600 text-white px-6 py-4 rounded-2xl hover:bg-schema-card hover:text-warm transition-all font-semibold flex items-center justify-center shadow-xl hover:animate-glow "
        >
          <span>Start Premium Project</span>
          <ArrowRight
            className="ml-2 group-hover/btn:translate-x-1 transition-transform"
            size={18}
          />
        </Link>
      </div>
    </div>
  );
}
