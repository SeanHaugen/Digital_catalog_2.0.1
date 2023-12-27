import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

// `https://dull-pink-termite-slip.cyclic.app`;

export const useCategoryData = (setState) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://dull-pink-termite-slip.cyclic.app/category";
        const response = await axios.get(apiUrl);
        setState(response.data);
      } catch (error) {
        console.error("Error fetching API data!!:", error);
      }
    };

    fetchData();
  }, [setState]);
};

export const useFetchSubCategoryData = (setState) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://dull-pink-termite-slip.cyclic.app/SubCategory";
        const response = await axios.get(apiUrl);
        setState(response.data);
      } catch (error) {
        console.error("Error fetching API data!!:", error);
      }
    };

    fetchData();
  }, [setState]);
};

export const useFetchSubCategoryItemData = (setState, subCat) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (subCat) {
          const endpoint = `${subCat}`;
          const apiUrl = `https://dull-pink-termite-slip.cyclic.app/SubCategory/${endpoint}`;

          const response = await axios.get(apiUrl);
          setState(response.data);
        } else {
          setState([]);
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };
    fetchData();
  }, [subCat, setState]);
};

export const useFetchCategoryData = (setState, category) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category) {
          const endpoint = `${category}`;
          const apiUrl = `https://dull-pink-termite-slip.cyclic.app/category/${endpoint}`;

          const response = await axios.get(apiUrl);
          setState(response.data);
        } else {
          setState([]);
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };
    fetchData();
  }, [category, setState]);
};

export const useFetchRecentItemData = (setState, item) => {
  const { addRecentlyViewedItem } = useRecentlyViewed();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/items?item=${item}`
        );
        const itemData = response.data;
        setState(itemData);
        addRecentlyViewedItem(itemData); // Add the item to recently viewed list
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [item, setState, addRecentlyViewedItem]);
};

export const useFetchItemData = (setState, item) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/items?item=${item}`
        );
        const itemData = response.data;
        setState(itemData);
        dispatch({
          type: "ADD_RECENTLY_VIEWED_ITEM",
          payload: itemData,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [item, setState, dispatch]);
};

export const useSearchData = (setState, search) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/search?q=${search}`
        );
        setState(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [search, setState]);
};

export const usePricingData = (setState, item) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/pricing/item_number/${item}`
        );
        let itemPricing = response.data;
        setState(itemPricing);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [item, setState]);
};

export const useInternalInfo = (setState, item) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/info?item=${item}`
        );
        let itemPricing = response.data;
        setState(itemPricing);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [item, setState]);
};

export const useFlatRateInfo = (setState, item) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/flatRates/${item}`
        );
        let rates = response.data;
        setState(rates);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [item, setState]);
};

export const useHandleUpdatePricing = (setState, item, row, cell, value) => {
  useEffect(() => {
    async function updatePricing(rowIndex, cellIndex, newValue) {
      try {
        const url = `https://dull-pink-termite-slip.cyclic.app/update/pricing/${item}`;

        const data = {
          rowIndex,
          cellIndex,
          newValue,
        };

        const response = await axios.put(url, data);

        const responseData = response.data;
        setState(responseData);
      } catch (error) {
        console.error(error);
      }
    }
    updatePricing(row, cell, value);
  }, [item, setState]);
};

export const useHandleEurofitInfo = (setState, item) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/eurofits?item=${item}`
        );
        let info = response.data;
        setState(info);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [item, setState]);
};

export const useHandleMediaInfo = (setState, materials) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/mediaspecs?item=${materials}`
        );
        let info = response.data;
        setState(info);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [materials, setState]);
};

export const useDeleteItem = (item, onDeleteSuccess, onDeleteError) => {
  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `https://dull-pink-termite-slip.cyclic.app/delete/${item}`
      );

      // Check the status code to ensure the deletion was successful
      if (response.status === 200) {
        onDeleteSuccess();
      } else {
        onDeleteError("Delete request failed");
      }
    } catch (error) {
      console.error(error);
      onDeleteError("An error occurred while deleting");
    }
  };

  return deleteItem;
};

export const fetchLowStockValue = async (itemNumber) => {
  try {
    const response = await axios.get(
      `https://dull-pink-termite-slip.cyclic.app/get-lowStock/${itemNumber}`
    );

    if (response.status === 200) {
      return response.data.Low_Stock || false; // Set a default value if null
    } else {
      console.error(
        `Failed to fetch Low_Stock value. Status code: ${response.status}`
      );
      return false; // Set a default value if there is an error
    }
  } catch (error) {
    console.error(error);
    return false; // Set a default value if there is an error
  }
};

export const fetchOOSValue = async (itemNumber) => {
  try {
    const response = await axios.get(
      `https://dull-pink-termite-slip.cyclic.app/get-oos/${itemNumber}`
    );

    if (response.status === 200) {
      return response.data.OOS || false; // Set a default value if null
    } else {
      console.error(
        `Failed to fetch Low_Stock value. Status code: ${response.status}`
      );
      return false; // Set a default value if there is an error
    }
  } catch (error) {
    console.error(error);
    return false; // Set a default value if there is an error
  }
};
