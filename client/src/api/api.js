import { useEffect } from "react";
import axios from "axios";

export const useCategoryData = (setState) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:4000/category";
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
        const apiUrl = "http://localhost:4000/SubCategory";
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
          const apiUrl = `http://localhost:4000/SubCategory/${endpoint}`;

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
          const apiUrl = `http://localhost:4000/category/${endpoint}`;

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
          `http://localhost:4000/items?item=${item}`
        );
        const itemData = response.data;
        setState(itemData); // Assuming this correctly updates the state
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
          `http://localhost:4000/search?q=${search}`
        );
        setState(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [search, setState]);
};
