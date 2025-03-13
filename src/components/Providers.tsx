import { ReactNode } from "react";

import { SettingsProvider } from "@/core/contexts/settingsContext";
import { getSettingsFromLocalStorage } from "@/core/utils/helpers";

type Props = {
  children: ReactNode;
};

const Providers = (props: Props) => {
  const { children } = props;
  const settingsLocalStorage = getSettingsFromLocalStorage();

  return (
    <SettingsProvider settingsLocalStorage={settingsLocalStorage}>
      {children}
    </SettingsProvider>
  );
};

export default Providers;
