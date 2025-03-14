import Providers from "@/components/Providers";
import { render, screen, fireEvent } from "@testing-library/react";
import SettingsPage from "src/app/settings/page";
import useSettings from "@/core/hooks/useSettings";

// Mock the useSettings hook
jest.mock("@/core/hooks/useSettings", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("changes temperature unit on selection", () => {
  const updateSettingsMock = jest.fn();

  (useSettings as jest.Mock).mockReturnValue({
    settings: { temperatureUnit: "metric" },
    updateSettings: updateSettingsMock,
  });

  render(
    <Providers>
      <SettingsPage />
    </Providers>
  );

  const select = screen.getByLabelText(/Temperature Unit/i);
  fireEvent.change(select, { target: { value: "standard" } });

  expect(updateSettingsMock).toHaveBeenCalledWith(
    { temperatureUnit: "standard" },
    { updateLocalStorage: true }
  );
});
