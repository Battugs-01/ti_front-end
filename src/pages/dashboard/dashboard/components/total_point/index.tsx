import { ICard } from "components/card";
import { FormattedMessage } from "react-intl";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TotalPointInterface } from "service/dashboard/type";

interface TotalPointProps {
  data?: TotalPointInterface[];
}

export const TotalPoint: React.FC<TotalPointProps> = ({ data }) => {
  const customizedData = data?.map((item, index) => {
    return {
      name: index + 1,
      ...item,
    };
  });
  return (
    <ICard xR yR>
      <p className="pl-8 text-xl font-semibold">
        <FormattedMessage id="total_point" />
      </p>
      <div className="w-full h-[450px]">
        <ResponsiveContainer>
          <AreaChart
            data={customizedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0FCA7A" stopOpacity={1} />
                <stop offset="100%" stopColor="#0FCA7A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#03BAE2" stopOpacity={1} />
                <stop offset="100%" stopColor="#03BAE2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGDS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBC62F" stopOpacity={1} />
                <stop offset="100%" stopColor="#FBC62F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis>
              <Label angle={-90} position="insideLeft" />
            </YAxis>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Legend
              iconType="circle"
              formatter={(value) => {
                if (value === "barthel_index") return "Barthel Index";
                if (value === "mini_cog") return "Mini Cog";
                if (value === "gds") return "GDS";
                return value;
              }}
              verticalAlign="top"
              height={36}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="mini_cog"
              name="Mini Cog"
              stroke="#03BAE2"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <Area
              type="monotone"
              dataKey="barthel_index"
              name="Barthel Index"
              stroke="#0FCA7A"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="gds"
              name="GDS"
              stroke="#FBC62F"
              fillOpacity={1}
              fill="url(#colorGDS)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ICard>
  );
};
