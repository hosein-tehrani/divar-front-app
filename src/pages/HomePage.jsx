import React, { useEffect, useState } from "react";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "services/post";
import Loader from "src/components/modules/Loader";
import { getCategories } from "src/services/admin";
const style = { display: "flex" };
function HomePage() {
  const [selectedCategory, selectCategory] = useState("");
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["all-posts"],
    queryFn: getAllPosts,
  });
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const [showPosts, setShowPosts] = useState([]);
  useEffect(() => {
    if (selectedCategory === "") {
      setShowPosts(posts?.data.posts);
    } else {
      const filteredPosts = posts?.data.posts.filter(
        (post) => post.category === selectedCategory,
      );
      setShowPosts(filteredPosts);
    }
  }, [selectedCategory, posts]);
  return (
    <div style={style}>
      {loadingPosts || loadingCategories ? (
        <Loader />
      ) : (
        <>
          <Sidebar
            data={categories}
            selectCategory={selectCategory}
            selectedCategory={selectedCategory}
          />
          <Main data={showPosts} selectedCategory={selectedCategory} />
        </>
      )}
    </div>
  );
}

export default HomePage;
