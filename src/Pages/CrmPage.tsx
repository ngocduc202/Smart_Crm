import Crm from "../Components/Crm/Crm"
import Layout from "./Layout"


const CrmPage = () => {
    return (
        <Layout
            children={<Crm />}
            style=''
        />
    )
}

export default CrmPage