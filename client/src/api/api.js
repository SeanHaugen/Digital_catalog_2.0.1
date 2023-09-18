import { useEffect, useState } from "react";
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

// export const usePricingData = (setState, item) => {
//   useEffect(() => {
//     const cachedData = sessionStorage.getItem(`pricing_${item}`);
//     if (cachedData) {
//       setItemPricing(JSON.parse(cachedData));
//     } else {
//       async function fetchData() {
//         try {
//           const response = await axios.get(
//             `http://ivory-firefly-hem.cyclic.app/pricing/${item}`
//           );
//           let itemPricing = response.data;
//           sessionStorage.setItem(`pricing_${item}`, JSON.stringify(data));
//           setState(itemPricing);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//       fetchData();
//     }
//   }, [item, setState]);
// };

export const usePricingData = (item) => {
  const [itemPricing, setItemPricing] = useState(null);

  useEffect(() => {
    // Attempt to retrieve pricing data from sessionStorage
    const cachedData = sessionStorage.getItem(`pricing_${item}`);
    if (cachedData) {
      setItemPricing(JSON.parse(cachedData));
    } else {
      // Fetch pricing data if not found in sessionStorage
      async function fetchData() {
        try {
          const response = await axios.get(
            `http://ivory-firefly-hem.cyclic.app/pricing/${item}`
          );
          const data = response.data;
          // Store pricing data in sessionStorage for future use
          sessionStorage.setItem(`pricing_${item}`, JSON.stringify(data));
          setItemPricing(data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [item]);

  return itemPricing;
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

export const useHandleUpdatePricing = (setState, item) => {
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
        setState(responseData);
      } catch (error) {
        console.error(error);
      }
    }
    updatePricing();
  }, [item, setState]);
};
