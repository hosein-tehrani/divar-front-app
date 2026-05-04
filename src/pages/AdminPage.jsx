import CategoryForm from "components/templates/CategoryForm";
import CategoryList from "components/templates/CategoryList";
import { Helmet } from "react-helmet";

function AdminPage() {
  return (
    <div>
      <Helmet>
        <title>دیوار | داشبورد ادمین</title>
      </Helmet>
      <CategoryList />
      <CategoryForm />
    </div>
  );
}

export default AdminPage;
