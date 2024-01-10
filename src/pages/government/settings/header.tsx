import { Radio } from "antd"
import { RadioType } from "service/gov-settings"

type HeaderType={
    changeTab?:any   
}

export const Header:React.FC<HeaderType>=({changeTab})=>{
    return(
        <div>
            <Radio.Group defaultValue={RadioType.settings} onChange={changeTab}>
                <Radio.Button value={RadioType.settings}>Эрхийн тохиргоо</Radio.Button>
                <Radio.Button value={RadioType.forms}>Маягтын жагсаалт</Radio.Button>
            </Radio.Group>
        </div>
    )
}