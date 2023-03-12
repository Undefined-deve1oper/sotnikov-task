import React from "react";
import AdminPage from "../../components/pages/AdminPage/AdminPage";
import AdminProtectedRoute from "../../components/common/ProtectedRoute";
import "./admin.css";

const Admin = () => {
    return (
        <section className="admin-page">
            {/* <AdminProtectedRoute isAdmin={true} to="/"> */}
            <AdminPage />
            {/* </AdminProtectedRoute> */}
        </section>
    );
};

export default Admin;
