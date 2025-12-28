import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { client } from "../sanity/clients";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const CATEGORY_QUERY = `*[_type == "category"]{ _id, title_en, title_az, title_ru }`;
        const data = await client.fetch(CATEGORY_QUERY);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CategoryContext;
