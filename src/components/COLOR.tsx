import { useEffect, useState } from "react";

import styles from "../css/Wobbly.module.css";

export default function COLOR() {
  const color: Record<number, string[]> = {
    0: ["#b92b27", "#c31432", "#FF416C", "#ff3131", "#FF4B2B", "#dd3e54", "#ED213A"],
    1: ["#8360c3", "#2ebf91", "#6be585", "#FDC830", "#d43799"],
    2: ["#009FFF", "#0083B0", "#00B4DB", "#363dbd"]
  };

  const [isOfficiallyActive, setActive] = useState<boolean>(false);

  const shine = Array.from(Array(3).keys());

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
            <span key={index} style={{background: color[numb][Math.floor(Math.random() * color[numb].length)]}} data-feelsgood={numb} className={styles.burner}></span>
          );
        })
      }
    </div>
  );
};