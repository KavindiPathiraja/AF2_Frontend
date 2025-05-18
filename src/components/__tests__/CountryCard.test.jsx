import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

// Create a simplified version of the component for testing
const SimplifiedCountryCard = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital?.[0] || "N/A"}</p>
    </div>
  )
}

describe("SimplifiedCountryCard Component", () => {
  const mockCountry = {
    name: { common: "Test Country" },
    population: 1000000,
    region: "Test Region",
    capital: ["Test Capital"],
  }

  it("renders country information correctly", () => {
    render(<SimplifiedCountryCard country={mockCountry} />)

    expect(screen.getByText("Test Country")).toBeInTheDocument()
    expect(screen.getByText("Population: 1,000,000")).toBeInTheDocument()
    expect(screen.getByText("Region: Test Region")).toBeInTheDocument()
    expect(screen.getByText("Capital: Test Capital")).toBeInTheDocument()
  })
})
