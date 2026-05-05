import React, { useEffect, useState } from "react";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "services/post";
import Loader from "src/components/modules/Loader";
import { getCategories } from "src/services/admin";
import { useSearchParams } from "react-router-dom";
import { filterPosts, searchPosts, setQueryObject } from "src/utils/helper";
const style = { display: "flex" };
import styles from "./HomePage.module.css"

function HomePage() {
  // ---------variables-----------
  const [selectedCategory, selectCategory] = useState("");
  const [query, setQuery] = useState({});
  const [showPosts, setShowPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // -----useQueries----------
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["all-posts"],
    queryFn: getAllPosts,
  });
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  // ----------------useEffects---------
  useEffect(() => {
    setShowPosts(posts?.data.posts);
    console.log("show posts", posts);
    const query = {};
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) {
      query.category = category;
      selectCategory(category);
    }
    if (search) {
      query.search = search;
      setSearch(search);
    }
    setQuery(query);
  }, [posts]);

  useEffect(() => {
    setSearchParams(query);
    let finalProducts = searchPosts(posts?.data.posts, query.search);
    finalProducts = filterPosts(finalProducts, query.category);
    setShowPosts(finalProducts);
  }, [query]);
  // ---------------handlers----------------
  const searchHandler = (search) => {
    setQuery((query) => setQueryObject(query, { search }));
  };
  const categoryHandler = (category) => {
    selectCategory(category);
    setQuery((query) => setQueryObject(query, { category }));
  };
  return (
    <div className={styles.container}>
      {loadingPosts || loadingCategories ? (
        <Loader />
      ) : (
        <>
          <Sidebar
            data={categories}
            selectCategory={categoryHandler}
            selectedCategory={selectedCategory}
          />
          <Main
            data={showPosts}
            selectedCategory={selectedCategory}
            search={search}
            setSearch={setSearch}
            searchHandler={searchHandler}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;
