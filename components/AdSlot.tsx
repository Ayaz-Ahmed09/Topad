interface AdSlotProps {
  slotId: string;
  format: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

export default function AdSlot({
  slotId,
  format,
  className = "",
}: AdSlotProps) {
  const getAdDimensions = () => {
    switch (format) {
      case "horizontal":
        return { width: 728, height: 90 };
      case "rectangle":
        return { width: 300, height: 250 };
      case "vertical":
        return { width: 160, height: 600 };
      default:
        return { width: 300, height: 250 };
    }
  };

  const { width, height } = getAdDimensions();

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500"
        style={{ width, height }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width, height }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
      </div>
    </div>
  );
}
