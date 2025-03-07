import { Routes, Route } from "react-router-dom";
import { AddUser } from "./add-user";
import { Users } from "./users";
import { AppUserDetail } from "./AppUserDetail";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={
                <div className="p-4 space-y-8">
                    <h1 className="text-xl">SimpleCrm</h1>
                    <Users />
                    <AddUser />
                </div>
            }></Route>
            <Route path="/userdetails/:id" element={
                <AppUserDetail />}>                    
            </Route>
        </Routes>
    );
};

export default App;
