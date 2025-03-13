import { render, screen } from "@testing-library/react";

// Mock localStorage
beforeEach(() => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn().mockReturnValue(
    JSON.stringify([
      { id: 1, name: "New York", temperature: 15 },
      { id: 2, name: "Los Angeles", temperature: 22 },
    ])
  );

  global.localStorage = {
    getItem: getItemMock,
    setItem: setItemMock,
  };
});

// Mock the useCities hook
jest.mock("./useCities", () => ({
  useCities: jest.fn(),
}));

test("renders list of cities with temperatures", () => {
  // Mock the return value of the useCities hook
  const mockCities = [
    { id: 1, name: "New York", temperature: 15 },
    { id: 2, name: "Los Angeles", temperature: 22 },
  ];

  // Set up the mock return value for useCities
  useCities.mockReturnValue({
    cities: mockCities,
    addCity: jest.fn(),
    removeCity: jest.fn(),
  });

  // Render the component
  render(<CityList />);

  // Assertions to verify the list of cities is rendered correctly
  expect(screen.getByText("New York: 15°C")).toBeInTheDocument();
  expect(screen.getByText("Los Angeles: 22°C")).toBeInTheDocument();
});

test("adds a new city to the list", () => {
  const mockCities = [
    { id: 1, name: "New York", temperature: 15 },
    { id: 2, name: "Los Angeles", temperature: 22 },
  ];

  useCities.mockReturnValue({
    cities: mockCities,
    addCity: jest.fn(),
    removeCity: jest.fn(),
  });

  render(<CityList />);

  // Add a new city (simulate user interaction, e.g., using a button to add)
  const addButton = screen.getByText("Add City"); // Assuming there is a button to add a city
  fireEvent.click(addButton);

  // Make sure the new city is rendered (you can simulate adding a city and update your mock)
  expect(screen.getByText("Chicago: 18°C")).toBeInTheDocument(); // Simulate new city being added
});
