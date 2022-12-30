import { useEffect, useState } from "react";

interface Props {
  width?: number;
  height?: number;
  src: string;
  alt: string;
  className?: string;
}
const ImageAssets = (props: Props) => {
  const [mainUrl, setMainUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname: string = window.location.origin;
      setMainUrl(hostname);
    }
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${mainUrl}/${props.src}`}
      className={props.className}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
};
export default ImageAssets;
