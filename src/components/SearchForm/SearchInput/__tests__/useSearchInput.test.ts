import { useSearchInput } from "../useSearchInput";
import { renderHook } from "@testing-library/react-hooks";
import { useSearchContext } from "../../shared/contexts/searchContext";

jest.mock("../../shared/contexts/searchContext");

const mockedUseSearchContext = jest.mocked(useSearchContext);

describe("useSearchInput", () => {
  beforeEach(() => {
    mockedUseSearchContext.mockReturnValue({
      data: {
        searchKeyword: "searchKeyword",
        currentLocation: null,
        isFormValid: true,
      },
      actions: {
        setSearchKeyword: jest.fn(),
        setCurrentLocation: jest.fn(),
      },
    });
  });

  it("should return expected results", () => {
    const { result } = renderHook(() => useSearchInput());
    expect(result.current).toEqual({
      actions: {
        handleChange: expect.any(Function),
      },
      data: { searchKeyword: "searchKeyword" },
    });
  });
});
