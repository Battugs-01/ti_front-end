import { geoMercator, geoPath } from "d3-geo";
import Datamap from "datamaps/dist/datamaps.mng.min.js";
import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { Circle, Cloud01Icon } from "untitledui-js-base";

class Map extends Component {
  componentDidMount() {
    const { data } = this.props;
    const darkhanLocation = [49.421365, 105.863132];
    const ubLocation = [47.9069, 106.917];
    const icsServices = ["virtual-server", "memory", "compute"];
    const icsRamSizes = ["0.5", "1", "2", "4", "8", "16"];
    const icsStatus = [
      { value: "waiting", color: "#F6C949" },
      { value: "done", color: "#01A652" },
      { value: "error", color: "#F95050" },
    ];

    const getRandomInRange = (from, to) => from + Math.random() * to;
    const FixedQueue = (size, initialValues) => {
      initialValues = initialValues || [];
      // eslint-disable-next-line no-var
      var queue = Array.apply(null, initialValues);
      queue.fixedSize = size;
      queue.push = FixedQueue.push;
      queue.splice = FixedQueue.splice;
      queue.unshift = FixedQueue.unshift;
      FixedQueue.trimTail.call(queue);
      // eslint-disable-next-line padding-line-between-statements
      return queue;
    };

    FixedQueue.trimHead = function () {
      if (this.length <= this.fixedSize) {
        return;
      }
      Array.prototype.splice.call(this, 0, this.length - this.fixedSize);
    };

    FixedQueue.trimTail = function () {
      if (this.length <= this.fixedSize) {
        return;
      }
      Array.prototype.splice.call(
        this,
        this.fixedSize,
        this.length - this.fixedSize
      );
    };

    FixedQueue.wrapMethod = function (methodName, trimMethod) {
      // eslint-disable-next-line no-var
      var wrapper = function () {
        var method = Array.prototype[methodName];
        var result = method.apply(this, arguments);
        trimMethod.call(this);
        return result;
      };
      return wrapper;
    };

    FixedQueue.push = FixedQueue.wrapMethod("push", FixedQueue.trimHead);
    FixedQueue.splice = FixedQueue.wrapMethod("splice", FixedQueue.trimTail);
    FixedQueue.unshift = FixedQueue.wrapMethod("unshift", FixedQueue.trimTail);

    const map = new Datamap({
      width: "100%",
      height: "100%",
      element: document.getElementById("live-map"),
      scope: "mng",
      responsive: true,
      // popupOnHover: false,
      fills: {
        defaultFill: "#2F3750",
        RED: "#007FFF",
        YELLOW: "#01A652",
        BLACK: "#25546F",
      },
      data: data,
      setProjection: function (element) {
        var projection = geoMercator()
          .scale(1700)
          .center([7, 7])
          .rotate([260, -40]);
        var path = geoPath().projection(projection);
        return { path: path, projection: projection };
      },
      // projectionConfig: {
      //   rotation: [260, -40],
      // },
      bubblesConfig: {
        animate: true,
        highlightBorderColor: "#007FFF",
        highlightFillColor: "rgba(0, 127, 255, 0.3)",
        popupOnHover: true,
        popupTemplate: (geo, data) => {
          return "<div>hey</div>";
        },
      },
      geographyConfig: {
        hideAntarctica: true,
        borderWidth: 0.75,
        borderColor: "#007FFF",
        popupOnHover: false,
        highlightOnHover: true,
        highlightFillColor: "rgba(0, 127, 255, 0.3)",
        highlightBorderColor: "#007FFF",
        highlightBorderWidth: 1,
      },
      arcConfig: {
        strokeColor: "#DD1C77",
        strokeWidth: 2,
        arcSharpness: 1,
        animationSpeed: 1000,
        popupOnHover: true,
        popupTemplate: function (geo, data) {
          return '<div class="maphover"><strong>Arc</strong></div>';
        },
      },
    });
    const defaultLocation = [
      {
        radius: 13,
        latitude: ubLocation[0],
        longitude: ubLocation[1],
        fillOpacity: 1,
        fillKey: "RED",
        location: "Ulaanbaatar",
      },
      {
        radius: 13,
        latitude: darkhanLocation[0],
        longitude: darkhanLocation[1],
        fillOpacity: 1,
        fillKey: "YELLOW",
        location: "Darkhan",
      },
    ];
    map.bubbles([...defaultLocation], {
      popupOnHover: true,
      popupTemplate: (geo, data) => {
        return (
          '<div class="maphover"><strong>' +
          data.location +
          "</strong>Үндэсний дата төв</div>"
        );
      },
    });

    var hits = FixedQueue(10, []);
    var boom = FixedQueue(10, []);
    var colors = [
      "#6A4BFF",
      "#0E87D8",
      "#F95050",
      "#3BC963",
      "#E91E63",
      "#9575CD",
      "#7B1FA2",
      "#2196F3",
      "#F5980D",
    ];
    const interval = setInterval(() => {
      const rand = Math.floor(Math.random() * (8000 - 4000) + 4000);
      setTimeout(() => {
        // Darkhan Datacenter location  //49.421365  -  105.863132
        // Ulaanbaatar Datacenter location  //47.9069  - 106.917
        var originLang = getRandomInRange(45.442634, 3.822855);
        var originLong = getRandomInRange(94.780042, 17.974545);
        var destLang = 0;
        var destLong = 0;
        if (Math.random() > 0.5) {
          destLang = darkhanLocation[0];
          destLong = darkhanLocation[1];
        } else {
          destLang = ubLocation[0];
          destLong = ubLocation[1];
        }

        hits.push({
          origin: {
            latitude: originLang,
            longitude: originLong,
          },

          destination: { latitude: destLang, longitude: destLong },
        });
        map.arc(hits, {
          strokeWidth: Math.floor(Math.random() * (4 - 1) + 1),
          strokeColor: colors[Math.floor(Math.random() * colors.length)],
          animationSpeed: Math.floor(Math.random() * (5000 - 500) + 500),
        });
        boom.push({
          radius: 5,
          latitude: originLang,
          longitude: originLong,
          fillOpacity: 0.2,
          // title: "#578 ICS/virtual-server",
          title: `#${Math.floor(Math.random() * (1000 - 100) + 100)} ICS/${
            icsServices[Math.floor(Math.random() * icsServices.length)]
          }`,
          description: {
            label: `${
              icsRamSizes[Math.floor(Math.random() * icsRamSizes.length)]
            }GB`,
            // time: "7 цагийн өмнө үүсгэсэн",
            time: `${Math.floor(
              Math.random() * (10 - 1) + 1
            )} цагийн өмнө үүсгэсэн`,
            status: icsStatus[Math.floor(Math.random() * icsStatus.length)],
          },
        });

        map.bubbles([...defaultLocation, ...boom], {
          popupOnHover: true,
          popupTemplate: (geo, data) => {
            return (
              '<div class="maphover"><span class="map-title">' +
              ReactDOMServer.renderToString(
                <Cloud01Icon width={20} height={20} />
              ) +
              data.title +
              "</span><span class='map-description'>" +
              data.description.label +
              ReactDOMServer.renderToString(
                <Circle
                  width={7}
                  height={7}
                  fill={data.description.status.color}
                />
              ) +
              data.description.time +
              "</span></div>"
            );
          },
        });
      }, rand);
    }, 1000);
  }
  render() {
    return (
      <div
        id="live-map"
        style={{
          height: "500px",
          width: "100%",
        }}
      ></div>
    );
  }
}

export default Map;
