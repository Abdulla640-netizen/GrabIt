import ItemManagementPage from "../../components/ItemManagementPage/ItemManagementPage";
import ItemsListManagementPage from "../../components/ItemsListManagementPage/ItemsListManagementPage";


const rolePage ={
    USER:[ItemManagementPage,ItemListManagementPage],
    ADMIN:[],
    INCOGNITO:[ItemManagementPage,ItemListManagementPage],
}