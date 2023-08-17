import { useEffect, useState, useRef } from "react";

import styles from "../css/components/COLOR.module.css";

export default function COLOR() {
  const color: Record<number, string[]> = {
    0: ["#b92b27", "#c31432", "#FF416C", "#ff3131", "#FF4B2B", "#dd3e54", "#ED213A"],
    1: ["#8360c3", "#2ebf91", "#6be585", "#FDC830", "#d43799"],
    2: ["#009FFF", "#0083B0", "#00B4DB", "#363dbd"]
  };

  const [isOfficiallyActive, setActive] = useState<boolean>(false);

  const permanentColors = useRef<string[]>([]);

  const shine = Array.from(Array(3).keys());
  shine.map((_, index) => permanentColors.current.push(color[index][Math.floor(Math.random() * color[index].length)]));

  useEffect(() => {
    const welcomingTimeout = setTimeout(() => setActive(true), 1250);

    return () => {
      clearTimeout(welcomingTimeout);
    };
  }, []);

  return (
    <div className={`${styles.inside} ${isOfficiallyActive ? styles.aktif : ""}`}>
      {
        shine.map((numb, index) => {
          return (
            <span key={index} style={{background: permanentColors[numb]}} data-feelsgood={numb} className={styles.burner}></span>
          );
        })
      }
    </div>
  );
};