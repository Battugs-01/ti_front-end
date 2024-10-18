import { ICard } from "components/card";
import { FormattedMessage, useIntl } from "react-intl";
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
  const intl = useIntl();
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
                if (value === "Barthel Index")
                  return <FormattedMessage id="barthel_index" />;
                if (value === "Mini Cog")
                  return <FormattedMessage id="mini_cog" />;
                if (value === "GDS") return <FormattedMessage id="gds" />;
                return value;
              }}
              verticalAlign="top"
              height={36}
            />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { mini_cog, barthel_index, gds } = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-solid border-gray-200 flex flex-col gap-2">
                      <div
                        style={{
                          color: payload[0]?.stroke,
                        }}
                      >{`${intl.formatMessage({
                        id: "mini_cog",
                      })}: ${mini_cog?.toFixed(2)}`}</div>
                      <div
                        style={{
                          color: payload[1]?.stroke,
                        }}
                      >{`${intl.formatMessage({
                        id: "barthel_index",
                      })}: ${barthel_index?.toFixed(2)}`}</div>
                      <div
                        style={{
                          color: payload[2]?.stroke,
                        }}
                      >{`${intl.formatMessage({
                        id: "gds",
                      })}: ${gds?.toFixed(2)}`}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
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
