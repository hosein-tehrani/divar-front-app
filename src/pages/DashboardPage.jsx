import AddPost from "components/templates/AddPost";
import { Helmet } from "react-helmet";
import PostList from "src/components/templates/PostList";

function DashboardPage() {
  return (
    <div>
      <Helmet>
        <title>دیوار | داشبورد کاربر</title>
      </Helmet>
      <AddPost />
      <PostList />
    </div>
  );
}

export default DashboardPage;
