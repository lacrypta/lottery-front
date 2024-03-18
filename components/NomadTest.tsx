import { useEffect } from "react";
import { useNomad } from "../hooks/useNomad";

export const NomadTest = () => {
  const { chucho } = useNomad<{ pipo: string; chucho: Function }>(
    "f2d3534f40feff7a08681227af38be5d6c3351f56697e586a8fc00c1577d59bd"
  );

  useEffect(() => {
    if (!chucho) {
      return;
    }

    chucho();
  }, [chucho]);

  return <div>hola</div>;
};
