import Providers from "@/components/Providers";
import useCities from "@/core/hooks/useCities";
import useSettings from "@/core/hooks/useSettings";
import { render, screen, act } from "@testing-library/react";
import { ClassAttributes, ImgHTMLAttributes } from "react";
import CityDetailPage from "src/app/city/[id]/page";
import { useParams } from "next/navigation";
import { waitFor } from "@testing-library/react";

// Mock the useCities hook
jest.mock("@/core/hooks/useCities", () => ({
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

// Mock useParams
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn((url) => {
  if (url.includes("openweathermap")) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          current: {
            dt: 1741921312,
            sunrise: 1741908790,
            sunset: 1741951990,
            temp: 30.88,
            feels_like: 30.9,
            pressure: 1013,
            humidity: 41,
            dew_point: 16.11,
            uvi: 5.94,
            clouds: 0,
            visibility: 10000,
            wind_speed: 0.94,
            wind_deg: 184,
            wind_gust: 1.26,
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
          },
          hourly: [
            {
              dt: 1741921200,
              temp: 30.88,
              feels_like: 30.9,
              pressure: 1013,
              humidity: 41,
              dew_point: 16.11,
              uvi: 5.94,
              clouds: 0,
              visibility: 10000,
              wind_speed: 0.94,
              wind_deg: 184,
              wind_gust: 1.26,
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
                },
              ],
              pop: 0,
            },
          ],
        }),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  });
}) as jest.Mock;

test("render city details", async () => {
  const mockCity = {
    id: 1,
    name: "New York",
    countryCode: "US",
  };

  (useParams as jest.Mock).mockReturnValue({ id: mockCity.id });

  (useCities as jest.Mock).mockReturnValue({
    cities: [mockCity],
    addCity: jest.fn(),
    removeCity: jest.fn(),
  });

  await act(async () => {
    render(
      <Providers>
        <CityDetailPage />
      </Providers>
    );
  });

  expect(screen.getByText("New York")).toBeInTheDocument();

  // const temperature = screen.getByText(/30°/i);
  // expect(temperature).toBeInTheDocument();
});
