// export default function BlogSkeleton() {
//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {[...Array(6)].map((_, index) => (
//         <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
//           <div className="h-48 bg-gray-200"></div>
//           <div className="p-6">
//             <div className="h-4 bg-gray-200 rounded mb-2"></div>
//             <div className="h-6 bg-gray-200 rounded mb-3"></div>
//             <div className="h-4 bg-gray-200 rounded mb-4"></div>
//             <div className="flex space-x-2 mb-4">
//               <div className="h-6 w-16 bg-gray-200 rounded"></div>
//               <div className="h-6 w-20 bg-gray-200 rounded"></div>
//             </div>
//             <div className="h-4 w-24 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
export default function BlogSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col"
        >
          {/* Image placeholder with fixed aspect ratio */}
          <div className="relative w-full aspect-[16/9] bg-gray-200"></div>

          {/* Content placeholders */}
          <div className="p-5 flex flex-col flex-1">
            <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>

            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>

            <div className="h-4 w-24 bg-gray-200 rounded mt-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
