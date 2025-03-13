import Providers from "@/components/Providers";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "src/app/page";
import SettingsPage from "src/app/settings/page";

jest.mock("./useCities", () => ({
  useCities: jest.fn(),
}));

test("renders list of cities with temperatures", () => {
  // Mock the return value of the useCities hook
  const mockCities = [
    { name: "New York", temperature: 15 },
    { name: "Los Angeles", temperature: 22 },
  ];

  // Mock the hook implementation
  useCities.mockReturnValue({
    cities: mockCities,
  });

  // Render the component
  render(
    <Providers>
      <HomePage />
    </Providers>
  );

  // Assertions to verify the list of cities is rendered correctly
  expect(screen.getByText("New York: 15°C")).toBeInTheDocument();
  expect(screen.getByText("Los Angeles: 22°C")).toBeInTheDocument();
});

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
