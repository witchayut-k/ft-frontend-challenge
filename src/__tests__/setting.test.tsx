import Providers from "@/components/Providers";
import { render, screen, fireEvent } from "@testing-library/react";
import SettingsPage from "src/app/settings/page";

test("changes temperature unit on selection", () => {
  const onUnitChange = jest.fn();

  render(
    <Providers>
      <SettingsPage onUnitChange={onUnitChange} />
    </Providers>
  );

  const select = screen.getByLabelText(/Temperature Unit/i);
  fireEvent.change(select, { target: { value: "standard" } });

  expect(onUnitChange).toHaveBeenCalledWith("standard");
});
