import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function SearchPage({ searchData, setProduct }) {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const searchTerm = queryParams.get('q');
  // console.log(category);
  // console.log(subCategory);
  // console.log(productData.category, productData.subCategory);

  let itemsPerPage = 13;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(searchData.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      search results
      {currentItems.map((item, index) => {
        return (
          <ListItemButton
            key={index}
            component={NavLink}
            to={`/category/subcategory/${item.Name}`}
            onClick={() => setProduct(item.Item_Number)}
          >
            <ListItemText primary={item.title}>
              {item.Name} - {item.Item_Number}
            </ListItemText>
          </ListItemButton>
        );
      })}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Pagination
          color="primary"
          count={pageCount} // Calculate the total number of pages
          page={currentPage}
          onChange={handlePageChange}
        ></Pagination>
      </Stack>
    </div>
  );
}

export default SearchPage;
