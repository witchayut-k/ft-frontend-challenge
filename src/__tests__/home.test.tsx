import Providers from "@/components/Providers";
import useCities from "@/core/hooks/useCities";
import useSettings from "@/core/hooks/useSettings";
import { render, screen, act } from "@testing-library/react";
import HomePage from "src/app/page";

// Mock the useCities hook
jest.mock("@/core/hooks/useCities", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the useSettings hook
jest.mock("@/core/hooks/useSettings", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn((url) => {
  if (url.includes("openweathermap")) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          weather: [{ icon: "01d" }],
          main: { temp: 20 },
        }),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  });
}) as jest.Mock;

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

test("renders list of cities with temperatures", async () => {
  // Mock the return value of the useCities hook
  const mockCities = [
    {
      id: 1,
      name: "New York",
      latitude: 40.7128,
      longitude: -74.006,
      countryCode: "US",
    },
    {
      id: 2,
      name: "Los Angeles",
      latitude: 34.0522,
      longitude: -118.2437,
      countryCode: "US",
    },
  ];

  (useCities as jest.Mock).mockReturnValue({
    cities: mockCities,
    addCity: jest.fn(),
    removeCity: jest.fn(),
  });

  (useSettings as jest.Mock).mockReturnValue({
    settings: { temperatureUnit: "metric" },
    updateSettings: jest.fn(),
  });

  // Render the component
  await act(async () => {
    render(
      <Providers>
        <HomePage />
      </Providers>
    );
  });

  // Assertions to verify the list of cities is rendered correctly
  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  expect(screen.getByText("20")).toBeInTheDocument();
});
