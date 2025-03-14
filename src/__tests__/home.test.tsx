import Providers from "@/components/Providers";
import useCities from "@/core/hooks/useCities";
import useSettings from "@/core/hooks/useSettings";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { JSX, ClassAttributes, ImgHTMLAttributes } from "react";
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

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => {
    return <img {...props} />;
  },
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
      countryCode: "US",
    },
    {
      id: 2,
      name: "Los Angeles",
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

  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("Los Angeles")).toBeInTheDocument();
});

test("removes a city from the list", async () => {
  const removeCityMock = jest.fn();

  // Mock the return value of the useCities hook
  const mockCities = [
    {
      id: 1,
      name: "New York",
      countryCode: "US",
    },
  ];

  (useCities as jest.Mock).mockReturnValue({
    cities: mockCities,
    addCity: jest.fn(),
    removeCity: removeCityMock,
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

  expect(screen.getByText("New York")).toBeInTheDocument();

  // Click the remove button
  fireEvent.click(screen.getByTestId("popover-button"));
  await fireEvent.click(await screen.findByText(/Remove/i));
  expect(removeCityMock).toHaveBeenCalledWith(1);
});
