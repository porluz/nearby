jest.mock("../../../shared/contexts/placesContext/usePlacesContext");
import { renderHook } from "@testing-library/react-hooks";
import { usePlaces } from "../usePlaces";
import { usePlacesContext } from "../../../shared/contexts/placesContext/usePlacesContext";

const mockedUsePlacesContext = jest.mocked(usePlacesContext);

describe("usePlaces", () => {
  beforeEach(() => {
    mockedUsePlacesContext.mockReturnValue({
      data: {
        nearbyPlaces: [],
        showPlaces: false,
        refs: { listPlacesRef: { current: null } },
      },
      actions: {
        setNearbyPlaces: jest.fn(),
        setShowPlaces: jest.fn(),
      },
    });
  });

  it("should return data and actions", () => {
    const { result } = renderHook(() => usePlaces());
    expect(result.current.data).toEqual({
      listPlacesRef: { current: null },
      nearbyPlaces: [],
      showPlaces: false,
    });
    expect(result.current.actions).toEqual({});
  });
});
