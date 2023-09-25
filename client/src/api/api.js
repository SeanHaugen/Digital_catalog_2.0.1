import { useEffect } from "react";
import axios from "axios";

export const useCategoryData = (setState) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://ivory-firefly-hem.cyclic.app/category";
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
        const apiUrl = "http://ivory-firefly-hem.cyclic.app/SubCategory";
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
          const apiUrl = `http://ivory-firefly-hem.cyclic.app/SubCategory/${endpoint}`;

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
          const apiUrl = `http://ivory-firefly-hem.cyclic.app/category/${endpoint}`;

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

export const useFetchItemData = (setState, item) => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://ivory-firefly-hem.cyclic.app/items?item=${item}`
        );
        const itemData = response.data;
        setState(itemData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [item, setState]);
};

export const useSearchData = (setState, search) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://ivory-firefly-hem.cyclic.app/search?q=${search}`
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
          `http://ivory-firefly-hem.cyclic.app/pricing/item_number/${item}`
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
          `http://ivory-firefly-hem.cyclic.app/info?item=${item}`
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
          `http://ivory-firefly-hem.cyclic.app/flatRates/${item}`
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
        const url = `http://ivory-firefly-hem.cyclic/update/pricing/${item}`;

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
          `https://ivory-firefly-hem.cyclic.app/eurofits?item=${item}`
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

export const useHandleMediaInfo = (setState, item) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://ivory-firefly-hem.cyclic.app/mediaspecs?item=${item}`
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
