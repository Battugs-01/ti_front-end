import { Card } from "antd"
import InitTableHeader from "components/table-header"

const data=[
    {
        orphanName:"Батсүмбэрийн Улсын асрамжийн газар",
        lastName:"Батэрдэнэ"
    }
]

export const RightSettings:React.FC=()=>{
    return (
        <div className="mt-6 custom-ant-card-padding-remove">
            <Card>
                <InitTableHeader customHeaderTitle="Эрхийн тохиргоо" toolbarItems={undefined}/>
                
            </Card>
        </div>
    )
}